package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class PopulateMissions {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		String titles[] = {"Teste"}; //{"Movimentar cozinheiro", "Perguntar ao cliente e criar variáveis"};
		StringBuffer xml; 
		BufferedReader arq; 
		
		int j = 0;

		for (int i = 1; i < 2; i++) {
			
			xml = new StringBuffer();
			arq = new BufferedReader(new FileReader(new File("missions/mission08.xml")));
			do {
				
				String line = arq.readLine();
				if (line == null)
					break;
				
				xml.append(line);
				
			} while (true);
			arq.close();
			
			NoBugsConnection.getConnection().insertMission("Mission default", xml.toString());
			j++;
			
		}
		
	}

}
