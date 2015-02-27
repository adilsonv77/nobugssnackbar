package missionmanager;

import java.util.ArrayList;

public class Customer {
	private int id;
	private String init;
	private ArrayList<Food> foods = new ArrayList<Food>();
	private ArrayList<Drink> drinks = new ArrayList<Drink>();
	private ArrayList<Pattern> patterns = new ArrayList<Pattern>();
	private FoodStuff foodstuff = new FoodStuff();
	private Pattern pattern = new Pattern();
	private FoodStuffEnum foodStuffType;
	
	public FoodStuffEnum getFoodStuffType() {
		return foodStuffType;
	}
	public void setFoodStuffType(FoodStuffEnum foodStuffType) {
		this.foodStuffType = foodStuffType;
	}
	public FoodStuff getFoodstuff() {
		return foodstuff;
	}
	public void setFoodstuff(FoodStuff foodstuff) {
		this.foodstuff = foodstuff;
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
	public String getInit() {
		return init;
	}
	public ArrayList<Food> getFoods() {
		return foods;
	}
	public ArrayList<Drink> getDrinks() {
		return drinks;
	}
	public ArrayList<Pattern> getPatterns() {
		return patterns;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	public void setInit(String init) {
		this.init = init;
	}
	
	public void addFoodstuff() {
		if (foodStuffType == FoodStuffEnum.FOOD) {
			foods.add((Food) foodstuff);
		}
		else if (foodStuffType == FoodStuffEnum.DRINK) {
			drinks.add((Drink) foodstuff);
		}
	}
	
	public void addPattern() {
		patterns.add(pattern);
	}
}