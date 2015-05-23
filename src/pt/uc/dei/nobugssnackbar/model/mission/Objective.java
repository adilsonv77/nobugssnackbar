package pt.uc.dei.nobugssnackbar.model.mission;

public class Objective implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private int pos;
	private String place;
	private boolean distinct;
	private String value;
	
	public Objective() {
		// TODO Auto-generated constructor stub
	}
	public Objective(int id){
		this.id = id;
	}
	
	public int getId() {
		return id;
	}	
	public void setId(int id) {
		this.id = id;
	}
	public int getPos() {
		return pos;
	}
	public String getPlace() {
		return place;
	}
	public boolean isDistinct() {
		return distinct;
	}
	public String getValue() {
		return value;
	}	
	public void setPos(int pos) {
		this.pos = pos;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public void setDistinct(boolean distinct) {
		this.distinct = distinct;
	}
	public void setValue(String value) {
		this.value = value;
	}
}