package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="slider")
public class Slider implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	private Integer timesBefore;

	public Slider() {

	}

	public Integer getTimesBefore() {
		return timesBefore;
	}
	@XmlAttribute(name="timesBefore")
	public void setTimesBefore(Integer timesBefore) {
		this.timesBefore = timesBefore;
	}

}
