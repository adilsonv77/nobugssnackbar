package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.SQLException;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class PopulateMissions {

	public static void main(String[] args) throws ClassNotFoundException, SQLException, IOException {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		StringBuffer xml = new StringBuffer();
		BufferedReader arq = new BufferedReader(new FileReader(new File("missions/mission01.xml")));
		do {
			
			String line = arq.readLine();
			if (line == null)
				break;
			
			xml.append(line);
			
		} while (true);
		arq.close();
		
		NoBugsConnection.getConnection().insertMission("Learn to move", xml.toString());
	}

}
