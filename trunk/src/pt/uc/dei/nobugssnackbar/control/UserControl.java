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
	public void logoff(int timeSpend, String answer) throws SQLException {
		
		log.info("logoff " + timeSpend);
		if (this.mission != 0)
			NoBugsConnection.getConnection().finishMission(this.user, this.mission, 0, timeSpend, false, answer);
		
		this.user = null;
	}
	
	@RemoteMethod
	public Object[] login(String nick, String passw) {
		
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
			
			return new Object[]{null, this.user}; // no errors
			
		} catch (Exception e) {
			e.printStackTrace();
			return new Object[]{"Error_login"};
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
		return  new String[]{r[0][1], r[0][2], r[0][3]} ;
	}
	
	@RemoteMethod
	public String[] nextMission(int money, int timeSpend, boolean achieved, String answer) throws SQLException {
		if (this.user == null)
			return null;
		
		log.info("nextMission " + timeSpend + " " + this.user.getId() + " " + this.mission);
		
		this.user.setMoney(this.user.getMoney() + money);
		
		NoBugsConnection.getConnection().finishMission(this.user, this.mission, money, timeSpend, achieved, answer);
		
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
	
	@RemoteMethod
	public String loadAnswer(int idMission) throws SQLException {
		return NoBugsConnection.getConnection().loadAnswer(idMission, this.user.getId());
	}
	
}
