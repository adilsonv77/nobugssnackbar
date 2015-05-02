package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

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
	public class myInt{
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
	
	private myInt currentBonusTimeReward;
	private List<myInt> listBonusTimeReward;	
	private boolean isMaxCommands = false;
	private boolean isBonusTime = false;
	private boolean editing,editingBonusTime = false;
	private boolean isVariableQty,isCommandQty;

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
		this.objectives.setBonusTimeReward("");
		for (myInt myInt : listBonusTimeReward) {
			text += myInt.value + " ";
		}
		
		this.objectives.setBonusTimeReward(text);
		System.out.println(text);
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
		return this.objectives.getObjectiveItem();
	}
	
	public void setObjItem(Objective obj){
		this.objectives.setObjectiveItem(obj);
	}
	
	public void SaveObjective(){
		if(!editing){
			addObjectiveToList();		
		}
		newObjectiveItem();
		editing = false;
	}
	
	public List<Objective> getObjList(){
		return this.objectives.getObjectiveList();
	}
	
	private void addObjectiveToList(){
		getObjList().add(getObjItem());
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
	}
	
	public void delete(){
		getObjList().remove(getObjItem());
		newObjectiveItem();
	}
	
	public void editObjective(){
		editing = true;
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
	}
	
	public void newObjectiveItem(){
		setObjItem(new Objective());
		RequestContext.getCurrentInstance().update("tbView:formObjectives:AddEditObjective");
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
		if(!editingBonusTime){
			addBonusTimeToList();		
		}
		newBonusTime();
		editingBonusTime = false;
		translateToString();
	}
	
	public void addBonusTimeToList(){
		this.listBonusTimeReward.add(currentBonusTimeReward);
		RequestContext.getCurrentInstance().update("tbView:formObjectives:dtBonusTime");
	}
	
	public void newBonusTime(){
		currentBonusTimeReward = new myInt();
		RequestContext.getCurrentInstance().update("tbView:formObjectives:bonusTime");
	}
	
	public void editBonusTime(){
		editingBonusTime = true;
		RequestContext.getCurrentInstance().update("tbView:formObjectives:addEditBonusTime");
	}
	
	public void deleteBonusTime(){
		listBonusTimeReward.remove(currentBonusTimeReward);
		newBonusTime();
		RequestContext.getCurrentInstance().update("tbView:formObjectives:dtBonusTime");
		translateToString();
	}
}
