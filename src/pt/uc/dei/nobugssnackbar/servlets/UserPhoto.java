package pt.uc.dei.nobugssnackbar.servlets;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.GameDao;

@WebServlet("/userPhoto")
public class UserPhoto extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public UserPhoto() throws IOException {
        super();
        
    }
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);

		try {
			loadNoPhoto(config.getServletContext());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void loadNoPhoto(ServletContext cntx) throws IOException {
		File f = new File(cntx.getRealPath( "images/profile_blank.png" ));
        FileInputStream io = new FileInputStream( f );
        
        noPhoto = new byte[(int)f.length()];
        io.read(noPhoto);

        io.close();
		
	}

	private byte[] noPhoto;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String user = request.getParameter("u");
		
		AbstractFactoryDao factoryDao = (AbstractFactoryDao) request.getServletContext().getAttribute("factoryDao");
		GameDao gameDao = factoryDao.getGameDao();
		
		try {
			byte[] photo = gameDao.getUserPhoto(Long.parseLong(user));
			
			if (photo == null)
				photo = noPhoto; 
				
			response.setContentLength(photo.length);
			response.setContentType("image/png");
			OutputStream out = response.getOutputStream();
			out.write(photo);
			out.close();
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}

		
		
	}

}
