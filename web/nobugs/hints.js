var Hints = {};
Hints.Categories = [];


Hints.init = function(hints) {
	
	Hints.hints = {};
	if (hints == null)
		return;
	
    Hints.hints.sequence = Hints.traverseHints(hints.firstElementChild);
    Hints.now = [];
    if (Hints.hints.sequence[0].type == "sequence") {
    	
        Hints.now[0] = 0;
        Hints.now[1] = 0;
        
    	window.setTimeout(Hints.timeIsUp, Hints.hints.sequence[0].sequence[0].time);
    }
	
};

Hints.traverseHints = function(hint) {
    
	var ret = [];
	while (hint) {

	  var h = {};
	  h.type = hint.tagName;
	  if (hint.tagName == "sequence") {
		  h.sequence = Hints.traverseHints(hint.firstElementChild);
	  } else {
		  if (hint.tagName == "hint") {
			  
			  h.content = hint.textContent;
			  
			  if (h.content.indexOf("(") > 0) {
				  
				  h.args = h.content.substring(h.content.indexOf("("));
				  h.args = h.args.substring(1, h.args.length-1);
				  h.args = h.args.split(",");
				  
				  h.content = h.content.substring(0, h.content.indexOf("("));
				  
			  }
			  
			  h.time = hint.getAttribute("time");
			  if (h.time == null )
				  h.time = "5000";
			  
			  h.time = parseInt(h.time);
			  h.event = hint.getAttribute("event");
		  }
	  }
	  
	  ret.push(h);
	  hint = hint.nextElementSibling;
	}
  
	return ret;
  
  
};

Hints.timeIsUp = function() {
	
	var hint = Hints.hints;
	var ant = [];
	for (var i=0; i < Hints.now.length; i++) {
		ant = [hint, Hints.now[i], i];
		hint = hint.sequence[Hints.now[i]];
	}
	
	var f = Hints.Categories[hint.content];
	var e = f(hint.args);
	
	if (hint.time == 0) {
		
		if (ant[1] < ant[0].sequence.length)
			Hints.now[ant[2]]++;
		
		Hints.ToUnbind = Blockly.bindEvent_(e, 'mousedown', this, Hints.onMouseDown);	
	}
	
};

Hints.onMouseDown = function(evt) { 
	
	Blockly.unbindEvent_(Hints.ToUnbind);
	BlocklyApps.hideDialog(false); 
	window.setTimeout(Hints.timeIsUp, 0);
};




function calcTop (e) {
	return e.offsetTop + e.offsetParent.offsetTop + e.offsetParent.offsetParent.offsetTop;
}

function calcLeft(e) {
	return e.offsetLeft + e.offsetParent.offsetLeft + e.offsetParent.offsetParent.offsetLeft;
}

Hints.Categories["ChooseCategory"] = function (param) {
	
	var e = Blockly.Toolbox.tree_.children_[parseInt(param[0])].element_;
	var menuText = e.firstChild.childNodes[2].textContent;
	
	var dialogContent = BlocklyApps.getMsg("Hints_ChooseCategory");
	dialogContent = dialogContent.format(menuText);
	document.getElementById("ChooseCategoryText").innerHTML = dialogContent;
	
	var bY = calcTop(e);
	var bX = calcLeft(e);
	var originW = e.clientWidth;
	
	var style = {};
	style.top = bY + "px";
	style.left = (bX + originW) + "px";

	var dialog = document.getElementById("ChooseCategory");
	
	BlocklyApps.showDialog(dialog, null, false, false, style, null);
	
	return e;
	
};

Hints.Categories["SelectCommand"] = function (param) {
	
	var e = Blockly.Toolbox.tree_.children_[parseInt(param[0])].element_;
	//Blockly.Toolbox.tree_.setSelectedItem(e);
	e = Blockly.Toolbox.flyout_.workspace_.getTopBlocks(true)[parseInt(param[1])];
	
	var bbBox = BlocklyApps.getBBox_(e.getSvgRoot());
	var bY = bbBox.y;
	var bX = bbBox.x;
	var originH = e.svg_.height;
	
	var dialog = document.getElementById("SelectCommand");
	
	var style = {};
	style.top = (bY  + originH) + "px";
	style.left = (bX - (dialog.clientWidth/2)) + "px";

	BlocklyApps.showDialog(dialog, null, false, false, style, null);
            
	return e.svg_.getRootElement();
};