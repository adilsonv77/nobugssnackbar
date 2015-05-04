package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;

public class Slider implements Serializable {
	private static final long serialVersionUID = 1L;
	
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
