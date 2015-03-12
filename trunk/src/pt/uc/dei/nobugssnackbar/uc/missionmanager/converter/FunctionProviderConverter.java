package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.IFunctionProvider;

@FacesConverter(forClass=Function.class)
public class FunctionProviderConverter implements Converter, Serializable {
	
	private static final long serialVersionUID = 1L;

	private IFunctionProvider fp;
	
	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		long id = Long.parseLong(value);
		
		for (Function f : fp.getFunctions())
			if (f.getId() == id)
				return f;
		return null;
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if(object != null) {
            return String.valueOf(((Function) object).getId());
        }
        else {
            return null;
        }
	}

	public void setProvider(IFunctionProvider provider) {
		this.fp = provider;
	}
}
