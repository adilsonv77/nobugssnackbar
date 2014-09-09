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
		return u;
	}

	public void insertMission(String name, String xml) throws SQLException {

		PreparedStatement ps = bdCon.prepareStatement("insert into missions (missionname, missioncontent) values (?, ?)");
		ps.setString(1, name);
		ps.setString(2, xml);
		
		ps.executeUpdate();
		ps.close();
	}

	public String loadMission(long id) throws SQLException {
		
		Statement st = bdCon.createStatement();
		
		ResultSet rs = st.executeQuery("select missioncontent from missions where missionid = " + id);
		rs.next();
		String xml = rs.getString(1);
		
		st.close();
		
		return xml;
		
	}
	
}
