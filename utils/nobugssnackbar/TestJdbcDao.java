package nobugssnackbar;

import java.util.Map;

import pt.uc.dei.nobugssnackbar.dao.jdbc.GameJdbcDao;
import pt.uc.dei.nobugssnackbar.dao.jdbc.NoBugsConnection;

public class TestJdbcDao {

	public static void main(String[] args) throws Exception {
		NoBugsConnection.buildConnection("jdbc:mysql://localhost:3306/nobugssnackbar", 
				"com.mysql.jdbc.Driver", "root", "root");
		
		GameJdbcDao gDao = new GameJdbcDao();
		Map<?, ?> m = gDao.retrieveMissions(6);
		System.out.println(m);
		/*
		
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