package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * It is the field content in the missions table. It represents the whole mission configuration as XML. 
 * 
 * @author adilsonv77
 *
 */
public class MissionContent implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private List<Hint> tipsHints = new ArrayList<>();
	private List<Hint> errorsHints = new ArrayList<>();

	private List<String> commands = new ArrayList<>();

	public MissionContent() {
		this.commands.add("Snackman");
		this.commands.add("Variables");
		this.commands.add("Conditionals");
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

	public List<String> getCommands() {
		return commands;
	}

	public void setCommands(List<String> commands) {
		this.commands = commands;
	}

	
}
