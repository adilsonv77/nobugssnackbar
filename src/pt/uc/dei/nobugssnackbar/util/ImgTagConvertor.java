package pt.uc.dei.nobugssnackbar.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
=
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;

public class ImgTagConvertor {
	
	private final static String srcAttr = "<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>";

	private final static String imgTag = "(<div>)*\\s*<img[^>]*>\\s*(</div>)*";
	public final static String regexImghex = "(<\\s*imghex\\s*id\\s*=\\s*[\\\"|\\\']{1}([a-z0-9_]*)[\\\"|\\\']{1}\\s*>)([A-Za-z0-9-_]*)(<\\s*\\/\\s*imghex\\s*>)";	
	//private final static String regexCDATA = "(\\[\\s*CDATA\\s*\\[\\s*)(.*)(\\s*\\]\\s*\\])";

	
	private static long imgId;
	
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
						imgId = System.currentTimeMillis();
						String imgHexTag = "<imghex id=\"p_img_" + imgId + "\">" + hexImg + "</imghex>";			
						
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
   
    /**
     * Type of images can be "png" or "jpg" without '.'(dot)
     * @param imghextag Text with or without imghex tag in it.
     * @param imageType type of image
     * @return If < imghex> exist returns string like this < img src=images/[name].[imageType]> otherwise retuns original text
     * @throws Exception
     */
    public String getImgTagFromHex(String imghextag,String imageType) throws Exception {
    	
    	String result = imghextag;
		String relativeWebPath = "",absoluteDiskPath = "";				
		
		Pattern pattern = Pattern.compile(regexImghex);
		Matcher matcher = pattern.matcher(result);
		
		if (matcher.find()) {
			String id = matcher.group(2);
			result = matcher.group(3);		
		
	    	InputStream in = new ByteArrayInputStream(HexImage.toImage(result));
			BufferedImage bi = ImageIO.read(in);
			
			try{
				FacesContext facesContext = FacesContext.getCurrentInstance();
				ExternalContext externalContext = facesContext.getExternalContext();
				ServletContext servletContext = (ServletContext) externalContext.getContext();
				
				relativeWebPath = "images/" + id + "." + imageType;
				
				absoluteDiskPath = servletContext.getRealPath("admin/" + relativeWebPath);
	
				File temp = new File(absoluteDiskPath);
				temp.createNewFile();
	
				ImageIO.write(bi, imageType, temp);			
			}
			catch(Exception e){
				throw e;
			}
			result = "<img src='" + relativeWebPath + "'/>";
		}
	
		return result;
    }
    
    public String replaceImagesInHex(String src, String regex, String imgType) throws Exception{
    	String result = src;
		Pattern pattern = Pattern.compile(regexImghex);
		Matcher matcher = pattern.matcher(result);
		
		/*Pattern pattern = Pattern.compile(regexCDATA);
		Matcher matcher = pattern.matcher(result);
		while (matcher.find()) {
			//removes CDATA tag
			result = matcher.group(2);
		}
		*/
		
		while(matcher.find()){
			result = result.replaceFirst(regex, getImgTagFromHex(result,imgType));
		}
		return result;
    }
    
	public ExplanationVC getEvc() {
		return evc;
	}

	public void setEvc(ExplanationVC evc) {
		this.evc = evc;
	}

}