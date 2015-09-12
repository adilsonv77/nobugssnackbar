package pt.uc.dei.nobugssnackbar.dao;

import pt.uc.dei.nobugssnackbar.model.User;

public interface UserDao extends Dao<User> {

	boolean hasClasses(String nick, String passw) throws Exception;

	User readByNick(String nick) throws Exception;
	
}
