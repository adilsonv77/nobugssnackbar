package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;

/* this class stay here because it is provided by database */

@JdbcTable(name="missions")
public class Mission implements Serializable {


	private static final long serialVersionUID = 1L;
	
	@JdbcField(name="missionid")
	@JdbcPk
	private Long id;

	@JdbcField(name="missionname")
	private String name;
	
	@JdbcField(name="missioncontent")
	private String content;

	@JdbcField(name="missionrepeatable", type="INT")
	private boolean repeatable;
	
	public Long getId() {
		return id;
	}
	public void setId(Long l) {
		this.id = l;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public boolean isRepeatable() {
		return repeatable;
	}
	public void setRepeatable(boolean repeatable) {
		this.repeatable = repeatable;
	}
	
	
	public Mission() {
	}

	public Mission(Long id, String name, String content,
			boolean repeatable) {
		this(name, content, repeatable);
		this.id = id;
	}
	
	public Mission(String name, String content, boolean repeatable) {
		super();
		this.name = name;
		this.content = content;
		this.repeatable = repeatable;
	}
	
	
}