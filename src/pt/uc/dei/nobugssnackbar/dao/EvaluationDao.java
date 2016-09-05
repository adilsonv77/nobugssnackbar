package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

public interface EvaluationDao {

	List<String[]> loadMissionsFromUsers(Long clazzId, String finishDate,  int typeModifier) throws Exception;

	List<String[]> listStudentsAndAnswers(Long clazzId, Integer[] questionnaireClazzesId) throws Exception;

}
