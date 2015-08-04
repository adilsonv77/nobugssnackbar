package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import org.apache.commons.lang3.SerializationUtils;
import org.primefaces.context.RequestContext;

import pt.uc.dei.nobugssnackbar.dao.HintDao;
import pt.uc.dei.nobugssnackbar.model.mission.Hint;
import pt.uc.dei.nobugssnackbar.util.ImgTagConvertor;

@ManagedBean(name="hintDBView")
@ViewScoped
public class HintDBView implements Serializable{

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value="#{factoryDao.hintDao}")
	private HintDao hintDao;
	
	@ManagedProperty(value="#{hintView}")
	private HintView hintView;
	
	private List<Hint> hintsFromDB = null;
	private Hint hint;
	
	
	public HintDao getHintDao() {
		return hintDao;
	}
	
	public void setHintDao(HintDao hintDao) {
		this.hintDao = hintDao;
	}
	
	private List<Hint> getHintsFromDB() throws Exception{
		if(hintsFromDB == null){
			hintsFromDB = new ArrayList<Hint>();
			for (Hint hint : hintDao.list()) {
				hint.setText(ImgTagConvertor.removeCDATA(hint.getText()));
				hint.setText(ImgTagConvertor.replaceHexWithImages(hint.getText(), "png"));
				hintsFromDB.add(hint);
			}
		}	
		return hintsFromDB;	
	}
	
	private List<Hint> tipsHints = null;
	public List<Hint> getTipsHintFromDB() throws Exception{
		if(tipsHints == null){
			tipsHints = new ArrayList<Hint>();
			for (Hint h : getHintsFromDB()) {
				if(!h.getType()){
					tipsHints.add(h);
				}
			}
		}
		return tipsHints;	
	}
	
	
	private List<Hint> errorsHints = null;
	public List<Hint> getErrorsHintFromDB() throws Exception{
		if(errorsHints == null){
			errorsHints = new ArrayList<Hint>();
			for (Hint h : getHintsFromDB()) {
				if(h.getType()){
					errorsHints.add(h);
				}
			}
		}
		return errorsHints;
	}
	
	public HintView getHintView() {
		return hintView;
	}
	
	public void setHintView(HintView hintView) {
		this.hintView = hintView;
	}
	
	public Hint getHint() {
		return hint;
	}
	
	public void setHint(Hint hint) {
		this.hint = hint;
	}
	
	public void addHint(){

		hintView.setAdd(true);
		Hint clone = SerializationUtils.clone(this.hint);
		clone.setConditions(XmlToMission.stringConditionToObject(clone.getConditionsAsString()));		
		hintView.setHint(clone);
		hintView.addEditHint();
		hintView.setAdd(false);
		newHint();
		RequestContext.getCurrentInstance().update("tbView:formDTT");
		RequestContext.getCurrentInstance().update("tbView:formDTE");
	}
	
	public void viewHint(){
		this.hintView.setDlgHintDisabled(true);
		RequestContext.getCurrentInstance().update("formDlgHints");
	}
	
	private void newHint(){
		this.hint = new Hint();
	}
	
	public void onChange(){
		// TO DO:
	}
}
