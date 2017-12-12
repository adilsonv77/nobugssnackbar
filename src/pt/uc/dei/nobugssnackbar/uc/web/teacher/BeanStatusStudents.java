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
	
	private String order = "1";
	
	private List<Clazz> clazzes;

	private List<String[]> students;

	private List<ColumnModel> colStudents;

	public List<Clazz> getClazzes() throws Exception {
		if (clazzes == null)
			clazzes = reportsMissions.listClasses(AuthenticationUtil.getUserFromSession());
		return clazzes;
	}
	
	public Clazz getClazz() {
		return clazz;
	}
	
	public void setClazz(Clazz clazz) throws Exception {
		if (this.clazz != null && clazz != null && this.clazz.getId() == clazz.getId())
			return;
		
		this.clazz = clazz;
		this.students = null;
		this.colStudents = null;
		
		this.loadStudents();
	}
	
	private void loadStudents() throws Exception {
		if (clazz != null) {
			
			int o = Integer.parseInt(order);
			switch (o) {
				case 1: students = reportsStudents.listStudents(this.clazz.getId(), null, 0); break;
				case 2: students = reportsStudents.listStudentsByOutliersInAttempts(this.clazz.getId(), null); break;
				case 3: students = reportsStudents.listStudentsByMissionsAchieved(this.clazz.getId(), null); break;
				case 4: students = reportsStudents.listStudentsByTimeSpent(this.clazz.getId(), null); break;
				case 5: students = reportsStudents.listStudentsByExplanationEntry(this.clazz.getId(), null); break;
				case 6: students = reportsStudents.listStudentsByExplanationTime(this.clazz.getId(), null); break;
			}
			
			colStudents = new ArrayList<BeanStatusStudents.ColumnModel>();
			
			int index = 0;
			String previousLevel = "";
			String[] cols = students.get(0);
			for (String col:cols) {
				if (col != null) {
					String[] data = col.split(";");
					if (!previousLevel.equals(data[1])) {
						index = 1;
						previousLevel = data[1];
					}
					colStudents.add(new ColumnModel(index, Long.parseLong(data[1]), Long.parseLong(data[0])));
				} else
					colStudents.add(new ColumnModel(index, 0, 0));
				index++;
			}
			
			students.remove(0);
		}
			
	}

	public List<String[]> getStudents() throws Exception {
		return students;
	}
	
	public List<ColumnModel> getColStudents() {
					
		return this.colStudents;
	}
	
	public String getOrder() {
		return order;
	}
	
	public void setOrder(String order) throws Exception {
		if (order.equals(this.order))
			return;
		
		this.order = order;
		this.loadStudents();
	}
	
	public static class ColumnModel implements Serializable {
		
		private static final long serialVersionUID = 1L;
		
		private int index;
		private long mission;
		private long level;

		public ColumnModel(int index, long level, long mission) {
			this.index = index;
			this.level = level;
			this.mission = mission;
		}
		
		public int getIndex() {
			return index;
		}
		
		public long getLevel() {
			return level;
		}
		
		public long getMission() {
			return mission;
		}
		
	}
	
}
