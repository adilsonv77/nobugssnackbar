<%@page import="pt.uc.dei.nobugssnackbar.control.UserControl"%>
<%@page import="pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection"%>
<%@ page 
language="java" 
contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"
%>


<%
	String[][] u = {
		{"5105011539","Adriano da Silva","adriano.silva0107@gmail.com", "M"},
		{"5105011506","Amanda Rodrigues","amand.rodrigues@hotmail.com", "F"},
		{"5105011509","Anderson Hilario Júnior","anndyhj@gmail.com", "M"},
		{"5105011525","Anthony Kuchak Bazilio","anthonybazilio@outlook.com", "M"},
		{"5105011538","Bruna da Silva","bruuunaqw@hotmail.com", "F"},
		{"5105011540","Bruno Mohr","bruno_mohr@live.com", "M"},
		{"5105011527","Bruno Roberto Costa Tavares","brunocostatavares@hotmail.com", "M"},
		{"5105011518","Camila Quisinski Sousa","camilaquisinski@yahoo.com.br", "F"},
		{"5105011526","Carlos Eduardo Amorim Streme","cadu.streme@gmail.com", "M"},
		{"5105011502","Cassiano André Isolani","krassy.isolani@gmail.com", "M"},
		{"5105011514","Dênis Ronan Sievers","denisievers@hotmail.com", "M"},
		{"5105011508","Douglas Felipe Bussmann Siedschlag","douglasfelipebs@hotmail.com", "M"},
		{"5105011523","Douglas Linhares Bittencourt","douglaslbittencourt@gmail.com", "M"},
		{"5105011521","Euler  Giachini","eulergiachini@gmail.com", "M"},
		{"5105011519","Gabriel Schulze","gabrielschulze@hotmail.com", "M"},
		{"5105011531","Gabriel Soares Basilone Paiva","cbsoares@gmail.com", "M"},
		{"5105011511","Gerson Luiz Saldanha dos Santos","contato@gersonluiz.com.br", "M"},
		{"5105011504","Giovane Farias Aita","giovaneaita@hotmail.com", "M"},
		{"5105011534","Giovani José Fávero","favero.giovaani@gmail.com", "M"},
		{"5105011532","Grégory Matheus Dannehl","gregorymatheus30@hotmail.com", "M"},
		{"5105011530","Guilherme Parra Silveira","guilhermesilveira1997@hotmail.com", "M"},
		{"5105011520","Gustavo Zimath Grippa","gustavozimatgrippa@hotmail.com", "M"},
		{"5105011517","Ismael Eli Alves","ismaelelialves@gmail.com", "M"},
		{"5105011510","Kaluan Machado","kaluanm@gmail.com", "M"},
		{"5105011512","Lucas Linhares Bittencourt","lucas_linhare2011@hotmail.com", "M"},
		{"5105011524","Marcos Paulo Bernardi","marcosbernardi@hotmail.com", "M"},
		{"5105011516","Matheus de Souza Niquelati","pepsi.144@hotmail.com", "M"},
		{"5105011537","Paulo Henrique Rodrigues","paulinho1955@hotmail.com", "M"},
		{"5105011528","Pedro Henrique Gili de Andrade","aerogos@gmail.com", "M"},
		{"5105011505","Pedro Henrique Zocatelli","phzpedro@hotmail.com", "M"},
		{"5105011513","Rafael de Miranda","rafael.demiranda@hotmail.com", "M"},
		{"5105011522","Rafael Tenfen","rafaeltenfen.rt@gmail.com", "M"},
		{"5105011535","Renan Ruseler","renan.ruseler@gmail.com", "M"},
		{"5105011501","Robert Gonsalves de Oliveira","goncalvesr55@yahoo.com.br", "M"},
		{"5105011507","Roberth William Niggemann","roberthwilliam.nigg@gmail.com", "M"},
		{"5105011536","Tulio Leandro Meneghelli","tulio.meneghelli@hotmail.com", "M"},
		{"5105011503","Willeson Thomas da Silva","will.thomas14@yahoo.com.br", "M"}};

	NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar",  "com.mysql.jdbc.Driver", "nobugs", "n0bug5v1d4l0k4");

	NoBugsConnection nobugs = NoBugsConnection.getConnection();
	String msg = "Sucessfully inserted users!";
	try {
		for (int i = 0; i < u.length; i++) {	
			nobugs.insertUser(u[i][0], UserControl.encrypt(u[i][0]), u[i][1], u[i][3], u[i][2], new int[]{6});
		}
		
	} catch (Exception e) { 
		msg = "Error when inserting users! " + e; 
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