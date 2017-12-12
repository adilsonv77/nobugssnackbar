package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.MissionFromLevel;

public interface MissionFromLevelDao {

	List<MissionFromLevel> list(Long clazzId) throws Exception;
	
}
