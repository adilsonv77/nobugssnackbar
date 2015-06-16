package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="orders")
public class Orders implements java.io.Serializable {	
	private static final long serialVersionUID = 1L;
	
	private static int orderIdCounter;
	private Order order;
	private List<Order> orders;

	public Orders() {
		order = new Order();
		orders = new ArrayList<>();
		orders.add(order);
	}
	
	public List<Order> getOrders() {
		return orders;
	}

	@XmlElement(name="order",type=Order.class)
	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public static int getOrderIdCounter() {
		return orderIdCounter;
	}

	public static void setOrderIdCounter(int orderIdCounter) {
		Orders.orderIdCounter = orderIdCounter;
	}


}