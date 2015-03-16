package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.model.mission.Condition;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.ConditionConverter;

@ManagedBean(name="condVC")
@SessionScoped
public class ConditionVC implements IConditionProvider, Serializable  {

	private static final long serialVersionUID = 1L;

	private long idCounter;
	private Condition condition;
	private List<Condition> conditionList;
	private ConditionConverter converter;
	
	public ConditionVC() {
		idCounter = 0;
		condition = new Condition();
		conditionList = new ArrayList<>();
		
		converter = new ConditionConverter();
		converter.setProvider(this);
	}
	
	private int indexOfConditionById(long id, List<Condition> list) {
		int result = -1;
		
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getId() == id) {
				result = i;
				break;
			}
		}
		
		return result;
	}
	
	public void getSelectedFunction() {
		Function function = new Function();
		
		function.setId(Integer.parseInt(
				FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("funcId")));
		
		function.setName(FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("funcName"));
		
		function.setReturnType(FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("funcReturnType"));
		
		function.setDescription(FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("funcDescription"));
		
		condition.setFunction(function);
	}
	
	public void getConditionById() {
		int editConditionID = Integer.parseInt(
				FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("editConditionID")
		);

		condition = new Condition();
		
		for (int i = 0; i < conditionList.size(); i++) {
			if (conditionList.get(i).getId() == editConditionID) {
				condition.setId(conditionList.get(i).getId());
				condition.setFunction(conditionList.get(i).getFunction());
				condition.setLogicalOperator(conditionList.get(i).getLogicalOperator());
				condition.setComparator(conditionList.get(i).getComparator());
				break;
			}
		}
	}
	
	public void addCondition() {
		if (checkFields()) {
			
			condition.setId(idCounter++);
			condition.setLogicalOperator(null); // maybe this is not necessary
			conditionList.add(condition);
			
			condition = new Condition();
		}
	}
	
	public boolean checkCondition() {
		boolean result = false;
		for (Condition c : conditionList) {
			if (c.getLogicalOperator() == null) {
				result = !result;
			}
		}
		
		String text = "";
		if (!result) {
			text = (conditionList.size() > 0) ? "Wrong condition!" : "Empty condition list!";
		}
		
		FacesMessage msg = new FacesMessage("", text);
        FacesContext.getCurrentInstance().addMessage(null, msg);
        
		return result;
	}
	
	public boolean checkFields() {
		String text = "";
		
		if (condition.getFunction() != null && 
			condition.getComparator() != null && 
			!condition.getComparator().isEmpty() &&
			condition.getValue() != null && 
			!condition.getValue().isEmpty()) {
			
			switch (condition.getFunction().getReturnType()) {
			case "int":
				try {
					Integer.parseInt(condition.getValue());
					return true;
				} catch (Exception e) {
					text = "\"" + condition.getValue() + "\" is not integer!";
					break;
				}
			case "float":
				try {
					Float.parseFloat(condition.getValue());
					return true;
				} catch (Exception e) {
					text = "\"" + condition.getValue() + "\" is not float!";
					break;
				}
			case "double":
				try {
					Double.parseDouble(condition.getValue());
					return true;
				} catch (Exception e) {
					text = "\"" + condition.getValue() + "\" is not double!";
					break;
				}
			case "boolean":
					boolean r = condition.getValue().equals("true") || condition.getValue().equals("false");
					
					if (r == true) {
						if (!condition.getComparator().equals("==") && 
							!condition.getComparator().equals("!=")) {
							text = "\"" + condition.getComparator() + "\" cannot be used with boolean!";
						}							
						else {
							return true;	
						}
							
					}
					else {
						text = "\"" + condition.getValue() + "\" is not boolean!";
					}
					break;
			case "String":
					return true;
			}
		}
		else {
			text = "Please fill out all required fields!";
		}
		
		FacesMessage msg = new FacesMessage("", text);
        FacesContext.getCurrentInstance().addMessage(null, msg);
        
		return false;
	}
	
	public void addCondition(boolean logicalOperator) {
		
		if (logicalOperator) { 						// add 'AND'
			condition.setLogicalOperator("and");
		}
		else { 										// add 'OR'
			condition.setLogicalOperator("or");
		}
		
		condition.setId(idCounter++);
		conditionList.add(condition);
		
		condition = new Condition();
	}
	
	public void deleteCondition() {
		int index = indexOfConditionById(condition.getId(), conditionList);
		if (index > -1) {
			conditionList.remove(index);
			
			condition = new Condition();
		}
		else {
			FacesMessage msg = new FacesMessage("", "You did not select an item to delete!");
	        FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	@Override
	public List<Condition> getConditions() {
		return conditionList;
	}
	
	public void setConditionList(List<Condition> conditionList) {
		this.conditionList = conditionList;
	}
	
	public void setConditions(List<Condition> conditions) {
		this.conditionList = conditions;
	}

	public ConditionConverter getConverter() {
		return converter;
	}

	public Condition getCondition() {
		return condition;
	}

}
