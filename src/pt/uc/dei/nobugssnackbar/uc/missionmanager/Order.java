package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.ArrayList;

public class Order {
	private ArrayList<Food> foods = new ArrayList<Food>();
	private ArrayList<Drink> drinks = new ArrayList<Drink>();
	private Food food = new Food();
	private Drink drink = new Drink();
	
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
	
	public ArrayList<Food> getFoods() {
		return foods;
	}
	public ArrayList<Drink> getDrinks() {
		return drinks;
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