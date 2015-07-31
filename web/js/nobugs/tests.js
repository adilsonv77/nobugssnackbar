'use strict';

var Tests = {};

Tests.createForm = function (test) {
	
	Tests.test = test;
	Tests.idx = 0;
	
	var div = document.createElement("div");

	
	div.style["height"] = "480px";
//	div.style["overflow"] = "scroll";
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
	
	span.innerHTML = "Acrescer/descontar " + test.timeRewardXP + " <img src='images/xp.png' style='vertical-align:middle'/> a cada " + test.timeXP + " segundos antecipados/extras.";
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
	
	return div;
};

Tests.start = function() {
	
	$("#testsStart").css("display", "none");
	$("#testsLogoff").css("display", "none");
	
	$("#testsNextQuestion").css("display", "inline");
	$("#testsLetBlank").css("display", "inline");
	
	Tests.drawQuestion();
	
};

Tests.nextQuestion = function() {
	Tests.closeDrop();
	
	var answer = document.getElementById("answerQuestion");
	if (answer.type === "number") {
		
		var valueAnswer = answer.value.trim();
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
			
			UserControl.saveTestQuestion(parseInt(answer.questionId), valueAnswer, 
					{async:false, callback:function(){}});
			
		}
	
	} 
   
	Tests.idx++;
	
	Tests.drawQuestion();
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
			input.questionId = question.id;
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
	
};