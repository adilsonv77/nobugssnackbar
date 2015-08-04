package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="foods")
public class Foods implements Serializable {
	private static final long serialVersionUID = 1L;

	@XmlAttribute(name="randomMin")
    private int randomMin;

    @XmlAttribute(name="randomMax")
    private int randomMax;

    @XmlAttribute(name="differentFromPrevious")
	private boolean differentFromPrevious;
    
    @XmlElement(name="food",type=Food.class)
    private List<Food> foods;
    
	public Foods() {
		foods = new ArrayList<>();
	}
    
	public int getRandomMin() {
		return randomMin;
	}

	public void setRandomMin(int randomMin) {
		this.randomMin = randomMin;
	}

	public int getRandomMax() {
		return randomMax;
	}

	public void setRandomMax(int randomMax) {
		this.randomMax = randomMax;
	}
	
    public boolean isDifferentFromPrevious() {
		return differentFromPrevious;
	}

	public void setDifferentFromPrevious(boolean differentFromPrevious) {
		this.differentFromPrevious = differentFromPrevious;
	}
	
	public List<Food> getFoods() {
		return foods;
	}
	
	public void setFoods(List<Food> foods) {
		this.foods = foods;
	}
}
