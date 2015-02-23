package nobugssnackbar;

import java.util.List;

import pt.uc.dei.nobugssnackbar.control.UserControl;
import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;

public class TestRetrieveQuestionnaire {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");

		
		UserControl uc = new UserControl();
		uc.login("celine", "celine");
		
		List<Questionnaire> lq = uc.retrieveQuestionnaire();
		System.out.println((lq==null?"No questions":lq.size()));

		for (Questionnaire q:lq)
			System.out.println(q.getDescription());
		
	}

}
