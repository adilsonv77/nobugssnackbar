package pt.uc.dei.nobugssnackbar.dao;

public interface AbstractFactoryDao {

	GameDao getGameDao();
	
	MissionDao getMissionDao();
	HintCategoryDao getHintCategoryDao();
	FunctionProviderDao getFunctionProviderDao();
	FunctionProviderValueDao getFunctionProviderValueDao();
	CommandDao getCommandDao();
	ClazzDao getClazzDao();
	LanguageDao getLanguageDao();
	MessageDao getMessageDao();
	HintDao getHintDao();
}
