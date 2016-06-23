package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.control.UserControl;
import pt.uc.dei.nobugssnackbar.dao.ClazzDao;
import pt.uc.dei.nobugssnackbar.dao.UserDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;

@ManagedBean(name = "ucstudentman")
@ApplicationScoped
public class UCStudentMan implements Serializable{

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{factoryDao.userDao}")
	private transient UserDao userDao;

	@ManagedProperty(value = "#{factoryDao.clazzDao}")
	private transient ClazzDao clazzDao;

	public UserDao getUserDao() {
		return userDao;
	}
	
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	
	public ClazzDao getClazzDao() {
		return clazzDao;
	}
	
	public void setClazzDao(ClazzDao clazzDao) {
		this.clazzDao = clazzDao;
	}
	
	public List<User> listStudents() throws Exception {
		return userDao.list();
	}

	public Clazz getActiveClazz(User user) throws Exception {
		
		return clazzDao.findActiveClazz(user);
	}

	public List<Clazz> listClasses() throws Exception {

		return clazzDao.list();
	}

	public void insert(User user, Clazz clazz) throws Exception {
		
		user.setPassw(UserControl.encrypt(user.getNick()));
		user.setEnabled(true);
		user.setLang("pt-BR");
		user.setShowHint(true);
		user.setMoney(0);
		user.setXp(0);
		user.setShowInstruction(false);
		user.setShowSound(true);
		
		userDao.save(user);
		clazzDao.mapsToUser(clazz, user);
	}

	public void update(User user, Clazz clazz) throws Exception {
		userDao.save(user);
		if (user.getClassId().longValue() != clazz.getId().longValue()) {
			clazzDao.deleteFromUser(user);
			clazzDao.mapsToUser(clazz, user);
			user.setClassId(clazz.getId());
		}
	}
	
}
