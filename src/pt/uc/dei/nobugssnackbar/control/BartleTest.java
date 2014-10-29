package pt.uc.dei.nobugssnackbar.control;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class BartleTest {

	public static void addPlayerType(long idOpt, String playerType) throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = NoBugsConnection.getConnection().getDataSource().getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into bartletestoptions (questionoptionsid, bartletesttype) values (?, ?)");
			ps.setLong(1, idOpt);
			ps.setString(2, playerType);
			
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

