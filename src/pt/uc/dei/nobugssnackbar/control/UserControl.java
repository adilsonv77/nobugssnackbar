package pt.uc.dei.nobugssnackbar.control;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.BartleType;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.servlets.HintImage;
import pt.uc.dei.nobugssnackbar.util.HexImage;

@RemoteProxy(scope=ScriptScope.SESSION)
public class UserControl {

	public static String encrypt(String passw) throws NoSuchAlgorithmException {
		
		MessageDigest md;
		md = MessageDigest.getInstance("MD5");
		md.update(passw.getBytes());
		byte[] digest = md.digest();
		StringBuffer sb = new StringBuffer();
		for (byte b : digest) {
			sb.append(String.format("%02x", b & 0xff));
		}
		return sb.toString();
		
	}
	
	private static Logger log = Logger.getGlobal();
	private User user;
	private long mission = 0;
	private long classid = 0;
	private long levelid = 0;
	private int missionidx;
	private boolean registeredUserLastTime;
	
	@RemoteMethod
	public Object[] verifyLogged() throws SQLException {
		return new Object[]{user != null, this.user, (user == null?null:retrieveMissions()), (user == null?null:retrieveLeaderBoard()), this.classid, this.levelid , this.missionidx};
	}
	
	@RemoteMethod
	public void logoff(int timeSpend, long execution, String answer) throws SQLException {
		
		log.info("logoff " + timeSpend);
		if (this.mission != 0)
			NoBugsConnection.getConnection().finishMission(this.user, this.mission, this.classid, 0, timeSpend, execution, false, answer);
		
		this.user = null;
		this.classid = 0;
		this.levelid = 0;
		this.missionidx = 0;
		this.mission = 0;
		this.registeredUserLastTime = false;
	}
	
	@RemoteMethod
	public Object[] login(String nick, String passw) {
		
		try {
			
			this.user = NoBugsConnection.getConnection().login(nick, encrypt(passw));
			
			return new Object[]{null, this.user, retrieveMissions(), retrieveLeaderBoard()}; // no errors
			
		} catch (Exception e) {
			e.printStackTrace();
			return new Object[]{"Error_login"};
		}
		
	}
	
	@RemoteMethod
	public void updateUserLastTime() {
		
		try {
			if (!this.registeredUserLastTime) {
				NoBugsConnection.getConnection().updateUserLastTime(this.user);
				this.registeredUserLastTime = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@RemoteMethod
	public String[] loadMission(int clazzId, int levelId, int missionIdx) throws SQLException {
		String[][] r = NoBugsConnection.getConnection().loadMission(this.user, clazzId, levelId, missionIdx);
		
		this.mission = Integer.parseInt(r[0][0]);
		this.classid = clazzId;
		this.levelid = levelId;
		this.missionidx = missionIdx;

		return  new String[]{r[0][1], r[0][2], r[0][3], r[0][4], r[0][5]} ;
	}
	
	@RemoteMethod
	public String loadMissionAnswer(int clazzId, int levelId, int missionIdx) throws SQLException {
		String[][] r = NoBugsConnection.getConnection().loadMission(this.user, clazzId, levelId, missionIdx);
		
		return  r[0][3] ;
	}
	
	
	@RemoteMethod
	public void saveMission(int money, int timeSpend, long execution, boolean achieved, String answer) throws SQLException {
		
		if (this.user == null)
			return;
		
		if (achieved)
		  log.info("saveMission " + timeSpend + " " + this.user.getId() + " " + this.mission + " " + this.classid);
		
		this.user.setMoney(this.user.getMoney() + money);
		
		NoBugsConnection.getConnection().finishMission(this.user, this.mission, this.classid, money, timeSpend, execution, achieved, answer);

		if (achieved) {
			// when saveMission is called with achieved = true, this means that finished the mission
			this.classid = 0;
			this.levelid = 0;
			this.missionidx = 0;
			this.mission = 0;
		}
		
	}
	
	@RemoteMethod
	public void saveQuestionnaire(String[][] answers) throws NumberFormatException, SQLException {
		NoBugsConnection nobugs = NoBugsConnection.getConnection();
		for(int i = 0;i< answers.length;i++) {
			
			nobugs.insertAnswer(Long.parseLong(answers[i][0]), Long.parseLong(answers[i][1]), this.user.getId(), answers[i][2]);
			
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
	
	@RemoteMethod 
	public List<BartleType> bartleClassification(String userName) throws SQLException {
		return BartleTest.bartleClassification(NoBugsConnection.getConnection().getUserId(userName));
	}
	
	@RemoteMethod 
	public void convertHexToImage(String key, String hex) throws NoSuchAlgorithmException, IOException {
		HintImage.getImages().put(key, HexImage.toImage(hex));
	}
	
	@RemoteMethod
	public boolean[] existsImageKey(String key[]) {
		boolean b[] = new boolean[key.length];
		
		for (int i = 0; i < b.length;i++) {
			b[i] = HintImage.getImages().containsKey(key[i]);
		}
		
		return b;
	}
	
	@RemoteMethod
	public void missionFail(int execution, String[][] goals) throws SQLException {
		
		NoBugsConnection.getConnection().storeMissionFail(execution, this.user.getId(), this.mission, this.classid, goals);
		
	}
	
	@RemoteMethod
	public void missionError(int execution, String idError, String blockId, String errorMessage) throws SQLException {
		
		NoBugsConnection.getConnection().storeMissionError(execution, this.user.getId(), this.mission, this.classid, idError, blockId, errorMessage);
		
	}
	
	@RemoteMethod
	public String[] loadMachine(int code) throws SQLException {
		return NoBugsConnection.getConnection().loadMachine(code);
	}
	
	@RemoteMethod
	public List<String> listMachinesFromUser() throws SQLException {
		
		return NoBugsConnection.getConnection().listMachines(this.user.getId());
	}
	
	@RemoteMethod
	public void buyMachine(int machineId) throws SQLException {
		NoBugsConnection.getConnection().buyMachine(this.user.getId(), machineId);
	}

	@RemoteMethod
	public List<Object[]> loadWholeMachineData(Integer[] machineid) throws SQLException {
		return NoBugsConnection.getConnection().loadMachineData(machineid);
	}
	
	@RemoteMethod
	public List<Object[]> loadMachinesFromUser() throws SQLException {
		
		List<String> machines = NoBugsConnection.getConnection().listMachines(this.user.getId());
		
		Integer[] im = new Integer[machines.size()];
		for (int i = 0; i < im.length; i++)
			im[i] = Integer.parseInt( machines.get(i) );
		
		
		return loadWholeMachineData(im);
	}

	private List<Object[]> retrieveLeaderBoard() throws SQLException {
		return NoBugsConnection.getConnection().retrieveLeaderBoard(this.user.getId(), this.user.getClassesId());
	}

	
}
