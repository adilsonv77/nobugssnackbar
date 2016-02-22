'use strict';

var SelectLevel = {};

SelectLevel.generateBoard = function(evt) {

	for (var i = 0; i < Game.loginData.missionHist.length; i++) {
		
		var levelInfo = Game.loginData.missionHist[i];
		
		var sDate = levelInfo[8].split("-");
		var date = new Date(sDate[0], sDate[1], sDate[2]);
		
		$("#level_"+(i+1)).removeClass();
		if (Date.now() >= date) {
			$("#level_"+(i+1)).addClass("levels");
			
			if (levelInfo[2] == levelInfo[3]) {
				var levelOk = $("<div class='levelok' id='levelok_" + (i+1) + "'/>");
				$("#level_"+(i+1)).append(levelOk);
			}
		} else
			$("#level_"+(i+1)).addClass("levels_disabled");
		
	}
	
	var fClose = function() {
	};
	
	$("#selectLevel .levels").unbind('click').click(SelectLevel.levelSelected);
	
	MyBlocklyApps.showDialog(document.getElementById("dialogSelecLevel"), null, false, true, true, 
			BlocklyApps.getMsg("Text_SelectLevel"), {width: "750px", height: "530px"}, null, fClose);
	
	
};

SelectLevel.levelSelected = function(evt) {
	var levelSelected = evt.target.id;
	levelSelected = parseInt(levelSelected.substring(levelSelected.indexOf("_")+1));
	
	MyBlocklyApps.hideDialog(false);
	
	var levelInfo = Game.loginData.missionHist[levelSelected-1];
	
	var missionView = false;
	var loadMission = levelInfo[3]+1; 
	if (levelInfo[2] == levelInfo[3]) {
		missionView = true;
		loadMission = 1;
	}
	
	$("div").remove(".levelok");
	
	Game.missionSelected(levelInfo[4], levelInfo[5], loadMission, missionView);
};