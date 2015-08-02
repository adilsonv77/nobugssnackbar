package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.FunctionValue;

public interface IFunctionProviderValue {
	List<FunctionValue> getAllFunctionValues() throws Exception;
}
