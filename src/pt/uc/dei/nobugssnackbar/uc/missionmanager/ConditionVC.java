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

import pt.uc.dei.nobugssnackbar.dao.FunctionProviderDao;
import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.model.mission.Condition;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.ConditionConverter;

@ManagedBean(name = "condVC")
@ViewScoped
public class ConditionVC implements IConditionProvider, Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{hintView}")
	private HintView hv;

	private Condition condition;
	private List<Condition> conditions;
	private ConditionConverter converter;

	private boolean showDlgExt;
	
	private List<String> comparators;
	private List<String> boolValues;
	private boolean boolFunction;

	@ManagedProperty(value="#{factoryDao.functionProviderDao}")
	private transient FunctionProviderDao functionProviderDao;
	
	public FunctionProviderDao getFunctionProviderDao() {
		return functionProviderDao;
	}

	public void setFunctionProviderDao(FunctionProviderDao functionProviderDao) {
		this.functionProviderDao = functionProviderDao;
	}

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
		condition = new Condition();
		//conditions = new ArrayList<>();

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

	public void newOrEditCondList() throws Exception {
		if (hv.getHint().getConditions() != null && hv.getHint().getConditions().size() > 0) {
			conditions = hv.getHint().getConditions();
			for (Condition c : conditions) {
				for (Function f : functionProviderDao.list()) {
					if (f.getName().compareToIgnoreCase(c.getFunction().getName()) == 0) {
						c.setFunction(f);
						break;
					}
				}
			}
			hv.getHint().setConditions(conditions);
			
		} else {
			conditions = new ArrayList<>();
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
		long editConditionID = Long.parseLong(FacesContext
				.getCurrentInstance().getExternalContext()
				.getRequestParameterMap().get("editConditionID"));

		Condition result = new Condition();

		for (int i = 0; i < conditions.size(); i++) {
			if (conditions.get(i).getId() == editConditionID) {
				result.setId(conditions.get(i).getId());
				result.setFunction(conditions.get(i).getFunction());
				result.setLogicalOperator(conditions.get(i)
						.getLogicalOperator());
				result.setComparator(conditions.get(i).getComparator());
				result.setValue(conditions.get(i).getValue());
				break;
			}
		}
		return result;
	}

	public void addCondition(boolean logicalOperator) {
		Condition c = new Condition();

		if (logicalOperator) { // add 'AND'
			c.setLogicalOperator("&&");
		} else { // add 'OR'
			c.setLogicalOperator("||");
		}

		c.setId(System.currentTimeMillis());
		conditions.add(c);
	}

	public void addCondition() {
		if (checkFields()) {
			int index = -1;
			for (int i = 0; i < conditions.size(); i++) {
				if (conditions.get(i).getId() == condition.getId()) {
					index = i;
					break;
				}
			}
			if (index < 0) {
				allowedFieldset = false;
				condition.setId(System.currentTimeMillis());
				condition.setLogicalOperator(null);
				conditions.add(condition);
			}
			else {
				if (conditions.get(index).getLogicalOperator() != null && 
					conditions.get(index).getLogicalOperator().length() > 0) {
					
					FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, 
							ApplicationMessages.getMessage().getString("cannotEditCond"), "");
					FacesContext.getCurrentInstance().validationFailed();
					FacesContext.getCurrentInstance().addMessage(null, msg);
				}
				else {
					conditions.set(index, condition);
				}
			}
			condition = new Condition();
			allowedFieldset = false;
		}
	}

	public boolean checkCondition() {
		boolean result = false;

		if (conditions.size() % 2 != 0) {
			for (int i = 0; i < conditions.size(); i++) {
				if (i % 2 == 0) {
					if (conditions.get(i).getLogicalOperator() == null) {
						result = true;
					} else {
						result = false;
						break;
					}
				} else {
					if (conditions.get(i).getLogicalOperator() != null) {
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
			
			if (conditions.size() > 0) {
				String logOpB = conditions.get(0).getConditionString();
				String logOpE = conditions.get(conditions.size() - 1).getConditionString();
				
				if (logOpB.equals("&&") || logOpB.equals("||") ||
					logOpE.equals("&&") || logOpE.equals("||")) {
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
			hv.getHint().setConditions(conditions);
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
		
		int index = indexOfConditionById(c.getId(), conditions);
		int indexOfEditCond = indexOfConditionById(condition.getId(), conditions);
		if (index > -1) {
			if (index != indexOfEditCond) {
				conditions.remove(index);
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
		return conditions;
	}

	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
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
