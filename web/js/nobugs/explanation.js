'use strict';
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

Explanation.showInfo = function(explanation, withHint, afterclosed) {
	
	explanation = Explanation.parseUserLogged(explanation);
	
	Explanation.firstStatement = 0;
	Explanation.lastStatement = explanation.childElementCount - 1;

	Explanation.explanation = explanation;

	if (withHint) {
		Explanation.pageNumber = Explanation.firstStatement;
		Explanation.createDialog(Explanation.firstStatement, afterclosed);
	}
	else {
		Explanation.pageNumber = Explanation.lastStatement;
		Explanation.createDialog(Explanation.lastStatement, afterclosed);
	}
		
	Explanation.showHint = withHint;
	Explanation.hintNumber = -1;
};

Explanation.nextStatement = function() {
	
	BlocklyApps.hideDialog(false);
	
	Explanation.pageNumber = Explanation.pageNumber + 1; 
	
	Explanation.createDialog(Explanation.pageNumber);
	
};

Explanation.previousStatement = function() {
	
	BlocklyApps.hideDialog(false);
	
	Explanation.pageNumber = Explanation.pageNumber - 1;
	
	Explanation.createDialog(Explanation.pageNumber);

};

Explanation.createDialog = function(nrPage, afterclosed) {
    var content = document.getElementById('dialogInfo');
	var container = document.getElementById('dialogInfoText');
	var children = Explanation.explanation.getElementsByTagName("page");

	var containerText = children[nrPage].innerHTML || children[nrPage].textContent;
	
	container.innerHTML = changeImgHex(containerText); // utils

	var buttons = document.getElementById('dialogInfoButton');
	
	var justOnePage = Explanation.firstStatement == Explanation.lastStatement;
	
	buttons.innerHTML = 
		(justOnePage?nobugspage.finishButton(null, null, null):
			(nrPage == Explanation.firstStatement?nobugspage.nextButton(null, null, null)
					:nobugspage.previousButton(null, null, null) + (nrPage == Explanation.lastStatement?nobugspage.finishButton(null, null, null):nobugspage.nextButton(null, null, null))));
		 
	
	Explanation.evaluateObjectives(nrPage, container);
	
	var style = [];

	MyBlocklyApps.showDialog(content, null,
							 false, true, true, Game.missionTitle, style, afterclosed);
	
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
	
	if (Game.bonusTime != null) {
		
		msg = BlocklyApps.getMsg("timeBonusExplanation");
		var a = Game.bonusTimeReward.split(" ");
		out = out + msg.format(a[a.length-1]+coin2, Game.bonusTime/60);
		
	}
	div.innerHTML = out;
	
	
};

Explanation.finishStatement = function() {
	BlocklyApps.hideDialog(false);

	if (!Explanation.showHint) {
		Hints.startHints();
		return;
	}

	
	Hints.init(Game.mission.getElementsByTagName("hints")[0]);

	Game.initTime();
};

Explanation.parseUserLogged = function(explanations) {
	// if it was transformed before, dont need transform again
	if (explanations.getAttribute("done")) {
		return explanations;
	}
	
	var children = explanations.getElementsByTagName("page");

	var userLogged = Game.loginData.userLogged; // dont delete this line because is used in eval(e2) line
	
	for (var j=0; j< children.length; j++) {
		
		var e = children[j].textContent; 
		
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
	
	explanations.setAttribute("done" , "true");
	return explanations;
};

