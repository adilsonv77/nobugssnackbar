package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.util.List;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.ApplicationUtils;

@FacesConverter(forClass=Clazz.class)
public class ClazzConverter  implements Converter {
	
	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		
		// converter only works if the instances of the web form and returned by this method
		
		String elValue = "#{" + (String) uic.getAttributes().get("dataProvider") + "}";
		@SuppressWarnings("unchecked")
		List<Clazz> clazzes = ApplicationUtils.processEL(elValue, List.class);
		long id = Long.parseLong(value);
		
		for (Clazz c:clazzes)
			if (c.getId() == id)
				return c;
		
		return null;
		
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((Clazz) object).getId());
        }
        return null;
	}

}
