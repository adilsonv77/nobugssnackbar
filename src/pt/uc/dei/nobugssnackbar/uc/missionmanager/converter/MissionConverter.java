package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.Mission;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.IMissionProvider;

@FacesConverter(forClass=Mission.class)
public class MissionConverter implements Converter, Serializable {
	
	private static final long serialVersionUID = 1L;

	private IMissionProvider mp;
	
	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		long id = Long.parseLong(value);
	
		try {
			for (Mission m : mp.getMissionList())
				if (m.getId() == id)
					return m;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((Mission) object).getId());
        }
        return null;
	}

	public void setProvider(IMissionProvider provider) {
		this.mp = provider;
	}
}
