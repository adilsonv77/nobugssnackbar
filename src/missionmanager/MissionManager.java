package missionmanager;

import java.util.ArrayList;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;



@ManagedBean(name="mm")
@SessionScoped
public class MissionManager {
	private Page page = new Page();
	private ArrayList<Page> pageExplList = new ArrayList<Page>();
	
	private static int counterPageId = 1;
	
	public Page getPage() {
		return page;
	}
	
	public ArrayList<Page> getPageExplList() {
		return pageExplList;
	}
	
	public void setPage(Page page) {
		this.page = page;
	}
	
	public void addPageExpl() {
		if (this.page.getId() == 0) {
			this.page.setId(counterPageId);
			counterPageId++;
			pageExplList.add(this.page);
		}
	}
	
	public void newPage() {
		this.page = new Page();
	}
}
