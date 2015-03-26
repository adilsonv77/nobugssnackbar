package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.util.List;
import pt.uc.dei.nobugssnackbar.model.HintCategory;

public interface IHintCategoryProvider {
	List<HintCategory> getHintCategories() throws Exception;
}
