package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;

public class HintCategoryProperty implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;
	private Object value;
	private boolean required;
	
	public HintCategoryProperty(String name, Object value) {
		this.name = name;
		this.value = value;
	}

	public HintCategoryProperty(String name, Object value, boolean required) {
		this.name = name;
		this.value = value;
		this.required = required;
	}

	public HintCategoryProperty(String name, boolean required) {
		this.name = name;
		this.required = required;
	}
	
	public HintCategoryProperty() {
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return name;
	}
	
	public Object getValue() {
		return value;
	}
	
	public boolean isRequired() {
		return required;
	}
	
	public void setValue(Object value) {
		this.value = value;
	}

}
