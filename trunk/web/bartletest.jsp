<html>
<head>
  <script type="text/javascript" src="dwr/engine.js"></script>
  <script type="text/javascript" src="dwr/interface/UserControl.js"></script>

 <script type="text/javascript">
 
 function showClassification(ret) {
	 
	 for (var i=1; i <= 4; i++) {

		 document.getElementById("c" + i + "Name").innerHTML = ret[i-1].name;
		 document.getElementById("c" + i + "Value").innerHTML = ret[i-1].value+"%";
		 
	 }
	 
 }
 
 </script>
 </head>
 <body>
 <%
 if (request.getParameter("user") == null) 
	 out.print("<h1>Coloque o parâmetro user=nome na URL</h1>");
 else {%>
 
  <script type="text/javascript">
  UserControl.bartleClassification('<%=request.getParameter("user")%>', function(ret) { showClassification(ret);});
  </script>
  
  <table style="width: 300px">
  <tr><td><h1><div id="c1Name"></div></h1></td><td><h1><div id="c1Value"></div></h1></td></tr>
  <tr><td><h2><div id="c2Name"></div></h2></td><td><h2><div id="c2Value"></div></h2></td></tr>
  <tr><td><h3><div id="c3Name"></div></h3></td><td><h3><div id="c3Value"></div></h3></td></tr>
  <tr><td><h4><div id="c4Name"></div></h4></td><td><h4><div id="c4Value"></div></h4></td></tr>
  </table>
  <%
 }
 
 %>
 
 </body>
 </html>
