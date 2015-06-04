package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;

@JdbcTable(name="hintcategories")
public class HintCategory implements Serializable {


	private static final long serialVersionUID = 1L;
	
	@JdbcField(name="hintcategoryid")
	@JdbcPk
	private Integer id;
	@JdbcField(name="hintcategorytitle")
	private String title;
	@JdbcField(name="hintcategorydescription")
	private String description;
	@JdbcField(name="hintcategorybody")
	private String body;
	
	public HintCategory() {
	}

	public HintCategory(Integer id, String title, String description, String body) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.body = body;
	}

	public HintCategory(String title, String description, String body) {
		this.title = title;
		this.description = description;
		this.body = body;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}
	
}
