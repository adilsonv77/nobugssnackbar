package pt.uc.dei.nobugssnackbar.model;

import java.util.Date;

public class Level {

	private int order;
	
	private int orderOriginal;

	private String name;

	private String subject;

	private Date release;

	private long classId;

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public int getOrderOriginal() {
		return orderOriginal;
	}
	
	public void setOrderOriginal(int orderOriginal) {
		this.orderOriginal = orderOriginal;
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

	public long getClassId() {
		return classId;
	}

	public void setClassId(long classId) {
		this.classId = classId;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

}
