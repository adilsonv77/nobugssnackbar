package pt.uc.dei.nobugssnackbar.model.mission;

import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.model.FunctionValue;


public class Condition implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	private long id = -1;
	private String comparator;
	private String logicalOperator;
	private Function function;
	private String value;
	private String conditionString;
	private FunctionValue parameter;
	
	
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
	
	public FunctionValue getParameter() {
		return parameter;
	}
	public void setParameter(FunctionValue parameter) {
		this.parameter = parameter;
	}
	
	public String getConditionString() {
	
		if (logicalOperator != null && 
			!logicalOperator.isEmpty()) {
			
			conditionString = logicalOperator;
		}
		else {
			conditionString = "Hints." + function.getName() + "(";
			if (parameter != null && parameter.isParam() != null && parameter.isParam()) {
				conditionString += ("'" + parameter.getName() + "'");
			}
			conditionString += (") " + comparator);
			
			if (function != null && function.getReturnType() != null && 
				(function.getReturnType().equalsIgnoreCase("string") ||
				function.getReturnType().equalsIgnoreCase("blocktype") ||
				function.getReturnType().equalsIgnoreCase("errorid"))) {
				if (function.getReturnType().equalsIgnoreCase("errorid")) {
					conditionString += (" 'Error." + value + "'");
				}
				else {
					conditionString += (" '" + value + "'");
				}
			}
			else {
				conditionString += (" " + value);
			}
		}
		
		return conditionString;
	}
	
	public void setConditionString(String conditionString) {
		this.conditionString = conditionString;
	}
	
}
