package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.model.Page;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.ExplanationPageConverter;
 
 
@ManagedBean(name="explView")
@SessionScoped
public class ExplanationView implements PagesProvider {

	private int pageIdCount;
    private Page page;
    private List<Page> pages;
    private ExplanationPageConverter epc;
    
    public final String editorControls = 
    		"bold italic underline strikethrough subscript superscript | " + 
    		"font size style color highlight | " + 
    		"bullets numbering | " +
    		"outdent indent | " + 
    		"alignleft center alignright justify | " + 
    		"undo redo | " + 
    		"rule image | " + 
    		"cut copy paste pastetext";
    
  			 
	public String getEditorControls() {
		return editorControls;
	}

	public ExplanationPageConverter getConverter() {
		return epc;
	}

	public ExplanationView() {
		this.epc = new ExplanationPageConverter();
		this.epc.setProvider(this);
	}
    
    public List<Page> getPages() {
        return pages;
    }  
    
    public void setPages(List<Page> pages) {
		this.pages = pages;
	}
    
    public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}
	
	@PostConstruct
    public void init() {
		pageIdCount = 0;
    	page = new Page();
        pages = new ArrayList<>();
    }
	
	public void addPage() {
		if (page.getId() < 0) {
			page.setId(pageIdCount++);
			pages.add(page);
		}
		else {
			editPage();
		}
	}
	
	public void editPage() {
		if (page.getId() >= 0) {
			int index = indexOfPageById(page.getId(), pages);
			if (index > -1) {
				pages.get(index).setMsg(page.getMsg());
			}
		}
		resetPage();
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
				pages.remove(index).getMsg();
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
}