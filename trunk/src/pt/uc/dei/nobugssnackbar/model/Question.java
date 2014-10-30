package pt.uc.dei.nobugssnackbar.model;

import java.util.List;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class Question {

	@RemoteProperty
	private long id;
	
	@RemoteProperty
	private String description;
	
	@RemoteProperty
	private boolean required;
	
	@RemoteProperty
	private String type;
	
	@RemoteProperty
	private List<QuestionOption> options;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isRequired() {
		return required;
	}
	public void setRequired(boolean required) {
		this.required = required;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public List<QuestionOption> getOptions() {
		return options;
	}
	public void setOptions(List<QuestionOption> options) {
		this.options = options;
	}
	
	
	
}
