package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCMissionMan;

@ManagedBean(name="missionman")
@ViewScoped
public class BeanMissions implements Serializable  {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucmissionman}")
	private UCMissionMan ucMissionMan;

	public UCMissionMan getUcMissionMan() {
		return ucMissionMan;
	}
	
	public void setUcMissionMan(UCMissionMan ucMissionMan) {
		this.ucMissionMan = ucMissionMan;
	}
}
