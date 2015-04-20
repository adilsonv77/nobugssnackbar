package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import javax.faces.context.FacesContext;

public class ApplicationUtils {

	public static <T> T processEL(String el, Class<T> clazz) {
    	FacesContext context = FacesContext.getCurrentInstance();
    	return context.getApplication().evaluateExpressionGet(context, el, clazz);
	}
	
}
