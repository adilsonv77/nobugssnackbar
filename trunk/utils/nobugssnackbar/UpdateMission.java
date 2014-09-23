package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class UpdateMission {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");

		for (int i = 1; i < 6; i++) {
			StringBuffer xml = new StringBuffer();
			BufferedReader arq = new BufferedReader(new FileReader(new File("missions/mission0"+i+".xml")));
			do {
				
				String line = arq.readLine();
				if (line == null)
					break;
				
				xml.append(line);
				
			} while (true);
			arq.close();
			
			NoBugsConnection.getConnection().updateMission(i, xml.toString());
		}
	}

}
