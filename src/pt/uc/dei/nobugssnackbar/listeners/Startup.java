package pt.uc.dei.nobugssnackbar.listeners;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

/**
 * Application Lifecycle Listener implementation class Startup
 *
 */
@WebListener
public class Startup implements ServletContextListener {

    /**
     * Default constructor. 
     */
    public Startup() {
        // TODO Auto-generated constructor stub
    }

	/**
     * @see ServletContextListener#contextInitialized(ServletContextEvent)
     */
    public void contextInitialized(ServletContextEvent contextEvent) {
    	String url = contextEvent.getServletContext().getInitParameter("url-conn");
    	String className = contextEvent.getServletContext().getInitParameter("class-conn");
    	String username = contextEvent.getServletContext().getInitParameter("user-conn");
    	String password = contextEvent.getServletContext().getInitParameter("passw-conn");
    	
        try {
			NoBugsConnection.buildConnection(url, className, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }

	/**
     * @see ServletContextListener#contextDestroyed(ServletContextEvent)
     */
    public void contextDestroyed(ServletContextEvent arg0) {
        // TODO Auto-generated method stub
    }
	
}
