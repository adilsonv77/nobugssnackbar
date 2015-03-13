package pt.uc.dei.nobugssnackbar.model.mission;


public class Condition implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	private long id;
	private String comparator;
	private String logicalOperator;
	private String functionName; // maybe it should be Function
	private String value;
	
	@Override
	public String toString() {
		
		if (!logicalOperator.isEmpty()) {
			return logicalOperator;
		}

		StringBuilder result = new StringBuilder();
		result.append(functionName);
		result.append("()");
		result.append(" ");
		result.append(comparator);
		result.append(" ");
		result.append(value);
		
		return result.toString();
	}
	
	public String getFunction() {
		return functionName;
	}
	public void setFunction(String functionName) {
		this.functionName = functionName;
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
	
}
