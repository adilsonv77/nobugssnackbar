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
import pt.uc.dei.nobugssnackbar.model.mission.Hint;
import pt.uc.dei.nobugssnackbar.model.mission.Hints;
import pt.uc.dei.nobugssnackbar.util.ImgTagConvertor;


@ManagedBean(name="hintView")
@ViewScoped
public class HintView implements Serializable {

	private static final long serialVersionUID = 1L;	
	
	/*
	 * add == false when editing hint
	 * add == true when adding new hint
	 */
	private boolean add = false;
	
	private boolean dlgHintDisabled = false;
	
	private Hint hint = new Hint();
	
	@ManagedProperty(value="#{mm.missionContent.hints}")
	private Hints hints;

	ResourceBundle messageBundle = ApplicationMessages.getMessage();
	
	public void setAdd(boolean add) {
		this.add = add;
		if(add){
			newHint();		
		}
	}
	public boolean getAdd(){
		return add;
	}
	
	public void setHint(Hint hint) {
		if (null != hint){
			this.hint = hint;
		}
	}
	public Hint getHint() {
		return hint;
	}
	
	public Hints getHints() {
		return hints;
	}
	
	public void setHints(Hints hints) {
		this.hints = hints;
	}
	
	public void setTipsHints(List<Hint> tipsHints) {
		this.hints.setTipsHints(tipsHints);
	}
	public List<Hint> getTipsHints() {
		return hints.getTipsHints();
	}
	
	public void setErrorsHints(List<Hint> errorsHints) {
		this.hints.setErrorsHints(errorsHints);
	}
	public List<Hint> getErrorsHints() {
		return hints.getErrorsHints();
	}
	
    public void deleteTipsHint() {
    	getTipsHints().remove(hint);
        newHint();
    }

    public String getText() throws Exception{
    	hint.setText(ImgTagConvertor.replaceHexWithImages(hint.getText(),"png"));
		return hint.getText();
    }

    public void setText(String aText){
    	hint.setText(aText);
    }
    
    public String getCategory(){
    	if(hint.getCategory() != ""){
    		return this.hint.getCategory();
    	}
    	return messageBundle.getString("hintCategoryEmptyMsg");
    }
    
	public boolean isOk() {
		boolean ok = checkImages(hint.getText());
		
		if (ok == false) {
			addMessageToGrowl
			(
					FacesMessage.SEVERITY_ERROR,
					new Object[]{"title=invalidImage","tryAgainCheckImage"}
			);
		}

		return ok;
	}
	
	private boolean checkImages(String text) {
		if (ImgTagConvertor.convertImgTagToHexImgTag(text, true) != null) {
			return true;
		}	
		return false;
	}
    
	public void addEditHint() {
		if(this.dlgHintDisabled){
			this.dlgHintDisabled = false;
		}
		else{
			if(hint.getCategory().equals("")){
				addMessageToGrowl(FacesMessage.SEVERITY_WARN,new Object[]{"title=warningMsg","hintCategoryEmptyMsg"});
				//newHint();
				return;
			}
			if(!isOk()){
				return;
			}
			if (this.add) {/*prevent from adding element when editing*/
				if (hint.getType()) {/*check type if it is error or hint*/
					getErrorsHints().add(hint);
					addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[]{"title=newHintAdd","newErrorHintAdd"});
				}
				else {
					getTipsHints().add(hint);
					addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[]{"title=newHintAdd","newTipHintAdd"});
				}
			}
			checkLists();
		}
		
		hideDlgHint();
		newHint();
	}
	
	public void cancel(){
		dlgHintDisabled = false;
		newHint();
	}
	
	void hideDlgHint(){
        RequestContext context = RequestContext.getCurrentInstance();
        context.execute("PF('hintDialog').hide()");
	}
	
	public void checkLists(){
		for (Hint hint : getErrorsHints()) {
			if(hint.getType() == false/*tip*/){
				getTipsHints().add(hint);
				getErrorsHints().remove(hint);
				addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[]{"title=hintMoved","hintMovedFromErrorsToTips"});
				closeDlgHint();
			}
		}
		for (Hint hint : getTipsHints()) {
			if(hint.getType() == true/*error*/){
				getErrorsHints().add(hint);
				getTipsHints().remove(hint);			
				addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[]{"title=hintMoved","hintMovedFromTipsToErrors"});
				closeDlgHint();
			}
		}	
	}
	
	public void deleteHint(){
		
		if(this.hint.getType()){
			getErrorsHints().remove(this.hint);
			addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[]{"title=hintDeleted","hintDeletedFromErrors"});
		}
		else{
			getTipsHints().remove(this.hint);
			addMessageToGrowl(FacesMessage.SEVERITY_INFO,new Object[]{"title=hintDeleted","hintDeletedFromTips"});
		}
	}
	
	public void newHint(){
		this.hint = new Hint();
	}
	
	public void addMessageToGrowl(String key){
		FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO,"Notification", messageBundle.getString(key));
		FacesContext.getCurrentInstance().addMessage(null, msg);
		RequestContext.getCurrentInstance().update("growlMsgs");
	}
	
	public void addMessageToGrowl(FacesMessage.Severity severity, Object [] msgs){
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
		
    public void onRowReorder(ReorderEvent event) {
    	
    	addMessageToGrowl
    	(
    		FacesMessage.SEVERITY_INFO,
    		new Object [] {"title=movedRowMsg","msgFrom"," : ",event.getFromIndex()," , ","msgTo"," : ",event.getToIndex()}
    	);
        
        RequestContext.getCurrentInstance().update("tbView:formDTT:dtTips");
        RequestContext.getCurrentInstance().update("tbView:formDTE:dtErorrs");
    }
    
	private boolean showDlgExt;
	
	public boolean isShowDlgExt() {
		return showDlgExt;
	}

    public void enableDialog() throws Exception {		    	
    	FacesContext context = FacesContext.getCurrentInstance();
    	HintCategoryHelperView hcHelper = context.getApplication().evaluateExpressionGet(context, "#{hcHelper}", HintCategoryHelperView.class);
    	if (hcHelper.render())
    	{		
    		addDialog();
    		this.showDlgExt = true;
    	}
    	else
    	{
    		this.showDlgExt = false;
    		hcHelper.submitForm();
            RequestContext cont = RequestContext.getCurrentInstance();
            cont.execute("PF('chooseHintCategoryDialog').hide()");
    	}
    }
    
    public void handleDialog(){
    	RequestContext cont = RequestContext.getCurrentInstance();
    	cont.execute("PF('hintCategoryDialog').hide()");
    }
    
    public void disableDialog() {
    	this.showDlgExt = false;
    }
    
    public void closeDlgHint(){
    	RequestContext requestContext = RequestContext.getCurrentInstance();
        requestContext.execute("PF('hintDialog').hide()");
    }
       
    public void addDialog() {
        RequestContext context = RequestContext.getCurrentInstance();
        context.execute("PF('hintCategoryDialog').show()");
    }
	public boolean isDlgHintDisabled() {
		return dlgHintDisabled;
	}
	public void setDlgHintDisabled(boolean dlgHintDisabled) {
		this.dlgHintDisabled = dlgHintDisabled;
	}
}
