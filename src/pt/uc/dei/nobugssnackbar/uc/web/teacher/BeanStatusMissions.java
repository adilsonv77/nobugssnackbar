package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsMissions;
import pt.uc.dei.nobugssnackbar.uc.web.util.AuthenticationUtil;

@ManagedBean(name="statusMissions")
@ViewScoped
public class BeanStatusMissions implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucreportsmissions}")
	private UCReportsMissions reportsMissions;
	
	private Clazz clazz;
	
	private List<Clazz> clazzes;

	private List<Map<String, String>> usersFromMission;
	
	public void loadUsersFromMission() throws Exception {
		Map<String, String> m = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
		
		String mission = m.get("mission");
		String users = m.get("users");
		
		String[] lu = users.split(",");
		
		int missionid = Integer.parseInt(mission);
		
		this.usersFromMission = reportsMissions.loadUsers(clazz.getId(), missionid, lu);
		
		for (Map<String, String> u: this.usersFromMission) {
			String time = u.get("timespend");
			if (time == null) {
				u.put("timespend", "Nunca entrou");
			} else {
				long tl = Long.parseLong(time);
				long min = (long) Math.floor( tl / 60 );
				long sec = tl - (min*60);
				long hour = (long) Math.floor( min / 60 );
				min = min - (hour*60);

				u.put("timespend", String.format("%02d:%02d:%02d", hour, min, sec));
				
			}
		}
	}
	
	public List<Clazz> getClazzes() throws Exception {
		if (clazzes == null)
			clazzes = reportsMissions.listClazzes(AuthenticationUtil.getUserFromSession());
		return clazzes;
	}
	
	public UCReportsMissions getReportsMissions() {
		return reportsMissions;
	}
	
	public void setReportsMissions(UCReportsMissions reportsMissions) {
		this.reportsMissions = reportsMissions;
	}
	
	public Clazz getClazz() {
		return clazz;
	}
	
	public void setClazz(Clazz clazz) {
		this.clazz = clazz;
	}
	
	public List<Map<String, String>> getUsersFromMission() {
		return usersFromMission;
	}
}
