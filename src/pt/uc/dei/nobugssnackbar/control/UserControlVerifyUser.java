package pt.uc.dei.nobugssnackbar.control;

import java.lang.reflect.Method;

import org.directwebremoting.AjaxFilter;
import org.directwebremoting.AjaxFilterChain;


public class UserControlVerifyUser implements AjaxFilter {

	@Override
	public Object doFilter(Object obj, Method method, Object[] params,
			AjaxFilterChain chain) throws Exception {
		
		
		String name = method.getName();
//		System.out.println(name);
		if (!(name.equals("verifyLogged") || name.equals("login") || name.equals("loadBlocksToEditor") || name.equals("saveBlocksFromEditor"))) {
		
			if (((UserControl)obj).getUser() == null)
				throw new Exception("User not connected");
		}
		
		return chain.doFilter(obj, method, params);
	}

}
