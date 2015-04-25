package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;

import org.primefaces.context.RequestContext;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Customer;
import pt.uc.dei.nobugssnackbar.model.mission.Drink;
import pt.uc.dei.nobugssnackbar.model.mission.Food;
import pt.uc.dei.nobugssnackbar.model.mission.Foodstuff;
import pt.uc.dei.nobugssnackbar.model.mission.Order;

@ManagedBean(name="custVC")
@ViewScoped
public class CustomerVC implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Food food;
	private Drink drink;
	private Foodstuff foodstuff;
	private Customer customer;
	private List<Customer> customers;
	private int customersPlaceId;
	
	// true - food, false - drink
	private boolean foodstuffType;

	public CustomerVC() {
		foodstuff = new Foodstuff();
		customer = new Customer();
		
		customers = new ArrayList<>(12);
		for (int i = 0; i < 12; i++) {
			customers.add(new Customer());
		}
	}
	
	public void newOrder() {
		if (checkFields(customer.getPattern().getOrder())) {
			Order order = customer.getPattern().getOrder();
			int index = customer.getPattern().getOrders().indexOf(order);
			
			if (index >= 0) {
				customer.getPattern().getOrders().set(index, order);
				customer.getPattern().setOrder(new Order());
				order = customer.getPattern().getOrder();
				int id = customer.getPattern().getOrderIdCounter() + 1;
				customer.getPattern().setOrderIdCounter(id);
				order.setId(id);
				customer.getPattern().getOrders().add(order);
			}
		}
	}
	
	public void deleteFood() {
		if (food != null) {
			customer.getPattern().getOrder().getFoods().remove(this.food);
			resetFood();
		}
	}
	
	public void resetFood() {
		food = null;
	}

	public void deleteDrink() {
		if (drink != null) {
			customer.getPattern().getOrder().getDrinks().remove(this.drink);
			resetDrink();
		}
	}
	
	public void resetDrink() {
		drink = null;		
	}

	public void handleCustomer(ActionEvent event) {
		customersPlaceId = Integer.parseInt((String) event.
				getComponent().getAttributes().get("customersPlaceId"));
		
		if (customersPlaceId >= 0 && customersPlaceId < customers.size()) {
			if (customers.get(customersPlaceId).getId() < 0) {
				// edit customer
				customer = customers.get(customersPlaceId);
			}
		}
	}
	
	private boolean checkFields(Order order) {
		int maxDrinks = order.getRandomMaxDrinks();
		int minDrinks = order.getRandomMinDrinks();
		int maxFoods = order.getRandomMaxFoods();
		int minFoods = order.getRandomMinFoods();
                
		if (minFoods > maxFoods || minDrinks > maxDrinks) {
			ResourceBundle msg = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			context.addMessage(null, new FacesMessage(msg.getString("rndMinCannotGreater"), ""));
			
			return false;
		}
		/*if (order.getFoods().size() <= 0 || order.getDrinks().size() <= 0) {
			ResourceBundle msg = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			context.addMessage(null, new FacesMessage(msg.getString("noOrder"), ""));
			
			return false;
		}*/
		
		return true;
	}
	
	public void saveCustomer() {                
		if (checkFields(customer.getPattern().getOrder())) {
			customers.set(customersPlaceId, customer);
			customer = new Customer();
			RequestContext rcontext = RequestContext.getCurrentInstance();
			rcontext.execute("PF('customerDlg').hide()");
		}
	}
	
	public void addFoodstuff() {
		if (foodstuff.getName().isEmpty() ||
			foodstuff.getQtd() <= 0 ||
			foodstuff.getPrice().compareTo(new BigDecimal("0")) <= 0) {
			
			ResourceBundle messageBundle = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
	        context.addMessage(null, new FacesMessage(
	        		messageBundle.getString("warningMsg"),
	        		messageBundle.getString("notFilledAllFields") + " " + 
	        		messageBundle.getString("correctly")));
		}
		else {
			if (foodstuffType == true) {
				// it is food
				Food ffood = new Food();
				ffood.setName(foodstuff.getName());
				ffood.setPrice(foodstuff.getPrice());
				ffood.setQtd(foodstuff.getQtd());
				if (food != null) {
					int index = customer.getPattern().getOrder().getFoods().indexOf(food);
					customer.getPattern().getOrder().getFoods().set(index, ffood);
				}
				else {
					customer.getPattern().getOrder().getFoods().add(ffood);
				}
			}
			else {
				// it is drink
				Drink ddrink = new Drink();
				ddrink.setName(foodstuff.getName());
				ddrink.setPrice(foodstuff.getPrice());
				ddrink.setQtd(foodstuff.getQtd());
				
				if (drink != null) {
					int index = customer.getPattern().getOrder().getDrinks().indexOf(drink);
					customer.getPattern().getOrder().getDrinks().set(index, ddrink);
				}
				else {
					customer.getPattern().getOrder().getDrinks().add(ddrink);
				}
			}
			reset();
			RequestContext rcontext = RequestContext.getCurrentInstance();
			rcontext.execute("PF('addFoodstuffDlg').hide()");
		}
	}
	
	public void reset() {
		foodstuff = new Foodstuff();
		food = null;
		drink = null;
	}

	public List<Customer> getCustomers() {
		return customers;
	}

	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public boolean isFoodstuffType() {
		return foodstuffType;
	}

	public void setFoodstuffType(boolean foodstuffType) {
		this.foodstuffType = foodstuffType;
	}

	public Foodstuff getFoodstuff() {
		return foodstuff;
	}

	public void setFoodstuff(Foodstuff foodstuff) {
		this.foodstuff = foodstuff;
	}

	public int getCustomersPlaceId() {
		return customersPlaceId;
	}

	public void setCustomersPlaceId(int customersPlaceId) {
		this.customersPlaceId = customersPlaceId;
	}

	public Food getFood() {
		return food;
	}

	public void setFood(Food food) {
		this.food = food;
		setFoodstuffType(true);
		foodstuff = (Foodstuff)  this.food;
	}

	public Drink getDrink() {
		return drink;
	}

	public void setDrink(Drink drink) {
		this.drink = drink;
		setFoodstuffType(false);
		foodstuff = (Foodstuff)  this.drink;
	}

}
