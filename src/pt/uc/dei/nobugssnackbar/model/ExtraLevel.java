package pt.uc.dei.nobugssnackbar.model;

import java.util.Date;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;

public class ExtraLevel {

	@JdbcField(name="levelsextraid")
	@JdbcPk
	private long id;
	
	@JdbcField(name="classlevelid")
	private long levelId;
	
	private long classId;
	
	private Date dtAplicacao;
	
	private Date hrInicio;
	
	private Date hrFim;
	
	private String nome;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getLevelId() {
		return levelId;
	}

	public void setLevelId(long levelId) {
		this.levelId = levelId;
	}

	public long getClassId() {
		return classId;
	}

	public void setClassId(long classId) {
		this.classId = classId;
	}

	public Date getDtAplicacao() {
		return dtAplicacao;
	}

	public void setDtAplicacao(Date dtAplicacao) {
		this.dtAplicacao = dtAplicacao;
	}

	public Date getHrInicio() {
		return hrInicio;
	}

	public void setHrInicio(Date hrInicio) {
		this.hrInicio = hrInicio;
	}

	public Date getHrFim() {
		return hrFim;
	}

	public void setHrFim(Date hrFim) {
		this.hrFim = hrFim;
	}
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
