package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;

public class HintCategoryProperty implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;
	private Object value;
	private boolean required;
	private List<?> items;
	private String type ;
	private boolean selected = false;

	private String el;

	private String updateComponent;

	private HintCategoryHelperView hintCategoryHelperView;
	
	public HintCategoryProperty(HintCategoryHelperView hintCategoryHelperView, String name, Object value) {
		this.hintCategoryHelperView = hintCategoryHelperView;
		this.name = name;
		this.value = value;
	}

	public HintCategoryProperty(HintCategoryHelperView hintCategoryHelperView, String name, Object value, boolean required) {
		this.hintCategoryHelperView = hintCategoryHelperView;
		this.name = name;
		this.value = value;
		this.required = required;
	}

	public HintCategoryProperty(HintCategoryHelperView hintCategoryHelperView, String name, boolean required) {
		this.hintCategoryHelperView = hintCategoryHelperView;
		this.name = name;
		this.required = required;
	}
	
	public HintCategoryProperty(HintCategoryHelperView hintCategoryHelperView, String name, List<?> items, boolean required) {
		this.hintCategoryHelperView = hintCategoryHelperView;
		this.name = name;
		this.required = required;
		this.items = items;
	}
		
	public HintCategoryProperty() {
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
	
	public List<?> getItems() {
		return items;
	}
	
	public void setItems(List<?> items) {
		this.items = items;
	}

	public String getEl() {
		return el;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public void setProviderEL(String el) {
		this.el = el;
	}
	
	public HintCategoryHelperView getHintCategoryHelperView() {
		return hintCategoryHelperView;
	}
	
	private void updates(String name, Object value) {
		String s = this.hintCategoryHelperView.dealEl(el);
		this.items = ApplicationUtils.processEL(s, List.class);			
	}

	public String getUpdateComponent() {
		return updateComponent;
	}
	
	public void setUpdate(String updateComponent) {
		this.updateComponent = updateComponent;
		
	}
		
	public void updateValues() {
		this.selected = true;
		this.hintCategoryHelperView.setItemSelected(true);
		List<HintCategoryProperty> props = this.hintCategoryHelperView.getProperties();
		for (HintCategoryProperty hcp:props){
			if (hcp.getName().equals(this.updateComponent)){
				hcp.updates(getName(), value);
			}
		}
		for (HintCategoryProperty hcp:props){
			System.out.println("type:" + hcp.getType().equals("list") + " selected:" +hcp.selected );
			if(hcp.getType().equals("list") && !hcp.selected && (hcp.items.size() > 0)){
				this.hintCategoryHelperView.setItemSelected(false);
			}
		}
	}


}
