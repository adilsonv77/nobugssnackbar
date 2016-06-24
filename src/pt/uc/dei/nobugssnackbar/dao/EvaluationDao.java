package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

public interface EvaluationDao {

	List<String[]> loadMissionsFromUsers(Long clazzId) throws Exception;

}
