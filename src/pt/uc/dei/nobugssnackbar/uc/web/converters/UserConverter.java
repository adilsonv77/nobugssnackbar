package pt.uc.dei.nobugssnackbar.uc.web.converters;

import java.util.List;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.User;
import pt.uc.dei.nobugssnackbar.uc.web.util.ApplicationUtils;

@FacesConverter(forClass=User.class, value="userConverter")
public class UserConverter  implements Converter {
	
	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		
		// converter only works if the instances of the web form and returned by this method
		
		String elValue = "#{" + (String) uic.getAttributes().get("dataProvider") + "}";
		@SuppressWarnings("unchecked")
		List<User> users = ApplicationUtils.processEL(elValue, List.class);
		long id = Long.parseLong(value);
		
		for (User u:users)
			if (u.getId() == id)
				return u;
		
		return null;
		
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((User) object).getId());
        }
        return null;
	}

}