package pt.uc.dei.nobugssnackbar.uc.web.teacher;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.StreamedContent;

import pt.uc.dei.nobugssnackbar.control.LoginAdmin;
import pt.uc.dei.nobugssnackbar.model.ExtraLevel;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCExtraLevelMan;
import pt.uc.dei.nobugssnackbar.uc.control.teacher.UCProvaMan;

@ManagedBean(name="provaman")
@ViewScoped
public class BeanProva extends BeanBase {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value="#{ucprovaman}")
	private UCProvaMan ucProvaMan;

	public UCProvaMan getUcProvaMan() {
		return ucProvaMan;
	}
	
	public void setUcProvaMan(UCProvaMan ucProvaMan) {
		this.ucProvaMan = ucProvaMan;
		setUcBase(ucProvaMan);
	}
	
	@ManagedProperty(value="#{ucextralevelman}")
	private UCExtraLevelMan ucExtraLevelMan;

	public UCExtraLevelMan getUcExtraLevelMan() {
		return ucExtraLevelMan;
	}
	
	public void setUcExtraLevelMan(UCExtraLevelMan ucExtraLevelMan) {
		this.ucExtraLevelMan = ucExtraLevelMan;
	}
	
	private List<ExtraLevel> extraLevelsAdded;

	public List<ExtraLevel> getExtraLevelsAdded() {
		return extraLevelsAdded;
	}
	
	public void setExtraLevelsAdded(List<ExtraLevel> extraLevelsAdded) {
		this.extraLevelsAdded = extraLevelsAdded;
	}
	
	public List<ExtraLevel> getExtraLevelsToAdd() throws Exception {
		if (getClazz() == null)
			return null;
		return ucExtraLevelMan.listLevels(getClazz().getId());
	}
	
	public void preparar() throws Exception {
		// desabilitar todos os alunos
		ucProvaMan.disabledAllUsers(getClazz().getId());
		
		// remover da aplicação (tirar se estão logados)
		disconnectAllUsers();
		
		// trocar a senha
		String[] nomeArqs = ucProvaMan.generatePasswords(extraLevelsAdded);
        
		downloadFiles = new ArrayList<>();
		for (String nomeArq:nomeArqs) {
			
			InputStream stream = FacesContext.getCurrentInstance().getExternalContext().getResourceAsStream(nomeArq);
	        downloadFiles.add(new DefaultStreamedContent(stream, "text/plain", nomeArq));
	        
		}

	}

	private List<StreamedContent> downloadFiles;
	
	public List<StreamedContent> getDownloadFiles() {
		return downloadFiles;
	}
	
	private void disconnectAllUsers() {
		
		FacesContext context = FacesContext.getCurrentInstance();
		Map<Long, Long> m = LoginAdmin.getUsersConnected((ServletContext) context.getExternalContext().getContext());
		if (m == null)
			return;
		
		for (Long userId:m.keySet()) {
			
			HttpSession session = LoginAdmin.getUserSession((ServletContext) context.getExternalContext().getContext(), userId);
			if (session != null)
			try {
				session.invalidate();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			
			LoginAdmin.logoff((ServletContext) context.getExternalContext().getContext(), userId);
			
		}
		
	}
}
