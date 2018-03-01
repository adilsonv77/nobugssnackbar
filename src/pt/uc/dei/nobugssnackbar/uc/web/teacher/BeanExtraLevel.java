package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import pt.uc.dei.nobugssnackbar.model.ExtraLevel;
import pt.uc.dei.nobugssnackbar.model.User;
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
	
	public BeanExtraLevel() {
		this.studentToAdd = new User(0);
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
		this.studentsToAdd = null; 
		this.studentsAdded = null;
	}
	
	public void cancel() {
		super.cancelEdit();
		this.level = null;
		this.studentsToAdd = null;
		this.studentsAdded = null;

	}
	
	public void edit(ExtraLevel level) throws Exception {
		super.editElement();
		this.level = level;
		this.studentsToAdd = null;
		this.studentsAdded = null;
	}
	
	public void save() throws Exception {
		this.level.setClassId(this.getClazz().getId());
		if (isNewElem())
			ucExtraLevelMan.insert(level);
		else
			ucExtraLevelMan.update(level);
		
		ucExtraLevelMan.saveStudents(level, studentsAdded);
		
		this.cancel();
	}
	
	private User studentToAdd;
	
	public User getStudentToAdd() {
		return studentToAdd;
	}
	
	public void setStudentToAdd(User studentToAdd) {
		this.studentToAdd = studentToAdd;
	}
	
	private List<User> studentsToAdd;
	
	public List<User> getStudentsToAdd() throws Exception {
		if (this.level != null && (studentsToAdd == null || studentsToAdd.size() == 0) && this.getClazz() != null) {
			studentsAdded = new ArrayList<>();
			studentsToAdd = ucExtraLevelMan.listStudentsFromLevel(this.getClazz().getId(), this.level.getId(), studentsAdded);
				
		}
		return studentsToAdd;
	}

	private List<User> studentsAdded;
	
	public List<User> getStudentsAdded() {
		return studentsAdded;
	}
	
	public void setStudentsAdded(List<User> studentsAdded) {
		this.studentsAdded = studentsAdded;
	}
}
