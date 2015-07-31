package pt.uc.dei.nobugssnackbar.model;

import java.util.ArrayList;
import java.util.List;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class Test {

	@RemoteProperty
	private long id;
	
	@RemoteProperty
	private String description;
	
	@RemoteProperty
	private int timeXP;
	
	@RemoteProperty
	private int timeRewardXP;
	
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
	
	@RemoteProperty
	private List<TestQuestion> questions;
	
	public List<TestQuestion> getQuestions() {
		if (questions == null)
			questions = new ArrayList<TestQuestion>();
		return questions;
	}
	
	public void setQuestions(List<TestQuestion> questions) {
		this.questions = questions;
	}

	public int getTimeXP() {
		return timeXP;
	}

	public void setTimeXP(int timeXP) {
		this.timeXP = timeXP;
	}

	public int getTimeRewardXP() {
		return timeRewardXP;
	}

	public void setTimeRewardXP(int timeRewardXP) {
		this.timeRewardXP = timeRewardXP;
	}
	
	
}
