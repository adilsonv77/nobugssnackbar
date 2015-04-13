package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.imageio.ImageIO;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.mission.Page;
import pt.uc.dei.nobugssnackbar.util.HexImage;

@ManagedBean(name = "xmlgen")
@SessionScoped
public class XMLGenerator implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private final static String srcAttr = "<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>";
	private final static String imgTag = "(<div>)*\\s*<img[^>]*>\\s*(</div>)*";
	
	@ManagedProperty(value="#{explVC}")
	private ExplanationVC evc;
	
	private static int imgIdCounter;

	public XMLGenerator() {
		
	}
	
	public static String convertImgTagToHexImgTag(String text) {
		String result = text;
		
		Pattern p = Pattern.compile(srcAttr);
		Matcher m = p.matcher(text);
		while (m.find()) {
			File file = getImageFromUrl(m.group(1));

			try {
				if (file != null) {
					String hexImg = HexImage.toHex(file);
					imgIdCounter++;
					String imgHexTag = "<imghex id=\"p_img_" + imgIdCounter + "\">" + hexImg + "</imghex>";			
					
					result = text.replaceFirst(imgTag, imgHexTag);
				}
				else {
					result = null;
				}
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		return result;
	}
	
	public void processExplanationPages() {	
		List<Page> pageList = evc.getPages();
		
		for (Page page : pageList) {		
			String result = convertImgTagToHexImgTag(page.getMsg());
			
			System.out.println(result);
//			page.setMsg(result);
		}
	}
	
    private static File getImageFromUrl(String src) {
        File file = null;
        
 		try {
			URL url = new URL(src);
			if (url.getQuery() != null) {
				src = src.replaceFirst("\\?" + url.getQuery(), "");
				url = new URL(src);
			}

			String filePath = url.getPath();
			
			String imgType = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length());
			BufferedImage image = ImageIO.read(url);
			
			file = new File("img." + imgType);
			
			ImageIO.write(image, imgType, file);
 			
 		} catch (IOException e) {
			/*ResourceBundle messageBundle = ApplicationMessages.getMessage();
			FacesMessage msg = new FacesMessage(messageBundle.getString("invalidImage"),
					messageBundle.getString("tryAgainCheckImage"));
			FacesContext.getCurrentInstance().addMessage("", msg);*/
// 			e.printStackTrace();
 		}
         
         return file;
    }

	public ExplanationVC getEvc() {
		return evc;
	}

	public void setEvc(ExplanationVC evc) {
		this.evc = evc;
	}
	
}