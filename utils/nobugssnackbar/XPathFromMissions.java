package nobugssnackbar;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;

public class XPathFromMissions {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugsexp5", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		XPathFactory xPathfactory = XPathFactory.newInstance();
		XPath xpath = xPathfactory.newXPath();
		XPathExpression exprVars = xpath.compile("//block[@type='variables_set']/field/text()");	
		XPathExpression exprBlocks = xpath.compile("//block");
		
		Connection conn = NoBugsConnection.getConnection().getDataSource().getConnection();
		
		Statement stm = conn.createStatement();
		ResultSet rs = stm.executeQuery("select missionid, userid, answer from missionsaccomplished where userid > 2 and userid < 47 and achieved = 'T'");
		
		PrintWriter out = new PrintWriter(new File("vars.csv"));
		out.println("mission;user;vars;blocos");
		
		while (rs.next()) {

			String newS = new String(rs.getString(3).getBytes("ISO-8859-1"),"UTF-8");
			if (newS.startsWith("<")) {
				
				Document doc = builder.parse(new ByteArrayInputStream(newS.getBytes()));
				NodeList nodes = (NodeList) exprVars.evaluate(doc, XPathConstants.NODESET);
				long qtosBlocos = ((NodeList) exprBlocks.evaluate(doc, XPathConstants.NODESET)).getLength();
				
				if (nodes.getLength() == 0) {
					out.println(rs.getInt(1)+ ";"+rs.getInt(2)+";0;"+qtosBlocos);
				} else {
					String s = "";
					int contaVars = 0;
					for (int i = 0; i < nodes.getLength(); i++)
						if (!s.contains(nodes.item(i).getNodeValue()+";")) {
							s = s.concat(nodes.item(i).getNodeValue()+";");
							contaVars++;
						}
					out.println(rs.getInt(1)+ ";"+rs.getInt(2)+";"+contaVars+";"+qtosBlocos);
				}
					
			} else {
				out.println(rs.getInt(1)+ ";"+rs.getInt(2)+";0;o");
			}
		}
		
		out.close();
		
	}

}
 