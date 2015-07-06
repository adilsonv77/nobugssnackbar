package pt.uc.dei.nobugssnackbar.model.mission;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

import com.sun.xml.internal.txw2.annotation.XmlCDATA;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="page")
public class Page implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
		
	@XmlValue
	private String msg;
	
	public Page() {
		
	}
	
	public Page(String msg) {
		this.msg = msg;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@XmlCDATA
	public String getMsg() {
		return msg;
	}
	
	@XmlCDATA
	public void setMsg(String msg) {
		this.msg = msg;
	}
}