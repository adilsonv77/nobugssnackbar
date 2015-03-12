package pt.uc.dei.nobugssnackbar.model.mission;

public class Mission{
	
	private int id;
	private String name;
	private String missionContent;
	private boolean repeatable;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMissionContent() {
		return missionContent;
	}
	public void setMissionContent(String missionContent) {
		this.missionContent = missionContent;
	}
	public boolean isRepeatable() {
		return repeatable;
	}
	public void setRepeatable(boolean repeatable) {
		this.repeatable = repeatable;
	}
	
	
	public Mission() {
		super();
	}
	public Mission(int id, String name, String missionContent,
			boolean repeatable) {
		super();
		this.id = id;
		this.name = name;
		this.missionContent = missionContent;
		this.repeatable = repeatable;
	}
}