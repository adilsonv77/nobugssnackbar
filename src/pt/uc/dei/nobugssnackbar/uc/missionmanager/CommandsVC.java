package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;

import org.primefaces.event.SelectEvent;

import pt.uc.dei.nobugssnackbar.dao.CommandDao;
import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Command;

@ManagedBean(name="commandsVC")
@SessionScoped
public class CommandsVC implements ICommandProvider, Serializable {
	private static final long serialVersionUID = 1L;

	private Command selectedChildCommand;
	private Command selectedRootCommand;
	private List<Command> commands;
	private List<Command> rootCommands;
	private List<Command> childs;
	private List<Command> selectedCommands; //does not include root commands

	@ManagedProperty(value="#{factoryDao.commandDao}")
	private transient CommandDao commandDao;
	

	public CommandsVC() {
		this.selectedChildCommand = new Command();
	}
		
	public void onRowSelectR(SelectEvent event) {
		getChilds();
	}
	
	public void onRowSelectC(SelectEvent event) {
		Command temp = ((Command)event.getObject());
		temp.setSelected(!temp.isSelected());
		
		boolean flag = false;
		
		for (Command c : commands) {
			if (c.getParentId() == selectedRootCommand.getId() &&
				c.isSelected() == true) {
				flag = true;
				break;
			}
		}
		checkRootCommand(flag);
	}
	
	private void checkRootCommand(boolean value) {
		for (Command c : commands) {
			if (c.getId() == selectedRootCommand.getId()) {
				c.setSelected(value);
				break;
			}
		}
	}
		
	public CommandDao getCommandDao() {
		return commandDao;
	}

	public void setCommandDao(CommandDao commandDao) {
		this.commandDao = commandDao;
	}

	@Override
	public List<Command> getCommands() throws Exception {
		if (commands == null) {
			commands = commandDao.list();
			rootCommands = new ArrayList<>();
			
			for (Command c : commands) {
				String name = c.getName();
				
				if (name.startsWith("#")) {
					ResourceBundle msg = ApplicationMessages.getMessage();
					c.setName(msg.getString(name.substring(name.indexOf("#")+1)));
				}
				
				if (c.getParentId() == null) {
					rootCommands.add(c);
				}
			}
		}
		
		return commands;
	}
	
	public void setCommands(List<Command> commands) {
		this.commands = commands;
	}

	public List<Command> getChilds() {
		if (selectedRootCommand != null) {
			List<Command> result = new ArrayList<>();
			
			for (Command c : commands) {				
				if (c.getParentId() == selectedRootCommand.getId()) {
					result.add(c);
				}
			}
			childs = result;
		}
		
		return childs;
	}

	public void setChilds(List<Command> childs) {
		this.childs = childs;
	}

	public List<Command> getRootCommands() throws Exception {
		List<Command> result = new ArrayList<>();
		getCommands();
		for (Command c : commands) {				
			if (c.getParentId() == null) {
				result.add(c);
			}
		}
		rootCommands = result;
		
		return rootCommands;
	}

	public void setRootCommands(List<Command> rootCommands) {
		this.rootCommands = rootCommands;
	}

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
}
