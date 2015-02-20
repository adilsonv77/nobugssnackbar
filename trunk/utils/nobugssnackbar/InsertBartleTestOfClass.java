package nobugssnackbar;

import pt.uc.dei.nobugssnackbar.control.BartleTest;
import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class InsertBartleTestOfClass {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");

		// creates bartlequestions to these classes
		BartleTest.saveBartleQuestionsOfClass(1);
		BartleTest.saveBartleQuestionsOfClass(4);

	}

}
