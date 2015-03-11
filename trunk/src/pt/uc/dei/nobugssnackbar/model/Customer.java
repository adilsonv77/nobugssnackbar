package pt.uc.dei.nobugssnackbar.model;

import java.util.ArrayList;

import pt.uc.dei.nobugssnackbar.model.mission.Drink;
import pt.uc.dei.nobugssnackbar.model.mission.Food;
import pt.uc.dei.nobugssnackbar.model.mission.Pattern;

public class Customer {
	private int id;
	private String init;
	private String dest;
	private ArrayList<Food> foods = new ArrayList<Food>();
	private ArrayList<Drink> drinks = new ArrayList<Drink>();
	private Food food = new Food();
	private Drink drink = new Drink();
	private Pattern pattern = new Pattern();
	
	public Food getFood() {
		return food;
	}
	public void setFood(Food food) {
		this.food = food;
	}
	public Drink getDrink() {
		return drink;
	}
	public void setDrink(Drink drink) {
		this.drink = drink;
	}
	public Pattern getPattern() {
		return pattern;
	}
	public void setPattern(Pattern pattern) {
		this.pattern = pattern;
	}
	public int getId() {
		return id;
	}
	public String getDest() {
		return dest;
	}
	public String getInit() {
		return init;
	}
	public ArrayList<Food> getFoods() {
		return foods;
	}
	public ArrayList<Drink> getDrinks() {
		return drinks;
	}

	public void setId(int id) {
		this.id = id;
	}
	public void setDest(String dest) {
		this.dest = dest;
	}
	public void setInit(String init) {
		this.init = init;
	}
	
	public void addFood() {
		if (food != null) {
			foods.add(food);
		}
		food = new Food();
	}
	public void addDrink() {
		if (drink != null) {
			drinks.add(drink);
		}
		drink = new Drink();
	}
}