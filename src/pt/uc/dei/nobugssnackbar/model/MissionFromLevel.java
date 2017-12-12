package pt.uc.dei.nobugssnackbar.model;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;

public class MissionFromLevel extends Mission {

	private static final long serialVersionUID = 1L;

	@JdbcField(name="classid")
	private long classId;
	
	@JdbcField(name="classlevelid")
	private long classLevelId;
	
	@JdbcField(name="missionorder")
	private long order;
	
	public long getClassId() {
		return classId;
	}
	
	public void setClassId(long classId) {
		this.classId = classId;
	}
	
	public long getClassLevelId() {
		return classLevelId;
	}
	
	public void setClassLevelId(long classLevelId) {
		this.classLevelId = classLevelId;
	}
	
	public long getOrder() {
		return order;
	}
	
	public void setOrder(long order) {
		this.order = order;
	}
	
	
	
}
