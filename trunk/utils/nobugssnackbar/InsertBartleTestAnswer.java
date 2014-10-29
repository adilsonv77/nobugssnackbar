package nobugssnackbar;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import pt.uc.dei.nobugssnackbar.control.BartleTest;
import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class InsertBartleTestAnswer {

	
	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		List<Long> list = BartleTest.selectQuestions();
		NoBugsConnection nobugs = NoBugsConnection.getConnection();
		
		String sql = "select * from questionsquestionnaire join questions using (questionid) join questionoptions using (questionid) join bartletestoptions using (questionoptionsid) where questionnaireid = 2";
		
		Random r = new Random();
		Map<Long, String> sort = new HashMap<>();
		
		Connection con = nobugs.getDataSource().getConnection();
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);
		while (rs.next()) {
			if (list.indexOf(rs.getLong("questionid")) >= 0) {
				int s = r.nextInt(1);
				if (s == 1) 
					rs.next();
				
				sort.put(rs.getLong("questionid"), rs.getString("bartletesttype"));
				if (s == 0)
					rs.next();
			} else {
				rs.next();
			}
		}
		st.close();
		
		for (Long k : sort.keySet())
			nobugs.insertAnswer(2, k, 4, sort.get(k));
			
	}
	
}
