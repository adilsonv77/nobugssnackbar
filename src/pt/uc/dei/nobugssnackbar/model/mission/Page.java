package pt.uc.dei.nobugssnackbar.model.mission;

public class Page implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String msg;
	
	public Page() {
		
	}
	
	public Page(String msg) {
		this.msg = msg;
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMsg() {
		return msg;
	}
	
	public void setMsg(String msg) {
		this.msg = msg;
	}
}