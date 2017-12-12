package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import org.primefaces.event.FileUploadEvent;
import org.primefaces.model.UploadedFile;

import pt.uc.dei.nobugssnackbar.model.MissionFromLevel;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCMissionMan;

@ManagedBean(name="missionman")
@ViewScoped
public class BeanMissions extends BeanBase  {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucmissionman}")
	private UCMissionMan ucMissionMan;

	public UCMissionMan getUcMissionMan() {
		return ucMissionMan;
	}
	
	public void setUcMissionMan(UCMissionMan ucMissionMan) {
		this.ucMissionMan = ucMissionMan;
		setUcBase(ucMissionMan);
	}
	
	private MissionFromLevel mission;
	
	public MissionFromLevel getMission() {
		return mission;
	}
	
	public List<MissionFromLevel> getMissions() throws Exception {
		if (getClazz() == null)
			return null;
		return ucMissionMan.listMissions(getClazz().getId());
	}
	
	public void newMission() {
		super.newElement();
		this.mission = new MissionFromLevel();
	}
	
	public void cancel() {
		super.cancelEdit();
		this.mission = null;
	}
	
	public void edit(MissionFromLevel mission) throws Exception {
		super.editElement();
		this.mission = mission;
	}
	
	public void save() throws Exception {
		/*
		this.mission.setClassId(this.getClazz().getId());
		if (isNewElem())
			ucLevelMan.insert(level);
		else
			ucLevelMan.update(level);
		
		*/
		this.cancel();
	}
	
	public void upload(FileUploadEvent event) {
		UploadedFile uploadedFile = event.getFile();
		System.out.println(uploadedFile); 
	}
}
