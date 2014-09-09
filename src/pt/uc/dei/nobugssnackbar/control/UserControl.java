package pt.uc.dei.nobugssnackbar.control;

import java.security.MessageDigest;
import java.sql.SQLException;
import java.util.logging.Logger;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.User;

@RemoteProxy(scope=ScriptScope.SESSION)
public class UserControl {

	private static Logger log = Logger.getGlobal();
	private User user;

	@RemoteMethod
	public void log() {
		log.info(user + "");
	}
	
	@RemoteMethod
	public String login(String nick, String passw) {
		
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("MD5");
			md.update(passw.getBytes());
			byte[] digest = md.digest();
			StringBuffer sb = new StringBuffer();
			for (byte b : digest) {
				sb.append(String.format("%02x", b & 0xff));
			}
			
			this.user = NoBugsConnection.getConnection().login(nick, sb.toString());
			
			return null; // no errors
			
		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
		
		
	}
	
	@RemoteMethod
	public String loadMission() throws SQLException {
		return NoBugsConnection.getConnection().loadMission(1);
	}
	
	@RemoteMethod
	public long retrieveMoney() {
		return this.user.getMoney();
	}
}
