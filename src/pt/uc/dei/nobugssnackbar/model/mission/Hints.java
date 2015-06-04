package pt.uc.dei.nobugssnackbar.model.mission;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="hints")
public class Hints  implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private List<Hint> tipsHints;
	
	private List<Hint> errorsHints;
	
	public Hints() {
	}
	
	public List<Hint> getErrorsHints() {
		if(errorsHints == null){
			errorsHints = new ArrayList<Hint>();
		}
		return errorsHints;
	}
	
	@XmlElementWrapper(name="errors")
	@XmlElement(name="hint",type=Hint.class)
	public void setErrorsHints(List<Hint> errorsHints) {
		this.errorsHints = errorsHints;
	}
	
	public List<Hint> getTipsHints() {
		if(tipsHints == null){
			tipsHints = new ArrayList<Hint>();
		}
		return tipsHints;
	}
	
	@XmlElementWrapper(name="sequence")
	@XmlElement(name="hint",type=Hint.class)
	public void setTipsHints(List<Hint> tipsHints) {
		this.tipsHints = tipsHints;
	}
	
}
