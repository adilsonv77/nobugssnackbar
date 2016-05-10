package pt.uc.dei.nobugssnackbar.control;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

public class LoginAdmin {

	public static final String ERRORLOGIN = "Error_user_already_logged";

	@SuppressWarnings({ "unchecked" })
	public static void login(ServletContext ctx, long userid) throws Exception {
		Map<Long, Long> list = (Map<Long, Long>) ctx.getAttribute("usersregistered");
		if (list == null) {
			list = new HashMap<>();
			ctx.setAttribute("usersregistered", list);
		}
			
		Long lastAccess = list.get(userid);
		if (lastAccess == null || (System.currentTimeMillis() - lastAccess)/60000 >= 20) // 20 minutes : game.js, web.xml and LoginAdmin
			list.put(userid, System.currentTimeMillis());
		else
			throw new Exception(LoginAdmin.ERRORLOGIN);
		
	}

	@SuppressWarnings({ "unchecked" })
	public static void logoff(ServletContext ctx, long userid) {
		
		Map<Long, Long> list = (Map<Long, Long>) ctx.getAttribute("usersregistered");
		list.remove(userid);
		
	}
	
	@SuppressWarnings("unchecked")
	public static void update(ServletContext ctx, long userid) {
		
		System.out.println(userid + " " +  System.currentTimeMillis());
		
		Map<Long, Long> list = (Map<Long, Long>) ctx.getAttribute("usersregistered");
		if (list == null)
			return;
		list.put(userid, System.currentTimeMillis());
	}
	
}
