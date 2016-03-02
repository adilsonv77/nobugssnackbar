package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsAchievements;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsMissions;
import pt.uc.dei.nobugssnackbar.uc.web.util.AuthenticationUtil;

@ManagedBean(name="statusAchievements")
@ViewScoped
public class BeanStatusAchievements implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucreportsachievements}")
	private UCReportsAchievements reportsAchievements;

	public UCReportsAchievements getReportsAchievements() {
		return reportsAchievements;
	}
	
	public void setReportsAchievements(UCReportsAchievements reportsAchievements) {
		this.reportsAchievements = reportsAchievements;
	}
	
	@ManagedProperty(value="#{ucreportsmissions}")
	private UCReportsMissions reportsMissions;
	
	public UCReportsMissions getReportsMissions() {
		return reportsMissions;
	}
	
	public void setReportsMissions(UCReportsMissions reportsMissions) {
		this.reportsMissions = reportsMissions;
	}
	
	private Clazz clazz;
	
	private List<Clazz> clazzes;

	private List<String[]> students;

	private List<ColumnModel> colStudents;

	public List<Clazz> getClazzes() throws Exception {
		if (clazzes == null)
			clazzes = reportsMissions.listClazzes(AuthenticationUtil.getUserFromSession());
		return clazzes;
	}
	
	public Clazz getClazz() {
		return clazz;
	}
	
	public void setClazz(Clazz clazz) {
		this.clazz = clazz;
		this.students = null;
		this.colStudents = null;
	}
	
	public List<String[]> getStudents() throws SQLException {
		if (students == null && clazz != null) {
			students = reportsAchievements.retrieveStudents(this.clazz.getId());
			colStudents = new ArrayList<BeanStatusAchievements.ColumnModel>();
			
			String[] cols = students.get(0);
			for (String col:cols) {
				if (col != null) {
					String[] data = col.split(";");
					colStudents.add(new ColumnModel(Long.parseLong(data[1]), data[2]));
				} else
					colStudents.add(new ColumnModel(0, ""));
			}
			
			students.remove(0);
		}
			
		return students;
	}
	
	public List<ColumnModel> getColStudents() {
					
		return this.colStudents;
	}
	
	public static class ColumnModel {
		
		private long typeId;
		private String level;
		
		public ColumnModel(long typeId, String level) {
			this.typeId = typeId;
			this.level = level;
		}
		
		public String getLevel() {
			return level;
		}
		
		public long getTypeId() {
			return typeId;
		}
	}
	
}
