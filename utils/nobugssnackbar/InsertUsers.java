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
		
		BufferedReader arq = new BufferedReader(new FileReader(new File("D:\\doutoramento\\drive\\tese\\iteracoes\\secao17\\NONIO_AlunosInscritosTurmasEdicao_IPRP_15-09-2015.csv")));
		
		long [] clazz = new long[1];
		do {
			String aluno = arq.readLine();
			if (aluno == null)
				break;
			
			String[] a = aluno.split(";");
			
			if (a.length == 3 || a[3].equals("TP1"))
				clazz[0] = 10;
			else
				if (a[3].equals("TP2"))
					clazz[0] = 8;
				else
					clazz[0] = 9;
			
			dao.insertUser(a[2], UserControl.encrypt(a[2]), a[1], a[0], null, "pt-PT", clazz);
			
		} while(true);
		
		arq.close();
	}

}
