package nobugssnackbar;

import pt.uc.dei.nobugssnackbar.util.SendMail;

public class TestSendMail {

	public static void main(String[] args) throws Exception {
	
		SendMail sm = new SendMail("D:\\doutoramento\\nobugssnackbar\\web");
		sm.sendOneMail("adilsonv77@gmail.com", "Teste", "something");

	}

}
