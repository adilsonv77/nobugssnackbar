'use strict';

var SelectLevel = {};

SelectLevel.generateBoard = function(evt) {
	for (var i = 0; i < Game.loginData.missionHist.length; i++) {
		
		if ($("#level_"+(i+1)).length > 0) {
			
			var levelInfo = Game.loginData.missionHist[i];
			
			var sDate = levelInfo[8].split("-");
			var date = new Date(sDate[0], sDate[1]-1, sDate[2]); // month zero based
			
			$("#level_"+(i+1)).removeClass();
			
			SelectLevel.drawDate("level_"+(i+1), sDate[2]+"/"+sDate[1]+"/"+sDate[0]);
			
			if (Date.now() >= date) {
				
				if (levelInfo[2] == levelInfo[3]) {
					$("#level_"+(i+1)).addClass("levels");
				} else {
					if (levelInfo[9] == 0)
						$("#level_"+(i+1)).addClass("levels").addClass("level_notcompleted");
					else {
						
						var preReq = Game.loginData.missionHist[levelInfo[9]-1];
						if (preReq[2] ==  preReq[3])
							$("#level_"+(i+1)).addClass("levels").addClass("level_notcompleted");
						else
							$("#level_"+(i+1)).addClass("levels_disabled");
					}
				}
				
				
			} else
				$("#level_"+(i+1)).addClass("levels_disabled");
			
		}
	}
	
	var fClose = function() {

		
		
	};
	SelectLevel.levelBefore = null;
	$("#selectLevel .levels").hover(SelectLevel.hoverLevelIn, SelectLevel.hoverLevelOut);
	$("#selectLevel .levels_disabled").hover(SelectLevel.hoverLevelIn, SelectLevel.hoverLevelOut);
	$("#selectLevel .levels").unbind('click').click(SelectLevel.levelSelected);

	MyBlocklyApps.showDialog(document.getElementById("dialogSelecLevel"), null, false, true, true, 
			BlocklyApps.getMsg("Text_SelectLevel"), {width: "750px", height: "530px"}, null, fClose);
	
	
};

SelectLevel.drawDate = function(level, date) {
	var ctx = document.getElementById("date_"+level).getContext('2d');
	ctx.fillStyle = "white";
	ctx.font = "12px Montserrat";
	ctx.fillText(date, 0, 11);
};

SelectLevel.hoverLevelOut = function() {
	if (SelectLevel.levelBefore !== null)
		SelectLevel.levelBefore.css("display", "none");
	SelectLevel.levelBefore = null;
};

SelectLevel.hoverLevelIn = function() {	
	var id = $( this ).attr("id");
	SelectLevel.levelBefore = $ ("#nome_" + id);
	SelectLevel.levelBefore.css("display", "inline");
	
	var children = SelectLevel.levelBefore.children();
	var a = children[1];
	var b = children[2];
	var c = children[3];
	
	var p = $(a).position();
	$(b).css("top", (p.top+20)+"px").css("left", p.left + "px");
	$(c).css("top", (p.top+20)+"px").css("left", (p.left+72) + "px");
	
};

SelectLevel.levelSelected = function(evt) {
	var levelSelected = evt.target.id;
	levelSelected = parseInt(levelSelected.substring(levelSelected.indexOf("_")+1));
	
	MyBlocklyApps.hideDialog(false);
	
	var levelInfo = Game.loginData.missionHist[levelSelected-1];
	
	var missionView = false;
	var loadMission = 1; 
	if (levelInfo[2] == levelInfo[3]) {
		missionView = true;
	} else {
		for (var i=0; i<levelInfo[7].length; i++)
			if (levelInfo[7][i] === null || levelInfo[7][i] === "F"){
				
				loadMission = i+1;
				break;
				
			}
		
	}
	
	LogClick.store("mission_"+loadMission+"_view_"+missionView);

	Game.missionSelected(levelInfo[4], levelInfo[5], levelSelected-1, loadMission, missionView);
		
};