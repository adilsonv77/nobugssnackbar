package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;

import pt.uc.dei.nobugssnackbar.dao.CommandDao;
import pt.uc.dei.nobugssnackbar.model.Command;

@ManagedBean(name="commandsVC")
@SessionScoped
public class CommandsVC implements ICommandProvider, Serializable {
	private static final long serialVersionUID = 1L;

	private Command command;
	private List<Command> selectedCommands;
	private List<Command> commands;

	@ManagedProperty(value="#{factoryDao.commandDao}")
	private transient CommandDao commandDao;
	

	public CommandsVC() {
		this.command = new Command();
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
	public List<Command> getCommands() throws Exception {
		if (commands == null) {
			commands = commandDao.list();
		}
		
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
}
