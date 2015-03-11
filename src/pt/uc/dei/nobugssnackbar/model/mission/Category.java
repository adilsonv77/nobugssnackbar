package pt.uc.dei.nobugssnackbar.model.mission;

public class Category implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private String name;
	private boolean show;

	public String getName() {
		return name;
	}

	public boolean getShow() {
		return show;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setShow(boolean show) {
		this.show = show;
	}
}
