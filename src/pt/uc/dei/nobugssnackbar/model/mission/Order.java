package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="order")
public class Order implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	private int id;
	private int randomMinFoods;
	private int randomMaxFoods;
	private boolean differentFromPrevFoods;
	
	//private List<Food> foods;
	
	private int randomMinDrinks;
	private int randomMaxDrinks;
	private boolean differentFromPrevDrinks;
	
	//private List<Drink> drinks;
	private Foods foods;
	private Drinks drinks;
	
	public Order() {
		/*foods = new ArrayList<>();
		drinks = new ArrayList<>();*/
		drinks = new Drinks();
		foods = new Foods();
	}
	
	public List<Food> getFoods() {
		//return foods;
		return foods.getFoods();
	}

	@XmlElement(name="foods",type=Foods.class)
	public void setFoods(List<Food> foods) {
		//this.foods = foods;
		this.foods.setFoods(foods);
	}
	public List<Drink> getDrinks() {
		//return drinks;
		return drinks.getDrinks();
	}

	@XmlElement(name="drinks",type=Drinks.class)
	public void setDrinks(List<Drink> drinks) {
		//this.drinks = drinks;
		this.drinks.setDrinks(drinks);
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