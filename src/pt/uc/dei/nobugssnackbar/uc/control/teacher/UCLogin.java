package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.dao.UserDao;
import pt.uc.dei.nobugssnackbar.model.User;

@ManagedBean(name = "uclogin")
@ViewScoped
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
	
	public UserDao getUserDao() {
		return userDao;
	}
	
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

}