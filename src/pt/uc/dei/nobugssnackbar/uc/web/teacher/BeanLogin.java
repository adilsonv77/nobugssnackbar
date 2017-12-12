package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.control.UserControl;
import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCLogin;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReleaseLevel;
import pt.uc.dei.nobugssnackbar.uc.web.util.AuthenticationUtil;

@ManagedBean(name="login")
@ViewScoped
public class BeanLogin implements Serializable {

	private static final long serialVersionUID = 1L;

	private String nick;
    private String password;  

	private List<Clazz> clazzes;
	
	@ManagedProperty(value="#{uclogin}")
    private UCLogin ucLogin;
	
	@ManagedProperty(value="#{ucreleaselevel}")
    private UCReleaseLevel ucReleaseLevel;
	
    public void loginTeacher() throws Exception {

    	User user = ucLogin.loginTeacher(getNick(), UserControl.encrypt(getPassword()));
    	if (user != null) {
    		AuthenticationUtil.saveInSession(user);
    		FacesContext.getCurrentInstance().getExternalContext().redirect("index.jsf");
    	} else {
    		FacesContext context = FacesContext.getCurrentInstance();
    		ResourceBundle messageBundle = ApplicationMessages.getMessage();
    		
			context.validationFailed();
	        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,
	        		"", messageBundle.getString("teacher_user_autherror")));
    		
    	}
    }
    
    public void logout() throws IOException {
    	AuthenticationUtil.destroySession();
        FacesContext.getCurrentInstance().getExternalContext().redirect("index.jsf");
    }
    
    public User getUserLogged() {
    	return AuthenticationUtil.getUserFromSession();
    }
    
	public List<Clazz> getClasses() throws Exception {
		
		if (clazzes == null) {
			
			clazzes = ucReleaseLevel.listClasses(AuthenticationUtil.getUserFromSession());
		}
			
		return clazzes;
	}
	
    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
	public UCLogin getUcLogin() {
		return ucLogin;
	}
	
	public void setUcLogin(UCLogin ucLogin) {
		this.ucLogin = ucLogin;
	}
	
	public UCReleaseLevel getUcReleaseLevel() {
		return ucReleaseLevel;
	}
	
	public void setUcReleaseLevel(UCReleaseLevel ucReleaseLevel) {
		this.ucReleaseLevel = ucReleaseLevel;
	}


}
