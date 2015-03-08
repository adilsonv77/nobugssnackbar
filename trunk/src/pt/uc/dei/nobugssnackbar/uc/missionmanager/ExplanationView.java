package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.faces.application.Application;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.component.dashboard.Dashboard;
import org.primefaces.component.panel.Panel;
import org.primefaces.context.RequestContext;
import org.primefaces.event.DashboardReorderEvent;
import org.primefaces.model.DashboardColumn;
import org.primefaces.model.DashboardModel;
import org.primefaces.model.DefaultDashboardColumn;
import org.primefaces.model.DefaultDashboardModel;

import pt.uc.dei.nobugssnackbar.model.Page;

@ManagedBean
@ViewScoped
public class ExplanationView implements Serializable {
	
	private static final long serialVersionUID = -7318954023298641865L;
	private Page page = new Page();
	private ArrayList<Page> pageList = new ArrayList<Page>();
	private Dashboard dashboard;
	private DashboardModel model;
	private int pageIdCount = 1;
	
	// #region Getter/Setter
	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}
	
	public ArrayList<Page> getPageList() {
		return pageList;
	}
	
	public Dashboard getDashboard() {
		return dashboard;
	}
	public void setDashboard(Dashboard d) {
		dashboard = d;
	}
	// #end
    

	@PostConstruct
	public void init() {
		createDashboard();
	}
	
	public void addPanel() {
		FacesContext fc = FacesContext.getCurrentInstance();
		Application app = fc.getApplication();
		
		dashboard.getChildren().clear();
		model.getColumns().clear();
		
		for (int i = 0; i < pageList.size(); i++) {
			Panel panel = (Panel) app.createComponent(fc, "org.primefaces.component.Panel", "org.primefaces.component.PanelRenderer");
			panel.setId("id" + pageList.get(i).getId());

			panel.setHeader(pageList.get(i).getMsg());
			
			dashboard.getChildren().add(panel);
			DashboardColumn column1 = new DefaultDashboardColumn();
			column1.addWidget(panel.getId());
			model.addColumn(column1);
		}
	}
	
	public void createDashboard() {
		FacesContext fc = FacesContext.getCurrentInstance();
		Application app = fc.getApplication();
		
		dashboard = (Dashboard) app.createComponent(fc, "org.primefaces.component.Dashboard", "org.primefaces.component.DashboardRenderer");
		model = new DefaultDashboardModel();
		dashboard.setId("dashboard");
		dashboard.setModel(model);

    /*<p:ajax event="reorder" listener="#{explanationView.handleReorder}" update="msgs" />
      <p:panel id="test">
    	<f:facet name="header">
    		<h:outputText value="test" />
    	</f:facet>
    	<p:panelGrid columns="2">
        	<p:commandButton icon="ui-icon-pencil" />
        	<p:commandButton icon="ui-icon-trash" />
    	</p:panelGrid>
    </p:panel>*/
	}
	
	public void handleReorder(DashboardReorderEvent event) {
        FacesMessage message = new FacesMessage();
        message.setSeverity(FacesMessage.SEVERITY_INFO);
        message.setSummary("Reordered");
        message.setDetail("Column index: " + event.getColumnIndex() + 
        		", Sender index: " + event.getSenderColumnIndex());
        
        if (model.getColumn(event.getColumnIndex()).getWidgetCount() > 1) {
        	String s = event.getWidgetId();
        	model.getColumn(event.getColumnIndex()).removeWidget(s);
        	model.getColumn(event.getSenderColumnIndex()).addWidget(s);
        	
        	s = model.getColumn(event.getColumnIndex()).getWidget(0);
        	model.getColumn(event.getColumnIndex()).removeWidget(s);
        	model.getColumn(event.getColumnIndex()).addWidget(model.getColumn(event.getSenderColumnIndex()).getWidget(0));
        	model.getColumn(event.getSenderColumnIndex()).removeWidget(model.getColumn(event.getColumnIndex()).getWidget(0));
        	model.getColumn(event.getSenderColumnIndex()).addWidget(s);
        	        	
        	RequestContext.getCurrentInstance().update("tbView:explanationForm:board");
        }
        
        addMessage(message);
    }
 
    private void addMessage(FacesMessage message) {
        FacesContext.getCurrentInstance().addMessage(null, message);
    }
 
	public void addPage() {
		this.page.setId(pageIdCount++);
		this.pageList.add(this.page);
		this.page = new Page();
		
		addPanel();
	}
}