package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.ExtraLevelDao;
import pt.uc.dei.nobugssnackbar.dao.UserDao;
import pt.uc.dei.nobugssnackbar.model.ExtraLevel;
import pt.uc.dei.nobugssnackbar.model.User;

@ManagedBean(name = "ucextralevelman")
@ApplicationScoped
public class UCExtraLevelMan extends UCBase {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value = "#{factoryDao.extraLevelDao}")
	private transient ExtraLevelDao extraLevelDao;
	
	@ManagedProperty(value = "#{factoryDao.userDao}")
	private transient UserDao userDao;

	public ExtraLevelDao getExtraLevelDao() {
		return extraLevelDao;
	}
	
	public void setExtraLevelDao(ExtraLevelDao levelDao) {
		this.extraLevelDao = levelDao;
	}
	
	public UserDao getUserDao() {
		return userDao;
	}
	
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
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

	public void saveStudents(ExtraLevel level, List<User> studentsAdded) {
		extraLevelDao.removeStudents(level);
		extraLevelDao.addStudents(level, studentsAdded);
	}

	public List<User> listStudentsFromLevel(long clazzId, long levelId, List<User> studentsAdded) throws Exception {
		
		List<User> students = userDao.listByClass(clazzId);
		List<Long> usersid = extraLevelDao.listUsersByLevelId(levelId);
		for (Long userid:usersid) {
			for (User student:students)
				if (student.getId() == userid) {
					studentsAdded.add(student);
					break;
				}
		}
		
		return students;
	}

	
}
