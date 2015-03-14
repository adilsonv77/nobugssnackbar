package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.mission.Page;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.IPagesProvider;

@FacesConverter(forClass=Page.class)
public class ExplanationPageConverter implements Converter, Serializable {

	private static final long serialVersionUID = 1L;

	private IPagesProvider pp;
	
	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		long id = Long.parseLong(value);
		
		for (Page pg : pp.getPages())
			if (pg.getId() == id)
				return pg;
		return null;
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((Page) object).getId());
        }
        return null;
	}

	public void setProvider(IPagesProvider provider) {
		this.pp = provider;
	}
}