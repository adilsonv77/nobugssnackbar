package nobugssnackbar;

import java.util.Random;

import pt.uc.dei.nobugssnackbar.control.UserControl;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.GameJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;

public class GenerateUsers {

	private static Random r;
	private static String s;

	private static String extractChar() {
		
		int x = r.nextInt(s.length()-1) + 1;
		return s.substring(x, x+1);
	}
	
	public static void main(String[] args) throws Exception {
		
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		GameDao dao = new GameJdbcDao();
		
		r = new Random();
		s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		
		for (int i = 1; i <= 10; i++) {
			
			
			String s1 = extractChar() + extractChar() + extractChar() + extractChar() + extractChar() + extractChar();
			
			System.out.println("{\""+s1+"\", \"UDESC "+i+"\", \"M\"},");
			
			dao.insertUser(s1, UserControl.encrypt(s1), s1, "M", null, "pt-BR", new long[]{1});
			
		}
		
		

	}

}
