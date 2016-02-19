package pt.uc.dei.nobugssnackbar.model;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject()
public class Achievement {
	
	@RemoteProperty
	private int id;
	
	@RemoteProperty
	private String title;
	
	@RemoteProperty
	private String description;
	
	@RemoteProperty
	private int rewardXP;
	
	@RemoteProperty
	private int rewardIcon;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getRewardXP() {
		return rewardXP;
	}

	public void setRewardXP(int rewardXP) {
		this.rewardXP = rewardXP;
	}

	public int getRewardIcon() {
		return rewardIcon;
	}

	public void setRewardIcon(int rewardIcon) {
		this.rewardIcon = rewardIcon;
	}

	
	
}
