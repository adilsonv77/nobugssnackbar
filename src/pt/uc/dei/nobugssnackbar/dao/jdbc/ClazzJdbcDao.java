package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.ClazzDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;

public class ClazzJdbcDao extends JdbcDao<Clazz>  implements ClazzDao {

	@Override
	public List<Clazz> readByTeacher(long userId) throws Exception {
		return customList(new String[][]{{"teacherid", "="}}, new Long[]{userId});
	}


}
