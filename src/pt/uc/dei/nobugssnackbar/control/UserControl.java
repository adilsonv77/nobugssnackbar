package pt.uc.dei.nobugssnackbar.control;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.logging.Logger;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.dao.LanguageDao;
import pt.uc.dei.nobugssnackbar.dao.MessageDao;
import pt.uc.dei.nobugssnackbar.model.Language;
import pt.uc.dei.nobugssnackbar.model.Message;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.servlets.HintImage;
import pt.uc.dei.nobugssnackbar.util.HexImage;
import pt.uc.dei.nobugssnackbar.util.SendMail;

@RemoteProxy(scope = ScriptScope.SESSION)
public class UserControl {

	private GameDao gameDao;
	private SendMail mail;
	private AbstractFactoryDao factoryDao;
	private String appFolder;

	public UserControl() {
		WebContext ctx = WebContextFactory.get();
		this.factoryDao = (AbstractFactoryDao) ctx
				.getServletContext().getAttribute("factoryDao");
		this.gameDao = factoryDao.getGameDao();
		
		this.appFolder = ctx.getServletContext().getRealPath("/");
		this.mail = new SendMail(this.appFolder);

	}
	
	// use this constructor for test
	public UserControl(AbstractFactoryDao factoryDao, String appFolder) {
		this.factoryDao = factoryDao;
		this.gameDao = factoryDao.getGameDao();
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

	@RemoteMethod
	public Object[] verifyLogged() throws Exception {
		this.missions = (user == null ? null : retrieveMissions());
		return new Object[] { user != null, this.user, this.missions,
				(user == null ? null : retrieveLeaderBoard()), this.avatar,
				this.classid, this.levelid, this.missionidx };
	}

	@RemoteMethod
	public void logoff(int timeSpend, long execution, String answer)
			throws Exception {

		log.info("logoff " + timeSpend);
		if (this.mission != 0)
			gameDao.finishMission(this.user, this.mission, this.classid, 0,
					timeSpend, execution, false, -1, answer);

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

			this.user = gameDao.login(nick, encrypt(passw));

			this.missions = retrieveMissions();
			this.avatar = retrieveAvatarParts();

			return new Object[] { null, this.user, this.missions, 
					retrieveLeaderBoard(), this.avatar }; // no errors

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
	public String[] loadMission(int clazzId, int levelId, int missionIdx)
			throws Exception {
		String[][] r = gameDao.loadMission(this.user, clazzId, levelId,
				missionIdx);

		this.mission = Integer.parseInt(r[0][0]);
		this.classid = clazzId;
		this.levelid = levelId;
		this.missionidx = missionIdx;

		return new String[] { r[0][1], r[0][2], r[0][3], r[0][4], r[0][5] };
	}

	@RemoteMethod
	public String loadMissionAnswer(int clazzId, int levelId, int missionIdx)
			throws Exception {
		String[][] r = gameDao.loadMission(this.user, clazzId, levelId,
				missionIdx);

		return r[0][3];
	}

	@RemoteMethod
	public void saveMission(int money, int timeSpend, long execution,
			boolean achieved, int typeRunning, String answer) throws Exception {

		if (this.user == null)
			return;

		if (achieved)
			log.info("saveMission " + timeSpend + " " + this.user.getId() + " "
					+ this.mission + " " + this.classid);

		this.user.setMoney(this.user.getMoney() + money);

		gameDao.finishMission(this.user, this.mission, this.classid, money,
				timeSpend, execution, achieved, typeRunning, answer);

		if (achieved) {
			// when saveMission is called with achieved = true, this means that
			// finished the mission
			this.classid = 0;
			this.levelid = 0;
			this.missionidx = 0;
			this.mission = 0;
		}

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
	public void registerExecution() throws Exception {
		gameDao.addExecutionInMission(this.user, this.mission, this.classid);
	}

	@RemoteMethod
	public String loadAnswer(int idMission) throws Exception {
		return gameDao.loadAnswer(idMission, this.user.getId());
	}

	@RemoteMethod
	public Object[][] retrieveMissions() throws Exception {
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
	public void missionFail(int execution, String[][] goals) throws Exception {

		gameDao.storeMissionFail(execution, this.user.getId(), this.mission,
				this.classid, goals);

	}

	@RemoteMethod
	public void missionError(int execution, String idError, String blockId,
			String errorMessage) throws Exception {

		gameDao.storeMissionError(execution, this.user.getId(), this.mission,
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
		return gameDao.retrieveLeaderBoard(this.user.getId(),
				this.user.getClassesId());
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
}
