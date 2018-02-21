package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCBase;
import pt.uc.dei.nobugssnackbar.uc.web.util.AuthenticationUtil;

public abstract class BeanBase implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private UCBase ucBase;
	
	public void setUcBase(UCBase ucBase) {
		this.ucBase = ucBase;
	}
	
	private List<Clazz> classes;

	public List<Clazz> getClazzes() throws Exception {
		return classes;
	}

	@PostConstruct
	public void init() {
		try {
			classes = ucBase.listClasses(AuthenticationUtil.getUserFromSession());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	private Clazz clazz;

	public Clazz getClazz() {
		return clazz;
	}
	
	public void setClazz(Clazz clazz) throws Exception {
		this.clazz = clazz;
	}
	
	private boolean showForm;

	private boolean newElem;

	public boolean isNewElem() {
		return newElem;
	}
	
	public boolean isShowForm() {
		return showForm;
	}
	
	protected final void newElement() {
		this.showForm = true;
		this.newElem = true;
	}

	protected final void cancelEdit() {
		this.showForm = false;
	}

	protected final void editElement() {
		this.showForm = true;
		this.newElem = false;
	}
}
