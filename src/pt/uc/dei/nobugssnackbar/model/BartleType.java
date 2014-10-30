package pt.uc.dei.nobugssnackbar.model;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class BartleType {

	@RemoteProperty
	private String name;
	
	@RemoteProperty
	private int value;
	
	public BartleType() {
	}
	
	public BartleType(String name, int value) {
		super();
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}
	
	
	
}
