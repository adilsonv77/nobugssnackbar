package nobugssnackbar;

import java.sql.SQLException;

import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;

public class InsertImmersionQuestionnaire {

	private static long idQuest;

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		idQuest = NoBugsConnection.getConnection().createQuestionnaire(1, "O propósito do presente questionário é avaliar o engajamento sentido pelo jogador.");
		
		insertQuestion(1, "Enquanto eu jogava perdi a noção do tempo.");
		insertQuestion(2, "Enquanto eu jogava o jogo fluiu automaticamente.");
		insertQuestion(3, "Enquanto eu jogava senti-me diferente.");
		insertQuestion(4, "Enquanto eu jogava senti-me assustado(a).");
		insertQuestion(5, "Enquanto eu jogava o jogo seguiu a realidade.");
		insertQuestion(6, "Enquanto eu jogava se alguém me chamasse, eu não atenderia.");
		insertQuestion(7, "Enquanto eu jogava senti-me entusiasmado(a).");
		insertQuestion(8, "Enquanto eu jogava parece que o tempo parou.");
		insertQuestion(9, "Enquanto eu jogava senti-me desorientado(a).");
		insertQuestion(10, "Enquanto eu jogava não responderia se alguém falasse comigo.");
		insertQuestion(11, "Enquanto eu jogava não posso dizer que me estava a cansar.");
		insertQuestion(12, "Enquanto eu jogava minhas ações fluíam automaticamente.");
		insertQuestion(13, "Enquanto eu jogava raciocinava rapidamente.");
		insertQuestion(14, "Enquanto eu jogava perdi a noção de onde estava.");
		insertQuestion(15, "Enquanto eu jogava não parava para pensar como funciona o jogo.");
		insertQuestion(16, "Enquanto eu jogava sentia-me calmo(a).");
		insertQuestion(17, "Enquanto eu jogava acabei por jogar mais tempo do que pretendia.");
		insertQuestion(18, "Enquanto eu jogava sentia-me realmente dentro do jogo.");
		insertQuestion(19, "Enquanto eu jogava sentia-me como se não pudesse parar de jogar.");

	}

	private static void insertQuestion(int i, String description) throws SQLException {
		long idQuestion = NoBugsConnection.getConnection().insertQuestion(idQuest, i, description, "L", true);
		if (i == 1) {
			NoBugsConnection.getConnection().insertOption(idQuestion, "Concordo plenamente", 1, "1");
			NoBugsConnection.getConnection().insertOption(idQuestion, "Condordo", 2, "2");
			NoBugsConnection.getConnection().insertOption(idQuestion, "Talvez", 3, "3");
			NoBugsConnection.getConnection().insertOption(idQuestion, "Discordo", 4, "4");
			NoBugsConnection.getConnection().insertOption(idQuestion, "Discordo plenamente", 5, "5");
		}
		
	}

}
