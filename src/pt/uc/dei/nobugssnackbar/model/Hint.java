package pt.uc.dei.nobugssnackbar.model;

public class Hint {
	
	// #region private variables
	private String category;
	private int time;
	private String condition;
	private String text;
	private boolean type;
	// #end
	public Hint(){
		category = "";
		time = 0;
		condition = "";
		text = "";
		type = false;
	}
	
	// #region public getters and setters
	public String getCategory() {
		return category;
	}
	public String getCondition() {
		return condition;
	}
	public String getText() {
		return text;
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
	public void setText(String text) {
		this.text = text;
	}
	public void setTime(int time) {
		this.time = time;
	}	

	
	public void setType(boolean type){
		this.type = type;
	}
	public boolean getType(){
		return type;
	}
	// #end
}