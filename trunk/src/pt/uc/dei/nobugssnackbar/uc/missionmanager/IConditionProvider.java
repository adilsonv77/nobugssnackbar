package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.mission.Condition;

public interface IConditionProvider {
	List<Condition> getConditions();
}
