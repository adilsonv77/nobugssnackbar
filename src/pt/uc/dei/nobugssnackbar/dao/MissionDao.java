package pt.uc.dei.nobugssnackbar.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Mission;

public class MissionDao {

	private Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}

	public List<Mission> list() throws SQLException {

		List<Mission> l = new ArrayList<>();
		Connection bdCon = null;
		try {
			bdCon = getConnection();

			Statement stm = bdCon.createStatement();
			ResultSet rs = stm.executeQuery("select missionname from missions");
			while (rs.next()) {
				l.add(new Mission(rs.getString("missionname")));
			}
			stm.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return l;

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


}
