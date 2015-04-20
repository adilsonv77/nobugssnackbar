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
}
