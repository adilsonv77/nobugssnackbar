package pt.uc.dei.nobugssnackbar.model.mission;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

@XmlAccessorType(XmlAccessType.NONE)
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
	@XmlAttribute(name="qt")
	public void setQtd(int qtd) {
		this.qtd = qtd;
	}
	@XmlAttribute(name="price")
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	@XmlValue
	public void setName(String name) {
		this.name = name;
	}
}