package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
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
	
	private Command selectedChildCommand;
	private Command selectedRootCommand;
	private List<Command> rootCommands;
	
	private List<Command> selectedCommands;


	@PostConstruct
	private void init() {
		
		try {
			this.rootCommands = missionManager.getMissionContent().getCommands();
			this.selectedChildCommand = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void onRowSelectC(SelectEvent event) throws Exception {
		Command temp = ((Command)event.getObject());
		temp.setSelected(!temp.isSelected());
		
		handleChildSelect(temp);
	}
	
	public void handleRootSelect(Command item) throws Exception {
		selectedRootCommand = item;
		List<Command> childs = selectedRootCommand.getChildren();

		for (Command c : childs) {
			c.setSelected(selectedRootCommand.isSelected());
		}
		
		selectedRootCommand.setChildren(childs);
		missionManager.getMissionContent().setSelectedCommands(getSelectedCommands());
	}
	
	public void handleChildSelect(Command item) throws Exception {	
		boolean flag = false;
		
		for (Command c : item.getParent().getChildren()) {
			if (c.isSelected() == true) {
				flag = true;
				break;
			}
		}

		item.getParent().setSelected(flag);
		missionManager.getMissionContent().setSelectedCommands(getSelectedCommands());
	}
		
	public List<Command> getChilds() {
		if (selectedRootCommand != null)
			return selectedRootCommand.getChildren();
		else
			return null;
	}

	public List<Command> getRootCommands() {
		
		return rootCommands;
	}

	public List<Command> getSelectedCommands() {
		if (rootCommands != null) {
			List<Command> result = new ArrayList<>();
			//boolean flag;
			for (Command rc : rootCommands) {
				//flag = false;
				for (Command cc : rc.getChildren()) {
					if (cc.isSelected()) {
						result.add(cc);
						//flag = true;
					}
				}
				/*if (flag) {
					result.add(0, rc);
				}*/
			}
			selectedCommands = result;
		}
		else {
			selectedCommands = null;
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
	public MissionManager getMissionManager() {
		return missionManager;
	}
	
	public void setMissionManager(MissionManager missionManager) {
		this.missionManager = missionManager;
	}
	@Override
	public List<Command> getCommands() throws Exception {
		return getRootCommands();
	}
}
