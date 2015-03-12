package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;

import pt.uc.dei.nobugssnackbar.dao.FunctionProviderDao;
import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.FunctionProviderConverter;

@ManagedBean(name="funcVC")
@SessionScoped
public class FunctionVC implements IFunctionProvider, Serializable {

	private static final long serialVersionUID = 1L;
	
	private Function func;
	private List<Function> funcList;
	
	@ManagedProperty(value="#{factoryDao.functionProviderDao}")
	private transient FunctionProviderDao functionProviderDao;
	
	public FunctionProviderDao getFunctionProviderDao() {
		return functionProviderDao;
	}
	
	public void setFunctionProviderDao(FunctionProviderDao functionProviderDao) {
		this.functionProviderDao = functionProviderDao;
	}
	
	private FunctionProviderConverter fpc;
	
	public FunctionVC() throws Exception {
		
		func = new Function();
		
		
		this.fpc = new FunctionProviderConverter();
		this.fpc.setProvider(this);
	}

	@Override
	public List<Function> getFunctions() throws Exception {
		if (funcList == null)
			funcList = functionProviderDao.list();
		return funcList;
	}
	
	public FunctionProviderConverter getConverter() {
		return fpc;
	}
	
	public Function getFunc() {
		return func;
	}

	public void setFunc(Function func) {
		this.func = func;
	}

}
