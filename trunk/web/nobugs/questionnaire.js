/**
 * 
 */	

function createForm(questionnaire) {
	
	var form = document.createElement("form");
	var table = document.createElement("table");
	form.appendChild(table);
	
	for (var i = 0; i < questionnaire.questions.length; i++) {
		
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		tr.appendChild(td);

		td.innerHTML = "<b>" + (i+1) + "</b> - " + questionnaire.questions[i].description;
		
		td = document.createElement("td");
		tr.appendChild(td);
		
		// TODO provide the component according questionnaire.questions[i].type	
		table.appendChild(tr);
		tr = document.createElement("tr");
		td = document.createElement("td");
		var input = document.createElement("input");
		
		switch(questionnaire.questions[i].type[0].toUpperCase()) {
			case "N": {
				input.type = "number";
				input.min = "0";
				input.max = "130";
				input.name = "answer" + i;
				input.onkeypress = function(event) {
					return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0)
				};
				td.appendChild(input);
				break;
			}
			case "S": {
				var identifier = "a";
				for (var x = 0;x < questionnaire.questions[i].options.length;x++) {
					input = document.createElement("input");
					input.type = "radio";
					input.name = "answer" + i;
					input.value = questionnaire.questions[i].options[x];
					
					var label = document.createElement("label");
					
					label.innerHTML = identifier + ") ";
					identifier = nextChar(identifier);
					td.appendChild(label);
					
					td.appendChild(input);
					
					label = document.createElement("label");
					label.innerHTML = questionnaire.questions[i].options[x];
					td.appendChild(label);
					
					var br = document.createElement("br");
					td.appendChild(br);
				}
				break;
			}
			case "T": {
				if (questionnaire.questions[i].type.length == 1) {
					input.type = "text";
					input.name = "answer" + i;
					input.style.width = "100px";
					td.appendChild(input);
				} else {
					var cont = questionnaire.questions[i].type.substring(1, questionnaire.questions[i].type.length);
					var identifier = "a";
					for(var x = 0;x < cont;x++) {
						input = document.createElement("input");
						input.type = "text";
						input.name = "answer" + i + x;
						input.style.width = "300px";
						input.style.marginTop = "5px";
						
						var label = document.createElement("label");
						
						label.innerHTML = identifier + ") ";
						identifier = nextChar(identifier);
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

function nextChar(char) {
	return String.fromCharCode(char.charCodeAt(0) + 1);
}