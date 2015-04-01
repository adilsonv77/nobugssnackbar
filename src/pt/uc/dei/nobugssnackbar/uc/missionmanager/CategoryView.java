package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;


import javax.faces.context.FacesContext;

import org.primefaces.event.SelectEvent;
import org.primefaces.event.UnselectEvent;

import pt.uc.dei.nobugssnackbar.dao.HintCategoryDao;
import pt.uc.dei.nobugssnackbar.model.HintCategory;
import pt.uc.dei.nobugssnackbar.model.mission.Hint;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.CategoryProviderConverter;

@ManagedBean(name = "categoryView")
@SessionScoped
public class CategoryView implements Serializable, IHintCategoryProvider {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value="#{factoryDao.hintCategoryDao}")
	private transient HintCategoryDao hintCategoryDao;
	
	@ManagedProperty(value="#{hintView}")
	private HintView hw;


	// #region private variables
	private HintCategory hCategory;
	private List<HintCategory> hCategories;
	private CategoryProviderConverter cpc;
	// #end
 
	public CategoryView(){
		System.out.println(" CategoryView created...");
		cpc = new CategoryProviderConverter();
		cpc.setProvider(this);
	}
	// #region getters and setters
	public HintView getHw() {
		return hw;
	}
	public void setHw(HintView hw) {
		this.hw = hw;
	}
	public HintCategory getHCategory() {
		if (hCategory == null) {
			hCategory = new HintCategory();
		}
		return hCategory;
	}

	public void setHCategory(HintCategory category) {
		this.hCategory = category;
	}
	
	public HintCategoryDao getHintCategoryDao() {
		return hintCategoryDao;
	}

	public void setHintCategoryDao(HintCategoryDao hintCategoryDao) {
		this.hintCategoryDao = hintCategoryDao;
	}
	
	public void setCpc(CategoryProviderConverter cpc) {
		this.cpc = cpc;
	}
	
	public CategoryProviderConverter getCpc() {
		return cpc;
	}
	
	public void setHintCategories(List<HintCategory> hCategories) {
		this.hCategories = hCategories;
	}
	
	@Override
	public List<HintCategory> getHintCategories() throws Exception {
		if (hCategories == null) {
			hCategories = hintCategoryDao.list();
		}
		System.out.println(hCategories);
		return hCategories;
	}
	// #end
	

	// #region user defined methods
	public void setElementByID(){
		int selectedHCategoryID = Integer.parseInt(
				FacesContext.
				getCurrentInstance().
				getExternalContext().
				getRequestParameterMap().
				get("hCategoryID")
		);

		hCategory = new HintCategory();
		
		for (int i = 0; i < hCategories.size(); i++) {
			if (hCategories.get(i).getId() == selectedHCategoryID) {
				hCategory.setId(hCategories.get(i).getId());
				hCategory.setTitle(hCategories.get(i).getTitle());
				hCategory.setDescription(hCategories.get(i).getDescription());
				hCategory.setBody(hCategories.get(i).getBody());
				break;
			}
		}

		hw.getHint().setObjHintCategory(hCategory);

		System.out.println("hintView " + hw.toString());
	}
	// #end
}
