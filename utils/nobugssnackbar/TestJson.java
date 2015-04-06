package nobugssnackbar;

import pt.uc.dei.nobugssnackbar.i18n.Messages;

public class TestJson {
	
	public static void main(String[] args) {
		Messages m = new Messages();
		String str = m.getString("Single.Mission");
		
		System.out.println( str );
	}

}
