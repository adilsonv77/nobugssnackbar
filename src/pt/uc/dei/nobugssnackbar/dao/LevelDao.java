package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Level;

public interface LevelDao {

	List<Level> list(Long clazzId) throws Exception;

	void insert(Level level) throws Exception;

	void update(Level level) throws Exception;

}
