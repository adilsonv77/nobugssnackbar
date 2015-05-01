package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.mission.Skin;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.ISkinProvider;

@FacesConverter(forClass=Skin.class)
public class SkinConverter implements Converter, Serializable {
	private static final long serialVersionUID = 1L;

	private ISkinProvider sp;
	
	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		long id = Long.parseLong(value);
		
		for (Skin sk : sp.getSkins())
			if (sk.getId() == id)
				return sk;
		return null;
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((Skin) object).getId());
        }
        return null;
	}

	public void setProvider(ISkinProvider provider) {
		this.sp = provider;
	}
}