package pt.uc.dei.nobugssnackbar.uc.util;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

import pt.uc.dei.nobugssnackbar.model.User;

public class AuthenticationUtil {

     public static void destroySession() {
        HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(false);
        session.invalidate();
    }

    public static void saveInSession(User user) throws Exception {
        HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
        session.setAttribute("user", user);
    }

    public static User getUserFromSession() {
        HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
        User user = (User) session.getAttribute("user");

        return (user);
    }
    
    public static void removeInSession(String key) {
        HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
        session.removeAttribute(key);
    }
}