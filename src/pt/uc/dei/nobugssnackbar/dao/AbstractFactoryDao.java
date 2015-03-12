package pt.uc.dei.nobugssnackbar.dao;

public interface AbstractFactoryDao {

	GameDao getGameDao();
	
	MissionDao getMissionDao();
	HintCategoryDao getHintCategoryDao();
	FunctionProviderDao getFunctionProviderDao();
}
