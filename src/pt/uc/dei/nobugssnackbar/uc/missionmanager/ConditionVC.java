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

	public void showFuncProv() {
		this.showDlgExt = true;
	}
	
	public void hideFuncProv() {
		this.showDlgExt = false;
	}
	
	public boolean isShowDlgExt() {
		return showDlgExt;
	}
	
	private boolean expandedFieldset;

	public ConditionVC() {
		idCounter = 0;
		condition = new Condition();
		conditionList = new ArrayList<>();

		converter = new ConditionConverter();
		converter.setProvider(this);

		hv = new HintView();
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

	public void getConditionById() {
		int editConditionID = Integer.parseInt(FacesContext
				.getCurrentInstance().getExternalContext()
				.getRequestParameterMap().get("editConditionID"));

		condition = new Condition();

		for (int i = 0; i < conditionList.size(); i++) {
			if (conditionList.get(i).getId() == editConditionID) {
				condition.setId(conditionList.get(i).getId());
				condition.setFunction(conditionList.get(i).getFunction());
				condition.setLogicalOperator(conditionList.get(i)
						.getLogicalOperator());
				condition.setComparator(conditionList.get(i).getComparator());
				break;
			}
		}
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

			condition.setId(idCounter++);
			condition.setLogicalOperator(null);
			conditionList.add(condition);

			condition = new Condition();
			expandedFieldset = false;
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
			String text = (conditionList.size() > 0) ? messageBundle.getString("wrongCondition")
					: messageBundle.getString("emptyConditionList");

			FacesMessage msg = new FacesMessage("", text);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		} else {
			hv.getHint().setConditions(conditionList);
			RequestContext.getCurrentInstance().execute(
					"PF('condBuilderDlg').hide()");
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

		FacesMessage msg = new FacesMessage("", text);
		FacesContext.getCurrentInstance().addMessage(null, msg);

		return false;
	}

	public void deleteCondition() {
		int index = indexOfConditionById(condition.getId(), conditionList);
		if (index > -1) {
			conditionList.remove(index);

			condition = new Condition();
		} else {
			FacesMessage msg = new FacesMessage("", ApplicationMessages.getMessage().getString("notSelectedItemToDelete"));
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

	public boolean isExpandedFieldset() {
		return expandedFieldset;
	}

	public void setExpandedFieldset(boolean expandedFieldset) {
		this.expandedFieldset = expandedFieldset;
	}
}
