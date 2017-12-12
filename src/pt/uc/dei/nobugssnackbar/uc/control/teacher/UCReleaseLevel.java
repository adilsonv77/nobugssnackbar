package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.ClazzDao;
import pt.uc.dei.nobugssnackbar.dao.LevelDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.Level;
import pt.uc.dei.nobugssnackbar.model.User;

@ManagedBean(name = "ucreleaselevel")
@ApplicationScoped
public class UCReleaseLevel implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{factoryDao.clazzDao}")
	private transient ClazzDao clazzDao;

	@ManagedProperty(value = "#{factoryDao.levelDao}")
	private transient LevelDao levelDao;

	public List<Clazz> list(User user) throws Exception {
		
		return clazzDao.readByTeacher(user.getId()); 
	}
	
	public List<Level> listLevels(Clazz clazz) throws Exception {
		return levelDao.list(clazz.getId());
	}

	public void saveLevel(Level l) throws Exception{
		levelDao.update(l);
	}
	
	public ClazzDao getClazzDao() {
		return clazzDao;
	}
	
	public void setClazzDao(ClazzDao clazzDao) {
		this.clazzDao = clazzDao;
	}

	public LevelDao getLevelDao() {
		return levelDao;
	}
	
	public void setLevelDao(LevelDao levelDao) {
		this.levelDao = levelDao;
	}

}
