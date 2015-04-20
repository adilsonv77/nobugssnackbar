package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import org.primefaces.event.SelectEvent;

import pt.uc.dei.nobugssnackbar.model.Command;

@ManagedBean(name="commandsVC")
@ViewScoped
public class CommandsVC implements ICommandProvider, Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value="#{mm}")
	private MissionManager missionManager;
	
	public MissionManager getMissionManager() {
		return missionManager;
	}
	
	public void setMissionManager(MissionManager missionManager) {
		this.missionManager = missionManager;
	}
	
	
	private Command selectedChildCommand;
	private Command selectedRootCommand;
	private List<Command> rootCommands;
	
	//private List<Command> selectedCommands; //does not include root commands


	@PostConstruct
	private void init() {
		
		try {
			this.rootCommands = missionManager.getMissionContent().getCommands();
			this.selectedChildCommand = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
			
	}
		
	public void onRowSelectC(SelectEvent event) {
		Command temp = ((Command)event.getObject());
		temp.setSelected(!temp.isSelected());
		
		boolean flag = false;
		
		for (Command c : temp.getParent().getChildren()) {
			if (c.isSelected() == true) {
				flag = true;
				break;
			}
		}

		temp.getParent().setSelected(flag);
	}
	
	private void checkRootCommand(boolean value) {
		for (Command c : selectedRootCommand.getChildren()) {
				c.setSelected(value);
		}
	}
		
	public List<Command> getChilds() {
		if (selectedRootCommand != null)
			return selectedRootCommand.getChildren();
		else
			return null;
	}

	public List<Command> getRootCommands() throws Exception {
		
		return rootCommands;
	}
/*
	public List<Command> getSelectedCommands() {
		if (commands != null) {
			List<Command> result = new ArrayList<>();
			for (Command c : commands) {
				if (c.getParentId() != null && c.isSelected()) {
					result.add(c);
				}
			}
			selectedCommands = result;
		}
		
		return selectedCommands;
	}

	public void setSelectedCommands(List<Command> selectedCommands) {
		this.selectedCommands = selectedCommands;
	}
	*/
	public Command getSelectedRootCommand() {
		return selectedRootCommand;
	}

	public void setSelectedRootCommand(Command selectedRootCommand) {
		this.selectedRootCommand = selectedRootCommand;
	}
	
	public Command getSelectedChildCommand() {
		return selectedChildCommand;
	}

	public void setSelectedChildCommand(Command command) {
		this.selectedChildCommand = command;
	}

	@Override
	public List<Command> getCommands() throws Exception {
		return getRootCommands();
	}
}
