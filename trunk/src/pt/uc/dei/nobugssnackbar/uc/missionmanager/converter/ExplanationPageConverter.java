package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.Page;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.ExplanationView;

@FacesConverter(forClass=Page.class, value="pageExpla")
public class ExplanationPageConverter implements Converter {

	public static ExplanationView ev;
	
	@Override
	public Object getAsObject(FacesContext arg0, UIComponent arg1, String msg) {
		/*
		long id = Long.parseLong(msg);
		
		for (Page pg:ev.getPages())
			if (pg.getId() == id)
				return pg;
		*/
		return new Page(msg);
	}

	@Override
	public String getAsString(FacesContext arg0, UIComponent arg1, Object object) {
		Page pg = (Page) object;
		
		return pg.getMsg(); // getId() + "";
	}

}
