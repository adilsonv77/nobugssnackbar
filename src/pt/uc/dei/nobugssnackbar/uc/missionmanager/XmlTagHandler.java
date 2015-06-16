package pt.uc.dei.nobugssnackbar.uc.missionmanager;
import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.bind.ValidationEventHandler;
import javax.xml.bind.annotation.DomHandler;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

public class XmlTagHandler implements DomHandler<String, StreamResult> {
    
    private StringWriter xmlWriter = new StringWriter();
    private String XML_VERSION_REPLACE = "<\\?xml\\s*version\\=\"1.0\" encoding=\"UTF-8\"\\?>"; 
    
    @Override
    public StreamResult createUnmarshaller(ValidationEventHandler errorHandler) {
        return new StreamResult(xmlWriter);
    }
    
    @Override
    public String getElement(StreamResult rt) {
        String xml = rt.getWriter().toString();
        xml = xml.replaceAll(XML_VERSION_REPLACE, "");
		return xml;
    }

	@Override
	public Source marshal(String n, ValidationEventHandler errorHandler) {
        try {
            String xml = n.trim();
            xml = xml.replaceAll(XML_VERSION_REPLACE, "");
            StringReader xmlReader = new StringReader(xml);
            return new StreamSource(xmlReader);
        } catch(Exception e) {
        	System.out.println("GREDA");
            throw new RuntimeException(e);
        }
	}
}
