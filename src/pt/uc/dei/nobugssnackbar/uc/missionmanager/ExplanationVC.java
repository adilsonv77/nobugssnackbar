package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.context.RequestContext;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Page;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.ExplanationPageConverter;
import pt.uc.dei.nobugssnackbar.util.ImgTagConvertor;
 
@ManagedBean(name="explVC")
@ViewScoped
public class ExplanationVC implements IPagesProvider, Serializable {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{mm}")
	private MissionManager missionManager;
	
	private int pageIdCount;
    private Page page;
    private List<Page> pages;
    private ExplanationPageConverter epc;
    private boolean ok;
    
    public final String editorControls = 
    		"[['Cut', 'Copy', 'Paste', 'PasteText'],"
    		+ "[ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],"
    		+ "['Font', 'FontSize', 'TextColor', 'BGColor'],"
    		+ "['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],"
    		+ "['Undo', 'Redo'],['Image']]";
    		/*
    		"bold italic underline strikethrough subscript superscript | " + 
    		"font size style color highlight | " + 
    		"bullets numbering | " +
    		"outdent indent | " + 
    		"alignleft center alignright justify | " + 
    		"undo redo | " + 
    		"rule image | " + 
    		"cut copy paste pastetext";
    		*/
    
 
	@PostConstruct
	private void init() {
		try {
			this.pages = missionManager.getMissionContent().getPages();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
    
	public ExplanationVC() {
		pageIdCount = 0;
    	page = new Page();
        pages = new ArrayList<>();
        
		this.epc = new ExplanationPageConverter();
		this.epc.setProvider(this);
	}
	
	@Override
	public List<Page> getPages() {
		return pages;
	}
	
	public String getEditorControls() {
		return editorControls;
	}

	public ExplanationPageConverter getConverter() {
		return epc;
	}
     
    public void setPages(List<Page> pages) throws Exception {
		this.pages = pages;
		missionManager.getMissionContent().setPages(pages);
	}    
    public Page getPage() {
		return page;
	}
	public void setPage(Page page) {
		this.page = page;
	}
	
	private boolean checkImages(String text) {
		if (ImgTagConvertor.convertImgTagToHexImgTag(text, true) != null) {
			return true;
		}
		
		return false;
	}
	
	public void addPage() {
		if (page.getMsg() != null && !page.getMsg().trim().isEmpty()) {
			if (page.getId() < 0) {
				if ( this.isOk()) {
					page.setId(pageIdCount++);
					pages.add(page);
				}
			}
			else {
				editPage();
			}
			
			resetPage();
		}
		else {
			ResourceBundle messageBundle = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			context.validationFailed();
	        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, messageBundle.getString("warningMsg"), messageBundle.getString("emptyMsgbox")));
		}
	}
	
	public void editPage() {
		if (page.getId() >= 0) {
			int index = indexOfPageById(page.getId(), pages);

			if (index > -1 && this.isOk()) {
				pages.get(index).setMsg(page.getMsg());
			}
		}
	}
	
	public void getPageById() {
		int editPageID = Integer.parseInt(
				FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("editPageID")
		);

		resetPage();
		
		for (int i = 0; i < pages.size(); i++) {
			if (pages.get(i).getId() == editPageID) {
				page.setId(pages.get(i).getId());
				page.setMsg(pages.get(i).getMsg());
				break;
			}
		}
	}
	
	public void resetPage() {
		page = new Page();
		page.setId(-1);
	}
	
	public void deleteExplPage() {

		if (page.getId() > -1) {
			int index = indexOfPageById(page.getId(), pages);
			if (index > -1) {
				pages.remove(index);
			}
		}
		resetPage();
	}
	
	private int indexOfPageById(int id, List<Page> list) {
		int result = -1;
		
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getId() == id) {
				result = i;
				break;
			}
		}
		
		return result;
	}

	public boolean isOk() {
		ok = checkImages(page.getMsg());
		
		if (ok == false) {
			RequestContext context = RequestContext.getCurrentInstance();
			context.execute("PF('pageDialog').show()");
			
			ResourceBundle messageBundle = ApplicationMessages.getMessage();
			FacesMessage msg = new FacesMessage(messageBundle.getString("invalidImage"),
					messageBundle.getString("tryAgainCheckImage"));
			FacesContext.getCurrentInstance().addMessage("", msg);
		}
		else {
			RequestContext context = RequestContext.getCurrentInstance();
			context.execute("PF('pageDialog').hide()");
		}
		return ok;
	}

	public void setOk(boolean ok) {
		this.ok = ok;
	}
	
	public MissionManager getMissionManager() {
		return missionManager;
	}
	
	public void setMissionManager(MissionManager missionManager) {
		this.missionManager = missionManager;
	}
}