package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.sun.org.apache.xalan.internal.utils.ObjectFactory;

import pt.uc.dei.nobugssnackbar.model.Command;
import pt.uc.dei.nobugssnackbar.model.mission.Hint;
import pt.uc.dei.nobugssnackbar.model.mission.MissionContent;

public class XmlToMission {
	private static String mxml = "<?xml version='1.0'?><mission>	<explanation>		<page>		<![CDATA[Agora os nossos clientes podem ter sede E tamb&#233;m podem ter fome. E, se t&#234;m sede, podem pedirrefrigerante ou sumo.<br/><br/><b>Tens a limita&#231;&#227;o de 36 comandos</b> e a possibilidade de receber um b&#244;nus de $30 se resolver em 6 minutos.<br/><br/>Trouxe o teu &#250;ltimo trabalho para apoiar nessa tarefa.]]>		</page>	</explanation>	<hints><sequence><hint category=\"ChooseCategory(0)\"/><hint time=\"0\" category=\"SelectCommand(0,0)\"/><hint category=\"StackTogether(0,0,move_goToBarCounter)\"/><hint time=\"7000\" category=\"RunProgram\"/></sequence> <errors><hint condition=\"countInstructions == 1 &amp;&amp; Game.howManyRuns &lt;= 2\" category=\"ChooseCategory(0)\"> <![CDATA[Clique em SnackMan e adicione mais um bloco <imghex id=\"m1_i1\">89504E470D0A1A0A0000000D49484452000000A50000001E0802000000C244493B000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000206348524D00007A26000080840000FA00000080E8000075300000EA6000003A98000017709CBA513C0000055C494441546843ED9BFF4F9B4518C0E75F4558C40CFCC11F1859628683B64C855ADA32C141650D09B019977E2FD8960D1CDFA1ED84D25661AC9D2B6D51091B4413B32886999890CD187E3033CB1C8C049FFAB2776FDEBBF7EEFAF2B64DD6975C08BD3EF7DCDDF3B9E7B9BBE77D79E3F0F0F084FA533E1600DEC29F1F1FFD1E58BBE5CC449D990577368616EF6AFCE1EE63512BF4E3F6EE63EFEAD7580D6A25D502F107EBEEA1ACE225BEFCE0048FEAD9FEF3C00F4BD4A180802B1B9BDE5C79B6BF87A50EF5C19F3220C3A24A95C15AC012BEA6386C5068E90D1FF17EBAF7AF2B9323E4C8442D4B132DF3FEA690571BF2888A2EECE9FC66ECA5EB473777B645C83776B63DAB71D003322009F2A812B5866A810A7D3DC75B6B0C29582ADED21FF1F67DBF0890AEA6E69AE77CD4D17CF8D517BDC9596E618EAC27769F3E01EAF0FBC6BD3B5C257C0B32543DAA8094050ACB7B73E761CE23D30BCDF94032C7AEDB56E645E1086ACCD16115E4312D5058DEDCB66D591CCF77944DE181EEA5496EAB86DFF037D4E4ABA4CCE53541B766C6A59D15EC9EB3AE0A7D4301E339ECD9008C259297391BC5A7DF30E5386DE9BA3A906AB32E682E8F68A773DE726EC276CAD88CF26EED8A8C87EE2F7FFB6BEABB6D42010110337D1A4537FEA3FD1B82B02D1D516A3284AB1AB60BACBCECC108B5C95652B486B5F6AEF6CB5380B6FBCA2DC0D3609CD478FD751EEBBB9FF48B7803ECDBA92D2C66C81DA0F5CB77B70C9D1111F223DEDC1E5C884982F5A96AB1322C0D459A39D2C24A194AE48D96DA4A4AA0E692E1334F12D05EB0C67836EFB58EE9CCC13E47B2CF7E87AF049795828DE50DC263C1FBAF396FD4AC8A2357566155FB79872F0DBC9B3BE6C8F7AEC4CA6F286F8EB414EF446A4B3E6F3E4E824D857326C74FD4E1847A383C54FFC676C1B5E27D9A0503410FBF50783D42FDC24AD1F859C646F0FE93A64680ED0A6475B47B3661C396E20D4D64F246016351A1461735C4065BD9AD08CAA98E2EE28AE58DD5CF382396F5079D561975C0DBE14F53932A25E32DF448EA7EC96E1DA1A3108C45E524E54C52433D4E3D635B827F579B3E00DEB6C132E3CDE28E6820CDEB68C6C886BA9ED05087867446E786F1BF69CAF9B7D3A7F2169CB4A97155EA104058107971950A69525CD9799F346B5C810C20D799C2E490FE5AC573827F33FA25F5DCC7A827AF75707CDE551DE79DFE1C6FEAF9BC64BCB9F055D0F31AC19FA4BA169ED5D1C317BA1AB07A58A6C6782261BC91C3FDDBE15F01DE1F5BE3AFEEDF2DE38D861991BB2BC99B7BBED9749394FA166E9F527B988C6D98E74438AF61BB26F89668A717E2C77EC5A25FB83E44CB02D5C91ECF21BF36389AE3CDE5D7CEE9276A6AAD90053BDBE428206F7B3A02BC0D9100E3AA649F0FA3C2B21583FCB97D3A64F7A5DBBAA3750DEECA6AE3A9DA0BADBE81BEE16BBDB604149E7A12976F2127D2214583BF7F5F5FBB0DBC2F2D4FE57B99295B4E0A4E1C9E8FBD3F355073A6BDB2DA50DFD1DF1A1AD2CCBAEBBA4CA2FCF94478834C17FD1652B078DEBFFCB5E3CEC49CD9E847D22E8EDE3A149CB3AAEA627CB42D32A27BF94251954923E26DEE8E4A3D2FC1AE0310862678DEC072F0FF9790E0FD16BE4B9541092D807DDF817B1E8A4DA40B918300E57928F0DE3B78712511EC4D064B3849B56BDE02857DBF858BD5CFF7F7F5371CDAA05BB57BC92D500CDE80FCC5C181FDE6F86987E5EC979FC3A9A1E4D32EDB01148937E7E87FFCF9C83F3FA3E9EF845303742C2A6FF7181B27ED54122003926873B586D10291C59FE17571B88B2B5B5EFDBF8128E341F8B8B4BE5A3FD44F407E66B0A7D2AC79E762CBDD8D3576B5AA64112C2087370CEBEF7F9E748C7A5147E7DDBA67D80B32459880DA455E1690C99BEB43E4E8AA5BE765FA9208FF072AB66E6EA2C22E530000000049454E44AE426082</imghex>. Nesse novo bloco, n&#227;o esque&#231;a de mudar o n&#250;mero da cadeira onde o cliente est&#225; sentado.]]> </hint> <hint condition=\"countInstructions == 2 &amp;&amp; Game.howManyRuns &#60;= 2\" category=\"SourceCode\">  Preste aten&#231;&#227;o nas posi&#231;&#245;es para onde o cozinheiro est&#225; se deslocando.Clique no n&#250;mero e digite um valor de acordo com a cadeira em que o cliente est&#225; sentado. </hint><hint condition=\"countInstructions > 2 &amp;&amp; Game.howManyRuns &#60;= 2\" category=\"SourceCode\"> Existem mais blocos do que o necess&#225;rio. Clique no bot&#227;o que est&#225; piscando para relembrar as metas dessa miss&#227;o.</hint></errors></hints>	<commands>		<category name=\"snackMan\" show=\"true\" />		<category name=\"goToBarCounter\" show=\"true\" />		<category name=\"askForFood\" show=\"true\" />		<category name=\"goToDisplay\" show=\"true\" />		<category name=\"pickUpHotDog\" show=\"true\" />		<category name=\"askHasHunger\" show=\"true\" />		<category name=\"askForDrink\" show=\"true\" />		<category name=\"goToCooler\" show=\"true\" />		<category name=\"pickUpDrink\" show=\"true\" />		<category name=\"askHasThirsty\" show=\"true\" />		<category name=\"goToBoxOfFruits\" show=\"true\" />		<category name=\"pickUpFruits\" show=\"true\" />		<category name=\"goToJuiceMachine\" show=\"true\" />		<category name=\"prepareAndPickUpJuice\" show=\"true\" />		<category name=\"deliver\" show=\"true\" />		<category name=\"vars\" show=\"true\" />		<category name=\"const\" show=\"true\" />		<category name=\"const.softDrink\" show=\"true\" />		<category name=\"const.orange\" show=\"true\" />		<category name=\"logic\" show=\"true\" />	</commands>	<cooker>initial</cooker>		<customersSN><randomization qtd=\"1\">thirsty</randomization><randomization qtd=\"1\" set=\"notTheSame\">hungry</randomization></customersSN>	<customers>		<customer randomType=\"atLeastOne\">			<id>01</id>			<init>counter1</init>			<dest>counter1</dest>			<orders>				<order>					<foods randomMin=\"0\" randomMax=\"1\">									<food qt=\"1\" price=\"0\">hotdog</food>					</foods>					<drinks randomMin=\"0\" randomMax=\"1\">						<drink qt=\"1\" price=\"0\">coke</drink>						<drink qt=\"1\" price=\"0\">juiceoforange</drink>					</drinks>				</order>			</orders>					</customer>		<customer randomType=\"atLeastOne\">			<id>02</id>			<init>counter3</init>			<dest>counter3</dest>			<orders>				<order>					<foods randomMin=\"0\" randomMax=\"1\">									<food qt=\"1\" price=\"0\">hotdog</food>					</foods>					<drinks randomMin=\"0\" randomMax=\"1\">						<drink qt=\"1\" price=\"0\">coke</drink>						<drink qt=\"1\" price=\"0\">juiceoforange</drink>					</drinks>				</order>			</orders>		</customer>	</customers>	<objectives ordered=\"false\" reward=\"30\" commQtd=\"36\" bonusTime=\"360\" bonusTimeReward=\"45 30\" >		<objective pos=\"1\" place=\"counter\">deliver</objective>		<objective pos=\"3\" place=\"counter\">deliver</objective>	</objectives>	<xml preload=\"16\">	</xml></mission>";
	
	
	public static MissionContent loadMission(String xml){
		xml = mxml;
		MissionContent mc = new MissionContent();
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = null;
		Document doc = null;
		try {
			dBuilder = dbFactory.newDocumentBuilder();
			doc = dBuilder.parse(new InputSource(new ByteArrayInputStream(xml.getBytes("utf-8"))));
		} catch (SAXException | IOException | ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();			
		}
		doc.getDocumentElement().normalize();
			
		return mc;
		
	}
	
	
	public static MissionContent load(String xml){
		xml = mxml;
		JAXBContext jaxbContext;
		try {
			jaxbContext = JAXBContext.newInstance(MissionContent.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			StringReader reader = new StringReader(xml);
			MissionContent mc = (MissionContent) jaxbUnmarshaller.unmarshal(reader);
			/*I set type for each error hint here because there is no attribute in xml that i can bind to type*/	
			for (Hint h : mc.getHints().getErrorsHints()) {
					h.setType(true);
				}
			return mc;
		}
		catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	public static void loadObjectives(Document doc, MissionContent mc, String xml){
		try{
			/*XPathFactory xPathfactory = XPathFactory.newInstance();
			XPath xpath = xPathfactory.newXPath();
			XPathExpression expr = xpath.compile("//mission/objectives");
			Element element = (Element) expr.evaluate(doc, XPathConstants.NODE);
			Boolean ordered = Boolean.valueOf(element.getAttribute("ordered"));
			Boolean buttonDebug = Boolean.valueOf(element.getAttribute("buttonDebug"));
			Boolean buttonRun = Boolean.valueOf(element.getAttribute("buttonRun"));
			Boolean variableWindow = Boolean.valueOf(element.getAttribute("variableWindow"));
			
			objectives.setOrdered(ordered);
			objectives.setButtonDebug(buttonDebug);
			objectives.setButtonRun(buttonRun);
			objectives.setVariableWindow(variableWindow);*/
		
					
			JAXBContext jaxbContext = JAXBContext.newInstance(MissionContent.class); 
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			StringReader reader = new StringReader(xml);
			MissionContent misscon = (MissionContent) jaxbUnmarshaller.unmarshal(reader);
			for (Hint hint : mc.getHints().getErrorsHints()) {
				hint.setType(true);
			}
			mc.setObjectives(misscon.getObjectives());
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	public static void loadHints(Document doc, MissionContent mc, String hintType){
		List<Hint> hintList = new ArrayList<Hint>();
		
		try{
			NodeList errors = doc.getElementsByTagName(hintType);
			Element element = (Element) errors.item(0);
			NodeList errorsList = element.getElementsByTagName("hint");
			for (int i = 0; i < errorsList.getLength(); i++) {
				Element hintElement = (Element) errorsList.item(i);
				
				Hint h = new Hint();
				h.setCategory(hintElement.getAttribute("category"));
				h.setConditionsAsString(hintElement.getAttribute("condition"));
				h.setStrTime(hintElement.getAttribute("time"));
				h.setText(hintElement.getTextContent());
				if(hintType == "sequence"){h.setType(false);}
				if(hintType == "errors"){h.setType(true);}
				hintList.add(h);
			}
		}
		catch(Exception e){
			throw e;
		}
		finally{
			if(hintType == "errors"){
				mc.getHints().setErrorsHints(hintList);
			}
			if(hintType == "sequence"){
				mc.getHints().setTipsHints(hintList);
			}		
		}
	}

}
