package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Function;

public interface IFunctionProvider {
	List<Function> getFunctions() throws Exception;
}
