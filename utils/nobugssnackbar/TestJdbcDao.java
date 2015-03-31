package nobugssnackbar;

import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.jdbc.CommandJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.FunctionProviderJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.MissionJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;
import pt.uc.dei.nobugssnackbar.model.Command;
import pt.uc.dei.nobugssnackbar.model.Function;
import pt.uc.dei.nobugssnackbar.model.Mission;

public class TestJdbcDao {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "nobugs", "n0bug5v1d4l0k4");
		
		
		CommandJdbcDao cDao = new CommandJdbcDao();
		
		List<Command> c = cDao.list();
		for (Command m: c)
			System.out.println(m.getName() + " " + m.getParentId());
		System.out.println(c.size());
		
		MissionJdbcDao mDao = new MissionJdbcDao();
		
		List<Mission> l = mDao.list();
		for (Mission m: l)
			System.out.println(m.getName() + " " + m.getContent() + " " + m.isRepeatable());
		System.out.println(l.size());
	
		FunctionProviderJdbcDao fpDao = new FunctionProviderJdbcDao();
		List<Function> f = fpDao.list();
		for (Function m: f)
			System.out.println(m.getName() + " " + m.getDescription() + " " + m.getReturnType());
		System.out.println(f.size());
		
	
		/*
		mDao.save(new Mission("TesteX", "Content", false));
		mDao.save(new Mission("TesteY", "ContentZ", true));
		
		Mission m = mDao.read(21);
		System.out.println(m.getName() + " " + m.getContent() + " " + m.isRepeatable());
		
		m.setName("ZZZ");
		m.setContent("YYY");
		m.setRepeatable(false);
		
		mDao.save(m);
		m = mDao.read(20);
		m.setName("M20");
		mDao.save(m);
		
		mDao.delete(20);
		mDao.delete(21);
		*/
	}
}