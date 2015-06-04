package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;
import java.util.ArrayList;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="objectives")
@XmlAccessorType(XmlAccessType.NONE)
public class Objectives  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Objective objectiveItem = new Objective();
	
	@XmlElement(name="objective",type=Objective.class)
	private ArrayList<Objective> objectiveList = new ArrayList<Objective>();
	
	@XmlAttribute(name="ordered")
	private boolean ordered;
	
	@XmlAttribute(name="buttonDebug")
	private boolean buttonDebug;
	
	@XmlAttribute(name="buttonRun")
	private boolean buttonRun;
	
	@XmlAttribute(name="buttonBuy")
	private boolean buttonBuy;
	
	@XmlAttribute(name="variableWindow")
	private boolean variableWindow;
	
	@XmlAttribute(name="reward")
	private int reward;
	
	@XmlAttribute(name="commQtd")
	private int commQtd;
	
	@XmlAttribute(name="maxCommands")
	private int maxCommands;
	
	@XmlAttribute(name="maxCommandsReward")
	private int maxCommandsReward;
	
	@XmlAttribute(name="varQtd")
	private int varQtd;
	
	@XmlAttribute(name="bonusTime")
	private String bonusTime;
	
	@XmlAttribute(name="bonusTimeReward")
	private String bonusTimeReward;
	
	
	private boolean boolVariableQty;
	private boolean boolCommandQty;
	private boolean boolMaxCommands;
	private boolean boolBonusTime;
	
	public Objectives() {
		variableWindow = true;
		buttonDebug = true;
		buttonRun = true;
		boolMaxCommands = false;
		boolBonusTime = false;
		reward = -1;
	}
	
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
	public boolean isBoolVariableQty() {
		return boolVariableQty;
	}
	public void setBoolVariableQty(boolean isVariableQty) {
		this.boolVariableQty = isVariableQty;
	}
	public boolean isBoolCommandQty() {
		return boolCommandQty;
	}
	public void setBoolCommandQty(boolean isCommandQty) {
		this.boolCommandQty = isCommandQty;
	}
	public boolean isBoolMaxCommands() {
		return boolMaxCommands;
	}
	public void setBoolMaxCommands(boolean isMaxCommands) {
		this.boolMaxCommands = isMaxCommands;
	}
	public boolean isBoolBonusTime() {
		return boolBonusTime;
	}
	public void setBoolBonusTime(boolean isBonusTime) {
		this.boolBonusTime = isBonusTime;
	}
}