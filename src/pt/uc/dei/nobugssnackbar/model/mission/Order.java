package pt.uc.dei.nobugssnackbar.model.mission;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="order")
public class Order implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	private int id;
	
	@XmlElement(name="foods",type=Foods.class)
	private Foods foods;
	@XmlElement(name="drinks",type=Drinks.class)
	private Drinks drinks;
	
	public Order() {
		drinks = new Drinks();
		foods = new Foods();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public Foods getFoods() {
		return foods;
	}

	public void setFoods(Foods foods) {
		this.foods = foods;
	}

	public Drinks getDrinks() {
		return drinks;
	}

	public void setDrinks(Drinks drinks) {
		this.drinks = drinks;
	}
}