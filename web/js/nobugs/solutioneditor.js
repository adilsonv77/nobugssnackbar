'use strict';

function showOneEditArea(id) {

	Hints.noHints = false;
	$("#multiBlockly").css("display", "none");
	$("#"+id).css("display", "inline");
	
}

function resizeOneEditArea(blocklyDiv, t, top) {

	blocklyDiv.style.top = (top == 0?t:top) + "px";
	blocklyDiv.style.left = (top == 0?Game.redimDiv.style.left:"0px"); 

	blocklyDiv.style.width = Game.redimDiv.style.width; 
	//blocklyDiv.style.height = (top == 0?"":(Game.redimDiv.style.height - 30)+"px");
	
	var s = Game.redimDiv.style.height;
	if (s === "0px")
		s = "";
	blocklyDiv.style.height = s;

	/* quando eu descobrir para que substrair 30, preciso repensar isso.
	 * essa parte mudei, em comparacao ao top==0, quando criei o novo tipo de tarefa: multipleChoice.
	 * se um dia isso deixar de funcionar, preciso rever para que tinha essa comparacao com top==0
	s = s.substring(0, s.indexOf("px"));
	if (parseInt(s) > 0)
		s = (parseInt(s) - 30)+"px";
	else
		s = "";
	*/
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

BlocklyEditor.prototype.cleanCode = function() {
	Blockly.getMainWorkspace().clear();
};

BlocklyEditor.prototype.initialize = function(cfgSize, cfg, i) {
	this.editArea.innerHTML = ""; // clean the editor
	this.ws = Blockly.inject(this.editArea, cfg);
	this.ws.myid = this.id;
	this.ws.aux = i > 0;
	this.ws.index = i;
	
	var h = $("#blockly").height();
	$("#blockly").css("height", h-cfgSize.blocklyH);

};


BlocklyEditor.prototype.backgroundColor = function(color) {
	$("#blockly .blocklySvg").css("background-color", color);
};

BlocklyEditor.prototype.showCountInstructions = function() { return true; };
BlocklyEditor.prototype.hasDebug = function() { return true; };

BlocklyEditor.prototype.zoom = function() {
	
	if (Game.zoomLevel > 1) {
		  while (Blockly.getMainWorkspace().scale < Game.zoomLevel) 
			Blockly.getMainWorkspace().zoomCenter(1);
	} else 
		  if (Game.zoomLevel < 1) {
			  while (Blockly.getMainWorkspace().scale > Game.zoomLevel) 
				  Blockly.getMainWorkspace().zoomCenter(-1);
		  }
	
};

BlocklyEditor.prototype.loadCode = function(xmlCode) {
	
	var xml = Blockly.Xml.textToDom(xmlCode);
	Blockly.Xml.domToWorkspace(xml, this.ws);
	Game.moveBlocks();
	
};

BlocklyEditor.prototype.resize = function(t) {
	
	resizeOneEditArea(this.editArea, t, this.top);

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
	
	if (this.myid = "blockly")
		return;
	
	var blocks = this.ws.getTopBlocks();
	var this_ = this;
	blocks.forEach(function(b) {

		if (b.type.indexOf("procedures_def") == -1) {
			
			Game.selectTab(this_.myid);
			Blockly.selected = b;
			throw {isNoBugs: true, msg : "Error_TabOnlyWithFunctions"};
		} 
	});
	
};

BlocklyEditor.prototype.changeToFirstTab = function() {
	// nothing to do
};

BlocklyEditor.prototype.selectTab = function(id) {
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

BlocklyEditor.prototype.getJavaCode = function() {
	
	var code = Game.convertWaits(Blockly.Java.workspaceToCode(this.ws));
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

BlocklyEditor.prototype.countInstructions = function(visitor, blocks) {
	blocks = (blocks == undefined?Blockly.mainWorkspace.getTopBlocks():blocks);
	if (visitor == undefined)
		return Game.countInstructions(blocks);
	else
		return Game.countInstructions(blocks, visitor);
};

BlocklyEditor.prototype.addChangeListener = function(evt) {
	
	Blockly.mainWorkspace.addChangeListener(evt);
};

BlocklyEditor.prototype.removeChangeListener = function(evt) {
	Blockly.mainWorkspace.removeChangeListener(evt);
};

BlocklyEditor.prototype.bindMouseDownSvgGroupEvent = function(game, evt) {
	
	return Blockly.bindEvent_(Blockly.mainWorkspace.svgGroup_, 'mousedown', game, evt);
	
};

BlocklyEditor.prototype.lengthTopBlocks = function() {
	return Blockly.mainWorkspace.getTopBlocks().length;	
};

BlocklyEditor.prototype.traceOn = function(on) {
	 Blockly.mainWorkspace.traceOn(on);
};

BlocklyEditor.prototype.hideChaff = function() {
	Blockly.hideChaff();
};

BlocklyEditor.prototype.highlightBlock = function(id) {
	Blockly.mainWorkspace.highlightBlock(id);
};

BlocklyEditor.prototype.addCommands = function(toolbox) {
	
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
	  
inherits(BlocklyEditor, MultiBlockEditor);

MultiBlockEditor.prototype.cleanCode = function() {
	for (var i = 0; i < this.blocklys.length; i++)
		this.blocklys[i].cleanCode();
};

MultiBlockEditor.prototype.initialize = function(cfgSize, cfg) {

	for (var i = 0; i < this.blocklys.length; i++) {

		  var b = this.blocklys[i];
		  
		  b.initialize(cfgSize, cfg, i);
	}
  
   Game.selectTab(this.blocklys[0].id);
   Blockly.mainWorkspace.addChangeListener(Hints.changeListener);
		  
};

MultiBlockEditor.prototype.zoom = function() {
	this.blocklys[0].zoom();
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

MultiBlockEditor.prototype.selectTab = function(id) {
	Game.selectedTab = id;
	Game.showTabs(id);
	$('#multiBlockly').easytabs("select", "#" + (id));
	Blockly.asyncSvgResize(Blockly.mainWorkspace);  // Blockly.fireUiEvent(window, 'resize');
	
	if (Game.counterInstruction != null) {
		Game.counterInstruction.style.display = (id === "blockly1"?"inline":"none");
		Game.updateCounterInstructions(-1);	
	}
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
	
	// os outros editores tem esse m�todo em branco
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
	this.top = 0;
	
};

CodeEditor.prototype.show = function() {
	showOneEditArea(this.id);
};

CodeEditor.prototype.cleanCode = function() {
	
	
};

CodeEditor.prototype.initialize = function() {
	
    ace.require("ace/ext/language_tools");
    ace.require("ace/mode/javascript");
    ace.require("ace/worker/javascript");
    
	var editor = ace.edit("codeeditor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    
    var snippetManager = ace.require("ace/snippets").snippetManager; 
    // remove all javascript snippets... i didnt find a way to avoid to load these snippets
    ace.config.loadModule("ace/snippets/javascript", function(m) { 
        if (m) { 
            snippetManager.files.javascript = m; 

            m.snippets = [];
            
            snippetManager.register(m.snippets, m.scope); 
        } 
    }); 
    editor.getSession().setTabSize(2);
    editor.getSession().setUseSoftTabs(true);
    editor.$blockScrolling = Infinity;
    
    editor.getSession().on('changeMode', function(e) {
    	
    	var session = ace.edit("codeeditor").getSession();
    	
    	session.$worker.removeAllListeners("annotate");
    	session.$worker.on("annotate", function(results) {
    	   var annotations = results.data;
    	   // modify annotations
    	   session.setAnnotations(annotations);
    	});
    	
    	session.$worker.call("changeOptions", [{undef:true, global: editor.availableCommands}]); 

    });
    
   // var m = ace.require("ace/mode/javascript").Mode;
    
    editor.completers = [this.completer];
    this.editor = editor;
	
    
};

CodeEditor.prototype.backgroundColor = function(color) {
	
};


CodeEditor.prototype.addCommands = function(toolbox) {
	
	this.editor.completerItems = [];
	this.editor.availableCommands = {};
	var xmlBlock = Blockly.parseToolboxTree_(toolbox);
	
	var children = xmlBlock.children;
	for (var i = 0; i < children.length; i++) {
		for (var j = 0; j < children[i].children.length; j++) {
			var snippet = Blockly.Snippets[xmlBlock.children[i].children[j].attributes.type.nodeValue];
			if (snippet) {
				this.editor.completerItems.push(snippet.completer);
				if (snippet.registeredName)
					this.editor.availableCommands[snippet.registeredName] = true;
			}
				
			
		}
	}
	
	this.editor.completerItems.push(Blockly.Snippets['var'].completer);
	
};

CodeEditor.prototype.showCountInstructions = function() { return false; };
CodeEditor.prototype.hasDebug = function() { return false; };

CodeEditor.prototype.zoom = function() {

};


CodeEditor.prototype.loadCode = function(xmlCode) {
	
};

CodeEditor.prototype.resize = function(t) {
	resizeOneEditArea(this.editArea, t, this.top);
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
	return this.editor.getValue();
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

CodeEditor.prototype.bindMouseDownSvgGroupEvent= function () {};

CodeEditor.prototype.countInstructions = function(visitor) {
	return 0;
};

CodeEditor.prototype.addChangeListener = function(evt) {
	
};

CodeEditor.prototype.removeChangeListener = function(evt) {
	
};

CodeEditor.prototype.lengthTopBlocks = function() {
	return 0;	
};

CodeEditor.prototype.traceOn = function(on) {
	 
};

CodeEditor.prototype.hideChaff = function() {
	
};

CodeEditor.prototype.highlightBlock = function(id) {
	
};

CodeEditor.prototype.completer = { 
		getCompletions : function(editor, session, pos, prefix, callback) {
			callback(null, editor.completerItems);
		}
};