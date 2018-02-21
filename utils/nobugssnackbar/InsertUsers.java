package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import pt.uc.dei.nobugssnackbar.control.UserControl;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.GameJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;

public class InsertUsers {

	public static void main(String[] args) throws Exception {
		
/* 
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
*/		
		NoBugsConnection.buildConnection("jdbc:mysql://nobugs.ceavi.udesc.br:3306/newnobugs", 
				"com.mysql.jdbc.Driver", "root", "Xj785m");
		
		GameDao dao = new GameJdbcDao();
		
		BufferedReader arq = new BufferedReader(new FileReader(new File("alunos-2018-1.csv")));
		
		long [] clazz = new long[]{1};
		
		do {
			String aluno = arq.readLine();
			if (aluno == null)
				break;
			
			String[] a = aluno.split(";");
			
			
			dao.insertUser(a[0], UserControl.encrypt(a[0]), a[1], (a.length==3?a[2]:"M"), null, "pt-BR", clazz);
			
		} while(true);
		
		arq.close();
	}

}
