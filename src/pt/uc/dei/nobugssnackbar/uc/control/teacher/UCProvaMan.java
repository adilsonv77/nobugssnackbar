package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.File;
import java.io.PrintWriter;
import java.util.List;
import java.util.Random;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import pt.uc.dei.nobugssnackbar.control.UserControl;
import pt.uc.dei.nobugssnackbar.dao.ExtraLevelDao;
import pt.uc.dei.nobugssnackbar.dao.UserDao;
import pt.uc.dei.nobugssnackbar.model.ExtraLevel;
import pt.uc.dei.nobugssnackbar.model.User;

@ManagedBean(name = "ucprovaman")
@ApplicationScoped
public class UCProvaMan extends UCBase {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{factoryDao.userDao}")
	private transient UserDao userDao;

	public UserDao getUserDao() {
		return userDao;
	}
	
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	
	@ManagedProperty(value = "#{factoryDao.extraLevelDao}")
	private transient ExtraLevelDao extraLevelDao;

	public ExtraLevelDao getExtraLevelDao() {
		return extraLevelDao;
	}
	
	public void setExtraLevelDao(ExtraLevelDao levelDao) {
		this.extraLevelDao = levelDao;
	}
	
	public void disabledAllUsers(Long clazzId) throws Exception {
		userDao.disableUsers(clazzId);
	}

	private String extractChar() {
		
		int x = r.nextInt(s.length()-1) + 1;
		return s.substring(x, x+1);
	}
	
	private Random r = new Random();
	private String s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	public String[] generatePasswords(List<ExtraLevel> extraLevels) throws Exception {
		String[] ret = new String[extraLevels.size()];
		for (int i = 0; i<extraLevels.size(); i++) {
			ExtraLevel ex = extraLevels.get(i);
			ret[i] = ex.getId()+".csv";
			PrintWriter out = new PrintWriter(new File(ex.getId()+".csv"));
			List<Long> l = extraLevelDao.listUsersByLevelId(ex.getId());
			
			for (Long lu:l) {
				
				String passw = extractChar() + extractChar() + extractChar() + extractChar(); 
				User u = userDao.read(lu);
				u.setPassw(UserControl.encrypt(passw));
				userDao.save(u);
				out.println(u.getName() + ";" + passw);
			}
		}
		return ret;
	}

}
