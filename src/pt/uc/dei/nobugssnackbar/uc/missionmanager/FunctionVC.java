package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.dao.FunctionProviderDao;
import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.FunctionProviderConverter;

@ManagedBean(name="funcVC")
@SessionScoped
public class FunctionVC implements IFunctionProvider, Serializable {

	private static final long serialVersionUID = 1L;
	
	private Function func;
	private List<Function> functions;
	
	@ManagedProperty(value="#{factoryDao.functionProviderDao}")
	private transient FunctionProviderDao functionProviderDao;
	private FunctionProviderConverter fpc;
	
	
	public FunctionVC() throws Exception {
		
		func = new Function();
		this.fpc = new FunctionProviderConverter();
		this.fpc.setProvider(this);
	}
	
	public void getFunctionById(){
		int selectedConditionID = Integer.parseInt(
				FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("funcId")
		);

		func = new Function();
		
		for (int i = 0; i < functions.size(); i++) {
			if (functions.get(i).getId() == selectedConditionID) {
				func.setId(functions.get(i).getId());
				func.setName(functions.get(i).getName());
				func.setReturnType(functions.get(i).getReturnType());
				func.setDescription(functions.get(i).getDescription());
				break;
			}
		}
	}
	
	@Override
	public List<Function> getFunctions() throws Exception {
		if (functions == null)
			functions = functionProviderDao.list();

		return functions;
	}
	
	/* It is necessary for reordering of the list using orderList */
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
	
}
