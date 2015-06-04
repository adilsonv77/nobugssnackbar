package pt.uc.dei.nobugssnackbar.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcField;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcPk;
import pt.uc.dei.nobugssnackbar.dao.jdbc.JdbcTable;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name="category")
@JdbcTable(name="commands")
public class Command implements Serializable {
	private static final long serialVersionUID = 1L;

	@JdbcField(name="commandid")
	@JdbcPk
	private Integer id;
	
	@XmlAttribute(name="name")
	@JdbcField(name="commandname")
	private String name;
	@JdbcField(name="commandparent")
	private Integer parentId;
	
	@XmlAttribute(name="show")
	private boolean selected;
	
	private List<Command> children;

	private Command parent;
	
	public Command() {
	}

	public Command(String name, Integer parentId) {
		this.name = name;
		this.parentId = parentId;
		this.selected = false;
	}

	public Command(Integer id, String name, Integer parentId) {
		this.id = id;
		this.name = name;
		this.parentId = parentId;
		this.selected = false;
	}
	
	public Command(Integer id, String name, Integer parentId, boolean selected) {
		this.id = id;
		this.name = name;
		this.parentId = parentId;
		this.selected = selected;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	public List<Command> getChildren() {
		if (children == null)
			children = new ArrayList<>();
		return children;
	}
	public void setChildren(List<Command> children) {
		this.children = children;
	}
	@Override
	public String toString() {
		return name;
	}

	public Command getParent() {
		return parent;
	}
	
	public void setParent(Command parent) {
		this.parent = parent;
		this.parentId = parent.getId();
		
	}
}
