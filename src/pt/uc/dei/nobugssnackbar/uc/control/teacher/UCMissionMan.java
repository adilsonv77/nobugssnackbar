package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.MissionDao;

@ManagedBean(name = "ucmissionman")
@ApplicationScoped
public class UCMissionMan extends UCBase {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value = "#{factoryDao.missionDao}")
	private transient MissionDao missionDao;
	
	public MissionDao getMissionDao() {
		return missionDao;
	}
	
	public void setMissionDao(MissionDao missionDao) {
		this.missionDao = missionDao;
	}
	
}
