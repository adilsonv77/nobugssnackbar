package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.model.SelectItem;
import javax.faces.model.SelectItemGroup;
import javax.xml.bind.annotation.XmlAttribute;

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
	
	private long timeLimit; // mission's attribute
	
	private List<Mission> missionList;
	private Mission mission;
	
	@ManagedProperty(value="#{mm.missionContent.cook}")
	private Cook cook;
	private XmlTag xmltag;
	@ManagedProperty(value="#{mm.missionContent.slider}")
	private Slider slider;
	
	private List<SelectItem> cookStartsFromList;
	private String selectedXmlOption;
	private boolean choseMission;
	private boolean choseLoadBlocks;
	@XmlAttribute(name="open")
	@ManagedProperty(value="#{mm.missionContent.repeatable}")
	private boolean repeatable;
	
	@ManagedProperty(value="#{mm}")
	private MissionManager missionManager;
	
	@ManagedProperty(value="#{custVC}")
	private CustomerVC customerVC;
	
	private MissionConverter mc;
	
	@PostConstruct
	private void init() {
		try {
			ResourceBundle msg = ApplicationMessages.getMessage();
			missionList = missionManager.getMissionList();
			cookStartsFromList = new ArrayList<SelectItem>(customerVC.getInitPositions().
					subList(1, customerVC.getInitPositions().size()));
			SelectItemGroup sigDefault = new SelectItemGroup(msg.getString("initial"));
			sigDefault.setSelectItems(new SelectItem[] {new SelectItem("initial", msg.getString("initial"))});
			cookStartsFromList.add(0, sigDefault);

			timeLimit = missionManager.getMissionContent().getTimeLimit();
			cook = missionManager.getMissionContent().getCook();
			cook.setStartPosition("initial");
			xmltag = missionManager.getMissionContent().getXmltag();
			slider = missionManager.getMissionContent().getSlider();
			choseLoadBlocks = missionManager.getMissionContent().isSelectedLoadBlocks();
			
			mc = new MissionConverter();
			mc.setProvider(this);
			
			FacesContext ctx = FacesContext.getCurrentInstance();
			// don't change the value. If you did: maybe you will have some problem with the generation of XML
			ctx.getExternalContext().getSessionMap().put("blocks", "<xml></xml>");
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
		//missionManager.getMissionContent().setCook(cook);
	}

	public XmlTag getXmltag() {
		return xmltag;
	}

	public void setXmltag(XmlTag xmltag) throws Exception {
		this.xmltag = xmltag;
		//missionManager.getMissionContent().setXmltag(xmltag);
	}

	public String getSelectedXmlOption() {
		return selectedXmlOption;
	}

	public void setSelectedXmlOption(String selectedXmlOption) throws Exception {		
		ResourceBundle msg = ApplicationMessages.getMessage();
		xmltag.setAlwaysNew(false);
		choseMission = false;
		choseLoadBlocks = false;
		
		if (selectedXmlOption.equals(msg.getString("alwaysNew"))) {
			xmltag.setAlwaysNew(true);
		}
		else if (selectedXmlOption.equals(msg.getString("loadPrevMission"))) {
			choseMission = true;
		}
		else if (selectedXmlOption.equals(msg.getString("loadBlocks"))) {
			choseLoadBlocks = true;
		}
		
		missionManager.getMissionContent().setSelectedLoadBlocks(choseLoadBlocks);
		this.selectedXmlOption = selectedXmlOption;
	}
	
	public void handlePrevMissionChange() {
		xmltag.setPreload(mission.getId());
	}

	public Slider getSlider() {
		return slider;
	}

	public void setSlider(Slider slider) throws Exception {
		this.slider = slider;
		//missionManager.getMissionContent().setSlider(slider);
	}

	public long getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(long timeLimit) throws Exception {
		this.timeLimit = timeLimit;
		//missionManager.getMissionContent().setTimeLimit(timeLimit);
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

	public boolean isChoseLoadBlocks() {
		return choseLoadBlocks;
	}

	public void setChoseLoadBlocks(boolean choseLoadBlocks) {
		this.choseLoadBlocks = choseLoadBlocks;
	}
	
	public boolean isRepeatable() {
		return repeatable;
	}
	
	public void setRepeatable(boolean repeatable) {
		this.repeatable = repeatable;
	}

}
