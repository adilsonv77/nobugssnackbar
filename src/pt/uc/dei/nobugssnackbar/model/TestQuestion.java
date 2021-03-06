package pt.uc.dei.nobugssnackbar.model;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class TestQuestion {

	@RemoteProperty
	private long id;
	
	@RemoteProperty
	private String description;
	
	@RemoteProperty
	private String blocks;
	
	@RemoteProperty
	private boolean updateBlocks;
	
	@RemoteProperty
	private String question;
	
	@RemoteProperty
	private String answerType;
	
	@RemoteProperty
	private int timeLimit;
	
	@RemoteProperty
	private int xpReward;
	
	@RemoteProperty
	private int xpRewardBlank;
	
	@RemoteProperty
	private String language;
	
	@RemoteProperty
	private String toolbox;
	
	@RemoteProperty
	private String answer;

	@RemoteProperty
	private TestQuestionAnswer previousAnswer;
	
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

	public String getBlocks() {
		return blocks;
	}

	public void setBlocks(String blocks) {
		this.blocks = blocks;
	}

	public boolean isUpdateBlocks() {
		return updateBlocks;
	}

	public void setUpdateBlocks(boolean updateBlocks) {
		this.updateBlocks = updateBlocks;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswerType() {
		return answerType;
	}

	public void setAnswerType(String answerType) {
		this.answerType = answerType;
	}

	public int getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(int timeLimit) {
		this.timeLimit = timeLimit;
	}

	public int getXpReward() {
		return xpReward;
	}

	public void setXpReward(int xpReward) {
		this.xpReward = xpReward;
	}

	public int getXpRewardBlank() {
		return xpRewardBlank;
	}

	public void setXpRewardBlank(int xpRewardBlank) {
		this.xpRewardBlank = xpRewardBlank;
	}

	public String getLanguage() {
		return language;
	}
	
	public void setLanguage(String language) {
		this.language = language;
	}
	
	public String getToolbox() {
		return toolbox;
	}

	public void setToolbox(String toolbox) {
		this.toolbox = toolbox;
	}

	public String getAnswer() {
		return answer;
	}
	
	public void setAnswer(String answer) {
		this.answer = answer; 
	}

	public TestQuestionAnswer getPreviousAnswer() {
		return previousAnswer;
	}
	
	public void setPreviousAnswer(TestQuestionAnswer answer) {

		this.previousAnswer = answer;
		
	}
	
}
