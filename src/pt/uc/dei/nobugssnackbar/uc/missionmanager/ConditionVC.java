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
import pt.uc.dei.nobugssnackbar.dao.FunctionProviderValueDao;
import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.model.FunctionValue;
import pt.uc.dei.nobugssnackbar.model.mission.Condition;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.ConditionConverter;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.FunctionProviderValueConverter;

@ManagedBean(name = "condVC")
@ViewScoped
public class ConditionVC implements IConditionProvider, IFunctionProviderValue, Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{hintView}")
	private HintView hv;

	private static int conditionID;
	private Condition condition;
	private List<Condition> conditions;
	private ConditionConverter converter;
	private FunctionProviderValueConverter functionProviderValueConverter;
	
	private boolean showDlgExt;
	
	private List<String> comparators;
	private List<String> boolValues;
	private boolean boolOrObjFunction;
	private List<FunctionValue> allFunctionValues;
	private List<FunctionValue> functionParams;
	private List<FunctionValue> functionValues;

	@ManagedProperty(value="#{factoryDao.functionProviderValueDao}")
	private transient FunctionProviderValueDao functionProviderValueDao;
	
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

		functionProviderValueConverter = new FunctionProviderValueConverter();
		functionProviderValueConverter.setProvider(this);
		
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
		allFunctionValues = functionProviderValueDao.list(); /// NEW
		
		if (hv.getHint().getConditions() != null && hv.getHint().getConditions().size() > 0) {
			conditions = hv.getHint().getConditions();
			List<Function> functionsDB = functionProviderDao.list();
			
			for (Condition c : conditions) {
				if (c.getId() < 0) {
					c.setConditionString(null);
					c.setId(conditionID++);
					for (Function f : functionsDB) {
						if (c.getFunction() == null) {
							break;
						}
						if (f.getName().compareToIgnoreCase(c.getFunction().getName()) == 0) {
							c.setFunction(f);
							break;
						}
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
			List<FunctionValue> funcValues = new ArrayList<>();
			List<FunctionValue> funcParams = new ArrayList<>();
			
			for (FunctionValue fv : getAllFunctionValues()) {
				if (fv.getFuncProvId() == condition.getFunction().getId()) {
					if (fv.isParam()) {
						funcParams.add(fv);
					}
					else {
						funcValues.add(fv);
					}
				}
			}
			if (funcParams.size() > 0) {
				setFunctionParams(funcParams);
			}
			else {
				setFunctionParams(null);
			}
			if (funcValues.size() > 0) {
				setFunctionValues(funcValues);
			}
			else {
				setFunctionValues(null);
			}
			boolean val = (condition.getFunction().getReturnType().toLowerCase().compareTo("boolean") == 0 || 
					funcValues.size() > 0 || 
					funcParams.size() > 0);
			setBoolOrObjFunction(val);
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
				result.setParameter(conditions.get(i).getParameter());
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

		c.setId(conditionID++);
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
				condition.setId(conditionID++);
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
			functionParams = null;
			functionValues = null;
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
				&& !condition.getValue().isEmpty()
				&& ((functionParams != null && condition.getParameter() != null) || (functionParams == null))) {

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
			case "BlockType":
			case "ErrorId":
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
		functionParams = null;
		functionValues = null;
	}

	public List<String> getComparators() {
		if (boolOrObjFunction == true) {
			return comparators.subList(0, 2);
		}
		return comparators;
	}

	public void setComparators(List<String> comparators) {
		this.comparators = comparators;
	}

	public boolean isBoolOrObjFunction() {
		return boolOrObjFunction;
	}

	public void setBoolOrObjFunction(boolean boolOrObjFunction) {
		this.boolOrObjFunction = boolOrObjFunction;
	}

	public List<String> getOriginalValues(String q) {
		List<String> filtered = new ArrayList<>();
		
		if (functionValues != null) {
			for (int i = 0; i < functionValues.size(); i++) {
				if (functionValues.get(i).getName().toLowerCase().startsWith(q.toLowerCase())) {
					filtered.add(functionValues.get(i).getName());
				}
			}
		}
		else {
			for (int i = 0; i < boolValues.size(); i++) {
				if (boolValues.get(i).toLowerCase().startsWith(q.toLowerCase())) {
					filtered.add(boolValues.get(i));
				}
			}
		}
		
		return filtered;
	}

	public void setBoolValues(List<String> boolValues) {
		this.boolValues = boolValues;
	}
	
	public List<FunctionValue> getAllFunctionValues() {
		return allFunctionValues;
	}

	public void setAllFunctionValues(List<FunctionValue> allFunctionValues) {
		this.allFunctionValues = allFunctionValues;
	}

	public FunctionProviderValueDao getFunctionProviderValueDao() {
		return functionProviderValueDao;
	}

	public void setFunctionProviderValueDao(
			FunctionProviderValueDao functionProviderValueDao) {
		this.functionProviderValueDao = functionProviderValueDao;
	}

	public List<FunctionValue> getFunctionParams() {
		return functionParams;
	}

	public void setFunctionParams(List<FunctionValue> functionParams) {
		this.functionParams = functionParams;
	}

	public FunctionProviderValueConverter getFunctionProviderValueConverter() {
		return functionProviderValueConverter;
	}

	public void setFunctionProviderValueConverter(
			FunctionProviderValueConverter functionProviderValueConverter) {
		this.functionProviderValueConverter = functionProviderValueConverter;
	}

	public List<FunctionValue> getFunctionValues() {
		return functionValues;
	}

	public void setFunctionValues(List<FunctionValue> functionValues) {
		this.functionValues = functionValues;
	}
	
}
