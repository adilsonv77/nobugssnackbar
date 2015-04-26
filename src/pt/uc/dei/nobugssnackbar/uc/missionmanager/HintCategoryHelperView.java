package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.ByteArrayInputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.el.ELContext;
import javax.el.ExpressionFactory;
import javax.el.ValueExpression;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.primefaces.context.RequestContext;
import org.primefaces.extensions.model.dynaform.DynaFormControl;
import org.primefaces.extensions.model.dynaform.DynaFormModel;
import org.primefaces.extensions.model.dynaform.DynaFormRow;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import pt.uc.dei.nobugssnackbar.i18n.ApplicationMessages;
import pt.uc.dei.nobugssnackbar.model.HintCategory;

@ManagedBean(name="hcHelper")
@ViewScoped
public class HintCategoryHelperView implements Serializable {

	private static final long serialVersionUID = 1L;
	private static final Pattern pattern = Pattern.compile("[?][{]([a-z])\\w+}");

	private boolean isListEmpty = false;
	private boolean rendered;
	
	@ManagedProperty(value="#{hintView}")
	private HintView hintView;

	public HintView getHintView() {
		return hintView;
	}
	
	public void setHintView(HintView hintView) {
		this.hintView = hintView;
	}
	
	private DynaFormModel model = new DynaFormModel();

	private String returnCategory;
	private List<HintCategoryProperty> properties;
	
	public List<HintCategoryProperty> getProperties() {
		return properties;
	}
	
	public boolean render() throws Exception {

		HintCategory hintCategory = hintView.getHint().getObjHintCategory();

		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

		Document doc = dBuilder.parse(new InputSource(new ByteArrayInputStream(hintCategory.getBody().getBytes("utf-8"))));
		doc.getDocumentElement().normalize();
		
		this.returnCategory = doc.getDocumentElement().getAttributes().getNamedItem("return").getNodeValue();
		
		NodeList nodes = doc.getDocumentElement().getChildNodes();
		if (nodes.getLength() == 0) {
			return rendered = false;
		}
		properties = new ArrayList<>();
		model = new DynaFormModel();
		for (int i = 0; i < nodes.getLength(); i++) {

			Node row = nodes.item(i);
			DynaFormRow formRow = model.createRegularRow();
			
			NodeList rowNodes = row.getChildNodes();
			for (int j = 0; j < rowNodes.getLength(); j++) {
				
				Node item = rowNodes.item(j);
				String type = item.getAttributes().getNamedItem("type").getNodeValue();
				
				Node label = item.getAttributes().getNamedItem("label");
				
				if (label != null) { 
					formRow.addControl(label.getNodeValue());
					formRow = model.createRegularRow();
				}
				
				Node value = item.getLastChild();
				if (type.equals("text")) {
					
					formRow.addControl(new HintCategoryProperty(this, "", value.getNodeValue()), "text");			
					
				} else {
					String name = item.getAttributes().getNamedItem("name").getNodeValue();
					FacesContext context = FacesContext.getCurrentInstance();
					ExpressionFactory expressionFactory = context.getApplication().getExpressionFactory();
				    ELContext elContext = context.getELContext();

				    if (type.equals("list")) {
				    	
				    	HintCategoryProperty hcp = new HintCategoryProperty(this, name, true);
				    	properties.add(hcp);
				    	

				    	
				    	String nodeValue = value.getNodeValue();
					    if (pattern.matcher(nodeValue).find())  {
					    	hcp.setProviderEL(nodeValue);
					    	hcp.setItems(new ArrayList<>());
					    } else {
					    	ValueExpression vex = expressionFactory.createValueExpression(elContext, 
									nodeValue, List.class);
					    	hcp.setItems((List<?>) vex.getValue(elContext));					 					    
					    }						
					    
					    Node updateNode = item.getAttributes().getNamedItem("update");
					    if (updateNode != null){
					    	hcp.setUpdate(updateNode.getNodeValue());
					    }					    					  
					  					   
					    formRow.addControl(hcp, "list");

				    	
					    Node emptyMsg = item.getAttributes().getNamedItem("emptyMsg");
					    if(emptyMsg != null && hcp.getItems().size() == 0){
					    	
					    	ResourceBundle messageBundle = ApplicationMessages.getMessage();
					    	String msg = messageBundle.getString(emptyMsg.getNodeValue());
					    	
					    	model.getRegularRows().clear();	

					    	formRow = model.createRegularRow();
					    	
					    	formRow.addLabel(msg);
					    	this.isListEmpty = true;
					    	
					    	return rendered = true;
					    }
					}
				}
			}
			
		}
		return rendered = true;
	}
		
	public DynaFormModel getModel() {
		return model;
	}

	public String dealEl(String exp) {
		
		Matcher matcher = pattern.matcher(exp);
		String returnForm = "";
		
		while (matcher.find()) {
			String name = matcher.group();
			name = name.substring(2, name.length()-1);
			for (DynaFormControl dynaFormControl : model.getControls()) {
				Object data = dynaFormControl.getData();
				if (data.getClass() == HintCategoryProperty.class) {
					HintCategoryProperty hcp = (HintCategoryProperty) data; 
					if (name.equals(hcp.getName())) {
						if(hcp.getValue() != null){
							returnForm = matcher.replaceFirst(hcp.getValue().toString());
						}else{
							returnForm = "";
						}
						break;
					}
				}
			}
			matcher = pattern.matcher(returnForm);
		}		
		return returnForm;
	}
	
	public void submitForm() {
		
		String returnForm = dealEl(this.returnCategory);
		returnForm = ApplicationUtils.processEL(returnForm, String.class);
		
		if(rendered){
			if(isListEmpty){
				hintView.getHint().setCategory("");
				isListEmpty = false;
			}else if(returnForm.equals("")){//not selected command/category
				hintView.addMessageToGrowl(new Object[] {"title=error","selectCommand"});
				return;
			}else{//everything is OK
				hintView.getHint().setCategory(returnForm);
				RequestContext cont = RequestContext.getCurrentInstance();
				cont.execute("PF('chooseHintCategoryDialog').hide()");				
			}
			
		}else{
			hintView.getHint().setCategory(returnCategory);
		}
		hintView.disableDialog();
		hintView.handleDialog();
	}
	
	public void setModel(DynaFormModel model) {
		this.model = model;
	}
	

}

