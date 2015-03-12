package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import pt.uc.dei.nobugssnackbar.dao.jdbc.FunctionProviderJdbcDao;
import pt.uc.dei.nobugssnackbar.model.mission.Function;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.FunctionProviderConverter;

@ManagedBean(name="funcVC")
@SessionScoped
public class FunctionVC implements IFunctionProvider, Serializable {

	private static final long serialVersionUID = 1L;
	
	private Function func;
	private List<Function> funcList;
	private FunctionProviderJdbcDao functionProviderJdbcDao;
	private FunctionProviderConverter fpc;
	
	public FunctionVC() throws Exception {
		
		func = new Function();
		functionProviderJdbcDao = new FunctionProviderJdbcDao();
		funcList = functionProviderJdbcDao.list();
		
		this.fpc = new FunctionProviderConverter();
		this.fpc.setProvider(this);
	}

	@Override
	public List<Function> getFunctions() {
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
