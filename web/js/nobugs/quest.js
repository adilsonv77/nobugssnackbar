Quest = {};
Game = { loginData: {missionHist : null}};

Quest.login = function() {

	var user = document.getElementById('loginuser').value;
	var passw = document.getElementById('loginpassw').value;
	
	dwr.engine.setErrorHandler(Quest.loginError);
	
	QuestControl.login(user, passw, function(ret) {
		
		dwr.engine.setErrorHandler(null);
		
		if (ret[0] == null) {
			
			var error = document.getElementById("errorLogin");
			error.innerHTML = "Question&#225;rio j&#225; preenchido.";
			
		} else {
			
			var formQuestionnaire = Questionnaire.createForm(ret);
			if (formQuestionnaire != null) {
				
				$("#contentQuestionnaire").html("");
				$("#contentQuestionnaire").append(formQuestionnaire);
				
				MyBlocklyApps.showDialog(document.getElementById("dialogQuestionnaire"), null, false, true, true, 
						"Question&#225;rio", null, null);
				
			} 
			
		}
		
	}) ;
		
};

Quest.finishQuestionnaire = function() {
	var consistido = Questionnaire.consistQuestionnaire();
	
	if (consistido) {
		
		Questionnaire.handlingQuestionnaire(function(saveAnswers) {
			QuestControl.saveQuestionnaire(saveAnswers, function() {
				QuestControl.logoff();
			});
		});
		
		BlocklyApps.hideDialog(false);

	}
	
};

Quest.loginError = function(msg, exc) {
	
	var error = document.getElementById("errorLogin");
	error.innerHTML = "Usu&#225;rio ou senha incorreta.";
};