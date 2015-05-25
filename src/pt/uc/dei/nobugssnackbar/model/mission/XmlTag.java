package pt.uc.dei.nobugssnackbar.model.mission;

public class XmlTag implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private int preload = -1;
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