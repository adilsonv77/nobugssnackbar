package pt.uc.dei.nobugssnackbar.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Logger;

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

	public User login(String nick, String passw) throws Exception {
		User u = null;

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();

			PreparedStatement ps = bdCon
					.prepareStatement("select userid, usernick, userpassw, usermoney from users where usernick = ? and userpassw = ?");
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

			ps.close();

			ps = bdCon
					.prepareStatement("update users set userlasttime = ? where userid = ?");
			ps.setDate(1, new java.sql.Date(System.currentTimeMillis()));
			ps.setLong(2, u.getId());
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

	public String[][] loadMission(User user) throws SQLException {
		String[][] ret = null;
		String query = "SELECT cm.missionid, cm.classid, cm.missionorder, ma.answer"
				+ "    FROM classesmissions cm LEFT OUTER JOIN missionsaccomplished ma ON cm.missionid = ma.missionid AND ma.userid = ?"
				+ "    WHERE  (ma.missionid IS NULL OR ma.achieved = 'F')  AND cm.classid IN (SELECT classid FROM classesusers uc WHERE uc.userid = ?)"
				+ "    ORDER BY missionorder";

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();

			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setLong(1, user.getId());
			ps.setLong(2, user.getId());

			ResultSet rs = ps.executeQuery();
			boolean hasMoreMissions = rs.next();
			if (!hasMoreMissions) {
				ps.close();
				return null;
			}

			long missionId = rs.getLong(1);
			int missionOrder = rs.getInt(3);
			String answer = rs.getString(4);
			ps.close();

			// TODO se o usuario pertence a mais de uma classe, ele precisa
			// selecionar quais das missoes ele deseja fazer
			Statement st = bdCon.createStatement();
			rs = st.executeQuery("SELECT missioncontent FROM missions WHERE missionid = "
					+ missionId);
			rs.next();

			String xml = rs.getString(1);
			st.close();

			ret = new String[1][4];
			ret[0][0] = missionId + "";
			ret[0][1] = missionOrder + "";
			ret[0][2] = xml;
			ret[0][3] = answer;

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

	public void finishMission(User user, long idMission, int money,
			int timeSpend, boolean achieved, String answer) throws SQLException {

		int localTimeSpend = loadMissionAccomplished(idMission, user.getId());

		Connection bdCon = null;
		try {
			bdCon = dataSource.getConnection();
			PreparedStatement ps;
			if (localTimeSpend == -1) {
				ps = bdCon
						.prepareStatement("insert into missionsaccomplished "
								+ "(timespend, achieved, money, answer, missionid, userid, executions) values (?, ?, ?, ?, ?, ?, 1)");
			} else {
				ps = bdCon
						.prepareStatement("update missionsaccomplished set timespend = ?, achieved = ?, money = ?, answer = ? "
								+ "where missionid = ? and userid = ?");
				timeSpend += localTimeSpend;
			}

			ps.setLong(1, timeSpend);
			ps.setString(2, (achieved ? "T" : "F"));
			ps.setInt(3, money);
			ps.setString(4, answer);
			ps.setLong(5, idMission);
			ps.setLong(6, user.getId());

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

	public void addExecutionInMission(User user, int idMission)
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
								+ "(timespend, achieved, money, missionid, userid, executions) values (0, 'F', 0, ?, ?, 1)");
			} else {
				ps = bdCon
						.prepareStatement("update missionsaccomplished set executions = executions + 1 "
								+ "where missionid = ? and userid = ?");
			}

			ps.setLong(1, idMission);
			ps.setLong(2, user.getId());

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

}
