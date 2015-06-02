package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import org.primefaces.event.SelectEvent;

import pt.uc.dei.nobugssnackbar.model.Mission;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.MissionConverter;

@ManagedBean(name="missionVC")
@ViewScoped
public class MissionVC implements IMissionProvider, Serializable {
	private static final long serialVersionUID = 1L;

	private Mission mission = new Mission();;
	private List<Mission> missionList;
	
	@ManagedProperty(value="#{mm}")
	private MissionManager missionManager;
	private MissionConverter mc;
	
	@PostConstruct
	private void init() {
		try {
			missionList = missionManager.getMissionList();
			mc = new MissionConverter();
			mc.setProvider(this);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public MissionVC() {
		
	}

	public void handleMissionSelect(SelectEvent event) {
		mission = (Mission)event.getObject();
		missionManager.setMission(mission);
	}
	
	public void handleKeyEvent() {
		missionManager.getMission().setName(mission.getName());
	}
	
	public MissionManager getMissionManager() {
		return missionManager;
	}

	public void setMissionManager(MissionManager missionManager) {
		this.missionManager = missionManager;
	}

	public Mission getMission() {
		return mission;
	}

	public void setMission(Mission mission) {
		this.mission = mission;
	}
	
	@Override
	public List<Mission> getMissionList() {
		return missionList;
	}

	public void setMissionList(List<Mission> missionList) {
		this.missionList = missionList;
	}

}
