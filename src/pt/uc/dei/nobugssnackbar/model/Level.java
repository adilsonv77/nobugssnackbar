package pt.uc.dei.nobugssnackbar.model;

import java.util.Date;

public class Level {

	private int order;
	
	private String name;
	
	private Date release;

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getRelease() {
		return release;
	}

	public void setRelease(Date release) {
		this.release = release;
	}
	
	
}
