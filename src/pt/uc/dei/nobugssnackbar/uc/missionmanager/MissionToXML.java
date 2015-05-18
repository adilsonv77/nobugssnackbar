package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.List;
import java.util.ResourceBundle;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Mission;
import pt.uc.dei.nobugssnackbar.model.mission.Customer;
import pt.uc.dei.nobugssnackbar.model.mission.MissionContent;
import pt.uc.dei.nobugssnackbar.model.mission.Order;


public class MissionToXML {

	private static String errorMessage;
	
	public static String getErrorMessage() {
		return errorMessage;
	}

	public static String missionToXML(Mission mission, MissionContent missionContent) {	
		if (verification(missionContent)) {
			StringBuilder result = new StringBuilder();
			result.append("<?xml version='1.0'?>");
			
			return result.toString();
		}
		
		return null;
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
				List<Order> orders = customers.get(i).getPattern().getOrders();
				if (orders != null) {
					for (int j = 0; j < orders.size(); j++) {
						if ((orders.get(j).getDrinks() != null && orders.get(j).getDrinks().size() > 0) ||
							(orders.get(j).getFoods() != null && orders.get(j).getFoods().size() > 0)) {
							return true;
						}
					}
				}
			}
		}
		
		return false;
	}
}
