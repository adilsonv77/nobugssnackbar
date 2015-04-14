package pt.uc.dei.nobugssnackbar.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;

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
	
	public void sendWelcomeMail(String dest, String locale) throws Exception {

		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});

		Message msg = new MimeMessage(session);
		ResourceBundle m = ApplicationMessages.getMessage(locale);

		String msgText = "<h1>" + m.getString("welcMailMsgCongratulations")
				+ "</h1>" + "<p>" + "<p>" + "<p>"
				+ m.getString("welcMailMsgSuccessfully") + "<br>"
				+ m.getString("welcMailMsgNow") + "<br>"
				+ m.getString("welcMailMsgThankYou") + "<p>" + "<p>" + "<h3>"
				+ m.getString("welcMailMsgRegards") + "<br>"
				+ m.getString("welcMailMsgNoBug'sTeam") + "</h3>";

		msg.setContent(msgText, "text/html");
		msg.setFrom(new InternetAddress("nobugssnackbar@gmail.com"));
		msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(dest));

		msg.setSubject("Your NoBug's Snack Bar account has been created!");
		Transport.send(msg);

	}

	public void sendRegisterMail(String userMail, String userId, String locale)
			throws Exception {
		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});

		Message msg = new MimeMessage(session);
		ResourceBundle m = ApplicationMessages.getMessage(locale);

		String msgText = "<h1>" + m.getString("regMailMsgLastStep") + "</h1>"
				+ "<p>" + "<p>" + "<p>" + m.getString("regMailMsgToComplete")
				+ "<a href='http://nobugssnackbar.dei.uc.pt/confirmUser?id="
				+ userId + "'>" + m.getString("here") + "</a>." + m.getString("regMailMsgWasn'tYou") + "<p>" + "<p>" + "<h3>"
				+ m.getString("welcMailMsgRegards") + "<br>"
				+ m.getString("welcMailMsgNoBug'sTeam") + "</h3>";

		msg.setContent(msgText, "text/html");

		msg.setFrom(new InternetAddress("nobugssnackbar@gmail.com"));
		msg.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse(userMail));

		msg.setSubject("You must confirm your registration!");
		Transport.send(msg);
	}

}
