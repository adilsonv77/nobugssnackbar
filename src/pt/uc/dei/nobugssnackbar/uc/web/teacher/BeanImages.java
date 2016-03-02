package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.ByteArrayInputStream;
import java.sql.SQLException;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseId;

import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.StreamedContent;

import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCReportsAchievements;

@ManagedBean(name="images")
@ApplicationScoped
public class BeanImages {
	
	@ManagedProperty(value="#{ucreportsachievements}")
	private UCReportsAchievements reportsAchievements;

	public UCReportsAchievements getReportsAchievements() {
		return reportsAchievements;
	}
	
	public void setReportsAchievements(UCReportsAchievements reportsAchievements) {
		this.reportsAchievements = reportsAchievements;
	}
	
	public StreamedContent getBadge() throws NumberFormatException, SQLException {
		
		FacesContext context = FacesContext.getCurrentInstance();

        if (context.getCurrentPhaseId() == PhaseId.RENDER_RESPONSE) {
            // So, we're rendering the HTML. Return a stub StreamedContent so that it will generate right URL.
            return new DefaultStreamedContent();
        }
        else {
            // So, browser is requesting the image. Return a real StreamedContent with the image bytes.
        	String typeId = context.getExternalContext().getRequestParameterMap().get("typeId");
        	if (typeId.length() == 0)
        		return new DefaultStreamedContent();
        	
        	int ci = Integer.parseInt(typeId);
        	byte[] img = reportsAchievements.getBadge(ci);
            return new DefaultStreamedContent(new ByteArrayInputStream(img));
        }
        
	}
	

}
