package pt.uc.dei.nobugssnackbar.control;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.model.MissionStatus;

@RemoteProxy(scope = ScriptScope.SESSION)
public class TeacherControl {
	
	@RemoteMethod
	public MissionStatus[][][] loadMissions() {
		//User user = AuthenticationUtil.getUserFromSession();
		
		// ret[0][1][2][3]:: 0 - classes; 1 - levels; 2 - missions; 3 - data of missions (name, qtdUSers)
		MissionStatus[] missions = new MissionStatus[3];
		missions[0] = new MissionStatus(0, "Não entraram", 10);
		missions[1] = new MissionStatus(1, "Ambientação", 0);
		missions[2] = new MissionStatus(2, "Depuração", 4);
		
		MissionStatus[][] levels = new MissionStatus[1][];
		levels[0] = missions;
		
		MissionStatus[][][] classes = new MissionStatus[1][][];
		classes[0] = levels;
		
		return classes;
	}

}
