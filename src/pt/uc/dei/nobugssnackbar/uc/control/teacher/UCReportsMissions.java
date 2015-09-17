package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.util.List;
import java.util.Map;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.ClazzDao;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;

@ManagedBean(name = "ucreportsmissions")
@ApplicationScoped
public class UCReportsMissions {

	@ManagedProperty(value = "#{factoryDao.clazzDao}")
	private transient ClazzDao clazzDao;
	
	@ManagedProperty(value = "#{factoryDao.gameDao}")
	private transient GameDao gameDao;
	
	public List<Clazz> listClazzes(User user) throws Exception {
		return clazzDao.readByTeacher(user.getId()); 
	}

	public List<Map<String, String>> loadUsers(int clazzId, int missionId, String[] lu) throws Exception {
		return gameDao.loadUsersInTheMission(clazzId, missionId, lu);
	}

	public ClazzDao getClazzDao() {
		return clazzDao;
	}
	
	public void setClazzDao(ClazzDao clazzDao) {
		this.clazzDao = clazzDao;
	}

	public GameDao getGameDao() {
		return gameDao;
	}
	
	public void setGameDao(GameDao gameDao) {
		this.gameDao = gameDao;
	}

}
