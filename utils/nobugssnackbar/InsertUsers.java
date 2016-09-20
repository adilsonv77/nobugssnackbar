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
		
 
		NoBugsConnection.buildConnection("jdbc:mysql://nobugssnackbar.dei.uc.pt:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "nobugs", "n0bug5v1d4l0k4");
		
		GameDao dao = new GameJdbcDao();
		
		BufferedReader arq = new BufferedReader(new FileReader(new File("D:\\doutoramento\\drive\\tese\\iteracoes\\secao22\\alunos.csv")));
		
		long [] clazz = new long[]{9};
		
		do {
			String aluno = arq.readLine();
			if (aluno == null)
				break;
			
			String[] a = aluno.split(";");
			
			
			dao.insertUser(a[1], UserControl.encrypt(a[1]), a[0], a[3], null, "pt-BR", clazz);
			
		} while(true);
		
		arq.close();
	}

}
