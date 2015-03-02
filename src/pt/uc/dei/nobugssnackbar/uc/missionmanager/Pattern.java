package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.ArrayList;

public class Pattern {
	private Order order = new Order();
	private ArrayList<Order> orders = new ArrayList<Order>();
	
	public ArrayList<Order> getOrders() {
		return orders;
	}
	
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	
	public void addOrder() {
		if (order != null) {
			orders.add(order);
		}
		order = new Order();
	}
}