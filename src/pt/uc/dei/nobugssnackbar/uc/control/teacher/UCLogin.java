package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.UserDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;

@ManagedBean(name = "uclogin")
@ApplicationScoped
public class UCLogin implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value = "#{factoryDao.userDao}")
	private transient UserDao userDao;

	public User loginTeacher(String nick, String password) throws Exception {
		
		if (userDao.hasClasses(nick, password)) {
			return userDao.readByNick(nick);
		}
		
		return null;
	}
	
	public List<User> listStudents(Clazz clazz) throws Exception {
		return userDao.listByClass(clazz.getId());
	}

	public UserDao getUserDao() {
		return userDao;
	}
	
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

}