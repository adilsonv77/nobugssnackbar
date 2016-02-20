package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
				rs.close();
			}
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			
		}
		
		return res ;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> verifyAchievements(long userId, long classId)
			throws SQLException {
		
		Connection bdCon = null;
		List<Map<String, String>> res = new ArrayList<>();
		
		try {
			bdCon = getConnection();
			List<Object[]> rl = new ArrayList<>();
			
			String sql = "select achievementtypeclasseid, title, query from achievementtypes join achievementtypesclasses using (achievementtypeid) left outer join achievements using (achievementtypeclasseid) where classid = ? and userid is null";
			PreparedStatement ps = bdCon.prepareStatement(sql);
			ps.setLong(1, classId);
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				rl.add(new Object[]{Long.parseLong(rs.getString(1)), rs.getString(2), rs.getString(3), new HashMap<String, String>()});
			}
			ps.close();
			
			sql = "insert into achievements (achievementtypeclasseid, userid, achieveddate) values (?, ?, now())";
			ps = bdCon.prepareStatement(sql);
			ps.setLong(2, userId);

			for (int i=0; i<rl.size(); i++) {
				ps.setLong(1, (Long)rl.get(i)[0]);
				ps.executeUpdate();
			}
			ps.close();
			
			sql = "select fieldname, fieldvalue, fieldtype from achievementtypesclassesfields where achievementtypeclasseid = ? and fieldtype in ('Q', 'T')";
			ps = bdCon.prepareStatement(sql);
			
			Pattern pattern = Pattern.compile("\\[%([A-Z])\\w+%]");
			
			for (int i=0; i<rl.size(); i++) {
				
				ps.setLong(1, (Long)rl.get(i)[0] );
				String query = (String)rl.get(i)[2];
				
				Map<String, String> fieldsTitle = (Map<String, String>) rl.get(i)[3];
				fieldsTitle.put("TITLE", (String)rl.get(i)[1]);

				Map<String, String> fields = new HashMap<>();
				fields.put("[%USERID%]", userId+"");

				rs = ps.executeQuery();
				while (rs.next()) {
					
					if (rs.getString(3).equals("Q"))
						fields.put( "[%" + rs.getString(1) + "%]", rs.getString(2));
					else
						fieldsTitle.put( rs.getString(1), rs.getString(2) );
				}
				
				Matcher matcher = pattern.matcher(query);
				while (matcher.find()) {
					String s = matcher.group();
					String value = fields.get(s);
				    query = matcher.replaceFirst(value);
					matcher = pattern.matcher(query);
				}
				
				rl.get(i)[2] = query;
			}
			
			ps.close();
			
			Statement st = bdCon.createStatement();
			
			for (int i=0; i<rl.size(); i++) {
				rs = st.executeQuery((String)rl.get(i)[2]);
				if (rs.next()) {
					res.add((Map<String, String>) rl.get(i)[3]);
				}
				rs.close();
			}
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			
		}
		
		return res;
	}

}
