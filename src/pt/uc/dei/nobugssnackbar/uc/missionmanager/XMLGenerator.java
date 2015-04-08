package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.net.URL;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.imageio.ImageIO;

import pt.uc.dei.nobugssnackbar.model.mission.Page;
import pt.uc.dei.nobugssnackbar.util.HexImage;

@ManagedBean(name = "xmlgen")
@SessionScoped
public class XMLGenerator implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{explVC}")
	private ExplanationVC evc;
	
	private int imgIdCounter;

	public XMLGenerator() {
		
	}
	
	public void processExplanationPages() {	
		List<Page> pageList = evc.getPages();
		String srcAttr = "<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>";
		String imgTag = "(<div>)*\\s*<img[^>]*>\\s*(</div>)*";
		
		for (Page page : pageList) {
			String text = page.getMsg();
			
			Pattern p = Pattern.compile(srcAttr);
			Matcher m = p.matcher(text);
			while (m.find()) {
				
				File file = getImageFromUrl(m.group(1));
				
				try {
					String hexImg = HexImage.toHex(file);
					imgIdCounter++;
					String imgHexTag = "<imghex id=\"p_img_" + imgIdCounter + "\">" + hexImg + "</imghex>";			
					
					//page.setMsg(text.replaceFirst(imgTag, imgHexTag));
					text = text.replaceFirst(imgTag, imgHexTag);
					System.out.println(text);
					
					
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
    private File getImageFromUrl(String src) {
        File file = null;
        
		try {
			String imgType = src.substring(src.lastIndexOf(".") + 1, src.length());
			
			BufferedImage image = (BufferedImage) ImageIO.read(new URL(src));
			file = new File("img." + imgType);
			
			ImageIO.write(image, imgType, file);
			
		} catch (IOException e) {
			e.printStackTrace();
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