package missionmanager;

import java.util.ArrayList;

public class Order {
	private FoodStuff foodstuff = new FoodStuff();
	private ArrayList<Food> foods = new ArrayList<Food>();
	private ArrayList<Drink> drinks = new ArrayList<Drink>();
	private FoodStuffEnum foodStuffType;
	
	public FoodStuff getFoodstuff() {
		return foodstuff;
	}
	public void setFoodstuff(FoodStuff foodstuff) {
		this.foodstuff = foodstuff;
	}
	public FoodStuffEnum getFoodStuffType() {
		return foodStuffType;
	}
	public void setFoodStuffType(FoodStuffEnum foodStuffType) {
		this.foodStuffType = foodStuffType;
	}
	
	public ArrayList<Food> getFoods() {
		return foods;
	}
	public ArrayList<Drink> getDrinks() {
		return drinks;
	}
	
	public void addFoodstuff() {
		if (foodStuffType == FoodStuffEnum.FOOD) {
			foods.add((Food) foodstuff);
		}
		else if (foodStuffType == FoodStuffEnum.DRINK) {
			drinks.add((Drink) foodstuff);
		}
	}
}