package pt.uc.dei.nobugssnackbar.model.mission;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="xml")
public class XmlTag implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	@XmlAttribute(name="preload")
	private int preload = -1;
	@XmlAttribute
	private boolean alwaysNew;
	@XmlValue
	private String xmlns;
	
	public int getPreload() {
		return preload;
	}
	public void setPreload(int preload) {
		this.preload = preload;
	}
	public boolean isAlwaysNew() {
		return alwaysNew;
	}
	public void setAlwaysNew(boolean alwaysNew) {
		this.alwaysNew = alwaysNew;
	}
	public String getXmlns() {
		return xmlns;
	}
	public void setXmlns(String xmlns) {
		this.xmlns = xmlns;
	}
}