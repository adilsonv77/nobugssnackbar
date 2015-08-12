var SelectMission = {};

SelectMission.generateBoard = function(evt) {
	
	$("#selectMissionBoard").empty();
	
	var thereAreMissions = false;
	
	Game.loginData.missionHist.forEach(function(mission) {
		
		thereAreMissions = thereAreMissions || mission[2] != mission[3]; // qty of mission == qty of solved mission
		
	});
	
	if (!thereAreMissions) {
		
		MyBlocklyApps.showDialog(document.getElementById("dialogNoMoreMissions"), null, true, true, true, null, {width: "600px"}, null);
		
		return;
	}
	
	var idRoot = SelectMission.missionsRetrieved(Game.loginData.missionHist);
	
    $("#selectMissionBoard").append($("#" + idRoot));
	$("#" + idRoot).append($('<div id="bbLineSeparator">'));
	
	Cufon.set('fontFamily', 'DK Crayon Crumble');
	Cufon('.bbtabs');
	
	var fClose = function() {
		$("#selectMissionBoard").empty();
	};
	
	MyBlocklyApps.showDialog(document.getElementById("dialogSelectMission"), null, false, true, true, 
					BlocklyApps.getMsg("Text_SelectMission"), {width: "480px", height: "470px"}, null, fClose);
	SelectMission.stopAnimation = false;
	
	window.setTimeout(SelectMission.blinkTarget, 50);
	
};

SelectMission.missionsRetrieved = function(missions) {
	
	var s = [];
	
	var data = [];
	for (var i= 0; i<missions.length; i++){
		var rec = null;
		var idx = s.indexOf(missions[i][0]);
		if (idx == -1) {
			s.push(missions[i][0]);
			
			rec = {group: missions[i][0], groupId: missions[i][4], levels:[]};
			data.push(rec); 
			
		} else {
			rec = data[idx];
		}
		
		var l = {name: missions[i][1], id: missions[i][5], 
							 howManyItems: missions[i][2], 
					 howManyItemsAchieved: missions[i][3], 
					          repeateable: [],
					          cust:[]};
		for (var j=0;j<missions[i][6].length;j++) {
			l.repeateable.push(missions[i][6][j][0]);
			l.cust.push(missions[i][6][j][1]);
		}
		rec.levels.push(l);
	}
	
	var f1 = function (evt) {
		 
		 var itemId = this.getAttribute("idgroup");
		 var missionIdx = this.getAttribute("iditem");
		 var levelId = this.getAttribute("idlevel");
		 
		 $("#selectMissionBoard").empty();
		 
		 MyBlocklyApps.hideDialog(true);
		 SelectMission.stopAnimation = true;

		 Game.missionSelected(itemId, levelId, missionIdx);
		 
	};
	
	var f2 = function(i) {
		
    	var imgs = generateImages(i, 2);
		var html = $.each(imgs, function(i){
			   imgs[i] = "<img src='images/bb"+this+"' width='16' height='16'/>";
		         });
		
		return html;
	};
	
	var f3 = function(i, j, m) {
		if (data[i].levels[j].repeateable.indexOf(m) > -1) // repeateable missions never are enabled
			return false;
		
		var ma = parseInt((data[i].levels[j].lastAllAchieved?data[i].levels[j].howManyItemsAchieved:"-1"));
		var mt = ma + 1;
		
		return m < mt;
	};
	
	var f4 = function(i, j, m) {
		var idx = data[i].levels[j].repeateable.indexOf(m);
		var ma = parseInt((data[i].levels[j].lastAllAchieved?data[i].levels[j].howManyItemsAchieved:"-1"));
		var mt = ma + 1;
		return (idx == -1 && m == mt) || (idx > -1 && m <= mt);
	};
	

	var sel = new Selector(data, 50, 385, 250, "unlockBack", "lockBack", "bbtabs",  "bbtab", f1, f2, f3, f4);
	return sel.build();
	
};

SelectMission.blinkTarget = function () {
	if (SelectMission.stopAnimation) return;
	
	$('.missionTargetFlat').addClass('missionTargetBlind').removeClass('missionTargetFlat');
	window.setTimeout(SelectMission.unblinkTarget, 700);
	
};

SelectMission.unblinkTarget = function () {
	if (SelectMission.stopAnimation) return;
	
	$('.missionTargetBlind').addClass('missionTargetFlat').removeClass('missionTargetBlind');
	window.setTimeout(SelectMission.blinkTarget, 700);
	
};