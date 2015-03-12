package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;

/* It must be here because it is  stored in database */

@JdbcTable(name="functionsprovider")
public class Function implements Serializable {
	private static final long serialVersionUID = 1L;

	@JdbcField(name="functionproviderid")
	@JdbcPk
	private Integer id;
	@JdbcField(name="functionprovidername")
	private String name;
	@JdbcField(name="functionproviderreturn")
	private String returnType;
	@JdbcField(name="functionproviderdescription")
	private String description;
	
	
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
	public String getReturnType() {
		return returnType;
	}
	public void setReturnType(String returnType) {
		this.returnType = returnType;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
		
	public Function() {
	}

	public Function(String name, String returnType, String description) {
		this.name = name;
		this.returnType = returnType;
		this.description = description;
	}

	public Function(Integer id, String name, String returnType, String description) {
		this.id = id;
		this.name = name;
		this.returnType = returnType;
		this.description = description;
	}
}
