package pt.uc.dei.nobugssnackbar.uc.missionmanager;

public class Page {
	private int id;
	private String dir;
	private String origin;
	private String type;
	private String msg;
	
	Page() {
		id = 0;
		dir = "";
		origin = "";
		type = "";
		msg = "";
	}
	
	public int getId() {
		return id;
	}
	
	public String getDir() {
		return dir;
	}
	
	public String getOrigin() {
		return origin;
	}
	
	public String getType() {
		return type;
	}
	
	public String getMsg() {
		return msg;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public void setDir(String dir) {
		this.dir = dir;
	}
	
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public void setMsg(String msg) {
		this.msg = msg;
	}
}