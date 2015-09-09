package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.model.Question;
import pt.uc.dei.nobugssnackbar.model.QuestionOption;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.Test;
import pt.uc.dei.nobugssnackbar.model.TestQuestion;
import pt.uc.dei.nobugssnackbar.model.TestQuestionAnswer;
import pt.uc.dei.nobugssnackbar.model.User;

public class GameJdbcDao implements GameDao {

	private static Logger log = Logger.getGlobal();

	private Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}

	public User login(String nick, String passw) throws Exception {
		User u = null;

		Connection bdCon = null;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select userid, usernick, userpassw, usermoney, username, usersex, userlasttime, showhint, userxp, showinstructionallearn from users where usernick = ? and userpassw = ? and userenabled = 'T'");
			ps.setString(1, nick);
			ps.setString(2, passw);

			ResultSet rs = ps.executeQuery();
			if (!rs.next()) {
				throw new Exception("User not found or not registered.");
			}

			u = new User();
			u.setId(rs.getLong(1));
			u.setNick(nick);
			u.setPassw(passw);
			u.setXp(rs.getLong(9));
			u.setMoney(rs.getLong(4));
			u.setName(rs.getString(5));
			u.setSex(rs.getString(6));
			u.setLastTime(rs.getTime(7));
			u.setShowHint(rs.getString(8).equals("T"));
			u.setShowInstruction(rs.getString(10).equals("T"));

			ps.close();

			ps = bdCon
					.prepareStatement("select classid from classesusers where userid = ?");
			ps.setLong(1, u.getId());

			rs = ps.executeQuery();
			while (rs.next()) {
				u.getClassesId().add(rs.getLong(1));
			}

			ps.close();
			
			ps = bdCon.prepareStatement("select flagid, value from usersflags where userid = ?");
			ps.setLong(1, u.getId());
			rs = ps.executeQuery();
			while (rs.next()) {
				u.getFlags().put(rs.getString(1), rs.getString(2));
			}
			
			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return u;
	}

	public void updateUserLastTime(User u) throws Exception {

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			u.setLastTime(new Time((new Date()).getTime()));
			PreparedStatement ps = bdCon
					.prepareStatement("update users set userlasttime = now() where userid = ?");

			ps.setLong(1, u.getId());
			ps.executeUpdate();

			ps.close();
		} finally {
			if (bdCon != null) {
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			}
		}
	}

	public void insertUser(String userNick, String userPassword,
			String userName, String sex, String userMail, String lang, long classes[])
			throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			bdCon.setAutoCommit(false);

			PreparedStatement ps = bdCon
					.prepareStatement("insert into users (usernick, userpassw, usersex, username, usermail, userlang, usermoney, showhint, userenabled) values (?, ?, ?, ?, ?, ?, 0, 'T', 'F')");

			ps.setString(1, userNick);
			ps.setString(2, userPassword);
			ps.setString(3, sex);
			ps.setString(4, userName);
			ps.setString(5, userMail);
			ps.setString(6, lang);

			ps.executeUpdate();
			ps.close();

			if (classes != null && classes.length > 0) {
				Statement st = bdCon.createStatement();
				ResultSet rs = st.executeQuery("select last_insert_id()");
				rs.next();
				long userid = rs.getLong(1);
				st.close();

				ps = bdCon
						.prepareStatement("insert into classesusers (classid, userid) values (?, ?)");
				for (long classId : classes) {

					ps.setLong(1, classId);
					ps.setLong(2, userid);

					ps.executeUpdate();
				}
				ps.close();
			}

			bdCon.commit();

		} finally {
			bdCon.setAutoCommit(true);
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

	}

	public String[][] loadMission(User user, int clazzId, int levelId,
			int missionIdx) throws SQLException {
		String[][] ret = null;

		Connection bdCon = null;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select missionid, missioncontent from classesmissions cm join "
							+ "missions m using (missionid) "
							+ "where classid = ? and classlevelid = ? order by missionorder "
							+ "limit ?, 1");

			log.info("loadMission " + clazzId + " " + levelId + " "
					+ missionIdx);

			ps.setLong(1, clazzId);
			ps.setLong(2, levelId);
			ps.setLong(3, missionIdx - 1);

			ResultSet rs = ps.executeQuery();
			rs.next();

			long missionId = rs.getLong(1);
			String xml = rs.getString(2);
			ps.close();

			ps = bdCon
					.prepareStatement("select timespend, answer, executions, zoomlevel from missionsaccomplished where missionid = ? and classid = ? and userid = ?");

			ps.setLong(1, missionId);
			ps.setLong(2, clazzId);
			ps.setLong(3, user.getId());

			rs = ps.executeQuery();
			String answer = null;
			String timeSpent = null;
			String executions = "0";
			String zoomLevel = "1";
			if (rs.next()) {

				timeSpent = rs.getString(1);
				answer = rs.getString(2);
				executions = rs.getString(3);
				zoomLevel = rs.getString(4);

			}

			ps.close();

			ret = new String[1][7];
			ret[0][0] = missionId + "";
			ret[0][1] = missionIdx + "";
			ret[0][2] = xml;
			ret[0][3] = answer;
			ret[0][4] = timeSpent;
			ret[0][5] = executions;
			ret[0][6] = zoomLevel;

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;

	}

	private int loadMissionAccomplished(long idMission, long idUser,
			long idClass) throws SQLException {

		int timeSpend = -1;

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			Statement st = bdCon.createStatement();
			ResultSet rs = st
					.executeQuery("select timespend from missionsaccomplished where missionid = "
							+ idMission
							+ " and userid = "
							+ idUser
							+ " and classid = " + idClass);
			if (rs.next())
				timeSpend = rs.getInt(1);
			st.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		return timeSpend;

	}

	public void finishMission(User user, long idMission, long idClazz,
			int xp, int money, int timeSpend, long execution, boolean achieved,
			int typeRunning, float zoomLevel, String answer) throws SQLException {

		int localTimeSpend = loadMissionAccomplished(idMission, user.getId(),
				idClazz);

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			bdCon.setAutoCommit(false);

			PreparedStatement ps, psLog;

			if (localTimeSpend == -1) {
				ps = bdCon
						.prepareStatement("insert into missionsaccomplished "
								+ "(timespend, achieved, xp, answer, executions, money, zoomlevel, missionid, classid, userid) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
				localTimeSpend = timeSpend;
			} else {
				ps = bdCon
						.prepareStatement("update missionsaccomplished set timespend = ?, achieved = ?, xp = ?, answer = ?, executions = ?, money = ?, zoomlevel = ? "
								+ "where missionid = ? and classid = ? and  userid = ?");
				localTimeSpend += timeSpend;
			}

			ps.setLong(1, localTimeSpend);
			ps.setString(2, (achieved ? "T" : "F"));
			ps.setInt(3, xp);
			ps.setString(4, answer);
			ps.setLong(5, execution);
			ps.setInt(6, money);
			ps.setFloat(7, zoomLevel);
			ps.setLong(8, idMission);
			ps.setLong(9, idClazz);
			ps.setLong(10, user.getId());

			ps.executeUpdate();
			ps.close();

			psLog = bdCon
					.prepareStatement("insert into logmissions "
							+ "(timespend, answer, missionid, classid, userid, execution, typerunning, moment) values (?, ?, ?, ?, ?, ?, ?, now())");

			psLog.setLong(1, timeSpend);
			psLog.setString(2, answer);
			psLog.setLong(3, idMission);
			psLog.setLong(4, idClazz);
			psLog.setLong(5, user.getId());
			psLog.setLong(6, execution);
			psLog.setLong(7, typeRunning);
			log.info("logging " + idMission + " " + idClazz + " "
					+ user.getId());
			psLog.executeUpdate();
			psLog.close();

			if (achieved) {
				ps = bdCon
						.prepareStatement("update users set userxp = ?, usermoney = ? where userid = ?");
				ps.setLong(1, user.getXp());
				ps.setLong(2, user.getMoney());
				ps.setLong(3, user.getId());
				ps.executeUpdate();
				ps.close();
			}

			bdCon.commit();
			bdCon.setAutoCommit(true);

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

	}

	public void updateMission(int idMission, String xml) throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("update missions set missioncontent = ? where missionid = ?");
			ps.setString(1, xml);
			ps.setInt(2, idMission);

			ps.executeUpdate();
			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	}

	public void addExecutionInMission(User user, long idMission, long idClass)
			throws SQLException {

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			bdCon.setAutoCommit(false);

			int localTimeSpend = loadMissionAccomplished(idMission,
					user.getId(), idClass);
			PreparedStatement ps;
			if (localTimeSpend == -1) {
				ps = bdCon
						.prepareStatement("insert into missionsaccomplished "
								+ "(timespend, achieved, money, xp, missionid, classid, userid, executions) values (0, 'F', 0, 0, ?, ?, ?, 1)");
			} else {
				ps = bdCon
						.prepareStatement("update missionsaccomplished set executions = executions + 1 "
								+ "where missionid = ? and classid = ? and userid = ?");
			}

			ps.setLong(1, idMission);
			ps.setLong(2, idClass);
			ps.setLong(3, user.getId());

			ps.executeUpdate();
			ps.close();

			bdCon.commit();
			bdCon.setAutoCommit(true);

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	}

	public String loadAnswer(int idMission, long idUser) throws SQLException {
		Connection bdCon = null;
		String answer = null;
		try {
			bdCon = getConnection();
			Statement st = bdCon.createStatement();
			ResultSet rs = st
					.executeQuery("select answer from missionsaccomplished where missionid = "
							+ idMission + " and userid = " + idUser);
			if (rs.next())
				answer = rs.getString(1);
			st.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		return answer;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map<?,?> retrieveMissions(long idUser) throws SQLException {
		Connection bdCon = null;
		Map res = null;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select classid from classesusers where userid = ? and currently = 'T'");
			ps.setLong(1, idUser);

			List<Long> classes = new ArrayList<Long>();
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				classes.add(rs.getLong(1)); // it is only one
			}
			ps.close();

			String s = "select c.classname, classlevelname, qtasmissoes, qtasresolvidas, c.classid, cm.classlevelid, c.xptohat, c.xptoclothes from classeslevels cl join classes c on (cl.classid = c.classid) join ("
					+ " select classid, classlevelid, count(*) qtasmissoes from classesmissions where find_in_set (classid, ?) group by classid, classlevelid) cm "
					+ " on cl.classid = cm.classid and cl.classlevelorder = cm.classlevelid  left outer join ("
					+ " select classid, classlevelid, count(*) qtasresolvidas from missionsaccomplished ma join missions using (missionid) join classesmissions cm using (missionid, classid)"
					+ "   where ma.userid = ? and ma.achieved = 'T' and missions.missionrepeatable = 0 group by classid, classlevelid) maz "
					+ "  on cl.classid = maz.classid and cl.classlevelorder = maz.classlevelid "
					+ " order by c.classname, classlevelid";

			ps = bdCon.prepareStatement(s);

			ps.setString(1, classes.toString().replace("[", "")
					.replace("]", "").replace(" ", ""));
			ps.setLong(2, idUser);

			List<Integer> classesId = new ArrayList<>();
			List<Integer> classesLevelId = new ArrayList<>();

			List<Object[]> l = new ArrayList<>();
			rs = ps.executeQuery();
			
			int xpToHat = 0, xpToClothes = 0;
			
			while (rs.next()) {
				Object[] li = new Object[] { rs.getString(1), rs.getString(2),
						rs.getLong(3), rs.getLong(4), rs.getLong(5),
						rs.getLong(6), new ArrayList<Integer[]>() };

				classesId.add(rs.getInt(5));
				classesLevelId.add(rs.getInt(6));

				xpToHat = rs.getInt(7);
				xpToClothes = rs.getInt(8);
				
				l.add(li);
			}
			ps.close();

			ps = bdCon
					.prepareStatement("select missionorder, missioncust from classesmissions join missions using (missionid) where classid = ? and classlevelid = ? and missionrepeatable = 1 order by missionorder");

			for (int i = 0; i < classesId.size(); i++) {

				ps.setInt(1, classesId.get(i));
				ps.setInt(2, classesLevelId.get(i));

				List<Integer[]> missions = (List<Integer[]>) l.get(i)[6];
				long qtasResolvidas = (long) l.get(i)[3];

				rs = ps.executeQuery();
				while (rs.next()) {
					int mr = rs.getInt(1);
					missions.add(new Integer[]{mr, rs.getInt(2)});
					if (mr <= qtasResolvidas+1)
						qtasResolvidas++;
				}
				
				l.get(i)[3] = qtasResolvidas;

			}
			ps.close();

			Object[][] ret = new Object[l.size()][];
			for (int i = 0; i < l.size(); i++)
				ret[i] = l.get(i);
			
			res = new HashMap();
			res.put("missions", ret);
			res.put("xpToHat", xpToHat);
			res.put("xpToClothes", xpToClothes);

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return res;
	}

	public Questionnaire retrieveParticularQuestionnaire(User user, long questId)
			throws SQLException {
		Connection bdCon = null;
		Questionnaire ret = null;
		try {
			bdCon = getConnection();

			bdCon.prepareStatement("select * from questionnaire");
			String clazzes = user.getClassesId() + "";

			String questionnaire = "select questionnaireclassid, questionnairedescription, q.questionid, questiondescription, questiontype, questionrequired, "
					+ " optiondescription, optionvalue, questionnaireshowrules, q1.classid, 0 "
					+ " from questionnaireclasses q1 "
					+ " join questionnaire using (questionnaireid) "
					+ " join questionsquestionnaire using (questionnaireid) "
					+ " join questions q using (questionid) "
					+ " left outer join questionoptions qo on (q.questionid = qo.questionid) "
					+ " where questionnaireid = ? and classid in ("
					+ clazzes.substring(1, clazzes.length() - 1)
					+ ") and (questionnairedinit is null or questionnairedinit <= now()) and questionnairedfinish > now() "
					+ " and questionnaireclassid not in (select distinct questionnaireclassid from questionnaireanswer where userid = ?) "
					+ " order by questionorder, optionorder";

			PreparedStatement ps = bdCon.prepareStatement(questionnaire);
			ps.setLong(1, questId);
			ps.setLong(2, user.getId());
			ResultSet rs = ps.executeQuery();

			List<Questionnaire> retL = new ArrayList<>();
			addQuestionnaires(retL, rs, null);
			if (retL.size() == 1)
				ret = retL.get(0);

			rs.close();
			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		return ret;
	}

	public List<Questionnaire> retrieveQuestionnaire(User user,
			Object[][] missions) throws SQLException {

		Connection bdCon = null;
		List<Questionnaire> ret = new ArrayList<>();
		try {
			bdCon = getConnection();

			String clazzes = user.getClassesId() + "";

			String questionnaire = "select questionnaireclassid, questionnairedescription, q.questionid, questiondescription, questiontype, questionrequired, "
					+ " optiondescription, optionvalue, questionnaireshowrules, q1.classid, questionnairefrommission from questionnaire q0"
					+ " join questionsquestionnaire using (questionnaireid)"
					+ " join questionnaireclasses q1 using (questionnaireid)"
					+ " join questions q using (questionid)"
					+ " left outer join questionoptions qo on (q.questionid = qo.questionid) "
					+ " where questionnaireclassid not in (select distinct questionnaireclassid from questionnaireanswer where userid = ?) and"
					+ " questionnairedfinish > now() and (questionnairedinit is null or questionnairedinit < now()) and classid in ("
					+ clazzes.substring(1, clazzes.length() - 1)
					+ ")"
					+ " order by questionnaireclassid, questionorder, optionorder";

			;
			PreparedStatement ps = bdCon.prepareStatement(questionnaire);
			ps.setLong(1, user.getId());
			ResultSet rs = ps.executeQuery();
			addQuestionnaires(ret, rs, missions);
			rs.close();
			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		return (ret.size() == 0 ? null : ret);
	}

	private void addQuestionnaires(List<Questionnaire> ret, ResultSet rs,
			Object[][] missions) throws SQLException {

		long lastQuestionId = 0;
		long lastQuestionnaireId = 0;
		Question q = null;
		Questionnaire quest = null;
		boolean addThisQuest = true;
		while (rs.next()) {
			if (lastQuestionnaireId != rs.getInt(1)) {
				lastQuestionnaireId = rs.getInt(1);

				Long classId = rs.getLong(10);
				long finishedMission = 0;

				if (missions != null)
					for (int i = missions.length - 1; i >= 0; i--) {
						Long mi = (Long) missions[i][4];
						if (classId.equals(mi)) {
							finishedMission += Long.parseLong(missions[i][3]
									.toString());
						}
					}

				if (rs.getLong(11) == finishedMission) {

					quest = new Questionnaire();
					quest.setId(lastQuestionnaireId);
					quest.setDescription(rs.getString(2));
					quest.setShowRules(rs.getString(9));
					quest.setClassId(classId);
					quest.setQuestions(new ArrayList<Question>());

					ret.add(quest);

					addThisQuest = true;
				} else
					addThisQuest = false;
			}

			if (addThisQuest)

				if (lastQuestionId != rs.getInt(3)) {

					q = new Question();
					q.setId(rs.getInt(3));
					lastQuestionId = q.getId();

					quest.getQuestions().add(q);
					q.setDescription(rs.getString(4));
					q.setType(rs.getString(5));
					q.setRequired(rs.getString(6).equals("T"));

					if (rs.getString(7) != null) {
						q.setOptions(new ArrayList<QuestionOption>());
						q.getOptions().add(
								new QuestionOption(rs.getString(7), rs
										.getString(8)));
					}

				} else
					q.getOptions()
							.add(new QuestionOption(rs.getString(7), rs
									.getString(8)));

		}

	}

	public long createQuestionnaire(long classId, String description)
			throws SQLException {
		long ret = 0;
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			bdCon.setAutoCommit(false);

			PreparedStatement ps = bdCon
					.prepareStatement("insert into questionnaire (questionnairedescription) values (?)");
			ps.setString(1, description);
			ps.executeUpdate();

			Statement st = bdCon.createStatement();
			ResultSet rs = st.executeQuery("select last_insert_id()");
			rs.next();
			ret = rs.getLong(1);
			st.close();
			ps.close();

			ps = bdCon
					.prepareStatement("insert into questionnaireclasses (questionnaireid, classid) values (?, ?)");
			ps.setLong(1, ret);
			ps.setLong(2, classId);
			ps.executeUpdate();
			ps.close();

			bdCon.commit();
			bdCon.setAutoCommit(true);

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		return ret;
	}

	public long insertQuestion(long idQuest, int order, String description,
			String type, boolean required) throws SQLException {
		long ret = 0;
		Connection bdCon = null;
		try {
			bdCon = getConnection();

			bdCon.setAutoCommit(false);

			PreparedStatement ps = bdCon
					.prepareStatement("insert into questions (questiondescription, questiontype) values (?, ?)");
			ps.setString(1, description);
			ps.setString(2, type);

			ps.executeUpdate();

			Statement st = bdCon.createStatement();
			ResultSet rs = st.executeQuery("select last_insert_id()");
			rs.next();
			ret = rs.getLong(1);
			st.close();

			ps = bdCon
					.prepareStatement("insert into questionsquestionnaire (questionnaireid, questionid, questionorder, questionrequired) values (?,?,?,?)");
			ps.setLong(1, idQuest);
			ps.setLong(2, ret);
			ps.setLong(3, order);
			ps.setString(4, (required ? "T" : "F"));
			ps.executeUpdate();

			ps.close();

			bdCon.commit();
			bdCon.setAutoCommit(true);
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		return ret;
	}

	public long insertOption(long idQuestion, String description, int order,
			String value) throws SQLException {
		long ret = 0;
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into questionoptions (questionid, optiondescription, optionorder, optionvalue) values (?, ?, ?, ?)");
			ps.setLong(1, idQuestion);
			ps.setString(2, description);
			ps.setInt(3, order);
			ps.setString(4, value);

			ps.executeUpdate();

			Statement st = bdCon.createStatement();
			ResultSet rs = st.executeQuery("select last_insert_id()");
			rs.next();
			ret = rs.getLong(1);
			st.close();

			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	public void insertAnswer(long questionnaireId, long questionId,
			long userId, String answer) throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into questionnaireanswer (questionnaireclassid, questionid, userid, questionanswer) values (?, ?, ?, ?)");

			ps.setLong(1, questionnaireId);
			ps.setLong(2, questionId);
			ps.setLong(3, userId);
			ps.setString(4, answer);

			ps.executeUpdate();
			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

	}

	public Long getUserId(String userNick) throws SQLException {
		Connection bdCon = null;
		Long ret = 0L;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select userid from users where usernick = ?");
			ps.setString(1, userNick);

			ResultSet rs = ps.executeQuery();
			rs.next();

			ret = rs.getLong(1);

			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	public void storeMissionFail(long execution, long testCount, long user, long mission,
			long classid, String[][] goals) throws Exception {

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			bdCon.setAutoCommit(false);

			PreparedStatement ps = bdCon
					.prepareStatement("insert into missionsfails (missionid, userid, classid, execution, testcount, goalcount, goaldescription, goalachieved) "
							+ "values (?, ?, ?, ?, ?, ?, ?, ?)");
			ps.setLong(1, mission);
			ps.setLong(2, user);
			ps.setLong(3, classid);
			ps.setLong(4, execution);
			ps.setLong(5, testCount);

			for (int i = 0; i < goals.length; i++) {

				ps.setLong(6, i + 1);
				ps.setString(7, goals[i][0]);
				ps.setString(8, goals[i][1].substring(0, 1).toUpperCase());

				ps.executeUpdate();
			}

			bdCon.commit();
			bdCon.setAutoCommit(true);

			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

	}

	public void storeMissionError(int execution, long testCount, long user, long mission,
			long classid, String idError, String blockId, String errorMessage)
			throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("insert into missionserrors (missionid, userid, classid, execution, testcount, errorid, blockid, errormessage) "
							+ "values (?, ?, ?, ?, ?, ?, ?, ?)");
			ps.setLong(1, mission);
			ps.setLong(2, user);
			ps.setLong(3, classid);
			ps.setLong(4, execution);
			ps.setLong(5, testCount);

			ps.setString(6, idError);
			ps.setString(7, blockId);
			ps.setString(8, errorMessage);

			ps.executeUpdate();

			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

	}

	public String[] loadMachine(int code, String destFolder) throws Exception {
		Connection bdCon = null;
		String[] ret = null;
		try {
			bdCon = getConnection();

			Statement st = bdCon.createStatement();
			ResultSet rs = st
					.executeQuery("select machinename, machinecost, machinecomercialimg from machines where machineid = "
							+ code);
			rs.next();
			ret = new String[2];
			ret[0] = rs.getString(1);
			ret[1] = rs.getInt(2) + "";
			transformBlobToImg(rs.getBinaryStream(3), destFolder, "com"+code, "");
			st.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	public List<String> listMachines(long userId) throws SQLException {
		Connection bdCon = null;
		List<String> ret = new ArrayList<String>();
		try {
			bdCon = getConnection();

			Statement st = bdCon.createStatement();
			ResultSet rs = st
					.executeQuery("select machineid from machines join usersmachines using (machineid) where userid = "
							+ userId);
			while (rs.next()) {
				ret.add(rs.getString(1));
			}
			st.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	public void buyMachine(long userid, int machineid) throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = getConnection();

			bdCon.setAutoCommit(false);

			PreparedStatement ps = bdCon
					.prepareStatement("insert into usersmachines (userid, machineid) values (?, ?)");
			ps.setLong(1, userid);
			ps.setInt(2, machineid);
			ps.executeUpdate();
			ps.close();

			Statement st = bdCon.createStatement();
			ResultSet rs = st
					.executeQuery("select machinecost from machines where machineid = "
							+ machineid);
			rs.next();
			int cost = rs.getInt(1);
			st.close();

			ps = bdCon
					.prepareStatement("update users set usermoney = usermoney - ? where userid = ?");
			ps.setInt(1, cost);
			ps.setLong(2, userid);
			ps.executeUpdate();
			ps.close();

			bdCon.commit();
			bdCon.setAutoCommit(true);

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

	}

	public List<Object[]> loadMachineData(Integer[] machineid, String destFolder)
			throws Exception {
		Connection bdCon = null;
		List<Object[]> ret = new ArrayList<Object[]>();

		try {
			if (machineid.length > 0) {
				bdCon = getConnection();

				List<Integer> list = Arrays.asList(machineid);
				String lista = (list + "");
				lista = lista.substring(1, lista.length() - 1);

				Statement st = bdCon.createStatement();
				ResultSet rs = st
						.executeQuery("select machineid, machinename, machinex, machiney, machinepath, machinemsgerrorisntfront, "
								+ "machinedrinkorfood, machineorder, machineproduce, machineimg, machinenumberofframes, machineheight from machines where machineid in ("
								+ lista + ")");
				
				while (rs.next()) {
					
					transformBlobToImg(rs.getBinaryStream(10), destFolder, rs.getString(1), "");
					transformBlobToImg(rs.getBinaryStream(9), destFolder, rs.getString(1) + "-prod", "$$");
					
					ret.add(new Object[] { rs.getString(1), rs.getString(2),
							rs.getString(3), rs.getString(4), rs.getString(5),
							rs.getString(6), rs.getString(7), rs.getString(8),
							null,
							rs.getString(11), rs.getString(12)});
					
				}
				st.close();

				PreparedStatement ps = bdCon
						.prepareStatement("select machinecommandname, machinecommandlang, machinecommandblocks, machinecommandjavascript, machinecommandtype, machinecommandproductqtd,"
										    + "machinecommandproductx, machinecommandproducty, machinecommandproductdeltax, machinecommandproductdeltay, machinecommandid, machinecommandproductimg from machinescommands "
											+ "left outer join machinescommandproduct using (machinecommandid) where machineid = ? order by machinecommandid");
				for (Object[] obj : ret) {
					ps.setString(1, (String) obj[0]);

					List<String[]> lcomms = new ArrayList<String[]>();
					obj[8] = lcomms;

					rs = ps.executeQuery();
					while (rs.next()) {

						String id = "";
						if (rs.getString(10) != null) {
							
							id = rs.getString(11) + "-comm";
							transformBlobToImg(rs.getBinaryStream(12), destFolder, id, "");
							
						}
						
						lcomms.add(new String[] { rs.getString(1),
								rs.getString(2), rs.getString(3),
								rs.getString(4), rs.getString(5), 
								rs.getString(6), rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10), id});

					}
					rs.close();
				}
				ps.close();
			}
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	private void transformBlobToImg(InputStream is, String destFolder, String machineId, String prefix) throws Exception {
		
		String fileName = destFolder + "/" + prefix + "machine" + machineId + ".png";
		File image = new File(fileName);
	    FileOutputStream fos = new FileOutputStream(image);
		
		byte[] buffer = new byte[1];
	    while (is.read(buffer) > 0) {
	    	fos.write(buffer);
	    }
	    fos.close();
	}

	public List<Object[]> retrieveLeaderBoard(long userid, List<Long> classesId)
			throws SQLException {
		Connection bdCon = null;
		List<Object[]> ret = new ArrayList<Object[]>();

		try {
			bdCon = getConnection();

			boolean showLB = true;
			int showAfterMission = 0;
			// TODO: think how we can do the same idea when the user belongs
			// more than one class
			if (classesId.size() == 1) {
				Statement st = bdCon.createStatement();
				ResultSet rs = st
						.executeQuery(" select classid, showleaderboardafter, maxmission from "
								+ " classes left outer join "
								+ " (select max(missionorder) maxmission, classid from missionsaccomplished join classesmissions using (missionid, classid) where userid = "
								+ userid
								+ " group by userid, classid) mu "
								+ "  using (classid) where classid = "
								+ classesId.get(0));
				rs.next();
				int maxmission = 0;
				if (rs.getString(3) != null)
					maxmission = rs.getInt(3);
				showLB = rs.getInt(2) <= maxmission;
				showAfterMission = rs.getInt(2);

				st.close();
			}

			if (showLB) {

				String clazzes = classesId + "";

				String query = "select userid, username, sum(xp), sum(timespend), sum(executions), max(missionorder), showleaderboardafter from missionsaccomplished "
						+ "join classesmissions using (missionid, classid) "
						+ "join classes using (classid) "
						+ "join users using (userid) "
						+ "where achieved = 'T' and classid in ("
						+ clazzes.substring(1, clazzes.length() - 1)
						+ ") group by userid";

				Statement st = bdCon.createStatement();
				ResultSet rs = st.executeQuery(query);
				while (rs.next()) {
					ret.add(new Object[] { rs.getLong(1), rs.getString(2),
							rs.getLong(3), rs.getLong(4), rs.getLong(5),
							rs.getLong(6) });
				}
				st.close();

			} else {
				ret.add(new Object[] { null, showAfterMission });
			}

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	public boolean isUserAllowed(String usernick) throws SQLException {
		Connection bdCon = null;
		boolean ret = false;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select * from users where usernick = ?");
			ps.setString(1, usernick);

			ResultSet rs = ps.executeQuery();
			if (!rs.next())
				ret = true;
			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	public boolean isEmailAllowed(String usermail) throws SQLException {
		Connection bdCon = null;
		boolean ret = false;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select * from users where usermail = ?");
			ps.setString(1, usermail);

			ResultSet rs = ps.executeQuery();
			if (!rs.next())
				ret = true;
			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	public long getDefaultClass(String lang) throws SQLException {
		Connection bdCon = null;
		long ret = 0;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select classid from classes where classname like 'Default%' and classlang like ?");
			ps.setString(1, "%" + lang + "%");

			ResultSet rs = ps.executeQuery();
			if (rs.next())
				ret = rs.getLong(1);
			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	@Override
	public String[] registerUser(String id) throws Exception  {
		String[] mail = new String[3];
		Connection bdCon = null;
		try {
			bdCon = getConnection();

			Statement st = bdCon.createStatement();
			ResultSet rs = st.executeQuery("select userid, usermail, userlang from users where md5(concat(usernick,username,usermail)) = '" + id + "'");
			long userid = 0;
			if (rs.next()) {
				userid = rs.getLong(1);
				mail[0] = rs.getString(1);
				mail[1] = rs.getString(2);
				mail[2] = rs.getString(3);
			}
			rs.close();
			if (userid != 0)
				st.executeUpdate("update users set userenabled = 'T' where userid = " + userid);
			st.close();
			
			if (userid == 0)
				throw new Exception("IdIncorrect");
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
							
		
		return mail;
	}

	@Override
	public List<Object[]> retrieveAvatarParts(long id) throws Exception {
		Connection bdCon = null;
		List<Object[]> lret = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon
					.prepareStatement("select avatarparttype, avatarpartvalue, avatarpartcolor from usersavatar where userid = ?");
			ps.setLong(1, id);
			ResultSet rs = ps.executeQuery();
			lret = new ArrayList<Object[]>();
			while (rs.next()) {
				Object[] l = new Object[4];
				l[0] = rs.getString("avatarparttype");
				l[1] = rs.getString("avatarpartvalue");
				
				String colors = rs.getString("avatarpartcolor");
				if (colors.indexOf("-") > -1) {
					l[2] = "#" + colors.substring(0, colors.indexOf("-"));
					l[3] = "#" + colors.substring(colors.indexOf("-")+1);
				} else
					l[2] = "#" + colors;
					
					
				lret.add(l);
			}
			
			if (lret.size() == 0) {
				
				lret.add(new Object[]{"skin", "", "#F39C7A"});
				lret.add(new Object[]{"eyes", "eyes", "#000000"});
				lret.add(new Object[]{"hat", "", "#FFFFFF"});
				lret.add(new Object[]{"clothes", "Clothes-1", "#FFFFFF", "#FF0000"});
				
			}
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			
		}
		
		return lret;
	}

	@Override
	public void saveAvatarParts(long userid, String[][] avatarConfig, byte[] photo) throws Exception {
		Connection bdCon = null;
		
		try {
			bdCon = getConnection();
			
			PreparedStatement ps0 = bdCon.prepareStatement("update users set useravatarphoto = ? where userid = ?");
			ps0.setBytes(1, photo);
			ps0.setLong(2, userid);
			ps0.execute();
			ps0.close();
			
			Statement st = bdCon.createStatement();
			
			ResultSet rs = st.executeQuery("select avatarparttype from usersavatar where userid = " + userid);
			String saveQuery;
			if (rs.next()) {
				saveQuery = "update usersavatar set  avatarpartvalue=?, avatarpartcolor=? where avatarparttype=? and userid = ?"; 
			} else {
				saveQuery = "insert into usersavatar (avatarpartvalue, avatarpartcolor, avatarparttype, userid) values (?, ?, ?, ?)";
			}
			rs.close();st.close();
			
			PreparedStatement ps = bdCon.prepareStatement(saveQuery);
			ps.setLong(4, userid);
			
			for (String[] l:avatarConfig) {
				ps.setString(3, l[0]);
				ps.setString(1, l[1]);
				if (l.length == 4)
					ps.setString(2, l[2].substring(1) + "-" + l[3].substring(1));
				else
					ps.setString(2, l[2].substring(1));
				
				ps.execute();
			}
			
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			
		}
		
	}

	@Override
	public byte[] getUserPhoto(long userid) throws Exception {
		Connection bdCon = null;
		byte[] ret = null;
		try {
			bdCon = getConnection();
			
			Statement st = bdCon.createStatement();
			ResultSet rs = st.executeQuery("select useravatarphoto from users where userid = "+userid);
			rs.next();
			ret = rs.getBytes(1);
			rs.close();
			st.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			
		}
		return ret;
	}

	@Override
	public Test loadTests(User user, Object[][] missions)
			throws Exception {
		Connection bdCon = null;
		Test ret = null;
		try {
			bdCon = getConnection();
			
			int currentMissionIdx = 0;
			for (int i = 0; i < missions.length; i++)
				currentMissionIdx += Integer.parseInt(missions[i][3].toString());
				
			
			String clazzes = user.getClassesId() + "";

			String query = "select testid, testdescription, testquestionid, testquestiondescription, "+
								"testblocks, testupdateblocks, testquestion, testtimelimit, testxpreward, testxpblank, "+
								"qta.testanswer, qta.testtimespend, testbeforemission_pretest, testbeforemission_postest, testmissionid, qt.testanswer, "+
								"testlanguage, testtoolbox, testanswertype, t.testxpdiscountreward, t.testxpdiscounttime "+
								"from questionsandtests qat join tests t using(testid)  "+
									"join questionstest qt using (testquestionid) "+
									"left outer join (select * from questiontestanswers where userid = ?) qta using (testid, testquestionid) "+
								"where testclassid in (" +clazzes.substring(1, clazzes.length() - 1)+ ") and (testbeforemission_pretest-1=? or testbeforemission_postest-1=?)"+
								"order by testid, questionorder, questiontestanswerfinish, testclassid, testmissionid ";
			
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setLong(1, user.getId());
			ps.setLong(2, currentMissionIdx);
			ps.setLong(3, currentMissionIdx);
			
			ResultSet rs = ps.executeQuery();
			long lastTestQuestionId = 0;
			long lastTestId = 0;
			Test t = null;
			TestQuestion qt = null;
			boolean incompleteQuestion = false;
			while (rs.next()) {
				boolean addQuestion = true;
				
				if (lastTestId != rs.getLong(1)) {
					
					lastTestId = rs.getLong(1);
					t = new Test();
					t.setId(lastTestId);
					t.setDescription(rs.getString(2));
					t.setTimeRewardXP(rs.getInt(20));
					t.setTimeXP(rs.getInt(21));
					
					addQuestion = true;
					
					ret = t;
				} else {
					if (lastTestQuestionId == rs.getLong(3)) {
						addQuestion = false; // if there are two answers then not add again  
						if (!incompleteQuestion) // if the same question with the answer not completed
							t.getQuestions().remove(qt);
					}
				}
				
				if (addQuestion) {
					lastTestQuestionId = rs.getLong(3);
					
					Long missionEvaluated = rs.getLong(15); // testmissionid
					incompleteQuestion = rs.getString(11) != null && rs.getString(11).startsWith("?");
					if (missionEvaluated == 0 || (missionEvaluated == rs.getInt(13) && incompleteQuestion)) {
						
						qt = createTestQuestion(lastTestQuestionId, rs.getInt(13), rs);
						t.getQuestions().add(qt);

					} else {
						
						if (incompleteQuestion || (!(incompleteQuestion) && currentMissionIdx != missionEvaluated-1 )) {
						
							qt = createTestQuestion(lastTestQuestionId, rs.getInt(14), rs);
							t.getQuestions().add(qt);
							
						}
						
					}
					
					if (incompleteQuestion) {
						TestQuestionAnswer answer = new TestQuestionAnswer();
						answer.setAnswer(rs.getString(11).substring(1));
						answer.setTimeSpend(rs.getInt(12));
						
						qt.setPreviousAnswer(answer);
					}
				}
				
			}
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		return ret;
	}

	private TestQuestion createTestQuestion(long testQuestionId, int missionId, ResultSet rs) throws SQLException {
		TestQuestion qt = new TestQuestion();
		qt.setId(testQuestionId);
		qt.setDescription(rs.getString(4));
		qt.setBlocks(rs.getString(5));
		qt.setUpdateBlocks(rs.getBoolean(6));
		qt.setQuestion(rs.getString(7));
		qt.setTimeLimit(rs.getInt(8));
		qt.setXpReward(rs.getInt(9));
		qt.setXpRewardBlank(rs.getInt(10));
		
		qt.setAnswerType(rs.getString(19));
		
		qt.setLanguage(rs.getString(17));
		qt.setToolbox(rs.getString(18));
		
		qt.setMissionId(missionId);
		
		if (qt.getAnswerType().equals("C"))
			qt.setAnswer(rs.getString(16));
		return qt;
	}

	@Override
	public void saveTestQuestionAnswer(int testId, int questionId, int missionId, long userId,
			int timeSpent, String answer) throws Exception {
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps0 = bdCon.prepareStatement("select testid from questiontestanswers where testid = ? and testquestionid = ? and testmissionid = ? and userid = ?");
			ps0.setLong(1, testId);
			ps0.setLong(2, questionId);
			ps0.setLong(3, missionId);
			ps0.setLong(4, userId);
			
			ResultSet rs = ps0.executeQuery();
			PreparedStatement ps = null;
				
			if (rs.next()) {
				ps = bdCon.prepareStatement("update questiontestanswers set testtimespend=?, testanswer=?, questiontestanswerfinish=?, whenanswered = now() where testid = ? and testquestionid = ? and testmissionid = ? and userid = ?");
			} else {
				
				ps = bdCon.prepareStatement("insert into questiontestanswers (testtimespend, testanswer, questiontestanswerfinish, whenanswered, testid, testquestionid, testmissionid, userid) "			
														+ "	values(?, ?, ?, now(), ?, ?, ?, ?)");
			}	
			
			ps0.close();
				
			ps.setLong(1, timeSpent);
			ps.setString(2, answer);
			ps.setString(3, (answer.startsWith("?")?"F":"T"));
			ps.setLong(4, testId);
			ps.setLong(5, questionId);
			ps.setLong(6, missionId);
			ps.setLong(7, userId);
			
			ps.execute();
			
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
	}

	@Override
	public int[] calculateTestRewards(int testId, int missionId, long userId)
			throws Exception {
		Connection bdCon = null;
		int[] ret = new int[2];
		
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement("select qt.testanswertype, qta.testanswer, qt.testanswer, qta.testtimespend, qt.testtimelimit, "+ 
									   "qt.testxpreward, qt.testxpblank, t.testxpdiscountreward, t.testxpdiscounttime  "+ 
									"from questiontestanswers qta join questionstest qt using (testquestionid) "+
									    "join tests t using (testid) " + 
										"where testid = ? and testmissionid = ? and userid = ?");
			
			ps.setLong(1, testId);
			ps.setLong(2, missionId);
			ps.setLong(3, userId);
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int[] eval = null; 
				if (rs.getString(1).equals("N")) {
					eval = evaluateNumber(rs);
				} else {
					if (rs.getString(1).equals("C")) {
						eval = evaluateCode(rs);
					}
				}
				
				ret[0] += eval[0];
				ret[1] += eval[1];
				
			}
			
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	private int[] evaluateCode(ResultSet rs) throws Exception {
		int[] ret = new int[2];
		
		String answer = rs.getString(2).substring(0, 1);
		if (answer.equals("-")) // blank
			ret[0] = rs.getInt(7);
		else
			if (answer.equals("T")) {
				
				ret[0] = calculateXP(rs);
			}
		
		return ret;
	}

	private int[] evaluateNumber(ResultSet rs) throws Exception {
		int[] ret = new int[2];
		
		int studentAnswer = Integer.parseInt(rs.getString(2));
		int correctAnswer = Integer.parseInt(rs.getString(3));
		
		if (studentAnswer == -1) {
			ret[0] = rs.getInt(7);
		} else
			if (correctAnswer == studentAnswer) {
				
				ret[0] = calculateXP(rs);
			}
		
		return ret;
	}

	private int calculateXP(ResultSet rs) throws SQLException {
		int ret = rs.getInt(6);
		
		int timeSpend = rs.getInt(4);
		int timeProvided = rs.getInt(5);
		int timeFraction = rs.getInt(9); 
		
		int timeBonus = (int) Math.floor((timeProvided - timeSpend) / timeFraction); 
		
		return ret + (timeBonus * rs.getInt(8));

	}

	@Override
	public void saveUserRewards(User user) throws Exception {
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon
					.prepareStatement("update users set userxp = ?, usermoney = ? where userid = ?");
			ps.setLong(1, user.getXp());
			ps.setLong(2, user.getMoney());
			ps.setLong(3, user.getId());
			ps.executeUpdate();
			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	}

	@Override
	public void saveFlag(long userid, String name, String value)
			throws Exception {
		
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("select * from usersflags where userid = ? and flagid = ?");
			ps.setLong(1, userid);
			ps.setString(2, name);
			ResultSet rs = ps.executeQuery();
			boolean update = (rs.next());
			ps.close();
			
			String sql;
			if (update) {
				sql = "update usersflags set value = ? where userid = ? and flagid = ?";
			} else
				sql = "insert into usersflags (value, userid, flagid) values (?, ?, ?)";
			
			ps = bdCon.prepareStatement(sql);
			ps.setString(1, value);
			ps.setLong(2, userid);
			ps.setString(3, name);
			
			ps.executeUpdate();
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
	}

	@Override
	public void saveClicks(long userid, String[][] clicks) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd H:mm:ss.S");
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			bdCon.setAutoCommit(false);
			
			PreparedStatement ps = bdCon
					.prepareStatement("insert into logclicks (userid, clickid, clickmoment) values (?, ?, ?)");
			ps.setLong(1, userid);
			
			for (String[] click: clicks) {
				
				Date d = sdf.parse(click[1]);
				
				ps.setString(2, click[0]);
				ps.setTimestamp(3, new java.sql.Timestamp(d.getTime()));
				ps.executeUpdate();
			}
			
			bdCon.commit();
			ps.close();
			
		} finally {
			bdCon.setAutoCommit(true);
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	}
	
}
