package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Level;

public interface LevelDao {

	List<Level> list(Integer clazzId) throws Exception;

	void save(long clazzId, Level l) throws Exception;

}
