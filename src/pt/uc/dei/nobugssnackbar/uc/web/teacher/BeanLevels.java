package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.Level;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCLevelMan;

@ManagedBean(name="levelman")
@ViewScoped
public class BeanLevels implements Serializable  {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{uclevelman}")
	private UCLevelMan ucLevelMan;

	public UCLevelMan getUcLevelMan() {
		return ucLevelMan;
	}
	
	public void setUcLevelMan(UCLevelMan ucLevelMan) {
		this.ucLevelMan = ucLevelMan;
	}
	
	private List<Clazz> classes;

	private boolean showForm;

	private boolean newLevel;

	private Level level;

	private Clazz clazz;

	
	@PostConstruct
	public void init() {
		try {
			classes = ucLevelMan.listClasses();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public List<Clazz> getClasses() throws Exception {
		return classes;
	}

	public boolean isNewLevel() {
		return newLevel;
	}
	
	public boolean isShowForm() {
		return showForm;
	}
	
	public List<Level> getLevels() throws Exception {
		if (clazz == null)
			return null;
		return ucLevelMan.listLevels(clazz.getId());
	}
	
	public Clazz getClazz() {
		return clazz;
	}
	
	public void setClazz(Clazz clazz) {
		this.clazz = clazz;
	}
	
	public void newStudent() {
		this.showForm = true;
		this.newLevel = true;
		this.level = new Level();
	}
}
