package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import pt.uc.dei.nobugssnackbar.dao.jdbc.MissionJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;

public class PopulateMissions {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		String titles[] = {"Teste"}; //{"Movimentar cozinheiro", "Perguntar ao cliente e criar variáveis"};
		StringBuffer xml; 
		BufferedReader arq; 
		
		for (int i = 17; i <= 17; i++) {
			
			xml = new StringBuffer();
			arq = new BufferedReader(new FileReader(new File("missions/mission"+(i<10?"0"+i:i)+".xml")));
			do {
				
				String line = arq.readLine();
				if (line == null)
					break;
				
				xml.append(line);
				
			} while (true);
			arq.close();
			
			(new MissionJdbcDao()).insertMission("Mission default", xml.toString());
			
		}
		
	}

}
