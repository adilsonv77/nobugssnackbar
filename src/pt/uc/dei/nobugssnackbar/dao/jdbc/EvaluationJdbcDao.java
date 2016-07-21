package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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
		 *            2 - qt saw explanation
		 *            3 - time saw explanation 
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
						
				case 3: dataColumn = "timespent";
						extraSQL = "left outer join (select * from logclickstemp) lc using (missionid, userid) group by userid, missionid, achieved";
						populateLogClicksTemp(bdCon, clazzId);
						break;
			}
			
			q = "select ma.missionid, userid, username, achieved, " + dataColumn + " from (select * from classesusers join users using (userid) where classid=? and currently = 'T') cu left outer join (" + missionsaccomplish + ") ma using (userid) " + extraSQL + " order by username";
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

	private void populateLogClicksTemp(Connection bdCon, Long clazzId) throws SQLException {
		
		Statement st = bdCon.createStatement();
		st.executeUpdate("delete from logclickstemp");
		st.close();
		
		String sql = "select * from logclicks where "
				+ " userid in (select userid from classesusers where classid = ? and currently = 'T') and "
				+ " (clickid = 'previousexplanation' or clickid = 'nextexplanation' or clickid = 'finishexplanation' or clickid = 'goalButtonImg' or clickid = 'dialogVictory' or clickid like 'level_%'  or clickid = 'mission_level') order by userid, clickmoment";
		
		PreparedStatement ps = bdCon.prepareStatement(sql);
		ps.setLong(1, clazzId);
		ResultSet rs = ps.executeQuery();
		
		Long lastUserId = Long.MIN_VALUE;
		Long accumTime = 0L;
		
		Long missionId, userId;
		
		Map<Long, Map<Long, Long[]>> idx = new HashMap<>();
		
		Time prevDate = null;
		
		while (rs.next()) {
			
			missionId = rs.getLong("missionid");
			userId = rs.getLong("userid");
			String clickId = rs.getString("clickid");
			
			System.out.println(missionId + " " + userId + " " + clickId + " " + rs.getTime("clickmoment"));
			
			if (userId != lastUserId || !(clickId.equals("nextexplanation") || clickId.equals("previousexplanation"))) {
				
				if (clickId.equals("finishexplanation")) {
					
					Time d = rs.getTime("clickmoment");
					
					long diff = d.getTime() - prevDate.getTime();
					long seconds = TimeUnit.MILLISECONDS.toSeconds(diff);
					
					accumTime += seconds;

				}
				
				if (accumTime > 0) {
					
					Map<Long, Long[]> missions = idx.get(lastUserId);
					if (missions == null) {
						missions = new HashMap<Long, Long[]>();
						idx.put(lastUserId, missions);
					}
					
					Long[] rec = missions.get(missionId);
					if (rec == null) {
						
						rec = new Long[3];
						rec[0] = lastUserId;
						rec[1] = missionId;
						rec[2] = accumTime;
						
						missions.put(missionId, rec);
					} else
						rec[2] += accumTime;
				} 
				
				prevDate = rs.getTime("clickmoment");
				
				lastUserId = userId;
				accumTime = 0L;
				
			} else {
			
				Time d = rs.getTime("clickmoment");
				
				long diff = d.getTime() - prevDate.getTime();
				long seconds = TimeUnit.MILLISECONDS.toSeconds(diff);
				
				accumTime += seconds;
				
				prevDate = d;

			}
		}
		ps.close();
		
		ps = bdCon.prepareStatement("insert into logclickstemp (userid, missionid, timespent) values (?, ?, ?)");
		
		for (Map<Long, Long[]> missions:idx.values()) {
			
			for (Long[] recs: missions.values()) {
				ps.setLong( 1, recs[0] );
				ps.setLong( 2, recs[1] );
				ps.setLong( 3, recs[2] );
				ps.executeUpdate();
			}
			
		}
		ps.close();
		
	}
		

}
