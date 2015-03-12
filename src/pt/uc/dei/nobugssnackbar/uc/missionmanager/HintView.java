package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.event.ReorderEvent;

import pt.uc.dei.nobugssnackbar.model.HintCategory;
import pt.uc.dei.nobugssnackbar.model.mission.Hint;

@ManagedBean(name="hintView")
@SessionScoped
// only one scope !!! @ViewScoped
public class HintView implements Serializable {

	private static final long serialVersionUID = 1L;
	
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
        FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Row Moved", "From: " + event.getFromIndex() + ", To:" + event.getToIndex());
        FacesContext.getCurrentInstance().addMessage(null, msg);
    }
    
	private boolean showDlgExt;

	public boolean isShowDlgExt() {
		return showDlgExt;
	}

    public void showDlgExt() throws Exception {
    	this.showDlgExt = true;
    	
    	FacesContext context = FacesContext.getCurrentInstance();
    	HintCategoryHelperView hcHelper = context.getApplication().evaluateExpressionGet(context, "#{hcHelper}", HintCategoryHelperView.class);
    	hcHelper.render();
    }
    
    public void hideDlgExt() {
    	this.showDlgExt = false;
    }
    
    private HintCategory selectedCategory;
    
    public HintCategory getSelectedCategory() {
    	
		return new HintCategory(1, "Choose Category", "blabla", "<xml  return='ChooseCategory(#{command})'><row><item type=\"text\">According the commands available in this mission, select the category which is showed the hint</item></row><row><item type=\"list\" name=\"command\">mm.missionContent.commands</item></row></xml>");
	}

    public void setSelectedCategory(HintCategory selectedCategory) {
		this.selectedCategory = selectedCategory;
	}
}
