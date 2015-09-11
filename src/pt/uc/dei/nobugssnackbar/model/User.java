package pt.uc.dei.nobugssnackbar.model;

import java.sql.Time;
import java.util.HashMap;
import java.util.Map;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class User {

	@RemoteProperty
	private long id;
	
	private String nick;
	private String passw;
	private long money;

	private long classId;

	@RemoteProperty
	private String sex;

	@RemoteProperty
	private String name;

	@RemoteProperty
	private Time lastTime;

	@RemoteProperty
	private boolean showHint;
	
	@RemoteProperty
	private boolean showInstruction;

	private boolean enabled;

	private long xp;
	
	@RemoteProperty
	private Map<String, String> flags;

	public Map<String, String> getFlags() {
		if (flags == null)
			flags = new HashMap<String, String>();
		return flags;
	}
	
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

	public long getXp() {
		return xp;
	}
	
	public void setXp(long xp) {
		this.xp = xp;
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

	public boolean isShowHint() {
		return showHint;
	}

	public void setShowHint(boolean showHint) {
		this.showHint = showHint;
	}

	public Long getClassId() {
		return classId;
	}

	public void setClassId(long classId) {
		this.classId = classId;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
		
	}
	public boolean isEnabled() {
		return enabled;
	}

	public boolean isShowInstruction() {
		return showInstruction;
	}
	
	public void setShowInstruction(boolean showInstruction) {
		this.showInstruction = showInstruction;
	}
	
}
