var Hints = {};
Hints.Categories = [];
Hints.chooseCategoryCalled = false;
Hints.bindEvent1 = null;
Hints.bindEvent2 = null;

Hints.init = function(hints) {
	
	Hints.hints = {sequence:[], whenError:[]};
	if (hints == null)
		return;
	
	var hs = hints.getElementsByTagName("sequence");
	if (hs != null)
		Hints.hints.sequence = Hints.traverseHints(hs[0].firstElementChild, false);
	
	hs = hints.getElementsByTagName("errors");
	if (hs != null)
		Hints.hints.whenError = Hints.traverseHints(hs[0].firstElementChild, true);

    if (Hints.hints.sequence.length > 0) {
    	
    	window.setTimeout(Hints.timeIsUp, Hints.hints.sequence[0].time);
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
	
	if (Game.enabledDebug) {
		
		hint = new Object();
		hint.content =  document.getElementById("Hints_DebugButtonError").innerHTML;
		hint.time = 0;
		hint.condition = "";
		hint.category = "DebugButton";
		Hints.hints.whenError.push(hint);
	}
	
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
	while (hint) {

	  var h = {};
	  h.type = hint.tagName;
			  
	  h.category = hint.getAttribute("category");
	  
	  Hints.formatCategory(h);
	  
	  h.content = hint.innerHTML || hint.textContent;
	  if (h.content.length == 0)
		  h.content = null;
	  
	  h.time = hint.getAttribute("time");
	  if (h.time == null )
		  h.time = "0";
	  
	  h.time = parseInt(h.time);
	  
	  h.condition = (hint.getAttribute("condition"));
	  if (h.condition == null)
		  h.condition = Hints.Categories[h.category].condition;
	  
	  hint = hint.nextElementSibling;
	  
	  ret.push(h);
	}
  
	return ret;
  
  
};

Hints.showErrorHint = function() {
	
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var countInstructions = Game.countInstructions(xml.childNodes);
	
	Hints.hintSelected = null;
	var hintErrors = Hints.hints.whenError;
	for (var i=0; i<hintErrors.length; i++) {
	
		var hint = hintErrors[i];
		
		var condition = eval(hint.condition);
		if (condition) {
			
			Hints.hintSelected = hint;
			Hints.Categories[hint.category].show(hint.args);
			
			Hints.associateHideEvents();
			break;
			
		}
		
	}
	
};

Hints.timeIsUp = function() {

	var hints = Hints.hints.sequence;
	if (hints.length == 0)
		return;
	
	if (Blockly.Block.dragMode_ != 0) {
		window.setTimeout( Hints.timeIsUp, 1000 );
	}
	
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var countInstructions = Game.countInstructions(xml.childNodes);

	Hints.hintSelected = null;
	for (var i=0; i<hints.length; i++) {
		var hint = hints[i];
		
		var condition = eval(hint.condition);
		if (condition) {
			
			Hints.hintSelected = hint;
			Hints.Categories[hint.category].show(hint.args);
			Hints.associateHideEvents();
			
			return;
			
		}
	}
	
	window.setTimeout( Hints.timeIsUp, 1000 );

};

Hints.associateHideEvents = function() {
	
	function hideHint() {
		Hints.hideHints();
		
		window.setTimeout( Hints.timeIsUp, (Hints.hintSelected==null?1000:Hints.hintSelected.time) );
	};

	Hints.bindEvent1 = Blockly.addChangeListener(hideHint);

	Hints.bindEvent2 = Blockly.bindEvent_(Blockly.Toolbox.HtmlDiv, 'mousedown', null, hideHint);

};


Hints.hideHints = function() {
	
	MyBlocklyApps.hideDialog(false);
	
	if (Hints.bindEvent1 != null) {
		Blockly.removeChangeListener(Hints.bindEvent1);
		Hints.bindEvent1 = null;
	}
	
	if (Hints.bindEvent2 != null) {
		Blockly.unbindEvent_(Hints.bindEvent2);
		Hints.bindEvent2 = null;
	}
};

Hints.startHints = function() {
	window.setTimeout( Hints.timeIsUp, 1000 );
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
	
	return [createStyle(e.getSvgRoot(), e.svg_.height, dialog), e.svg_.getRootElement()];

}

function createDownDlg(itemId, txt) {
	
	var origin = document.getElementById(itemId);
	
	var dialog = document.getElementById("DownHint");
	
	var text = document.getElementById("DownHintText");
	text.innerHTML = txt;

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

/****************************************************************************************/
/**                              Categories                                             */
/****************************************************************************************/


Hints.Categories["ChooseCategory"] = {

	show: 	
		function (param) {
	
			var e = Blockly.Toolbox.tree_.children_[parseInt(param[0])].element_;
			var menuText = e.firstChild.childNodes[2].textContent;

			var dialogContent = null;
			if (Hints.hintSelected.content != null)
				dialogContent = Hints.hintSelected.content;
			else {
				
				dialogContent = BlocklyApps.getMsg("Hints_ChooseCategory");
				dialogContent = dialogContent.format(menuText);
			}

			createLeftDlg(e, dialogContent);
			
			Hints.chooseCategoryCalled = true;
				
		},
	
	condition:
		"countInstructions == 0 && Hints.chooseCategoryCalled == false"

		
};

Hints.Categories["SelectCommand"] = {

	show:
		function (param) {
	
			var dialog = document.getElementById("SelectCommand");
			var res = createStylePosition(parseInt(param[0]), parseInt(param[1]), dialog);
			
			BlocklyApps.showDialog(dialog, null, false, false, res[0], null);
			Hints.chooseCategoryCalled = true;
			            
		},
		
	condition:
		"countInstructions == 0 && Hints.chooseCategoryCalled == true"
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

			var content;
			if (Hints.hintSelected.content == null)
				content = document.getElementById("Hints_RunProgram").innerHTML;
			else
				content = Hints.hintSelected.content;
		
			return createDownDlg("runButton", content);
			
		}, 
	
	condition:
		"Game.howManyRuns == 0"
	
	
};
	
Hints.Categories["DebugProgram"] = {
	show:
		function (param) {
	
			var content;
			if (Hints.hintSelected.content == null)
				content = document.getElementById("Hints_DebugProgram").innerHTML;
			else
				content = Hints.hintSelected.content;
			
			return createDownDlg("debugButton", content);
			
		}, 
	
	condition:
		"Game.howManyRuns == 0"
	
};
	
Hints.Categories["GoalButton"] = {
	show:
		function (param) {
	
			var content;
			if (Hints.hintSelected.content == null)
				content = document.getElementById("Hints_GoalButton").innerHTML;
			else
				content = Hints.hintSelected.content;
		
			return createDownDlg("goalButton", content );
		
		},
	condition:
		"Game.howManyRuns > 2"
};

Hints.Categories["SourceCode"] = {
		
	show:
		function (param) {
			var dialog = document.getElementById("RightHint");
			
			var hintText = document.getElementById("RightHintText");
			hintText.innerHTML = Hints.hintSelected.content;
			
			var bbBox = BlocklyApps.getBBox_(Blockly.mainWorkspace.topBlocks_[0].getSvgRoot());
			var style = {};
			style.width = "300px" ;
			style.top = bbBox.y + "px";
			style.left = (bbBox.x - 320) + "px";
			
			BlocklyApps.showDialog(dialog, null, false, false, style, null);
		},
	condition : "true"
};

