package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;

@JdbcTable(name="classes")
public class Clazz implements Serializable {

	private static final long serialVersionUID = 1L;

	@JdbcField(name="classid")
	@JdbcPk
	private Long id;
	
	@JdbcField(name="teacherid")
	private Integer teacher;
	
	@JdbcField(name="classname")
	private String name;
	
	@JdbcField(name="showleaderboardafter")
	private boolean showLeaderBoardAfter;
	
	@JdbcField(name="languageid")
	private Integer language;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getTeacher() {
		return teacher;
	}

	public void setTeacher(Integer teacher) {
		this.teacher = teacher;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isShowLeaderBoardAfter() {
		return showLeaderBoardAfter;
	}

	public void setShowLeaderBoardAfter(boolean showLeaderBoardAfter) {
		this.showLeaderBoardAfter = showLeaderBoardAfter;
	}

	public Integer getLanguage() {
		return language;
	}

	public void setLanguage(Integer language) {
		this.language = language;
	}
	
}
