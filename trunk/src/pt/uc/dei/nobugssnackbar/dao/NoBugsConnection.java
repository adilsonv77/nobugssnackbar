package pt.uc.dei.nobugssnackbar.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Logger;

import pt.uc.dei.nobugssnackbar.model.User;

public class NoBugsConnection {
	
	private static Logger log = Logger.getGlobal();
	
	public static NoBugsConnection getConnection() {
		return conn;
	}
	
	public static void buildConnection(String url, String className, String username, String password) throws ClassNotFoundException, SQLException {
		if (conn == null) {
			conn = new NoBugsConnection(url, className, username, password);
			log.info("Connected successfull");
			
		}

	}
	
	private static NoBugsConnection conn;
	
	private Connection bdCon;
	
	private NoBugsConnection(String url, String className, String username, String password) throws ClassNotFoundException, SQLException {	
		
		Class.forName(className);
		this.bdCon = DriverManager.getConnection (url, username, password);
		
	}

	public User login(String nick, String passw) throws Exception {
		PreparedStatement ps = bdCon.prepareStatement("select userid, usernick, userpassw, usermoney from users where usernick = ? and userpassw = ?");
		ps.setString(1, nick);
		ps.setString(2, passw);
		
		ResultSet rs = ps.executeQuery();
		if (!rs.next()) {
			throw new Exception("User not found");
		}
		
		User u = new User();
		u.setId(rs.getLong(1));
		u.setNick(nick);
		u.setPassw(passw);
		u.setMoney(rs.getLong(4));
		
		ps.close();
		
		
		ps = bdCon.prepareStatement("update users set userlasttime = ? where userid = ?");
		ps.setDate(1, new java.sql.Date(System.currentTimeMillis()));
		ps.setLong(2, u.getId());
		ps.executeUpdate();
		
		return u;
	}

	public void insertMission(String name, String xml) throws SQLException {

		PreparedStatement ps = bdCon.prepareStatement("insert into missions (missionname, missioncontent) values (?, ?)");
		ps.setString(1, name);
		ps.setString(2, xml);
		
		ps.executeUpdate();
		ps.close();
	}

	public String[][] loadMission(User user) throws SQLException {
		
		String query =
				"SELECT cm.missionid, cm.classid, cm.missionorder, ma.answer"+ 
			    "    FROM classesmissions cm LEFT OUTER JOIN missionsaccomplished ma ON cm.missionid = ma.missionid AND ma.userid = ?"+ 
			    "    WHERE  (ma.missionid IS NULL OR ma.achieved = 'F')  AND cm.classid IN (SELECT classid FROM classesusers uc WHERE uc.userid = ?)"+ 
			    "    ORDER BY missionorder";
			
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
		
		// TODO se o usuario pertence a mais de uma classe, ele precisa selecionar quais das missoes ele deseja fazer
		Statement st = bdCon.createStatement();
		rs = st.executeQuery("SELECT missioncontent FROM missions WHERE missionid = " + missionId);
		rs.next();
		
		String xml = rs.getString(1);
		st.close();
		
		String[][] ret = new String[1][4];
		ret[0][0] = missionId + "";
		ret[0][1] = missionOrder + "";
		ret[0][2] = xml;
		ret[0][3] = answer;
		
		return ret;
		
	}
	
	private int loadMissionAccomplished(long idMission, long idUser) throws SQLException {
		
		Statement st = bdCon.createStatement();
		ResultSet rs = st.executeQuery("select timespend from missionsaccomplished where missionid = "+idMission+" and userid = "+idUser);
		int timeSpend = -1;
		if (rs.next())
			timeSpend = rs.getInt(1);
		st.close();
		
		return timeSpend;
		
	}

	public void finishMission(User user, long idMission, int money, int timeSpend, boolean achieved, String answer) throws SQLException {
		
		int localTimeSpend = loadMissionAccomplished(idMission, user.getId());
		
		PreparedStatement ps;
		if (localTimeSpend == -1) {
			ps = bdCon.prepareStatement("insert into missionsaccomplished "
					+ "(timespend, achieved, money, answer, missionid, userid, executions) values (?, ?, ?, ?, ?, ?, 1)");
		} else {
			ps = bdCon.prepareStatement("update missionsaccomplished set timespend = ?, achieved = ?, money = ?, answer = ? "
					+ "where missionid = ? and userid = ?");
			timeSpend += localTimeSpend;
		}
		
		ps.setLong(1, timeSpend);
		ps.setString(2, (achieved?"T":"F"));
		ps.setInt(3, money);
		ps.setString(4, answer);
		ps.setLong(5, idMission);
		ps.setLong(6, user.getId());
		
		ps.executeUpdate();
		ps.close();
		if (achieved) {
			ps = bdCon.prepareStatement("update users set usermoney = ? where userid = ?");
			ps.setLong(1, user.getMoney());
			ps.setLong(2, user.getId());
			ps.executeUpdate();
			ps.close();
		}
		
	}

	public void updateMission(int idMission, String xml) throws SQLException {
		PreparedStatement ps = bdCon.prepareStatement("update missions set missioncontent = ? where missionid = ?");
		ps.setString(1, xml);
		ps.setInt(2, idMission);
		
		ps.executeUpdate();
		ps.close();		
	}

	public void addExecutionInMission(User user, int idMission) throws SQLException {
		
		int localTimeSpend = loadMissionAccomplished(idMission, user.getId());
		PreparedStatement ps;
		if (localTimeSpend == -1) {
			ps = bdCon.prepareStatement("insert into missionsaccomplished "+
					"(timespend, achieved, money, missionid, userid, executions) values (0, 'F', 0, ?, ?, 1)");
		} else {
			ps = bdCon.prepareStatement("update missionsaccomplished set executions = executions + 1 "
					+ "where missionid = ? and userid = ?");
		}
		
		ps.setLong(1, idMission);
		ps.setLong(2, user.getId());

		ps.executeUpdate();
		ps.close();
	}
	
}
