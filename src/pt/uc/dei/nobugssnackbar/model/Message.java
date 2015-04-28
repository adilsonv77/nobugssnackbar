package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;

@JdbcTable(name="messagesi18n")
public class Message implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@JdbcField(name="messagecode")
	@JdbcPk
	private String messageCode;

	@JdbcField(name="languageid")
	@JdbcPk
	private Integer languageId;
	
	@JdbcField(name="messagetext")
	private String messageText;

	public String getMessageCode() {
		return messageCode;
	}

	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}

	public Integer getLanguageId() {
		return languageId;
	}

	public void setLanguageId(Integer languageId) {
		this.languageId = languageId;
	}

	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}
	
	
	
}
