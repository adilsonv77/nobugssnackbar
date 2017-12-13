package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.dao.MissionFromLevelDao;
import pt.uc.dei.nobugssnackbar.model.MissionFromLevel;

@ManagedBean(name = "ucmissionman")
@ApplicationScoped
public class UCMissionMan extends UCBase {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value = "#{factoryDao.missionFromLevelDao}")
	private transient MissionFromLevelDao missionFromLevelDao;
	
	public MissionFromLevelDao getMissionFromLevelDao() {
		return missionFromLevelDao;
	}
	
	public void setMissionFromLevelDao(MissionFromLevelDao missionFromLevelDao) {
		this.missionFromLevelDao = missionFromLevelDao;
	}

	public List<MissionFromLevel> listMissions(Long clazzId) throws Exception {
		return missionFromLevelDao.list(clazzId);
	}

	public void insert(MissionFromLevel missionFromlevel) throws Exception {
		this.missionFromLevelDao.insert(missionFromlevel);
	}

	public void update(MissionFromLevel missionFromlevel) throws Exception {
		this.missionFromLevelDao.update(missionFromlevel);
	}
	
}
