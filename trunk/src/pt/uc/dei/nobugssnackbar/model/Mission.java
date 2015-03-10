package pt.uc.dei.nobugssnackbar.model;

import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;

import org.primefaces.event.CellEditEvent;
import org.primefaces.event.ReorderEvent;
import org.primefaces.event.RowEditEvent;

public class Mission{
	
	// #region Class private variables
	private boolean open;
	private int timeLimit;
	private String name;
	private int missionCounter = 0;
	private int id;

	private int timesBefore;	
/*************************************************************************/

	private String cooker = "initial";
	private MachineType machineType = new MachineType(); 
	private Page page = new Page();

	private Customer customer = new Customer();
	private Randomization randomization = new Randomization();
	private Category category = new Category();
	private List<Page> pageExplList = new ArrayList<Page>();


	private List<MachineType> machineTypeList = new ArrayList<MachineType>();
	private List<Category> commandList = new ArrayList<Category>();
	private List<Randomization> randList = new ArrayList<Randomization>();
	private List<Customer> customers = new ArrayList<Customer>();
	private Objectives objectives = new Objectives();
	private XmlTag xmltag = new XmlTag();
	
	private static int counterPageId = 1;
	private static int counterCustomerId = 1;
	// #end
	
	// #region Class public getters and setters
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Objectives getObjectives() {
		return objectives;
	}
	public Page getPage() {
		return page;
	}
	public XmlTag getXmltag() {
		return xmltag;
	}
	public void setXmltag(XmlTag xmltag) {
		this.xmltag = xmltag;
	}
	public int getTimesBefore() {
		return timesBefore;
	}
	public void setTimesBefore(int timesBefore) {
		this.timesBefore = timesBefore;
	}
	public boolean isOpen() {
		return open;
	}
	public void setOpen(boolean open) {
		this.open = open;
	}
	public int getTimeLimit() {
		return timeLimit;
	}
	public void setTimeLimit(int timeLimit) {
		this.timeLimit = timeLimit;
	}
	
	public List<Customer> getCustomers() {
		return customers;
	}
	
	public Randomization getRandomization() {
		return randomization;
	}
	
	public void setRandomization(Randomization randomization) {
		this.randomization = randomization;
	}
	
	public List<Randomization> getRandList() {
		return randList;
	}
	public void setRandList(ArrayList<Randomization> randList) {
		this.randList = randList;
	}
	
	public void setCooker(String cooker) {
		this.cooker = cooker;
	}
	
	public String getCooker() {
		return cooker;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	
	public MachineType getMachineType() {
		return machineType;
	}
	
	public Category getCategory() {
		return category;
	}
	
	public List<Category> getCommandList() {
		return commandList;
	}
	
	public List<MachineType> getMachineTypeList() {
		return machineTypeList;
	}
	
	public List<Page> getPageExplList() {
		return pageExplList;
	}
	
	public void setObjectives(Objectives objectives) {
		this.objectives = objectives;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	
	public void setPage(Page page) {
		this.page = page;
	}
	
	public void setMachineType(MachineType machineType) {
		this.machineType = machineType;
	}
	
	public String getName() {
		name = name + missionCounter++;
		return name;

	}
	
	public void setName(String name) {
		this.name = name;
	}
	// #end
	
	// #region Class user defined methods
	public void addCustomer() {
		if (this.customer.getId() == 0) {
			this.customer.setId(counterCustomerId);
			counterCustomerId++;
			customers.add(customer);
		}
		this.customer = new Customer();
	}
	
	/*public void addPageExpl() {
		if (this.page.getId() == 0) {
			this.page.setId(counterPageId);
			counterPageId++;
			pageExplList.add(this.page);
		}
		this.page = new Page();
	}*/
	
	public void deletePage(){
		pageExplList.remove(page);
	}
	

	public void addMachine() {
		if (machineType != null) {
			this.machineTypeList.add(machineType);
		}
		this.machineType = new MachineType();
	}
	
	public void addCategory(){
		if(category != null){
			this.commandList.add(category);
		}
		this.category = new Category();
	}
	
	public void addRandomization(){
		if(randomization!= null){
			this.randList.add(randomization);
		}
		this.randomization = new Randomization();
	}
	
    public void onRowEdit(RowEditEvent event) {
        FacesMessage msg = new FacesMessage("Row Edited","" );
        FacesContext.getCurrentInstance().addMessage(null, msg);
    }
     
    public void onRowCancel(RowEditEvent event) {
        FacesMessage msg = new FacesMessage("Edit Cancelled", "");
        FacesContext.getCurrentInstance().addMessage(null, msg);
    }
    public void onCellEdit(CellEditEvent event) {
        Object oldValue = event.getOldValue();
        Object newValue = event.getNewValue();
         
        if(newValue != null && !newValue.equals(oldValue)) {
            FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Cell Changed", "Old: " + oldValue + ", New:" + newValue);
            FacesContext.getCurrentInstance().addMessage(null, msg);
        }
    }
    // #end

}