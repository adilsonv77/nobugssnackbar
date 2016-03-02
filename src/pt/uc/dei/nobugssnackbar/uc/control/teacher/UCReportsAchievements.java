package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.AchievementDao;

@ManagedBean(name = "ucreportsachievements")
@ApplicationScoped
public class UCReportsAchievements implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{factoryDao.achievementDao}")
	private transient AchievementDao achievementDao;

	public AchievementDao getAchievementDao() {
		return achievementDao;
	}
	
	public void setAchievementDao(AchievementDao achievementDao) {
		this.achievementDao = achievementDao;
	}
	
	public List<String[]> retrieveStudents(Integer clazzId) throws SQLException {
		return achievementDao.loadUsersAchievements(clazzId);
	}

	public byte[] getBadge(int achievementTypeId) throws SQLException {
		
		return achievementDao.getAchievementTypeImage(achievementTypeId);
		
	}

}
