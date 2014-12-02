/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://nobugssnackbar.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package pt.uc.dei.nobugssnackbar.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import pt.uc.dei.nobugssnackbar.control.BartleTest;
import pt.uc.dei.nobugssnackbar.model.Question;
import pt.uc.dei.nobugssnackbar.model.QuestionOption;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.User;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class NoBugsConnection {

	private static Logger log = Logger.getGlobal();
	
	public static NoBugsConnection getConnection() {
		return conn;
	}

	public static void buildConnection(String url, String className,
			String username, String password) throws Exception {
		if (conn == null) {
			conn = new NoBugsConnection(url, className, username, password);
			log.info("Connected successfull");

		}

	}

	private static NoBugsConnection conn;

	private ComboPooledDataSource dataSource;

	private NoBugsConnection(String url, String className, String username,
			String password) throws Exception {

		this.dataSource = new ComboPooledDataSource();
		dataSource.setDriverClass(className);
		dataSource.setJdbcUrl(url);
		dataSource.setUser(username);
		dataSource.setPassword(password);
		
		// this is necessary to prevent the time out of connections
		dataSource.setIdleConnectionTestPeriod(60);
		dataSource.setTestConnectionOnCheckin(true);
		dataSource.setPreferredTestQuery("select last_insert_id()");

	}
	
	public ComboPooledDataSource getDataSource() {
		return dataSource;
	}

	public User login(String nick, String passw) throws Exception {
		User u = null;

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select userid, usernick, userpassw, usermoney, username, usersex, userlasttime, showhint from users where usernick = ? and userpassw = ?");
			ps.setString(1, nick);
			ps.setString(2, passw);

			ResultSet rs = ps.executeQuery();
			if (!rs.next()) {
				throw new Exception("User not found");
			}

			u = new User();
			u.setId(rs.getLong(1));
			u.setNick(nick);
			u.setPassw(passw);
			u.setMoney(rs.getLong(4));
			u.setName(rs.getString(5));
			u.setSex(rs.getString(6));
			u.setLastTime(rs.getTime(7));
			u.setShowHint(rs.getString(8).equals("T"));
			
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
			bdCon = dataSource.getConnection();
			u.setLastTime(new Time((new Date()).getTime()));
			PreparedStatement ps = bdCon.prepareStatement("update users set userlasttime = now() where userid = ?");
			
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
	
	public void insertUser(String userNick, String userPassword, String userName, String sex, int classes[]) throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			
			PreparedStatement ps = bdCon
					.prepareStatement("insert into users (usernick, userpassw, usersex, username, usermoney, showhint) values (?, ?, ?, ?, 0, 'T')");
			
			ps.setString(1, userNick);
			ps.setString(2, userPassword);
			ps.setString(3, sex);
			ps.setString(4, userName);
			
			ps.executeUpdate();
			ps.close();
			
			if (classes != null && classes.length > 0) {
				for (int classId : classes) {
					ps = bdCon.prepareStatement("insert into classesusers (classid, userid) values (?, ?)");
				
					ps.setLong(1, classId);
					ps.setLong(2, getUserId(userNick));
					
					ps.executeUpdate();
					ps.close();
				}
			}
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		
	}

	public void insertMission(String name, String xml) throws SQLException {

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into missions (missionname, missioncontent) values (?, ?)");
			ps.setString(1, name);
			ps.setString(2, xml);

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

	public String[][] loadMission(User user, int clazzId, int levelId, int missionIdx) throws SQLException {
		String[][] ret = null;

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();

			PreparedStatement ps = bdCon.prepareStatement("select missionid, missioncontent from classesmissions cm join "
															+ "missions m using (missionid) "
															+ "where classid = ? and classlevelid = ? order by missionorder "
															+ "limit ?, 1");
			
			log.info("loadMission " + clazzId + " " + levelId + " " + missionIdx);
			
			ps.setLong(1, clazzId);
			ps.setLong(2, levelId);
			ps.setLong(3, missionIdx-1);

			ResultSet rs = ps.executeQuery();
			rs.next();

			long missionId = rs.getLong(1);
			String xml = rs.getString(2);
			ps.close();
			
			ps = bdCon.prepareStatement("select timespend, answer, executions from missionsaccomplished where missionid = ? and classid = ? and userid = ?");
			
			ps.setLong(1, missionId);
			ps.setLong(2, clazzId);
			ps.setLong(3, user.getId());
			
			rs = ps.executeQuery();
			String answer = null;
			String timeSpent = null;
			String executions = "0";
			if (rs.next()) {
				
				timeSpent = rs.getString(1);
				answer = rs.getString(2);
				executions = rs.getString(3);

			}

			ps.close();

			ret = new String[1][6];
			ret[0][0] = missionId + "";
			ret[0][1] = missionIdx + "";
			ret[0][2] = xml;
			ret[0][3] = answer;
			ret[0][4] = timeSpent;
			ret[0][5] = executions;

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;

	}

	private int loadMissionAccomplished(long idMission, long idUser)
			throws SQLException {

		int timeSpend = -1;

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			Statement st = bdCon.createStatement();
			ResultSet rs = st
					.executeQuery("select timespend from missionsaccomplished where missionid = "
							+ idMission + " and userid = " + idUser);
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

	public void finishMission(User user, long idMission, long idClazz, int money,
			int timeSpend, long execution, boolean achieved, String answer) throws SQLException {

		int localTimeSpend = loadMissionAccomplished(idMission, user.getId());

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			PreparedStatement ps, psLog;
			
			psLog = bdCon.prepareStatement("insert into logmissions "
							+ "(timespend, answer, missionid, classid, userid, execution, moment) values (?, ?, ?, ?, ?, ?, now())");
			
			psLog.setLong(1, timeSpend);
			psLog.setString(2, answer);
			psLog.setLong(3, idMission);
			psLog.setLong(4, idClazz);
			psLog.setLong(5, user.getId());
			psLog.setLong(6, execution);
			log.info("logging " + idMission + " " + idClazz + " " + user.getId());
			psLog.executeUpdate(); 
			psLog.close();
			
			if (localTimeSpend == -1) {
				ps = bdCon
						.prepareStatement("insert into missionsaccomplished "
								+ "(timespend, achieved, money, answer, executions, missionid, classid, userid) values (?, ?, ?, ?, ?, ?, ?, ?)");
			} else {
				ps = bdCon
						.prepareStatement("update missionsaccomplished set timespend = ?, achieved = ?, money = ?, answer = ?, executions = ? "
								+ "where missionid = ? and classid = ? and  userid = ?");
				timeSpend += localTimeSpend;
			}

			ps.setLong(1, timeSpend);
			ps.setString(2, (achieved ? "T" : "F"));
			ps.setInt(3, money);
			ps.setString(4, answer);
			ps.setLong(5, execution);
			ps.setLong(6, idMission);
			ps.setLong(7, idClazz);
			ps.setLong(8, user.getId());

			ps.executeUpdate();
			ps.close();
			
			if (achieved) {
				ps = bdCon
						.prepareStatement("update users set usermoney = ? where userid = ?");
				ps.setLong(1, user.getMoney());
				ps.setLong(2, user.getId());
				ps.executeUpdate();
				ps.close();
			}
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
			bdCon = dataSource.getConnection();
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
			bdCon = dataSource.getConnection();
			int localTimeSpend = loadMissionAccomplished(idMission,
					user.getId());
			PreparedStatement ps;
			if (localTimeSpend == -1) {
				ps = bdCon
						.prepareStatement("insert into missionsaccomplished "
								+ "(timespend, achieved, money, missionid, classid, userid, executions) values (0, 'F', 0, ?, ?, ?, 1)");
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
			bdCon = dataSource.getConnection();
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

	public Object[][] retrieveMissions(long idUser) throws SQLException  {
		Connection bdCon = null;
		Object[][] ret = null;
		try {
			bdCon = dataSource.getConnection();
						
			PreparedStatement ps = bdCon.prepareStatement("select classid from classesusers where userid = ?");
			ps.setLong(1, idUser);

			List<Long> classes = new ArrayList<Long>();
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				classes.add(rs.getLong(1));
			}
			ps.close();

			String s =	"select c.classname, classlevelname, qtasmissoes, qtasresolvidas, c.classid, cm.classlevelid from classeslevels cl join classes c on (cl.classid = c.classid) join (" 
					   +  " select classid, classlevelid, count(*) qtasmissoes from classesmissions where find_in_set (classid, ?) group by classid, classlevelid) cm "
					   +  " on cl.classid = cm.classid and cl.classlevelorder = cm.classlevelid  left outer join ("
					   +     " select classid, classlevelid, count(*) qtasresolvidas from missionsaccomplished ma join classesmissions cm using (missionid, classid)" 
					   +     "   where ma.userid = ? and ma.achieved = 'T' group by classid, classlevelid) maz " 
					   +     "  on cl.classid = maz.classid and cl.classlevelorder = maz.classlevelid "
					   + " order by c.classname, classlevelid";

			ps = bdCon.prepareStatement( s );
			
			ps.setString(1,  classes.toString().replace("[", "").replace("]", "").replace(" ", ""));
			ps.setLong(2, idUser);
			
			List<Object[]> l = new ArrayList<>(); 
			rs = ps.executeQuery();
			while (rs.next()) {
				Object[] li = new Object[] {rs.getString(1), rs.getString(2), rs.getInt(3), rs.getInt(4), rs.getInt(5), rs.getInt(6)};
				l.add(li);
			}
			ps.close();
			
			ret = new Object[l.size()][4];
			for (int i=0; i<l.size(); i++)
				ret[i] = l.get(i);
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}

	public List<Questionnaire> retrieveQuestionnaire(long userid) throws SQLException {
		
		Connection bdCon = null;
		List<Questionnaire> ret = new ArrayList<>();
		try {
			bdCon = dataSource.getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement("select classid from classesusers where userid = ?");
			ps.setLong(1, userid);

			List<Long> classes = new ArrayList<Long>();
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				classes.add(rs.getLong(1));
			}
			ps.close();
			String clazzes = classes+"";
			
			
			List<Long> qid = new ArrayList<>();
			Statement st = bdCon.createStatement();
			rs = st.executeQuery("select distinct questionnaireid from questionnaireanswer where userid = "+userid);
			while (rs.next()) {
				qid.add(rs.getLong(1));
			}
			boolean needQuestBartle = !qid.remove(2L);
			qid.add(2L);
			rs.close();
			
			String lista = (qid + "");
			
			String questionnaire = 
					"select questionnaireid, questionnairedescription, q.questionid, questiondescription, questiontype, questionrequired, optiondescription, optionvalue, questionnaireshowrules, q0.classid from questionnaire q0" + 
							" join questionsquestionnaire using (questionnaireid)"+
							" join questions q using (questionid)"+
							" left outer join questionoptions qo on (q.questionid = qo.questionid) "+
							" where %s and questionnairefinish > now() and classid in ("+ clazzes.substring(1, clazzes.length()-1) + ")" + 
							" order by questionnaireid, questionorder, optionorder";
			
			;
			lista = String.format(questionnaire," questionnaireid not in (" +
					lista.substring(1, lista.length()-1) +
				     ")" );
			ps = bdCon.prepareStatement(lista);
			rs = ps.executeQuery();
			addQuestionnaires(ret, rs);
			rs.close();
			ps.close();
			
			if (needQuestBartle) {
				
				List<Long> list = BartleTest.selectQuestions();
				lista = (list + "");

				ps = bdCon.prepareStatement(
						String.format(questionnaire,
						            " q.questionid in (" +lista.substring(1, lista.length()-1) + ")"));
				rs = ps.executeQuery();
				addQuestionnaires(ret, rs);
				rs.close();
				ps.close();
				
				if (ret.size() > 1)
					Collections.shuffle(ret.get(ret.size()-1).getQuestions());

			}
			
				
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
		return (ret.size() == 0? null: ret);
	}

	private void addQuestionnaires(List<Questionnaire> ret, ResultSet rs) throws SQLException {

		long lastQuestionId = 0;
		long lastQuestionnaireId = 0;
		Question q = null;
		Questionnaire quest = null;
		while (rs.next()) {
			if (quest == null || lastQuestionnaireId !=  rs.getInt(1)) {
				quest = new Questionnaire();
				lastQuestionnaireId = rs.getInt(1);
				quest.setId(lastQuestionnaireId);
				quest.setDescription(rs.getString(2));
				quest.setShowRules(rs.getString(9));
				quest.setClassId(rs.getLong(10));
				quest.setQuestions(new ArrayList<Question>());
				
				ret.add(quest);
			}
			
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
					q.getOptions().add(new QuestionOption(rs.getString(7), rs.getString(8)));
				}
				
			} else
				q.getOptions().add(new QuestionOption(rs.getString(7), rs.getString(8)));

		}
		
	}

	public long createQuestionnaire(long classId, String description) throws SQLException {
		long ret = 0;
		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into questionnaire (classid, questionnairedescription) values (?, ?)");
			ps.setLong(1, classId);
			ps.setString(2, description);

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

	public long insertQuestion(long idQuest, int order, String description,
			String type, boolean required) throws SQLException {
		long ret = 0;
		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
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
			
			ps = bdCon.prepareStatement("insert into questionsquestionnaire (questionnaireid, questionid, questionorder, questionrequired) values (?,?,?,?)");
			ps.setLong(1, idQuest);
			ps.setLong(2, ret);
			ps.setLong(3, order);
			ps.setString(4, (required?"T":"F"));
			ps.executeUpdate();
			
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

	public long insertOption(long idQuestion, String description, int order, String value) throws SQLException {
		long ret = 0;
		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
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

	public void insertAnswer(long questionnaireId, long questionId, long userId, String answer) throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into questionnaireanswer (questionnaireid, questionid, userid, questionanswer) values (?, ?, ?, ?)");
			
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
			bdCon = dataSource.getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement("select userid from users where usernick = ?");
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

	public void storeMissionFail(long execution, long user, long mission, long classid,
			String[][] goals) throws SQLException {

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(
					"insert into missionsfails (missionid, userid, classid, execution, goalcount, goaldescription, goalachieved) "
									 + "values (?, ?, ?, ?, ?, ?, ?)");
			ps.setLong(1, mission);
			ps.setLong(2, user);
			ps.setLong(3, classid);
			ps.setLong(4, execution);
			
			for (int i=0; i<goals.length; i++) {
				
				ps.setLong(5, i+1);
				ps.setString(6, goals[i][0]);
				ps.setString(7, goals[i][1].substring(0, 1).toUpperCase());
				
				ps.executeUpdate();
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

	public void storeMissionError(int execution, long user, long mission,
			long classid, String idError, String blockId, String errorMessage) throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(
					"insert into missionserrors (missionid, userid, classid, execution, errorid, blockid, errormessage) "
									 + "values (?, ?, ?, ?, ?, ?, ?)");
			ps.setLong(1, mission);
			ps.setLong(2, user);
			ps.setLong(3, classid);
			ps.setLong(4, execution);
			
			ps.setString(5, idError);
			ps.setString(6, blockId);
			ps.setString(7, errorMessage);

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

}
