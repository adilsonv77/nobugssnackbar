package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Mission;
import pt.uc.dei.nobugssnackbar.model.mission.Cook;
import pt.uc.dei.nobugssnackbar.model.mission.Slider;
import pt.uc.dei.nobugssnackbar.model.mission.XmlTag;

@ManagedBean(name="msVC")
@ViewScoped
public class MissionSettingsVC implements Serializable {
	private static final long serialVersionUID = 1L;

	private int timeLimit; // mission's attribute
	
	private Mission mission;
	private Cook cook;
	private XmlTag xmltag;
	private Slider slider;
	
	private List<String> cookStartsFromList;
	
	private String selectedXmlOption;
	private boolean choseMission;
	
	
	public MissionSettingsVC() {
		mission = new Mission();
		cook = new Cook();
		xmltag = new XmlTag();
		slider = new Slider();
		
		ResourceBundle msg = ApplicationMessages.getMessage();
		
		cookStartsFromList = new ArrayList<>();
		cookStartsFromList.add(msg.getString("initial"));
		
		selectedXmlOption = msg.getString("nothing");
	}

	public List<String> getCookStartsFromList() {
		return cookStartsFromList;
	}

	public void setCookStartsFromList(List<String> cookStartsFromList) {
		this.cookStartsFromList = cookStartsFromList;
	}

	public Mission getMission() {
		return mission;
	}

	public void setMission(Mission mission) {
		this.mission = mission;
	}
	
	public Cook getCook() {
		return cook;
	}

	public void setCook(Cook cook) {
		this.cook = cook;
	}

	public XmlTag getXmltag() {
		return xmltag;
	}

	public void setXmltag(XmlTag xmltag) {
		this.xmltag = xmltag;
	}

	public String getSelectedXmlOption() {
		return selectedXmlOption;
	}

	public void setSelectedXmlOption(String selectedXmlOption) {
		ResourceBundle msg = ApplicationMessages.getMessage();
		xmltag.setAlwaysNew(false);
		choseMission = false;
		
		if (selectedXmlOption.equals(msg.getString("alwaysNew"))) {
			xmltag.setAlwaysNew(true);
		}
		else if (selectedXmlOption.equals(msg.getString("loadPrevMission"))) {
			choseMission = true;
		}
		this.selectedXmlOption = selectedXmlOption;
	}

	public Slider getSlider() {
		return slider;
	}

	public void setSlider(Slider slider) {
		this.slider = slider;
	}

	public int getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(int timeLimit) {
		this.timeLimit = timeLimit;
	}

	public boolean isChoseMission() {
		return choseMission;
	}

	public void setChoseMission(boolean choseMission) {
		this.choseMission = choseMission;
	}

}
