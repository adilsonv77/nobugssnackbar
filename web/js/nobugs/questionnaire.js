'use strict';

/**
 *
 */

var Questionnaire = {};

Questionnaire.createForm = function (questionnaire) {

	var form = document.createElement("form");
	var div = document.createElement("div");

	div.style["width"] = "800px";
	div.style["height"] = "480px";
	div.style["overflow"] = "scroll";
	div.id = "questions";

	var table = document.createElement("table");

	div.appendChild(table);
	form.appendChild(div);

	var input = document.createElement("input");

	var questionNumber = 1;

	var missions = Game.loginData.missionHist;

	for (var j = 0; j < questionnaire.length; j++) {
		
		if (missions!=null && questionnaire[j].showRules != null) {
			
			Game.finishedMissionId = 0;
			for (var i=missions.length-1; i>=0; i--)
				if (questionnaire[j].classId == missions[i][4]) {
					Game.finishedMissionId += missions[i][3];
				}
			
			var condition = eval(questionnaire[j].showRules);
			if (!condition) 
				continue;
		}
		
		var trQ = document.createElement("tr");
		var tdQ = document.createElement("td");
		tdQ.className = "questionnaireDiv";
		trQ.appendChild(tdQ);
		tdQ.innerHTML = questionnaire[j].description;
		
		table.appendChild(trQ);
		
		for (var i = 0; i < questionnaire[j].questions.length; i++) {

			var tr = document.createElement("tr");
			if (questionnaire[j].questions[i].type[0].toUpperCase() != "L") 
				tr.setAttribute("questionId", questionnaire[j].questions[i].id);

			var td = document.createElement("td");
			tr.appendChild(td);

			if (questionnaire[j].questions[i].type[0].toUpperCase() != "L") {
				td.innerHTML = "<b>" + (questionNumber++) + "</b> - " + questionnaire[j].questions[i].description;
			} else {
				td.innerHTML = "<b>" + (questionNumber++) + "</b> - ";
			}
			
			td = document.createElement("td");
			tr.appendChild(td);

			// TODO provide the component according questionnaire.questions[i].type
			table.appendChild(tr);
			tr = document.createElement("tr");
			if (questionnaire[j].questions[i].type[0].toUpperCase() != "L") 
				tr.setAttribute("questionId", questionnaire[j].questions[i].id);

			td = document.createElement("td");

			switch(questionnaire[j].questions[i].type[0].toUpperCase()) {
				case "N": {
					input = document.createElement("input");
					input.setAttribute("questionId", questionnaire[j].questions[i].id);
					input.className = "answer";
					input.name = questionnaire[j].id + "_" + questionnaire[j].questions[i].id;
					input.type = "number";
					input.min = "0";
					input.max = "130";
					input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
					input.setAttribute("qtype", questionnaire[j].questions[i].type[0].toUpperCase());
					input.onkeypress = function(event) {
						return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0);
					};
					input.addEventListener("change", Questionnaire.closeDrop, false);
					td.appendChild(input);
					break;
				}
				case "S": {
					var identifier = "a";
					for (var x = 0;x < questionnaire[j].questions[i].options.length;x++) {
						input = document.createElement("input");
						input.setAttribute("questionId", questionnaire[j].questions[i].id);
						input.className = "answer";
						input.name = questionnaire[j].id + "_" + questionnaire[j].questions[i].id;
						input.type = "radio";
						input.value = questionnaire[j].questions[i].options[x].value;
						input.id = questionnaire[j].id + "_" + questionnaire[j].questions[i].id + "_" + x;
						input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
						input.setAttribute("qtype", questionnaire[j].questions[i].type[0].toUpperCase());
						
						input.addEventListener("change", Questionnaire.closeDrop, false);

						var label = document.createElement("label");

						label.innerHTML = identifier + ") ";
						identifier = Questionnaire.nextChar(identifier);
						td.appendChild(label);

						td.appendChild(input);

						label = document.createElement("label");
						label.htmlFor = input.id;
						label.innerHTML = questionnaire[j].questions[i].options[x].description;
						td.appendChild(label);

						var br = document.createElement("br");
						td.appendChild(br);
					}
					break;
				}
				case "T": {
					if (questionnaire[j].questions[i].type.length == 1) {
						input.type = "text";
						input.setAttribute("questionId", questionnaire[j].questions[i].id);
						input.name = questionnaire[j].questions[i].id;
						input.style["width"] = "100px";
						input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
						input.addEventListener("change", Questionnaire.closeDrop, false);
						input.setAttribute("qtype", questionnaire[j].questions[i].type[0].toUpperCase());
						td.appendChild(input);
					} else {
						var cont = questionnaire[j].questions[i].type.substring(1, questionnaire[j].questions[i].type.length);
						var identifier = "a";
						for(var x = 0;x < cont;x++) {
							input = document.createElement("input");
							input.setAttribute("questionId", questionnaire[j].questions[i].id);
							input.className = "answer";
							input.name = questionnaire[j].id + "_" + questionnaire[j].questions[i].id;
							input.type = "text";
							input.style["width"] = "300px";
							input.style["marginTop"] = "5px";
							input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
							input.setAttribute("qtype", questionnaire[j].questions[i].type[0].toUpperCase());
							input.addEventListener("change", Questionnaire.closeDrop, false);

							var label = document.createElement("label");

							label.innerHTML = identifier + ") ";
							identifier = Questionnaire.nextChar(identifier);
							td.appendChild(label);

							td.appendChild(input);

							var br = document.createElement("br");
							td.appendChild(br);
						}
					}
					break;
				}
				case "L": {
					
					var box = document.createElement("table");
					box.style["borderWidth"] = "1px";
					box.style["borderCollapse"] = "collapse";
					box.border = "1";
					
					var boxHead = document.createElement("thead");
					
					var boxTr = document.createElement("tr");
					var boxTd = document.createElement("td");
					
					boxTr.appendChild(boxTd);
					
					//Generate header of likert question options
					var options = questionnaire[j].questions[i].options;
					if (questionnaire[j].questions[i].options != null) {
						for (var x = 0;x < questionnaire[j].questions[i].options.length;x++) {
							boxTd = document.createElement("th");
							boxTd.style["textAlign"] = "center";
							boxTd.style["padding"] = "5px";
							boxTd.innerHTML = questionnaire[j].questions[i].options[x].description;
							
							boxTr.appendChild(boxTd);
							boxHead.appendChild(boxTr);
						}
					}
					
					var boxBody = document.createElement("tbody");
					while (i < questionnaire[j].questions.length) {
						boxTr = document.createElement("tr");
						boxTr.setAttribute("questionId", questionnaire[j].questions[i].id);
						boxTd = document.createElement("td");
						
						boxTd.innerHTML = questionnaire[j].questions[i].description;
						boxTd.style["padding"] = "5px";
						boxTr.appendChild(boxTd);
						
						for (var x = 0;x < options.length;x++) {
							boxTd = document.createElement("td");
							boxTd.style["textAlign"] = "center";
							
							input = document.createElement("input");
							input.type = "radio";
							input.setAttribute("questionId", questionnaire[j].questions[i].id);
							input.className = "answer";
							input.name = questionnaire[j].id + "_" + questionnaire[j].questions[i].id;
							input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
							input.setAttribute("qtype", questionnaire[j].questions[i].type[0].toUpperCase());
							input.addEventListener("change", Questionnaire.closeDrop, false);
							input.id = questionnaire[j].id + "_" + questionnaire[j].questions[i].id + "_" + x;
							input.value = options[x].value;
							
							boxTd.appendChild(input);
							boxTr.appendChild(boxTd);
							boxBody.appendChild(boxTr);
						}
						i++;
					}
					
					box.appendChild(boxHead);
					box.appendChild(boxBody);
					td.appendChild(box);
					break;
				}
				default :
			}
			tr.appendChild(td);
			table.appendChild(tr);

		}
	}

	if (questionNumber == 1)
		return null;
	else
		return form;
};

Questionnaire.closeDrop = function() {

	if (Questionnaire.drop != null && Questionnaire.drop != undefined) {
		Questionnaire.drop.remove();
		Questionnaire.drop = null;
	}


};

Questionnaire.nextChar = function(c) {
	return String.fromCharCode(c.charCodeAt(0) + 1);
};

Questionnaire.handlingQuestionnaire = function(saveMethod) {
	var answers = document.getElementsByClassName("answer");
	var saveAnswers = [];

	for (var i = 0;i < answers.length;i++) {
		var answer = answers[i];
		var questionnaireId = answer.name.split("_")[0];
		var questionId = answer.name.split("_")[1];

		switch(answer.getAttribute("qtype").toUpperCase()) {
			case "N": {
				saveAnswers.push([questionnaireId, questionId, answer.value]);
				break;
			}
			case "L":
			case "S": {
				var answerOptions = document.getElementsByName(answer.name);

				for (var x = 0;x < answerOptions.length;x++) {
					if (answerOptions[x].checked) {
//						var questionnaireId = answer.name.split("_")[0];
//						var questionId = answer.name.split("_")[1];
						saveAnswers.push([questionnaireId, questionId, answerOptions[x].value]);
					}
					if (x != answerOptions.length-1) {
						i++;
					}
				}
				break;
			}
			case "T": {
				var answerOptions = document.getElementsByName(answer.name);
				var aux = "";
				for (var x = 0;x < answerOptions.length;x++) {
					if (answerOptions[x].value != "") {
						aux = aux + "<answer><![CDATA[" + answerOptions[x].value + "]]></answer>";
					}

					if (x != answerOptions.length-1) {
						i++;
					}
				}
				if (aux.length > 0) {
					saveAnswers.push([questionnaireId, questionId, aux]);
				}
				break;
			}
			default :
		}
	}

	saveMethod(saveAnswers);
	// it's not necessary waiting the answer... the next parts of the games don't depends on it.
};

Questionnaire.consistQuestionnaire = function() {
	Questionnaire.closeDrop();
	
	var any = false;

	var answers = document.getElementsByClassName("answer");

	for (var i = 0;i < answers.length;i++) {
		var answer = answers[i];
		var questionnaireId = answer.name.split("_")[0];
		var questionId = answer.name.split("_")[1];

		var checked = false;

		var qtype = answer.getAttribute("qtype").toUpperCase();
		switch(qtype) {
			case "N": {
				if (answer.getAttribute("questionrequired").toUpperCase() == "TRUE") {
					if (answer.value != "") {
						checked = true;
					}
				} else {
					checked = true;
				}

				break;
			}
			case "L":
			case "S": {
				var answerOptions = document.getElementsByName(answer.name);

				if (answerOptions[0].getAttribute("questionrequired").toUpperCase() == "TRUE") {

					for (var x = 0;x < answerOptions.length;x++) {
						if (answerOptions[x].checked) {
							checked = true;
						}
						if (x != answerOptions.length-1) {
							i++;
						}
					}
				} else {
					checked = true;
				}
				break;
			}
			case "T": {
				var answerOptions = document.getElementsByName(answer.name);

				if (answerOptions[0].getAttribute("questionrequired").toUpperCase() == "TRUE") {
					for (var x = 0;x < answerOptions.length;x++) {
						if (answerOptions[x].value == "") {
							break;
						}

						if (x != answerOptions.length-1) {
							i++;
						}
						checked = true;
					}
				} else {
					checked = true;
				}
				break;
			}
		}
		if (!checked) {
			any = true;
			var redTrs = Questionnaire.getTrsByQuestionId(questionId);
			for (var x = 0;x < redTrs.length;x++) {
				redTrs[x].style["color"] = "red";
			}
			var input = Questionnaire.getInputByQuestionId(questionId);
			input.focus();

			if (input.type == "radio")
				if ((input.labels != undefined && input.labels.length > 0) || (input.previousElementSibling != null && input.previousElementSibling.nodeName.toUpperCase() == "LABEL"))
					input = input.parentElement;
				else 
					input = Questionnaire.getTrsByQuestionId(questionId)[0].childNodes[0];
			Questionnaire.drop = new Drop({
				target: input,
				content: BlocklyApps.getMsg("NoBugs_requiredField"),
				position: "left middle",
				classes: "drop-theme-arrows",
				openOn: ""
			});
			Questionnaire.drop.open();

			return;
		} else {
			var blackTrs = Questionnaire.getTrsByQuestionId(questionId);
			for (var x = 0;x < blackTrs.length;x++) {
				blackTrs[x].style["color"] = "black";
			}
		}
	}

	return !any;
};

Questionnaire.getTrsByQuestionId = function(questionId) {
	var selectedTrs = [];
	var allTrs = document.getElementsByTagName("tr");

	for (var i = 0;i < allTrs.length;i++) {
		if (allTrs[i].getAttribute("questionId") == questionId) {
			selectedTrs.push(allTrs[i]);
		}
	}
	return selectedTrs;
};

Questionnaire.getInputByQuestionId = function(questionId) {
	var answers = document.getElementsByClassName("answer");
	for (var i = 0;i < answers.length;i++) {
		if (answers[i].getAttribute("questionId") == questionId) {

			return answers[i];
		}
	}

	return null;
};

