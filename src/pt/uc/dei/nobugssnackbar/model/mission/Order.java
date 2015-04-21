package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.List;

public class Order implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	private List<Food> foods;
	private List<Drink> drinks;
	
	public List<Food> getFoods() {
		return foods;
	}
	public void setFoods(List<Food> foods) {
		this.foods = foods;
	}
	public List<Drink> getDrinks() {
		return drinks;
	}
	public void setDrinks(List<Drink> drinks) {
		this.drinks = drinks;
	}
}