package pt.uc.dei.nobugssnackbar.dao;

public interface AbstractFactoryDao {

	GameDao getGameDao();
	
	MissionDao getMissionDao();
	ClazzDao getClazzDao();
	LanguageDao getLanguageDao();
	MessageDao getMessageDao();
	UserDao getUserDao();
	LevelDao getLevelDao();
	AchievementDao getAchievementDao();
	EvaluationDao getEvaluationDao();
}
