package pt.uc.dei.nobugssnackbar.control;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.Filter;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.AchievementDao;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.dao.LanguageDao;
import pt.uc.dei.nobugssnackbar.dao.MessageDao;
import pt.uc.dei.nobugssnackbar.dao.UserDao;
import pt.uc.dei.nobugssnackbar.model.Achievement;
import pt.uc.dei.nobugssnackbar.model.Language;
import pt.uc.dei.nobugssnackbar.model.Message;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.Test;
import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.servlets.HintImage;
import pt.uc.dei.nobugssnackbar.util.HexImage;
import pt.uc.dei.nobugssnackbar.util.SendMail;
import sun.misc.BASE64Decoder;

@RemoteProxy(scope = ScriptScope.SESSION)
@Filter(type = UserControlVerifyUser.class)
public class UserControl {

	private GameDao gameDao;
	private SendMail mail;
	private AbstractFactoryDao factoryDao;
	private String appFolder;
	private AchievementDao achievDao;

	public UserControl() {
		WebContext ctx = WebContextFactory.get();
		
		this.factoryDao = (AbstractFactoryDao) ctx
				.getServletContext().getAttribute("factoryDao");
		this.gameDao = factoryDao.getGameDao();
		this.achievDao = factoryDao.getAchievementDao();
		
		this.appFolder = ctx.getServletContext().getRealPath("/");
		this.mail = new SendMail(this.appFolder);

	}
	
	// use this constructor for test
	public UserControl(AbstractFactoryDao factoryDao, String appFolder) {
		this.factoryDao = factoryDao;
		this.gameDao = factoryDao.getGameDao();
		this.achievDao = factoryDao.getAchievementDao();
		this.appFolder = appFolder;
		
		this.mail = new SendMail(appFolder);
	}

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
	private Object[][] missions;
	private List<Object[]> avatar;
	private int xpToHat;
	private int xpToClothes;
	private boolean achievedMission;
	private int xpToSpecialSkin;
	private int xpToAdd;

	public User getUser() {
		return user;
	}
	
	@SuppressWarnings("rawtypes")
	@RemoteMethod
	public Object[] verifyLogged() throws Exception {
		log.info("verifiedLogged");
		
		if (user == null) {
			
			this.missions = null;
			this.xpToHat = 0;
			this.xpToClothes = 0;
			this.xpToSpecialSkin = 0;
			this.xpToAdd = 0;
			
		}
		else {
			
			Map m = retrieveMissions();

			this.missions = (Object[][]) m.get("missions");
			this.xpToHat = (int) m.get("xpToHat");
			this.xpToClothes = (int) m.get("xpToClothes");
			this.xpToSpecialSkin = (int) m.get("xpToSpecialSkin");
			this.xpToAdd = (int) m.get("xpToAdd");
			
		}
		return new Object[] { user != null, this.user, this.missions,
				(user == null ? null : retrieveLeaderBoard()), this.avatar, 
				this.xpToHat, this.xpToClothes, this.xpToSpecialSkin, this.xpToAdd,
				this.classid, this.levelid, this.missionidx, this.achievedMission,
				 };
	}

	@RemoteMethod
	public void logoff() throws Exception { // int timeSpend, long execution, String answer)

		log.info("logoff");

		WebContext ctx = WebContextFactory.get();
		ctx.getSession().removeAttribute("userid");
		
		this.user = null;
		this.classid = 0;
		this.levelid = 0;
		this.missionidx = 0;
		this.mission = 0;
		this.registeredUserLastTime = false;
	}

	@SuppressWarnings("rawtypes")
	@RemoteMethod
	public Object[] login(String nick, String passw) {

		try {

			this.user = gameDao.login(nick, encrypt(passw));

			Map m = retrieveMissions();
			this.missions = (Object[][]) m.get("missions");
			this.xpToHat = (int) m.get("xpToHat");
			this.xpToClothes = (int) m.get("xpToClothes");
			this.xpToSpecialSkin = (int) m.get("xpToSpecialSkin");
			this.xpToAdd = (int) m.get("xpToAdd");

			this.avatar = retrieveAvatarParts();

			// I use this to monitor in Tomcat Manager ;)
			WebContext ctx = WebContextFactory.get();
			ctx.getSession().setAttribute("userid", this.user.getId());
			
			return new Object[] { null, this.user, this.missions, 
					retrieveLeaderBoard(), this.avatar, this.xpToHat, this.xpToClothes, this.xpToSpecialSkin, this.xpToAdd }; // no errors

		} catch (Exception e) {
			e.printStackTrace();
			return new Object[] { "Error_login" };
		}

	}

	private List<Object[]> retrieveAvatarParts() throws Exception {
		return gameDao.retrieveAvatarParts(this.user.getId());
	}

	@RemoteMethod
	public void updateUserLastTime() {

		try {
			if (!this.registeredUserLastTime) {
				gameDao.updateUserLastTime(this.user);
				this.registeredUserLastTime = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	@RemoteMethod
	public void changeUser(String mail, String password) throws Exception {
		
		this.user.setMail(mail);
		if (password != null)
			this.user.setPassw(encrypt(password));
		
		gameDao.changeUser(this.user);
		
	}

	@RemoteMethod
	public void saveFlag(String name, String value) throws Exception {
		this.user.getFlags().put(name, value);
		
		gameDao.saveFlag(this.user.getId(), name, value);
	}
	
	@RemoteMethod
	public String[] loadMission(int clazzId, int levelId, int missionIdx)
			throws Exception {
		String[][] r = gameDao.loadMission(this.user, clazzId, levelId,
				missionIdx);

		this.mission = Integer.parseInt(r[0][0]);
		this.classid = clazzId;
		this.levelid = levelId;
		this.missionidx = missionIdx;
		
		this.achievedMission = r[0][7].equals( "T" );

		return new String[] { r[0][1], r[0][2], r[0][3], r[0][4], r[0][5], r[0][6], r[0][7], r[0][8] };
	}

	@RemoteMethod
	public String loadMissionAnswer(int clazzId, int levelId, int missionIdx)
			throws Exception {
		String[][] r = gameDao.loadMission(this.user, clazzId, levelId,
				missionIdx);

		return r[0][3];
	}

	@RemoteMethod
	public List<Map<String, String>> saveMission(int xp, int money, int timeSpend, long execution,
			boolean achieved, int typeRunning, float zoomLevel, String answer) throws Exception {

		if (this.user == null)
			return null;

		if (achieved)
			log.info("saveMission " + timeSpend + " " + this.user.getId() + " "
					+ this.mission + " " + this.classid);

		this.user.setXp(this.user.getXp() + xp);
		this.user.setMoney(this.user.getMoney() + money);

		gameDao.finishMission(this.user, this.mission, this.classid, xp, money,
				timeSpend, execution, achieved, typeRunning, zoomLevel, answer);

		List<Map<String, String>> ret = null; 
		
		if (achieved) {
			
			ret = achievDao.verifyAchievements(this.user.getId(), this.classid);
			
			// when saveMission is called with achieved = true, this means that
			// finished the mission
			this.classid = 0;
			this.levelid = 0;
			this.missionidx = 0;
			this.mission = 0;
		}
		
		return ret;

	}

	@RemoteMethod
	public void exitMission(int timeSpend, long execution, int typeRunning, float zoomLevel, String answer) throws Exception {
		
		if (!this.achievedMission)
			saveMission(0, 0, timeSpend, execution, false, typeRunning, zoomLevel, answer);
		
		this.classid = 0;
		this.levelid = 0;
		this.missionidx = 0;
		this.mission = 0;
		
	}
	
	@RemoteMethod
	public void saveQuestionnaire(String[][] answers)
			throws NumberFormatException, Exception {
		for (int i = 0; i < answers.length; i++) {

			gameDao.insertAnswer(Long.parseLong(answers[i][0]),
					Long.parseLong(answers[i][1]), this.user.getId(),
					answers[i][2]);

		}
	}

	@RemoteMethod
	public Object[] retrieveReward() {
		if (this.user == null)
			return new Object[]{0, 0};

		return new Object[]{this.user.getXp(), this.user.getMoney()};
	}

	@RemoteMethod
	public String loadAnswer(int idMission) throws Exception {
		return gameDao.loadAnswer(idMission, this.user.getId());
	}

	
	@SuppressWarnings("rawtypes")
	private Map retrieveMissions() throws Exception {
		return gameDao.retrieveMissions(this.user.getId());
	}

	@RemoteMethod
	public List<Questionnaire> retrieveQuestionnaire() throws Exception {
		return gameDao.retrieveQuestionnaire(this.user, this.missions);
	}

	@RemoteMethod
	public List<BartleType> bartleClassification(String userName)
			throws Exception {
		return BartleTest.bartleClassification(gameDao.getUserId(userName));
	}

	@RemoteMethod
	public void convertHexToImage(String key, String hex)
			throws NoSuchAlgorithmException, IOException {
		HintImage.getImages().put(key, HexImage.toImage(hex));
	}

	@RemoteMethod
	public boolean[] existsImageKey(String key[]) {
		boolean b[] = new boolean[key.length];

		for (int i = 0; i < b.length; i++) {
			b[i] = HintImage.getImages().containsKey(key[i]);
		}

		return b;
	}

	@RemoteMethod
	public void missionFail(int execution, int testCount, String[][] goals) throws Exception {

		gameDao.storeMissionFail(execution, testCount, this.user.getId(), this.mission,
				this.classid, goals);

	}

	@RemoteMethod
	public void missionError(int execution, int testCount, String idError, String blockId,
			String errorMessage) throws Exception {

		gameDao.storeMissionError(execution, testCount, this.user.getId(), this.mission,
				this.classid, idError, blockId, errorMessage);

	}

	@RemoteMethod
	public String[] loadMachine(int code) throws Exception {
		return gameDao.loadMachine(code, this.appFolder + "/images");
	}

	@RemoteMethod
	public List<String> listMachinesFromUser() throws Exception {

		return gameDao.listMachines(this.user.getId());
	}

	@RemoteMethod
	public void buyMachine(int machineId) throws Exception {
		gameDao.buyMachine(this.user.getId(), machineId);
	}

	@RemoteMethod
	public List<Object[]> loadWholeMachineData(Integer[] machineid)
			throws Exception {
		return gameDao.loadMachineData(machineid, this.appFolder + "/images");
	}

	@RemoteMethod
	public List<Object[]> loadMachinesFromUser() throws Exception {

		List<String> machines = gameDao.listMachines(this.user.getId());

		Integer[] im = new Integer[machines.size()];
		for (int i = 0; i < im.length; i++)
			im[i] = Integer.parseInt(machines.get(i));

		return loadWholeMachineData(im);
	}

	private List<Object[]> retrieveLeaderBoard() throws Exception {
		List<Object[]> ret = gameDao.retrieveLeaderBoard(this.user.getId(),
				this.user.getClassId());
		
		if (ret.size() == 0) {
			ret.add(new Object[] {this.user.getId(), this.user.getName(), 0, 0, 0, 0});
		}
		
		return ret;
	}

	@RemoteMethod
	public boolean isUserAllowed(String usernick) throws Exception {
		return gameDao.isUserAllowed(usernick);
	}

	@RemoteMethod
	public boolean isEmailAllowed(String usermail) throws Exception {
		return gameDao.isEmailAllowed(usermail);
	}

	@RemoteMethod
	public void registerUser(String userNick, String userPassword,
			String userName, String sex, String lang, String userMail)
			throws Exception {
		// according the language
		long clazz = gameDao.getDefaultClass(lang);

		gameDao.insertUser(userNick, encrypt(userPassword), userName, sex,
				userMail, lang, new long[] { clazz });

		// send a welcome email
		mail.sendRegisterMail(userMail, encrypt(userNick + userName + userMail), lang);
	}
	
	@RemoteMethod
	public boolean sendNewPassword(String mail) throws Exception {
		UserDao uDao = factoryDao.getUserDao();
		User user = uDao.findByMail(mail);
		if (user == null)
			return false;
		
		String newPassw = uDao.createNewPassword(user);
		this.mail.sendOneMail(mail, "nova senha", newPassw);
		return true;
	}
	
	@RemoteMethod
	public String getMessage(String code, String lang) throws Exception {
		
		LanguageDao langDao = factoryDao.getLanguageDao();
		List<Language> langs = langDao.listSimilarCode(lang);
		Language l = langs.get(0);
		
		MessageDao msgDao = factoryDao.getMessageDao();
		Message m = msgDao.readMessage(code, l.getId());
		
		return m.getMessageText();
		
	}
	
	@RemoteMethod
	public String loadBlocksToEditor() {
		WebContext ctx = WebContextFactory.get();
		String blocks = (String) ctx.getSession().getAttribute("blocks");
		
		return blocks;
	}
	
	@RemoteMethod
	public void saveBlocksFromEditor(String xml) {
		WebContext ctx = WebContextFactory.get();
		ctx.getSession().setAttribute("blocks", xml);
	}
	
	@RemoteMethod
	public void saveAvatar(String photo, String[][] avatarConfig) throws Exception {
		
		photo = photo.substring(photo.indexOf(",")+1);
		
		this.avatar.clear();
		for (int i=0;i<avatarConfig.length;i++)
			if (avatarConfig[i].length == 2)
				this.avatar.add(new Object[]{avatarConfig[i][0], avatarConfig[i][1], "#FFFFFF" });
			else
				if (avatarConfig[i].length == 3)
					this.avatar.add(new Object[]{avatarConfig[i][0], avatarConfig[i][1], avatarConfig[i][2] });
				else
					this.avatar.add(new Object[]{avatarConfig[i][0], avatarConfig[i][1], avatarConfig[i][2], avatarConfig[i][3] });
		
		gameDao.saveAvatarParts(user.getId(), avatarConfig, new BASE64Decoder().decodeBuffer(photo));
	}

	@RemoteMethod
	public Test[] loadTests() throws Exception {
		Test[] t = gameDao.loadTests(this.user, this.missions);
		return (t == null || t[0] == null ? null : t); 
	}
	
	@RemoteMethod
	public void saveTestQuestionAnswer(int testId, int questionId, int timeSpent, String answer) throws Exception {
		log.info("saveTestQuestionAnswer");
		gameDao.saveTestQuestionAnswer(testId, questionId, user.getId(), timeSpent, answer);
	}

	@RemoteMethod
	public int[] retrieveTestRewards(int testId) throws Exception {
		
		return gameDao.calculateTestRewards(testId, user.getId());
		
	}
	
	@RemoteMethod
	public void addRewardsToCurrentUser(int xp, int money) throws Exception {
		
		this.user.setXp(this.user.getXp() + xp);
		this.user.setMoney(this.user.getMoney() + money);
		
		gameDao.saveUserRewards(this.user);
	}
	
	@RemoteMethod
	public void saveClicks(String[][] clicks) throws Exception {
		if (this.user == null)
			return;
		/*
		for (String[] click:clicks) {
			String s = click[1];
			s = s.substring(0, 10) + " " + s.substring(11);
			s = s.substring(0, s.length() - 1);
			click[1] = s;

		}
		*/
		gameDao.saveClicks(this.user.getId(), clicks);
	}
	
	@RemoteMethod
	public void askWizardFree(int attempts, int timeSpend) throws Exception {
		gameDao.markWizardFreeConsumed(this.user.getId(), this.mission, attempts, timeSpend);
	}
	
	@RemoteMethod
	public Object[] verifyContest(int clazzId, int levelId, int missionIdx) throws Exception  {
		return gameDao.verifyContest(this.user.getId(), clazzId, levelId, missionIdx);
	}
	
	@RemoteMethod
	public Object[] retrieveContest() throws Exception  {
		return gameDao.retrieveContest(this.user.getId(), this.user.getName());
	}
	
	@RemoteMethod
	public List<Achievement> listAchievements() throws Exception  {
		
		return achievDao.listAchievements(this.user.getId(), this.user.getClassId());
		
	}
	
}
