package nobugssnackbar;

import java.io.ByteArrayInputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class TestXML {
	public static void main(String[] args) throws Exception {
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

		String xml = "<xml  return='ChooseCategory(#{command})'><row><item type='text'>LOUCURA</item><item type=\"text\">According the commands available in this mission, select the category which is showed the hint</item></row><row><item type=\"list\" name=\"command\">#{mm.missionContent.commands}</item></row></xml>";
		
		Document doc = dBuilder.parse(new InputSource(new ByteArrayInputStream(xml.getBytes("utf-8"))));
		doc.getDocumentElement().normalize();

		System.out.println(doc.getDocumentElement().getAttributes().getNamedItem("return").getNodeValue());
		
		NodeList nodes = doc.getDocumentElement().getChildNodes();
		for (int i = 0; i < nodes.getLength(); i++) {

			Node row = nodes.item(i);

			NodeList rowNodes = row.getChildNodes();
			for (int j = 0; j < rowNodes.getLength(); j++) {

				Node item = rowNodes.item(j);
				String type = item.getAttributes().getNamedItem("type").getNodeValue();
				Node value = item.getLastChild();
				
				if (type.equals("text")) {
					System.out.print("text "  + value.getNodeValue());

				} else if (type.equals("list")) {
					System.out.print("lista "  + value.getNodeValue());

				}
			}
			
			System.out.println();

		}

	}
}
