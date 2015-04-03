package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;


import pt.uc.dei.nobugssnackbar.model.HintCategory;

public class Hint implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	// #region private variables
	private String category;
	private HintCategory hintCategory;
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
		if(hintCategory != null){
			category = hintCategory.getTitle();
		}
		else{
			category = "";
		}
		return category;
	}
	public HintCategory getObjHintCategory() {
		if(hintCategory == null){
			//hintCategory = new HintCategory(1, "Choose Category", "blabla", "<xml return='ChooseCategory(#{mm.missionContent.commands.indexOf(\"?{command}\")})'><row><item type=\"text\">According the commands available in this mission, select the category which is showed the hint</item></row><row><item type=\"list\" name=\"command\">#{mm.missionContent.commands}</item></row></xml>");
		}
		return hintCategory;
	}
	public void setObjHintCategory(HintCategory hintCategory) {
		this.hintCategory = hintCategory;
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