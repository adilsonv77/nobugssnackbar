package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@SuppressWarnings("serial")
@DataTransferObject()
public class Achievement implements Serializable {
	
	@RemoteProperty
	private int id;
	
	@RemoteProperty
	private String title;

	@RemoteProperty
	private Map<String, String> titleFields;
	
	@RemoteProperty
	private String description;

	@RemoteProperty
	private Map<String, String> descriptionFields;
	
	@RemoteProperty
	private int rewardXP;
	
	@RemoteProperty
	private int rewardCoins;
	
	@RemoteProperty
	private boolean achieved;
	
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

	public int getRewardCoins() {
		return rewardCoins;
	}

	public void setRewardCoins(int rewardCoins) {
		this.rewardCoins = rewardCoins;
	}

	public Map<String, String> getDescriptionFields() {
		if (descriptionFields == null)
			descriptionFields = new HashMap<>();
		return descriptionFields;
	}
	
	public void setDescriptionFields(Map<String, String> descriptionFields) {
		this.descriptionFields = descriptionFields;
	}
	
	public Map<String, String> getTitleFields() {
		if (titleFields == null)
			titleFields = new HashMap<>();
		return titleFields;
	}
	
	public void setTitleFields(Map<String, String> titleFields) {
		this.titleFields = titleFields;
	}
	
	public boolean isAchieved() {
		return achieved;
	}
	
	public void setAchieved(boolean achieved) {
		this.achieved = achieved;
	}
}
