package pt.uc.dei.nobugssnackbar.dao;

public interface AbstractFactoryDao {

	GameDao getGameDao();
	
	MissionDao getMissionDao();
	MissionFromLevelDao getMissionFromLevelDao();
	ClazzDao getClazzDao();
	LanguageDao getLanguageDao();
	MessageDao getMessageDao();
	UserDao getUserDao();
	LevelDao getLevelDao();
	ExtraLevelDao getExtraLevelDao();
	AchievementDao getAchievementDao();
	EvaluationDao getEvaluationDao();

	IlsDao getIlsDao();
}
