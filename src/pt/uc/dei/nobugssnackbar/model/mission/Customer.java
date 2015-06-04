package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ResourceBundle;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="customer")
public class Customer implements java.io.Serializable  {
	private static final long serialVersionUID = 1L;
	
	private long id;
	private String init;
	private String dest;
	// watch out with the value 'none', when you generate XML
	private String randomType;
	private Skin skin;
	private Orders orders;
	
	public Customer() {
		orders = new Orders();
		skin = new Skin();
		id = -1;
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		randomType = messageBundle.getString("none").toLowerCase();
	}
	public Customer(long id) {
		orders = new Orders();
		skin = new Skin();
		this.id = id;
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		randomType = messageBundle.getString("none").toLowerCase();
	}
	
	public long getId() {
		return id;
	}
	@XmlElement(name="id",type=Long.class)
	public void setId(long l) {
		this.id = l;
	}
	public String getInit() {
		return init;
	}
	@XmlElement(name="init",type=String.class)
	public void setInit(String init) {
		this.init = init;
	}
	public String getDest() {
		return dest;
	}
	@XmlElement(name="dest",type=String.class)
	public void setDest(String dest) {
		this.dest = dest;
	}
	public Orders getOrders() {
		return orders;
	}
	
	@XmlElement(name="orders",type=Orders.class)
	public void setOrders(Orders orders) {
		this.orders = orders;
	}
	public String getRandomType() {
		return randomType;
	}
	@XmlAttribute(name="randomType")
	public void setRandomType(String randomType) {
		this.randomType = randomType;
	}
	public Skin getSkin() {
		return skin;
	}
	public void setSkin(Skin skin) {
		this.skin = skin;
	}
}