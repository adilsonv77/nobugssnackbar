package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.context.RequestContext;
import org.primefaces.event.ReorderEvent;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Randomization;

@ManagedBean(name="randView")
@ViewScoped
public class RandomizationView implements Serializable {

	private static final long serialVersionUID = 1L;
	
	public RandomizationView() {
		// TODO Auto-generated constructor stub
	}
	
	private Randomization rand;
	
	@ManagedProperty(value="#{mm.missionContent.randList}")
	private List<Randomization> randList;
	
	/*
	 * I added boolType for using in p:selectOneRadio, because it works with
	 * boolean values.
	 * True = Hungry
	 * False = Thirsty
	 */ 	
	private boolean boolType;
	
	/*
	 * I added boolSet for using in p:selectOneRadio, because it works with
	 * boolean values.
	 * True = New
	 * False = Not the same
	 */ 	
	private boolean boolSet;
	
	/*Disabled elements in panelGrid in randomization fieldset*/
	private boolean disabled = true;
	
	/*flag for editing rand or adding new rand */
	private boolean editing = false;
	
	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	
	public boolean getDisabled() {
		return disabled;
	}
	
	public boolean getBoolSet(){
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		
		if(this.rand.getSet().equals(messageBundle.getString("new"))){
			this.boolSet = true;
		}
		if(this.rand.getSet().equals(messageBundle.getString("notthesame"))){
			this.boolSet = false;
		}
		return this.boolSet;
	}
	
	public void setBoolSet(boolean aBoolSet) {
		this.boolSet = aBoolSet;
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		
		if(this.boolSet){
			this.rand.setSet(messageBundle.getString("new"));
		}
		else{
			this.rand.setSet(messageBundle.getString("notthesame"));
		}
	}
	
	public boolean getBoolType(){
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		
		if(this.rand.getType().equals(messageBundle.getString("hungry"))){
			this.boolType = true;
		}
		if(this.rand.getType().equals(messageBundle.getString("thirsty"))){
			this.boolType = false;
		}
		return this.boolType;
	}
	
	public void setBoolType(boolean boolType) {
		this.boolType = boolType;
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		
		if(this.boolType){
			this.rand.setType(messageBundle.getString("hungry"));
		}
		else{
			this.rand.setType(messageBundle.getString("thirsty"));
		}
	}

	public Randomization getRand() {
		if(rand == null){
			rand = new Randomization();
		}
		return rand;
	}
	public void setRand(Randomization rand) {
		this.rand = rand;
	}
	
	public List<Randomization> getRandList() {
		return randList;
	}
	public void setRandList(List<Randomization> randList) {
		this.randList = randList;
	}
	
	void newRand(){
		this.rand = new Randomization();
	}
	
	void addRand(){
		if(!this.editing){
			if(!this.disabled){
				this.randList.add(this.rand);				
			}
			else{
				addMessageToGrowl(FacesMessage.SEVERITY_WARN,new Object[]{"title=warningMsg","pressAddForAdd"});
			}
		}
		
		this.editing = false;
	}

	public void save(){
		if(this.rand.getQtd() < 0){
			addMessageToGrowl(FacesMessage.SEVERITY_WARN,new Object[]{"title=warningMsg","randNotValid"});
			return;
		}
		addRand();
		newRand();	
		disableGrid();
		RequestContext.getCurrentInstance().update("tbView:randomizationForm");

	}
	
	public void delete(){
		randList.remove(this.rand);
		this.editing = false;
		addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[]{"deletedRand"});
		disableGrid();
		newRand();	
		RequestContext.getCurrentInstance().update("tbView:randomizationForm");
	}
	
	public void edit(Randomization aRand){
		this.rand = aRand;
		this.editing = true;
		this.disabled = false;
		addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[]{"title=editRandTitle","randOpenedForEdit"});
		RequestContext.getCurrentInstance().update("tbView:randomizationForm");	
	}
	
	void disableGrid(){
		this.disabled = true;
	}
	
	public void add(){

		if(this.editing){
			if(this.rand.getQtd() < 0){
				addMessageToGrowl(FacesMessage.SEVERITY_WARN,new Object[]{"title=warningMsg","randNotValid"});
				return;
			}
		}
		
		newRand();	
		
		this.editing = false;
		enableGrid();
		RequestContext.getCurrentInstance().update("tbView:randomizationForm");
	}
	
	public void enableGrid(){
		this.disabled = false;
	}
	
	public void addMessageToGrowl(FacesMessage.Severity severity, Object [] msgs){
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
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
		
	public boolean getEditing(){
		return editing;
	}
	
    public void onRowReorder(ReorderEvent event) {
    	
    	addMessageToGrowl
    	(
    		FacesMessage.SEVERITY_INFO,	
    		new Object [] {"title=movedRowMsg","msgFrom"," : ",event.getFromIndex()," , ","msgTo"," : ",event.getToIndex()}
    	);       
        RequestContext.getCurrentInstance().update("tbView:randomizationForm:randomizationDataTable");
    }
    
}
