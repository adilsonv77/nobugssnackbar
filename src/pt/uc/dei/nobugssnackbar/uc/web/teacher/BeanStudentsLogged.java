package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import pt.uc.dei.nobugssnackbar.control.LoginAdmin;
import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCStudentMan;

@ManagedBean(name="studentlogged")
@ViewScoped
public class BeanStudentsLogged implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucstudentman}")
	private UCStudentMan ucStudentMan;
	
	public UCStudentMan getUcStudentMan() {
		return ucStudentMan;
	}
	
	public void setUcStudentMan(UCStudentMan ucStudentMan) {
		this.ucStudentMan = ucStudentMan;
	}
	
	private List<Map<String, String>> students;

	@PostConstruct
	public void init() {
		reload();
	}
	
	public void reload() {
		students = new ArrayList<>();
		
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			
			FacesContext context = FacesContext.getCurrentInstance();
			Map<Long, Long> m = LoginAdmin.getUsersConnected((ServletContext) context.getExternalContext().getContext());
			
			for (Long userId:m.keySet()) {
				
				User user = this.ucStudentMan.read(userId);
				
				Map<String, String> um = new HashMap<>();
				um.put("id", userId.toString());
				um.put("nick", user.getNick());
				um.put("name", user.getName());
				um.put("time", sdf.format( new java.util.Date(m.get(userId)) ));
				
				students.add(um);
			}
		} catch (Exception ex) {
			
		}
		
	}
	
	public List<Map<String, String>> getStudents() {
		return students;
	}
	
	public void disconnect(Long userId) {
		
		FacesContext context = FacesContext.getCurrentInstance();
		
		HttpSession session = LoginAdmin.getUserSession((ServletContext) context.getExternalContext().getContext(), userId);
		session.invalidate();
		
		LoginAdmin.logoff((ServletContext) context.getExternalContext().getContext(), userId);
		
		reload();
	}
}
