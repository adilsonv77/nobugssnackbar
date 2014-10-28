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

		td.innerHTML = questionnaire.questions[i].description;
		
		td = document.createElement("td");
		tr.appendChild(td);
		
		// TODO provide the component according questionnaire.questions[i].type
		
		table.appendChild(tr);
	}
	
	return form;
}