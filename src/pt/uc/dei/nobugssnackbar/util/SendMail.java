package pt.uc.dei.nobugssnackbar.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMail {

	private Properties props;
	private String password;
	private String username;

	public SendMail(String appFolder) {
		String mailProperties = appFolder + "/META-INF/mail.properties";
		try {
			
			this.props = new Properties();

			props.load(new InputStreamReader(new FileInputStream(new File(mailProperties))));
			
			this.username = props.getProperty("username"); 
			this.password = props.getProperty("password");

			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", "smtp.gmail.com");
			props.put("mail.smtp.port", "587");
		} catch (Exception ex) {
			
		}
	}
	
	public void sendWelcomeMail(String dest) throws Exception {

		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});
		
		Message msg = new MimeMessage(session);
		msg.setContent("<h1>Congratulations!</h1>"
				+ "<p>"
				+ "<p>"
				+ "<p>You were successfully registered in our game NoBug's Snack Bar."
				+ "<br>Thank you for playing our game!"
				+ "<p>"
				+ "<p>"
				+ "<h3>Best regards,"
				+ "<br>NoBug's Snack Bar team</h3>", "text/html");
		msg.setFrom(new InternetAddress("nobugssnackbar@example.com"));
		msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(dest));

		msg.setSubject("Your NoBug's Snack Bar account has been created");
		//msg.setText(msgBody);
		Transport.send(msg);

	}

	public void sendRegisterMail(String userMail, String userId) {
		// TODO Auto-generated method stub
		// "http://nobugssnackbar.dei.uc.pt/confirmUser?id" + userId
		
	}

}
