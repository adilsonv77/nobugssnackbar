package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.sql.SQLException;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class PopulateMissions {

	public static void main(String[] args) throws ClassNotFoundException, SQLException, IOException {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		String titles[] = {"Movimentar cozinheiro", "Perguntar ao cliente e criar variáveis"};
		StringBuffer xml; 
		BufferedReader arq; 

		for (int i = 1; i < 3; i++) {
			
			xml = new StringBuffer();
			arq = new BufferedReader(new FileReader(new File("missions/mission0" + i + ".xml")));
			do {
				
				String line = arq.readLine();
				if (line == null)
					break;
				
				xml.append(line);
				
			} while (true);
			arq.close();
			
			NoBugsConnection.getConnection().insertMission(titles[i-1], xml.toString());
			
		}
		
	}

}
