package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Command;

/**
 * It is the field content in the missions table. It represents the whole
 * mission configuration as XML.
 * 
 * @author adilsonv77
 * 
 */
public class MissionContent implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<Hint> tipsHints = new ArrayList<>();
	private List<Hint> errorsHints = new ArrayList<>();

	private List<Command> commands;
    private List<Page> pages = new ArrayList<>();
    
    private List<Randomization> randList = new ArrayList<>();
    
    private List<Customer> customers = new ArrayList<>();

	private Cook cook = new Cook();
	private XmlTag xmltag = new XmlTag();
	private Slider slider = new Slider();

	public MissionContent() {
	}
	
	public List<Hint> getTipsHints() {
		return tipsHints;
	}

	public void setTipsHints(List<Hint> tipsHints) {
		this.tipsHints = tipsHints;
	}

	public List<Hint> getErrorsHints() {
		return errorsHints;
	}

	public void setErrorsHints(List<Hint> errorsHints) {
		this.errorsHints = errorsHints;
	}

	public List<Command> getCommands() {
		return commands;
	}

	public List<Randomization> getRandList() {
		return randList;
	}
	
	public void setRandList(List<Randomization> randList) {
		this.randList = randList;
	}
	
	public void setCommands(List<Command> commands) {
		this.commands = commands;
	}
	
	public List<Page> getPages() {
		return pages;
	}

	public void setPages(List<Page> pages) {
		this.pages = pages;
	}

	public List<Customer> getCustomers() {
		return customers;
	}

	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}
	
	public int getCommandIndex(String commandName) {
		
		int i = 0;
		for (Command c: commands) {
			if (c.getName().equals(commandName))
				return i; 
			if (c.isSelected())
				i++;
		}
		
		return -1;
	}
	public List<Command> getAvailableCommands() {
		
		List<Command> ret = new ArrayList<>();
		
		for (Command c:commands)
			if (c.isSelected())
				ret.add(c);
		
		return ret ;
	}
	
	public List<Command> availableSubCommands(String categoryName) {
		for (Command c:commands)
			if (c.getName().equals(categoryName)) {
				List<Command> ret = new ArrayList<>();
				for (Command i:c.getChildren())
					if (i.isSelected())
						ret.add(i);
				
				return ret;
			}
		return null;
	}
	
	public int getItemIndex(String categoryName, String commandName) {
		boolean exist = false;
		for (Command c:commands)
			if (c.getName().equals(categoryName)) {
				int j = 0;
				for (Command i:c.getChildren()){
					if (i.getName().equals(commandName)){
						exist = true;
						break;
					}
					else{
						if (i.isSelected())
							j++;
					}
				}
				if(exist)
					return j;
				return -1;
			}
		return -1;
		
	}
	
	public List<Command> allCommands() {
		List<Command> ret = new ArrayList<>();
		
		for (Command categ: commands)
			for (Command com: categ.getChildren())
				ret.add(com);
		
		return ret;
	}

	public Cook getCook() {
		return cook;
	}

	public void setCook(Cook cook) {
		this.cook = cook;
	}

	public XmlTag getXmltag() {
		return xmltag;
	}

	public void setXmltag(XmlTag xmltag) {
		this.xmltag = xmltag;
	}

	public Slider getSlider() {
		return slider;
	}

	public void setSlider(Slider slider) {
		this.slider = slider;
	}

}
