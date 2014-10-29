package pt.uc.dei.nobugssnackbar.control;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class BartleTest {

	public static void addPlayerTypeOption(long idOpt, String playerType) throws SQLException {
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

	public static void addPlayerTypeQuestion(long idQuestion, String playerTypes) throws SQLException {
		Connection bdCon = null;
		try {
			bdCon = NoBugsConnection.getConnection().getDataSource().getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into bartletestquestions (questionid, bartletestquestiontype) values (?, ?)");
			ps.setLong(1, idQuestion);
			ps.setString(2, playerTypes);
			
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
	
	public static List<Long> selectQuestions() throws SQLException {
		List<Long> l = new ArrayList<>();
		
		Connection bdCon = null;
		try {
			bdCon = NoBugsConnection.getConnection().getDataSource().getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("select questionid from bartletestquestions where bartletestquestiontype = ?");
			
			Random r = new Random();
			String types[] = new String[] {"AE", "AK", "AS", "EK", "ES", "KS"};
			Integer qtTypes[] = new Integer[] {6, 6, 7, 7, 6, 7};
			int idx = 0;
			for (String type:types) {
				ps.setString(1,  type);
				int out1 = r.nextInt(qtTypes[idx]-1);
				int out2 = -1;
				if (qtTypes[idx] == 7) {
					out2 = r.nextInt(qtTypes[idx]-1);
					if (out2 == out1)
						out2 = (out2 + 1) % qtTypes[idx]; 
				}

				ResultSet rs = ps.executeQuery();
				for (int x = 0; x < qtTypes[idx]; x++) {
					rs.next();
					if (x != out1 && x != out2)
						l.add(rs.getLong(1));
				}
				rs.close();
				idx++;

			}
			
			Collections.shuffle(l);
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
			
		return l;
	}
	
	

}

