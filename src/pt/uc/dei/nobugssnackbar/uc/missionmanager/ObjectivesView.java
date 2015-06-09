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
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.apache.commons.lang3.SerializationUtils;
import org.primefaces.context.RequestContext;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Objective;
import pt.uc.dei.nobugssnackbar.model.mission.Objectives;

@ManagedBean(name="objView")
@ViewScoped
public class ObjectivesView implements Serializable {

	/*
	 * I added this class to wrap int , because when i used Integer class
	 * there is some issue with setter of currentBonusTimeReward when editing bonusTime dataTable.
	 * It returns new object with same value instead of same object.
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
	
	@ManagedProperty(value="#{mm.missionContent.objectives}")
	private Objectives objectives;	
	private Objective objItemClone;
	private boolean editing = false;
	private boolean editingBonusTime = false;
	private boolean objDisabled = true;
	private boolean bonusTimeDisabled = true;
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
		places.put("counter","counter");
		places.put("table","table");
		places.put("","");
		
		positions = new HashMap<String, String>();
		positions.put("1","1");
		positions.put("2","2");
		positions.put("3","3");
		positions.put("4","4");
		
		types = new HashMap<String, String>();
		types.put("askForFood","askForFood");
		types.put("pickUpFood","pickUpFood");
		types.put("counter","counter");
		types.put("deliver","deliver");
		types.put("askForDrink","askForDrink");
		types.put("pickUpDrink","pickUpDrink");
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
	
	public void setMaxCommands(boolean isMaxCommands) {
		objectives.setBoolMaxCommands(isMaxCommands);
	}

	public void setBonusTime(boolean isBonusTime) {
		objectives.setBoolBonusTime(isBonusTime);
	}
	public boolean isMaxCommands() {
		return objectives.isBoolMaxCommands();
	}
	
	public boolean isBonusTime() {
		return objectives.isBoolBonusTime();
	}
	
	public Map<String,String> getPlaces() {
		return places;
	}

	public void setPlaces(Map<String,String> places) {
		this.places = places;
	}
	
	public boolean isVariableQty() {
		return objectives.isBoolVariableQty();
	}

	public void setVariableQty(boolean isVariableQty) {
		objectives.setBoolVariableQty(isVariableQty);
	}

	public boolean isCommandQty() {
		return objectives.isBoolCommandQty();
	}

	public void setCommandQty(boolean isCommandQty) {
		objectives.setBoolCommandQty(isCommandQty);
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
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
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
		if(!editing){
			addObjectiveToList();	
		}
		newObjectiveItem();
		editing = false;
		disableObjective();
	}
	
	public void addObjectiveItem(){
		newObjectiveItem();
		enableObjective();
	}
	
	public void cancelObjective(){
		disableObjective();
		if(editing){
			int index = getObjList().indexOf(getObjItem());
			getObjList().remove(index);
			getObjList().add(index, objItemClone);
		}
		editing = false;
		newObjectiveItem();
	}
	
	
	private void addObjectiveToList(){
		getObjList().add(getObjItem());		
	}
	
	public void editObjective(){
		objItemClone = SerializationUtils.clone(getObjItem());
		editing = true;
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
		enableObjective();
		addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[] {"title=editObjTitle","objOpenedForEdit"});
	}
	
	private int objItemId = 0;
	private void newObjectiveItem(){
		setObjItem(new Objective(objItemId++));
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
	}
	
	public void delete(){
		disableObjective();
		getObjList().remove(getObjItem());
		newObjectiveItem();
		addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[] {"deletedObj"});
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
	}
	
	
	public void saveBonusTime(){
		if(!editingBonusTime){
			addBonusTimeToList();				
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
		enableBonusTime();
	}
	
	private void newBonusTime(){
		currentBonusTimeReward = new myInt();
		RequestContext.getCurrentInstance().update("tbView:formObjectives:bonusTime");
	}
	
	public void editBonusTime(){
		editingBonusTime = true;
		RequestContext.getCurrentInstance().update("tbView:formObjectives:addEditBonusTime");
		RequestContext.getCurrentInstance().update("tbView:formObjectives:dtBonusTime");
		addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[] {"title=editBonusTimeTitle","bonusTimeOpenedForEdit"});
		enableBonusTime();
	}
	
	public void deleteBonusTime(){
		listBonusTimeReward.remove(currentBonusTimeReward);
		newBonusTime();
		RequestContext.getCurrentInstance().update("tbView:formObjectives:dtBonusTime");
		translateToString();
		addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[] {"deletedBonusTime"});
		disableBonusTime();
	}
	
	public void addMessageToGrowl(FacesMessage.Severity severity,Object [] msgs){
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
		
		msg = new FacesMessage(severity,title,finalText);
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
	
	public boolean getEditing(){
		return this.editing;
	}
	
	public boolean getEditingBonusTime(){
		return editingBonusTime;
	}
}
