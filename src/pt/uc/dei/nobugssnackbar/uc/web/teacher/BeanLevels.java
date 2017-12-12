package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.Level;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCLevelMan;

@ManagedBean(name="levelman")
@ViewScoped
public class BeanLevels extends BeanBase {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{uclevelman}")
	private UCLevelMan ucLevelMan;

	public UCLevelMan getUcLevelMan() {
		return ucLevelMan;
	}
	
	public void setUcLevelMan(UCLevelMan ucLevelMan) {
		this.ucLevelMan = ucLevelMan;
		setUcBase(ucLevelMan);
	}
	
	private Level level;

	public List<Level> getLevels() throws Exception {
		if (getClazz() == null)
			return null;
		return ucLevelMan.listLevels(getClazz().getId());
	}
	
	public Level getLevel() {
		return level;
	}
	
	public void newLevel() {
		super.newElement();
		this.level = new Level();
	}
	
	public void cancel() {
		super.cancelEdit();
		this.level = null;

	}
	
	public void edit(Level level) throws Exception {
		super.editElement();
		this.level = level;
	}
	
	public void save() throws Exception {
		this.level.setClassId(this.getClazz().getId());
		if (isNewElem())
			ucLevelMan.insert(level);
		else
			ucLevelMan.update(level);
		
		this.cancel();
	}

}
