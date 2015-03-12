package pt.uc.dei.nobugssnackbar.dao;

public interface AbstractFactoryDao {

	MissionDao getMissionDao();
	HintCategoryDao getHintCategoryDao();
	FunctionProviderDao getFunctionProviderDao();
}
