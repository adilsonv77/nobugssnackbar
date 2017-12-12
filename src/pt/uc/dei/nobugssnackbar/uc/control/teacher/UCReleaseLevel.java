package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.LevelDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.Level;

@ManagedBean(name = "ucreleaselevel")
@ApplicationScoped
public class UCReleaseLevel extends UCBase {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value = "#{factoryDao.levelDao}")
	private transient LevelDao levelDao;

	public List<Level> listLevels(Clazz clazz) throws Exception {
		return levelDao.list(clazz.getId());
	}

	public void saveLevel(Level l) throws Exception{
		levelDao.update(l);
	}
	
	public LevelDao getLevelDao() {
		return levelDao;
	}
	
	public void setLevelDao(LevelDao levelDao) {
		this.levelDao = levelDao;
	}

}
