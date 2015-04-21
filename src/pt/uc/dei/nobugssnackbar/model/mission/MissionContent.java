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

	public void setCommands(List<Command> commands) {
		this.commands = commands;
	}

	public int getCommandIndex(String commandName) {
		
		int i = 0;
		for (Command c: commands) {
			if (c.getName().equals(commandName))
				return i; 
			if (c.isSelected())
				i++;
		}
		return 0;
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
		for (Command c:commands)
			if (c.getName().equals(categoryName)) {
				int j = 0;
				for (Command i:c.getChildren())
					if (i.getName().equals(commandName))
						break;
					else
						if (i.isSelected())
							j++;
				
				return j;
			}
		return 0;
		
	}
	
	public List<Command> allCommands() {
		List<Command> ret = new ArrayList<>();
		
		for (Command categ: commands)
			for (Command com: categ.getChildren())
				ret.add(com);
		
		return ret;
	}

	public List<Page> getPages() {
		return pages;
	}

	public void setPages(List<Page> pages) {
		this.pages = pages;
	}
}
