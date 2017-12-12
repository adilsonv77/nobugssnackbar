package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.event.CellEditEvent;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.Level;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReleaseLevel;

@ManagedBean(name="releaselevel")
@ViewScoped
public class BeanReleaseLevel implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucreleaselevel}")
    private UCReleaseLevel ucReleaseLevel;
	
	private Clazz clazz;

	private List<Level> levels;

	private boolean enableSave;

	private Map<Integer, Level> saveLevels = new HashMap<>();  
	
	public void updateLevels() throws Exception {
		this.levels = ucReleaseLevel.listLevels(this.clazz);
		this.enableSave = false;
		saveLevels.clear();
	}
	
	public void editDate(CellEditEvent event) { 
		
        FacesContext context = FacesContext.getCurrentInstance();
        Level l = context.getApplication().evaluateExpressionGet(
                context, "#{level}", Level.class);
        
        this.enableSave = true;
        saveLevels.put(l.getOrder(), l);
		
	}
	
	public void releaseLevels() throws Exception {
		
		for (Level l:saveLevels.values()) {
			ucReleaseLevel.saveLevel(l);
		}
		
		this.updateLevels();
	}
	
	public boolean isEnableSave() {
		return enableSave;
	}
	
	public void setEnableSave(boolean enableSave) {
		this.enableSave = enableSave;
	}
	
	public UCReleaseLevel getUcReleaseLevel() {
		return ucReleaseLevel;
	}
	
	public void setUcReleaseLevel(UCReleaseLevel ucReleaseLevel) {
		this.ucReleaseLevel = ucReleaseLevel;
	}

	public Clazz getClazz() {
		return clazz;
	}
	
	public void setClazz(Clazz clazz) {
		this.clazz = clazz;
	}
	
	public List<Level> getLevels() {
		return levels;
	}

}
