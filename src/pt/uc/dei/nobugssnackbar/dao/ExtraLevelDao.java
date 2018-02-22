package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.ExtraLevel;

public interface ExtraLevelDao {

	List<ExtraLevel> list(Long clazzId) throws Exception;

	void insert(ExtraLevel level) throws Exception;

	void update(ExtraLevel level) throws Exception;

}
