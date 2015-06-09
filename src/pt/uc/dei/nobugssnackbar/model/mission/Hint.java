package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;
import pt.uc.dei.nobugssnackbar.model.HintCategory;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="hint")
@JdbcTable(name="hints")
public class Hint implements java.io.Serializable {
	private static final long serialVersionUID = 1L;

	@JdbcField(name="hintsid")
	@JdbcPk
	private Integer id;
		
	@JdbcField(name="hintscategory")	
	private String category;
	
	private HintCategory hintCategory;
	@JdbcField(name="hintstime")
	private Integer time;	
	//private String strTime;
	
	@XmlValue
	@JdbcField(name="hintstextexplanation")
	private String text;
	
	/*
	 * true = error hint
	 * false = tip hint
	 */
	@JdbcField(name="hintstype")
	private boolean type;
	
	private List<Condition> conditions;
	
	@XmlAttribute(name="condition")
	@JdbcField(name="hintscondition")
	private String conditionsAsString;
	// #end
	

	public Hint(){
		category = "";
		time = null;
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
	public Integer getTime() {
		return time;
	}
	
	@XmlAttribute(name="category")
	public void setCategory(String category) {
		this.category = category;
	}
	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
	}
	public void setText(String text) {
		this.text = text;
	}
	@XmlAttribute(name="time")
	public void setTime(Integer time) {
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

	/*public String getStrTime() {
		if(time > -1)
			strTime = String.valueOf(time);
		else
			strTime = "";
		return strTime;
	}*/

	/*@XmlAttribute(name="time")
	public void setStrTime(String strTime) {
		
		try{			
			time = Integer.parseInt(strTime);
		}
		catch(NumberFormatException e){	
			e.printStackTrace();;
			return;
		}
	}*/
}
