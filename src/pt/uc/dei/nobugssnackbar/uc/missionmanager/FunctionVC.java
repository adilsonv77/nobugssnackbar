package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.dao.FunctionProviderDao;
import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.FunctionProviderConverter;

@ManagedBean(name="funcVC")
@ViewScoped
public class FunctionVC implements IFunctionProvider, Serializable {

	private static final long serialVersionUID = 1L;
	
	private Function func;
	private List<Function> functions;
	private List<Function> functionsList; // constant
	
	@ManagedProperty(value="#{condVC}")
	private ConditionVC cvc;
	
	@ManagedProperty(value="#{factoryDao.functionProviderDao}")
	private transient FunctionProviderDao functionProviderDao;
	private FunctionProviderConverter fpc;
	
	private String filterNameStr;
	
	public FunctionVC() throws Exception {
		
		func = new Function();
		this.fpc = new FunctionProviderConverter();
		this.fpc.setProvider(this);
		cvc = new ConditionVC();
	}
	
	public void handleKeyUpEvent() throws Exception {		
		if (filterNameStr != null && !filterNameStr.isEmpty()) {

			List<Function> l = new ArrayList<>();
			
			for (Function f : functionsList) {
				boolean result = f.getName().toLowerCase().contains(filterNameStr.toLowerCase());
				if (result) {
					l.add(f);
				}
			}
			functions = l;
		}
		else {
			functions = functionsList;
		}
	}
	
	public void getFunctionById() throws Exception{
		int selectedFunctionID = Integer.parseInt(
				FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("funcId")
		);

		func = new Function();
		
		for (int i = 0; i < functions.size(); i++) {
			if (functions.get(i).getId() == selectedFunctionID) {
				func.setId(functions.get(i).getId());
				func.setName(functions.get(i).getName());
				func.setReturnType(functions.get(i).getReturnType());
				func.setDescription(functions.get(i).getDescription());
				break;
			}
		}
		
		cvc.getCondition().setFunction(func);
		filterNameStr = "";
		boolean val = func.getReturnType().toLowerCase().compareTo("boolean") == 0;
		cvc.setBoolFunction(val);
		cvc.hideFuncProv();
		handleKeyUpEvent();
	}
	
	@Override
	public List<Function> getFunctions() throws Exception {
		if (functions == null) {
			functionsList = functionProviderDao.list();
			functions = functionsList;
		}

		return functions;
	}
	
	public void setFunctions(List<Function> functions) {
		this.functions = functions;
	}
	
	public FunctionProviderDao getFunctionProviderDao() {
		return functionProviderDao;
	}
	
	public void setFunctionProviderDao(FunctionProviderDao functionProviderDao) {
		this.functionProviderDao = functionProviderDao;
	}
	
	public FunctionProviderConverter getConverter() {
		return this.fpc;
	}
	
	public Function getFunc() {
		return this.func;
	}

	public void setFunc(Function func) {
		this.func = func;
	}
	public ConditionVC getCvc() {
		return cvc;
	}

	public void setCvc(ConditionVC cvc) {
		this.cvc = cvc;
	}

	public String getFilterNameStr() {
		return filterNameStr;
	}

	public void setFilterNameStr(String filterNameStr) {
		this.filterNameStr = filterNameStr;
	}
}
