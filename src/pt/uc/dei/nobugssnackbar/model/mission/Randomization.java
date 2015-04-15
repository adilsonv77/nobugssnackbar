package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ResourceBundle;


import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;

public class Randomization implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private byte qtd;
	private String set;
	private String type;

	public Randomization() {
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		qtd = 0;
		set = messageBundle.getString("new");
		type = messageBundle.getString("hungry");
	}
	
	public void setSet(String set) {
		this.set = set;
	}
	
	public void setQtd(byte qtd) {		
		this.qtd = qtd;
	}
	
	public void setType(String msg) {
		this.type = msg;
	}
	
	public String getSet() {
		return set;
	}
	
	public byte getQtd() {
		return qtd;
	}
	
	public String getType() {
		return type;
	}
}