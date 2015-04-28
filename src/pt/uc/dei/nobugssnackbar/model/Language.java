package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;

@JdbcTable(name="languages")
public class Language implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JdbcField(name="languageid")
	@JdbcPk
	private Integer id;

	@JdbcField(name="languagename")
	private String name;
	
	@JdbcField(name="languagecode")
	private String code;
	
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
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	

}
