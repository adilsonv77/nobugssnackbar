package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCLogin;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReleaseLevel;
import pt.uc.dei.nobugssnackbar.util.SendMail;

@ManagedBean(name="sendmail")
@ViewScoped
public class BeanSendMail implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucreleaselevel}")
    private UCReleaseLevel ucReleaseLevel;
	
	@ManagedProperty(value="#{uclogin}")
	private UCLogin ucLogin;
	
	private String msg;
	
	private List<User> students;

	private Clazz clazz;
	
	private List<User> selectedStudents;
	
	public void updateStudents() throws Exception {
		this.students = ucLogin.listStudents(this.clazz);
		
	}
	
	public void send() throws Exception {
		FacesContext context = FacesContext.getCurrentInstance();
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		
		if (selectedStudents == null || selectedStudents.size() == 0) {
			
			context.validationFailed();
	        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,
	        		"", messageBundle.getString("teacher_nostudent_selected")));
			return;
		}
		
		ServletContext servletContext = (ServletContext) context.getExternalContext().getContext();
		
		List<String> lDest = new ArrayList<>();
		for (User u:selectedStudents)
			lDest.add(u.getMail());
		
		SendMail sendMail = new SendMail(servletContext.getRealPath("/"));
		sendMail.send(lDest, "Mensagem de [NoBug's Snack Bar]", this.msg);
		
		context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,
        		"", messageBundle.getString("teacher_msgsent_success")));
		
		this.selectedStudents.clear();
		this.msg = null;
		
	}
	
	public UCReleaseLevel getUcReleaseLevel() {
		return ucReleaseLevel;
	}
	
	public void setUcReleaseLevel(UCReleaseLevel ucReleaseLevel) {
		this.ucReleaseLevel = ucReleaseLevel;
	}

	public UCLogin getUcLogin() {
		return ucLogin;
	}
	
	public void setUcLogin(UCLogin ucLogin) {
		this.ucLogin = ucLogin;
	}
	
	public Clazz getClazz() {
		return clazz;
	}
	
	public void setClazz(Clazz clazz) {
		this.clazz = clazz;
	}
	
	public List<User> getStudents() {
		return students;
	}
	
	public String getMsg() {
		return msg;
	}
	
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public List<User> getSelectedStudents() {
		return selectedStudents;
	}
	
	public void setSelectedStudents(List<User> selectedStudents) {
		this.selectedStudents = selectedStudents;
	}
}
