package pt.uc.dei.nobugssnackbar.model;

import java.math.BigDecimal;

public class Foodstuff {
	private int qt;
	private BigDecimal price;
	private String name;
	
	public int getQt() {
		return qt;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public String getName() {
		return name;
	}
	
	public void setQt(int qt) {
		this.qt = qt;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public void setName(String name) {
		this.name = name;
	}
}