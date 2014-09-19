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
	private int mission = 0;
	
	@RemoteMethod
	public boolean verifyLogged() {
		return user != null;
	}
	
	@RemoteMethod
	public void logoff(int timeSpend) throws SQLException {
		
		log.info("logoff " + timeSpend);
		if (this.mission != 0)
			NoBugsConnection.getConnection().finishMission(this.user, this.mission, 0, timeSpend, false);
		
		this.user = null;
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
			return "Error_login";
		}
		
	}
	
	@RemoteMethod
	public String[] loadMission() throws SQLException {
		String[][] r = NoBugsConnection.getConnection().loadMission(this.user);
		
		if (r == null) {
			this.mission = 0;
			return null;
		}
		
		this.mission = Integer.parseInt(r[0][0]);
		return  new String[]{r[0][1], r[0][2]} ;
	}
	
	@RemoteMethod
	public String[] nextMission(int money, int timeSpend, boolean achieved) throws SQLException {
		
		log.info("nextMission " + timeSpend + " " + this.user.getId() + " " + this.mission);
		
		this.user.setMoney(this.user.getMoney() + money);
		
		NoBugsConnection.getConnection().finishMission(this.user, this.mission, money, timeSpend, achieved);
		
		return loadMission();
	}
	
	@RemoteMethod
	public long retrieveMoney() {
		if (this.user == null)
			return 0;
		
		return this.user.getMoney();
	}
	
	@RemoteMethod
	public void registerExecution() throws SQLException {
		NoBugsConnection.getConnection().addExecutionInMission(this.user, this.mission);
	}
}
