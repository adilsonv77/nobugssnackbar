package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.LevelDao;
import pt.uc.dei.nobugssnackbar.model.Level;

@ManagedBean(name = "uclevelman")
@ApplicationScoped
public class UCLevelMan extends UCBase {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value = "#{factoryDao.levelDao}")
	private transient LevelDao levelDao;
	
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
