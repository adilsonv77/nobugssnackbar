package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class InsertBartleTest {

	public static void main(String[] args) throws Exception {
		
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		BufferedReader test =  new BufferedReader(new FileReader(new File("bartleteste.txt")));
		long idQuest = NoBugsConnection.getConnection().createQuestionnaire(1, "O propósito do presente questionário é avaliar em tipo de jogador você se alinha.");
		
		int order = 1;
		while (true) {
			
			String question = test.readLine();
			if (question == null)
				break;
			
			String answ1 = test.readLine();
			String answ2 = test.readLine();
			
			test.readLine(); // blank line
			
			long idQuestion = NoBugsConnection.getConnection().insertQuestion(idQuest, order, question, "S", true);
			
			NoBugsConnection.getConnection().insertOption(idQuestion, answ1, 1);
			NoBugsConnection.getConnection().insertOption(idQuestion, answ2, 2);
			order++;
		}
		
		test.close();
		

	}

}
