package pt.uc.dei.nobugssnackbar.model.mission;

import java.util.ResourceBundle;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;

public class Customer implements java.io.Serializable  {
	private static final long serialVersionUID = 1L;
	
	private long id;
	private String init;
	private String dest;
	// watch out with the value 'none', when you generate XML
	private String randomType;
	private Skin skin;
	private Pattern pattern;

	public Customer() {
		pattern = new Pattern();
		skin = new Skin();
		id = -1;
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		randomType = messageBundle.getString("none").toLowerCase();
	}
	public Customer(long id) {
		pattern = new Pattern();
		skin = new Skin();
		this.id = id;
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		randomType = messageBundle.getString("none").toLowerCase();
	}
	
	public long getId() {
		return id;
	}
	public void setId(long l) {
		this.id = l;
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