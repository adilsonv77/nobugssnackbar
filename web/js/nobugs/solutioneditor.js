'use strict';

function showOneEditArea(id) {

	Hints.noHints = false;
	$("#multiBlockly").css("display", "none");
	$("#"+id).css("display", "inline");
	
}

var BlocklyEditor = {};

BlocklyEditor = function(id, top) {
	this.id = id;
	this.editArea = document.getElementById(id);
	this.ws = null;
	this.top = top;
	  
};

BlocklyEditor.prototype.show = function() {
	showOneEditArea(this.id);
};

BlocklyEditor.prototype.initialize = function(cfg, i) {
	
	this.editArea.innerHTML = ""; // clean the editor
	this.ws = Blockly.inject(this.editArea, cfg);
	this.ws.id = this.id;
	this.ws.aux = i > 0;
	this.ws.index = i;
};

BlocklyEditor.prototype.loadCode = function(xmlCode) {
	
	var xml = Blockly.Xml.textToDom(xmlCode);
	Blockly.Xml.domToWorkspace(this.ws, xml);
	Game.moveBlocks();
	
};

BlocklyEditor.prototype.resize = function(t) {
	
	var blocklyDiv = this.editArea;

	blocklyDiv.style.top = (this.top == 0?t:this.top) + "px";
	blocklyDiv.style.left = (this.top == 0?Game.redimDiv.style.left:"0px"); 

	blocklyDiv.style.width = Game.redimDiv.style.width; 
	blocklyDiv.style.height = (this.top == 0?"":(Game.redimDiv.clientHeight - 30)+"px"); 

};

BlocklyEditor.prototype.dispose = function() {
	this.ws.dispose();	
};

BlocklyEditor.prototype.visibleTabs = function(id) {
	 if (this.id === id) {
		 this.ws.setVisible(true);
		 this.ws.markFocused();
	 } else
		 this.ws.setVisible(false);
};

BlocklyEditor.prototype.getXmlValue = function() {
	return "<ws id=\"" + this.ws.index + "\">" + Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.ws)) + "</ws>";
};

BlocklyEditor.prototype.verifyFunctionTabs = function() {
	
	if (this.id = "blockly")
		return;
	
	var blocks = this.ws.getTopBlocks();
	var this_ = this;
	blocks.forEach(function(b) {

		if (b.type.indexOf("procedures_def") == -1) {
			
			Game.selectTab(this_.id);
			Blockly.selected = b;
			throw {isNoBugs: true, msg : "Error_TabOnlyWithFunctions"};
		} 
	});
	
};

BlocklyEditor.prototype.changeToFirstTab = function() {
	// nothing to do
};

BlocklyEditor.prototype.semanticAnalysis = function() {
	Game.countInstructions(this.ws.getTopBlocks(), Game.semanticAnalysis);
};

BlocklyEditor.prototype.getJsCode = function() {
	
	this.ws.genCode = true;
	var code = Game.convertWaits(Blockly.JavaScript.workspaceToCode(this.ws));
	this.ws.genCode = false;
	return code;
	
};

BlocklyEditor.prototype.getFirstEditArea = function() {

	return this.editArea;
};

BlocklyEditor.prototype.getOffsetTop = function() {
	return 0;
};

BlocklyEditor.prototype.newProcedureNameIsLegal = function(name, block) {
	return Blockly.Procedures.isLegalName(name, this.ws, block);
};

BlocklyEditor.prototype.retrieveProcedures = function(proceduresReturn, proceduresNoReturn) {
	var root = this.ws;
	var blocks = root.getAllBlocks();
	for (var i = 0; i < blocks.length; i++) {
	  if (blocks[i].getProcedureDef) {
	    var tuple = blocks[i].getProcedureDef();
	    if (tuple) {
	      if (tuple[2]) {
	        proceduresReturn.push(tuple);
	      } else {
	        proceduresNoReturn.push(tuple);
	      }
	    }
	  }
	}
};

BlocklyEditor.prototype.renameCallers = function(oldName, newName) {
	  // Rename any callers.
	  var blocks = this.ws.getAllBlocks();
	  for (var i = 0; i < blocks.length; i++) {
	    if (blocks[i].renameProcedure) {
	      blocks[i].renameProcedure(oldName, newName);
	    }
	  }
};

BlocklyEditor.prototype.disposeCallers = function(name) {

	var callers = Blockly.Procedures.getCallers(name, this.ws);
	for (var i = 0; i < callers.length; i++) {
	  callers[i].dispose(true, false);
	}
	
};

BlocklyEditor.prototype.mutateCallers = function(name, paramNames, paramIds) {
	
	var callers = Blockly.Procedures.getCallers(name, this.ws);
	for (var i = 0; i < callers.length; i++) {
		callers[i].setProcedureParameters(paramNames, paramIds);
	}

};

/* *************************************************************************** */

var MultiBlockEditor = {};

MultiBlockEditor = function() {
      this.editArea = document.getElementById("multiBlockly");
	
	  Hints.noHints = true;
	  
	  $("#multiBlockly").css("display", "inline");
	  $("#blockly").css("display", "none");
	  
	  $('#multiBlockly').easytabs({updateHash: false, animate: false});
	  $('#multiBlockly').bind('easytabs:after', function(evt, clicked, targetPanel) {
        
		  if (Blockly.selected != null) {
			  myIsTargetSvg = true;
			  Blockly.selected.unselect();
			  myIsTargetSvg = false;
		  }
		  
		  Game.selectTab (targetPanel.attr("id"));
		  
		});
	  
	  $('#multiBlockly').easytabs("select", "#blockly1");
	  
	  this.blocklys = [];
	  
	  this.blocklys.push(new BlockEditor("blockly1", 35));
	  this.blocklys.push(new BlockEditor("blockly2", 35));
	  this.blocklys.push(new BlockEditor("blockly3", 35));
	  this.blocklys.push(new BlockEditor("blockly4", 35));
	  this.blocklys.push(new BlockEditor("blockly5", 35));
	  this.blocklys.push(new BlockEditor("blockly6", 35));

};
	  
MultiBlockEditor.prototype.initialize = function(cfg) {

	for (var i = 0; i < this.blocklys.length; i++) {

		  var b = this.blocklys[i];
		  
		  b.initialize(cfg, i);
	}
  
   Game.selectTab(this.blocklys[0].id);
   Blockly.mainWorkspace.addChangeListener(Hints.changeListener);
		  
};

MultiBlockEditor.prototype.loadCode = function(xmlCode, idx) {
	this.blocklys[idx].loadCode(xmlCode);
};

MultiBlockEditor.prototype.resize = function(t) {

	this.blocklys.forEach(function(b) {
		
		b.resize(t);
		
	});

	
};

MultiBlockEditor.prototype.dispose = function() {
	
	this.blocklys.forEach(function(b) {
		b.dispose();
	});
};

MultiBlockEditor.prototype.visibleTabs = function(id) {
	this.blocklys.forEach(function(b) {
		b.visibleTabs(id);
	});
};

MultiBlockEditor.prototype.getXmlValue = function() {
	
	var ret = "";
	
	this.blocklys.forEach(function(b) {
		ret = ret + b.getXmlValue();
	});
	
	return ret;
	
};

MultiBlockEditor.prototype.verifyFunctionTabs = function() {
	for (var i = 1; i < this.blocklys.length; i++) {
		
		this.blocklys[i].verifyFunctionTabs();
	}
};

MultiBlockEditor.prototype.changeToFirstTab = function() {
	
	Game.changeTab("blockly1");
	
	// os outros editores tem esse método em branco
};

MultiBlockEditor.prototype.semanticAnalysis = function() {
	this.blocklys.forEach(function (b) {
		
		b.semanticAnalysis();
		
	});
};

MultiBlockEditor.prototype.getJsCode = function() {
	var js = "";
    for (var i = this.blocklys.length-1; i >= 0; i--) {
    	
    	js = js + this.blocklys[i].getJsCode();
    	
    };
  	return js; 
};

MultiBlockEditor.prototype.getFirstEditArea = function() {
	return this.blocklys[0].editArea;
};

MultiBlockEditor.prototype.getOffsetTop = function() {
  return this.getFirstEditArea().parentElement.parentElement.offsetTop;
};

MultiBlockEditor.prototype.newProcedureNameIsLegal = function(name, block) {
	
	for (var i=0; i<this.blocklys.length; i++) {
		if (!this.blocklys[i].newProcedureNameIsLegal(name, block)) 
		  return false;
	}	
	
	return true;
};

MultiBlockEditor.prototype.retrieveProcedures = function(proceduresReturn, proceduresNoReturn) {
	
	this.blocklys.forEach(function(b) {
		b.retrieveProcedures(proceduresReturn, proceduresNoReturn);
	});

};

MultiBlockEditor.prototype.renameCallers = function(oldName, newName) {
	
	this.blocklys.forEach(function(b) {
		b.renameCallers(oldName, newName);
	});

};

MultiBlockEditor.prototype.disposeCallers = function(name) {
	
	this.blocklys.forEach( function (b) {
		
		b.disposeCallers(name);
			
	});
};

MultiBlockEditor.prototype.mutateCallers = function(name, paramNames, paramIds) {

	this.blocklys.forEach( function (b) {
		
		b.mutateCallers(name, paramNames, paramIds);
		
	});
};

/* *************************************************************************** */

var CodeEditor = {};

CodeEditor = function() {
	this.editArea = document.getElementById("codeeditor");
	this.id = "codeeditor";
	
};

CodeEditor.prototype.show = function() {
	showOneEditArea(this.id);
};

CodeEditor.prototype.initialize = function() {
	
};

CodeEditor.prototype.loadCode = function(xmlCode) {
	
};

CodeEditor.prototype.resize = function(t) {
	
};

CodeEditor.prototype.dispose = function() {
	
};

CodeEditor.prototype.visibleTabs = function(id) {
	
};

CodeEditor.prototype.getXmlValue = function() {
	
};

CodeEditor.prototype.verifyFunctionTabs = function() {
	
};

CodeEditor.prototype.changeToFirstTab = function() {
	// nothing to do
};

CodeEditor.prototype.semanticAnalysis = function() {
};

CodeEditor.prototype.getJsCode = function() {
	
};

CodeEditor.prototype.getFirstEditArea = function() {

	return this.editArea;
};

CodeEditor.prototype.getOffsetTop = function() {
	return 0;
};

CodeEditor.prototype.newProcedureNameIsLegal = function(name, block) {
	
};

CodeEditor.prototype.retrieveProcedures = function(proceduresReturn, proceduresNoReturn) {
	
};

CodeEditor.prototype.renameCallers = function(oldName, newName) {
	
};

CodeEditor.prototype.disposeCallers = function(name) {
	
};

CodeEditor.prototype.mutateCallers = function(name, paramNames, paramIds) {
	
};