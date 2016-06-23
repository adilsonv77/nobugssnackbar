package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;

public interface ClazzDao extends Dao<Clazz> {

	List<Clazz> readByTeacher(long userId) throws Exception;

	Clazz findActiveClazz(User user) throws Exception;

	void mapsToUser(Clazz clazz, User user) throws Exception;

	void deleteFromUser(User user) throws Exception;
	
}
