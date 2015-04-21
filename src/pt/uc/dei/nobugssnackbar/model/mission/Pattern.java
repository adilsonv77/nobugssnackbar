package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.List;

public class Pattern implements java.io.Serializable {	
	private static final long serialVersionUID = 1L;
	
	private List<Order> orders;

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
}