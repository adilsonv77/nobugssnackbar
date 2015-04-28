package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Language;


public interface LanguageDao extends Dao<Language>  {

	List<Language> listSimilarCode(String lang) throws Exception;

}
