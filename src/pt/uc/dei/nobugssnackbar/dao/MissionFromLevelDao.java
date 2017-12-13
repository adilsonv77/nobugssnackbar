package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.MissionFromLevel;

public interface MissionFromLevelDao {

	void insert(MissionFromLevel missionFromlevel) throws Exception;

	void update(MissionFromLevel missionFromlevel) throws Exception;
	
	List<MissionFromLevel> list(Long clazzId) throws Exception;
	
}
