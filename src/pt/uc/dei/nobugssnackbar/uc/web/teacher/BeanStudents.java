package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCStudentMan;

@ManagedBean(name="studentman")
@ViewScoped
public class BeanStudents extends BeanBase {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucstudentman}")
	private UCStudentMan ucStudentMan;

	private List<Clazz> classes;

	public UCStudentMan getUcStudentMan() {
		return ucStudentMan;
	}
	
	public void setUcStudentMan(UCStudentMan ucStudentMan) {
		this.ucStudentMan = ucStudentMan;
		setUcBase(ucStudentMan);
	}
	
	public List<User> getStudents() throws Exception {
		return ucStudentMan.listStudents();
	}

	private User user = new User();

	public User getStudent() {
		return user;
	}
	
	public void newStudent() throws Exception {
		super.newElement();
		this.setClazz(null);
		this.user = new User();
	}
	
	public void edit(User user) throws Exception {
		super.editElement();
		this.user = user;
		
		Clazz curClazz = ucStudentMan.getActiveClazz(user);
		if (curClazz == null)
			this.setClazz(null);
		else {
			for (Clazz c:classes)
				if (c.getId().longValue() == curClazz.getId().longValue()) {
					this.setClazz(c);
					break;
				}
			this.user.setClassId(this.getClazz().getId());
		}
	}

	public void save() throws Exception {
		if (this.isNewElem())
			ucStudentMan.insert(user, this.getClazz());
		else
			ucStudentMan.update(user, this.getClazz());
			
		this.cancel();
	}
	
	public void cancel() throws Exception {
		super.cancelEdit();
		this.user = new User();
		this.setClazz(null);
	}
	
}
