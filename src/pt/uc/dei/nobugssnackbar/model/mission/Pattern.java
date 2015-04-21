package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;

public class Pattern implements java.io.Serializable {	
	private static final long serialVersionUID = 1L;
	
	private Order order;
	private List<Order> orders;

	public Pattern() {
		order = new Order();
		orders = new ArrayList<>();
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
}