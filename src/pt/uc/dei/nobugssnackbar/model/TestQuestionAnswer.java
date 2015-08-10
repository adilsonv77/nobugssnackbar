package pt.uc.dei.nobugssnackbar.model;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class TestQuestionAnswer {

	private long missionId;
	
	@RemoteProperty
	private String answer;
	
	@RemoteProperty
	private int timeSpend;

	public long getMissionId() {
		return missionId;
	}

	public void setMissionId(long missionId) {
		this.missionId = missionId;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
	public int getTimeSpend() {
		return timeSpend;
	}
	
	public void setTimeSpend(int timeSpend) {
		this.timeSpend = timeSpend;
	}
	
}
