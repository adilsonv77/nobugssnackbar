var Hints = {};
Hints.Categories = [];
Hints.chooseCategoryCalled = false;
Hints.bindEvent1 = null;
Hints.bindEvents = [];

Hints.TIMEINTERVAL = 3000;

Hints.hndlTimer = 0;

Hints.lastCountBlocks;

Hints.init = function(hints) {
	
	Hints.hints = {sequence:[], whenError:[], testBlock:[]};
	if (hints == null)
		return;
	
	Hints.lastInsertedBlock = null;
	Hints.activeBlock = null;
	Hints.lastCountBlocks = Blockly.mainWorkspace.getTopBlocks(true).length;
	
	Blockly.removeChangeListener(Hints.changeListener);
	Blockly.addChangeListener(Hints.changeListener);
	
	var hs = hints.getElementsByTagName("sequence");
	if (hs != null && hs.length > 0)
		Hints.hints.sequence = Hints.traverseHints(hs[0].firstElementChild, false, Hints.hints.testBlock);
	
	hs = hints.getElementsByTagName("errors");
	if (hs != null && hs.length > 0)
		Hints.hints.whenError = Hints.traverseHints(hs[0].firstElementChild, true);

    if (Hints.hints.sequence.length > 0) {
    	
    	Hints.hndlTimer = window.setTimeout(Hints.timeIsUp, Hints.hints.sequence[0].time);
    }
	
    
    Hints.addDefaultErrorHints();
};

Hints.addDefaultErrorHints = function() {
	
	var hint = {};
	hint.content = document.getElementById("Hints_GoalButtonError").innerHTML;
	hint.time = 0;
	hint.condition = "true";
	hint.category = "GoalButton";
	
	Hints.hints.whenError.push(hint);
	
	hint.next = new Object();
	
	hint = hint.next;
	hint.content =  document.getElementById("Hints_DebugButtonError").innerHTML;
	hint.time = 0;
	hint.category = "DebugProgram";
	hint.condition = "Game.howManyRuns > 2" + " && " + Hints.Categories[hint.category].naturalCondition;
	Hints.hints.whenError.unshift(hint);
	
	hint = new Object();
	
	hint.category = "TestBlock";
	hint.content =  document.getElementById("Hints_EmptyInputError").innerHTML;
	hint.time = 0;
	hint.condition = "Hints.hasEmptyInputs()";
	
	Hints.hints.testBlock.push(hint);
	
};

Hints.formatCategory = function(hint) {
	
	var category = hint.category;
	if (category.indexOf("(") > 0) {
	  
	  hint.args = category.substring(category.indexOf("("));
	  hint.args = hint.args.substring(1, hint.args.length-1);
	  hint.args = hint.args.split(",");
	  
	  hint.category = category.substring(0, category.indexOf("("));
		  
	}
	
};

Hints.traverseHints = function(hint, error, listTestBlock) {
    
	var ret = [];
	var before = null;
	var beforeTest = null;
    var h = null;
	while (hint) {

	  h = {};
	  
	  h.type = hint.tagName;
			  
	  h.category = hint.getAttribute("category");
	  
	  Hints.formatCategory(h);
	  
	  h.content = hint.innerHTML || hint.textContent;
	  if (h.content.length == 0)
		  h.content = null;
	  
	  h.time = hint.getAttribute("time");
	  if (h.time == null )
		  h.time = Hints.TIMEINTERVAL;
	  
	  h.time = parseInt(h.time);
	  
	  h.condition = (hint.getAttribute("condition"));
	  if (h.condition == null)
		  h.condition = Hints.Categories[h.category].condition;
	  
	  if (Hints.Categories[h.category].naturalCondition != undefined)
		  h.condition = h.condition + " && " + Hints.Categories[h.category].naturalCondition;
	  
	  hint = hint.nextElementSibling;
	  if (h.category === "TestBlock") {
		  if (beforeTest != null)
			  beforeTest.next = h;

		  beforeTest = h;
		  listTestBlock.push(h);
		  
	  } else {
		  if (before != null)
			  before.next = h;

		  before = h;
		  ret.push(h);
	  }
	}
  
	return ret;
  
  
};

Hints.showErrorHint = function() {
	
	var countInstructions = Game.countInstructions(Blockly.mainWorkspace.getTopBlocks());
	
	Hints.hintSelected = null;
	var hintErrors = Hints.hints.whenError;
	for (var i=0; i<hintErrors.length; i++) {
	
		var hint = hintErrors[i];
		
		var condition = eval(hint.condition);
		if (condition) {
			
			Hints.hintSelected = hint;
			var cat = Hints.Categories[hint.category];
			
			cat.show(hint.args);
			
			Hints.associateHideEvents(null, (cat.specialEvent!=undefined?cat.specialEvent():null));
			break;
			
		}
		
	}
	
};

Hints.timeIsUp = function() {

	if (Hints.hndlTimer == 0)
		return;
	
	Hints.hndlTimer = 0;
	
	var hints = Hints.hints.sequence;
	if (hints.length == 0 && Hints.hints.testBlock.length == 0)
		return;
	
	if (Blockly.Block.dragMode_ > 0) {
		Hints.hndlTimer = window.setTimeout( Hints.timeIsUp, Hints.TIMEINTERVAL );
		return;
	}
	
	var countInstructions = Game.countInstructions(Blockly.mainWorkspace.getTopBlocks());
	var menuSelected = Blockly.Toolbox.tree_.selectedItem_; 
	if (menuSelected != null)
		menuSelected = menuSelected.element_;
	
	Hints.hintSelected = null;
	for (var i=0; i<hints.length; i++) {
		var hint = hints[i];
		Hints.hintSelected = hint;
		
		var condition = eval(hint.condition);
		if (condition) {
			
			var cat = Hints.Categories[hint.category];
			
			cat.show(hint.args);
			Hints.associateHideEvents(cat.bindEvent, (cat.specialEvent!=undefined?cat.specialEvent():null));
			
			return;
			
		}
	}
	
	if (Hints.hints.testBlock.length > 0) {
		
		for (var i=0; i<Hints.hints.testBlock.length; i++) {
			
			Hints.foundTestBlock = false;
			Hints.hintSelected = Hints.hints.testBlock[i];
			Game.countInstructions(Blockly.mainWorkspace.getTopBlocks(), Hints.visitBlocksV2);
			
			if (Hints.foundTestBlock)
				return;
			
		}
		
	}
	
	
	Hints.hndlTimer = window.setTimeout( Hints.timeIsUp, Hints.TIMEINTERVAL );

};

Hints.visitBlocksV2 = function(block) {
	
	Hints.activeBlock = block;
	var hint = Hints.hintSelected;
	
	var condition = eval(hint.condition);
	if (condition) {
		Hints.foundTestBlock = true;

		var cat = Hints.Categories[hint.category];
		
		cat.show(hint.args);
		Hints.associateHideEvents(cat.bindEvent, (cat.specialEvent!=undefined?cat.specialEvent():null));
		return false;
		
	}
	Hints.activeBlock = null;
	return true;
};

Hints.visitBlocks = function(block) {
	
	Hints.activeBlock = block;
	for (var i=0; i<Hints.hints.testBlock.length; i++) {
		var hint = Hints.hints.testBlock[i];
		Hints.hintSelected = hint;
		
		var condition = eval(hint.condition);
		if (condition) {
			Hints.foundTestBlock = true;

			var cat = Hints.Categories[hint.category];
			
			cat.show(hint.args);
			Hints.associateHideEvents(cat.bindEvent, (cat.specialEvent!=undefined?cat.specialEvent():null));
			return false;
			
		}

	}
	Hints.activeBlock = null;
	return true;
	
};

Hints.associateHideEvents = function(bindEvent, specialEvent) {
	
	if (bindEvent == undefined || bindEvent == null)
		bindEvent = Hints.hideHintWithTimer;
	
	Hints.bindEvent1 = Blockly.addChangeListener(bindEvent);

	Hints.bindEvents.push(Blockly.bindEvent_(Blockly.Toolbox.HtmlDiv, 'mousedown', null, bindEvent));
	Hints.bindEvents.push(Blockly.bindEvent_(Blockly.svg, 'mousedown', null, bindEvent));
	Hints.bindEvents.push(Blockly.bindEvent_(window, 'showWindowPrompt', null, bindEvent));
	if (specialEvent != null)
		Hints.bindEvents.push(specialEvent);

};

Hints.hideHintWithTimer = function () {
	Hints.hideHints();
	
	Hints.hndlTimer = window.setTimeout( Hints.timeIsUp, (Hints.hintSelected==null||Hints.hintSelected.next==null?Hints.TIMEINTERVAL:Hints.hintSelected.next.time) );
};

Hints.hideHints = function() {
	
	MyBlocklyApps.hideDialog(false);
	
	if (Hints.bindEvent1 != null) {
		Blockly.removeChangeListener(Hints.bindEvent1);
		Hints.bindEvent1 = null;
	}
	
	while (Hints.bindEvents.length > 0) {
		Blockly.unbindEvent_(Hints.bindEvents[0]);
		Hints.bindEvents.shift();
	}
};

Hints.startHints = function() {
	if (Hints.hndlTimer != 0)
		return;
	
	Hints.hndlTimer = window.setTimeout( Hints.timeIsUp, Hints.TIMEINTERVAL );
};

Hints.stopHints = function() {
	window.clearTimeout(Hints.hndlTimer);
	Hints.hideHints();
	Hints.hndlTimer = 0;
};

Hints.changeListener = function() {
	
	var blocks = Blockly.mainWorkspace.getTopBlocks(true);
	if (blocks.length > Hints.lastCountBlocks) {
		Hints.lastInsertedBlock = Blockly.selected;
	} else 
		if (blocks.length < Hints.lastCountBlocks )
			Hints.lastInsertedBlock = null;
	
	Hints.activeBlock = Hints.lastInsertedBlock;
	Hints.lastCountBlocks = blocks.length;
};

/****************************************************************************************/
/**                          Dialog Creation                                            */
/****************************************************************************************/


function calcTop (e) {
	return e.offsetTop + e.offsetParent.offsetTop + e.offsetParent.offsetParent.offsetTop;
}

function calcLeft(e) {
	return e.offsetLeft + e.offsetParent.offsetLeft + e.offsetParent.offsetParent.offsetLeft;
}

function createLeftDlg(e, dialogContent) {
	document.getElementById("LeftHintText").innerHTML = dialogContent;
	
	var bY = calcTop(e);
	var bX = calcLeft(e);
	var originW = e.clientWidth;
	
	var style = {};
	style.width = "300px";
	style.top = bY + "px";
	style.left = (bX + originW) + "px";

	var dialog = document.getElementById("LeftHint");
	
	BlocklyApps.showDialog(dialog, null, false, false, style, null);
	
	
}

function createStyle(e, originH, dialog) {
	var bbBox = BlocklyApps.getBBox_(e);
	var bY = bbBox.y;
	var bX = bbBox.x;
	
	var style = {};
	style.width = "500px";
	style.top = (bY  + originH) + "px";
	style.left = (bX - (dialog.clientWidth/2)) + "px";
	
	return style;
	
}

function createStylePosition(menu, submenu, dialog) {
	
	var e = Blockly.Toolbox.tree_.children_[menu].element_;
	
	e = Blockly.Toolbox.flyout_.workspace_.getTopBlocks(true)[submenu];
	if (e == undefined)
		return [];
		
	Hints.hintSelected.e = e;
	
	return [createStyle(e.getSvgRoot(), e.svg_.height, dialog), e.svg_.getRootElement()];

}

function createDownDlg(bX, bY, txt) {
	
	var dialog = document.getElementById("DownHint");
	
	var text = document.getElementById("DownHintText");
	text.innerHTML = txt;

	var style = {};
	style.top = (bY - 130) + "px";
	style.left = bX + "px";
	style.width = "550px";
	
	
	BlocklyApps.showDialog(dialog, null, false, false, style, null);
	
	
};

function createDownDlgByButton(itemId, txt) {
	var origin = document.getElementById(itemId);
	
	var bbBox = BlocklyApps.getBBox_(origin);
	
	createDownDlg(bbBox.x, bbBox.y, txt);

	return origin;
	
}

function createRightDlg(x, y, text) {

	var dialog = document.getElementById("RightHint");
	
	var hintText = document.getElementById("RightHintText");
	hintText.innerHTML = text;
	
	var style = {};
	style.width = "300px" ;
	style.top = y + "px";
	style.left = (x - 325) + "px";
	
	BlocklyApps.showDialog(dialog, null, false, false, style, null);

};

/****************************************************************************************/
/**                  Supported functions used in conditions                             */
/****************************************************************************************/

Hints.fCountVariable = function(block) {
	if (block.type === "variables_set")
		Hints.totalVariable++;
	return true;
};

Hints.countVariable = function() {
	Hints.totalVariable = 0;
	Game.countInstructions(Blockly.mainWorkspace.getTopBlocks(), Hints.fCountVariable);
	return Hints.totalVariable;
};

Hints.isVariable = function() {
	return (Hints.activeBlock != null && Hints.activeBlock.type == "variables_set") ;
};

Hints.variableName = function() {
	return Hints.activeBlock.getVars()[0];
};

Hints.hasEmptyInputs  = function() {
	
	var input = Hints.activeBlock.inputList;
	for (var i=0; i<input.length; i++) {
		if (input[i].connection != null && input[i].connection.targetConnection == null)
			return true;
	}
	
	return false;
	
};

Hints.fCountVariableName = function(block) {
	if (block.type === "variables_set") {
		
		var varName = block.getVars()[0];
		for (var i=0; i<Hints.variablesNames.length; i++) {
			if (Hints.variablesNames[i] === varName)
				return true;
		}
		Hints.variablesNames.push(varName);
		
	}
	return true;
};

Hints.countVariableName  = function() {
	Hints.variablesNames = [];
	Game.countInstructions(Blockly.mainWorkspace.getTopBlocks(), Hints.fCountVariableName);
	return Hints.variablesNames.length;
};

/****************************************************************************************/
/**                              Categories                                             */
/****************************************************************************************/

Hints.Categories["ChooseCategory"] = {

	show: 	
		function (param) {
	
			Hints.hintSelected.e = Blockly.Toolbox.tree_.children_[parseInt(param[0])].element_;
			var menuText = Hints.hintSelected.e.firstChild.childNodes[2].textContent;

			var dialogContent = null;
			if (Hints.hintSelected.content == null) {
				Hints.hintSelected.content = BlocklyApps.getMsg("Hints_ChooseCategory");
				Hints.hintSelected.content = Hints.hintSelected.content.format(menuText);
			}
			dialogContent = Hints.hintSelected.content;

			createLeftDlg(Hints.hintSelected.e, dialogContent);
				
		},
	
	condition:
		"countInstructions == 0",

	naturalCondition:
		"(Hints.chooseCategoryCalled == false) && (Blockly.Toolbox.tree_.children_[parseInt(Hints.hintSelected.args[0])].element_ != menuSelected)",

	specialEvent:
		function() {
			
			return Blockly.bindEvent_(Hints.hintSelected.e, 'mousedown', null, Hints.Categories["ChooseCategory"].onselect);
		
		},
		
	onselect:
		function() {
		
			Hints.chooseCategoryCalled = true;
			Hints.hideHintWithTimer();
		}
		
};

Hints.Categories["SelectCommand"] = {

	show:
		function (param) {
	
			var dialog = document.getElementById("SelectCommand");
			var res = createStylePosition(parseInt(param[0]), parseInt(param[1]), dialog);
			
			if (res.length > 0) {
				BlocklyApps.showDialog(dialog, null, false, false, res[0], null);
				Hints.chooseCategoryCalled = true;
			} else {
				Hints.Categories["SelectCommand"].bindEvent();
			}
			            
		},
		
	condition:
		"countInstructions == 0",
		
	naturalCondition:
		"Hints.chooseCategoryCalled == true || (Blockly.Toolbox.tree_.children_[parseInt(Hints.hintSelected.args[0])].element_ == menuSelected)" ,
			
	bindEvent:
		function() {
			Hints.chooseCategoryCalled = false;
			Hints.hideHintWithTimer();
		}
		
};

Hints.Categories["StackTogether"] = {
		
	show:
		function (param) {
		
			var dialog = document.getElementById("StackTogether");
			
			var blocks = Blockly.mainWorkspace.topBlocks_;
			for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].type === param[2])
					if (blocks[i].childBlocks_.length > 1) {
						return null;
					} else {
						Blockly.Toolbox.tree_.setSelectedItem(Blockly.Toolbox.tree_.children_[parseInt(param[0])]);
						
						var r = createStylePosition(parseInt(param[0]), parseInt(param[1]), dialog);
						BlocklyApps.showDialog(dialog, null, false, false, r[0], null);
				        
						return r[1];
					}
				
			}
		
		},
		
	condition:
		"countInstructions == 1"
	
};

Hints.Categories["RunProgram"] = {
	show:
		function (param) {

			if (Hints.hintSelected.content == null)
				Hints.hintSelected.content = document.getElementById("Hints_RunProgram").innerHTML;
		
			return createDownDlgByButton("runButton", Hints.hintSelected.content);
			
		}, 
	
	condition:
		"Game.howManyRuns == 0",
		
	naturalCondition:
		"countInstructions > 0"
		
	
	
};
	
Hints.Categories["DebugProgram"] = {
	show:
		function (param) {
	
			if (Hints.hintSelected.content == null)
				Hints.hintSelected.content = document.getElementById("Hints_DebugProgram").innerHTML;
			
			return createDownDlgByButton("debugButton", Hints.hintSelected.content);
			
		}, 
	
	condition:
		"Game.howManyRuns == 0",
	
	naturalCondition:
		"Game.enabledDebug == true && countInstructions > 0"
			

	
};
	
Hints.Categories["GoalButton"] = {
	show:
		function (param) {
	
			if (Hints.hintSelected.content == null)
				Hints.hintSelected.content = document.getElementById("Hints_GoalButton").innerHTML;
		
			return createDownDlgByButton("goalButton", Hints.hintSelected.content );
		
		},
		
	condition:
		"Game.howManyRuns > 2"
};

Hints.Categories["SourceCode"] = {
		
	show:
		function (param) {
			var bbBox = BlocklyApps.getBBox_(Blockly.mainWorkspace.topBlocks_[0].getSvgRoot());
			createRightDlg(bbBox.x, bbBox.y, Hints.hintSelected.content);
		},
	condition : "true"
};

Hints.Categories["WhileDebugging"] = {
		
		show:
			function (param) {
				if (Hints.hintSelected.content == null)
					Hints.hintSelected.content = document.getElementById("Hints_WhileDebugging").innerHTML;
			
				Hints.Categories["SourceCode"].show();
			},
			
		naturalCondition : "Game.runningStatus == 2"
	};

Hints.Categories["VariableWindow"] = {
		
		show:
			function (param) {
				if (Hints.hintSelected.content == null)
					Hints.hintSelected.content = document.getElementById("Hints_VariableWindow").innerHTML;
			
				var x = parseInt( Game.variableBox.style.left.replace("px", "") );
				var y = parseInt( Game.variableBox.style.top.replace("px", "") );
				if (Game.varWindow == Game.RIGHT) {
					createRightDlg(x, y, Hints.hintSelected.content);
				} else {
					createDownDlg(x, y, Hints.hintSelected.content);
				}
				
			},
			
		naturalCondition : "Game.runningStatus == 2 && Game.enabledVarWindow == true && Hints.Categories['VariableWindow'].thereAreVariable()",
		
		thereAreVariable:
			function () {
			  
				var vars_ = Game.jsInterpreter.variables;
				for (var i=0; i<vars_.length; i++) {
					var data = vars_[i].scope.properties[vars_[i].name].data;
					if (data != undefined) {
						return true;
					}
				}
				
				return false;
			
			}
	};

Hints.Categories["LastBlockInserted"] = {
		
	show:
			function (param) {
				var bbBox = BlocklyApps.getBBox_(Hints.lastInsertedBlock.getSvgRoot());
				createRightDlg(bbBox.x, bbBox.y, Hints.hintSelected.content);
			},

	naturalCondition:
		"Hints.lastInsertedBlock != null"
		
};

Hints.Categories["TestBlock"] = {
		
		show:
			function (param) {
			Blockly.mainWorkspace.traceOn(true);
				Blockly.mainWorkspace.highlightBlock(Hints.activeBlock.id);
				
				var bbBox = BlocklyApps.getBBox_(Hints.activeBlock.getSvgRoot());
				createRightDlg(bbBox.x, bbBox.y, Hints.hintSelected.content);
			},
		
		
};
