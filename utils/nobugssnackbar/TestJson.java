package nobugssnackbar;

import java.util.ResourceBundle;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;

public class TestJson {
	
	public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException {
		 ResourceBundle m = ApplicationMessages.getMessage("en");
		 System.out.println( m.getString("Single.Mission") );
		 System.out.println( m.getString("nomissions") );
		
		 m = ApplicationMessages.getMessage("pt");
		 System.out.println( m.getString("Single.Mission") );
		 System.out.println( m.getString("nomissions") );
	}

}
