package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import pt.uc.dei.nobugssnackbar.dao.MissionDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.MissionJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.Mission;

public class PopulateMissions {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugsexp4", 
				"com.mysql.jdbc.Driver", "root", "root");
	//	String titles[] = {"Teste"}; //{"Movimentar cozinheiro", "Perguntar ao cliente e criar variáveis"};
		StringBuffer xml; 
		BufferedReader arq; 
		
		MissionDao mDao = new MissionJdbcDao();
		
		for (int i = 143; i <= 143; i++) {
			
			xml = new StringBuffer();
			arq = new BufferedReader(new FileReader(new File("missions/mission"+(i<10?"0"+i:i)+".xml")));
			do {
				
				String line = arq.readLine();
				if (line == null)
					break;
				
				xml.append(line);
				
			} while (true);
			arq.close();
			
			mDao.save(new Mission(0L, "Mission default", xml.toString(), false ));
			
		}
		
	}

}
