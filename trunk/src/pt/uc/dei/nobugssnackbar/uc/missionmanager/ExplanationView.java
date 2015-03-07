package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.Serializable;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.context.RequestContext;
import org.primefaces.event.CloseEvent;
import org.primefaces.event.DashboardReorderEvent;
import org.primefaces.event.ToggleEvent;
import org.primefaces.model.DashboardColumn;
import org.primefaces.model.DashboardModel;
import org.primefaces.model.DefaultDashboardColumn;
import org.primefaces.model.DefaultDashboardModel;

import pt.uc.dei.nobugssnackbar.model.Page;

@ManagedBean
@ViewScoped
public class ExplanationView implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Page page = new Page();
	private ArrayList<Page> pageList = new ArrayList<Page>();
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
	
    public DashboardModel getModel() {
        return model;
    }
	// #end
    
	@PostConstruct
	public void init() {
		model = new DefaultDashboardModel();
        
		DashboardColumn column2 = new DefaultDashboardColumn();
        column2.addWidget("test"); 
        model.addColumn(column2);
	}
	
	public void handleReorder(DashboardReorderEvent event) {
        FacesMessage message = new FacesMessage();
        message.setSeverity(FacesMessage.SEVERITY_INFO);
        message.setSummary("Reordered: " + event.getWidgetId());
        message.setDetail("Item index: " + event.getItemIndex() + 
        		", Column index: " + event.getColumnIndex() + 
        		", Sender index: " + event.getSenderColumnIndex());
        
        if (model.getColumn(event.getColumnIndex()).getWidgetCount() > 0) {
        	model.getColumn(event.getSenderColumnIndex()).addWidget(event.getWidgetId());
        	model.getColumn(event.getColumnIndex()).removeWidget(event.getWidgetId());
        	
            RequestContext.getCurrentInstance().update("explanationForm");
        }
        else {
            addMessage(message);
        }
    }
     
    public void handleClose(CloseEvent event) {
        FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "Panel Closed", "Closed panel id:'" + event.getComponent().getId() + "'");
         
        addMessage(message);
    }
     
    public void handleToggle(ToggleEvent event) {
        FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, event.getComponent().getId() + " toggled", "Status:" + event.getVisibility().name());
         
        addMessage(message);
    }
     
    private void addMessage(FacesMessage message) {
        FacesContext.getCurrentInstance().addMessage(null, message);
    }
    
	private void addDashboard(Page page) {
		DashboardColumn column = new DefaultDashboardColumn();
		column.addWidget(Integer.toString(page.getId()));
		model.addColumn(column);
	}
	
	public void addPage() {
		this.page.setId(pageIdCount++);
		this.pageList.add(this.page);
		addDashboard(this.page);
		this.page = new Page();
		
		RequestContext.getCurrentInstance().update("explanationForm");
	}
}