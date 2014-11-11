/**
 * 
 */	

var Questionnaire = {};

Questionnaire.createForm = function (questionnaire) {
	
	var form = document.createElement("form");
	var div = document.createElement("div");
	
	div.style["width"] = "600px";
	div.style["height"] = "480px";
	div.style["overflow"] = "scroll";
	div.id = "questions";
	
	var table = document.createElement("table");
	
	div.appendChild(table);
	form.appendChild(div);
	
	var input = document.createElement("input");
	
	var questionNumber = 1;
	
	for (var j = 0; j < questionnaire.length; j++) 
		for (var i = 0; i < questionnaire[j].questions.length; i++) {
			
			var tr = document.createElement("tr");
			tr.setAttribute("questionId", questionnaire[j].questions[i].id);
			
			var td = document.createElement("td");
			tr.appendChild(td);
	
			td.innerHTML = "<b>" + (questionNumber++) + "</b> - " + questionnaire[j].questions[i].description;
			
			td = document.createElement("td");
			tr.appendChild(td);
			
			// TODO provide the component according questionnaire.questions[i].type	
			table.appendChild(tr);
			tr = document.createElement("tr");
			tr.setAttribute("questionId", questionnaire[j].questions[i].id);
			
			td = document.createElement("td");
			
			switch(questionnaire[j].questions[i].type[0].toUpperCase()) {
				case "N": {
					input = document.createElement("input");
					input.className = "answer";
					input.name = questionnaire[j].id + "_" + questionnaire[j].questions[i].id;
					input.type = "number";
					input.min = "0";
					input.max = "130";
					input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
					input.onkeypress = function(event) {
						return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0)
					};
					td.appendChild(input);
					break;
				}
				case "S": {
					var identifier = "a";
					for (var x = 0;x < questionnaire[j].questions[i].options.length;x++) {
						input = document.createElement("input");
						input.className = "answer";
						input.name = questionnaire[j].id + "_" + questionnaire[j].questions[i].id;
						input.type = "radio";
						input.value = questionnaire[j].questions[i].options[x].value;
						input.id = questionnaire[j].id + "_" + questionnaire[j].questions[i].id + "_" + x;
						input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
						
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
						input.name = questionnaire[j].questions[i].id;
						input.style["width"] = "100px";
						input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
						td.appendChild(input);
					} else {
						var cont = questionnaire[j].questions[i].type.substring(1, questionnaire[j].questions[i].type.length);
						var identifier = "a";
						for(var x = 0;x < cont;x++) {
							input = document.createElement("input");
							input.className = "answer";
							input.name = questionnaire[j].id + "_" + questionnaire[j].questions[i].id;
							input.type = "text";
							input.style["width"] = "300px";
							input.style["marginTop"] = "5px";
							input.setAttribute("questionrequired", new String(questionnaire[j].questions[i].required).toUpperCase());
							
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
				
			}
			tr.appendChild(td);
			table.appendChild(tr);
			
		}
	
	return form;
}

Questionnaire.nextChar = function(char) {
	return String.fromCharCode(char.charCodeAt(0) + 1);
};

Questionnaire.handlingQuestionnaire = function() {
	var answers = document.getElementsByClassName("answer");
	var saveAnswers = [];
	
	for (var i = 0;i < answers.length;i++) {
		var answer = answers[i];
		var questionnaireId = answer.name.split("_")[0];
		var questionId = answer.name.split("_")[1];
		
		switch(answer.type.toUpperCase()) {
			case "RADIO": {
				var answerOptions = document.getElementsByName(answer.name);
				
				for (var x = 0;x < answerOptions.length;x++) {
					if (answerOptions[x].checked) {
						var questionnaireId = answer.name.split("_")[0];
						var questionId = answer.name.split("_")[1];
						saveAnswers.push([questionnaireId, questionId, answerOptions[x].value]);
						
					}
					if (x != answerOptions.length-1) {
						i++;
					}
				}
				break;
			}
			case "NUMBER": {
				saveAnswers.push([questionnaireId, questionId, answer.value]);
				break;
			}
			case "TEXT": {
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
		}
	}
	UserControl.saveQuestionnaire(saveAnswers);
	// it's not necessary waiting the answer... the next parts of the games don't depends on it. 
};

Questionnaire.consistQuestionnaire = function() {
	var any = false;
	
	var answers = document.getElementsByClassName("answer");
	
	for (var i = 0;i < answers.length;i++) {
		var answer = answers[i];
		var questionnaireId = answer.name.split("_")[0];
		var questionId = answer.name.split("_")[1];
		
		var checked = false;
		
		switch(answer.type.toUpperCase()) {
			case "RADIO": {
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
			case "NUMBER": {
				if (answer.getAttribute("questionrequired").toUpperCase() == "TRUE") {
					if (answer.value != "") {
						checked = true;
					}
				} else {
					checked = true;
				}
				
				break;
			}
			case "TEXT": {
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

