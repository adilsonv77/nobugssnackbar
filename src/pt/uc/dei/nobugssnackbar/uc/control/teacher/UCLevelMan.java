package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.ClazzDao;
import pt.uc.dei.nobugssnackbar.dao.LevelDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.Level;

@ManagedBean(name = "uclevelman")
@ApplicationScoped
public class UCLevelMan {
	
	@ManagedProperty(value = "#{factoryDao.clazzDao}")
	private transient ClazzDao clazzDao;

	@ManagedProperty(value = "#{factoryDao.levelDao}")
	private transient LevelDao levelDao;
	
	public ClazzDao getClazzDao() {
		return clazzDao;
	}
	
	public void setClazzDao(ClazzDao clazzDao) {
		this.clazzDao = clazzDao;
	}
	
	public List<Clazz> listClasses() throws Exception {

		return clazzDao.list();
	}

	public LevelDao getLevelDao() {
		return levelDao;
	}
	
	public void setLevelDao(LevelDao levelDao) {
		this.levelDao = levelDao;
	}
	
	public List<Level> listLevels(Long clazzId) throws Exception {
		return levelDao.list(clazzId);
	}

	public void insert(Level level) throws Exception {
		this.levelDao.insert(level);
	}

	public void update(Level level) throws Exception {
		this.levelDao.update(level);
	}

	
}
