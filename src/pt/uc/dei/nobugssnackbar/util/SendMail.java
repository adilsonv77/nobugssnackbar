package pt.uc.dei.nobugssnackbar.util;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMail {

	public void send(String dest) throws Exception {
		final String username = "nobugssnackbar@gmail.com";
		final String password = "withoutmistakes";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

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

}
