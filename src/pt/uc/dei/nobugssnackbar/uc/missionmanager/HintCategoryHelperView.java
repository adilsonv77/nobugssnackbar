package pt.uc.dei.nobugssnackbar.uc.missionmanager;

import java.io.ByteArrayInputStream;
import java.io.Serializable;
import java.util.List;
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

import org.primefaces.extensions.model.dynaform.DynaFormControl;
import org.primefaces.extensions.model.dynaform.DynaFormModel;
import org.primefaces.extensions.model.dynaform.DynaFormRow;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import pt.uc.dei.nobugssnackbar.model.HintCategory;

@ManagedBean(name="hcHelper")
@ViewScoped
public class HintCategoryHelperView implements Serializable {

	private static final long serialVersionUID = 1L;

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
	
	public boolean render() throws Exception {
		model = new DynaFormModel();

		HintCategory hintCategory = hintView.getHint().getObjHintCategory();

		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

		Document doc = dBuilder.parse(new InputSource(new ByteArrayInputStream(hintCategory.getBody().getBytes("utf-8"))));
		doc.getDocumentElement().normalize();
		
		this.returnCategory = doc.getDocumentElement().getAttributes().getNamedItem("return").getNodeValue();
		
		NodeList nodes = doc.getDocumentElement().getChildNodes();
		if (nodes.getLength() == 0) {
			return false;
		}
		for (int i = 0; i < nodes.getLength(); i++) {

			Node row = nodes.item(i);
			DynaFormRow formRow = model.createRegularRow();
			
			NodeList rowNodes = row.getChildNodes();
			for (int j = 0; j < rowNodes.getLength(); j++) {
				
				Node item = rowNodes.item(j);
				String type = item.getAttributes().getNamedItem("type").getNodeValue();
				
				
				Node value = item.getLastChild();
				
				if (type.equals("text")) {
					
					formRow.addControl(new HintCategoryProperty("", value.getNodeValue()), "text");
					
				} else {
					String name = item.getAttributes().getNamedItem("name").getNodeValue();
					FacesContext context = FacesContext.getCurrentInstance();
					ExpressionFactory expressionFactory = context.getApplication().getExpressionFactory();
				    ELContext elContext = context.getELContext();

				    if (type.equals("list")) {
						
					    ValueExpression vex = expressionFactory.createValueExpression(elContext, 
					    												value.getNodeValue(), List.class);
				    	List<?> list = (List<?>) vex.getValue(elContext);
						
				    	HintCategoryProperty hcp = new HintCategoryProperty(name, true);
				    	hcp.setItems(list);
				    	
						formRow.addControl(hcp, "list");
						
					}
				}
			}
			
		}
		return true;
	}
	
	public DynaFormModel getModel() {
		return model;
	}
	
	public void submitForm() {
		
		Pattern pattern = Pattern.compile("[?][{]([a-z])\\w+}");
		Matcher matcher = pattern.matcher(this.returnCategory);
		
		String returnForm = "";
		
		while (matcher.find()) {
			String name = matcher.group();
			name = name.substring(2, name.length()-1);
			for (DynaFormControl dynaFormControl : model.getControls()) {
				HintCategoryProperty hcp = (HintCategoryProperty) dynaFormControl.getData();
				if (name.equals(hcp.getName())) {
					returnForm = matcher.replaceFirst(hcp.getValue().toString());
					break;
				}
			}
			matcher = pattern.matcher(returnForm);
		}
		
		FacesContext context = FacesContext.getCurrentInstance();
		ExpressionFactory expressionFactory = context.getApplication().getExpressionFactory();
	    ELContext elContext = context.getELContext();
	    ValueExpression vex = expressionFactory.createValueExpression(elContext, 
				returnForm, String.class);

	    returnForm = (String) vex.getValue(elContext);
	    
		hintView.getHint().setCategory(returnForm);
		hintView.disableDialog();
		
	}
	

}

