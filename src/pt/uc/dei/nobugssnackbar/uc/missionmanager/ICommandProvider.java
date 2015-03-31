package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Command;


public interface ICommandProvider {
	List<Command> getCommands() throws Exception;
}
