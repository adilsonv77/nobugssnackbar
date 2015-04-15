package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.dao.CommandDao;
import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Command;

@ManagedBean(name="commandsVC")
@ViewScoped
public class CommandsVC implements ICommandProvider, Serializable {
	private static final long serialVersionUID = 1L;

	private Command command;
	private List<Command> commands;
	
	private List<Command> rootCommands;
	private List<Command> selectedCommands;
	
	private List<Command> leafCommands;
	private List<Command> availableLeafCommands;
	private List<Command> selectedLeafCommands;

	@ManagedProperty(value="#{factoryDao.commandDao}")
	private CommandDao commandDao;
	

	public CommandsVC() {
		this.command = new Command();
	}
	
	public void onRowSelectCheckbox() {
		loadLeafCommandsForShowing();
	}
	
	public void onRowUnselectCheckbox() {
		loadLeafCommandsForShowing();
	}
	
	public void onToggleSelect() {
		loadLeafCommandsForShowing();
	}
	
	private void loadLeafCommandsForShowing() {
		availableLeafCommands = new ArrayList<>();
		
		for (Command c1 : selectedCommands) {
			for (Command c2 : leafCommands) {
				if (c1.getId() == c2.getParentId()) {
					availableLeafCommands.add(c2);
				}
			}
		}
	}
	
	public Command getCommand() {
		return command;
	}

	public void setCommand(Command command) {
		this.command = command;
	}
	
	public List<Command> getSelectedCommands() {
		return selectedCommands;
	}

	public void setSelectedCommands(List<Command> selectedCommands) {
		this.selectedCommands = selectedCommands;
	}

	@Override
	public List<Command> getCommands() {		
		return commands;
	}
	
	public void setCommands(List<Command> commands) {
		this.commands = commands;
	}
	
	public CommandDao getCommandDao() {
		return commandDao;
	}

	public void setCommandDao(CommandDao commandDao) {
		this.commandDao = commandDao;
	}


	public List<Command> getLeafCommands() {
		return leafCommands;
	}


	public void setLeafCommands(List<Command> leadCommands) {
		this.leafCommands = leadCommands;
	}


	public List<Command> getRootCommands() throws Exception {
		if (rootCommands == null) {
			commands = commandDao.list();
			rootCommands = new ArrayList<>();
			leafCommands = new ArrayList<>();
			
			for (Command c : commands) {
				
				String name = c.getName();
				if (name.startsWith("$")) {
					ResourceBundle msg = ApplicationMessages.getMessage();
					c.setName(msg.getString(name.substring(name.indexOf("#")+1)));
				}
				
				if (c.getParentId() == null) {
					rootCommands.add(c);
				}
				else {
					leafCommands.add(c);
				}
			}
		}
		
		return rootCommands;
	}


	public void setRootCommands(List<Command> rootCommands) {
		this.rootCommands = rootCommands;
	}


	public List<Command> getSelectedLeafCommands() {
		return selectedLeafCommands;
	}


	public void setSelectedLeafCommands(List<Command> selectedLeafCommands) {
		this.selectedLeafCommands = selectedLeafCommands;
	}


	public List<Command> getAvailableLeafCommands() {
		return availableLeafCommands;
	}


	public void setAvailableLeafCommands(List<Command> availableLeafCommands) {
		this.availableLeafCommands = availableLeafCommands;
	}
}
