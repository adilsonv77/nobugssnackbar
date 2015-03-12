package nobugssnackbar;

import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.jdbc.MissionJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.mission.Mission;

public class TestJdbcDao {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		MissionJdbcDao mDao = new MissionJdbcDao();
		List<Mission> l = mDao.list();
		for (Mission m: l)
			System.out.println(m.getName());
		System.out.println(l.size());
	}
}
