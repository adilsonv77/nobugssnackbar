package pt.uc.dei.nobugssnackbar.model;

import java.util.ArrayList;
import java.util.List;

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

	@RemoteProperty
	private int level;

	@RemoteProperty
	private int id;

	@RemoteProperty
	private List<Long> users = new ArrayList<>();

	public MissionStatus() {
	}

	public MissionStatus(int id, int idx, String name, int qtdUsers, int level) {
		this.id = id;
		this.idx = idx;
		this.name = name;
		this.qtdUsers = qtdUsers;
		this.level = level;
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
	
	public int getIdx() {
		return idx;
	}
	
	public void setIdx(int idx) {
		this.idx = idx;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public List<Long> getUsers() {
		return users;
	}

	public void addUser(Long user) {
		users.add(user);
		qtdUsers++;
	}

}
