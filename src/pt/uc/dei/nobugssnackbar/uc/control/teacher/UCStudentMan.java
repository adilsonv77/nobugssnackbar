package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.control.UserControl;
import pt.uc.dei.nobugssnackbar.dao.UserDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;

@ManagedBean(name = "ucstudentman")
@ApplicationScoped
public class UCStudentMan extends UCBase {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{factoryDao.userDao}")
	private transient UserDao userDao;

	public UserDao getUserDao() {
		return userDao;
	}
	
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	
	public List<User> listStudents() throws Exception {
		return userDao.list();
	}

	public void insert(User user, Clazz clazz) throws Exception {
		
		user.setPassw(UserControl.encrypt(user.getNick()));
		user.setEnabled("T");
		user.setLang("pt-BR");
		user.setShowHint(true);
		user.setMoney(0);
		user.setXp(0);
		user.setShowInstruction(false);
		user.setShowSound(true);
		
		userDao.save(user);
		getClazzDao().mapsToUser(clazz, user);
	}

	public void update(User user, Clazz clazz) throws Exception {
		userDao.save(user);
		if (user.getClassId().longValue() != clazz.getId().longValue()) {
			getClazzDao().deleteFromUser(user);
			getClazzDao().mapsToUser(clazz, user);
			user.setClassId(clazz.getId());
		}
	}

	public User read(Long userId) throws Exception {
		return userDao.read(userId);
	}

	public void changeCurrentlyClasse(Long userId, Long newClazz) throws Exception {
		
		User user = userDao.read(userId);
		Clazz clazz = getActiveClazz(user);
		user.setClassId(clazz.getId());
		getClazzDao().deleteFromUser(user);
		
		clazz = getClazzDao().read(newClazz);
		getClazzDao().mapsToUser(clazz, user);
		
	}
	
}
