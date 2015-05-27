package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.event.SelectEvent;
import org.primefaces.event.UnselectEvent;

import pt.uc.dei.nobugssnackbar.dao.CommandDao;
import pt.uc.dei.nobugssnackbar.dao.MissionDao;
import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.Command;
import pt.uc.dei.nobugssnackbar.model.Mission;
import pt.uc.dei.nobugssnackbar.model.mission.MissionContent;

@ManagedBean(name = "mm")
@SessionScoped
public class MissionManager implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@PostConstruct
	private void init() {
		try {
			List<Command> commands = commandDao.list();
			this.missionList = missionDao.list();
			this.rootCommands = new ArrayList<>();

			for (Command c : commands) {
				String name = c.getName();

				if (name.startsWith("$")) {
					ResourceBundle msg = ApplicationMessages.getMessage();
					c.setName(msg.getString(name.substring(name.indexOf("#") + 1)));
				}

				if (c.getParentId() == null) {
					rootCommands.add(c);
				} else {
					for (Command r : rootCommands)
						if (r.getId() == c.getParentId()) {
							r.getChildren().add(c);
							c.setParent(r);
							break;
						}

				}
			}
			
			addMission(); //TODO in future you need to delete this line
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@ManagedProperty(value = "#{factoryDao.missionDao}")
	private transient MissionDao missionDao;

	public MissionDao getMissionDao() {
		if (missionDao == null) {
			missionDao = ApplicationUtils.processEL("#{factoryDao.missionDao}", MissionDao.class);
		}

		return missionDao;
	}

	public void setMissionDao(MissionDao missionDao) {
		this.missionDao = missionDao;
	}

	@ManagedProperty(value = "#{factoryDao.commandDao}")
	private transient CommandDao commandDao;

	public CommandDao getCommandDao() {
		if (commandDao == null) {
			commandDao = ApplicationUtils.processEL("#{factoryDao.commandDao}", CommandDao.class);
		}
		return commandDao;
	}

	public void setCommandDao(CommandDao commandDao) {
		this.commandDao = commandDao;
	}
	// #region private variables
	private Mission mission = new Mission();
	private List<Mission> missionList;

	// #end

	// #region getters and setters
	public Mission getMission() {
		return mission;
	}

	public void setMission(Mission mission) {
		this.mission = mission;
	}

	public List<Mission> getMissionList() {
		return missionList;
	}

	public void setMissionList(List<Mission> missionList) {
		this.missionList = missionList;
	}

	private MissionContent missionContent = new MissionContent();
	private List<Command> rootCommands;

	public List<Command> getRootCommands() {
		return rootCommands;
	}

	public void setRootCommands(List<Command> rootCommands) {
		this.rootCommands = rootCommands;
	}

	public MissionContent getMissionContent() throws Exception {
		if (missionContent.getCommands() == null) {

			missionContent.setCommands(this.rootCommands);

		}

		return missionContent;
	}

	public void setMissionContent(MissionContent missionContent) {
		this.missionContent = missionContent;
	}

	// #end

	// #region user defined methods

	public void onSelect(SelectEvent event) {
		FacesContext context = FacesContext.getCurrentInstance();
		context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,
				"Item Selected", event.getObject().toString()));
	}

	public void onUnselect(UnselectEvent event) {
		FacesContext context = FacesContext.getCurrentInstance();
		context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,
				"Item Unselected", event.getObject().toString()));
	}

	public void onReorder() {
		FacesContext context = FacesContext.getCurrentInstance();
		context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,
				"List Reordered", null));
	}

	public void addMission() {

		this.mission = new Mission();
		//missionList.add(this.mission);

		for (Command c : this.rootCommands) {
			c.setSelected(false);
			for (Command i : c.getChildren())
				i.setSelected(false);
		}

		setMissionContent(processMissionContent(mission.getContent()));
		
		// TODO delete this two lines in future
		this.missionContent = new MissionContent();
		this.missionContent.setCommands(this.rootCommands);

	}

	// #end

	private MissionContent processMissionContent(String content) {
		return new MissionContent();
	}
	
	public void save() throws Exception {
		String xml = MissionToXML.missionToXML(mission, missionContent);
		ResourceBundle messageBundle = ApplicationMessages.getMessage();
		FacesContext context = FacesContext.getCurrentInstance();
		
		if (xml != null) {
			System.out.println(xml);
			mission.setContent(xml);
			//mission.setId(System.currentTimeMillis());
			// TODO save mission in DB
			// missionDao.save(mission);
	        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "", 
	        		messageBundle.getString("missionSuccSaved")));			
		}
		else {

			context.validationFailed();
	        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN,
	        		messageBundle.getString("warningMsg"), MissionToXML.getErrorMessage()));
		}
	}
	
}