package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Mission;

public interface IMissionProvider {
	List<Mission> getMissionList() throws Exception;
}
