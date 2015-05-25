package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.List;
import java.util.ResourceBundle;

import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Command;
import pt.uc.dei.nobugssnackbar.model.Mission;
import pt.uc.dei.nobugssnackbar.model.mission.Customer;
import pt.uc.dei.nobugssnackbar.model.mission.Food;
import pt.uc.dei.nobugssnackbar.model.mission.Hint;
import pt.uc.dei.nobugssnackbar.model.mission.MissionContent;
import pt.uc.dei.nobugssnackbar.model.mission.Objective;
import pt.uc.dei.nobugssnackbar.model.mission.Objectives;
import pt.uc.dei.nobugssnackbar.model.mission.Order;
import pt.uc.dei.nobugssnackbar.model.mission.Page;
import pt.uc.dei.nobugssnackbar.model.mission.Randomization;


public class MissionToXML {

	private static String errorMessage;
	
	public static String getErrorMessage() {
		return errorMessage;
	}

	public static String missionToXML(Mission mission, MissionContent missionContent) {	
		if (verification(missionContent)) {
			ResourceBundle messageBundle = ApplicationMessages.getMessage();
			StringBuilder result = new StringBuilder();
			result.append("<?xml version='1.0'?>");
			/********************************************START MISSION*/
			if (mission.isRepeatable()) {
				result.append("<mission open=\"true\" timeLimit=\"");
				result.append(missionContent.getTimeLimit()).append("\">");
			}
			else {
				result.append("<mission>");
			}
			
			/********************************************START SLIDER*/
			if (mission.isRepeatable() && missionContent.getSlider().getTimesBefore() > 0) {
				result.append("<slider timesBefore=\"").
					append(missionContent.getSlider()).
					append(missionContent.getSlider().getTimesBefore()).
					append("\"/>");
			}
			/********************************************END SLIDER*/
			/******/
			/********************************************START EXPLANATION*/
			result.append("<explanation>");
			
			for (Page p : missionContent.getPages()) {
				result.append("<page>");
				result.append(p.getMsg());				
				result.append("</page>");
			}
					
			result.append("</explanation>");
			/********************************************END EXPLANATION*/
			/******/
			/********************************************START HINTS*/
			result.append("<hints>");
			
			result.append("<sequence>");
			for (Hint h : missionContent.getTipsHints()) {
				result.append("<hint ");
				if (h.getTime() > -1) { /*if you have any problem check here*/
					result.append("time=\"").append(h.getTime()).append("\" ");
				}
				if (h.getCategory() != null && h.getCategory() != "") {
					result.append("category=\"").append(h.getCategory()).append("\" ");
				}
				if (h.getConditionsAsString() != null && h.getConditionsAsString() != "") {
					result.append("condition=\"").append(h.getConditionsAsString()).append("\"");
				}
				if (h.getText() != null && h.getText() != "") {
					result.append(">"); // close hint tag
					result.append(h.getText());
					result.append("</hint>");
				}
				else {
					result.append("/>");
				}
			}
			result.append("</sequence>");
			
			result.append("<errors>");
			for (Hint h : missionContent.getErrorsHints()) {
				result.append("<hint ");
				if (h.getTime() > -1) { /*if you have any problem check here*/
					result.append("time=\"").append(h.getTime()).append("\" ");
				}
				if (h.getCategory() != null && h.getCategory() != "") {
					result.append("category=\"").append(h.getCategory()).append("\" ");
				}
				if (h.getConditionsAsString() != null && h.getConditionsAsString() != "") {
					result.append("condition=\"").append(h.getConditionsAsString()).append("\"");
				}
				if (h.getText() != null && h.getText() != "") {
					result.append(">"); // close hint tag
					result.append(h.getText());
					result.append("</hint>");
				}
				else {
					result.append("/>");
				}
			}
			result.append("</errors>");
			
			result.append("</hints>");
			/********************************************END HINTS*/
			/******/
			/********************************************START SELECTMACHINE*/
			/* select machine is not developed yet */
			/********************************************END SELECTMACHINE*/
			/******/
			/********************************************START COMMANDS*/
			result.append("<commands>");
			
			if (missionContent.getCommands() != null &&
				missionContent.getCommands().size() > 0) {
				for (Command c : missionContent.getCommands()) {
					result.append("<category name=\"").
						append(c.getName()).append("\"").
						append(" show=\"true\"").append("/>");
				}
			}
			
			result.append("</commands>");
			/********************************************END COMMANDS*/
			/******/
			/********************************************START COOK*/
			result.append("<cooker>");
			result.append(missionContent.getCook().getStartPosition());
			result.append("</cooker>");
			/********************************************END COOK*/
			/******/
			/********************************************START CUSTOMERSsn*/
			if (missionContent.getRandList() != null &&
				missionContent.getRandList().size() > 0) {
				
				
				result.append("<customersSN>");
				for (Randomization r : missionContent.getRandList()) {
					result.append("<randomization qtd=\"");
					result.append(r.getQtd()).append("\"");
					if (r.getSet() != null && r.getSet() != messageBundle.getString("new")) {
						result.append(" set=\"").append(r.getSet()).append("\"");
					}
					result.append(">"); // close randomization					
					result.append(r.getType());					
					result.append("</randomization>");
				}
				result.append("</customersSN>");
			}
			
			/********************************************END CUSTOMERSsn*/
			/******/
			/********************************************START CUSTOMERS*/
			result.append("<customers>");
			for (Customer cu : missionContent.getCustomers()) {
				if (checkOrder(cu)) {
					result.append("<customer");
					if (cu.getRandomType() != null && cu.getRandomType() != "" &&
						cu.getRandomType() != messageBundle.getString("none")) {
						result.append(" randomType=\"").append(cu.getRandomType()).append("\"");
					}
					result.append(">");
					result.append("<id>").append(cu.getId()).append("</id>");
					result.append("<init>").append(cu.getInit()).append("</init>");
					result.append("<dest>").append(cu.getDest()).append("</dest>");
					if (cu.getPattern().getOrders().size() > 1) {
						result.append("<pattern>");
						for (Order o : cu.getPattern().getOrders()) {
							result.append("<order>");
							result.append(xmlOfFoodsAndDrinks(o));
							result.append("</order>");
						}
						result.append("</pattern>");
					}
					else if (cu.getPattern().getOrders().size() > 0) {
						result.append(xmlOfFoodsAndDrinks(cu.getPattern().getOrders().get(0)));
					}
					
					result.append("</customer>");
				}
			}
			result.append("</customers>");
			/********************************************END CUSTOMERS*/
			/******/
			/********************************************START OBJECTIVES*/
			Objectives obj = missionContent.getObjectives();
			result.append("<objectives");
			result.append(" ordered=\"").append(obj.isOrdered()).append("\"");
			if (obj.getReward() != 0) {
				result.append(" reward=\"").append(obj.getReward()).append("\"");
			}
			if (obj.isBoolCommandQty()) {
				result.append(" commQtd=\"").append(obj.getCommQtd()).append("\"");
			}
			if (obj.isBoolVariableQty()) {
				result.append(" varQtd=\"").append(obj.getVarQtd()).append("\"");
			}
			if (obj.isBoolBonusTime()) {
				result.append(" bonusTime=\"").append(obj.getBonusTime()).append("\"");
				result.append(" bonusTimeReward=\"").append(obj.getBonusTimeReward()).append("\"");
			}
			if (obj.isBoolMaxCommands()) {
				result.append(" maxCommands=\"").append(obj.getMaxCommands()).append("\"");
				result.append(" maxCommandsReward=\"").append(obj.getMaxCommandsReward()).append("\"");
			}
			result.append(" variableWindow=\"").append(obj.isVariableWindow()).append("\"");
			result.append(" buttonDebug=\"").append(obj.isButtonDebug()).append("\"");
			result.append(" buttonRun=\"").append(obj.isButtonRun()).append("\"");
			result.append(" buttonBuy=\"").append(obj.isButtonBuy()).append("\"");
			result.append(">");
			if (!mission.isRepeatable()) {
				if (obj.getObjectiveList() != null && obj.getObjectiveList().size() > 0) {
					for (Objective o : obj.getObjectiveList()) {
						result.append("<objective pos=\"");
						result.append(o.getPos()).append("\"");
						if (o.getPlace() != null && o.getPlace() != "") {
							result.append(" place=\"").append(o.getPlace()).append("\"");
						}
						result.append(" distinct=\"").append(o.isDistinct()).append("\"");
						result.append(">");
						result.append(o.getValue());
						result.append("</objective>");
					}
				}
				
				result.append("</objectives>");
			}
			else {
				result.append("/>");
			}
			
			/********************************************END OBJECTIVES*/
			/******/
			/********************************************START XML Blocks*/
			result.append("<xml");
			if (missionContent.getXmltag().getPreload() > -1) {
				result.append(" preload=\"").
				append(missionContent.getXmltag().getPreload()).
				append("\"");
			}
			result.append(" alwaysNew=\"").
			append(missionContent.getXmltag().isAlwaysNew()).
			append("\"");
			result.append(">");
/*************You should ask for this!!!!!!!!*/
			FacesContext ctx = FacesContext.getCurrentInstance();
			String content = (String) ctx.getExternalContext().getSessionMap().get("blocks");
			result.append(content);
			result.append("</xml>");
			
			/********************************************END XML Blocks*/
			
			result.append("</mission>");
			/********************************************END MISSION*/
			
			return result.toString();
		}
		
		return null;
	}
	
	private static StringBuilder xmlOfFoodsAndDrinks(Order order) {
		StringBuilder result = new StringBuilder();
		result.append("<foods");
		/* if there is some changes random max should be greater than 0 */
		if (order.getRandomMaxFoods() != 0) {
			result.append(" randomMin=\"").
				append(order.getRandomMinFoods()).append("\"");
			result.append(" randomMax=\"").
			append(order.getRandomMaxFoods()).append("\"");
		}
		if (order.isDifferentFromPrevFoods()) {
			result.append(" differentFromPrevious=\"").
				append(order.isDifferentFromPrevFoods()).append("\"");
		}
		result.append(">");
		
		for (Food f : order.getFoods()) {
			result.append("<food");
			result.append(" qtd=\"").append(f.getQtd()).append("\"");
			result.append(" price=\"").append(f.getPrice()).append("\">");
			result.append(f.getName());
			result.append("</food>");
		}
		result.append("</foods>");
		
		result.append("<drinks");
		/* if there is some changes random max should be greater than 0 */
		if (order.getRandomMaxFoods() != 0) {
			result.append(" randomMin=\"").
				append(order.getRandomMinFoods()).append("\"");
			result.append(" randomMax=\"").
			append(order.getRandomMaxFoods()).append("\"");
		}
		if (order.isDifferentFromPrevFoods()) {
			result.append(" differentFromPrevious=\"").
				append(order.isDifferentFromPrevFoods()).append("\"");
		}
		result.append(">");
		
		for (Food f : order.getFoods()) {
			result.append("<drink");
			result.append(" qtd=\"").append(f.getQtd()).append("\"");
			result.append(" price=\"").append(f.getPrice()).append("\">");
			result.append(f.getName());
			result.append("</drink>");
		}
		result.append("</drinks>");
		
		return result;
	}
	
	public static boolean verification(MissionContent missionContent) {
		errorMessage = "";
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		
		if (missionContent.getPages() == null ||
			missionContent.getPages().size() == 0) {
			errorMessage = messageBundle.getString("missingExplPageError");
		}
		else if (missionContent.getCustomers() == null || 
				 missionContent.getCustomers().size() == 0) {
			errorMessage = messageBundle.getString("missingCustomerError");
		}
		else if (!checkOrders(missionContent.getCustomers())) {
			errorMessage = messageBundle.getString("missingOrderError");
		}
		else if (missionContent.getObjectives() == null ||
				missionContent.getObjectives().getObjectiveList() == null ||
				missionContent.getObjectives().getObjectiveList().size() == 0) {
			errorMessage = messageBundle.getString("missingObjectiveError");
		}
		else if ((missionContent.getCommands() == null ||
				 missionContent.getCommands().size() == 0) &&
				 missionContent.isSelectedLoadBlocks() == false) {
			errorMessage = messageBundle.getString("notSelectedCommandOrBlockError");
		}
		else {
			return true;
		}
		
		return false;
	}
	
	private static boolean checkOrders(List<Customer> customers) {		
		if (customers != null) {
			for (int i = 0; i < customers.size(); i++) {
				if (checkOrder(customers.get(i))) {
					return true;
				}
			}
		}
		
		return false;
	}

	private static boolean checkOrder(Customer customer) {
		List<Order> orders = customer.getPattern().getOrders();
		if (orders != null) {
			for (int j = 0; j < orders.size(); j++) {
				if ((orders.get(j).getDrinks() != null && orders.get(j).getDrinks().size() > 0) ||
					(orders.get(j).getFoods() != null && orders.get(j).getFoods().size() > 0)) {
					return true;
				}
			}
		}
		return true;
	}
}
