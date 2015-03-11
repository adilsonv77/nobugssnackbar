package pt.uc.dei.nobugssnackbar.model.mission;

public class Page implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String dir;
	private String origin;
	private String type;
	private String msg;
	
	public Page() {
		
	}
	
	public Page(String msg) {
		this.msg = msg;
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