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
	public List<String[]> loadMissionsFromUsers(Long clazzId) throws Exception {
		
		Connection bdCon = null;
		List<String[]> ret = new ArrayList<>();
		try {
			bdCon = getConnection();

			Map<Long, Integer> overallMissionIndex = new HashMap<>();

			//String q = "select missionid, classlevelid from classesmissions where classid = ? order by missionorder";
			String q = "select missionid, classlevelid, count(*) from classesmissions left outer join (select * from missionsaccomplished where achieved = 'T') ma using (missionid, classid) where classid = ? group by missionid, classlevelid order by classlevelid, missionorder";
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
			
			q = "select missionid, userid, username, achieved, executions from missionsaccomplished join users using (userid) where classid = ? order by username";
			ps = bdCon.prepareStatement(q);
			ps.setLong(1, clazzId);
			rs = ps.executeQuery();
			
			long lastUserId = 0;
			
			while (rs.next()) {
				
				if (lastUserId != rs.getLong(2)) {
					
					rec = new String[totMissions+1];
					rec[0] = rs.getString(3) + ";" + rs.getString(2);
					ret.add(rec);
					lastUserId = rs.getLong(2);
					
				}
				
				i = overallMissionIndex.get(rs.getLong(1));
				rec[i] = rs.getString(4) + ";" + rs.getString(5); 
				
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
