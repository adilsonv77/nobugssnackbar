package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import pt.uc.dei.nobugssnackbar.dao.EvaluationDao;

public class EvaluationJdbcDao implements EvaluationDao {

	private Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}
	
	@Override
	public List<String[]> loadMissionsFromUsers(Long clazzId, String finishDate, int modifier) throws Exception {
		
		/*
		 * Modifier : 0 - by executions
		 * 			  1 - by time spent
		 *            2 - qt see explanation
		 */
		
		Connection bdCon = null;
		List<String[]> ret = new ArrayList<>();
		try {
			bdCon = getConnection();

			Map<Long, Integer> overallMissionIndex = new HashMap<>();
			
			String missionsaccomplish = "select * from missionsaccomplished where achieved = 'T'";
			if (finishDate != null)
				missionsaccomplish = missionsaccomplish + " and finishdate <= '" + finishDate + "'";
			
			//String q = "select missionid, classlevelid from classesmissions where classid = ? order by missionorder";
			String q = "select missionid, classlevelid, count(*) from classesmissions left outer join (" + missionsaccomplish + ") ma using (missionid, classid) where classid = ? group by missionid, classlevelid order by classlevelid, missionorder";
			PreparedStatement ps = bdCon.prepareStatement(q);
			ps.setLong(1, clazzId);
			ResultSet rs = ps.executeQuery();
			int totMissions = 0;
			List<String> missions = new ArrayList<>();
			while (rs.next()) {
				
				missions.add(rs.getString(1) + ";" + rs.getString(2) + ";" + rs.getString(3) );
				overallMissionIndex.put(rs.getLong(1), totMissions+1);
				
				totMissions++;
			}
			
			String[] rec = new String[totMissions+1];
			int i = 1;
			for (String m:missions) {
				rec[i] = m;
				i++;
			}
			ret.add(rec);
			
			missionsaccomplish = "select * from missionsaccomplished  where classid = ?" ;
			if (finishDate != null)
				missionsaccomplish = missionsaccomplish + "  and finishdate <= '" + finishDate + "'";
			
			String dataColumn = "";
			String extraSQL = "";
			switch (modifier) {
				case 0: dataColumn = "executions"; break;
				
				case 1: dataColumn = "timespend"; break;
				
				case 2: dataColumn = "count(*)"; 
				        extraSQL = "left outer join (select * from logclicks where clickid = 'goalButtonImg') lc using (missionid, userid) group by userid, missionid, achieved";
						break;
			}
			
			q = "select ma.missionid, userid, username, achieved, " + dataColumn + " from (select * from classesusers join users using (userid) where classid=?) cu left outer join (" + missionsaccomplish + ") ma using (userid) " + extraSQL + " order by username";
			ps = bdCon.prepareStatement(q);
			ps.setLong(1, clazzId);
			ps.setLong(2, clazzId);
			rs = ps.executeQuery();
			
			long lastUserId = 0;
			
			while (rs.next()) {
				
				if (lastUserId != rs.getLong(2)) {
					
					rec = new String[totMissions+1];
					rec[0] = rs.getString(3) + ";" + rs.getString(2);
					ret.add(rec);
					lastUserId = rs.getLong(2);
					
				}
				
				long mId = rs.getLong(1);
				
				if (!rs.wasNull()) {
					
					i = overallMissionIndex.get(mId);
					rec[i] = rs.getString(4) + ";" + rs.getString(5);

				}
				
			}			
			
			
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
