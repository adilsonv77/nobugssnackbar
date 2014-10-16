package nobugssnackbar;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class UpdateMission {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");

		int j = 0;
		for (int i = 1; i <= 16; i++) {
			StringBuffer xml = new StringBuffer();
			BufferedReader arq = null;
			try {
				arq = new BufferedReader(new FileReader(new File("missions/mission"+(i<10?"0"+i:i)+".xml")));
				j++;
			} catch (Exception ex) {
				System.out.println(i);		
				ex.printStackTrace();
			}
			if (arq != null) {

				do {
					
					String line = arq.readLine();
					if (line == null)
						break;
					
					xml.append(line);
					
				} while (true);
				arq.close();
				
				NoBugsConnection.getConnection().updateMission(j, xml.toString());
				
			}
		}
	}

}
