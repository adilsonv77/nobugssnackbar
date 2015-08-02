package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.model.FunctionValue;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.IFunctionProviderValue;

@FacesConverter(forClass=Function.class)
public class FunctionProviderValueConverter implements Converter, Serializable {
	
	private static final long serialVersionUID = 1L;

	private IFunctionProviderValue fpv;
	
	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		long id = Long.parseLong(value);
	
		try {
			for (FunctionValue fv : fpv.getAllFunctionValues())
				if (fv.getId() == id)
					return fv;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((FunctionValue) object).getId());
        }
        return null;
	}

	public void setProvider(IFunctionProviderValue provider) {
		this.fpv = provider;
	}
}
