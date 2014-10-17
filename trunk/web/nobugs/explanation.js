var Explanation = {};

Explanation.selectCommands = function(commands) {
	
	var ret = {}; // = {"snackMan": true, "loop": true, "logic": true, "math": true, "vars": true, "function": true, "const": true };
	var group = commands.firstElementChild;
	while (group != null) {
		
		var show = group.getAttribute("show");
		if (show != null) {
			ret[group.getAttribute("name")] = show === "true";
		}
		group = group.nextElementSibling;
	}
	return ret;
};

Explanation.showInfo = function(explanation, withHint) {
	
	var statement = 0;
	Explanation.firstStatement = -1;
	
	var expla = explanation.firstElementChild;
	var i = 0;
	while (expla != null) {
		
		var type = expla.getAttribute("type");
		if (type === "statement") {
			if (statement == 0)
				Explanation.firstStatement = i;
			statement++;
			
			Explanation.lastStatement = i;
		}
		expla = expla.nextElementSibling; i++;
	}
	
	if (Explanation.firstStatement == -1) // this will happen if is something wrong in the mission's statement
		return;
	
	Explanation.pageNumber = 0;
	Explanation.explanation = explanation;

	if (withHint)
		Explanation.createDialog(Explanation.firstStatement);
	else
		Explanation.createDialog(Explanation.lastStatement);
		
	Explanation.showHint = withHint;
	Explanation.hintNumber = -1;
};

Explanation.nextStatement = function() {
	
	BlocklyApps.hideDialog(false);
	
	var explanation = Explanation.explanation;
	var children = explanation.getElementsByTagName("page");
	
	var i = Explanation.pageNumber + 1; Explanation.pageNumber = -1;
	for (; i <= Explanation.lastStatement; i++) {
		var type = children[i].getAttribute("type");
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
	var children = explanation.getElementsByTagName("page");
	
	var i = Explanation.pageNumber - 1; Explanation.pageNumber = -1;
	for (; i >= 0; i--) {
		var type = children[i].getAttribute("type");
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
	var children = Explanation.explanation.getElementsByTagName("page");

	container.innerHTML = children[nrPage].innerHTML || children[nrPage].textContent;
	
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
							 true, true, true, Game.missionTitle, style, null);
	
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
		
		obj.innerHTML = Objective.factory(text).createExplanationItem(os[i]);
		
		ul.appendChild(obj);
	}
	
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var div = document.createElement("td");
	
	div.style['border'] = "1px solid #FF0";
	div.style['padding'] = "3px";
	div.style.backgroundColor = "#F3F3CA";
	
	tr.appendChild(div);
	table.appendChild(tr);
	container.appendChild(table);
	
	var msg = BlocklyApps.getMsg("rewardExplanation");
	var coin2 = "<img style='vertical-align: middle;' src='images/coin2.png'/>";
	var out = msg.format(hero.objective.reward + coin2)+ "<br/>";
	
	if (hero.objective.maxCommandsReward > 0) {

		msg = BlocklyApps.getMsg("commandBonusExplanation");
		out = out + msg.format(hero.objective.maxCommandsReward+coin2, hero.objective.maxCommands);
		
	}
	div.innerHTML = out;
	
	
};

Explanation.finishStatement = function() {
	BlocklyApps.hideDialog(false);
	
	Hints.init(Game.mission.getElementsByTagName("hints")[0]);

	Game.currTime = new Date().getTime();
	Game.initCronometro();
	
	/*
	
	if (!Explanation.showHint)
		return;

	var explanation = Explanation.explanation;

	
	var origin = null;
	var lastHint = Explanation.hintNumber + 1;
	
	var dialog = document.getElementById('dialogHint');
	
	Blockly.mainWorkspace.traceOn(false);
	
	var style = {top: '120px'}; 
	style[Blockly.RTL ? 'right' : 'left'] = '215px';
	
	Explanation.hintNumber = -1;
	var originH = 0;
	var originW = 0;
	var bY = 0;
	var bX = 0;

	var children = explanation.getElementsByTagName("page");


	for (var i=lastHint; i<children.length; i++) {
		var type = children[i].getAttribute("type");
		if (type === "hint") {
			var idhint = children[i].getAttribute("id");
			var originhint = children[i].getAttribute("origin");
			Explanation.hintNumber = i;
			
			if (originhint === "code") {
				var e = Blockly.mainWorkspace.getBlockById(parseInt(idhint));
				if (e == null) {
					e = Blockly.mainWorkspace.topBlocks_[parseInt(idhint)-1];
					idhint = e.id;
				}
				
				origin = e.getSvgRoot();
				originH = e.svg_.height; originW = e.svg_.width;
				
				Blockly.mainWorkspace.traceOn(true);
				Blockly.mainWorkspace.highlightBlock(idhint);
			} else {
				if (originhint === "command") {
					
					var separator = idhint.indexOf("#");
					var children_ = Blockly.Toolbox.tree_.children_;
					var node;
					if (separator == -1) {
						
						node = parseInt(idhint);
						Blockly.Toolbox.tree_.setSelectedItem(children_[node]);
						
						var e = children_[node].element_;
						bY = e.offsetTop + e.offsetParent.offsetTop + e.offsetParent.offsetParent.offsetTop;
						bX = e.offsetLeft + e.offsetParent.offsetLeft + e.offsetParent.offsetParent.offsetLeft;
						originH = e.clientHeight; originW = e.clientWidth;
						
					} else {
						
						node = parseInt(idhint.substring(0, separator));
						Blockly.Toolbox.tree_.setSelectedItem(children_[node]); // must be here because the last line in this block depends of this

						var nodeItem = parseInt(idhint.substring(idhint.indexOf("#")+1));
						origin = Blockly.Toolbox.flyout_.workspace_.getTopBlocks(true)[nodeItem].getSvgRoot();
					}
				} else {
					if (originhint === "button") {
						origin = document.getElementById(idhint);
						originH = origin.offsetHeight; originW = origin.offsetWidth;
					}
				}
			}

			break;
		}
	}
	
	Game.currTime = new Date().getTime();
	Game.initCronometro();
	if (Explanation.hintNumber == -1)
		return;
		
	var buttons = document.getElementById('dialogHintButton');
	buttons.innerHTML = nobugspage.finishButton(null, null, null);
	
	var container = document.getElementById('dialogHintText');
	container.innerHTML = children[Explanation.hintNumber].innerHTML || children[Explanation.hintNumber].textContent; 
	
	var dir = children[Explanation.hintNumber].getAttribute("dir");
	var imgId = 'imgHint';
	if (dir === "stack") {
		imgId += "After";
		document.getElementById('beforetd').style.display = "none";
		document.getElementById('aftertd').style.display = "inline";
	} else {
		imgId += "Before";
		document.getElementById('aftertd').style.display = "none";
		document.getElementById('beforetd').style.display = "inline";
	}
	
	var imgHint = document.getElementById(imgId);
	imgHint.src = "images/help_" + dir + ".png";

	if (origin != null) {
		
		var bbBox = BlocklyApps.getBBox_(origin);
		bY = bbBox.y;
		bX = bbBox.x;
	}

	var dialogClientHeight = dialog.clientHeight + 25 + 15 + 10 + 2; // 25 - header; 15 - header's margin; 10 - dialog's padding
	var dialogClientWidth = dialog.clientWidth + 20 + 2;

	switch (dir) {
		  case "up" :
			style.top = (bY + originH);
			style.left = bX;
			break;
		
		  case "down":
			style.top = (bY - dialogClientHeight);
			style.left = bX;
			break;
			
		  case "run":
			style.top = (bY - (dialogClientHeight/2));
			style.left = (bX + originW);
			break;
			
		  case "stack":
			style.top = (bY - (dialogClientHeight/2));
			style.left = (bX - dialogClientWidth - 20);
			break;
	}
	
	if (style.left < 0) {
		style.width = (dialogClientWidth + style.left) + "px"; // because left is minus then you can add this value
		style.left = 0;
	}
	style.top = style.top + "px";
	style.left = style.left + "px";
	
	BlocklyApps.showDialog(dialog, null, false, false, style, 
			function(){
				Game.currTime = new Date().getTime();
			});
			*/
};

Explanation.parseUserLogged = function(explanations) {
	var children = explanations.getElementsByTagName("page");

	for (var j=0; j< children.length; j++) {
		
		var e = innerXML ( children[j] ); 
		
		do {
			var i = e.indexOf("$${") ;
			if (i == -1)
				break;

			var e1 = e.substring(i+3);
			var e2 = e1.substring(0, e1.indexOf("}"));
			var e3 = eval(e2);
			
			e = e.substring(0, i) + e3 + e.substring(e.indexOf("}")+1);
			
		} while (true) ;
		
		if (children[j].innerHTML)
			children[j].innerHTML = e;
		else
			children[j].textContent = e;
	}
	return explanations;
};

