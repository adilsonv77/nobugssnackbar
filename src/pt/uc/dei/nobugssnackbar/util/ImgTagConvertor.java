package pt.uc.dei.nobugssnackbar.util;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

public class ImgTagConvertor {
	
	private final static String srcAttr = "<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>";
	private final static String imgTag = "(<div>)*\\s*<img[^>]*>\\s*(</div>)*";	
	
	private static int imgIdCounter;
	
	public static String convertImgTagToHexImgTag(String text, boolean justTestImg) {
		String result = text;
		
		Pattern p = Pattern.compile(srcAttr);
		Matcher m = p.matcher(text);
		while (m.find()) {
			File file = getImageFromUrl(m.group(1));

			try {
				if (file != null) {
					if (justTestImg == false) {
						String hexImg = HexImage.toHex(file);
						imgIdCounter++;
						String imgHexTag = "<imghex id=\"p_img_" + imgIdCounter + "\">" + hexImg + "</imghex>";			
						
						result = text.replaceFirst(imgTag, imgHexTag);
					}
				}
				else {
					result = null;
					break;
				}
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		return result;
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
 			// e.printStackTrace();
 		}
         
         return file;
    }

}