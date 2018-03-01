package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.ExtraLevel;
import pt.uc.dei.nobugssnackbar.model.User;

public interface ExtraLevelDao {

	List<ExtraLevel> list(Long clazzId) throws Exception;

	void insert(ExtraLevel level) throws Exception;

	void update(ExtraLevel level) throws Exception;

	void removeStudents(ExtraLevel level);

	void addStudents(ExtraLevel level, List<User> studentsAdded);

	List<Long> listUsersByLevelId(long levelId);

}
