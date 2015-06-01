package pt.uc.dei.nobugssnackbar.model.mission;

import java.math.BigDecimal;

public class Foodstuff implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private int qtd = 1;
	private BigDecimal price = new BigDecimal("0");
	private String name;
	
	public int getQtd() {
		return qtd;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public String getName() {
		return name;
	}
	
	public void setQtd(int qtd) {
		this.qtd = qtd;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public void setName(String name) {
		this.name = name;
	}
}