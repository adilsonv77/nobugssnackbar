package pt.uc.dei.nobugssnackbar.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import pt.uc.dei.nobugssnackbar.model.Question;
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
					.prepareStatement("select userid, usernick, userpassw, usermoney, username, usersex, userlasttime from users where usernick = ? and userpassw = ?");
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

			ps.close();

			ps = bdCon
					.prepareStatement("update users set userlasttime = now() where userid = ?");
			//ps.setTimestamp(1, new java.sql.Timestamp(System.currentTimeMillis()));
			ps.setLong(1, u.getId());
			ps.executeUpdate();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return u;
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
			
			ps = bdCon.prepareStatement("select timespend, answer from missionsaccomplished where missionid = ? and classid = ? and userid = ?");
			
			ps.setLong(1, missionId);
			ps.setLong(2, clazzId);
			ps.setLong(3, user.getId());
			
			rs = ps.executeQuery();
			String answer = null;
			String timeSpent = null;
			if (rs.next()) {
				
				timeSpent = rs.getString(1);
				answer = rs.getString(2);

			}

			ps.close();

			ret = new String[1][5];
			ret[0][0] = missionId + "";
			ret[0][1] = missionIdx + "";
			ret[0][2] = xml;
			ret[0][3] = answer;
			ret[0][4] = timeSpent;

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
			int timeSpend, boolean achieved, String answer) throws SQLException {

		int localTimeSpend = loadMissionAccomplished(idMission, user.getId());

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			PreparedStatement ps;
			if (localTimeSpend == -1) {
				ps = bdCon
						.prepareStatement("insert into missionsaccomplished "
								+ "(timespend, achieved, money, answer, missionid, classid, userid, executions) values (?, ?, ?, ?, ?, ?, ?, 1)");
			} else {
				ps = bdCon
						.prepareStatement("update missionsaccomplished set timespend = ?, achieved = ?, money = ?, answer = ? "
								+ "where missionid = ? and classid = ? and  userid = ?");
				timeSpend += localTimeSpend;
			}

			ps.setLong(1, timeSpend);
			ps.setString(2, (achieved ? "T" : "F"));
			ps.setInt(3, money);
			ps.setString(4, answer);
			ps.setLong(5, idMission);
			ps.setLong(6, idClazz);
			ps.setLong(7, user.getId());

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

			ps = bdCon.prepareStatement(
					"select c.classname, classlevelname, qtasmissoes, qtasresolvidas, c.classid, cm.classlevelid from classeslevels cl join classes c on (cl.classid = c.classid) join (" 
					   +  " select classid, classlevelid, count(*) qtasmissoes from classesmissions where find_in_set (classid, ?) group by classid, classlevelid) cm "
					   +  " on cl.classid = cm.classid and cl.classlevelorder = cm.classlevelid  left outer join ("
					   +     " select classid, classlevelid, count(*) qtasresolvidas from missionsaccomplished ma join classesmissions cm using (missionid, classid)" 
					   +     "   where ma.userid = ? and ma.achieved = 'T' group by classid, classlevelid) maz " 
					   +     "  on cl.classid = maz.classid and cl.classlevelorder = maz.classlevelid "
					   + " order by c.classname");
			
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

	public Questionnaire retrieveQuestionnaire(long userid) throws SQLException {
		
		Connection bdCon = null;
		Questionnaire ret = null;
		try {
			bdCon = dataSource.getConnection();
			
			String questionnaire = 
					"select questionnaireid, questionnairedescription, q.questionid, questiondescription, questiontype, questionrequired, optiondescription from questionnaire " + 
							" join questionsquestionnaire using (questionnaireid)"+
							" join questions q using (questionid)"+
							" left outer join questionoptions qo on (q.questionid = qo.questionid)"+
							" where questionnaireid not in (" +
							           "select distinct questionnaireid from questionnaireanswer where userid = "+userid+
									")" +
							" order by questionnaireid, questionorder, optionorder";
			
			PreparedStatement ps = bdCon.prepareStatement(questionnaire);
			
			ResultSet rs = ps.executeQuery();
			long lastQId = 0;
			Question q = null;
			while (rs.next()) {
				if (ret == null) {
					ret = new Questionnaire();
					ret.setId(rs.getInt(1));
					ret.setDescription(rs.getString(2));
					ret.setQuestions(new ArrayList<Question>());
				}
				
				if (lastQId != rs.getInt(3)) {
					
					q = new Question();
					q.setId(rs.getInt(3));
					lastQId = q.getId();
					
					
					ret.getQuestions().add(q);
					q.setDescription(rs.getString(4));
					q.setType(rs.getString(5));
					q.setRequired(rs.getString(6).equals("T"));
					
					if (rs.getString(7) != null) {
						q.setOptions(new ArrayList<String>());
						q.getOptions().add(rs.getString(7));
					}
					
				} else
					q.getOptions().add(rs.getString(7));

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

	public long insertOption(long idQuestion, String description, int order) throws SQLException {
		long ret = 0;
		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into questionoptions (questionid, optiondescription, optionorder) values (?, ?, ?)");
			ps.setLong(1, idQuestion);
			ps.setString(2, description);
			ps.setInt(3, order);

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

}
