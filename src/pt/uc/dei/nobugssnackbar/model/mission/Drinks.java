package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="drinks")
public class Drinks implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@XmlAttribute(name="randomMin")
    public int randomMin;

    @XmlAttribute(name="randomMax")
    public long randomMax;

    private List<Drink> drinks;
    
	public Drinks() {
		drinks = new ArrayList<>();
	}
    
    public int getRandomMin() {
		return randomMin;
	}
    public void setRandomMin(int randomMin) {
		this.randomMin = randomMin;
	}
    public long getRandomMax() {
		return randomMax;
	}
    public void setRandomMax(long randomMax) {
		this.randomMax = randomMax;
	}
    
	public List<Drink> getDrinks() {
		return drinks;
	}
	@XmlElement(name="drink",type=Food.class)
	public void setDrinks(List<Drink> drinks) {
		this.drinks = drinks;
	}
}
