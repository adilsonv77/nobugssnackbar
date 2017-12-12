package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.MissionFromLevelDao;
import pt.uc.dei.nobugssnackbar.model.MissionFromLevel;

public class MissionFromLevelJdbcDao extends JdbcDao<MissionFromLevel> implements MissionFromLevelDao  {

	@Override
	public List<MissionFromLevel> list(Long clazzId) throws Exception {
		List<MissionFromLevel> ret = null;
		Connection bdCon = null;
		try {

			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement("select missionorder, missionid, missionname, missioncontent, missionrepeatable, missiontype, missionorder, classid, classlevelid from missions join classesmissions using (missionid) where classid = ? order by classlevelid, missionorder;");
			ps.setLong(1, clazzId);
			ResultSet rs = ps.executeQuery();
			ret = new ArrayList<>();
			while (rs.next()) {

				MissionFromLevel m = transformResultSetToObject(rs);
				ret.add(m);
				
			}
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return ret;
	}
}
