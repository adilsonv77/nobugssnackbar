package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;
import java.util.ArrayList;

public class Objectives  implements Serializable {
	private static final long serialVersionUID = 1L;
	private Objective objectiveItem = new Objective();
	private ArrayList<Objective> objectiveList = new ArrayList<Objective>();
	private boolean ordered;
	private boolean buttonDebug;
	private boolean buttonRun;
	private boolean buttonBuy;
	private boolean variableWindow;
	private int reward;
	private int commQtd;
	private int maxCommands;
	private int maxCommandsReward;
	private int varQtd;
	private String bonusTime;
	private String bonusTimeReward;
	
	
	public ArrayList<Objective> getObjectiveList() {
		return objectiveList;
	}
	public Objective getObjectiveItem() {
		return objectiveItem;
	}
	public boolean isOrdered() {
		return ordered;
	}
	public boolean isButtonDebug() {
		return buttonDebug;
	}
	public boolean isButtonRun() {
		return buttonRun;
	}
	public boolean isButtonBuy() {
		return buttonBuy;
	}
	public boolean isVariableWindow() {
		return variableWindow;
	}
	public int getReward() {
		return reward;
	}
	public int getCommQtd() {
		return commQtd;
	}
	public int getMaxCommands() {
		return maxCommands;
	}
	public int getMaxCommandsReward() {
		return maxCommandsReward;
	}
	public int getVarQtd() {
		return varQtd;
	}
	public String getBonusTime() {
		return bonusTime;
	}
	public String getBonusTimeReward() {
		return bonusTimeReward;
	}
	
	public void setObjectiveItem(Objective objectiveItem) {
		this.objectiveItem = objectiveItem;
	}
	public void setOrdered(boolean ordered) {
		this.ordered = ordered;
	}
	public void setButtonDebug(boolean buttonDebug) {
		this.buttonDebug = buttonDebug;
	}
	public void setButtonRun(boolean buttonRun) {
		this.buttonRun = buttonRun;
	}
	public void setButtonBuy(boolean buttonBuy) {
		this.buttonBuy = buttonBuy;
	}
	public void setVariableWindow(boolean variableWindow) {
		this.variableWindow = variableWindow;
	}
	public void setReward(int reward) {
		this.reward = reward;
	}
	public void setCommQtd(int commQtd) {
		this.commQtd = commQtd;
	}
	public void setMaxCommands(int maxCommands) {
		this.maxCommands = maxCommands;
	}
	public void setMaxCommandsReward(int maxCommandsReward) {
		this.maxCommandsReward = maxCommandsReward;
	}
	public void setVarQtd(int varQtd) {
		this.varQtd = varQtd;
	}
	public void setBonusTime(String bonusTime) {
		this.bonusTime = bonusTime;
	}
	public void setBonusTimeReward(String bonusTimeReward) {
		this.bonusTimeReward = bonusTimeReward;
	}
	
	public void addObjective() {
		this.objectiveList.add(this.objectiveItem);
		this.objectiveItem = new Objective();
	}
}