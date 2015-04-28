package pt.uc.dei.nobugssnackbar.dao;

import pt.uc.dei.nobugssnackbar.model.Message;

public interface MessageDao extends Dao<Message> {

	Message readMessage(String code, Integer languageId) throws Exception;

}
