package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.MissionDao;
import pt.uc.dei.nobugssnackbar.model.mission.Mission;

public class MissionJdbcDao extends JdbcDao implements MissionDao {

	public List<Mission> list() throws Exception {
		
		return listObjects("select missionname from missions", Mission.class);

	}
	
	public void insertMission(String name, String xml) throws SQLException {

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into missions (missionname, missioncontent) values (?, ?)");
			ps.setString(1, name);
			ps.setString(2, xml);

			ps.executeUpdate();
			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	}

	@Override
	public Mission read(long key) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(Mission obj) throws Exception {
		// TODO Auto-generated method stub
		
	}


}
