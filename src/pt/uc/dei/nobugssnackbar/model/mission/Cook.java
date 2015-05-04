package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;

public class Cook implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String startPosition;

	public Cook() {

	}

	public String getStartPosition() {
		return startPosition;
	}

	public void setStartPosition(String startPosition) {
		this.startPosition = startPosition;
	}

}
