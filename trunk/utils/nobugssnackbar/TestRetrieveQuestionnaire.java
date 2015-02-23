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
		uc.login("bruce", "bruce");
		
		List<Questionnaire> lq = uc.retrieveQuestionnaire();
		System.out.println((lq==null?"No questions":lq.size()));
		
		System.out.println( "->" + lq.get(1).getQuestions().get(0).getDescription() );
	}

}
