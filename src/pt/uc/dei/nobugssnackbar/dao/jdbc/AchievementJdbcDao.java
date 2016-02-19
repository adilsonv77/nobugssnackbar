package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import pt.uc.dei.nobugssnackbar.dao.AchievementDao;

public class AchievementJdbcDao implements AchievementDao {

	private Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}

	@Override
	public byte[] getAchievementTypeImage(long achievementTypeId) throws SQLException {
		Connection bdCon = null;
		byte[] ret = null;
		try {
			bdCon = getConnection();
			
			Statement st = bdCon.createStatement();
			ResultSet rs = st.executeQuery("select img from achievementtypes where achievementtypeid = "+achievementTypeId);
			rs.next();
			ret = rs.getBytes(1);
			rs.close();
			st.close();
			
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
