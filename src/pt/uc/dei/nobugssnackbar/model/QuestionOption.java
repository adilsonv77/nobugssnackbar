package pt.uc.dei.nobugssnackbar.model;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class QuestionOption {
	
	@RemoteProperty
	private String description;
	
	@RemoteProperty
	private String value;

	public QuestionOption() {
	}


	public QuestionOption(String description, String value) {
		super();
		this.description = description;
		this.value = value;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	

}
