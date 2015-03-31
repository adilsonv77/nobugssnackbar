package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.List;





import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;


import pt.uc.dei.nobugssnackbar.dao.HintCategoryDao;
import pt.uc.dei.nobugssnackbar.model.HintCategory;
import pt.uc.dei.nobugssnackbar.uc.missionmanager.converter.CategoryProviderConverter;

@ManagedBean(name = "categoryView")
@SessionScoped
public class CategoryView implements Serializable, IHintCategoryProvider {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{factoryDao.hintCategoryDao}")
	private transient HintCategoryDao hintCategoryDao;



	// #region private variables
	private HintCategory hCategory = null;
	private List<HintCategory> hCategories;
	private CategoryProviderConverter cpc;
	// #end
 
	public CategoryView(){
		System.out.println(" CategoryView created...");
		cpc = new CategoryProviderConverter();
		cpc.setProvider(this);
	}
	// #region getters and setters
	public HintCategory getCategory() {
		if (hCategory == null) {
			hCategory = new HintCategory();
		}
		return hCategory;
	}

	public void setCategory(HintCategory category) {
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
		return hCategories;
	}
	// #end
	

	// #region user defined methods
	// #end
}
