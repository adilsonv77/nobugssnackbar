package nobugssnackbar;

import pt.uc.dei.nobugssnackbar.control.UserControl;
import pt.uc.dei.nobugssnackbar.dao.jdbc.FactoryJdbcDao;

public class TestReadBlob {

	public static void main(String[] args) throws Exception {
		
		UserControl uc = new UserControl(new FactoryJdbcDao("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root"), "c:/temp/m");
		uc.login("2", "2");
		uc.loadMachinesFromUser();
		
	}
	
}
