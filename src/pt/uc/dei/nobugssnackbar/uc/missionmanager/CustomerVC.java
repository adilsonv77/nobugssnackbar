package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.model.SelectItem;
import javax.faces.model.SelectItemGroup;

import org.primefaces.context.RequestContext;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Customer;
import pt.uc.dei.nobugssnackbar.model.mission.Drink;
import pt.uc.dei.nobugssnackbar.model.mission.Food;
import pt.uc.dei.nobugssnackbar.model.mission.Foodstuff;
import pt.uc.dei.nobugssnackbar.model.mission.Order;
import pt.uc.dei.nobugssnackbar.model.mission.Skin;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.SkinConverter;

@ManagedBean(name="custVC")
@ViewScoped
public class CustomerVC implements ISkinProvider, Serializable {
	private static final long serialVersionUID = 1L;
	
	private Food food;
	private Drink drink;
	private Foodstuff foodstuff;
	private Customer customer;
	private List<Customer> customers;
	private int customersPlaceId;	
	// true - food, false - drink
	private boolean foodstuffType;
	
	private List<SelectItem> initPositions;
	private List<SelectItem> destPositions;
	private final int numberOfCustomers = 4;
	private List<Skin> customerSkins;
	private SkinConverter sc;
	
	@ManagedProperty(value="#{mm}")
	private MissionManager missionManager;
	
	@PostConstruct
	private void init() {
		try {
			this.customers = missionManager.getMissionContent().getCustomers();
			if (customers.size() == 0) {
				customers = new ArrayList<>(12);
				for (int i = 0; i < 12; i++) {
					customers.add(new Customer());
				}
			}
			if (customers.size() != 12) {
				System.err.println("The customer list must be with size 12!");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		foodstuff = new Foodstuff();
		customer = new Customer();
		
		initMainLists();
	}
	
	public CustomerVC() {
		this.sc = new SkinConverter();
		this.sc.setProvider(this);
	}

	private void initMainLists() {
		initPositions = new ArrayList<>();
		destPositions = new ArrayList<>();
		
		SelectItemGroup sigDefault = new SelectItemGroup("Door");
		sigDefault.setSelectItems(new SelectItem[] {new SelectItem("Door", "Door")});
		initPositions.add(sigDefault);
		
		SelectItemGroup sigCounters = new SelectItemGroup("Counters");
		SelectItemGroup sigTable = new SelectItemGroup("Tables and Chairs");;
		SelectItem[] sic = new SelectItem[4];
		SelectItem[] sit = new SelectItem[8];
		StringBuilder itemValue = new StringBuilder();
		
		for (int i = 0, sitIndex = 0; i < sic.length; i++) {
			int num = i + 1;
			itemValue.append("Counter " + num);
			sic[i] = new SelectItem(itemValue.toString(), itemValue.toString());
			itemValue.delete(0, itemValue.length());
			
			for (int j = 1; j <= 2; j++, sitIndex++) {
				itemValue.append("Table ");
				itemValue.append(num);
				itemValue.append(" Chair ");
				itemValue.append(j);
				sit[sitIndex] = new SelectItem(itemValue.toString(), itemValue.toString());
				itemValue.delete(0, itemValue.length());
			}
		}
		
		sigCounters.setSelectItems(sic);
		initPositions.add(sigCounters);
		destPositions.add(sigCounters);
		sigTable.setSelectItems(sit);
		initPositions.add(sigTable);
		destPositions.add(sigTable);
		
		/**************************************************************/
		
		customerSkins = new ArrayList<>();
		String path = "../images/"; // it depends on xhtml file's location
		for (int i = 1; i <= numberOfCustomers; i++) {
			Skin skin = new Skin(i, path + String.format("$customer%02d_anger.png", i), "Skin " + i);
			customerSkins.add(skin);
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
	
	public void deleteOrder() {
		Order order = customer.getPattern().getOrder();
		
		if (order != null) {
			ResourceBundle msg = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			
			if (customer.getPattern().getOrders().size() > 1) {
				if (customer.getPattern().getOrders().remove(order)) {
					context.addMessage(null, new FacesMessage(msg.getString("succRemovedOrder"), ""));					
					customer.getPattern().setOrder(customer.getPattern().getOrders().get(0));
				}
				else {
					context.addMessage(null, new FacesMessage(msg.getString("warningMsg"), 
							msg.getString("notRemovedOrder")));
				}
			}
			else if (customer.getPattern().getOrders().size() == 1) {
				customer.getPattern().setOrderIdCounter(0);
				customer.getPattern().getOrders().set(0, new Order());
				customer.getPattern().getOrders().get(0).setId(0);
				customer.getPattern().setOrder(customer.getPattern().getOrders().get(0));				
						
				context.addMessage(null, new FacesMessage(msg.getString("succRemovedOrder"), ""));
				context.addMessage(null, new FacesMessage(msg.getString("orderCounterIsReset"), ""));				
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
		
		if (customer.getSkin() == null || customer.getSkin().getImage().isEmpty()) {
			ResourceBundle msg = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			context.addMessage(null, new FacesMessage(msg.getString("selectSkin"), ""));
			
			return false;
		}
		
		return true;
	}
	
	public void saveCustomer() {                
		if (checkFields(customer.getPattern().getOrder())) {
			customers.set(customersPlaceId, customer);
			try {
				missionManager.getMissionContent().setCustomers(customers);
			} catch (Exception e) {
				e.printStackTrace();
			}
			customer = new Customer();
			RequestContext rcontext = RequestContext.getCurrentInstance();
			rcontext.execute("PF('customerDlg').hide()");
		}
	}
	
	public MissionManager getMissionManager() {
		return missionManager;
	}

	public void setMissionManager(MissionManager missionManager) {
		this.missionManager = missionManager;
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

	public List<SelectItem> getInitPositions() {
		return initPositions;
	}

	public void setInitPositions(List<SelectItem> initPositions) {
		this.initPositions = initPositions;
	}

	public List<SelectItem> getDestPositions() {
		return destPositions;
	}

	public void setDestPositions(List<SelectItem> destPositions) {
		this.destPositions = destPositions;
	}

	public List<Skin> getCustomerSkins() {
		return customerSkins;
	}

	public void setCustomerSkins(List<Skin> customerSkins) {
		this.customerSkins = customerSkins;
	}

	public int getNumberOfCustomers() {
		return numberOfCustomers;
	}

	@Override
	public List<Skin> getSkins() {
		return this.customerSkins;
	}
	
	public SkinConverter getSc() {
		return sc;
	}

	public void setSc(SkinConverter sc) {
		this.sc = sc;
	}
}
