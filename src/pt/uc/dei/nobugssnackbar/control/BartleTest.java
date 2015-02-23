package pt.uc.dei.nobugssnackbar.control;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.BartleType;

public class BartleTest {

	public static List<BartleType> bartleClassification(Long userId) throws SQLException {
		List<BartleType> l = new ArrayList<>();
		Connection bdCon = null;
		try {
			bdCon = NoBugsConnection.getConnection().getDataSource().getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(
				"select questionanswer, count(questionanswer) resp from questionnaireanswer "+
			         "where questionid in (select questionid from bartletestquestions) and userid = ? "+
				     "group by questionanswer "+
			         "order by resp desc");
			ps.setLong(1, userId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				String type = rs.getString(1);
				if (type.equals("A")) {
					type = "Pontuador";
				} else 
					if (type.equals("K"))
						type = "Assassino";
					else
						if (type.equals("E"))
							type = "Explorador";
						else
							type = "Social";
								
				l.add(new BartleType(type, rs.getInt(2) * 100 / 30));
							
			}
			ps.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
			
		return l;
	}

	public static List<Long> selectQuestionsOfClass(long userid, List<Long> classes) throws SQLException {
		List<Long> l = new ArrayList<>();

		Connection bdCon = null;
		try {
			bdCon = NoBugsConnection.getConnection().getDataSource().getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(
					"select count(*) from questionnaireanswer join questionsquestionnaire using (questionid) "
							+ "  join questionnaireclasses using (questionnaireid)"
							+ " where questionnaireid = 2 and classid = ? and userid = ?");
			long classGoal = 0;
		
			ps.setLong(2, userid);
			for (Long c:classes) {
				ps.setLong(1, c);
				ResultSet rs = ps.executeQuery();
				rs.next();
				long q = rs.getLong(1);
				rs.close();
				
				if (q == 0) {
					classGoal = c;
					break;
				}
					
			}
			ps.close();
			
			if (classGoal > 0) {
				ps = bdCon.prepareStatement("select questionid from bartletestclassquestions where classid = ?");
				ps.setLong(1, classGoal);
				
				ResultSet rs = ps.executeQuery();
				while (rs.next()) {
					l.add(rs.getLong(1));
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

		return l;
	}
	
	

}

