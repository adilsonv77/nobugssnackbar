package pt.uc.dei.nobugssnackbar.control;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

public class LoginAdmin {

	public static final String ERRORLOGIN = "Error_user_already_logged";

	@SuppressWarnings({ "unchecked" })
	public static void login(ServletContext ctx, long userid, HttpSession session) throws Exception {
		Map<Long, HttpSession> listSession = (Map<Long, HttpSession>) ctx.getAttribute("userssession");
		Map<Long, Long> list = (Map<Long, Long>) ctx.getAttribute("usersregistered");
		if (list == null) {
			list = new HashMap<>();
			ctx.setAttribute("usersregistered", list);
			
			listSession = new HashMap<>();
			ctx.setAttribute("userssession", listSession);
		}
			
		Long lastAccess = list.get(userid);
		if (lastAccess == null || (System.currentTimeMillis() - lastAccess)/60000 >= 20) // 20 minutes : game.js, web.xml and LoginAdmin
			list.put(userid, System.currentTimeMillis());
		else
			throw new Exception(LoginAdmin.ERRORLOGIN);
		
		listSession.put(userid, session);
		
	}

	@SuppressWarnings({ "unchecked" })
	public static void logoff(ServletContext ctx, long userid) {
		
		Map<Long, Long> list = (Map<Long, Long>) ctx.getAttribute("usersregistered");
		Map<Long, HttpSession> listSession = (Map<Long, HttpSession>) ctx.getAttribute("userssession");
		
		list.remove(userid);
		listSession.remove(userid);
		
	}
	
	@SuppressWarnings("unchecked")
	public static void update(ServletContext ctx, long userid) {
		
		Map<Long, Long> list = (Map<Long, Long>) ctx.getAttribute("usersregistered");
		if (list == null)
			return;
		list.put(userid, System.currentTimeMillis());
	}
	
	@SuppressWarnings("unchecked")
	public static Map<Long, Long> getUsersConnected(ServletContext ctx) {
		return (Map<Long, Long>) ctx.getAttribute("usersregistered");
	}
	
	@SuppressWarnings("unchecked")
	public static HttpSession getUserSession(ServletContext ctx, Long userId) {
		return ((Map<Long, HttpSession>) ctx.getAttribute("userssession")).get(userId);
	}
	
}
