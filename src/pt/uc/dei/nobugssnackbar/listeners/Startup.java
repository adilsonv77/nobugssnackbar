package pt.uc.dei.nobugssnackbar.listeners;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

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
    	String url = "";
    	String className = "";
    	String username = "";
    	String password = "";
    	Properties props = new Properties();
    	try {
    		props.load(new InputStreamReader(new FileInputStream(new File(contextEvent.getServletContext().getRealPath("/") + "META-INF\\db.properties"))));
    		url = props.getProperty("url-conn");
        	className = props.getProperty("class-conn");
        	username = props.getProperty("user-conn");
        	password = props.getProperty("passw-conn");
    	} catch (Exception e) {
    		url = contextEvent.getServletContext().getInitParameter("url-conn");
        	className = contextEvent.getServletContext().getInitParameter("class-conn");
        	username = contextEvent.getServletContext().getInitParameter("user-conn");
        	password = contextEvent.getServletContext().getInitParameter("passw-conn");
    	}
    	
    	try {
			NoBugsConnection.buildConnection(url, className, username, password);
		} catch (Exception ee) {
			ee.printStackTrace();
		}
    }

	/**
     * @see ServletContextListener#contextDestroyed(ServletContextEvent)
     */
    public void contextDestroyed(ServletContextEvent arg0) {
        // TODO Auto-generated method stub
    }
	
}
