package pt.uc.dei.nobugssnackbar.control;

import java.util.ArrayList;
import java.util.List;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.dao.AbstractFactoryDao;
import pt.uc.dei.nobugssnackbar.dao.GameDao;
import pt.uc.dei.nobugssnackbar.model.MissionStatus;

@RemoteProxy(scope = ScriptScope.SESSION)
public class TeacherControl {
	
	private AbstractFactoryDao factoryDao;
	private GameDao gameDao;

	public TeacherControl() {
		WebContext ctx = WebContextFactory.get();
		this.factoryDao = (AbstractFactoryDao) ctx
				.getServletContext().getAttribute("factoryDao");
		this.gameDao = factoryDao.getGameDao();
	}
	
	@RemoteMethod
	public MissionStatus[] loadMissions(Long clazz) throws Exception {

		// missionid, userid, classlevelid, missionname, achieved
		
		List<MissionStatus> lms = new ArrayList<>();
		long lastMissionId = 0;
		MissionStatus currentMission = null;
		
		MissionStatus previousMission = new MissionStatus();
		previousMission.setId(0);
		previousMission.setIdx(0);
		previousMission.setLevel(0);
		previousMission.setName("Não entraram");
		lms.add(previousMission);
		
		boolean firstMission = true;
		
		List<Long> users = new ArrayList<>();
		
		List<String[]> rs = gameDao.loadStatusMissions(clazz);
		for (String[] r:rs) {
			
			int missionId = Integer.parseInt(r[0]);
			
			if (lastMissionId != missionId) {
				if (currentMission != null) {
					firstMission = false;
				}
				
				lastMissionId = missionId;
				
				currentMission = new MissionStatus();
				currentMission.setId(missionId);
				currentMission.setIdx(lms.size());
				currentMission.setLevel(Integer.parseInt(r[2]));
				currentMission.setName(r[3]);

				lms.add(currentMission);
			}
			
			Boolean achieved = (r[4] == null?null:r[4].equals("T"));
			Long user = Long.parseLong(r[1]);
			
			if (achieved == null) {
				if (!users.contains(user)) {
					if (firstMission) {
						previousMission.addUser(user);
					} else
						currentMission.addUser(user);
					
					users.add(user);
				} else {
					// ignore
				}
			} else
				if (!achieved) {
					currentMission.addUser(user);
					users.add(user);
				} else {
					// ignore
				}
			
		}
		
		int i = 0;
		boolean previousDeleted = true;
		while (i < lms.size()) {
			
			MissionStatus ms = lms.get(i);
			if (ms.getQtdUsers() == 0) {
				if (previousDeleted) {
					lms.remove(i);
				} else {
					lms.set(i, null);	

					previousDeleted = true;
					i++;
				}
			} else {
				
				previousDeleted = false;
				i++;
			}
			
		}
		
		if (lms.get(i-1) == null)
			lms.remove(i-1);
		
		
		MissionStatus[] missions = new MissionStatus[lms.size()];
		for (int j = 0; j < lms.size(); j++)
			missions[j] = lms.get(j);
		
		// ret[0][2]:: 0 - missions; 2 - data of missions (name, qtdUSers)
		return missions;
	}

}

