package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.component.fieldset.Fieldset;
import org.primefaces.context.RequestContext;
import org.primefaces.event.ToggleEvent;
import org.primefaces.model.Visibility;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Objective;
import pt.uc.dei.nobugssnackbar.model.mission.Objectives;

@ManagedBean(name="objView")
@ViewScoped
public class ObjectivesView implements Serializable {

	/*
	 * I added this class to wrap int , because when i used Integer class
	 * there is some issue with setter of currentBonusTimeReward when editing bonusTime dataTable.
	 * It return new object with same value instead of same object.
	 * */
	public class myInt implements Serializable {
		private static final long serialVersionUID = 1L;
		
		private int value = 0;
		
		public myInt(){
			
		}
		public myInt(int value) {
			this.setValue(value);
		}
		public int getValue() {
			return value;
		}
		public void setValue(int value) {
			this.value = value;
		}
	}
	
	private static final long serialVersionUID = 1L;
	
	ResourceBundle messageBundle = ApplicationMessages.getMessage();
	
	//@ManagedProperty(value="#{mm.missionContent.objectives}")
	private Objectives objectives;	
	private boolean isMaxCommands = false;
	private boolean isBonusTime = false;
	private boolean editing = false;
	private boolean editingBonusTime = false;
	private boolean objDisabled = true;
	private boolean bonusTimeDisabled = true;
	private boolean isVariableQty,isCommandQty;
	private myInt currentBonusTimeReward;
	private List<myInt> listBonusTimeReward;
	private Map<String,String> places = new HashMap<String, String>();
	private Map<String,String> positions = new HashMap<String, String>();
	private Map<String,String> types = new HashMap<String, String>();

	@PostConstruct
	public void init() {		
		/*
		 * first column is value
		 * second column is key
		 * */
		places = new HashMap<String, String>();
		places.put("place1","place1");
		places.put("place2","place2");
		places.put("place3","place3");
		places.put("place4","place4");
		
		positions = new HashMap<String, String>();
		positions.put("1","1");
		positions.put("2","2");
		positions.put("3","3");
		positions.put("4","4");
		
		types = new HashMap<String, String>();
		types.put("type1","type1");
		types.put("type2","type2");
		types.put("type3","type3");
		types.put("type4","type4");
	}
	
	public Objectives getObjectives() {
		if(objectives == null){
			objectives = new Objectives();
		}
		return objectives;
	}
	
	public void setObjectives(Objectives objectives) {
		this.objectives = objectives;
	}

	public myInt getCurrentBonusTimeReward() {
		if(currentBonusTimeReward == null){
			currentBonusTimeReward = new myInt(0);
		}
		return currentBonusTimeReward;
	}

	public void setCurrentBonusTimeReward(myInt currentBonusTimeReward) {
		this.currentBonusTimeReward = currentBonusTimeReward;
	}

	public List<myInt> getListBonusTimeReward() {
		if(listBonusTimeReward == null){
			listBonusTimeReward = new ArrayList<>();
		}
		return listBonusTimeReward;
	}

	private void translateToString() {
		String text = "";
		this.getObjectives().setBonusTimeReward("");
		for (myInt myInt : listBonusTimeReward) {
			text += myInt.value + " ";
		}
		
		this.getObjectives().setBonusTimeReward(text);
	}

	public boolean isMaxCommands() {
		return isMaxCommands;
	}
	
	public boolean isBonusTime() {
		return isBonusTime;
	}
	
	public Map<String,String> getPlaces() {
		return places;
	}

	public void setPlaces(Map<String,String> places) {
		this.places = places;
	}
	
	public boolean isVariableQty() {
		return isVariableQty;
	}

	public void setVariableQty(boolean isVariableQty) {
		this.isVariableQty = isVariableQty;
	}

	public boolean isCommandQty() {
		return isCommandQty;
	}

	public void setCommandQty(boolean isCommandQty) {
		this.isCommandQty = isCommandQty;
	}
	
	public Map<String, String> getPositions() {
		return positions;
	}
	
	public void setPositions(Map<String, String> positions) {
		this.positions = positions;
	}
	public Map<String,String> getTypes() {
		return types;
	}
	public void setTypes(Map<String,String> types) {
		this.types = types;
	}	
	
	public Objective getObjItem(){
		return this.getObjectives().getObjectiveItem();
	}
	
	public void setObjItem(Objective obj){
		this.getObjectives().setObjectiveItem(obj);
	}
	
	private void disableObjective() {
		objDisabled = true;
	}
	
	public List<Objective> getObjList(){
		return this.getObjectives().getObjectiveList();
	}
	
	private void enableObjective() {
		objDisabled = false;
	}
	
	private void disableBonusTime(){
		setBonusTimeDisabled(true);
	}
	
	private void enableBonusTime(){
		setBonusTimeDisabled(false);
	}
	
	public void SaveObjective(){
		addMessageToGrowl(new Object[] {"savedObjective"});
		if(!editing){
			addObjectiveToList();	
			addMessageToGrowl(new Object[] {"addedObjective"});
		}
		newObjectiveItem();
		editing = false;
		disableObjective();
	}
	
	public void addObjectiveItem(){
		newObjectiveItem();
		enableObjective();
		addMessageToGrowl(new Object[] {"newObjective"});
	}
	
	public void canselObjective(){
		// TO DO :
	}
	
	private void addObjectiveToList(){
		getObjList().add(getObjItem());
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
	}
	
	public void editObjective(){
		editing = true;
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
		enableObjective();
		addMessageToGrowl(new Object[] {"title=editObjTitle","objOpenedForEdit"});
	}
	
	private void newObjectiveItem(){
		setObjItem(new Objective());
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
	}
	
	public void delete(){
		getObjList().remove(getObjItem());
		newObjectiveItem();
		disableObjective();
		addMessageToGrowl(new Object[] {"deletedObj"});
	}
	
	public void handleToggle(ToggleEvent event){
		Fieldset fieldset = (Fieldset)event.getSource();
		if(fieldset.getId().equals("maxCommandBonus")){
			isMaxCommands = event.getVisibility() == Visibility.VISIBLE ? true : false;
		}
		if(fieldset.getId().equals("bonusTime")){
			isBonusTime = event.getVisibility() == Visibility.VISIBLE ? true : false;
		}
	}
	
	public void saveBonusTime(){
		addMessageToGrowl(new Object[] {"savedBonusTime"});
		if(!editingBonusTime){
			addBonusTimeToList();	
			addMessageToGrowl(new Object[] {"addedBonusTime"});
		}
		newBonusTime();
		editingBonusTime = false;
		translateToString();
		disableBonusTime();
	}
	
	public void addBonusTimeToList(){
		this.listBonusTimeReward.add(currentBonusTimeReward);
		RequestContext.getCurrentInstance().update("tbView:formObjectives:dtBonusTime");
	}
	
	public void addBonusTime(){
		newBonusTime();
		addMessageToGrowl(new Object[] {"newBonusTime"});
		enableBonusTime();
	}
	
	private void newBonusTime(){
		currentBonusTimeReward = new myInt();
		RequestContext.getCurrentInstance().update("tbView:formObjectives:bonusTime");
	}
	
	public void editBonusTime(){
		editingBonusTime = true;
		RequestContext.getCurrentInstance().update("tbView:formObjectives:addEditBonusTime");
		addMessageToGrowl(new Object[] {"title=editBonusTimeTitle","bonusTimeOpenedForEdit"});
		enableBonusTime();
	}
	
	public void deleteBonusTime(){
		listBonusTimeReward.remove(currentBonusTimeReward);
		newBonusTime();
		RequestContext.getCurrentInstance().update("tbView:formObjectives:dtBonusTime");
		translateToString();
		addMessageToGrowl(new Object[] {"deletedBonusTime"});
		disableBonusTime();
	}
	
	public void addMessageToGrowl(Object [] msgs){
		String title = "Notification";	
		FacesMessage msg;
		String finalText = "";
				
		for (Object obj : msgs) {
			if(obj instanceof String){
				if(!messageBundle.keySet().contains(obj)) {
					if(obj.toString().startsWith("title=")){
						title = messageBundle.getString(obj.toString().substring(6));
					}
					else{
						finalText += obj.toString();
					}
				}
			else{
					finalText += messageBundle.getString(obj.toString());					
				}
			}
			if(obj instanceof Integer){
				finalText += obj.toString();
			}						
		}
		
		msg = new FacesMessage(FacesMessage.SEVERITY_INFO,title,finalText);
		FacesContext.getCurrentInstance().addMessage(null, msg);
		RequestContext.getCurrentInstance().update("growlMsgs");
	}

	public boolean isObjDisabled() {
		return objDisabled;
	}

	public void setObjDisabled(boolean objDisabled) {
		this.objDisabled = objDisabled;
	}

	public boolean isBonusTimeDisabled() {
		return bonusTimeDisabled;
	}

	public void setBonusTimeDisabled(boolean bonusTimeDisabled) {
		this.bonusTimeDisabled = bonusTimeDisabled;
	}
}
