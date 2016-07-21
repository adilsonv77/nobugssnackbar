package nobugssnackbar;

import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.jdbc.EvaluationJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsStudents;

public class TestUCReports {
	
	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		UCReportsStudents r = new UCReportsStudents();
		r.setEvaluationDao(new EvaluationJdbcDao());
		
		List<String[]> l =  r.listStudentsByExplanationEntry(1L, null);
		for (int i = 1; i < l.size(); i++)
			System.out.println(l.get(i)[0]);
 
	}

}
