package missionmanager;

public class Hint {
	private String category;
	private int time;
	private String condition;
	private String msg;
	
	public String getCategory() {
		return category;
	}
	
	public String getCondition() {
		return condition;
	}
	
	public String getMsg() {
		return msg;
	}
	
	public int getTime() {
		return time;
	}
	
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	public void setCondition(String condition) {
		this.condition = condition;
	}
	
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public void setTime(int time) {
		this.time = time;
	}
}