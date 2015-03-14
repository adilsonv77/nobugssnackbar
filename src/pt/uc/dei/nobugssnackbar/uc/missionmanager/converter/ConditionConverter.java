package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.mission.Condition;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.IConditionProvider;

@FacesConverter(forClass=Condition.class)
public class ConditionConverter implements Converter, Serializable  {

	private static final long serialVersionUID = 1L;
	
	private IConditionProvider cp;

	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		long id = Long.valueOf(value);
		
		for (Condition c : cp.getConditions())
			if (c.getId() == id)
				return c;
		return null;
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((Condition) object).getId());
        }
        return null;
	}

	public void setProvider(IConditionProvider provider) {
		this.cp = provider;
	}
}
