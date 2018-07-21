package pt.uc.dei.nobugssnackbar.uc.web.converters;

import java.util.List;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.ExtraLevel;
import pt.uc.dei.nobugssnackbar.uc.web.util.ApplicationUtils;

@FacesConverter(forClass=ExtraLevel.class, value="extraLevelsConverter")
public class ExtraLevelConverter implements Converter {

	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		// converter only works if the instances of the web form and returned by this method
		
		String elValue = "#{" + (String) uic.getAttributes().get("dataProvider") + "}";
		@SuppressWarnings("unchecked")
		List<ExtraLevel> extraLevels = ApplicationUtils.processEL(elValue, List.class);
		long id = Long.parseLong(value);
		
		for (ExtraLevel exl:extraLevels)
			if (exl.getId() == id)
				return exl;
		
		return null;
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((ExtraLevel) object).getId());
        }
        return null;
	}

}
