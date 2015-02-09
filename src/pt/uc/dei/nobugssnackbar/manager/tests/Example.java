package pt.uc.dei.nobugssnackbar.manager.tests;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import org.primefaces.context.RequestContext;

@ManagedBean
@SessionScoped
public class Example implements Serializable {

	private String text = "My initial text";

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void viewDlg() {
		System.out.println("View Dlg");	
		RequestContext.getCurrentInstance().openDialog("hellodlg");
	}
	
	public String openDlg() {
		return "hellodlg";
	}

}
