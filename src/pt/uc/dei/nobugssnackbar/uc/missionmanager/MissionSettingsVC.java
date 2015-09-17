package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
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
	
	@ManagedProperty(value="#{mm.missionContent.timeLimit}")
	private Long timeLimit; // mission's attribute
	
	private List<Mission> missionList;
	private Mission mission;
	
	private Cook cook;
	private XmlTag xmltag;
	private Slider slider;
	
	private List<SelectItem> cookStartsFromList;
	private boolean selectedLoadBlocks;

	private boolean repeatable;
	private boolean preload;
	
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
			if (cook.getStartPosition() == null || cook.getStartPosition().isEmpty()) {
				cook.setStartPosition("initial");
			}
			xmltag = missionManager.getMissionContent().getXmltag();
			slider = missionManager.getMissionContent().getSlider();
			selectedLoadBlocks = missionManager.getMissionContent().isSelectedLoadBlocks();
			
			repeatable = missionManager.getMissionContent().isRepeatable();
			
			if (xmltag.getPreload() != null) {
				mission = selectMission(xmltag.getPreload());
				preload = true;
			}
			if (this.xmltag.getXmlns() == null) {
				this.xmltag.setXmlns("<xml></xml>");
			}
			
			FacesContext ctx = FacesContext.getCurrentInstance();			
			ctx.getExternalContext().getSessionMap().put("blocks", this.xmltag.getXmlns());
			
			String XML_TAG_ALL = "(<\\s*xml[\\s\\w=\\\"\\/:.]*>)([\\w<\\s=\\\">\\/.,]*)(<\\s*\\/\\s*xml\\s*>)";
			Pattern p = Pattern.compile(XML_TAG_ALL);
			Matcher m = p.matcher(xmltag.getXmlns());
			String xstr = xmltag.getXmlns();
			
			if (m.find()) {
				xstr = m.group(2).replace(" ", "");
			}

			if (xmltag.getXmlns() != null && !xmltag.getXmlns().isEmpty() && !xstr.isEmpty()) {
				setSelectedLoadBlocks(true);
			}
			else {
				setSelectedLoadBlocks(false);
			}
			missionManager.getMissionContent().setXmltag(xmltag);
			mc = new MissionConverter();
			mc.setProvider(this);

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public MissionSettingsVC() {
		mission = new Mission();
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
	
	public boolean isAlwaysNew(){
		if(xmltag.isAlwaysNew() == null)
			return false;
		return xmltag.isAlwaysNew();
	}
	
	public void setAlwaysNew(boolean alwaysNew){
		xmltag.setAlwaysNew(alwaysNew);
	}
	
	public boolean isLoadBlocks(){
		if(xmltag.isLoadBlocks() == null)
			return false;
		return xmltag.isLoadBlocks();
	}
	public void setLoadBlocks(boolean loadBlocks){
		xmltag.setLoadBlocks(loadBlocks);
	}
	
	public void handlePrevMissionChange() {
		xmltag.setPreload(mission.getId());
	}

	public Slider getSlider() {
		return slider;
	}

	public void setSlider(Slider slider) throws Exception {
		this.slider = slider;
		missionManager.getMissionContent().setSlider(slider);
	}

	public Long getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(Long timeLimit) throws Exception {
		this.timeLimit = timeLimit;
		if (missionManager != null && missionManager.getMissionContent() != null) {
			missionManager.getMissionContent().setTimeLimit(this.timeLimit);
		}
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

	public boolean isSelectedLoadBlocks() {
		return selectedLoadBlocks;
	}

	public void setSelectedLoadBlocks(boolean selectedLoadBlocks) throws Exception {
		this.selectedLoadBlocks = selectedLoadBlocks;
		missionManager.getMissionContent().setSelectedLoadBlocks(selectedLoadBlocks);
	}
	
	public boolean isRepeatable() {
		return repeatable;
	}
	
	public void setRepeatable(boolean repeatable) throws Exception {
		this.repeatable = repeatable;
		missionManager.getMissionContent().setRepeatable(repeatable);
		missionManager.getMission().setRepeatable(repeatable);
	}

	public boolean isPreload() {
		return this.preload;
	}

	public void setPreload(boolean preload) throws Exception {
		this.preload = preload;
		if (!preload) {
			missionManager.getMissionContent().getXmltag().setPreload(null);
			mission = null;
		}
		else {
			mission = selectMission(missionManager.getMissionContent().getXmltag().getPreload());
		}
	}

	private Mission selectMission(Integer id) {
		Mission result = null;
		for (Mission m:missionList) {
			if (m.getId() == id) {
				result = m;
				break;
			}
		}
		return result;
	}
}
