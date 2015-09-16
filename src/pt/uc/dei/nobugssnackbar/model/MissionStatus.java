package pt.uc.dei.nobugssnackbar.model;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class MissionStatus {
	
	@RemoteProperty
	private int qtdUsers;
	
	@RemoteProperty
	private String name;

	@RemoteProperty
	private int idx;

	public MissionStatus() {
	}

	public MissionStatus(int idx, String name, int qtdUsers) {
		this.idx = idx;
		this.name = name;
		this.qtdUsers = qtdUsers;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public int getQtdUsers() {
		return qtdUsers;
	}
	
	public void setQtdUsers(int qtdUsers) {
		this.qtdUsers = qtdUsers;
	}
	
	public int getIdx() {
		return idx;
	}
	
	public void setIdx(int idx) {
		this.idx = idx;
	}
}
