package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsMissions;

@ManagedBean(name="missionAttempts")
@ViewScoped
public class BeanMissionAttemptsByUser implements Serializable  {
	
	private static final long serialVersionUID = 1L;

	private String selectedUser;
	
	@ManagedProperty(value="#{ucreportsmissions}")
	private UCReportsMissions reportsMissions;

	public UCReportsMissions getReportsMissions() {
		return reportsMissions;
	}
	
	public void setReportsMissions(UCReportsMissions reportsMissions) {
		this.reportsMissions = reportsMissions;
	}
	
	private List<Map<String, Object>> userAttempts;
	
	public String getSelectedUser() {
		return selectedUser;
	}
	
	public List<Map<String, Object>> getUserAttempts() {
		return userAttempts;
	}

	public void loadUserAttempts() throws Exception {
		
		// we use this approach because we are saving less state as possible in the client page
  	    Map<String,String> params = 
	                FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
		String userId = params.get("userId");
		String missionId = params.get("missionId");
		this.selectedUser = params.get("userName");
		
		this.userAttempts = reportsMissions.loadAttemptsFromUser(Long.parseLong(userId), Integer.parseInt(missionId));
		
 	}
	
	public void loadAnswer(int row) {

	}
	
	
}
