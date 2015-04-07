package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.event.ReorderEvent;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Hint;

@ManagedBean(name="hintView")
@SessionScoped
public class HintView implements Serializable {

	private static final long serialVersionUID = 1L;
	
	public HintView() {
		// TODO Auto-generated constructor stub
	}
	
	private boolean add = false;//false = editing hint(NOT adding new hint)
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
		if (null != hint){
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
		if (this.add) {/*prevent from adding element when editing*/
			if (hint.getType()) {/*check type if it is error or hint*/
				errorsHints.add(hint);				
			}
			else {
				tipsHints.add(hint);
			}
		}
		checkLists();
		this.hint = new Hint();
	}
	
	public void checkLists(){
		for (Hint hint : errorsHints) {
			if(hint.getType() == false/*tip*/){
				tipsHints.add(hint);
				errorsHints.remove(hint);
				
			}
		}
		for (Hint hint : tipsHints) {
			if(hint.getType() == true/*error*/){
				errorsHints.add(hint);
				tipsHints.remove(hint);
				break;
			}
		}
		
	}
	
	public void deleteHint(Hint hint){
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
    	ResourceBundle messageBundle = ApplicationMessages.getMessage();
        FacesMessage msg = new FacesMessage(
        		FacesMessage.SEVERITY_INFO, 
        		messageBundle.getString("movedRowMsg"), 
        		messageBundle.getString("msgFrom") + ": " + event.getFromIndex() + 
        		", " + messageBundle.getString("msgTo") + ": " + event.getToIndex());
        FacesContext.getCurrentInstance().addMessage(null, msg);
    }
    
	private boolean showDlgExt;

	private int contador;

	public int getContador() {
		return contador;
	}
	
	public boolean isShowDlgExt() {
		return showDlgExt;
	}

    public void enableDialog() throws Exception {
		this.showDlgExt = true;
		this.contador++;
    	
    	FacesContext context = FacesContext.getCurrentInstance();
    	HintCategoryHelperView hcHelper = context.getApplication().evaluateExpressionGet(context, "#{hcHelper}", HintCategoryHelperView.class);
    	hcHelper.render();
    }
    
    public void disableDialog() {
    	this.showDlgExt = false;
    }
    
   /* private HintCategory objHCategory;

	private String strHCategory;
    
    public HintCategory getObjHCategory() {
    	return new HintCategory(1, "Choose Category", "blabla", "<xml return='ChooseCategory(#{mm.missionContent.commands.indexOf(\"?{command}\")})'><row><item type=\"text\">According the commands available in this mission, select the category which is showed the hint</item></row><row><item type=\"list\" name=\"command\">#{mm.missionContent.commands}</item></row></xml>");
	}

	public void setObjHCategory(HintCategory objHCategory) {
		this.objHCategory = objHCategory;
		this.hint.setHintCategory(objHCategory);
	}
    
	public void setStrHCategory(String hintCategory) {
		this.strHCategory = hintCategory;
	}
	public String getStrHCategory() {
		if(objHCategory != null){
			strHCategory = objHCategory.getTitle();
		}
		return strHCategory;
	}*/
}
