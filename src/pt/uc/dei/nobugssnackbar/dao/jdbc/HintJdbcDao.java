package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.io.Serializable;

import pt.uc.dei.nobugssnackbar.dao.HintDao;
import pt.uc.dei.nobugssnackbar.model.mission.Hint;

public class HintJdbcDao extends JdbcDao<Hint> implements HintDao, Serializable{
	private static final long serialVersionUID = 1L;

}
