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
		
		// 10-TP1; 8-TP2; 9-TP3 
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		GameDao dao = new GameJdbcDao();
		
		BufferedReader arq = new BufferedReader(new FileReader(new File("D:\\doutoramento\\drive\\tese\\iteracoes\\secao19\\alunos.txt")));
		
		long [] clazz = new long[]{1};
		
		do {
			String aluno = arq.readLine();
			if (aluno == null)
				break;
			
			String[] a = aluno.split(";");
			
			
			dao.insertUser(a[0], UserControl.encrypt(a[0]), a[1], a[2], null, "pt-BR", clazz);
			
		} while(true);
		
		arq.close();
	}

}
