package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;

public class Skin implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private long id;
	private String image;
	private String displayName;
	
	public Skin() { }

	public Skin(int id, String image, String displayName) {
		this.id = id;
		this.image = image;
		this.displayName = displayName;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	
}
