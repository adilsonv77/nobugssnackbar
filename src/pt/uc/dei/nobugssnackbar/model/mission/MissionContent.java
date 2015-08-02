package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

import pt.uc.dei.nobugssnackbar.model.Command;

/**
 * It is the field content in the missions table. It represents the whole
 * mission configuration as XML.
 * 
 * @author adilsonv77
 * 
 */
@XmlRootElement(name="mission")
@XmlAccessorType(XmlAccessType.NONE)
public class MissionContent implements Serializable {

	private static final long serialVersionUID = 1L;

	/*private List<Hint> tipsHints = new ArrayList<>();
	private List<Hint> errorsHints = new ArrayList<>();*/
	
    @XmlAttribute(name="timeLimit")
    private Long timeLimit;
    
	@XmlAttribute(name="open")
	private boolean repeatable;
	
	@XmlElement(name="slider",type=Slider.class)
	private Slider slider = new Slider();
	
	@XmlElementWrapper(name="explanation")
	@XmlElement(name="page",type=Page.class)
    private List<Page> pages = new ArrayList<>();
	
	@XmlElement(name="hints",type=Hints.class)
	private Hints hints = new Hints();

	private List<Command> commands;	
	@XmlElementWrapper(name="commands")
	@XmlElement(name="category",type=Command.class)
	private List<Command> selectedCommands;
	    
    @XmlElement(name="cooker",type=Cook.class)
	private Cook cook = new Cook();
    
	@XmlElementWrapper(name="customersSN")
	@XmlElement(name="randomization",type=Randomization.class)
    private List<Randomization> randList = new ArrayList<>();
	
	@XmlElementWrapper(name="customers")
	@XmlElement(name="customer",type=Customer.class)
    private List<Customer> customers = new ArrayList<>();
    
    @XmlElement(name="objectives")
    private Objectives objectives = new Objectives();
    
    @XmlElement(name="xml",type=XmlTag.class)
	private XmlTag xmltag = new XmlTag();
	
	private boolean selectedLoadBlocks = false;

	public MissionContent() {
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

	public Objectives getObjectives() {
		return objectives;
	}

	public void setObjectives(Objectives objectives) {
		this.objectives = objectives;
	}

	public boolean isSelectedLoadBlocks() {
		return selectedLoadBlocks;
	}

	public void setSelectedLoadBlocks(boolean selectedLoadBlocks) {
		this.selectedLoadBlocks = selectedLoadBlocks;
	}

	public Long getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(Long timeLimit) {
		this.timeLimit = timeLimit;
	}

	public List<Command> getSelectedCommands() {
		return selectedCommands;
	}

	public void setSelectedCommands(List<Command> selectedCommands) {
		this.selectedCommands = selectedCommands;
	}

	public Hints getHints() {
		return hints;
	}
	
	public void setHints(Hints hints) {
		this.hints = hints;
	}
	
	public void setRepeatable(boolean repeatable) {
		this.repeatable = repeatable;
	}
	
	public boolean isRepeatable() {
		return repeatable;
	}
}
