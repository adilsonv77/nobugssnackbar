package nobugssnackbar;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.PreparedStatement;

import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;

public class TestInsertDescription {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		Connection con = NoBugsConnection.getConnection().getDataSource().getConnection();
		PreparedStatement ps = con.prepareStatement("update questionstest set testquestiondescription = ? where testquestionid = 1");
		
		byte[] encoded = Files.readAllBytes(Paths.get("C:\\Users\\adilsonv77\\Downloads\\questiondescription.txt"));
		String description = new String(encoded, StandardCharsets.ISO_8859_1);
		
		ps.setString(1, description);
		ps.execute();
		con.close();
	}

}
