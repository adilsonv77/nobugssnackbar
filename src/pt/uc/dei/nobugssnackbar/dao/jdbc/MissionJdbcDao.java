package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.MissionDao;
import pt.uc.dei.nobugssnackbar.model.Mission;

public class MissionJdbcDao extends JdbcDao<Mission> implements MissionDao {
	
	public void deleteMission(Integer key) throws Exception {
		Connection bdCon = null;
		
		String delCM = "delete from classesmissions where missionid = ?";
		String delM = "delete from missions where missionid = ?";
		
		PreparedStatement psDeleteCM = null;
		PreparedStatement psDeleteM = null;
		
		try {
			bdCon = getConnection();
			bdCon.setAutoCommit(false);
			
			psDeleteCM = bdCon.prepareStatement(delCM);
			psDeleteCM.setInt(1, key);
			psDeleteCM.executeUpdate();
			
			psDeleteM = bdCon.prepareStatement(delM);
			psDeleteM.setInt(1, key);
			psDeleteM.executeUpdate();
			
			bdCon.commit();
		}
		catch (SQLException e) {
			System.err.println(e.getMessage());
			bdCon.rollback();
		}
		finally {
			if (psDeleteCM != null) {
				psDeleteCM.close();
			}
			
			if (psDeleteM != null) {
				psDeleteM.close();
			}
			
			if (bdCon != null) {
				try {
					bdCon.close();
				}
				catch (SQLException ignore) {
				}
			}
		}

	}

}
