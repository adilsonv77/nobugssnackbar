package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCStudentMan;

@ManagedBean(name="studentman")
@ViewScoped
public class BeanStudents implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucstudentman}")
	private UCStudentMan ucStudentMan;

	private List<Clazz> classes;

	public UCStudentMan getUcStudentMan() {
		return ucStudentMan;
	}
	
	public void setUcStudentMan(UCStudentMan ucStudentMan) {
		this.ucStudentMan = ucStudentMan;
	}
	
	@PostConstruct
	public void init() {
		try {
			classes = ucStudentMan.listClasses();
		} catch (Exception ex) {
			
		}
	}
	
	public List<User> getStudents() throws Exception {
		return ucStudentMan.listStudents();
	}

	public List<Clazz> getClasses() throws Exception {
		return classes;
	}
	
	
	private User user = new User();

	private boolean newStudent;

	private Clazz clazz;

	private boolean showForm = false;

	public User getStudent() {
		return user;
	}
	
	public boolean isNewStudent() {
		return this.newStudent;
	}
	
	public boolean isShowForm() {
		return showForm ;
	}
	
	public void newStudent() {
		this.showForm = true;
		this.newStudent = true;
		this.user = new User();
		this.clazz = null;
	}
	
	public void edit(User user) throws Exception {
		this.showForm = true;
		this.newStudent = false;
		this.user = user;
		
		Clazz curClazz = ucStudentMan.getActiveClazz(user);
		if (curClazz == null)
			this.clazz = null;
		else {
			for (Clazz c:classes)
				if (c.getId().longValue() == curClazz.getId().longValue()) {
					this.clazz = c;
					break;
				}
			this.user.setClassId(this.clazz.getId());
		}
	}

	public void save() throws Exception {
		if (this.newStudent)
			ucStudentMan.insert(user, clazz);
		else
			ucStudentMan.update(user, clazz);
		
		this.showForm = false;
		this.user = new User();
		this.clazz = null;
	}
	
	public Clazz getClazz() {
		return this.clazz;
	}
	
	public void setClazz(Clazz clazz) {
		this.clazz = clazz;
	}
	
}
