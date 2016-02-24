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

Explanation.showInfo = function(explanation, withHint, afterclosed, instruction, style) {
	
	explanation = Explanation.parseUserLogged(explanation); // deal with all pages transformation to HTML

	Explanation.style = (style === undefined?{width:"800px"}:style);
	instruction = (instruction === undefined?false:instruction);
	
	Explanation.instruction = instruction;
	
	var showType = (instruction?"instruction":"goal");
	
	Explanation.isDialog = (instruction?false:explanation.getAttribute("dialog"));
	var msgs = [];
	
	var children = explanation.getElementsByTagName("page");
	Explanation.children = [];
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		var type = child.getAttribute("type");
		if (Explanation.isDialog) 
			msgs.push(changeImgHex(child.innerHTML));
		else
			if (type === showType)
				Explanation.children.push(child);
		
	}
	
	Explanation.showHint = withHint;
	Explanation.hintNumber = -1;

	if (Explanation.isDialog) {
		MyBlocklyApps.lockWindow();
		CharacterDialog.creates($("#" + Game.editor.id).position().left, 
				$( document ).height() - 250 /* 250 is a close value $("#talkDlg").height()*/, Explanation.finishTalk, msgs) ;
		return;
	}
	
	Explanation.firstStatement = 0;
	Explanation.lastStatement = Explanation.children.length - 1;

	Explanation.explanation = explanation;

	if (withHint || instruction) {
		Explanation.pageNumber = Explanation.firstStatement;
		Explanation.createDialog(Explanation.firstStatement, afterclosed);
	}
	else {
		Explanation.pageNumber = Explanation.lastStatement;
		Explanation.createDialog(Explanation.lastStatement, afterclosed);
	}
		
};

Explanation.nextStatement = function() {
	
	MyBlocklyApps.hideDialog(false);
	
	Explanation.pageNumber = Explanation.pageNumber + 1; 
	
	Explanation.createDialog(Explanation.pageNumber);
	
};

Explanation.previousStatement = function() {
	
	MyBlocklyApps.hideDialog(false);
	
	Explanation.pageNumber = Explanation.pageNumber - 1;
	
	Explanation.createDialog(Explanation.pageNumber);

};

Explanation.createDialog = function(nrPage, afterclosed) {
	
    var content = document.getElementById('dialogInfo');
	var container = document.getElementById('dialogInfoText');
	var children = Explanation.children;//Explanation.explanation.getElementsByTagName("page");

	var containerText = children[nrPage].innerHTML || children[nrPage].textContent;
	
	container.innerHTML = changeImgHex(containerText); // utils

	var buttons = document.getElementById('dialogInfoButton');
	
	var justOnePage = Explanation.firstStatement == Explanation.lastStatement;
	
	buttons.innerHTML = 
		(justOnePage?nobugspage.finishButton(null, null, null):
			(nrPage == Explanation.firstStatement?nobugspage.nextButton(null, null, null)
					:nobugspage.previousButton(null, null, null) + (nrPage == Explanation.lastStatement?nobugspage.finishButton(null, null, null):nobugspage.nextButton(null, null, null))));
		 
	if (!Explanation.instruction)
		Explanation.evaluateObjectives(nrPage, container);
	
	MyBlocklyApps.showDialog(content, null,
							 false, true, true, Game.missionTitle, Explanation.style, afterclosed);
	
};

Explanation.createGoal = function(goal) {
	
	var obj = document.createElement("li");
	var text = goal.objective;
	obj.className = "goal" + (goal.achieved?"ok":"cancel");

	obj.innerHTML = Objective.factory(text).createExplanationItem(goal);
	if (goal.notExists === "true") {
		obj.innerHTML = "<span style='color:red'>"+BlocklyApps.getMsg("explanation_mustNot")+": </span>" +
								obj.innerHTML;	
	}
	
	return obj;
};



Explanation.evaluateObjectives = function(statement, container) {
	
	if (statement != Explanation.lastStatement)
		return
		
	Explanation.createGoals(container);

	if (Game.pointsInThisMission) {
		var table = document.createElement("table");
		var tr = document.createElement("tr");
		var div = document.createElement("td");
		
		div.style['border'] = "1px solid #FF0";
		div.style['padding'] = "3px";
		div.style.backgroundColor = "#F3F3CA";
		
		tr.appendChild(div);
		table.appendChild(tr);
		container.appendChild(table);

		var msg;
		var finalValue = 0;
		var individualValue;
		
		if (Game.noXP) {
			msg = BlocklyApps.getMsg("rewardSimpleExplanation");
			individualValue = hero.objective.xpFinal;
		} else {
			individualValue = hero.objective.xpIndividual;
			if (hero.objective.xpTotalRun == null) {
				msg = BlocklyApps.getMsg("rewardExplanation");
				finalValue = hero.objective.xpTotalTime/60;
			}
			else {
				msg = BlocklyApps.getMsg("rewardExplanationByRun");
				finalValue = hero.objective.xpTotalRun;
			}
		}
		
		var coin2 = "<img style='vertical-align: middle; padding-left: 3px' src='images/xp.png'/>";
		var coin3 = "<img style='vertical-align: middle; padding-left: 3px;' src='images/coin2.png'/>";
		var out = msg.format(individualValue + coin2, coin2, hero.objective.xpFinal + coin2, finalValue)+ "<br/>";
		
		if (hero.objective.maxCommandsReward > 0) {

			msg = BlocklyApps.getMsg("commandBonusExplanation");
			out = out + msg.format(hero.objective.maxCommandsReward+coin2, hero.objective.maxCommands);
			
		} else 
			if (hero.objective.maxCommandsRewardCoins > 0) {
			
				msg = BlocklyApps.getMsg("commandBonusExplanation");
				out = out + msg.format(hero.objective.maxCommandsRewardCoins+coin3, hero.objective.maxCommands);
			}
		
		if (Game.bonusTime != null) {
			
			msg = BlocklyApps.getMsg("timeBonusExplanation");
			var a = Game.bonusTimeReward.split(" ");
			out = out + msg.format(a[a.length-1]+coin3, Game.bonusTime/60);
			
		}
		div.innerHTML = out;
	}
};

Explanation.createGoals = function(container) {
	
	var ul = document.createElement("ul");
	container.appendChild(ul);
	var os = hero.objective.objectives;
	for (var i=0; i<os.length; i++) {
		
		var obj = Explanation.createGoal(os[i]);
		ul.appendChild(obj);
		
	}
}


Explanation.finishStatement = function() {
	MyBlocklyApps.hideDialog(false);

	if (!Explanation.showHint) {
		Hints.startHints();
		return;
	}

	Game.verificationsBeforePlaying(true);
	
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

Explanation.finishTalk = function() {
	MyBlocklyApps.unlockWindow();
	Explanation.finishStatement();
};