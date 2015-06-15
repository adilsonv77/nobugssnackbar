package pt.uc.dei.nobugssnackbar.model.mission;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;
@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="randomization")
public class Randomization implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	@XmlAttribute(name="qtd")
	private byte qtd;
	
	private String set;
	
	private String type;

	public Randomization() {
		qtd = 0;
		set = "new";
		type = "hungry";
	}
	
	public void setQtd(byte qtd) {		
		this.qtd = qtd;
	}
	
	@XmlValue
	public void setType(String msg) {
		this.type = msg;
	}
	
	public String getSet() {
		return set;
	}
	
	@XmlAttribute(name="set")
	public void setSet(String set) {
		this.set = set;
	}
	
	public byte getQtd() {
		return qtd;
	}
	
	public String getType() {
		return type;
	}
}