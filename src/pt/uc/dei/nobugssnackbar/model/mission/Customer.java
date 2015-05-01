package pt.uc.dei.nobugssnackbar.model.mission;

public class Customer implements java.io.Serializable  {
	private static final long serialVersionUID = 1L;
	
	private int id;
	private String init;
	private String dest;
	// watch out with the value 'none', when you generate XML
	private String randomType = "none";
	private Skin skin;
	
	/* 
	 * If [pattern.getOrders().size() == 1] Then
	 *    generate Foods/Drinks;
	 * Else
	 *    generate Pattern->order[i]->Foods/Drinks
	 */
	private Pattern pattern;

	public Customer() {
		pattern = new Pattern();
		skin = new Skin();
		id = -1;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getInit() {
		return init;
	}
	public void setInit(String init) {
		this.init = init;
	}
	public String getDest() {
		return dest;
	}
	public void setDest(String dest) {
		this.dest = dest;
	}
	public Pattern getPattern() {
		return pattern;
	}
	public void setPattern(Pattern pattern) {
		this.pattern = pattern;
	}
	public String getRandomType() {
		return randomType;
	}
	public void setRandomType(String randomType) {
		this.randomType = randomType;
	}
	public Skin getSkin() {
		return skin;
	}
	public void setSkin(Skin skin) {
		this.skin = skin;
	}
}