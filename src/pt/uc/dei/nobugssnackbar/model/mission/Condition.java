package pt.uc.dei.nobugssnackbar.model.mission;

import pt.uc.dei.nobugssnackbar.model.Function;


public class Condition implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	private long id;
	private String comparator;
	private String logicalOperator;
	private Function function;
	private String value;
	private String conditionString;
	
	
	public Function getFunction() {
		return function;
	}
	public void setFunction(Function function) {
		this.function = function;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getComparator() {
		return comparator;
	}
	public void setComparator(String comparator) {
		this.comparator = comparator;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLogicalOperator() {
		return logicalOperator;
	}
	public void setLogicalOperator(String logicalOperator) {
		this.logicalOperator = logicalOperator;
	}
	
	public String getConditionString() {
	
		if (logicalOperator != null && 
			!logicalOperator.isEmpty()) {
			
			conditionString = logicalOperator;
		}
		else {
			conditionString = function.getName() + "() " + comparator + " " + value;
		}
		
		return conditionString;
	}
	
}
