package pt.uc.dei.nobugssnackbar.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.util.SendMail;

/**
 * Servlet implementation class ConfirmUser
 */
@WebServlet("/confirmUser")
public class ConfirmUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ConfirmUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			
			String id = request.getParameter("id");
			
			AbstractFactoryDao factoryDao = (AbstractFactoryDao) request.getServletContext().getAttribute("factoryDao");
			GameDao gameDao = factoryDao.getGameDao();
			String userMail = gameDao.registerUser(id);
			response.sendRedirect(request.getContextPath());
			SendMail mail = new SendMail(request.getServletContext().getRealPath("/"));
			mail.sendWelcomeMail(userMail);

		} catch (Exception ex) {
			
			response.sendRedirect("useridincorrect.html");
		}
	}

}
