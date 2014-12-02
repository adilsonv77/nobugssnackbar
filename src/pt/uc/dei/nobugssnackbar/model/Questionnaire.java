package pt.uc.dei.nobugssnackbar.model;

import java.util.List;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class Questionnaire {

	@RemoteProperty
	private long id;

	@RemoteProperty
	private String description;

	@RemoteProperty
	private List<Question> questions;

	@RemoteProperty
	private String showRules;

	@RemoteProperty
	private long classId;

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

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	public String getShowRules() {
		return showRules;
	}

	public void setShowRules(String showRules) {
		this.showRules = showRules;
	}

	public long getClassId() {
		return classId;
	}

	public void setClassId(long classId) {
		this.classId = classId;
	}

}
