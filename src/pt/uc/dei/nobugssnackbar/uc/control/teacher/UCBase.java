package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.ClazzDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;

public abstract class UCBase implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{factoryDao.clazzDao}")
	private transient ClazzDao clazzDao;

	public ClazzDao getClazzDao() {
		return clazzDao;
	}
	
	public void setClazzDao(ClazzDao clazzDao) {
		this.clazzDao = clazzDao;
	}
	
	public List<Clazz> listClasses() throws Exception {

		return clazzDao.list();
	}

	public List<Clazz> listClasses(User user) throws Exception {
		
		return clazzDao.readByTeacher(user.getId()); 
	}
	
	public Clazz getActiveClazz(User user) throws Exception {
		
		return clazzDao.findActiveClazz(user);
	}

}
