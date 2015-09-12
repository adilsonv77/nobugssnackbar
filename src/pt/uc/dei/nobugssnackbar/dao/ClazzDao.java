package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Clazz;

public interface ClazzDao extends Dao<Clazz> {

	List<Clazz> readByTeacher(long userId) throws Exception;

}
