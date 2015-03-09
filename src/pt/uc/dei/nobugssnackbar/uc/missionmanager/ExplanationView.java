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

	private int editPageID;
	private int pageIdCount;
    private Page page;
    private List<Page> pages;
    private ExplanationPageConverter epc;
    
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
		editPageID = -1;
		pageIdCount = 0;
    	page = new Page();
        pages = new ArrayList<>();
    }
	
	public void addPage() {
		if (editPageID < 0) {
			page.setId(pageIdCount++);
			pages.add(page);
		}
		else {
			editPage();
		}
	}
	
	public void editPage() {
		if (editPageID < pages.size()) {
			pages.get(editPageID).setMsg(page.getMsg());
			editPageID = -1;
		}
	}
	
	public void getPageById() {
		editPageID = Integer.parseInt(
				FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("editPageID")
		);
		
		for (Page p: pages) {
			if (p.getId() == editPageID) {
				page = p;
				break;
			}
		}
	}
	
	public void resetPage() {
		page = new Page();
	}
	
	public void deleteExplPage() {
		if (editPageID > -1) {
			pages.remove(editPageID);
			editPageID = -1;
		}
	}
}