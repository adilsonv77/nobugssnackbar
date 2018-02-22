package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.ExtraLevelDao;
import pt.uc.dei.nobugssnackbar.model.ExtraLevel;

@ManagedBean(name = "ucextralevelman")
@ApplicationScoped
public class UCExtraLevelMan extends UCBase {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value = "#{factoryDao.extraLevelDao}")
	private transient ExtraLevelDao extraLevelDao;
	
	public ExtraLevelDao getExtraLevelDao() {
		return extraLevelDao;
	}
	
	public void setExtraLevelDao(ExtraLevelDao levelDao) {
		this.extraLevelDao = levelDao;
	}
	
	public List<ExtraLevel> listLevels(Long clazzId) throws Exception {
		return extraLevelDao.list(clazzId);
	}

	public void insert(ExtraLevel level) throws Exception {
		this.extraLevelDao.insert(level);
	}

	public void update(ExtraLevel level) throws Exception {
		this.extraLevelDao.update(level);
	}

	
}
