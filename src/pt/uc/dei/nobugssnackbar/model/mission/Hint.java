package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;
import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.model.HintCategory;

@JdbcTable(name="hints")
public class Hint implements java.io.Serializable {
	private static final long serialVersionUID = 1L;

	
	// #region private variables
	@JdbcField(name="hintsid")
	@JdbcPk
	private Integer id;
	
	@JdbcField(name="hintscategory")
	private String category;
	private HintCategory hintCategory;
	
	@JdbcField(name="hintstime")
	private int time;
	
	@JdbcField(name="hintstextexplanation")
	private String text;
	
	/*
	 * true = error hint
	 * false = tip hint
	 */
	@JdbcField(name="hintstype")
	private boolean type;
	
	private List<Condition> conditions;
	
	@JdbcField(name="hintscondition")
	private String conditionsAsString;
	// #end
	

	public Hint(){
		category = "";
		time = 0;
		conditions = new ArrayList<>();
		text = "";
		type = false;//false == tip
	}
	
	// #region public getters and setters
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getCategory() {		
		return category;
	}
	public HintCategory getObjHintCategory() {
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
		
		if(conditionsAsString == "" || conditionsAsString == null || conditionsAsString.equals("")){
			for (Condition c : conditions) {
				result.append(c.getConditionString());
				result.append(" ");
			}
			conditionsAsString = result.toString().trim();
		}
		return conditionsAsString;
	}

	public void setConditionsAsString(String conditionsAsString) {
		this.conditionsAsString = conditionsAsString;
	}
	// #end
}