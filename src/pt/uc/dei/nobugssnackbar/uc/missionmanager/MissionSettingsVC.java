package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.model.SelectItem;
import javax.faces.model.SelectItemGroup;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Mission;
import pt.uc.dei.nobugssnackbar.model.mission.Cook;
import pt.uc.dei.nobugssnackbar.model.mission.Slider;
import pt.uc.dei.nobugssnackbar.model.mission.XmlTag;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.MissionConverter;

@ManagedBean(name="msVC")
@ViewScoped
public class MissionSettingsVC implements IMissionProvider, Serializable {
	private static final long serialVersionUID = 1L;
	
	private int timeLimit; // mission's attribute
	
	private List<Mission> missionList;
	private Mission mission;
	
	private Cook cook;
	private XmlTag xmltag;
	private Slider slider;
	
	private List<SelectItem> cookStartsFromList;
	private String selectedXmlOption;
	private boolean choseMission;
	
	@ManagedProperty(value="#{mm}")
	private MissionManager missionManager;
	
	@ManagedProperty(value="#{custVC}")
	private CustomerVC customerVC;
	
	private MissionConverter mc;
	
	@PostConstruct
	private void init() {
		try {
			missionList = missionManager.getMissionList();
			cookStartsFromList = new ArrayList<SelectItem>(customerVC.getInitPositions().
					subList(1, customerVC.getInitPositions().size()));
			SelectItemGroup sigDefault = new SelectItemGroup("Initial");
			sigDefault.setSelectItems(new SelectItem[] {new SelectItem("Initial", "Initial")});
			cookStartsFromList.add(0, sigDefault);
			
			cook = missionManager.getMissionContent().getCook();
			xmltag = missionManager.getMissionContent().getXmltag();
			slider = missionManager.getMissionContent().getSlider();
			
			mc = new MissionConverter();
			mc.setProvider(this);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public MissionSettingsVC() {
		mission = new Mission();
		
		ResourceBundle msg = ApplicationMessages.getMessage();	
		
		selectedXmlOption = msg.getString("nothing");
	}
	
	public List<SelectItem> getCookStartsFromList() {
		return cookStartsFromList;
	}

	public void setCookStartsFromList(List<SelectItem> cookStartsFromList) {
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

	public void setCook(Cook cook) throws Exception {
		this.cook = cook;
		missionManager.getMissionContent().setCook(cook);
	}

	public XmlTag getXmltag() {
		return xmltag;
	}

	public void setXmltag(XmlTag xmltag) throws Exception {
		this.xmltag = xmltag;
		missionManager.getMissionContent().setXmltag(xmltag);
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

	public void setSlider(Slider slider) throws Exception {
		this.slider = slider;
		missionManager.getMissionContent().setSlider(slider);
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

	public MissionManager getMissionManager() {
		return missionManager;
	}

	public void setMissionManager(MissionManager missionManager) {
		this.missionManager = missionManager;
	}

	@Override
	public List<Mission> getMissionList() {
		return missionList;
	}

	public void setMissionList(List<Mission> missionList) {
		this.missionList = missionList;
	}

	public CustomerVC getCustomerVC() {
		return customerVC;
	}

	public void setCustomerVC(CustomerVC customerVC) {
		this.customerVC = customerVC;
	}

	public MissionConverter getMc() {
		return mc;
	}

	public void setMc(MissionConverter mc) {
		this.mc = mc;
	}

}
