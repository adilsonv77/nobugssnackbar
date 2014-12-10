<%@page import="pt.uc.dei.nobugssnackbar.dao.NoBugsConnection"%>
<%@page import="java.sql.*"%>
<%@ page 
language="java" 
contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"
%>
<%
NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar",  "com.mysql.jdbc.Driver", "root", "root");

Connection con = NoBugsConnection.getConnection().getDataSource().getConnection();
PreparedStatement ps = con.prepareStatement("update questionnaire set questionnairedescription = ? where questionnaireid = ?");

ps.setString(1, "Queremos identificar em que tipo de jogador você se enquadra.");
ps.setInt(2, 2);

ps.executeUpdate();

ps.setString(1, "Desejamos identificar os seus hábitos quanto aos jogos.");
ps.setInt(2, 3);

ps.executeUpdate();

ps.setString(1, "Queremos identificar como você se sente após jogar essas fases do jogo.");
ps.setInt(2, 4);

ps.executeUpdate();

con.close();
%>