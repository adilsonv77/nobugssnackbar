package missionmanager;

import java.util.ArrayList;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;



@ManagedBean(name="mm")
@SessionScoped
public class MissionManager {
	private boolean addInErrorList;
	private int machineType;
	private Page page = new Page();
	private Hint hint = new Hint();
	private Category category = new Category();
	private ArrayList<Page> pageExplList = new ArrayList<Page>();
	private ArrayList<Hint> hintSeqList = new ArrayList<Hint>();
	private ArrayList<Hint> hintErrorList = new ArrayList<Hint>();
	private ArrayList<Integer> machineTypeList = new ArrayList<Integer>();
	private ArrayList<Category> commandList = new ArrayList<Category>();
	
	private static int counterPageId = 1;
	
	public Page getPage() {
		return page;
	}
	
	public Hint getHint() {
		return hint;
	}
	
	public int getMachineType() {
		return machineType;
	}
	
	public Category getCategory() {
		return category;
	}
	
	public ArrayList<Category> getCommandList() {
		return commandList;
	}
	
	public ArrayList<Integer> getMachineTypeList() {
		return machineTypeList;
	}
	
	public ArrayList<Page> getPageExplList() {
		return pageExplList;
	}
	
	public ArrayList<Hint> getHintSeqList() {
		return hintSeqList;
	}
	
	public ArrayList<Hint> getHintErrorList() {
		return hintErrorList;
	}
	
	public void setCategory(Category category) {
		this.category = category;
	}
	
	public void setPage(Page page) {
		this.page = page;
	}
	
	public void setHint(Hint hint) {
		this.hint = hint;
	}
	
	public void setMachineType(int machineType) {
		this.machineType = machineType;
	}
	
	public void addPageExpl() {
		if (this.page.getId() == 0) {
			this.page.setId(counterPageId);
			counterPageId++;
			pageExplList.add(this.page);
		}
	}
	
	public void addHint() {
		if (this.addInErrorList == true) {
			hintErrorList.add(this.hint);
		}
		else {
			hintSeqList.add(this.hint);
		}
	}
	
	public void addMachine() {
		this.machineTypeList.add(machineType);
	}
	
	public void newPage() {
		this.page = new Page();
	}
	
	public void addInErrorListFunc() {
		this.hint = new Hint();
		this.addInErrorList = true;
	}
	
	public void addInSeqListFunc() {
		this.hint = new Hint();
		this.addInErrorList = false;
	}
}
