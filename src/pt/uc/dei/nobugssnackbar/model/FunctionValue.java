package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;

@JdbcTable(name="functionsprovidervalues")
public class FunctionValue implements Serializable {
	private static final long serialVersionUID = 1L;

	@JdbcField(name="functionprovidervalueid")
	@JdbcPk
	private Integer id;
	@JdbcField(name="functionprovidervaluename")
	private String name;
	@JdbcField(name="functionprovidervaluetype")
	private String type;
	@JdbcField(name="functionprovidervalueisparam")
	private Boolean param;
	@JdbcField(name="functionproviderid")
	private Integer funcProvId;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Boolean isParam() {
		return param;
	}

	public void setParam(Boolean param) {
		this.param = param;
	}

	public Integer getFuncProvId() {
		return funcProvId;
	}

	public void setFuncProvId(Integer funcProvId) {
		this.funcProvId = funcProvId;
	}

	public FunctionValue() {

	}
	
	public FunctionValue(String name, String type, Boolean param, Integer funcProvId) {
		this.name = name;
		this.type= type;
		this.param = param;
		this.funcProvId = funcProvId;
	}
	
	public FunctionValue(Integer id, String name, String type, Boolean param, Integer funcProvId) {
		this.id = id;
		this.name = name;
		this.type= type;
		this.param = param;
		this.funcProvId = funcProvId;
	}
}
