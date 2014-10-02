package pt.uc.dei.nobugssnackbar.model;

import java.sql.Time;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class User {

	private long id;
	private String nick;
	private String passw;
	private long money;
	
	@RemoteProperty
	private String sex;
	
	@RemoteProperty
	private String name;
	
	private Time lastTime;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getPassw() {
		return passw;
	}

	public void setPassw(String passw) {
		this.passw = passw;
	}

	public long getMoney() {
		return money;
	}

	public void setMoney(long money) {
		this.money = money;
	}

	@Override
	public String toString() {
		return nick;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Time getLastTime() {
		return lastTime;
	}

	public void setLastTime(Time lastTime) {
		this.lastTime = lastTime;
	}
	
	

}
