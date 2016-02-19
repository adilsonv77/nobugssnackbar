package pt.uc.dei.nobugssnackbar.servlets;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.AchievementDao;

@WebServlet("/achievementBadge")
public class AchievementBadge extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static Map<Long, byte[]> images;

	@Override
	public void init() throws ServletException {
		super.init();
		images = new HashMap<>();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Long achievementType = Long.parseLong(request.getParameter("id"));
		byte[] img = images.get(achievementType);
		if (img == null) {
			
			try {
				
				AbstractFactoryDao factoryDao = (AbstractFactoryDao) request.getServletContext().getAttribute("factoryDao");
				AchievementDao dao = factoryDao.getAchievementDao();
				img = dao.getAchievementTypeImage(achievementType);
				images.put(achievementType, img);
				
			} catch (Exception e) {
				
				e.printStackTrace();
				return;
				
			}

		}
		
		response.setContentLength(img.length);
		response.setContentType("image/png");
		OutputStream out = response.getOutputStream();
		out.write(img);
		out.close();
			

		
		
	}
	

}
