package pt.uc.dei.nobugssnackbar.listeners;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Properties;
import java.util.TimeZone;
import java.util.logging.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.FactoryJdbcDao;

/**
 * Application Lifecycle Listener implementation class Startup
 *
 */
@WebListener
public class Startup implements ServletContextListener {

	private static Logger log = Logger.getGlobal();
	
    public Startup() {
    }

    public void contextInitialized(ServletContextEvent contextEvent) {

    	// I need this to solve a problem when edit and save dates with JSF
        TimeZone zone = TimeZone.getTimeZone("GMT-03:00");
        TimeZone.setDefault(zone);
    	
    	String url = "";
    	String className = "";
    	String username = "";
    	String password = "";
    	Properties props = new Properties();
    	try {
    		String path = contextEvent.getServletContext().getRealPath("/") + "/META-INF/db.properties";
    		log.info("db.properties : " + path);
    		props.load(new InputStreamReader(new FileInputStream(new File(path))));
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
    		log.info("user : " + username);
    		
    		AbstractFactoryDao factDao = new FactoryJdbcDao(url, className, username, password);

    		contextEvent.getServletContext().setAttribute("factoryDao", factDao);
    		
    		
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
