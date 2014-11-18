package pt.uc.dei.nobugssnackbar.servlets;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HintImage extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static Map<String, byte[]> images;

	public static Map<String, byte[]> getImages() {
		if (images == null)
			images = new HashMap<>();
		return images;
	}
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String i = request.getParameter("i");
		
		byte data[] = getImages().get(i);
		
		response.setContentLength(data.length);
		response.setContentType("image/png");
		OutputStream out = response.getOutputStream();
		out.write(data);
		out.close();
	}	
	
}
