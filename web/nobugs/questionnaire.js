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
			var td = document.createElement("td");
			tr.appendChild(td);
	
			td.innerHTML = "<b>" + (questionNumber++) + "</b> - " + questionnaire[j].questions[i].description;
			
			td = document.createElement("td");
			tr.appendChild(td);
			
			// TODO provide the component according questionnaire.questions[i].type	
			table.appendChild(tr);
			tr = document.createElement("tr");
			td = document.createElement("td");
			
			switch(questionnaire[j].questions[i].type[0].toUpperCase()) {
				case "N": {
					input = document.createElement("input");
					input.className = "answer";
					input.name = questionnaire[j].id + "_" + questionnaire[j].questions[i].id;
					input.type = "number";
					input.min = "0";
					input.max = "130";
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

