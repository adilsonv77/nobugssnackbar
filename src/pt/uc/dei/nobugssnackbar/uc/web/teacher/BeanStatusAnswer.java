package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsMissions;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsStudents;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCStudentMan;
import pt.uc.dei.nobugssnackbar.uc.web.util.AuthenticationUtil;

@ManagedBean(name="statusAnswer")
@ViewScoped
public class BeanStatusAnswer implements Serializable {
	
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
	
	@ManagedProperty(value="#{ucstudentman}")
	private UCStudentMan ucStudentMan;

	public UCStudentMan getUcStudentMan() {
		return ucStudentMan;
	}
	
	public void setUcStudentMan(UCStudentMan ucStudentMan) {
		this.ucStudentMan = ucStudentMan;
	}

	private Clazz clazz;
	
	private List<Clazz> clazzes;

	private List<String[]> students;

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
		
		this.loadStudents();
	}
	
	public void loadStudents() throws Exception {
		if (clazz != null) {
			this.students = reportsStudents.listStudentsAndAnswers(clazz.getId(), new Integer[]{5,6,7,8,9});
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
