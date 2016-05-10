package pt.uc.dei.nobugssnackbar.control;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

import org.directwebremoting.AjaxFilter;
import org.directwebremoting.AjaxFilterChain;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.impl.LoginRequiredException;


public class UserControlVerifyUser implements AjaxFilter {

	private List<String> listExceptions;

	public UserControlVerifyUser() {

		String[] exceptions = new String[]{"verifyLogged", "login", "loadBlocksToEditor", "saveBlocksFromEditor", "sendNewPassword"}; 
		
		listExceptions = Arrays.asList(exceptions);		
		
	}
	
	@Override
	public Object doFilter(Object obj, Method method, Object[] params,
			AjaxFilterChain chain) throws Exception {
		
		String name = method.getName();

		if (listExceptions.indexOf(name) == -1) {
		
			if (((UserControl)obj).getUser() == null)
				throw new LoginRequiredException("User not connected");
			
			LoginAdmin.update(WebContextFactory.get().getServletContext(), ((UserControl)obj).getUser().getId());
		}
		
		return chain.doFilter(obj, method, params);
	}

}
