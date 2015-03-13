package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

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
	
	public void addCondition() {
		// check fields
		System.out.println("[[[[[ " + condition.getId() + " " + condition.getValue());
		if (//!condition.getFunction().isEmpty() &&
			!condition.getComparator().isEmpty() &&
			!condition.getValue().isEmpty() &&
			condition.getLogicalOperator().isEmpty()) {
			
			condition.setId(idCounter++);
			conditionList.add(condition);
			
			condition = new Condition();
		}
		else {
			// show message
		}
	}
	
	public void addCondition(boolean logicalOperator) {
		System.out.println("]]]] ");
	}
	
	public void deleteCondition() {
		int index = indexOfConditionById(condition.getId(), conditionList);
		if (index > -1) {
			conditionList.remove(index);
			
			condition = new Condition();
		}
	}
	
	@Override
	public List<Condition> getConditions() {
		return conditionList;
	}

	public ConditionConverter getConverter() {
		return this.converter;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public Condition getConditionAdd() {
		return condition;
	}

	public void setConditionAdd(Condition conditionAdd) {
		this.condition = conditionAdd;
	}
}
