package pt.uc.dei.nobugssnackbar.model;

public class XmlTag {
	private int preload;
	private boolean alwaysNew;
	private String xmlns;
	
	public int getPreload() {
		return preload;
	}
	public void setPreload(int preload) {
		this.preload = preload;
	}
	public boolean isAlwaysNew() {
		return alwaysNew;
	}
	public void setAlwaysNew(boolean alwaysNew) {
		this.alwaysNew = alwaysNew;
	}
	public String getXmlns() {
		return xmlns;
	}
	public void setXmlns(String xmlns) {
		this.xmlns = xmlns;
	}
}