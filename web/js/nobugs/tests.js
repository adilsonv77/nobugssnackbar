'use strict';

var Tests = {};

Tests.createForm = function (test) {
	
	Tests.test = test;
	Tests.idx = 0;
	
	var div = document.createElement("div");
	
	div.style["height"] = "480px";
	div.id = "testquestions";

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
	
	return div;
};

Tests.start = function() {
	
	$("#testsStart").css("display", "none");
	$("#testsLogoff").css("display", "none");
	
	$("#testsNextQuestion").css("display", "inline");
	$("#testsLetBlank").css("display", "inline");
	$("#testsPlay").css("display", "none");
	
	Tests.bonusOrDiscount = 0;
	
	Tests.drawQuestion();
	
};

Tests.nextQuestion = function(blankValue) {
	Tests.closeDrop();
	
	var answer = document.getElementById("answerQuestion");
	if (answer.type === "number") {
		
		var valueAnswer = (blankValue != null?blankValue:answer.value.trim());
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
		} else {
			
			var timeSpent = 0;
			if (valueAnswer == -1)
				timeSpent = CountXP.umaFracao; // blank option always consider using the total time
			else
				timeSpent = (CountXP.times*CountXP.umaFracao) + CountXP.current;
			
			UserControl.saveTestQuestionAnswer(
					parseInt(answer.testId),
					parseInt(answer.questionId), 
					parseInt(answer.missionId), 
					timeSpent, valueAnswer, 
					{async:false, callback:function(){}});
			
			Tests.bonusOrDiscount += CountXP.umaFracao - timeSpent;
			
		}
	
	} 
   
	Tests.idx++;
	
	if (Tests.idx == Tests.test.questions.length)
		UserControl.retrieveTestRewards(answer.testId, answer.missionId, Tests.drawFinal);
	else
		Tests.drawQuestion();
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
};

Tests.drawQuestion = function() {
	var question = Tests.test.questions[Tests.idx];
	
	$("#testquestions").empty();
	
	var stopWatch = document.createElement("div");
	stopWatch.style.position = "absolute";
	stopWatch.style.left = "1050px";
	
	var canvas = document.createElement("canvas");
	canvas.id = "stopWatchTests";
	canvas.width = "40";
	canvas.height = "32";
	
	stopWatch.appendChild(canvas);
	stopWatch.innerHTML = stopWatch.innerHTML + "<br/>" + question.timeLimit + " s"; 
	$("#testquestions").append(stopWatch);
	
	CountXP.init("stopWatchTests");
	CountXP.config(question.timeLimit, 0, 0, 0, null, false);
	CountXP.start();
	
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.innerHTML = changeImgHex(question.description);
	
	table.appendChild(tr); tr.appendChild(td);
	
	$("#testquestions").append(table);
	
	if (question.testBlock != null) {
		
		var blockly = document.createElement("div");
		blockly.id = "blocklyquestion";
		$("#testquestions").append(blockly);
		
		eval(question.language);
		
		var workspace = Blockly.inject('blocklyquestion',
			      {toolbox: question.toolbox, scrollbars: true, readOnly: true});
		
		var xml = Blockly.Xml.textToDom(question.blocks);
		Blockly.Xml.domToWorkspace(workspace, xml);
		
	}
	
	tr = document.createElement("tr");
	td = document.createElement("td");
	table.appendChild(tr); tr.appendChild(td);
	
	var div = document.createElement("div");
	td.style.borderTop = "1px solid red";
	td.style.paddingTop = "10px";
	td.appendChild(div);

	div.style.float = "left";
	div.style.paddingRight = "10px";
	div.innerHTML = question.question;
	
	if (question.answerType !== "B") {
		var input = null;
		switch (question.answerType) {
		case "N": 
			input = document.createElement("input");
			
			input.id = "answerQuestion";
			input.type = "number";
			input.testId = Tests.test.id;
			input.questionId = question.id;
			input.missionId = question.missionId;
			input.value = "";
			input.style.borderColor = "red";
			input.addEventListener("change", Tests.closeDrop, false);		
			input.onkeypress = function(event) {
				return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0);
			};
		}
		
		td.appendChild(input);
	}
	
	$("#testsNextQuestion").html(BlocklyApps.getMsg("Tests_Done") + " [" + question.xpReward + " <img src='images/xp.png' style='vertical-align:middle;width:20px'/>]");
	$("#testsLetBlank").html(BlocklyApps.getMsg("Tests_LetBlank") + " [" + question.xpRewardBlank + " <img src='images/xp.png' style='vertical-align:middle;width:20px'/>]");
};

Tests.closeDrop = function() {
	
	if (Tests.drop != null && Tests.drop != undefined) {
		Tests.drop.remove();
		Tests.drop = null;
	}
	
};

Tests.letBlank = function() {

	var answer = document.getElementById("answerQuestion");
	if (answer.type === "number") {
		Tests.nextQuestion("-1");
	}
	
};

Tests.play = function() {
	$("#testsPlay").css("display", "none");
	$("#testquestions").remove();
	
	MyBlocklyApps.hideDialog(false);
	Game.continueLoginProcessEx();
};