package pt.uc.dei.nobugssnackbar.model.mission;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="customer")
public class Customer implements java.io.Serializable  {
	private static final long serialVersionUID = 1L;
	
	@XmlElement(name="id",type=Long.class)
	private long id;
	
	@XmlElement(name="init",type=String.class)
	private String init;
	
	@XmlElement(name="dest",type=String.class)
	private String dest;
	
	// watch out with the value 'none', when you generate XML
	@XmlAttribute(name="randomType")
	private String randomType;
	
	private Skin skin;
	
	@XmlElement(name="orders",type=Orders.class)
	private Orders orders;
	
	public Customer() {
		orders = new Orders();
		skin = new Skin();
		id = -1;
		randomType = "none";
	}
	public Customer(long id) {
		orders = new Orders();
		skin = new Skin();
		this.id = id;
		randomType = "none";
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long l) {
		this.id = l;
		this.skin.setId(l);
	}
	public String getInit() {
		return init;
	}
	
	public void setInit(String init) {
		this.init = init;
	}
	public String getDest() {
		return dest;
	}
	
	public void setDest(String dest) {
		this.dest = dest;
	}
	public Orders getOrders() {
		return orders;
	}
		
	public void setOrders(Orders orders) {
		this.orders = orders;
	}
	public String getRandomType() {
		return randomType;
	}
	
	public void setRandomType(String randomType) {
		this.randomType = randomType;
	}
	public Skin getSkin() {
		return skin;
	}
	public void setSkin(Skin skin) {
		this.skin = skin;
		this.id = skin.getId();
	}
}