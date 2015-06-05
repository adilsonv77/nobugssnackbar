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
	private String CUSTOMER_ICON_DEFF = "ui-icon-circle-plus";
	private String CUSTOMER_ICON = "ui-icon-person";
	
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
	
	private List<String> foodValues;
	private List<String> drinkValues;
	private List<String> tablesChairsNormalList;
	private List<String> customerIcons;
	
	@PostConstruct
	private void init() {
		foodstuff = new Foodstuff();
		customer = new Customer();		
		initMainLists();
		
		try {
			customerIcons = new ArrayList<>();
			this.customers = new ArrayList<>(missionManager.getMissionContent().getCustomers());
			
			if (customers.size() == 0) {
				customers = new ArrayList<>(12);
				for (int i = 0; i < 12; i++) {
					Customer c = new Customer(System.currentTimeMillis());
					c.setInit(tablesChairsNormalList.get(i));
					c.setDest(tablesChairsNormalList.get(i));
					customers.add(c);
					customerIcons.add(CUSTOMER_ICON_DEFF);
				}
			}
			else if (customers.size() <= 12) { // if you have some problem look here
				for (int i = 0; i < customers.size(); i++) {
					customerIcons.add(CUSTOMER_ICON);
				}
				for (int i = customers.size(); i < 12; i++) {
					Customer c = new Customer(System.currentTimeMillis());
					c.setInit(tablesChairsNormalList.get(i));
					c.setDest(tablesChairsNormalList.get(i));
					customers.add(c);
					customerIcons.add(CUSTOMER_ICON_DEFF);
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public CustomerVC() {
		this.sc = new SkinConverter();
		this.sc.setProvider(this);
	}

	private void initMainLists() {
		ResourceBundle msg = ApplicationMessages.getMessage();		
		
		foodValues = new ArrayList<>();
		
		foodValues.add(msg.getString("pizza"));
		foodValues.add(msg.getString("hamburger"));
		foodValues.add(msg.getString("taco"));
		drinkValues = new ArrayList<>();
		drinkValues.add(msg.getString("water"));
		drinkValues.add(msg.getString("cola"));
		drinkValues.add(msg.getString("juice"));
		
		initPositions = new ArrayList<>();
		destPositions = new ArrayList<>();
		tablesChairsNormalList = new ArrayList<>();
		
		SelectItemGroup sigDefault = new SelectItemGroup(msg.getString("door"));
		sigDefault.setSelectItems(new SelectItem[] {new SelectItem(msg.getString("door").toLowerCase(), msg.getString("door"))});
		initPositions.add(sigDefault);
		
		SelectItemGroup sigCounters = new SelectItemGroup(msg.getString("counters"));
		SelectItemGroup sigTable = new SelectItemGroup(msg.getString("tablesAndChairs"));;
		SelectItem[] sic = new SelectItem[4];
		SelectItem[] sit = new SelectItem[8];
		StringBuilder itemValue = new StringBuilder();
		
		for (int i = 0, sitIndex = 0; i < sic.length; i++) {
			int num = i + 1;
			itemValue.append(msg.getString("counter") + " " + num);
			sic[i] = new SelectItem(itemValue.toString().replace(" ", "").toLowerCase(), itemValue.toString());
			
			itemValue.delete(0, itemValue.length());
			
			for (int j = 1; j <= 2; j++, sitIndex++) {
				itemValue.append(msg.getString("table") + " ");
				itemValue.append(num);
				itemValue.append(" " + msg.getString("chair") + " ");
				itemValue.append(j);
				sit[sitIndex] = new SelectItem(itemValue.toString().replace(" ", "").toLowerCase(), itemValue.toString());
				tablesChairsNormalList.add(itemValue.toString());
				itemValue.delete(0, itemValue.length());
			}
		}
		for (int i = 0; i < sic.length; i++) {
			tablesChairsNormalList.add(sic[i].getLabel());
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
			Skin skin = new Skin(i, path + String.format("$customer%02d_n.png", i), "Skin " + i);
			customerSkins.add(skin);
		}
	}
	
	public void newOrder() {
		if (checkFields(customer.getOrders().getOrder())) {
			Order order = customer.getOrders().getOrder();
			int index = customer.getOrders().getOrders().indexOf(order);
			
			if (index >= 0) {
				customer.getOrders().getOrders().set(index, order);
				customer.getOrders().setOrder(new Order());
				order = customer.getOrders().getOrder();
				int id = customer.getOrders().getOrderIdCounter() + 1;
				customer.getOrders().setOrderIdCounter(id);
				order.setId(id);
				customer.getOrders().getOrders().add(order);
			}
		}
	}
	
	public void deleteOrder() {
		Order order = customer.getOrders().getOrder();
		
		if (order != null) {
			ResourceBundle msg = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			
			if (customer.getOrders().getOrders().size() > 1) {
				if (customer.getOrders().getOrders().remove(order)) {
					context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, 
							msg.getString("succRemovedOrder"), ""));					
					customer.getOrders().setOrder(customer.getOrders().getOrders().get(0));
				}
				else {
					context.validationFailed();
					context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN, 
							msg.getString("warningMsg"), 
							msg.getString("notRemovedOrder")));
				}
			}
			else if (customer.getOrders().getOrders().size() == 1) {
				customer.getOrders().setOrderIdCounter(0);
				customer.getOrders().getOrders().set(0, new Order());
				customer.getOrders().getOrders().get(0).setId(0);
				customer.getOrders().setOrder(customer.getOrders().getOrders().get(0));				
						
				context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, 
						msg.getString("succRemovedOrder"), ""));
				context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, 
						msg.getString("orderCounterIsReset"), ""));				
			}
		}
	}
	
	public void deleteFood() {
		if (food != null) {
			customer.getOrders().getOrder().getFoods().remove(this.food);
			resetFood();
		}
	}
	
	public void resetFood() {
		food = null;
	}

	public void deleteDrink() {
		if (drink != null) {
			customer.getOrders().getOrder().getDrinks().remove(this.drink);
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
			// edit customer
			customer = customers.get(customersPlaceId);
			if (customer.getOrders().getOrders() != null &&
				customer.getOrders().getOrders().size() > 0) {
				customer.getOrders().setOrder(customer.getOrders().getOrders().get(0));
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
			context.validationFailed();
			context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,
					msg.getString("rndMinCannotGreater"), ""));
			
			return false;
		}
		/*if (order.getFoods().size() <= 0 || order.getDrinks().size() <= 0) {
			ResourceBundle msg = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			context.validationFailed();
			context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, 
				msg.getString("noOrder"), ""));
			
			return false;
		}*/
		
		if (customer.getSkin() == null || customer.getSkin().getImage().isEmpty()) {
			ResourceBundle msg = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			context.validationFailed();
			context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN,
					msg.getString("selectSkin"), ""));
			
			return false;
		}
		
		return true;
	}
	
	public void saveCustomer() {                
		if (checkFields(customer.getOrders().getOrder())) {
			customers.set(customersPlaceId, customer);
			Order order = customer.getOrders().getOrder();
			if ((order.getDrinks() != null &&
				order.getDrinks().size() > 0) ||
				(order.getFoods() != null &&
				order.getFoods().size() > 0)) {
				customerIcons.set(customersPlaceId, CUSTOMER_ICON);
			}

			try {
				List<Customer> res = new ArrayList<>();
				for (Customer c : customers) {
					for (Order o : c.getOrders().getOrders()) {
						if ((o.getDrinks() != null && o.getDrinks().size() > 0) ||
							(o.getFoods() != null && o.getFoods().size() > 0)) {
							res.add(c);
							break;
						}
					}
				}
				if (res != null && res.size() > 0)
					missionManager.getMissionContent().setCustomers(res);
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
			foodstuff.getQtd() < 1 ||
			foodstuff.getPrice().compareTo(new BigDecimal("0")) < 0) {
			
			ResourceBundle messageBundle = ApplicationMessages.getMessage();
			FacesContext context = FacesContext.getCurrentInstance();
			context.validationFailed();
	        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN,
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
					int index = customer.getOrders().getOrder().getFoods().indexOf(food);
					customer.getOrders().getOrder().getFoods().set(index, ffood);
				}
				else {
					customer.getOrders().getOrder().getFoods().add(ffood);
				}
			}
			else {
				// it is drink
				Drink ddrink = new Drink();
				ddrink.setName(foodstuff.getName());
				ddrink.setPrice(foodstuff.getPrice());
				ddrink.setQtd(foodstuff.getQtd());
				
				if (drink != null) {
					int index = customer.getOrders().getOrder().getDrinks().indexOf(drink);
					customer.getOrders().getOrder().getDrinks().set(index, ddrink);
				}
				else {
					customer.getOrders().getOrder().getDrinks().add(ddrink);
				}
			}
			reset();
			RequestContext rcontext = RequestContext.getCurrentInstance();
			rcontext.execute("PF('addFoodstuffDlg').hide()");
			rcontext.execute("PF('addBeverageDlg').hide()");
		}
	}
	
	public void reset() {
		foodstuff = new Foodstuff();
		food = null;
		drink = null;
	}
	
	public List<String> getFoodValues(String q) {
		List<String> filtered = new ArrayList<>();
		for (int i = 0; i < foodValues.size(); i++) {
			if (foodValues.get(i).startsWith(q)) {
				filtered.add(foodValues.get(i));
			}
		}
		
		return filtered;
	}
	
	public List<String> getDrinkValues(String q) {
		List<String> filtered = new ArrayList<>();
		for (int i = 0; i < drinkValues.size(); i++) {
			if (drinkValues.get(i).startsWith(q)) {
				filtered.add(drinkValues.get(i));
			}
		}
		
		return filtered;
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

	public List<String> getFoodValues() {
		return foodValues;
	}

	public void setFoodValues(List<String> foodValues) {
		this.foodValues = foodValues;
	}

	public List<String> getDrinkValues() {
		return drinkValues;
	}

	public void setDrinkValues(List<String> drinkValues) {
		this.drinkValues = drinkValues;
	}

	public List<String> getTablesChairsNormalList() {
		return tablesChairsNormalList;
	}

	public void setTablesChairsNormalList(List<String> tablesChairsNormalList) {
		this.tablesChairsNormalList = tablesChairsNormalList;
	}

	public List<String> getCustomerIcons() {
		return customerIcons;
	}

	public void setCustomerIcons(List<String> customerIcons) {
		this.customerIcons = customerIcons;
	}

}
