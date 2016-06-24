package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsMissions;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsStudents;
import pt.uc.dei.nobugssnackbar.uc.web.util.AuthenticationUtil;

@ManagedBean(name="statusStudents")
@ViewScoped
public class BeanStatusStudents implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucreportsstudents}")
	private UCReportsStudents reportsStudents;

	public UCReportsStudents getReportsStudents() {
		return reportsStudents;
	}
	
	public void setReportsStudents(UCReportsStudents reportsStudents) {
		this.reportsStudents = reportsStudents;
	}
	
	@ManagedProperty(value="#{ucreportsmissions}")
	private UCReportsMissions reportsMissions;
	
	public UCReportsMissions getReportsMissions() {
		return reportsMissions;
	}
	
	public void setReportsMissions(UCReportsMissions reportsMissions) {
		this.reportsMissions = reportsMissions;
	}
	
	@ManagedProperty(value="#{statusMissions}")
	private BeanStatusMissions statusMissions;
	
	public BeanStatusMissions getStatusMissions() {
		return statusMissions;
	}
	
	public void setStatusMissions(BeanStatusMissions statusMissions) {
		this.statusMissions = statusMissions;
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
	
	public void loadAttempts(String[] user, int missionIdx) {
		// 
		//statusMissions.loadUserAttemptsEx(userid, missionid, username);
	}
	
	public List<String[]> getStudents() throws Exception {
		if (students == null && clazz != null) {
			students = reportsStudents.retrieveStudents(this.clazz.getId());
			colStudents = new ArrayList<BeanStatusStudents.ColumnModel>();
			
			String[] cols = students.get(0);
			for (String col:cols) {
				if (col != null) {
					String[] data = col.split(";");
					colStudents.add(new ColumnModel(Long.parseLong(data[1]), Long.parseLong(data[0])));
				} else
					colStudents.add(new ColumnModel(0, 0));
			}
			
			students.remove(0);
		}
			
		return students;
	}
	
	public List<ColumnModel> getColStudents() {
					
		return this.colStudents;
	}
	
	public static class ColumnModel {
		
		private long mission;
		private long level;

		public ColumnModel(long level, long mission) {
			this.level = level;
			this.mission = mission;
		}
		
		public long getLevel() {
			return level;
		}
		
		public long getMission() {
			return mission;
		}
		
	}
	
}
