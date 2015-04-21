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

import org.primefaces.context.RequestContext;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Customer;
import pt.uc.dei.nobugssnackbar.model.mission.Drink;
import pt.uc.dei.nobugssnackbar.model.mission.Food;
import pt.uc.dei.nobugssnackbar.model.mission.Foodstuff;

@ManagedBean(name="custVC")
@ViewScoped
public class CustomerVC implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Foodstuff foodstuff;
	private Customer customer;
	private List<Customer> customers;
	
	// true - food, false - drink
	private boolean foodstuffType;

	public CustomerVC() {
		foodstuff = new Foodstuff();
		customer = new Customer();
		customers = new ArrayList<>();
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
				Food food = new Food();
				food.setName(foodstuff.getName());
				food.setPrice(foodstuff.getPrice());
				food.setQtd(foodstuff.getQtd());
				customer.getPattern().getOrder().getFoods().add(food);
			}
			else {
				// it is drink
				Drink drink = new Drink();
				drink.setName(foodstuff.getName());
				drink.setPrice(foodstuff.getPrice());
				drink.setQtd(foodstuff.getQtd());
				customer.getPattern().getOrder().getDrinks().add(drink);
			}
			
			foodstuff = new Foodstuff();
			RequestContext rcontext = RequestContext.getCurrentInstance();
			rcontext.execute("PF('addFoodstuffDlg').hide()");
		}
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

}
