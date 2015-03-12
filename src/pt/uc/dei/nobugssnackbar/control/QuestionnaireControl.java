package pt.uc.dei.nobugssnackbar.control;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.User;

@RemoteProxy(scope=ScriptScope.SESSION, name="QuestControl")
public class QuestionnaireControl {

	private User user;
	private GameDao gameDao;
	
	public QuestionnaireControl() {
		WebContext ctx = WebContextFactory.get();
		AbstractFactoryDao factoryDao = (AbstractFactoryDao) ctx.getServletContext().getAttribute("factoryDao");
		this.gameDao = factoryDao.getGameDao();
	}

	@RemoteMethod
	public List<Questionnaire> login(String nick, String passw) throws Exception {
			
		this.user = gameDao.login(nick, UserControl.encrypt(passw));
		
		Questionnaire questionnaire = gameDao.retrieveParticularQuestionnaire(this.user, 5L);
		
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
	public void saveQuestionnaire(String[][] answers) throws Exception {
		for(int i = 0;i< answers.length;i++) {
			
			gameDao.insertAnswer(Long.parseLong(answers[i][0]), Long.parseLong(answers[i][1]), this.user.getId(), answers[i][2]);
			
		}
	}
	
	
}
