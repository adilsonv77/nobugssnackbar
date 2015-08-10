'use strict';

var Tests = {};
var TestRT = {}; // used in specific question language

Tests.createForm = function (test) {
	
	Tests.test = test;
	Tests.idx = -1;
	Tests.dropShowed = false;
	
	Tests.dropExpand = null;
	
	var div = document.createElement("div");
	div.id = "testquestions";
	div.style.height = "100%";

	var table = document.createElement("table");
	
	var tr = document.createElement("tr");
	table.appendChild(tr);
	
	var img = document.createElement("img");
	img.src = "images/teacher_info.png";
	img.style.margin = "10px";
	img.style.height = "350px";
	
	var td = document.createElement("td");
	td.appendChild(img);
	tr.appendChild(td);
	
	var span = document.createElement("span");
	span.innerHTML = test.description + "<br/><br/>";
	var td = document.createElement("td");
	td.appendChild(span);
	tr.appendChild(td);
	
	div.appendChild(table);
	// TODO adicionar uma nota que a continuação de um teste interrompido
	
	span = document.createElement("span");
	
	span.innerHTML = "Acrescer/descontar do b&ocirc;nus: " + test.timeRewardXP + " <img src='images/xp.png' style='vertical-align:middle'/> a cada " + test.timeXP + " segundos antecipados/extras.";
	span.style.padding = "10px";
	span.style.border = "1px solid black"; 
	span.style.width = "95%";
	span.style.display = "block";
	span.style.textAlign = "center";
	
	td.appendChild(span);
	
	$("#testsStart").css("display", "inline");
	$("#testsLogoff").css("display", "inline");
	
	$("#testsNextQuestion").css("display", "none");
	$("#testsLetBlank").css("display", "none");
	$("#testsPlay").css("display", "none");
	$("#continueTestAnotherDay").css("display", "none");
	
	window.addEventListener('resize',  Tests.resizeWindow);
	window.addEventListener('beforeunload', Tests.stopNow);
	
	return div;
};

Tests.start = function() {
	
	$("#testsStart").css("display", "none");
	$("#testsLogoff").css("display", "none");
	
	$("#testsNextQuestion").css("display", "inline");
	$("#testsLetBlank").css("display", "inline");
	$("#testsPlay").css("display", "none");
	
	Tests.idx = 0;
	
	Tests.drawQuestion();
	
};

Tests.nextQuestion = function() {

	confirm("Deseja realmente executar essa a&#231;&#227;o ?", function () {
		Tests.performQuestion(null, null);
	});
	
};
		
Tests.performQuestion = function(blankValue, finished) {
	Tests.closeDrop();
	if (Tests.dropExpand != null)
		Tests.dropExpand.close();

	Blockly.WidgetDiv.hide(); // hide the fields of blockly that are in edit mode
	
	var finishTest = (finished == true || finished == null);
	
	var answer = document.getElementById("answerQuestion");
	var valueAnswer = null;
	if (answer.type === "number") {
		
		if (finishTest) {
			
			valueAnswer = (blankValue != null?blankValue:answer.value.trim());
			if (valueAnswer === "") {
				Tests.drop = new Drop({
					target: answer,
					content: BlocklyApps.getMsg("NoBugs_requiredField"),
					position: "left middle",
					classes: "drop-theme-arrows",
					constrainToScrollParent: false,
					openOn: ""
				});
				Tests.drop.open();

				return;
			}
		} else {
			valueAnswer = "?";
		}
	} else {
		if (blankValue != null) {
			valueAnswer = blankValue;
		} else {
			
			valueAnswer = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
			
			if (finishTest) {
				
				BlocklyApps.log = [];
				var js = Blockly.JavaScript;

				var newLogicCompare = Blockly.JavaScript['logic_compare']; 
				
				Blockly.JavaScript['logic_compare'] = NoBugsJavaScript.oldLogicCompare; // it mustn't use the new version of comparison because here we dont use javascript interpreter classes

				// the variable code is referenced in question.answer
				var code = "function highlightBlock(c){};var NoBugsJavaScript = {};" +  
				 				js.workspaceToCode(Blockly.mainWorkspace);
				
				var question = Tests.test.questions[Tests.idx];
				var result = "F";
				try {
					result = (eval(question.answer)?"T":"F");
				} catch (ex) {}
				
				Blockly.JavaScript['logic_compare'] = newLogicCompare;
			} else
				result = "?";
			
			valueAnswer = result + valueAnswer;
			
		}
			
	}
			
	var timeSpent = 0;
	if (valueAnswer == -1)
		timeSpent = CountXP.umaFracao; // blank option always consider using the total time
	else
		timeSpent = (CountXP.times*CountXP.umaFracao) + CountXP.current;
	
	UserControl.saveTestQuestionAnswer(
			parseInt(answer.testId),
			parseInt(answer.questionId), 
			parseInt(answer.missionId), 
			timeSpent, 
			valueAnswer, 
			{async:false, callback:function(){}});
	
	if (finishTest) {
		Tests.idx++;
		
		if (Tests.idx == Tests.test.questions.length)
			UserControl.retrieveTestRewards(answer.testId, answer.missionId, Tests.drawFinal);
		else
			Tests.drawQuestion();
	}
};

Tests.drawFinal = function(ret) {
	
	$("#testquestions").empty();
	
	var table = document.createElement("table");
	
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	
	var img = document.createElement("img");
	img.src = "images/teacher_info.png";
	img.style.margin = "10px";
	img.style.height = "350px";

	td.rowSpan = "3";
	
	td.appendChild(img);
	
	td = document.createElement("td");
	tr.appendChild(td);
	
	td.innerHTML = "Agora que voc&ecirc; encerrou essas quest&otilde;es de b&ocirc;nus, vamos avaliar quanto voc&ecirc; ganhou :";

	tr = document.createElement("tr");
	table.appendChild(tr);
	
	td = document.createElement("td");
	td.style.verticalAlign = "top";
	tr.appendChild(td);

	var table2 = document.createElement("table");
	td.appendChild(table2);

    table2.style.border = "1px solid yellow";
    table2.style.borderRadius = "10px";
    table2.style.padding = "10px";
    table2.style.backgroundColor = "#F8D686";
    table2.style.margin = "0 auto";

	tr = document.createElement("tr");
	table2.appendChild(tr);
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = "Pontos de XP";
	
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = ret[0] + "<img src='images/xp.png' style='vertical-align:middle'/>";
	td.style.textAlign = "right";
	
	tr = document.createElement("tr");
	table2.appendChild(tr);
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = "Moedas";
	td.style.textAlign = "right";
	
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = ret[1] + "<img src='images/coin2.png' style='vertical-align:middle'/>";
	td.style.textAlign = "right";
		
	tr = document.createElement("tr");
	table.appendChild(tr);
	td = document.createElement("td");
	tr.appendChild(td);
	if (ret[0] == 0 && ret[1] == 0)
		td.innerHTML = "Existir&atilde;o no futuro outras oportunidades para receber b&ocirc;nus. Mais aten&ccedil;&atilde;o da pr&oacute;xima vez.";
	else
		td.innerHTML = "Parab&eacute;ns pelo seu desempenho, e continue a jogar.";
	
	$("#testquestions").append(table);

	UserControl.addRewardsToCurrentUser(ret[0], ret[1]);
	
	$("#testsStart").css("display", "none");
	$("#testsLogoff").css("display", "none");
	
	$("#testsNextQuestion").css("display", "none");
	$("#testsLetBlank").css("display", "none");
	
	$("#testsPlay").css("display", "inline");
	$("#continueTestAnotherDay").css("display", "none");
};

Tests.drawQuestion = function() {
	var question = Tests.test.questions[Tests.idx];
	
	$("#testquestions").empty();
	
	var stopWatch = document.createElement("div");
	stopWatch.style.position = "fixed";
	stopWatch.style.right = "0px";
	
	var canvas = document.createElement("canvas");
	canvas.id = "stopWatchTests";
	canvas.width = "40";
	canvas.height = "32";
	
	stopWatch.appendChild(canvas);
	stopWatch.innerHTML = stopWatch.innerHTML + "<br/>" + question.timeLimit + " s"; 
	$("#testquestions").append(stopWatch);
	
	CountXP.init("stopWatchTests");
	
	var current = 0;
	if (question.previousAnswer != null) {
		current = question.previousAnswer.timeSpend;
	}
	
	CountXP.config(question.timeLimit, current, 0, 0, null, false);
	CountXP.start();
	
	var table = document.createElement("table");
	table.id = "testTableContent";
	table.width = "100%";
	table.style.borderCollapse = "collapse";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.id = "tdContent";
	td.innerHTML = changeImgHex(question.description);
	
	table.appendChild(tr); tr.appendChild(td);
	
	$("#testquestions").append(table);
	
	var mainDiv = document.createElement("div");
	mainDiv.id = "testAnswerId";
	mainDiv.style.borderTop = "1px solid black";
	$("#testquestions").append(mainDiv);
	
	var div = document.createElement("div");
	mainDiv.appendChild(div);

	div.style.float = "left";
	div.style.padding = "10px";
	div.style.fontSize = "14px";
	div.innerHTML = question.question;
	
	Tests.dropExpand = null;
	var input = null;
	switch (question.answerType) {
	  case "N": 
		input = document.createElement("input");
		
		input.id = "answerQuestion";
		input.type = "number";
		input.value = "";
		input.style.borderColor = "red";
		input.style.margin = "10px";
		input.addEventListener("change", Tests.closeDrop, false);		
		input.onkeypress = function(event) {
			return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0);
		};
		mainDiv.appendChild(input);
		$("#continueTestAnotherDay").css("display", "none");
		break;
		
	  case "C":
		var movePanel = document.createElement("div");
		movePanel.className = "move-panel";
		movePanel.style.right = "10px";
		movePanel.style.position = "fixed";
		movePanel.style.top = "auto";
		movePanel.style.backgroundColor = "white";
		
		var b = document.createElement("a");
		b.id = "testExpandWorkspace";
		b.className = "move-up";
		b.onclick = Tests.hideElements;
		movePanel.appendChild(b);
		
		var tdButton = document.createElement("td");
		tdButton.style.borderBottom = "1px solid red";
		tdButton.style.verticalAlign = "bottom";
		tdButton.appendChild(movePanel);
		mainDiv.appendChild(tdButton);
		
		if (!Tests.dropShowed) {
			
			Tests.dropExpand = new Drop({
				target: movePanel,
				content: "Clique aqui para expandir",
				position: "left bottom",
				classes: "drop-theme-arrows",
				constrainToScrollParent: false,
				tetherOptions: {offset: '0 25'},
				remove: true,
				openOn: ""
			});
			Tests.dropShowed = true;
		}
		
		input = document.createElement("div");
		input.id = "answerQuestion";
		input.type = "blockly";
     	input.style.width = "98%";
		
		mainDiv.appendChild(input); // must here before the inject
		
		TestRT={}; // used into question.language
		eval(question.language);
		
		Blockly.inject(input,
			     { media: "media/",
			       rtl: false,
			       toolbox: question.toolbox,
			       trashcan: false,
			       comments: false,
			       scrollbars: true});
		
		;
		
		// there is a bug (i dont know if is my or from blockly, but the toolbox doesnt add into the blockly element
		var toolBox = $(".blocklyToolboxDiv");
		if (toolBox.length > 0) {
			$("body").detach(".blocklyToolboxDiv");
			$("#answerQuestion").append(toolBox);
		}
		
		var answerBlocks = null;
		if (question.previousAnswer == null)
			answerBlocks = question.blocks;
		else
			answerBlocks = question.previousAnswer.answer; 
		
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(answerBlocks));
        break;
	}
	
	input.testId = Tests.test.id;
	input.questionId = question.id;
	input.missionId = question.missionId;
	
	
	$("#testsNextQuestion").html(BlocklyApps.getMsg("Tests_Done") + " [" + question.xpReward + " <img src='images/xp.png' style='vertical-align:middle;width:20px'/>]");
	$("#testsLetBlank").html(BlocklyApps.getMsg("Tests_LetBlank") + " [" + question.xpRewardBlank + " <img src='images/xp.png' style='vertical-align:middle;width:20px'/>]");
    
	$("#continueTestAnotherDay").css("display", "inline");

	if (Tests.dropExpand  != null) {
		Tests.dropExpand.open();
	}
		
};

Tests.resizeWindow = function(e) {
	
	if (document.getElementById("answerQuestion").type !== "blockly")
		return;
	
	var sizeBlockly = $("#testquestions").height() - $("#testTableContent").height() - 35;
	$("#answerQuestion").css("height", sizeBlockly + "px");
	
};

Tests.hideElements = function() {
	if (Tests.dropExpand != null)
		Tests.dropExpand.close();
	
	var td = document.getElementById("tdContent");
	var child = td.firstElementChild;
	while (child != null) {
		
		child.style.display = "none";
		child = child.nextElementSibling;
	}
	var a = document.getElementById("testExpandWorkspace");
	a.className = "move-down";
	a.onclick = Tests.showElements;
	
	Blockly.fireUiEvent(window, 'resize');
};

Tests.showElements = function() {
	var td = document.getElementById("tdContent");
	var child = td.firstElementChild;
	while (child != null) {
		
		child.style.display = "inline";
		child = child.nextElementSibling;
	}
	var a = document.getElementById("testExpandWorkspace");
	a.className = "move-up";
	a.onclick = Tests.hideElements;

	Blockly.fireUiEvent(window, 'resize');
};

Tests.closeDrop = function() {
	
	if (Tests.drop != null && Tests.drop != undefined) {
		Tests.drop.remove();
		Tests.drop = null;
	}
	
};

Tests.letBlank = function() {

	confirm("Deseja realmente executar essa a&#231;&#227;o ?", function () {
		Tests.performQuestion("-1", true);
	});
	
	
};

Tests.stopNow = function() {
	window.removeEventListener('resize',  Tests.resizeWindow);
	window.removeEventListener('beforeunload', Tests.stopNow);

	if (Tests.dropExpand != null)
		Tests.dropExpand.close();

	if (Tests.idx >= 0)
		Tests.performQuestion(null, false);
	Game.logoffButtonClick();
};

Tests.play = function() {
	window.removeEventListener('resize',  Tests.resizeWindow);
	window.removeEventListener('beforeunload', Tests.stopNow);
	
	$("#testsPlay").css("display", "none");
	$("#testquestions").remove();
	
	MyBlocklyApps.hideDialog(false);
	Game.continueLoginProcessEx();
};