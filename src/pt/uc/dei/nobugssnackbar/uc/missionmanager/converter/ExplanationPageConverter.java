package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.mission.Page;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.PagesProvider;

@FacesConverter(forClass=Page.class)
public class ExplanationPageConverter implements Converter, Serializable {

	private static final long serialVersionUID = 1L;

	private PagesProvider pp;
	
	@Override
	public Object getAsObject(FacesContext arg0, UIComponent arg1, String msg) {
		long id = Long.parseLong(msg);
		
		for (Page pg : pp.getPages())
			if (pg.getId() == id)
				return pg;
		return null;
	}

	@Override
	public String getAsString(FacesContext arg0, UIComponent arg1, Object object) {
		Page pg = (Page) object;
		
		return pg.getId() + "";
	}

	public void setProvider(PagesProvider provider) {
		this.pp = provider;
	}
}