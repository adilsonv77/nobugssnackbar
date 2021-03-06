'use strict';
var Hints = {};
Hints.Categories = [];
Hints.beforeHideChaff = null; // this need to keep here

Hints.chooseCategoryCalled = false;
Hints.bindEvent1 = null;
Hints.bindEvents = [];

Hints.TIMEINTERVAL = 3000;
Hints.lastTimeSpent = 0;

Hints.hndlTimer = 0;

Hints.hintBlockDeleted = null;
Hints.evtChangeListener = null;

Hints.specialControl = false;
Hints.noHints = false;

Hints.menuOpened = false;

Hints.showedIddle = 0;

Hints.lastInsertedBlock = null;
Hints.activeBlock = null;
Hints.lastCountBlocks = 0;
Hints.showedCountInstrutionsHint = false;

Hints.dealError = false;

var countInstructions, countTopInstructions, menuSelected, showedHint; 

Hints.init = function(hints, launch) {

	if (!Game.loginData.userLogged.showHint || Hints.noHints)
		return;

	Hints.hints = {sequence:[], whenError:[]};
	
	Hints.chooseCategoryCalled = false;
	Hints.bindEvent1 = null;
	Hints.bindEvents = [];

	Hints.TIMEINTERVAL = 3000;
	Hints.lastTimeSpent = 0;

	Hints.hndlTimer = 0;

	Hints.hintBlockDeleted = null;
	Hints.evtChangeListener = null;

	Hints.specialControl = false;

	Hints.menuOpened = false;

	Hints.showedIddle = 0;

	Hints.lastInsertedBlock = null;
	Hints.activeBlock = null;
	Hints.lastCountBlocks = Game.editor.countInstructions();
	Hints.showedCountInstrutionsHint = false;

	
	if (Hints.evtChangeListener == null)
		Hints.evtChangeListener = Game.editor.addChangeListener(Hints.changeListener);
		
	if (hints != null) {
		
		var hs = hints.getElementsByTagName("sequence");
		if (hs != null && hs.length > 0)
			Hints.hints.sequence = Hints.traverseHints(hs[0].firstElementChild, false);
		
		hs = hints.getElementsByTagName("errors");
		if (hs != null && hs.length > 0)
			Hints.hints.whenError = Hints.traverseHints(hs[0].firstElementChild, true);

	}

    Hints.addDefaultErrorHints();

    if (launch && Hints.hints.sequence.length > 0) 
    	Hints.launchTimer(Hints.hints.sequence[0].time);
    
    if (Blockly.mainWorkspace && Blockly.mainWorkspace.toolbox_ != undefined)
    	Blockly.bindEvent_(Blockly.mainWorkspace.toolbox_.HtmlDiv, 'mousedown', null, Hints.menuEvent);
    
    if (Hints.beforeHideChaff == null) {
        Hints.beforeHideChaff = Blockly.hideChaff;
        Blockly.hideChaff = Hints.hideChaff;
    }
    	
    
};

Hints.menuEvent = function() {
	Hints.menuOpened = Blockly.mainWorkspace.toolbox_.tree_.selectedItem_ != null;
};

Hints.hideChaff = function(b) {
	
	Hints.beforeHideChaff(b);
	Hints.menuOpened = false;
	
};

Hints.addDefaultErrorHints = function() {
	
	var hint = {};
	/*
	hint.next = new Object();
	hint = hint.next;
	hint.content = document.getElementById("Hints_GoalButtonError").innerHTML;
	hint.time = 0;
	hint.condition = "true";
	hint.running = false;
	hint.category = "GoalButton";
	
	Hints.hints.whenError.push(hint);
	*/
	
	hint = new Object();
	hint.category = "TestBlock";
	hint.content =  document.getElementById("Hints_EmptyInputError").innerHTML;
	hint.time = 10000;
	hint.running = false;
	hint.condition = "Hints.hasEmptyInputs()";
	Hints.hints.sequence.push(hint);
	
	hint = new Object();
	hint.category = "TestBlock";
	hint.content =  document.getElementById("Hints_TalkUndefinedError").innerHTML;
	hint.time = 0;
	hint.running = false;
	hint.condition = "Hints.lastTalkText() === undefined";
	Hints.hints.whenError.push(hint);
	
	hint = new Object();
	hint.content =  document.getElementById("Hints_DebugButtonError").innerHTML;
	hint.time = 0;
	hint.running = false;
	hint.category = "DebugProgram";
	hint.condition = "Game.howManyRuns > 2" + " && " + Hints.Categories[hint.category].naturalCondition;
	Hints.hints.whenError.push(hint);

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

Hints.traverseHints = function(hint, error) {
    
	var ret = [];
	var before = null;
    var h = null;
	while (hint) {

	  h = {};
	  
	  h.showed = false;
	  h.type = hint.tagName;
			  
	  h.category = hint.getAttribute("category");

	  Hints.formatCategory(h);
	  
	  //h.content = hint.innerHTML || hint.textContent;
	  h.content = hint.textContent;
	  
	  if (h.content.length == 0)
		  h.content = null;
	  
	  h.content = changeImgHex(h.content); // utils
	  /*
	  h.imghex = hint.getElementsByTagName("imghex"); 
	  if ((h.imghex != null || h.imghex != undefined) && h.imghex.length > 0) {
		  convertImgHex(h.imghex, h, function(h, hexId, hexHex, img){
			  h.content = 
			    h.content.replace("<imghex id=\"" + hexId + "\"><![CDATA["+ hexHex +"]]></imghex>", img);
		  });
	  }
	  */
	  h.time = hint.getAttribute("time");
	  if (h.time == null )
		  h.time = Hints.TIMEINTERVAL;
	  
	  h.time = parseInt(h.time);
	  
	  h.condition = (hint.getAttribute("condition"));
	  if (h.condition == null)
		  h.condition = Hints.Categories[h.category].condition;
	  
	  if (h.condition == undefined)
		  h.condition = "true";
	  
	  if (Hints.Categories[h.category].naturalCondition != undefined)
		  h.condition = Hints.Categories[h.category].naturalCondition + " && " + h.condition;
	  
	  h.running = hint.getAttribute("running");
	  if (h.running == null)
		  h.running = Hints.Categories[h.category].running;
	  
	  if (h.running == null || h.running == undefined)
		  h.running = false;
	  
	  h.modal = hint.getAttribute("modal");
	  if (h.modal == null || h.modal == undefined)
		  h.modal = false;
	  else
		  h.modal = h.modal === "true";
	  
	  h.text = hint.getAttribute("text");
	  
	  hint = hint.nextElementSibling;

	  if (h.category === "BlockDeleted" && Hints.hintBlockDeleted == null) {
		  Hints.hintBlockDeleted = h;
		  continue;
	  }
	  
	  if (before != null)
		  before.next = h;

	  before = h;
	  ret.push(h);
	}
  
	return ret;
  
  
};

Hints.showErrorHint = function() {
	
	if (Hints.noHints)
		return;
	
	countInstructions = Game.editor.countInstructions();
	
	Hints.dealError = true;
	Hints.hintSelected = null;
	var hintErrors = Hints.hints.whenError;
	for (var i=0; i<hintErrors.length; i++) {
	
		var hint = hintErrors[i];
		Hints.hintSelected = hint;
		
		if (hint.category.startsWith("TestBlock")) {
			
			Hints.foundTestBlock = false;
			Game.editor.countInstructions(Hints.visitBlocks);
			
			if (Hints.foundTestBlock)
				return;
			
			
			
		} else {
			
			showedHint = hint.showed;
			var condition = eval(hint.condition);
			if (condition) {
				
				var cat = Hints.Categories[hint.category];
				
				hint.showed = true;
				cat.show(hint.args);
				
				Hints.associateHideEvents(null, (cat.specialEvent!=undefined?cat.specialEvent():null));
				break;
				
			}
		}
		
		
	}
	
};

Hints.timeIsUp = function() {

	if (Hints.hndlTimer == 0)
		return;
	
	Hints.dealError = false;
	Hints.hndlTimer = 0;
	
	var hints = Hints.hints.sequence;
	if (hints.length == 0)
		return;
	
	if (Blockly.Block.dragMode_ > 0) {
		Hints.launchTimer(Hints.TIMEINTERVAL);
		return;
	}
	var beforeHH = Game.hideHints;
	Game.hideHints = false;
	
	 // variables used into conditions
	countInstructions = Game.editor.countInstructions(Hints.clearWarnings);
	countTopInstructions = Game.editor.lengthTopBlocks();
	if (Blockly.mainWorkspace && Blockly.mainWorkspace.toolbox_ != undefined) {
		menuSelected = Blockly.mainWorkspace.toolbox_.tree_.selectedItem_;
		
		menuSelected = (menuSelected!=null?menuSelected.element_:null);
	}
	else
		menuSelected = null;
	
	Hints.hintSelected = null;
	for (var i=0; i<hints.length; i++) {
		
		if (Hints.runHint(hints[i])) {
			Game.hideHints = beforeHH;
			return;
		}
		
	}
	
	Game.hideHints = beforeHH;
	Hints.launchTimer(Hints.TIMEINTERVAL);

};

Hints.runHint = function(hint) {
	
	Hints.hintSelected = hint; // let this line. hintSelected is used into the methods in the condition

	if (Game.runningStatus > 0 && !hint.running)
		return false;

	if (hint.category.startsWith("TestBlock")) {
		
		Hints.foundTestBlock = false;
		Game.editor.countInstructions(Hints.visitBlocks);
		
		if (Hints.foundTestBlock)
			return true;
		
		return false;
	}
	
	showedHint = hint.showed;
	var condition = eval(hint.condition);
	var cat = Hints.Categories[hint.category];

	if (condition && Hints.showOnMenu(cat)) {
		
		if (Hints.lastTimeSpent < hint.time) {
			Hints.hndlTimer = window.setTimeout(Hints.showHint.bind(window, hint), hint.time-Hints.lastTimeSpent);
			Hints.lastTimeSpent = hint.time;
		} else {
			Hints.showHint(hint);
		}
		return true;
		
	}
	
	return false;

};
Hints.showHint = function(hint) {
	
	Hints.hintSelected = hint;
	var cat = Hints.Categories[hint.category];
	
	hint.showed = true;
	cat.show(hint.args);
	Hints.associateHideEvents(cat.bindEvent, (cat.specialEvent!=undefined?cat.specialEvent():null));
	
};

Hints.launchTimer = function(time) {
	
	if (Game.loginData.userLogged.showHint) {

		if (Hints.hndlTimer == 0 && !Hints.noHints) {
			
	    	Hints.hndlTimer = window.setTimeout(Hints.timeIsUp, time);
	    	Hints.lastTimeSpent = time;
		}
		
	}
	
};

Hints.showOnMenu = function(category) {
	
	if (!Hints.menuOpened) return true;
	
	var hideOnMenu = category.hideOnMenu;
	if (hideOnMenu == undefined)
		hideOnMenu = true;
	
	return !hideOnMenu;
	
};

Hints.clearWarnings = function(block) {
	block.setWarningText(null);
	return true;
};

Hints.visitBlocks = function(block) {
	
	Hints.activeBlock = block;
	var hint = Hints.hintSelected;
	
	showedHint = hint.showed;
	var condition = eval(hint.condition);
	var cat = Hints.Categories[hint.category];

	if (condition && (Hints.dealError || Hints.showOnMenu(cat))) {
		Hints.foundTestBlock = true;
		
		hint.showed = true;
		cat.show(hint.args);
		Hints.associateHideEvents(cat.bindEvent, (cat.specialEvent!=undefined?cat.specialEvent():null));
		return false;
		
	}
	Hints.activeBlock = null;
	return true;
};

Hints.associateHideEvents = function(bindEvent, specialEvent) {
	
	if (bindEvent == undefined || bindEvent == null)
		bindEvent = Hints.hideHintWithTimer;
	
	Hints.bindEvent1 = Game.editor.addChangeListener(bindEvent);
	
	if (Blockly.mainWorkspace && Blockly.mainWorkspace.toolbox_ != undefined)
		Hints.bindEvents.push(Blockly.bindEvent_(Blockly.mainWorkspace.toolbox_.HtmlDiv, 'mousedown', null, bindEvent));
	
	if (Blockly.mainWorkspace)
		Hints.bindEvents.push(Game.editor.bindMouseDownSvgGroupEvent(null, bindEvent));
	
	Hints.bindEvents.push(Blockly.bindEvent_(window, 'showWindowPrompt', null, bindEvent));
	if (specialEvent != null)
		Hints.bindEvents.push(specialEvent);
	
	if (Blockly.mainWorkspace) {
		Hints.bindEvents.push(Blockly.bindEvent_(Blockly.mainWorkspace.scrollbar.hScroll.svgBackground_, 'mousedown', null, bindEvent));
		Hints.bindEvents.push(Blockly.bindEvent_(Blockly.mainWorkspace.scrollbar.hScroll.svgKnob_, 'mousedown', null, bindEvent));

		Hints.bindEvents.push(Blockly.bindEvent_(Blockly.mainWorkspace.scrollbar.vScroll.svgBackground_, 'mousedown', null, bindEvent));
		Hints.bindEvents.push(Blockly.bindEvent_(Blockly.mainWorkspace.scrollbar.vScroll.svgKnob_, 'mousedown', null, bindEvent));
	}
	Hints.bindEvents.push(Blockly.bindEvent_(Game.slider.svg, 'mousedown', null, bindEvent));
	
};

Hints.hideHintWithTimer = function () {
	Hints.stopHints();
	
	Hints.launchTimer((Hints.hintSelected==null||Hints.hintSelected.next==null?Hints.TIMEINTERVAL:Hints.hintSelected.next.time));

};

Hints.hideHints = function() {
	
	MyBlocklyApps.hideDialog(false);
	
	if (Hints.bindEvent1 != null) {
		Game.editor.removeChangeListener(Hints.bindEvent1);
		
		Hints.bindEvent1 = null;
	}
	
	while (Hints.bindEvents.length > 0) {
		Blockly.unbindEvent_(Hints.bindEvents[0]);
		Hints.bindEvents.shift();
	}
};

Hints.startHints = function() {
	if (Hints.specialControl || Hints.noHints)
		return;
	
	Hints.showedErrorHint = false;

	Hints.launchTimer(Hints.TIMEINTERVAL);
	
};

Hints.stopHints = function() {
	window.clearTimeout(Hints.hndlTimer);
	Hints.hideHints();
	Hints.hndlTimer = 0;
};

/**
 * This two methods are necessary because sometimes the main flow of the game doesn't favor to stop the hints.
 */
Hints.startHintsEx = function() {
	if (Hints.noHints)
		return;
	
	Hints.specialControl = false;
	Hints.startHints();
};

/**
 * Same as the previous method.
 */
Hints.stopHintsEx = function() {
	Hints.stopHints();
	Hints.specialControl = true;
};

Hints.changeListener = function() {
	
	var howMany = Game.editor.countInstructions();
	Game.updateCounterInstructions(howMany);
	if (howMany > Hints.lastCountBlocks) {
		Hints.lastInsertedBlock = Blockly.selected;
	} else {
		if (howMany < Hints.lastCountBlocks) {
			Hints.lastInsertedBlock = null;
			if (Hints.hintBlockDeleted != null) {
				Hints.runHint(Hints.hintBlockDeleted);
			}
		}
	}
	
	Hints.activeBlock = Hints.lastInsertedBlock;
	Hints.lastCountBlocks = howMany;
};

Hints.countChildren = function(block) {
	var blocks = [];
	if (block.type === "controls_if") {
		blocks.push(block.childBlocks_[1]);
		if (block.elseCount_ == 1)
			blocks.push(block.childBlocks_[2]);
	} else {
		blocks.push(block);
	}
	return Game.editor.countInstructions(null, blocks);
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

function HintShowDialog(content, style, centered, closeFunc) {

	MyBlocklyApps.showDialog(content, null, false, false, centered == true, BlocklyApps.getMsg("Hints_Title"), 
			style, null, function() {if (closeFunc) closeFunc(); Hints.hideHintWithTimer();}, true);
	
}

function HintShowModalDialog(content, style, centered, closeFunc) {
	
	MyBlocklyApps.showDialog(content, null, false, true, centered == true, BlocklyApps.getMsg("Hints_Title"), 
			style, null, function() {if (closeFunc) closeFunc(); Hints.hideHintWithTimer();}, true);
	
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
	
	HintShowDialog(dialog, style);
	
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
	
	var e = Blockly.mainWorkspace.toolbox_.tree_.children_[menu].element_;
	
	e = Blockly.mainWorkspace.toolbox_.flyout_.workspace_.getTopBlocks(false)[submenu];
	if (e == undefined)
		return [];
		
	Hints.hintSelected.e = e;
	
	return [createStyle(e.getSvgRoot(), e.height, dialog), e.getSvgRoot()];

}

function createDownDlg(bX, bY, txt) {
	
	var dialog = document.getElementById("DownHint");
	
	var text = document.getElementById("DownHintText");
	text.innerHTML = txt;

	var style = {};
	style.top = (bY - 155) + "px";
	style.left =(bX - 10) + "px";
	style.width = "550px";
	
	HintShowDialog(dialog, style);
	
};

function createDownDlgByButton(itemId, txt) {
	var origin = document.getElementById(itemId);
	
	var bbBox = BlocklyApps.getBBox_(origin);
	
	createDownDlg(bbBox.x, bbBox.y, txt);

	return origin;
	
}

function createRightDlg(x, y, text, modal) {
	
//	modal = (modal === undefined || modal === "false"?false:true);

	var dialog = document.getElementById("RightHint");
	
	var hintText = document.getElementById("RightHintText");
	hintText.innerHTML = text;
	
	var style = {};
	style.width = "300px" ;
	style.top = y + "px";
	style.left = (x - 325) + "px";
	
	if (modal)
		HintShowModalDialog(dialog, style);
	else
		HintShowDialog(dialog, style);

};


function createInfoDlg(contentTxt, style, title, modal) {
	
	var content = document.getElementById('dialogHint');
	var container = document.getElementById('dialogHintText');
	container.innerHTML = contentTxt;

	if (modal)
		HintShowModalDialog(content, style, true);
	else
		HintShowDialog(content, style, true);

}


/****************************************************************************************/
/**                  Supported functions used in conditions                             */
/****************************************************************************************/

Hints.countInstructions = function() {
	return countInstructions;
};

Hints.howManyRuns = function() {
	return Game.howManyRuns;
};

Hints.countTopInstructions = function() {
	return countTopInstructions;
};

Hints.typeActiveBlock = function() {
	return Hints.activeBlock.type;
};

Hints.countShowedIddle = function() {
	return Hints.showedIddle;
};

Hints.countChildrenActiveBlock = function() {
	return Hints.countChildren(Hints.activeBlock);
};

Hints.blockTypeLastError = function() {
	return Game.lastErrorData.block.type;	
};

Hints.containsBlockTypeLastError = function(block) {
	return Game.lastErrorHas(block);
};

Hints.lastErrorId = function() {

	return Game.lastErrorData.iderror;

};

Hints.fCountVariable = function(block) {
	if (block.type === "variables_set")
		Hints.totalVariable++;
	return true;
};

Hints.countVariable = function() {
	Hints.totalVariable = 0;
	Game.editor.countInstructions(Hints.fCountVariable);
	return Hints.totalVariable;
};

Hints.isVariable = function() {
	return (Hints.activeBlock != null && Hints.activeBlock.type == "variables_set") ;
};

Hints.variableName = function() {
	return Hints.activeBlock.getVars()[0];
};

Hints.showedHint = function() {
	return showedHint;
};

Hints.activeBlockHasElse = function() {
	return Hints.activeBlock.elseCount_ > 0;
};

Hints.hasEmptyInputs  = function() {
	
	if (Hints.activeBlock == Hints.lastInsertedBlock) // dont test the block is just inserted
		return false;
	
	 
	if (Hints.activeBlock.type !== "fillInGap" && Game.hasEmptyInputs(Hints.activeBlock)) {
		Hints.activeBlock = Game.blockWithEmptyInputs;
		return true;
	}
	
	return false;
};

Hints.hasEmptyInputsEx = function() {
	
	return Game.hasEmptyInputs(Hints.activeBlock);
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
	Game.editor.countInstructions(Hints.fCountVariableName);
	return Hints.variablesNames.length;
};

Hints.instructionEnabled = function() {
	return $("#instructionButton").css("display").indexOf("inline") == 0;
};

Hints.isGoalNotAchieved = function(idxGoal) {
	var os = hero.objective.objectives;
	return (!os[idxGoal-1].achieved);
};

Hints.lastTalkText = function() {

	var tt = hero.talkText;
	if (tt !== null) 
		return (tt && tt.data?tt.data:tt);
	else
		return null;
};

/****************************************************************************************/
/**                              Categories                                             */
/****************************************************************************************/

Hints.Categories["ChooseCategory"] = {

	show: 	
		function (param) {
	
			Hints.hintSelected.e = Blockly.mainWorkspace.toolbox_.tree_.children_[parseInt(param[0])].element_;
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
		"(Hints.chooseCategoryCalled == false) && (Blockly.mainWorkspace.toolbox_.tree_.children_[parseInt(Hints.hintSelected.args[0])].element_ != menuSelected)",

	specialEvent:
		function() {
			
			return Blockly.bindEvent_(Hints.hintSelected.e, 'mousedown', null, Hints.Categories["ChooseCategory"].onselect);
		
		},
		
	onselect:
		function() {
		
			Hints.chooseCategoryCalled = true;
			Hints.hideHintWithTimer();
		},
		
	hideOnMenu : false
};

Hints.Categories["SelectCommand"] = {

	show:
		function (param) {
	
			var dialog = document.getElementById("SelectCommand");
			if (Hints.hintSelected.content != null) {
				document.getElementById("SelectCommandText").innerHTML = Hints.hintSelected.content;
			}
			var res = createStylePosition(parseInt(param[0]), parseInt(param[1]), dialog);
			
			if (res.length > 0) {
				HintShowDialog(dialog, res[0]);
				
				Hints.chooseCategoryCalled = true;
				
			} else {
				Hints.Categories["SelectCommand"].bindEvent();
			}
			
		},
		
	condition:
		"countInstructions == 0",
		
	naturalCondition:
		"(Hints.chooseCategoryCalled == true || (Blockly.mainWorkspace.toolbox_.tree_.children_[parseInt(Hints.hintSelected.args[0])].element_ == menuSelected))" ,

	bindEvent:
		function() {
			Hints.chooseCategoryCalled = false;
			Hints.hideHintWithTimer();
		},

		hideOnMenu : false
		
};

Hints.Categories["StackTogether"] = {
		
	show:
		function (param) {
		
			var dialog = document.getElementById("StackTogether");
			dialog.getElementsByTagName("img").HelpStack.style.display = "inline";
			
			var blocks = Blockly.mainWorkspace.topBlocks_;
			for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].type === param[2])
					if (blocks[i].childBlocks_.length > 1) {
						return null;
					} else {
						Blockly.mainWorkspace.toolbox_.tree_.setSelectedItem(Blockly.mainWorkspace.toolbox_.tree_.children_[parseInt(param[0])]);
						
						var r = createStylePosition(parseInt(param[0]), parseInt(param[1]), dialog);
						HintShowDialog(dialog, r[0]);
				        
						return r[1];
					}
				
			}
		
		},
		
	condition:
		"countInstructions == 1",
		
	hideOnMenu : false
	
};

Hints.Categories["StackTogetherTwo"] = {
	show:
		function(param) {
			var dialog = document.getElementById("StackTogether");
			dialog.getElementsByTagName("img").HelpStack.style.display = "none";
			
			var blocks = Blockly.mainWorkspace.topBlocks_;
			HintShowDialog(dialog, createStyle(blocks[1].getSvgRoot(), 50, dialog));
		},
		
	condition:
		"Blockly.mainWorkspace.topBlocks_.length == 2",
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
		"Game.enabledDebug == true && countInstructions > 0",
			
	running: true
	
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
			
		naturalCondition : "Game.runningStatus == 2",
		
		running : true
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
		running: true,
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
/*			    Blockly.mainWorkspace.traceOn(true);
				Blockly.mainWorkspace.highlightBlock(Hints.activeBlock.id);
			*/	
				Hints.activeBlock.setWarningText(Hints.hintSelected.content);
				/*
				var bbBox = BlocklyApps.getBBox_(Hints.activeBlock.getSvgRoot());
				createRightDlg(bbBox.x, bbBox.y, Hints.hintSelected.content, Hints.hintSelected.modal);
				*/
			},
		
		
};

Hints.Categories["Iddle"] = {
		
		show:
				function (param) {
			
		    		var bbBox = BlocklyApps.getBBox_(Blockly.mainWorkspace.topBlocks_[0].getSvgRoot());
		    		
		    		var style = {top: '120px'}; 
		    		style[Blockly.RTL ? 'right' : 'left'] = (bbBox.x - 500) +  'px';
		    		style.width = "440px";
		    		
					createInfoDlg(Hints.hintSelected.content, style, Game.missionTitle, Hints.hintSelected.modal);
					
					Hints.showedIddle++;
				},

		naturalCondition:
			"(Blockly.mainWorkspace.topBlocks_.length > 0)"
			
	};

Hints.Categories["BlockDeleted"] = {
		
		show:
				function (param) {
		    		
		    		var style = {top: '120px'}; 
		    		style.width = "440px";
		    		
		    		createInfoDlg(Hints.hintSelected.content, style, Game.missionTitle);
				}
	};

Hints.showedErrorHint = false;

// the LastError category happens when an error is throwed during the program execution 
Hints.Categories["LastError"] = {
		
		show:
				function (param) {
					var bbBox = BlocklyApps.getBBox_(Game.lastErrorData.block.getSvgRoot());
					createRightDlg(bbBox.x, bbBox.y, Hints.hintSelected.content);
					Hints.showedErrorHint = true;
				},
				
		naturalCondition :
			"(!Hints.showedErrorHint && Game.lastErrorData.block != null)"
	};

Hints.Categories["ShowCountInstructions"] = {
		
		show :
			function (param) {
				
				if (Hints.hintSelected.content == null)
					Hints.hintSelected.content = document.getElementById("Hints_ShowCountInstructions").innerHTML;
				
				var bbBox = BlocklyApps.getBBox_(Game.counterInstruction);
				createRightDlg(bbBox.x, bbBox.y, Hints.hintSelected.content);
				Hints.showedCountInstrutionsHint = true;
				
			},
		
		naturalCondition : 
			"(Game.firstTime && !Hints.showedCountInstrutionsHint)"
		
};

Hints.Categories["Slider"] = {
		
		show:
				function (param) {
					Game.slider.svg.style.visibility = "visible";

					if (Hints.hintSelected.content == null)
						Hints.hintSelected.content = document.getElementById("NoBugs_slider").innerHTML;
					
					var bbBox = BlocklyApps.getBBox_(document.getElementById("divslider"));
					createDownDlg(bbBox.x, bbBox.y, Hints.hintSelected.content);
				},

		naturalCondition:
			"Game.howManyRuns >= Game.slider.timesBefore && Game.slider.svg.style.visibility == 'hidden'"
			
	};

Hints.Categories["SliderEx"] = {
		
		show:
				function (param) {
					Game.slider.svg.style.visibility = "visible";

					if (Hints.hintSelected.content == null)
						Hints.hintSelected.content = document.getElementById("NoBugs_slider").innerHTML;
					
					var bbBox = BlocklyApps.getBBox_(document.getElementById("divslider"));
					createDownDlg(bbBox.x, bbBox.y, Hints.hintSelected.content);
				}

	};

Hints.Categories["Free"] = {
		
		show:
				function (param) {
			
		    		var style = {top: '120px'}; 
		    		style.width = "440px";
		    		
		    		createInfoDlg(Hints.hintSelected.content, style, Game.missionTitle, Hints.hintSelected.modal);
		    		
				}
			
		};
