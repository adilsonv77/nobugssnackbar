package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.ExtraLevel;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCExtraLevelMan;

@ManagedBean(name="extralevelman")
@ViewScoped
public class BeanExtraLevel extends BeanBase {
	
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucextralevelman}")
	private UCExtraLevelMan ucExtraLevelMan;

	public UCExtraLevelMan getUcExtraLevelMan() {
		return ucExtraLevelMan;
	}
	
	public void setUcExtraLevelMan(UCExtraLevelMan ucExtraLevelMan) {
		this.ucExtraLevelMan = ucExtraLevelMan;
		setUcBase(ucExtraLevelMan);
	}
	
	private ExtraLevel level;

	public List<ExtraLevel> getLevels() throws Exception {
		if (getClazz() == null)
			return null;
		return ucExtraLevelMan.listLevels(getClazz().getId());
	}
	
	public ExtraLevel getLevel() {
		return level;
	}
	
	public void newLevel() {
		super.newElement();
		this.level = new ExtraLevel();
	}
	
	public void cancel() {
		super.cancelEdit();
		this.level = null;

	}
	
	public void edit(ExtraLevel level) throws Exception {
		super.editElement();
		this.level = level;
	}
	
	public void save() throws Exception {
		this.level.setClassId(this.getClazz().getId());
		if (isNewElem())
			ucExtraLevelMan.insert(level);
		else
			ucExtraLevelMan.update(level);
		
		this.cancel();
	}

}
