package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsMissions;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsStudents;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCStudentMan;

@ManagedBean(name="statusAnswer")
@ViewScoped
public class BeanStatusAnswer extends BeanBase {
	
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
		setUcBase(reportsMissions);
	}
	
	@ManagedProperty(value="#{ucstudentman}")
	private UCStudentMan ucStudentMan;

	public UCStudentMan getUcStudentMan() {
		return ucStudentMan;
	}
	
	public void setUcStudentMan(UCStudentMan ucStudentMan) {
		this.ucStudentMan = ucStudentMan;
	}

	private List<String[]> students;

	public void setClazz(Clazz clazz) throws Exception {
		if (this.getClazz() != null && clazz != null && this.getClazz().getId() == clazz.getId())
			return;
		
		super.setClazz(clazz);
		this.students = null;
		
		this.loadStudents();
	}
	
	public void loadStudents() throws Exception {
		if (getClazz() != null) {
			this.students = reportsStudents.listStudentsAndAnswers(getClazz().getId(), new Integer[]{5,6,7,8,9});
		}
			
	}

	public List<String[]> getStudents() throws Exception {
		return students;
	}
	
	public void liberar(Long userId) throws Exception  {
		ucStudentMan.changeCurrentlyClasse(userId, 1L);
		loadStudents();
	}
	
}
