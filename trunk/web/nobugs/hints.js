var Hints = {};
Hints.Categories = [];
Hints.chooseCategoryCalled = false;

Hints.init = function(hints) {
	
	Hints.hints = {};
	if (hints == null)
		return;
	
	var resHints = Hints.traverseHints(hints.firstElementChild);
	Hints.hints.sequence = resHints.timeOutHints;
    Hints.now = [];
    if (Hints.hints.sequence[0].type == "sequence") {
    	
        Hints.now[0] = 0;
        Hints.now[1] = 0;
        
    	window.setTimeout(Hints.timeIsUp, Hints.hints.sequence[0].sequence[0].time);
    }
	
    
    Hints.hints.whenError = resHints.errorHints;
    Hints.addDefaultErrorHints();
};

Hints.traverseHints = function(hint) {
    
	var ret = {timeOutHints: [], errorHints:[]};
	while (hint) {

	  var h = {};
	  h.type = hint.tagName;
	  if (hint.tagName == "sequence") {
		  var resHints = Hints.traverseHints(hint.firstElementChild);
		  h.sequence = resHints.timeOutHints;
		  resHints.errorHints.forEach(function(errorHint) { ret.errorHints.push(errorHint);}) ;
	  } else {
		  if (hint.tagName == "hint") {
			  
			  h.content = hint.innerHTML || hint.textContent;
			  
			  if (h.content.indexOf("(") > 0) {
				  
				  h.args = h.content.substring(h.content.indexOf("("));
				  h.args = h.args.substring(1, h.args.length-1);
				  h.args = h.args.split(",");
				  
				  h.content = h.content.substring(0, h.content.indexOf("("));
				  
			  }
			  
			  h.time = hint.getAttribute("time");
			  if (h.time == null )
				  h.time = "0";
			  
			  h.time = parseInt(h.time);
			  
			  h.consist = !(hint.getAttribute("consist") === "false");
			  h.whenError = (hint.getAttribute("whenError") === "true");
			  h.condition = (hint.getAttribute("condition"));
			  h.category = hint.getAttribute("category");
			  
			  h.consist = h.consist && !h.whenError;
		  }
	  }
	  if (h.whenError)
	  	ret.errorHints.push(h);
	  else  
	  	ret.timeOutHints.push(h);
	  hint = hint.nextElementSibling;
	}
  
	return ret;
  
  
};

Hints.showErrorHint = function() {
	
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var countInstructions = Game.countInstructions(xml.childNodes);
	
	var hintErrors = Hints.hints.whenError;
	for (var i=0; i<hintErrors.length; i++) {
	
		var hint = hintErrors[i];
		
		var condition = eval(hint.condition);
		if (condition) {
			
			Hints.hintSelected = hint;
			hint.extraInfo = hint.content;
			var f = Hints.formatCategory(hint);
			f(hint.args);
			
			break;
			
		}
		
	}
	
};

Hints.formatCategory = function(hint) {
	
	var category = hint.category;
	if (category.indexOf("(") > 0) {
	  
	  hint.args = category.substring(category.indexOf("("));
	  hint.args = hint.args.substring(1, hint.args.length-1);
	  hint.args = hint.args.split(",");
	  
	  category = category.substring(0, category.indexOf("("));
		  
	}
	
	return Hints.Categories[category];
	
};

Hints.timeIsUp = function() {
	
	var hint = Hints.hints;
	var ant = [];
	for (var i=0; i < Hints.now.length; i++) {
		ant = [hint, Hints.now[i], i];
		hint = hint.sequence[Hints.now[i]];
	}
	
	Hints.hintSelected = hint;
	var f = Hints.Categories[hint.content];
	var e = f(hint.args);
	
	// e is null when this event is not more necessary
	
	if (ant[1] < ant[0].sequence.length)
		Hints.now[ant[2]]++;
	else
		Hints.now = [];
	
	if (e != null) {
		
		Hints.ToUnbind = Blockly.bindEvent_(e, 'mousedown', this, Hints.onMouseDown);
		
	} else {
		
		if (Hints.now.length > 0) {
			if (Hints.now[1] < Hints.hints.sequence[Hints.now[0]].sequence.length)
				window.setTimeout(Hints.timeIsUp, Hints.hints.sequence[Hints.now[0]].sequence[Hints.now[1]].time);
		}
		
	}
	
};

Hints.onMouseDown = function(evt) { 
	
	Blockly.unbindEvent_(Hints.ToUnbind);
	BlocklyApps.hideDialog(false); 
	if (Hints.now.length > 0)
		if (Hints.now[1] < Hints.hints.sequence[Hints.now[0]].sequence.length)
			window.setTimeout(Hints.timeIsUp, Hints.hints.sequence[Hints.now[0]].sequence[Hints.now[1]].time);
};




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

Hints.Categories["ChooseCategory"] = function (param) {

	if (!Hints.hintSelected.consist || Blockly.mainWorkspace.getTopBlocks(true).length == 0) {
	
		var e = Blockly.Toolbox.tree_.children_[parseInt(param[0])].element_;
		var menuText = e.firstChild.childNodes[2].textContent;

		var dialogContent = null
		if (Hints.hintSelected.extraInfo)
			dialogContent = Hints.hintSelected.extraInfo;
		else {
			
			dialogContent = BlocklyApps.getMsg("Hints_ChooseCategory");
			dialogContent = dialogContent.format(menuText);
		}

		createLeftDlg(e, dialogContent);
		
		Hints.chooseCategoryCalled = true;
		
		return e;
	} else 
		return null;
	
};

function createStyle(e, originH, dialog) {
	var bbBox = BlocklyApps.getBBox_(e);
	var bY = bbBox.y;
	var bX = bbBox.x;
	
	var style = {};
	style.top = (bY  + originH) + "px";
	style.left = (bX - (dialog.clientWidth/2)) + "px";
	
	return style;
	
}

function createStylePosition(menu, submenu, dialog) {
	
	var e = Blockly.Toolbox.tree_.children_[menu].element_;
	
	e = Blockly.Toolbox.flyout_.workspace_.getTopBlocks(true)[submenu];
	
	return [createStyle(e.getSvgRoot(), e.svg_.height, dialog), e.svg_.getRootElement()];

}

Hints.Categories["SelectCommand"] = function (param) {
	
	if (Hints.chooseCategoryCalled) {
		
		var dialog = document.getElementById("SelectCommand");
		var res = createStylePosition(parseInt(param[0]), parseInt(param[1]), dialog);
		
		BlocklyApps.showDialog(dialog, null, false, false, res[0], null);
	            
		return res[1];
	}
	
	return null;
};

Hints.Categories["StackTogether"] = function (param) {
	
	if (!Hints.hintSelected.consist || Blockly.mainWorkspace.getTopBlocks(true).length == 1) {
		
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
		
	}
	
	return null;
	
};

function createDownDlg(itemId, txtId) {
	
	var origin = document.getElementById(itemId);
	
	var dialog = document.getElementById("DownHint");
	
	var text = document.getElementById("DownHintText");
	text.innerHTML = document.getElementById("Hints_" + txtId).innerHTML;

	var bbBox = BlocklyApps.getBBox_(origin);
	var bY = bbBox.y;
	var bX = bbBox.x;
	
	var style = {};
	style.top = (bY - 130) + "px";
	style.left = bX + "px";
	style.width = "550px";
	
	
	BlocklyApps.showDialog(dialog, null, false, false, style, null);
	
	return origin;
	
	
};

Hints.Categories["RunProgram"] = function (param) {
	
	if (!Hints.hintSelected.consist ||Game.howManyRuns == 0) {
		
		return createDownDlg("runButton", (!param || param == null?"RunProgram":param));
		
	} 
	
	return null;
	
	
};
	
Hints.Categories["DebugProgram"] = function (param) {
	
	if (!Hints.hintSelected.consist ||Game.howManyRuns == 0) {
		
		return createDownDlg("debugButton", (!param || param == null?"DebugProgram":param));
		
	} 
	
	return null;
	
	
};
	
Hints.Categories["SourceCode"] = function (param) {
	
	var dialog = document.getElementById("RightHint");
	
	var hintText = document.getElementById("RightHintText");
	hintText.innerHTML = Hints.hintSelected.content;
	
	var bbBox = BlocklyApps.getBBox_(Blockly.mainWorkspace.topBlocks_[0].getSvgRoot());
	var style = {};
	style.width = "300px" ;
	style.top = bbBox.y + "px";
	style.left = (bbBox.x - 320) + "px";
	
	BlocklyApps.showDialog(dialog, null, false, false, style, null);

	Hints.bindEvent = Blockly.addChangeListener(function() {
		BlocklyApps.hideDialog(false);
		Blockly.removeChangeListener(Hints.bindEvent);
		Hints.bindEvent = null;
	});

	
};

Hints.Categories["GoalButton"] = function (param) {
	
	if (!Hints.hintSelected.consist) {
		
		return createDownDlg("goalButton", (!param || param == null?"GoalButton":param) );
		
	}
	
	return null;
};

Hints.addDefaultErrorHints = function() {
	
	var hint = {};
	hint.args = "GoalButtonError";
	hint.time = 0;
	hint.consist = false;
	hint.whenError = true;
	hint.condition = "Game.howManyRuns > 2";
	hint.category = "GoalButton";
	
	Hints.hints.whenError.unshift(hint);
	
};