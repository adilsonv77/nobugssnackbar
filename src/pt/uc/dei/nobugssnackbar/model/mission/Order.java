package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;

public class Order implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	private int id;
	private int randomMinFoods;
	private int randomMaxFoods;
	private boolean differentFromPrevFoods;
	private List<Food> foods;
	
	private int randomMinDrinks;
	private int randomMaxDrinks;
	private boolean differentFromPrevDrinks;
	private List<Drink> drinks;
	
	public Order() {
		foods = new ArrayList<>();
		drinks = new ArrayList<>();
	}
	
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

	public boolean isDifferentFromPrevFoods() {
		return differentFromPrevFoods;
	}

	public void setDifferentFromPrevFoods(boolean differentFromPrevFoods) {
		this.differentFromPrevFoods = differentFromPrevFoods;
	}

	public boolean isDifferentFromPrevDrinks() {
		return differentFromPrevDrinks;
	}

	public void setDifferentFromPrevDrinks(boolean differentFromPrevDrinks) {
		this.differentFromPrevDrinks = differentFromPrevDrinks;
	}

	public int getRandomMinFoods() {
		return randomMinFoods;
	}

	public void setRandomMinFoods(int randomMinFoods) {
		this.randomMinFoods = randomMinFoods;
	}

	public int getRandomMaxFoods() {
		return randomMaxFoods;
	}

	public void setRandomMaxFoods(int randomMaxFoods) {
		this.randomMaxFoods = randomMaxFoods;
	}

	public int getRandomMinDrinks() {
		return randomMinDrinks;
	}

	public void setRandomMinDrinks(int randomMinDrinks) {
		this.randomMinDrinks = randomMinDrinks;
	}

	public int getRandomMaxDrinks() {
		return randomMaxDrinks;
	}

	public void setRandomMaxDrinks(int randomMaxDrinks) {
		this.randomMaxDrinks = randomMaxDrinks;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}