package pt.uc.dei.nobugssnackbar.model.mission;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="objective")
public class Objective implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	
	@XmlAttribute(name="pos")
	private int pos;
	
	@XmlAttribute(name="place")
	private String place;
	
	@XmlAttribute(name="distinct")
	private boolean distinct;
	
	@XmlValue
	private String value;
	
	public Objective() {

	}
	public Objective(int id){
		this.id = id;
	}
	
	public int getId() {
		return id;
	}	
	public void setId(int id) {
		this.id = id;
	}
	public int getPos() {
		return pos;
	}
	public String getPlace() {
		return place;
	}
	public boolean isDistinct() {
		return distinct;
	}
	public String getValue() {
		return value;
	}	
	public void setPos(int pos) {
		this.pos = pos;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public void setDistinct(boolean distinct) {
		this.distinct = distinct;
	}
	public void setValue(String value) {
		this.value = value;
	}
}