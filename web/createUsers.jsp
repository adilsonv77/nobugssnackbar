<%@page import="pt.uc.dei.nobugssnackbar.control.UserControl"%>
<%@page import="pt.uc.dei.nobugssnackbar.dao.NoBugsConnection"%>
<%@ page 
language="java" 
contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"
%>


<%
	String[][] u = {{"2014192393", "Ana Rafaela Lopes Correia e Ferro Nunes", "F"},
					{"2014214845", "André Filipe Matos Cabral Almeida Duarte", "M"}, 
					{"2014228035", "Beatriz da Cunha Peixoto Martins de Lacerda", "F"},
					{"2014191711", "Diogo Ferreira", "M"},
					{"2014198443", "Érica Filipa Matos Costa", "F"},
					{"2014200066", "Fábio André dos Santos Pereira", "M"},
					{"2014192126", "Felícia Figueiredo e Silva", "F"},
					{"2014176526", "Filipa da Silveira e Castro Alves Diniz", "F"},
					{"2014168770", "Francisco Moreira Ferreira Cancela", "M"},
					{"2014217800", "Gabriela da Rocha Miguel", "M"},
					{"2011144882", "Jaime Luis Fernandes Barreiros", "M"},
					{"2014198580", "Joana Carvalhas Nogueira Souto", "F"},
					{"2012144527", "João Manuel Diniz Fernandes", "M"},
					{"2014199340", "João Vaz de Jesus", "M"},
					{"2014200809", "José Maria da Costa Simões", "M"},
					{"2014198673", "Lisa Marrucho Cosme", "F"},
					{"2014197937", "Maria Margarida Lima da Silva", "F"},
					{"2014206799", "Marta Carvalhinho Gomes Esteves", "F"},
					{"2014143626", "Patrícia Alexandra Tomás Simões", "F"},
					{"2014168178", "Rita Andreia Pinto Valejo Marques Correia", "F"},
					{"2014192180", "Rúben Baptista Fernandes", "M"},
					{"2014200984", "Rui Paulo Martins Gaspar", "M"},
					{"2011164885", "Rute Filipa Dias Marto", "F"},
					{"2014211369", "Sara Serra das Neves", "F"},
					{"2011145147", "Tomás José Vilaça Capa Dias", "M"}};

	NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar",  "com.mysql.jdbc.Driver", "root", "root");

	NoBugsConnection nobugs = NoBugsConnection.getConnection();
	String msg = "Sucessfully inserted users!";
	try {
		for (int i = 0; i < u.length; i++) {	
			nobugs.insertUser(u[i][0], UserControl.encrypt(u[i][0]), u[i][1], u[i][2], new int[]{1});
		}
		
	} catch (Exception e) { 
		msg = "Error when inserting users!"; 
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Create Users</title>
	</head>
	<body>
		<h1><%=msg%></h1>
	</body>
</html>