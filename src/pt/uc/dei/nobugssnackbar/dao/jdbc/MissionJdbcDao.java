package pt.uc.dei.nobugssnackbar.dao.jdbc;

/*import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;*/

import pt.uc.dei.nobugssnackbar.dao.MissionDao;
import pt.uc.dei.nobugssnackbar.model.Mission;

public class MissionJdbcDao extends JdbcDao<Mission> implements MissionDao {

	/*public void insert(Mission obj) throws Exception {
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into missions (missionname, missioncontent, missionrepeatable) values (?, ?, ?)");
			ps.setString(1, obj.getName());
			ps.setString(2, obj.getContent());
			int repeatable = obj.isRepeatable() ? 1 : 0;
			ps.setInt(3, repeatable);

			ps.executeUpdate();
			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	}*/
}
