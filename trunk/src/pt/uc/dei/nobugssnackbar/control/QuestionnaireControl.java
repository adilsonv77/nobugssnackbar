package pt.uc.dei.nobugssnackbar.control;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.User;

@RemoteProxy(scope=ScriptScope.SESSION, name="QuestControl")
public class QuestionnaireControl {

	private User user;

	@RemoteMethod
	public List<Questionnaire> login(String nick, String passw) throws Exception {
			
		this.user = NoBugsConnection.getConnection().login(nick, UserControl.encrypt(passw));
		
		Questionnaire questionnaire = NoBugsConnection.getConnection().retrieveParticularQuestionnaire(this.user, 5L);
		
		List<Questionnaire> l = new ArrayList<>();
		if (questionnaire != null)
			l.add(questionnaire);
		
		return l;
		
	}
	
	@RemoteMethod
	public void logoff() {
		this.user = null;
	}
	
	@RemoteMethod
	public void saveQuestionnaire(String[][] answers) throws NumberFormatException, SQLException {
		NoBugsConnection nobugs = NoBugsConnection.getConnection();
		for(int i = 0;i< answers.length;i++) {
			
			nobugs.insertAnswer(Long.parseLong(answers[i][0]), Long.parseLong(answers[i][1]), this.user.getId(), answers[i][2]);
			
		}
	}
	
	
}
