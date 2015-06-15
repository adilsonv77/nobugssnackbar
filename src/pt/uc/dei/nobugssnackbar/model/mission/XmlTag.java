package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

import pt.uc.dei.nobugssnackbar.uc.missionmanager.XmlTagHandler;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="xml")
public class XmlTag implements Serializable {
	private static final long serialVersionUID = 1L;	
	
	private Integer preload;
	private Boolean alwaysNew;
	private Boolean loadBlocks;	
	//@XmlAnyElement(XmlTagHandler.class)
	@XmlAnyElement(value=XmlTagHandler.class)
	private String xmlns;	
	
	public Integer getPreload() {
		return preload;
	}
	@XmlAttribute(name="preload")
	public void setPreload(Integer preload) {
		this.preload = preload;
	}
	public Boolean isAlwaysNew() {
		return alwaysNew;
	}
	@XmlAttribute(name="alwaysNew")
	public void setAlwaysNew(Boolean alwaysNew) {
		this.alwaysNew = alwaysNew;
	}
	public String getXmlns() {
		return "<xml>" + xmlns + "</xml>";
	}
	public void setXmlns(String xmlns) {
		this.xmlns = xmlns;
	}
	public Boolean isLoadBlocks() {
		return loadBlocks;
	}
	public void setLoadBlocks(Boolean loadBlocks) {
		this.loadBlocks = loadBlocks;
	}
}