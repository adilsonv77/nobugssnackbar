package pt.uc.dei.nobugssnackbar.model;

public class Randomization {
	private byte qtd;
	private String set;
	private String msg;

	public void setSet(String set) {
		this.set = set;
	}
	
	public void setQtd(byte qtd) {
		this.qtd = qtd;
	}
	
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public String getSet() {
		return set;
	}
	
	public byte getQtd() {
		return qtd;
	}
	
	public String getMsg() {
		return msg;
	}
}