package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Mission;

public interface MissionDao extends Dao<Mission> {
	
	void deleteMission(Integer key) throws Exception;

}
