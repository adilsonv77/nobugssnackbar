package pt.uc.dei.nobugssnackbar.dao.jdbc;

import pt.uc.dei.nobugssnackbar.dao.MissionDao;
import pt.uc.dei.nobugssnackbar.model.Mission;

public class MissionJdbcDao extends JdbcDao<Mission> implements MissionDao {

	/*
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
*/
	@Override
	public Mission read(long key) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}


}
