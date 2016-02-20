package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import pt.uc.dei.nobugssnackbar.dao.AchievementDao;
import pt.uc.dei.nobugssnackbar.model.Achievement;

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

	@Override
	public List<Achievement> listAchievements(long userId, Long classId)
			throws SQLException {
		
		Connection bdCon = null;
		List<Achievement> res = new ArrayList<>();
		try {
			List<Long> la =  new ArrayList<>();
			bdCon = getConnection();
			
			String sql = "select achievementtypeid, achievementtypeclasseid, achieveddate, title, description, rewardxp, rewardcoins from achievementtypes " + 
										"join (select * from achievementtypesclasses where classid = ?) achievtypesclass using (achievementtypeid) "+ 
										"left outer join (select * from achievements join users using (userid) where userid = ?) achievusers using (achievementtypeclasseid) ";
			PreparedStatement ps = bdCon.prepareStatement(sql);
			
			ps.setLong(1, classId);
			ps.setLong(2, userId);
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				
				Achievement a = new Achievement();
				a.setId(rs.getInt(1));
				a.setAchieved(rs.getString(3) != null);
				a.setTitle(rs.getString(4));
				a.setDescription(rs.getString(5));
				a.setRewardXP(rs.getInt(6));
				a.setRewardCoins(rs.getInt(7));
				
				res.add(a);
				
				la.add(rs.getLong(2));
			}
			
			ps.close();
			
			sql = "select fieldtype, fieldname, fieldvalue from achievementtypesclassesfields where achievementtypeclasseid = ? and fieldtype in ('T', 'D')";
			ps = bdCon.prepareStatement(sql);
			
			for (int i=0; i<la.size(); i++) {
				long id = la.get(i);
				Achievement a = res.get(i); 
				
				ps.setLong(1, id);
				
				rs = ps.executeQuery();
				while (rs.next()) {
					
					String fieldType = rs.getString(1);
					
					Map<String, String> m;
					if (fieldType.equals("T")) {
						m = a.getTitleFields();
					} else { // "D"
						m = a.getDescriptionFields();
					}

					String fieldName = rs.getString(2);
					String fieldValue = rs.getString(3);
					m.put(fieldName, fieldValue);
					
				}
				ps.close();
			}
			
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			
		}
		
		return res ;
	}

}
