package pt.uc.dei.nobugssnackbar.dao.jdbc;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.AchievementDao;
import pt.uc.dei.nobugssnackbar.dao.ClazzDao;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.dao.LanguageDao;
import pt.uc.dei.nobugssnackbar.dao.LevelDao;
import pt.uc.dei.nobugssnackbar.dao.MessageDao;
import pt.uc.dei.nobugssnackbar.dao.MissionDao;
import pt.uc.dei.nobugssnackbar.dao.UserDao;

public class FactoryJdbcDao implements AbstractFactoryDao {

	public FactoryJdbcDao(String url, String className, String username, String password) throws Exception {
		NoBugsConnection.buildConnection(url, className, username, password);
	}
	
	private MissionDao missionDao;
	
	@Override
	public MissionDao getMissionDao() {
		if (missionDao == null)
			missionDao = new MissionJdbcDao();
		return missionDao;
	}

	private GameDao gameDao;

	@Override
	public GameDao getGameDao() {
		if (gameDao == null)
			gameDao = new GameJdbcDao();
		return gameDao;
	}

	private ClazzDao clazzDao;
	
	@Override
	public ClazzDao getClazzDao() {
		if (clazzDao == null)
			clazzDao = new ClazzJdbcDao();
		return clazzDao;
	}
	
	private LanguageDao languageDao;

	@Override
	public LanguageDao getLanguageDao() {
		if (languageDao == null) 
			languageDao = new LanguageJdbcDao();
		return languageDao;
	}
	
	private MessageDao messageDao;

	@Override
	public MessageDao getMessageDao() {
		if (messageDao == null)
			messageDao = new MessageJdbcDao();
		return messageDao;
	}

	private UserDao userDao;
	
	@Override
	public UserDao getUserDao() {
		if (userDao == null)
			userDao = new UserJdbcDao();
		return userDao;
	}

	private LevelDao levelDao;
	
	@Override
	public LevelDao getLevelDao() {
		if (levelDao == null)
			levelDao = new LevelJdbcDao();
		return levelDao;
	}
	
	private AchievementDao achievementDao;

	@Override
	public AchievementDao getAchievementDao() {
		if (achievementDao == null)
			achievementDao = new AchievementJdbcDao();
		return achievementDao;
	}
}
