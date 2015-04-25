package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;

public class Pattern implements java.io.Serializable {	
	private static final long serialVersionUID = 1L;
	
	private int orderIdCounter;
	private Order order;
	private List<Order> orders;

	public Pattern() {
		order = new Order();
		orders = new ArrayList<>();
		orders.add(order);
	}
	
	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public int getOrderIdCounter() {
		return orderIdCounter;
	}

	public void setOrderIdCounter(int orderIdCounter) {
		this.orderIdCounter = orderIdCounter;
	}

}