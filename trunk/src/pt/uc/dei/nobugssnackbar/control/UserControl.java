package pt.uc.dei.nobugssnackbar.control;

import java.security.MessageDigest;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.User;

@RemoteProxy(scope=ScriptScope.SESSION)
public class UserControl {

	private static Logger log = Logger.getGlobal();
	private User user;
	private long mission = 0;
	private long classid = 0;
	private long levelid = 0;
	private int missionidx;
	
	@RemoteMethod
	public Object[] verifyLogged() throws SQLException {
		return new Object[]{user != null, this.user, (user == null?null:retrieveMissions()), this.classid, this.levelid , this.missionidx};
	}
	
	@RemoteMethod
	public void logoff(int timeSpend, String answer) throws SQLException {
		
		log.info("logoff " + timeSpend);
		if (this.mission != 0)
			NoBugsConnection.getConnection().finishMission(this.user, this.mission, this.classid, 0, timeSpend, false, answer);
		
		this.user = null;
		this.classid = 0;
		this.levelid = 0;
		this.missionidx = 0;
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
			
			return new Object[]{null, this.user, retrieveMissions()}; // no errors
			
		} catch (Exception e) {
			e.printStackTrace();
			return new Object[]{"Error_login"};
		}
		
	}
	
	@RemoteMethod
	public String[] loadMission(int clazzId, int levelId, int missionIdx) throws SQLException {
		String[][] r = NoBugsConnection.getConnection().loadMission(this.user, clazzId, levelId, missionIdx);
		
		this.mission = Integer.parseInt(r[0][0]);
		this.classid = clazzId;
		this.levelid = levelId;
		this.missionidx = missionIdx;

		return  new String[]{r[0][1], r[0][2], r[0][3], r[0][4]} ;
	}
	
	@RemoteMethod
	public void saveMission(int money, int timeSpend, boolean achieved, String answer) throws SQLException {
		
		if (this.user == null)
			return;
		
		//log.info("saveMission " + timeSpend + " " + this.user.getId() + " " + this.mission);
		
		this.user.setMoney(this.user.getMoney() + money);
		
		NoBugsConnection.getConnection().finishMission(this.user, this.mission, this.classid, money, timeSpend, achieved, answer);

		if (achieved) {
			// when saveMission is called with achieved = true, this means that finished the mission
			this.classid = 0;
			this.levelid = 0;
			this.missionidx = 0;
			this.mission = 0;
		}
		
	}
	
	@RemoteMethod
	public void saveQuestionnaire(String[][] answers) {
		for(int i = 0;i< answers.length;i++) {
			System.out.println(answers[i][1]);
			System.out.println(answers[i][2]);
			System.out.println(answers[i][3]);
		}
	}
	
	
	@RemoteMethod
	public long retrieveMoney() {
		if (this.user == null)
			return 0;
		
		return this.user.getMoney();
	}
	
	@RemoteMethod
	public void registerExecution() throws SQLException {
		NoBugsConnection.getConnection().addExecutionInMission(this.user, this.mission, this.classid);
	}
	
	@RemoteMethod
	public String loadAnswer(int idMission) throws SQLException {
		return NoBugsConnection.getConnection().loadAnswer(idMission, this.user.getId());
	}
	
	@RemoteMethod
	public Object[][] retrieveMissions() throws SQLException {
		return NoBugsConnection.getConnection().retrieveMissions(this.user.getId());
	}
	
	@RemoteMethod
	public List<Questionnaire> retrieveQuestionnaire() throws SQLException {
		return NoBugsConnection.getConnection().retrieveQuestionnaire(this.user.getId());
	}
}
