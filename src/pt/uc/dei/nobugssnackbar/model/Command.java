package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;


@JdbcTable(name="commands")
public class Command implements Serializable {
	private static final long serialVersionUID = 1L;

	@JdbcField(name="commandid")
	@JdbcPk
	private Integer id;
	@JdbcField(name="commandname")
	private String name;
	@JdbcField(name="commandparent")
	private Integer parentId;
	
	
	public Command() {
	}

	public Command(String name, Integer parentId) {
		this.name = name;
		this.parentId = parentId;
	}

	public Command(Integer id, String name, Integer parentId) {
		this.id = id;
		this.name = name;
		this.parentId = parentId;
	}
	
	
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
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
}
