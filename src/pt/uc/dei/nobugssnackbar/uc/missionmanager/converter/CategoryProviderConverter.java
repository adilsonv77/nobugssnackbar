package pt.uc.dei.nobugssnackbar.uc.missionmanager.converter;

import java.io.Serializable;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import pt.uc.dei.nobugssnackbar.model.HintCategory;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.IHintCategoryProvider;

@FacesConverter(forClass=HintCategory.class)
public class CategoryProviderConverter implements Converter, Serializable {
	
	private static final long serialVersionUID = 1L;

	private IHintCategoryProvider fp;
	
	@Override
	public Object getAsObject(FacesContext fc, UIComponent uic, String value) {
		long id = Long.parseLong(value);
	
		try {
			for (HintCategory hc : fp.getHintCategories())
				if (hc.getId() == id)
					return hc;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getAsString(FacesContext fc, UIComponent uic, Object object) {
        if (object != null) {
            return String.valueOf(((HintCategory) object).getId());
        }
        return null;
	}

	public void setProvider(IHintCategoryProvider provider) {
		this.fp = provider;
	}
}
