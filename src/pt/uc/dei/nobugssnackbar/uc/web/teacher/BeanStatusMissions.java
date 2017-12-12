package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.util.List;
import java.util.Map;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsMissions;

@ManagedBean(name="statusMissions")
@ViewScoped
public class BeanStatusMissions extends BeanBase {

	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value="#{ucreportsmissions}")
	private UCReportsMissions reportsMissions;
	
	private List<Map<String, String>> usersFromMission;
	
	private int missionId;
	
	public void loadUsersFromMission() throws Exception {
		Map<String, String> m = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
		
		String mission = m.get("mission");
		String users = m.get("users");
		
		String[] lu = users.split(",");
		
		this.missionId = Integer.parseInt(mission);
		
		this.usersFromMission = reportsMissions.loadUsers(getClazz().getId(), missionId, lu);
		
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
	/*
	public void loadUserAttemptsEx(long userId, int missionId, String userName) throws Exception {
		this.selectedUser = userName;
		this.userAttempts = reportsMissions.loadAttemptsFromUser(userId, missionId);
	}
	*/
	public UCReportsMissions getReportsMissions() {
		return reportsMissions;
	}
	
	public void setReportsMissions(UCReportsMissions reportsMissions) {
		this.reportsMissions = reportsMissions;
		setUcBase(reportsMissions);
	}
	
	public void setClazz(Clazz clazz) throws Exception {
		super.setClazz(clazz);;
		this.usersFromMission = null;
	}
	
	public List<Map<String, String>> getUsersFromMission() {
		return usersFromMission;
	}
	
	public int getMissionId() {
		return missionId;
	}
}
