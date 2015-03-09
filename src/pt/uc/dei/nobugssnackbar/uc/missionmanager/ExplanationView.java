package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;

import pt.uc.dei.nobugssnackbar.model.Page;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.ExplanationPageConverter;
 
 
@ManagedBean(name="explView")
public class ExplanationView {

	private int pageIdCount;
    private Page page;
    private ArrayList<Page> pages;
    
    public ExplanationView() {
		ExplanationPageConverter.ev = this;
	}
    
    public ArrayList<Page> getPages() {
        return pages;
    }  
    
    public void setPages(ArrayList<Page> pages) {
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
		pageIdCount = 1;
    	page = new Page();
        pages = new ArrayList<>();
    }
	
	public void addPage() {
		page.setId(pageIdCount++);
		pages.add(page);
		page = new Page();
	}
}