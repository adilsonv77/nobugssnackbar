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
	
	@XmlAttribute(name="timesBefore")
	private int timesBefore;

	public Slider() {

	}

	public int getTimesBefore() {
		return timesBefore;
	}

	public void setTimesBefore(int timesBefore) {
		this.timesBefore = timesBefore;
	}

}
