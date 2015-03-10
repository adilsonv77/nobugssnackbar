package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;


import org.primefaces.event.ReorderEvent;

import pt.uc.dei.nobugssnackbar.model.Hint;



@ManagedBean(name="hintView")
@SessionScoped
@ViewScoped
public class HintView {

	private boolean add = false;
	private Hint hint = new Hint();
	private List<Hint> tipsHints = new ArrayList<>();
	private List<Hint> errorsHints = new ArrayList<>();


	public void setAdd(boolean add) {
		this.add = add;
	}
	public boolean getAdd(){
		return add;
	}
	
	public void setHint(Hint hint) {
		if(null != hint){
			this.hint = hint;
		}
	}
	public Hint getHint() {
		return hint;
	}
	
	public void setTipsHints(List<Hint> tipsHints) {
		this.tipsHints = tipsHints;
	}
	public List<Hint> getTipsHints() {
		return tipsHints;
	}
	
	public void setErrorsHints(List<Hint> errorsHints) {
		this.errorsHints = errorsHints;
	}
	public List<Hint> getErrorsHints() {
		return errorsHints;
	}
	
    public void deleteTipsHint() {
        tipsHints.remove(hint);
        hint = new Hint();
    }
    
	public void addEditHint() {
		if(this.add){/*prevent from adding element when editing*/
			if(hint.getType()){/*check type if it is error or hint*/
				errorsHints.add(hint);				
			}
			else{
				tipsHints.add(hint);
			}
		}
		hint = new Hint();
	}
	
	public void deleteHint(){
		if(hint.getType()){
			errorsHints.remove(hint);
		}
		else{
			tipsHints.remove(hint);
		}
	}
	
	public void newHint(){
		this.hint = new Hint();
	}
	
    public void onRowReorder(ReorderEvent event) {
    	this.hint = new Hint();
        FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Row Moved", "From: " + event.getFromIndex() + ", To:" + event.getToIndex());
        FacesContext.getCurrentInstance().addMessage(null, msg);
    }
	
}
