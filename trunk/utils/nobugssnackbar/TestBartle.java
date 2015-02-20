package nobugssnackbar;

import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.control.BartleTest;
import pt.uc.dei.nobugssnackbar.dao.NoBugsConnection;

public class TestBartle {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		List<Long> classes = new ArrayList<>();
		classes.add(4L);
		List<Long> ll = BartleTest.selectQuestionsOfClass(51, classes);
		System.out.println(ll.size());
		
	}
	
}
