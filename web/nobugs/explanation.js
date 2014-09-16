var Explanation = {};

Explanation.selectCommands = function(commands) {
	
	var ret = {"loop": true, "logic": true, "math": true, "vars": true, "function": true };
	var comms = commands.children;
	for (var i=0; i < comms.length; i++) {
		var group = comms[i];
		var show = group.getAttribute("show");
		if (show != null) {
			ret[group.getAttribute("name")] = show === "true";
		}
	}
		
	return ret;
};

Explanation.showInfo = function(explanation, withHint) {
	
	var statement = 0;
	Explanation.firstStatement = -1;
	for (var i = 0; i < explanation.children.length; i++) {
		var type = explanation.children[i].getAttribute("type");
		if (type === "statement") {
			if (statement == 0)
				Explanation.firstStatement = i;
			statement++;
			
			Explanation.lastStatement = i;
		}
	}

	if (Explanation.firstStatement == -1) // this will happen if is something wrong in the mission's statement
		return;
	
	Explanation.pageNumber = 0;
	Explanation.explanation = explanation;

	Explanation.createDialog(Explanation.firstStatement);
	
	Explanation.showHint = withHint;
	Explanation.hintNumber = -1;
};

Explanation.nextStatement = function() {
	
	BlocklyApps.hideDialog(false);
	var explanation = Explanation.explanation;
	var i = Explanation.pageNumber + 1; Explanation.pageNumber = -1;
	for (; i <= Explanation.lastStatement; i++) {
		var type = explanation.children[i].getAttribute("type");
		if (type === "statement") {
			if (Explanation.pageNumber == -1)
				Explanation.pageNumber = i;
		}
	}
	Explanation.createDialog(Explanation.pageNumber);
	
};

Explanation.previousStatement = function() {
	
	BlocklyApps.hideDialog(false);
	
	var explanation = Explanation.explanation;
	var i = Explanation.pageNumber - 1; Explanation.pageNumber = -1;
	for (; i >= 0; i--) {
		var type = explanation.children[i].getAttribute("type");
		if (type === "statement") {
			if (Explanation.pageNumber == -1)
				Explanation.pageNumber = i;
		}
	}
	Explanation.createDialog(Explanation.pageNumber);

};

Explanation.createDialog = function(nrPage) {
    var content = document.getElementById('dialogInfo');
	var container = document.getElementById('dialogInfoText');
	container.innerHTML = Explanation.explanation.children[nrPage].innerHTML;  // .childNodes[0].nodeValue;
	
	var buttons = document.getElementById('dialogInfoButton');
	
	var justOnePage = Explanation.firstStatement == Explanation.lastStatement;
	
	buttons.innerHTML = 
		(justOnePage?nobugspage.finishButton(null, null, null):
			(nrPage == Explanation.firstStatement?nobugspage.nextButton(null, null, null)
					:nobugspage.previousButton(null, null, null) + (nrPage == Explanation.lastStatement?nobugspage.finishButton(null, null, null):nobugspage.nextButton(null, null, null))));
		 
	
	Explanation.evaluateObjectives(nrPage, container);
	
	var style = {top: '120px'}; 
	style[Blockly.RTL ? 'right' : 'left'] = '215px';

	MyBlocklyApps.showDialog(content, (nrPage==0?document.getElementById('goalButton'):null),
							 true, true, true, null, style, null);
	
};

Explanation.evaluateObjectives = function(statement, container) {
	
	if (statement != Explanation.lastStatement)
		return
		
	var ul = document.createElement("ul");
	container.appendChild(ul);
	var os = hero.objective.objectives;
	for (var i=0; i<os.length; i++) {
		
		var obj = document.createElement("li");
		var text = os[i].objective;
		obj.className = "goal" + (os[i].achieved?"ok":"cancel");
		
		var key = "";
		
		if (text.indexOf("askFor") == 0) {
			key = BlocklyApps.getMsg("_"+os[i].place);
		}
		text = BlocklyApps.getMsg(text);
		var parts = text.split(/%\d/);
		text = parts[0] + key  + " " + os[i].pos + parts[1];
		
		obj.innerHTML = text;
		
		ul.appendChild(obj);
	}
	
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var div = document.createElement("td");
	
	div.style = "border: 1px solid #FF0; padding: 3px; background-color: #F3F3CA";
	
	tr.appendChild(div);
	table.appendChild(tr);
	container.appendChild(table);
	
	var msg = BlocklyApps.getMsg("rewardExplanation");
	parts = msg.split(/%\d/);
	div.innerHTML = parts[0] + hero.objective.reward + "<img style='vertical-align: middle;' src='images/coin2.png'/>" + parts[1] + "<br/>"  + hero.objective.maxCommandsReward+ 
	                "<img style='vertical-align: middle;' src='images/coin2.png'/>" + parts[2] + hero.objective.maxCommands + parts[3];
	
};

Explanation.finishStatement = function() {
	BlocklyApps.hideDialog(false);
	
	if (!Explanation.showHint)
		return;
	
	var origin = null;
	var lastHint = Explanation.hintNumber + 1;
	
	var dialog = document.getElementById('dialogHint');
	
	Blockly.mainWorkspace.traceOn(false);
	
	var style = {top: '120px'}; 
	style[Blockly.RTL ? 'right' : 'left'] = '215px';
	
	Explanation.hintNumber = -1;
	var originH = 0;
	var originW = 0;
	var explanation = Explanation.explanation;
	var bY = 0;
	var bX = 0;

	for (var i=lastHint; i<explanation.children.length; i++) {
		var type = explanation.children[i].getAttribute("type");
		if (type === "hint") {
			var idhint = explanation.children[i].getAttribute("id");
			var originhint = explanation.children[i].getAttribute("origin");
			Explanation.hintNumber = i;
			
			if (originhint === "code") {
				var e = Blockly.mainWorkspace.getBlockById(parseInt(idhint));
				
				origin = e.getSvgRoot();
				originH = e.svg_.height; originW = e.svg_.width;
				
				Blockly.mainWorkspace.traceOn(true);
				Blockly.mainWorkspace.highlightBlock(idhint);
			} else {
				if (originhint === "command") {
					
					var separator = idhint.indexOf("#");
					var children = Blockly.Toolbox.tree_.children_;
					var node;
					if (separator == -1) {
						
						node = parseInt(idhint);
						Blockly.Toolbox.tree_.setSelectedItem(children[node]);
						
						var e = children[node].element_;
						bY = e.offsetTop + e.offsetParent.offsetTop + e.offsetParent.offsetParent.offsetTop;
						bX = e.offsetLeft + e.offsetParent.offsetLeft + e.offsetParent.offsetParent.offsetLeft;
						originH = e.clientHeight; originW = e.clientWidth;
						
					} else {
						
						node = parseInt(idhint.substring(0, separator));
						Blockly.Toolbox.tree_.setSelectedItem(children[node]); // must be here because the last line in this block depends of this

						var nodeItem = parseInt(idhint.substring(idhint.indexOf("#")+1));
						origin = Blockly.Toolbox.flyout_.workspace_.getTopBlocks(true)[nodeItem].getSvgRoot();
					}
				}
			}

			break;
		}
	}
	
	if (Explanation.hintNumber == -1)
		return;
		
	var buttons = document.getElementById('dialogHintButton');
	buttons.innerHTML = nobugspage.finishButton(null, null, null);
	
	var container = document.getElementById('dialogHintText');
	container.innerHTML = explanation.children[Explanation.hintNumber].innerHTML;
	
	var dir = explanation.children[i].getAttribute("dir");
	var imgId = 'imgHint';
	if (dir === "stack") {
		imgId += "After";
		document.getElementById('beforetd').style.display = "none";
		document.getElementById('aftertd').style.display = "inline";
	} else {
		imgId += "Before";
		document.getElementById('beforetd').style.display = "inline";
		document.getElementById('aftertd').style.display = "none";
	}
	
	var imgHint = document.getElementById(imgId);
	imgHint.src = "images/help_" + dir + ".png";

	if (origin != null) {
		
		var bbBox = BlocklyApps.getBBox_(origin);
		bY = bbBox.y;
		bX = bbBox.x;
	}
	
	switch (dir) {
		  case "up" :
			style.top = (bY + originH);
			style.left = bX;
			break;
		
		  case "down":
			style.top = (bY - (dialog.clientHeight + originH));
			style.left = bX;
			break;
			
		  case "run":
			style.top = (bY - (dialog.clientHeight/2));
			style.left = (bX + originW);
			break;
			
		  case "stack":
			style.top = (bY - (dialog.clientHeight/2));
			style.left = (bX - dialog.clientWidth - 20);
			break;
	}
	
	if (style.left < 0) {
		style.width = (dialog.clientWidth + style.left) + "px"; // because left is minus then you can add this value
		style.left = 0;
	}
	style.top = style.top + "px";
	style.left = style.left + "px";
	
	BlocklyApps.showDialog(dialog, null, false, true, style, null);
};

