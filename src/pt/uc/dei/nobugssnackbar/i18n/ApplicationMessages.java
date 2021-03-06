package pt.uc.dei.nobugssnackbar.i18n;

import java.util.Map;
import java.util.ResourceBundle;

import javax.faces.context.FacesContext;

import com.sun.faces.application.ApplicationAssociate;
import com.sun.faces.application.ApplicationResourceBundle;

public class ApplicationMessages {

	public static ResourceBundle getMessage() {
		FacesContext context = FacesContext.getCurrentInstance();
		Map<String, ApplicationResourceBundle> rb = ApplicationAssociate.getCurrentInstance().getResourceBundles();
		ApplicationResourceBundle appResBundle = rb.get("msg");
		return appResBundle.getResourceBundle(context.getViewRoot().getLocale());

	}
	
	public static ResourceBundle getMessage(String locale) throws ClassNotFoundException, InstantiationException, IllegalAccessException {
		
		if (locale.indexOf("-") > -1)
			locale = locale.substring(0, locale.indexOf("-")) + locale.substring(locale.indexOf("-")+1);
		locale = locale.toLowerCase();
		
		Class<?> clazz = Class.forName("pt.uc.dei.nobugssnackbar.i18n.Messages"+(locale.equals("en")?"":"_"+locale));
		return (ResourceBundle) clazz.newInstance();
		
	}
	
}
