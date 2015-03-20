package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;

public class Hint implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	// #region private variables
	private String category;
	private int time;
	private String text;
	private boolean type;
	private List<Condition> conditions;
	private String conditionsAsString;
	// #end
	public Hint(){
		category = "";
		time = 0;
		conditions = new ArrayList<>();
		text = "";
		type = false;
	}
	
	// #region public getters and setters
	public String getCategory() {
		return category;
	}
	public List<Condition> getConditions() {
		return conditions;
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
	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
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

	public String getConditionsAsString() {
		StringBuilder result = new StringBuilder();
		
		for (Condition c : conditions) {
			result.append(c.getConditionString());
			result.append(" ");
		}
		conditionsAsString = result.toString().trim();
		
		return conditionsAsString;
	}

	public void setConditionsAsString(String conditionsAsString) {
		this.conditionsAsString = conditionsAsString;
	}
	// #end
}