package pt.uc.dei.nobugssnackbar.dao.jdbc;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.HintCategoryDao;
import pt.uc.dei.nobugssnackbar.dao.MissionDao;

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

	private HintCategoryDao hintCategoryDao;
	
	@Override
	public HintCategoryDao getHintCategoryDao() {
		
		if (hintCategoryDao == null)
			hintCategoryDao = new HintCategoryJdbcDao();
		
		return hintCategoryDao;
	}

}
