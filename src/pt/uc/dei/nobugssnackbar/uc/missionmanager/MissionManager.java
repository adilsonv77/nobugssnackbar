package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.ArrayList;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.event.SelectEvent;
import org.primefaces.event.UnselectEvent;

import pt.uc.dei.nobugssnackbar.dao.MissionDao;
import pt.uc.dei.nobugssnackbar.model.Mission;
import pt.uc.dei.nobugssnackbar.model.mission.MissionContent;

@ManagedBean(name="mm")
@SessionScoped
public class MissionManager{

	@ManagedProperty(value="#{factoryDao.missionDao}")
	private MissionDao missionDao;
	
	public MissionDao getMissionDao() {
		return missionDao;
	}
	
	public void setMissionDao(MissionDao missionDao) {
		this.missionDao = missionDao;
	}
	
	// #region private variables
	private Mission mission = new Mission();
	private ArrayList<Mission> missionList = new ArrayList<Mission>();
	// #end
	
	// #region getters and setters
	public Mission getMission() {
		return mission;
	}
	public void setMission(Mission mission) {
		this.mission = mission;
	}
	public ArrayList<Mission> getMissionList() {
		return missionList;
	}
	public void setMissionList(ArrayList<Mission> missionList) {
		this.missionList = missionList;
	}
	
	private MissionContent missionContent = new MissionContent();
	
	public MissionContent getMissionContent() {
		return missionContent;
	}
	
	public void setMissionContent(MissionContent missionContent) {
		this.missionContent = missionContent;
	}
	// #end
	
	// #region user defined methods
	
	
    public void onSelect(SelectEvent event) {
        FacesContext context = FacesContext.getCurrentInstance();
        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "Item Selected", event.getObject().toString()));
    }
     
    public void onUnselect(UnselectEvent event) {
        FacesContext context = FacesContext.getCurrentInstance();
        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "Item Unselected", event.getObject().toString()));
    }
     
    public void onReorder() {
        FacesContext context = FacesContext.getCurrentInstance();
        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "List Reordered", null));
    }
    public void addMission(){
    	missionList.add(this.mission);
    	this.mission = new Mission();
    }
	// #end
}