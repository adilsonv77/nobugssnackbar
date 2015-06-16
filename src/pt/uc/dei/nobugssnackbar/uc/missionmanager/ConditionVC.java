package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.context.RequestContext;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Condition;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.ConditionConverter;

@ManagedBean(name = "condVC")
@ViewScoped
public class ConditionVC implements IConditionProvider, Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{hintView}")
	private HintView hv;

	private long idCounter;
	private Condition condition;
	private List<Condition> conditionList;
	private ConditionConverter converter;

	private boolean showDlgExt;
	
	private List<String> comparators;
	private List<String> boolValues;
	private boolean boolFunction;

	public void showFuncProv() {
		this.showDlgExt = true;
	}
	
	public void hideFuncProv() {
		this.showDlgExt = false;
	}
	
	public boolean isShowDlgExt() {
		return showDlgExt;
	}
	
	private boolean allowedFieldset;

	public ConditionVC() {
		idCounter = 1;
		condition = new Condition();
		conditionList = new ArrayList<>();

		converter = new ConditionConverter();
		converter.setProvider(this);

		hv = new HintView();
		
		comparators = new ArrayList<>();
		comparators.add("==");
		comparators.add("!=");
		comparators.add(">");
		comparators.add("<");
		comparators.add(">=");
		comparators.add("<=");
		
		boolValues = new ArrayList<String>();
		boolValues.add("true");
		boolValues.add("false");
	}

	public void newOrEditCondList() {
		if (hv.getHint().getConditions() != null && hv.getHint().getConditions().size() > 0) {
			conditionList = hv.getHint().getConditions();
		} else {
			conditionList = new ArrayList<>();
		}
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
	public void editCondition() {
		condition = getConditionById();

		if (condition.getLogicalOperator() != null &&
			condition.getLogicalOperator().length() > 0) {
			
			allowedFieldset = false;
			condition = new Condition();
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, 
					ApplicationMessages.getMessage().getString("cannotEditCond"), "");
			FacesContext.getCurrentInstance().validationFailed();
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
		else {
			allowedFieldset = true;
		}
	}

	public Condition getConditionById() {
		int editConditionID = Integer.parseInt(FacesContext
				.getCurrentInstance().getExternalContext()
				.getRequestParameterMap().get("editConditionID"));

		Condition result = new Condition();

		for (int i = 0; i < conditionList.size(); i++) {
			if (conditionList.get(i).getId() == editConditionID) {
				result.setId(conditionList.get(i).getId());
				result.setFunction(conditionList.get(i).getFunction());
				result.setLogicalOperator(conditionList.get(i)
						.getLogicalOperator());
				result.setComparator(conditionList.get(i).getComparator());
				result.setValue(conditionList.get(i).getValue());
				break;
			}
		}
		return result;
	}

	public void addCondition(boolean logicalOperator) {
		Condition c = new Condition();

		if (logicalOperator) { // add 'AND'
			c.setLogicalOperator("and");
		} else { // add 'OR'
			c.setLogicalOperator("or");
		}

		c.setId(idCounter++);
		conditionList.add(c);
	}

	public void addCondition() {
		if (checkFields()) {
			int index = -1;
			for (int i = 0; i < conditionList.size(); i++) {
				if (conditionList.get(i).getId() == condition.getId()) {
					index = i;
					break;
				}
			}
			if (index < 0) {
				allowedFieldset = false;
				condition.setId(idCounter++);
				condition.setLogicalOperator(null);
				conditionList.add(condition);
			}
			else {
				if (conditionList.get(index).getLogicalOperator() != null && 
					conditionList.get(index).getLogicalOperator().length() > 0) {
					
					FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, 
							ApplicationMessages.getMessage().getString("cannotEditCond"), "");
					FacesContext.getCurrentInstance().validationFailed();
					FacesContext.getCurrentInstance().addMessage(null, msg);
				}
				else {
					conditionList.set(index, condition);
				}
			}
			condition = new Condition();
			allowedFieldset = false;
		}
	}

	public boolean checkCondition() {
		boolean result = false;

		if (conditionList.size() % 2 != 0) {
			for (int i = 0; i < conditionList.size(); i++) {
				if (i % 2 == 0) {
					if (conditionList.get(i).getLogicalOperator() == null) {
						result = true;
					} else {
						result = false;
						break;
					}
				} else {
					if (conditionList.get(i).getLogicalOperator() != null) {
						result = true;
					} else {
						result = false;
						break;
					}
				}
			}
		}

		if (!result) {
			
			ResourceBundle messageBundle = ApplicationMessages.getMessage();
			String additionalMsg, text;
			
			if (conditionList.size() > 0) {
				String logOpB = conditionList.get(0).getConditionString();
				String logOpE = conditionList.get(conditionList.size() - 1).getConditionString();
				
				if (logOpB.equals("and") || logOpB.equals("or") ||
					logOpE.equals("and") || logOpE.equals("or")) {
					text = messageBundle.getString("wrongCondition");
					additionalMsg = messageBundle.getString("cannotStartEndWithAndOr");
				}
				else {
					text = messageBundle.getString("wrongCondition");
					additionalMsg = messageBundle.getString("noANDORbtwnCond");
				}
			}
			else {
				text = messageBundle.getString("emptyConditionList");
				additionalMsg = "";
			}
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, text, additionalMsg);
			FacesContext.getCurrentInstance().validationFailed();
			FacesContext.getCurrentInstance().addMessage(null, msg);
		} else {
			hv.getHint().setConditions(conditionList);
			RequestContext.getCurrentInstance().execute(
					"PF('condBuilderDlg').hide()");
			allowedFieldset = false;
			condition = new Condition();
		}

		return result;
	}

	public boolean checkFields() {
		String text = "";

		if (condition.getFunction() != null
				&& condition.getComparator() != null
				&& !condition.getComparator().isEmpty()
				&& condition.getValue() != null
				&& !condition.getValue().isEmpty()) {

			switch (condition.getFunction().getReturnType()) {
			case "int":
				try {
					Integer.parseInt(condition.getValue());
					return true;
				} catch (Exception e) {
					text = "\"" + condition.getValue() + "\" " + ApplicationMessages.getMessage().getString("notInteger");
					break;
				}
			case "float":
				try {
					Float.parseFloat(condition.getValue());
					return true;
				} catch (Exception e) {
					text = "\"" + condition.getValue() + "\" " + ApplicationMessages.getMessage().getString("notFloat");
					break;
				}
			case "double":
				try {
					Double.parseDouble(condition.getValue());
					return true;
				} catch (Exception e) {
					text = "\"" + condition.getValue() + "\" " + ApplicationMessages.getMessage().getString("notDouble");
					break;
				}
			case "boolean":

				condition.setValue(condition.getValue().toLowerCase());

				boolean r = condition.getValue().equals("true")
						|| condition.getValue().equals("false");

				if (r == true) {
					if (!condition.getComparator().equals("==")
							&& !condition.getComparator().equals("!=")) {
						text = "\"" + condition.getComparator()
								+ "\" " + ApplicationMessages.getMessage().getString("cannotUsedWithBool");
					} else {
						return true;
					}

				} else {
					text = "\"" + condition.getValue() + "\" " + ApplicationMessages.getMessage().getString("notBoolean");
				}
				break;
			case "String":
				return true;
			}
		} else {
			text = ApplicationMessages.getMessage().getString("notFilledAllFields");
		}

		FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "", text);
		FacesContext.getCurrentInstance().validationFailed();
		FacesContext.getCurrentInstance().addMessage(null, msg);

		return false;
	}

	public void deleteCondition() {
		Condition c = getConditionById();
		
		int index = indexOfConditionById(c.getId(), conditionList);
		int indexOfEditCond = indexOfConditionById(condition.getId(), conditionList);
		if (index > -1) {
			if (index != indexOfEditCond) {
				conditionList.remove(index);
			}
			else {
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, 
						"", ApplicationMessages.getMessage().getString("cannotBeDeleted"));
				FacesContext.getCurrentInstance().validationFailed();
				FacesContext.getCurrentInstance().addMessage(null, msg);
			}
		} else {
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_WARN, 
					"", ApplicationMessages.getMessage().getString("notSelectedItemToDelete"));
			FacesContext.getCurrentInstance().validationFailed();
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

	public HintView getHv() {
		return hv;
	}

	public void setHv(HintView hv) {
		this.hv = hv;
	}

	public boolean isAllowedFieldset() {
		return allowedFieldset;
	}

	public void setAllowedFieldset(boolean allowedFieldset) {
		condition = new Condition();
		this.allowedFieldset = allowedFieldset;
	}

	public List<String> getComparators() {
		if (boolFunction == true) {
			return comparators.subList(0, 2);
		}
		return comparators;
	}

	public void setComparators(List<String> comparators) {
		this.comparators = comparators;
	}

	public boolean isBoolFunction() {
		return boolFunction;
	}

	public void setBoolFunction(boolean boolFunction) {
		this.boolFunction = boolFunction;
	}

	public List<String> getBoolValues(String q) {
		List<String> filtered = new ArrayList<>();
		for (int i = 0; i < boolValues.size(); i++) {
			if (boolValues.get(i).toLowerCase().startsWith(q.toLowerCase())) {
				filtered.add(boolValues.get(i));
			}
		}
		
		return filtered;
	}

	public void setBoolValues(List<String> boolValues) {
		this.boolValues = boolValues;
	}
}
