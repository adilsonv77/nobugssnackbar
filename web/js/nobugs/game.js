/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://github.com/adilsonv77/nobugssnackbar/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "ASnext IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This code was started based on Mazed application
 * 
 * @fileoverview Game management for NoBugs Snack Bar application.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Game = {};

Game.runningStatus = 0;
Game.howManyRuns = 0; // in this mission
Game.loadingMission = false;

var hero;
Game.mission = null;

Game.hideHints = true;

/**
 * PID of animation task currently executing.
 */
Game.pidList = [];


Game.globalMoney;
Game.globalXP;

Game.lastErrorData;
Game.jsInterpreter;

Game.variableBox = null;
Game.tipBox = null;

Game.DOWN = 1;
Game.RIGHT = 2;
Game.varWindow = Game.RIGHT;

Game.counterInstruction = null;

Game.callTimes = {};

PreloadImgs.put('fundo', 'images/fundo_new.png');
PreloadImgs.put('doors', 'images/door_new.png');

Game.useCodeEditor = false;
Game.editor = null;
Game.clickReseting = false;

Game.generalInit = function() {
	
	  BlocklyApps.init();
		
	  NoBugsJavaScript.redefine();
	  
	  Game.rtl = BlocklyApps.isRtl(); // Right-To-Left language. I keep this, but it's not our initial intention
	    
	  Game.optResize = {
		blocklyDivW: 600,
		blocklyDivH: "90%",
		varBoxT: true,
		varBoxH: "90%"
	  };
	  
	  // window.removeEventListener('resize',  Game.resizeMainWindow); //
	  Blockly.Generator.prototype.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
	  // I remove this because in this game the player notes this problem !!! 
	  // Blockly.JavaScript.INFINITE_LOOP_TRAP = 'highlightBlock(%1);\n';
	  
	  // Add to reserved word list: API, local variables in execution environment
	  // (execute) and the infinite loop detection function.
	  Blockly.JavaScript.addReservedWords('Game, code, NoBugsJavaScript');
	  
	  BlocklyApps.bindClick('selectMissionLogoffButton', Game.logoffButtonClick);
	  BlocklyApps.bindClick('selectMissionLogoffButtonIntoMission', Game.intoTheMissionLogoffButtonClick);

	  Game.tracks = [];
	  Game.tracks[0] = new PlayAudio(["music/bensound-buddy.mp3"]);
	  Game.tracks[1] = new PlayAudio(["music/bensound-energy.mp3"]);
	  Game.tracks[2] = new PlayAudio(["music/di-evantile_savage-law.mp3"]);
	  
	  Game.tracks[3] = new PlayAudio(["music/Carefree.mp3", "music/Wallpaper.mp3", "music/bensound-cute.mp3"]);
	  Game.tracks[3].shuffle();
	  
      PreloadImgs.loadImgs(function() {
    	  
          // It's draw so early because it appears fast after load the mission 
          Game.ctxDisplay = document.getElementById('display').getContext('2d');
          Game.tempDisplay = document.getElementById('displayTemp');
          Game.tempCtxDisplay = Game.tempDisplay.getContext('2d');
          
          Game.imgBackground = PreloadImgs.get("fundo");	
          Game.ctxDisplay.drawImage( Game.imgBackground, 0 , 0 );
          
          Blockly.BlockSvg.Game = Game;
          
          AvatarImgMaker.init();
          
          Game.init();

      });
	  
};

/**
 * Initialize Blockly and SnackBar. Called on page load.
 */
Game.init = function() {
	
	Game.currTime = 0;

    // if there is some event added in before execution, than remove it
    window.removeEventListener('resize',  Game.resizeMainWindow);
    window.removeEventListener('keydown',  Game.keyDown);
    window.removeEventListener('keyup',  Game.keyUp);

    document.removeEventListener('keydown', MyBlocklyApps.onKeyDown_, false);
    
    window.addEventListener('resize',  Game.resizeMainWindow);
    window.addEventListener('keydown',  Game.keyDown);
    window.addEventListener('keyup',  Game.keyUp);
    
	Game.CTRLPRESSED = false;
	Game.SHIFTPRESSED = false;
	Game.blocksSelected = [];
	Game.lastDeletedBlocks = [];

	// if the user's key is stored in cookies, then the system will not show the login dialog
    UserControl.verifyLogged(function(ret) {
    	
		if (ret[0]) {
			
			Game.renderQuestionnaire(ret[1], ret[2], ret[3], ret[4], ret[5], ret[6], ret[7], ret[8], ret[9], ret[10], ret[11], ret[12]);
			
		} else {
			window.removeEventListener('beforeunload', Game.unload);

  		    document.getElementById("mainBody").style.display = "none";
  		    document.getElementById("selectMission").style.display = "none";
  		    
		    document.getElementById("initialBackground").style.display = "inline";
		    Game.resizeMainWindow();
		    
		}
	});


};

window.addEventListener('load', Game.generalInit);

Game.resizeMainWindow = function() {
	/*
	var lu = document.getElementById("loginuser");
    document.getElementById("errorLogin").style.left = lu.offsetLeft + "px";
    document.getElementById("suporte").style.left = (document.getElementById("suporte").clientWidth -
    														document.getElementById("suportespan").offsetWidth - 10) + "px";
    */
  //  document.getElementById("logoDevelopedBy").style.top = $("#logoSponsoredBy").position().top + "px";

   // $("#tbSelectMission").css("width", ($("#topInfoTable")[0].clientWidth-150) + "px");

};

Game.keyDown = function(evt) {
	Game.CTRLPRESSED = evt.ctrlKey;
	Game.SHIFTPRESSED = evt.shiftKey;
};

Game.keyUp = function(evt) {
	Game.CTRLPRESSED = false;
	Game.SHIFTPRESSED = false;
};

Game.login = function() {
	
	document.getElementById('ButtonLogin').disabled = "disabled";
	
	var user = document.getElementById('loginuser').value;
	var passw = document.getElementById('loginpassw').value;
	
    UserControl.login(user, passw, 
		  function(ret) {
    		document.getElementById('ButtonLogin').disabled = "";
			var error = document.getElementById("errorLogin");

			if (ret[0] == null) {
				
	  			document.getElementById('loginuser').value = "";
	  			document.getElementById('loginpassw').value = "";
	  			
	  			error.innerHTML = "";
	  			
  				Game.renderQuestionnaire(ret[1], ret[2], ret[3], ret[4], ret[5], ret[6], ret[7], ret[8]);
	  			
	  				  			
	  		} else {
	  			error.innerHTML = BlocklyApps.getMsg(ret[0]);
	  		}
  		  }
    );
};

Game.renderQuestionnaire = function(u, missionsHistorical, leaderBoard, avatar, xpToHat, xpToClothes, xpToSpecialSkin, xpToAdd, clazzId, levelId, missionIdx, missionView) {
	/*
	 * missionsHistorical [...][n], where n are 
	 *   0 - class name
	 *   1 - level name
	 *   2 - how many missions
	 *   3 - how many solved missions
	 *   4 - class id
	 *   5 - level id
	 *   6 - missions that can be replayed []
	 */
	/*
	 * leaderBoard [...][n], where n are
	 *   0 - userid
	 *   1 - username
	 *   2 - money
	 *   3 - time spent
	 *   4 - executions
	 *   5 - max mission accomplished 
	 *   ----
	 *   0 - null, means that the user can't see the leaderboard. Then the parameter 1 has the minimum mission accomplished for this user see it.
	 */
	Game.loginData = {userLogged: u, doingLogoff: false, missionHist: missionsHistorical, leaderBoard: leaderBoard, avatar: avatar,
					     clazzId: clazzId, levelId:levelId , missionIdx:missionIdx, missionView: missionView, xpToHat:parseInt(xpToHat), xpToClothes:parseInt(xpToClothes),
					     xpToSpecialSkin:parseInt(xpToSpecialSkin), xpToAdd:parseInt(xpToAdd) };
	
	AvatarImgMaker.configGender(Game.loginData.userLogged.sex);
	
	try {
		UserControl.retrieveQuestionnaire(function(q) {
			if (q != null) {
				
				if (!Game.showQuestionnaire(q))
					Game.continueLoginProcess();
				
			} else {
				Game.continueLoginProcess();
			}
			
		});
	} catch (ex) {
		Game.init();
	};
};

Game.showQuestionnaire = function(q) {
	
	var formQuestionnaire = Questionnaire.createForm(q);
	if (formQuestionnaire != null) {
		
		$("#contentQuestionnaire").html("");
		$("#contentQuestionnaire").append(formQuestionnaire);
		
		MyBlocklyApps.showDialog(document.getElementById("dialogQuestionnaire"), null, false, true, true, 
				$("#questionnaire").get(0).firstChild.data, null, null);
		
	} 
	
	return formQuestionnaire != null;
};

Game.finishQuestionnaire = function() {

	var consistido = Questionnaire.consistQuestionnaire();
	
	if (consistido) {
		
		Questionnaire.handlingQuestionnaire(function(saveAnswers) {
			UserControl.saveQuestionnaire(saveAnswers);
		});
		
		MyBlocklyApps.hideDialog(false);

		Game.continueLoginProcess();
	}
};

Game.continueLoginProcess = function() {
	try {
		UserControl.loadTests(function(t) {
			if (t != null) {
				
				if (!Game.showTests(t[0], t[1]))
					Game.continueLoginProcessEx();
				
			} else {
				Game.continueLoginProcessEx();
			}
			
		});
	} catch (ex) {
		Game.init();
	};
	
};

Game.showTests = function(currentTest, nextTest) {
	
	var formTest = Tests.createForm(currentTest);

	Game.afterTestDialog = {};
	Game.afterTestDialog.nextTest = nextTest;
	Game.afterTestDialog.f = null;
	
	if (formTest != null) {
		
		$("#contentTest").html("");
		$("#contentTest").append(formTest);
		
		
		Game.afterTestDialog.f = function() {
			
			if (!Game.loginData.doingLogoff)
				if (Game.afterTestDialog.nextTest != null) {
					if (!Game.showTests(Game.afterTestDialog.nextTest, null)) {
						Game.continueLoginProcessEx();
					}
				} else
					Game.continueLoginProcessEx();
		};
		
		MyBlocklyApps.showDialog(document.getElementById("dialogTest"), null, false, true, true, 
				"Ganhe b&ocirc;nus", {width: "100%", height: "100%"}, Game.afterTestDialog.f);
		
	} 
	
	return formTest != null;
	
};

Game.continueLoginProcessEx = function() {
	if (Game.loginData.userLogged.lastTime == null) {
		
		IntroGame.start();
		
	} else 
		Game.logged();
	
};

Game.logged = function() {
	
	
	$("#playerNameInMission").html(Game.loginData.userLogged.name);

	if (Game.loginData.clazzId == undefined || Game.loginData.clazzId == 0) {

		AvatarEditor.init(); 

		UserControl.retrieveReward(Game.updatesReward);

		$("#playerName").html(Game.loginData.userLogged.name);
		$("#avatarEditor_playerName").html(Game.loginData.userLogged.name);
		
		Game.drawMiniAvatar();
		UserControl.updateUserLastTime();
		
		if (Game.variableBox != null)
			Game.variableBox.style.display = "none";
		
		if (Game.tipBox != null)
			Game.tipBox.style.display = "none";

		// this is necessary when unloads
		window.removeEventListener('beforeunload', Game.unload);

		document.getElementById("mainBody").style.display = "none";
	    document.getElementById("initialBackground").style.display = "none";
	    document.getElementById("selectMission").style.display = "inline";
	    
	  //  $("#tbSelectMission").css("width", ($("#topInfoTable")[0].clientWidth-150) + "px");

	    Game.resizeMainWindow();
	    
	    BlocklyApps.bindClick('avatarEditorButton', Game.openAvatarEditor);
	    BlocklyApps.bindClick('profileEditorButton', Game.openProfileEditor);
	    BlocklyApps.bindClick('achievementsButton', Game.openAchievementList);
	    BlocklyApps.bindClick('infotabButton', Game.openInfoTab);
	    
	    CityMap.init({onclick: Game.cityClick});
	    
	    Game.createsLeaderboard();
	    
	    CityMap.startAnimation();

	    if (Game.loginData.userLogged.lastTime == null) {
	    	
		    IntroGame.presentTeacher(function() {
		    	IntroGame.focusAvatar();
		    });
	    } else
	    	if (Game.loginData.userLogged.mail == null && parseInt(Game.loginData.missionHist[0][3]) > 4) { {}
	    		$("#profile_mail").attr("placeHolder", BlocklyApps.getMsg("Profile_PlaceHolder"));
	    		Game.openProfileEditor();
	    	}
	} else {
		Game.missionSelected(Game.loginData.clazzId, Game.loginData.levelId, Game.loginData.missionIdx, Game.loginData.missionView);
	}
};

Game.openInfoTab = function() {
	var display = $("#explaintr").css("display");
	if (display == "none"){
		$("#explaintr").css("display", "table-row");
		$("#imgInfoTab").attr("src", "images/iconlessinfo.png");
	} else {
		$("#explaintr").css("display", "none");
		$("#imgInfoTab").attr("src", "images/iconmoreinfo.png");
	}
};

Game.createsLeaderboard = function() {
	
	if (Game.loginData.leaderBoard.length > 0 && Game.loginData.leaderBoard[0][0] == null) 
		createNoLeaderBoardInfo();
	else
		createsLeaderBoard();
	
};


Game.updatesReward = function(ret) {
	  document.getElementById("yourXP").innerHTML = ret[0];
	  document.getElementById("yourCash").innerHTML = ret[1];
	  
	  document.getElementById("yourXPInMission").innerHTML = ret[0];
	  document.getElementById("yourCashInMission").innerHTML = ret[1];
	  
	  Game.globalXP = parseInt(ret[0]);
	  Game.globalMoney = parseInt(ret[1]);
};

Game.cityClick = function() {
	if (Game.loginData.userLogged.lastTime == null) {
		IntroGame.closeBeforeCity();
	}
	SelectMission.generateBoard();	
};


Game.drawMiniAvatar = function() {
	
	$("#avatarPlayer").css("width", "100%");
	AvatarImgMaker.createBody(
			           document.getElementById("avatarPlayer").getContext("2d"), 
			           Game.loginData.avatar, 
			           288, 464);
	// the best approach to resize images, instead streatching images 
	$("#avatarPlayer").css("width", "72px");
	
};

Game.openAvatarEditor = function(event, fAfterClose) {
	
	var clothes = "", coatColor = "", scarfColor = "", eyes = "", skin = "", hat = "", hatColor = "", add = "", addColor = "";
	
	Game.loginData.avatar.forEach(function(entry) {
		
		switch (entry[0]) {
			case "clothes":
				clothes = entry[1];
				coatColor = entry[2];
				scarfColor = entry[3];
				break;
				
			case "skin":
				skin = entry[2];
				break;
				
			case "hat":
				hat = entry[1];
				hatColor = entry[2];
				break;
				
			case "add":
				add = entry[1];
				addColor = entry[2];
				break;
			case "mouth":
				break;
			
			default:
				eyes = entry[2];
		}
	});
	
	var myXp = parseInt(document.getElementById("yourXP").innerHTML);
	
	var sHat = (myXp < Game.loginData.xpToHat? "blocked:"+Game.loginData.xpToHat+":" : "") + hat;
	var sClothes = (myXp < Game.loginData.xpToClothes? "blocked:"+Game.loginData.xpToClothes+":" : "") + clothes;
	var sSkin = (myXp < Game.loginData.xpToSpecialSkin? "blocked:"+Game.loginData.xpToSpecialSkin+":" : "") + skin; 
	
	var sAdd = (myXp < Game.loginData.xpToAdd ? "blocked:"+Game.loginData.xpToAdd+":" : "") + add;

	AvatarEditor.show(sClothes , coatColor, scarfColor, sSkin, eyes, sHat, hatColor, sAdd, addColor, fAfterClose);
};

Game.openProfileEditor = function() {
	
	var u = Game.loginData.userLogged;
	
	$("#profile_user_nick").html(u.nick);
	$("#profile_user_name").html(u.name);
	$("input[name=profile_user_mail]").val(u.mail);

	$("input[name=profile_user_password]").val("");
	$("input[name=profile_user_retypepassword]").val("");
	$('#profile_user_checkbox').attr('checked', false);

	$("input[name=profile_user_password]").attr("disabled", "disabled");
	$("input[name=profile_user_retypepassword]").attr("disabled",  "disabled");
	$("#profile_user_save").removeAttr("disabled");
	$("#popenMissionrofileErrorRetypePassw").html("");
	
	MyBlocklyApps.showDialog(document.getElementById("dialogEditProfile"), null, false, true, true, 
			$("#profileEditorButton").html(), {width:"700px"}, function() {$("#profile_mail").attr("placeHolder", "");});
	
};

Game.openAchievementList = function() {
	
	var achieveWindow = new AchievementWindow();
	achieveWindow.show();
	
};

Game.enablePasswordFields = function() {
	
	if ($("#profile_user_checkbox").is(':checked')) {
	
		$("input[name=profile_user_password]").removeAttr("disabled");
		$("input[name=profile_user_retypepassword]").removeAttr("disabled");
		
		
		Game.verifyRetypePassword();
	}
	else {
		
		$("input[name=profile_user_password]").attr("disabled", "disabled");
		$("input[name=profile_user_retypepassword]").attr("disabled",  "disabled");
		$("#profile_user_save").removeAttr("disabled");
		$("#profileErrorRetypePassw").html("");
	}
	
};

Game.verifyRetypePassword = function() {
	if ($("input[name=profile_user_password]").val().trim() !== "" && 
			$("input[name=profile_user_password]").val() === $("input[name=profile_user_retypepassword]").val()) {
	
		$("#profileErrorRetypePassw").html("");
		$("#profile_user_save").removeAttr("disabled");
	
	} else {
		
		$("#profileErrorRetypePassw").html(BlocklyApps.getMsg("Profile_WrongPassword"));
		$("#profile_user_save").attr("disabled", "disabled");
		
	}
};

Game.saveProfile = function() {
	
	var u = Game.loginData.userLogged;
	var newPassw = null;
	
	u.mail = $("input[name=profile_user_mail]").val();
	if ($("#profile_user_checkbox").is(':checked'))
		newPassw = $("input[name=profile_user_password]").val().trim();
	
	UserControl.changeUser(u.mail, newPassw);
	
	MyBlocklyApps.hideDialog(false);
	
};

Game.moveBlocksToZero = function() {
	
	var blocks = Blockly.mainWorkspace.getTopBlocks();
	for (var i=0; i<blocks.length; i++){
		blocks[i].moveBy(0, 0);
	}	
	
};

Game.nextMission = function(clazzId, levelId, missionIdx, missionView) {
	var finishedMission = clazzId == undefined;
	if (finishedMission) {
		
		if (Game.loginData.missionIdx == Game.loginData.missionHist[Game.loginData.levelId-1][2]) {
			
			Game.goBackToDashboard(null, false);
			Game.init();
			
			return;
			
		}
		 
		clazzId = Game.loginData.clazzId;
		levelId = Game.loginData.levelId;
		missionIdx = Game.loginData.missionIdx+1;
		missionView = false;
		Game.loginData.missionHist[levelId-1][3]++;
	}
	
	Game.missionSelection.dispose();
	
	var ret = Game.closeBlockEditorStuffs();
	Game.editor.dispose();
	
	if (!finishedMission)
		Game.exitMission(ret[0], ret[1]);
	
	Game.missionSelected(clazzId, levelId, missionIdx, missionView);

};

Game.missionSelected = function(clazzId, levelId, missionIdx, missionView) {
	
  Game.loadingMission = true;
  
  Game.loginData.clazzId = parseInt(clazzId);
  Game.loginData.levelId = parseInt(levelId);
  Game.loginData.missionIdx = parseInt(missionIdx);

  document.getElementById("initialBackground").style.display = "none";
  document.getElementById("selectMission").style.display = "none";

  CityMap.stopAnimation();

  $("#playerRewardMission").css("display", "none");
	
  document.getElementById("mainBody").style.display = "inline";
  
  if (Game.loginData.userLogged.showSound) {

	  $("#musicControl").css("display", "inline");
      CountXP.times = undefined; // reset this attribute
	  Game.changeMusicControlButton( !(Game.loginData.userLogged.flags.MUSIC_DISABLED === "true") );
 
  } else
   	  $("#musicControl").css("display", "none");
	  
  if (Game.counterInstruction != null) {
	  mainBody.removeChild(Game.counterInstruction);
	  Game.counterInstruction = null;
  }
	  			
  Game.removeChangeListeners();

  window.addEventListener('scroll', Game.scrollEvent);  
  window.addEventListener('resize',  Game.resizeWindow);

  window.addEventListener('beforeunload', Game.unload);
 
  Game.slider = {};
  Game.slider.svg = document.getElementById('slider');
  Game.slider.svg.style.visibility = "hidden";
  
  if (Game.speedSlider == undefined)
	  Game.speedSlider = new Slider(10, 20, 130, Game.slider.svg);

  Game.variableBox = document.getElementById('variableBox');
  Game.tipBox = document.getElementById('tipBox');
  
  CountXP.init("stopWatch", !missionView);
  
  Game.imgDoor = PreloadImgs.get("doors");
  
  Game.lastErrorData = new Object();
  Game.lastErrorData.iderror = 0;
  Game.lastErrorData.message = "";
  Game.lastErrorData.block = null;
  
//  var mid = BlocklyApps.getMsg("_mission") + " " + levelId + "/" + missionIdx;
  $("#missionIdentification").html(Game.loginData.missionHist[parseInt(levelId)-1][1]);

  Game.missionSelection = new MissionSelection(levelId);
  
  try {
	  UserControl.loadMission(clazzId, levelId, missionIdx, Game.missionLoaded);
  } catch (ex) {
	  Game.init();
  }

};

Game.unload = function(e) {

  	LogClick.save(false); // after performs the method, it is allowed to continue

	Game.saveMission();
	
    return null;
};

Game.workspaceAnswer = function() {
	var answer = "<xml></xml>";
	if (Blockly.mainWorkspace != null) {
		answer = "<answers>" + Game.editor.getXmlValue() + "</answers>";
	}
	
	return answer;
	
};

Game.getTimeSpend = function() {
	
	var timeSpent = 0;
	if (Game.currTime != 0)
		timeSpent = Math.floor(((new Date().getTime()) - Game.currTime)/1000);
	return timeSpent;
};

Game.saveMission = function() {
	
	if (Game.missionView) // it's when the user achieved this mission, but came back to test or see something. 
		return;
	
	var answer = Game.workspaceAnswer();
	var timeSpent = Game.getTimeSpend();
	
	UserControl.saveMission(0, 0, timeSpent, Game.howManyRuns, false, Game.runningStatus, (Blockly.mainWorkspace?Blockly.getMainWorkspace().scale:1), answer,
			{callback:function() {}, async:false});
	
	Game.currTime = new Date().getTime();
	
};

Game.missionLoaded = function(ret){
  Game.showedWindowRunDisabled = false;
	  
  Game.howManyRuns = parseInt(ret[4]);
  Game.previousCode = ret[2];
  Game.zoomLevel = parseFloat(ret[5]);
  Game.missionView = ret[6] === "T"; // it's an achieved mission
	
  var xml = ret[1];
  var mission = transformStrToXml(xml);
  
  Game.missionType = mission.getElementsByTagName("objectives")[0].getAttribute("missionType");
  if (Game.missionType == null)
	  Game.missionType = "createsFromScracth";
  
  Blockly.Blocks['controls_if'].useMutator = !(mission.childNodes[0].getAttribute("useIfMutator") === "false"); 
	  
  var t = BlocklyApps.getMsg("_mission");
  Game.missionTitle =  t.charAt(0).toUpperCase() + t.substring(1) + " " + ret[0];
	
  if (!Game.loginData.userLogged.showInstruction ||
		  mission.getElementsByTagName("explanation")[0].getAttribute("hasInstruction") === "false") {
	  $("#instructionButton").css("display", "none");
  } else
	  $("#instructionButton").css("display", "inline");
  
  Game.openMission = {};
  Game.openMission.open = mission.childNodes[0].getAttribute("open") != null && mission.childNodes[0].getAttribute("open") === "true";

  Game.pointsInThisMission =  mission.childNodes[0].getAttribute("points") == null || mission.childNodes[0].getAttribute("points") === "true";
  if (!Game.pointsInThisMission)
	  CountXP.init("stopWatch", false);
  
  Game.missionFinishable = mission.childNodes[0].getAttribute("finishable") == null || mission.childNodes[0].getAttribute("finishable") === "true";
  
  Game.globalMoney = 0;
  Game.globalXP = 0;

  Game.timeSpent = (ret[3] == null?0:parseInt(ret[3]));

  //$("#playerRewardMission").css("box-shadow","");
  UserControl.retrieveReward(Game.updatesReward);
  
  Game.wizardFreeContent = mission.childNodes[0].getElementsByTagName("help");
  if (Game.missionView || Game.wizardFreeContent.length == 0) {
	  
	  $("#wizardFreeButton").css("display", "none");
	  $("#wizardPayButton").css("display", "none");
	  
  } else {
	  
	  $("#wizardFreeButton").css("display", "inline");
	//  $("#wizardPayButton").css("display", "inline");
	  
	  Game.wizardPayContent = mission.childNodes[0].getElementsByTagName("solution");
	  
  }
  
  Game.slider.timesBefore = 0;
  
  var slider = mission.childNodes[0].getElementsByTagName("slider");
  if (slider.length > 0) {
	  Game.slider.timesBefore = parseInt(slider[0].getAttribute("timesBefore"));
  }
  // if the slider is not loaded in the begin, then the hint show it 
  if (Game.howManyRuns >= Game.slider.timesBefore) {
	  Game.slider.svg.style.visibility = "visible";
  }
  
  var commands = mission.childNodes[0].getElementsByTagName("commands")[0];
  
  var toolbox = nobugspage.toolbox(null, null, 
		  {enabled: Explanation.selectCommands(commands)}); // xml definition of the available commands
  
  Game.toolbox = toolbox;
  var hasFunction = commands.innerHTML.indexOf('name="function"') > -1;

  //Game.useCodeEditor = true; /// essa informacao deveria vir do servidor
  Game.editor = (Game.useCodeEditor?new CodeEditor():(hasFunction?new MultiBlockEditor():new BlocklyEditor("blockly", 0))); 

  var hasTable = commands.innerHTML.indexOf('name="array"') > -1;
  
  Game.redimDiv = Game.editor.editArea;
  
  var objectives = mission.childNodes[0].getElementsByTagName("objectives")[0];
  Game.verifyButtons(objectives);
  
  hero = new SnackMan(hasTable, objectives, mission, Game.loginData.avatar);
  
  Game.onObjectiveAccomplished([0, hero.objective.objectives.length]);
  
  hero.addListener("ObjectiveAccomplished", Game);
  
  var byTime = true;
  var cfg = {};
  var xpIndiv;
  cfg.freeWizardConsumed = ret[7] === "T";
  if (objectives.getAttribute("noXP") == null) {
	  
	  if (hero.objective.xpTotalRun == null) {
		  cfg = {aFraction: hero.objective.xpTotalTime/3, current: Game.timeSpent };
	  } else {
		  byTime = false;
		  cfg = {aFraction: hero.objective.xpTotalRun/3, current: Game.howManyRuns };
	  }
	  
	  if (Game.missionType === "fixBugs")
		  cfg.current--;
	  
	  xpIndiv = hero.objective.xpIndividual;
  } else {
	  byTime = false;
	  cfg = {aFraction: hero.objective.xpFinal, current: 3};
	  xpIndiv = hero.objective.xpFinal;
	  cfg.freeWizardConsumed = false;
  }
  
  $("#playerRewardMission").css("display", (Game.missionView || !Game.pointsInThisMission?"none":"inline"));
  CountXP.config(byTime, cfg,
		         xpIndiv, hero.objective.xpFinal,
		         Game.changeStars, true, null, 
		         objectives.getAttribute("noXP") );
  
  Game.noXP = objectives.getAttribute("noXP") !== null;
  Game.mission = mission;

  Game.assignIngrid(); // I mustn't remove this line. The variable window seems ugly
  
  Game.installMachines(toolbox);
};

Game.assignIngrid = function() {
	  
	  var th = $("#variableBox .move-header")[0].clientHeight;
	  var h = (Game.variableBox.clientHeight-th);
	
	  $("#vars").ingrid({height: h, paging: false, sorting: false,
			  gridClass: 'varsgrid',
			  headerClass: 'varsgrid-header',
			  colClasses:['varsgrid-col0', ''],
			  //colWidths: [100, 100],
			  resizableCols: false,
			  ingridIDPrefix: '_varsgrid',
			  ingridBaseClass: 'basevarsgrid'});
	  // a bug in ingrid
	  $("div[class=varsgrid-header]").css("display", "none");

};  

Game.blinkPlayerReward = function() {
	
	var stop = Game.blinkPlayerStop;
	
	if (!stop && Game.blinkPlayerRewardTimes % 2 === 0)
		$("#playerRewardMission").css("box-shadow", "inset 0 0 100px 100px #ffd89d");
	else
		$("#playerRewardMission").css("box-shadow","");
	
	Game.blinkPlayerRewardTimes++;
	if (!stop && Game.blinkPlayerRewardTimes < 10)
		window.setTimeout(Game.blinkPlayerReward, 500);
	else
		CountXP.updateStars(); 
	
	Game.blinkPlayerStop = false;
};

Game.changeStars = function(starNumber) {
	
	if (!CountXP.starting) {

		Game.blinkPlayerStop = false;
		
		var f = Game.blinkPlayerReward;
		Game.blinkPlayerRewardTimes = 0;
		window.setTimeout(f, 500);
	}
	
	if (Game.loginData.userLogged.flags.MUSIC_DISABLED === "true" || Game.loginData.userLogged.showSound == false)
		return;

 	if (starNumber > 0)
 		Game.tracks[starNumber-1].stop();
 
 	Game.tracks[starNumber].play();
};

Game.afterInstallMachines = function(toolbox) {

  var mission = Game.mission;
  if (Game.previousCode != null) // the user try this mission before, than load the previous code
	  Game.nextPartOfMissionLoaded(false, toolbox, Game.previousCode, mission, Game.timeSpent);
  else {
	  var sourceXML = mission.childNodes[0].getElementsByTagName("answers")[0];
	  if (sourceXML == null) {
		  sourceXML = mission.childNodes[0].getElementsByTagName("xml")[0];
	  } 

	  var preload = sourceXML.getAttribute("preload");
	  if (preload != null) {
		  UserControl.loadAnswer(preload, function (ret) {
			  if (ret != null)
				  ret = ret.replace(/deletable="false"/g, ""); // remove all deletable attribute from code of previous mission
			  else
				  ret = "<xml></xml>";
			  Game.nextPartOfMissionLoaded(true, toolbox, ret, mission, 0);
		  });
	  }
	  else {
		  var outerHTML = sourceXML.outerHTML || (new XMLSerializer()).serializeToString(sourceXML);
		  Game.nextPartOfMissionLoaded(true, toolbox, outerHTML, mission, 0);
	  }
  }
  
  // release memory 
  Game.previousCode = null;
  Game.timeSpent = null;
};

Game.installMachines = function(toolbox) {
	UserControl.loadMachinesFromUser(function(ret) {

		for (var i = 0; i < ret.length; i++) {
			
			var k = "machine" + ret[i][0];
			var imgsrc = "images/" + k + ".png";
			PreloadImgs.put(k, imgsrc, true);
			
			hero.installMachine(ret[i][0], ret[i][1], ret[i][2], ret[i][3], ret[i][4], ret[i][5], ret[i][6], ret[i][7], ret[i][8], k, ret[i][9], ret[i][10]);
		}
		
		if (ret.length > 0) {
			toolbox = Game.loadToolBoxWithMachines(toolbox);
			var selectedMachines = Game.mission.childNodes[0].getElementsByTagName("selectMachine");
			if (selectedMachines.length > 0) {

				var machines = selectedMachines[0].children;
				if (ret.length == machines.length) {

					Game.enabledBuy = false;
					Game.disableButton('buyButton');
					
				}
				
				if (hero.installedMachines.length == 1) { // reduce a half the slider capacity
					Game.speedSlider.setValue(1);
					Game.speedMultFactor = 125; 
				}
				Game.slider.svg.style.visibility = "visible";
				
			}
			
		}
			
	    Game.afterInstallMachines(toolbox);

	});	
};

Game.loadToolBoxWithMachines = function(toolbox) {
	var yourMachines = BlocklyApps.getMsg("Apps_catYourMachines");
	
	var s = '<category name="' + yourMachines + '">';
	for (var i = 0; i < hero.extendedCommands.length; i++) {
		s = s + '<block type="'+ hero.extendedCommands[i].name + '"/>';
	}
	s = s + '</category></xml>';
	
	return toolbox.replace('</xml>', s);
	
};
  
Game.buyButtonClick = function() {
	
	Game.saveMission();
    var selectMachine = Game.mission.childNodes[0].getElementsByTagName("selectMachine")[0];
    Game.selectMachine(selectMachine);
    
};

Game.selectMachine = function(selectMachineOpts) {
	
	Game.machines = [];
	Game.loadMachines(selectMachineOpts, 0);
};

Game.continueSelectMachine = function() {
	var data = [];
	var rec = {group: "", groupId: 1, levels:[]};
	data.push(rec);
	
	var l = {name: BlocklyApps.getMsg("Text_Equipments"), id: "x", howManyItems: Game.machines.length, howManyItemsAchieved:-1};
	rec.levels.push(l);
	
	var f1 = function(evt) {
		
		if (Game.selectedMachine != null) {
			Game.selectedMachine.style.backgroundColor = "#7777DD";
		}
		Game.selectedMachine = this;

		this.style.backgroundColor = "#FFB347";
		
		$('#BuyMachine').removeAttr("disabled");
	};
	
	var f2 = function(i) {
		
		i--;
		
		var k = "machinecom" + Game.machines[i].id;
		var imgsrc = 'images/' + k + '.png';
		PreloadImgs.put(k, imgsrc, true);

		
		var t = "";
		UserControl.getMessage(Game.machines[i].name, BlocklyApps.LANG, {callback:function(msgret) {t = msgret;}, async:false});
		
		return "<img src='" + imgsrc + "'/> <br/> " + t + "<br/>"+Game.machines[i].cust+" <img style='vertical-align:middle' src='images/coin2.png'/>";
			
	};
	
	var f3 = function(i, j, m) {
		return false;
	};
	
	var f4 = function(i, j, m) {
		return Game.globalMoney >= Game.machines[m-1].cust;
	};
	
	var sel = new Selector(data, 1, 180, null, null, null, f1, f2, f3, f4);
	var selBuilt = sel.build();

	$('#tt0').tabs({ // selBuilt
	    width: "auto",
	    height: "auto"
	});
	
	var content = $("<div/>")
			.append($("#" + selBuilt))
			.append(nobugspage.buyButton(null, null, null));
			
	//PreloadImgs.loadImgs();
	
	MyBlocklyApps.showDialog(content[0], null, false, true, true,
		BlocklyApps.getMsg("Text_AddNewEquipment"), null, 
		function() { 
			$("#" + selBuilt).remove();
	    	 
		});

	$('#tt0').tabs("resize");
};

Game.loadMachines = function(selectMachineOpts, idx) {
	
	var type = selectMachineOpts.children[idx].getAttribute("type");
	UserControl.loadMachine(type, function(ret){
		Game.machines.push({id: type, name: ret[0], cust: ret[1]});
		
		idx++;
		if (idx < selectMachineOpts.children.length) {
			Game.loadMachines(selectMachineOpts, idx);
		} else {
			Game.selectedMachine = null;

			UserControl.listMachinesFromUser(function(ret2) {

				for (var i = Game.machines.length - 1; i>=0; i--) {
					
					if (ret2.indexOf(Game.machines[i].id) >= 0)
						Game.machines.splice(i, 1);
				}
				
				Game.continueSelectMachine();
			});

		}
	});
	
};

Game.nextPartOfMissionLoaded = function(firstTime, toolbox, answer, mission, timeSpent) {
	
  Game.resizeWindow(); // this line fixes the blockly size and position. This avoid some "flicks" when reload the page
 
  Game.speedSlider.setValue(0.5);
  Game.speedMultFactor = 0;
    
  var cfg = { media: "media/",
	       rtl: Game.rtl,
	       trashcan: true,
	       comments: false,
	       scrollbars: true,
	       toolbox: toolbox,

	       zoom:
	         {enabled: true,
	          controls: true,
	          wheel: true,
	          maxScale: 2,
	          minScale: .1,
	          scaleSpeed: 1.1
	         }};

  Game.selectedTab = "";
  Game.editor.initialize(cfg); 
  Game.editor.backgroundColor(Game.missionType === "fixBugs"?"#F5DAD4":"#FFF");
  Game.editor.addCommands(toolbox);

  Game.editor.zoom();

  document.removeEventListener('keydown', Blockly.onKeyDown_, false);
  Blockly.bindEvent_(document, 'keydown', null, MyBlocklyApps.onKeyDown_);
	
  Game.firstTime = firstTime;
  
  var loginLoaded = function(data) {
	  
	  var xml_ = transformStrToXml(answer);
	  
	  var root = xml_.firstElementChild;
	  
	  if (root.localName === "xml") {
		// the old version
		  // in march delete this if block
		  
		  Game.editor.loadCode(answer);
		  /*
		  var xml = Blockly.Xml.textToDom(answer);
		  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
		  Game.moveBlocks();
		  */
	  } else {
		  
		  var c = root.firstElementChild;
		  while (c != null) {
			  
			  var id = parseInt(c.getAttribute("id"));
			  Game.editor.loadCode(c.innerHTML, id);
			  
			  c = c.nextElementSibling;
		  };
		  
	  }
	  
	  Game.tests = data.childNodes[0].getElementsByTagName("tests");
	  if (Game.tests.length == 0) {
		  
		  Game.tests = 0;
	  	  $("#tests").css("display", "none");
	  }
	  else {
		  Game.tests = parseInt(Game.tests[0].textContent);
		  $("#tests").css("display", "inline");
		  $("#tests_qtd").html(Game.tests);
		  var bb = BlocklyApps.getBBox_(document.getElementById("tests_qtd"));
		  $("#tests_finished").css("top", (bb.y + 10) + "px").css("left", (bb.x + 3) + "px");
	  }
	  
	  $("#tests_finished").css("display", "none");

	  document.removeEventListener('mousedown', MyBlocklyApps.onMouseDown_, false);
	  Game.editor.bindMouseDownSvgGroupEvent(this, MyBlocklyApps.onMouseDown_);
	  
      CustomerManager.init(Game.openMission.open, Game.tests,
    		  			   data.childNodes[0].getElementsByTagName("customers")[0],
    		  			   data.childNodes[0].getElementsByTagName("customersSN")[0]);
      
	  Game.reset();
	  
	  Game.bonusTime = data.childNodes[0].getElementsByTagName("objectives")[0].getAttribute("bonusTime");
	  Game.bonusTimeReward = data.childNodes[0].getElementsByTagName("objectives")[0].getAttribute("bonusTimeReward");
		  
	  Game.addCronometro( Game.bonusTime , timeSpent );
	  
	  Game.showCountInstructions();
	  
	  BlocklyApps.bindClick('musicControl', Game.musicControlClick);
	  BlocklyApps.bindClick('runButton', Game.runButtonClick);
	  BlocklyApps.bindClick('resetButton', Game.resetButtonClick);
	  BlocklyApps.bindClick('debugButton', Game.debugButtonClick);
	  
	  BlocklyApps.bindClick('openGoalsButton', Game.openGoalsButtonClick);
	  BlocklyApps.bindClick('closeGoalsButton', Game.closeGoalsButtonClick);

	  // BlocklyApps.bindClick('buyButton', Game.buyButtonClick);
	  BlocklyApps.bindClick('goalButton', Game.goalButtonClick);
	  BlocklyApps.bindClick('instructionButton', Game.instructionButtonClick);
	  BlocklyApps.bindClick('showBadgesButton', Game.openAchievementList);
	  BlocklyApps.bindClick('logoffButton', Game.goBackToDashboard);
	  
	  BlocklyApps.bindClick('wizardFreeButton', Game.wizardFreeButtonClick);
	  BlocklyApps.bindClick('wizardPayButton', Game.wizardPayButtonClick);
	  
	  //BlocklyApps.bindClick('xmlButton', Game.xmlButtonClick);

	  // BlocklyApps.bindClick('moveDown', Game.moveDownButtonClick);
	  BlocklyApps.bindClick('moveRight', Game.moveRightButtonClick);
	  BlocklyApps.bindClick('moveRightTipBox', Game.moveRightTipBoxButtonClick);
	  
	  Game.unlockBlockly();
	  // Lazy-load the syntax-highlighting.
	  window.setTimeout(BlocklyApps.importPrettify, 1);
	  
	  Game.loadingMission = false; /// mission loaded
	  
	  if (Game.firstTime) {
		  Explanation.showInfo(mission.childNodes[0].getElementsByTagName("explanation")[0], true);
	  } else {
		  // if Game.showedWindowRunDisabled == true is because the window is opened
		  Hints.init(Game.mission.getElementsByTagName("hints")[0], !Game.showedWindowRunDisabled);
		  Game.initTime();
		  
		  if (Game.missionView)
			  Game.alertMissionView();
		  else {
			  var fAlert = function() {
				  var f = function() {Game.hideShadow();};
				  Game.alertStarsByAttempt(f);
			  };
			  
			  Game.alertWizardFree(fAlert);  
		  }
			  
	  }
  };
  
  window.setTimeout(function(){loginLoaded(mission);}, 1); // i believe that this was necessary to load all the images 
	  
	  
}; 

/* This procedure is necessary for two reasons: 
 *    1 - depends on the viewport when the user finished his session
 *    2 - some times the user put blocks in crazy positions
 */
Game.moveBlocks = function() {
	
	var blocks = Blockly.mainWorkspace.getTopBlocks();
	var minPosX = 0, minPosY = 0;
	for (var i=0; i<blocks.length; i++){
		var xy = blocks[i].getRelativeToSurfaceXY();
		if (minPosX > xy.x)
			minPosX = xy.x;
		
		if (minPosY > xy.y)
			minPosY = xy.y;
	}
	
	minPosX = Math.abs(minPosX); minPosY = Math.abs(minPosY);
		
	for (var i=0; i<blocks.length; i++){
		blocks[i].moveBy(minPosX, minPosY);
	}	
	
};

Game.verifyButtons = function(objectives) {
	Game.enabledDebug = objectives.getAttribute("buttonDebug") !== "false";
	Game.enabledRun = objectives.getAttribute("buttonRun") !== "false";
	Game.qtAttempts = (objectives.getAttribute("buttonRunQtdAttempts"));
	if (Game.qtAttempts != null) {
		Game.qtAttempts = parseInt(Game.qtAttempts);
		Game.enabledRun = Game.enabledRun && Game.howManyRuns <= Game.qtAttempts;
	}
	
	Game.enabledVarWindow = objectives.getAttribute("variableWindow") !== "false";
	Game.enabledBuy = objectives.getAttribute("buttonBuy") === "true";
	
	if (!Game.enabledDebug)
		Game.disableButton('debugButton');
	
	if (!Game.enabledRun)
		Game.disableButton('runButton');
	
	if (!Game.enabledBuy)
		Game.disableButton('buyButton');

	Game.resetButtons();
};

Game.timesUp = function (m, s) {
	if (((m*60 + s)+30) == Game.bonusTime) {
		
		Game.changeCSSAlertCronometro();
		
	} else {
		if (((m*60 + s)) == Game.bonusTime) {
			
			Game.changeCSSOverCronometro();
			
		} 
	}
};

Game.changeCSSAlertCronometro = function() {

	var o = $('.digit');
	o.removeClass('static');
	o.addClass('alert');


	o.css('background-color', 'rgba(230,9,40,1)');

	Game.cronometro.options.cssDigit = 'alert';
	
};

Game.changeCSSOverCronometro = function() {

	var o = $('.digit');
	o.removeClass('alert');
	o.addClass('over');
	
	o.css('background-color', '#CFCFC4');
	
	Game.cronometro.options.cssDigit = 'over';
	Game.cronometro.options.callback =  function(){}; // it's not still necessary call this method
	
};

Game.beforeFinishMission = function() {
	Game.victory = true;
	
    Game.lastErrorData.iderror = 0;
    Game.lastErrorData.message = "";
	
	Hints.stopHints();
    Game.stopCronometro();
    Game.stopAlertGoalButton();
    
	//TODO animar o cooker no final da missao

	//var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var answer = Game.workspaceAnswer(); //Blockly.Xml.domToText(xml);

	var now = new Date().getTime();
	var timeSpent = Math.floor((now - Game.currTime)/1000);
	
	return {timeSpent: timeSpent, answer: answer};
	
};

Game.showDialogVictory = function(out) {
	
	var vicText = document.getElementById("victoyText");
	vicText.innerHTML = out;
	
	MyBlocklyApps.showDialog(document.getElementById("dialogVictory"), null, true, true, true, null, {width: "600px"}, 
			function(){
		
				Game.nextMission();
/*
				Game.goBackToDashboard(null, false);		
				Game.init();
				*/
		});

};

Game.addCronometro = function(bonusTime, timeSpent) {

	$('#timerCountUp').empty();
	Game.cronometro = null;
	
	if (Game.missionView || !Game.pointsInThisMission) return;
	
	if (bonusTime != null) {
		timeSpent = parseInt(timeSpent);
		$('#timerCountUp').append("<span></span>");;
		Game.cronometro = CountUp($('#timerCountUp span'), {start:timeSpent, stopped: true, callback:Game.timesUp});
		
		$('#timerCountUp').css("right", $('#logoffButton').width()); 
		$('#timerCountUp').css("right", $('#timerCountUp').width()); 
		var logoff = document.getElementById("logoffButton");
		var newTop = logoff.offsetTop + ((logoff.clientHeight - $('.countdownHolder').height())/2);
		$('#timerCountUp').css("top", newTop + "px");
		if (timeSpent > Game.bonusTime) {
			Game.changeCSSOverCronometro();
		}
		else
			if (timeSpent+30 >= Game.bonusTime)
				Game.changeCSSAlertCronometro();
	}
	
};

Game.showShadow = function() {

	var shadow = document.getElementById('dialogShadow');
    shadow.style.visibility = 'visible';
    shadow.style.opacity = 0.3;
	
};

Game.hideShadow = function() {

	var shadow = document.getElementById('dialogShadow');
    shadow.style.visibility = 'hidden';
    shadow.style.opacity = 0; 
	
};

Game.alertWizardFree = function(finishFunction) {
	var talk = Game.loginData.userLogged.flags.TALK_WIZARDFREE;
	if (!Game.missionView && Game.wizardFreeContent.length > 0 && (talk === undefined || talk === "false")) {
		
		var content = $("<div/>")
							.append("Observe quando esse bot&#227;o for visivel, indica que podes obter uma ajuda do jogo, consumindo todas as estrelas dessa miss&#227;o.");
		Hints.stopHints();
		var bbBox = BlocklyApps.getBBox_(document.getElementById("wizardFreeButton"));
		var bY = 0;
		var bX = bbBox.x+35;
	
		MyBlocklyApps.showDialog(content[0], null, true, true, false, "", 
				{width: "500px", left: bX + "px", top: bY + "px"}, function(){finishFunction();}, 
				function() {}, 
				true);
		
		Game.changeFlag("TALK_WIZARDFREE", "true");
	} else 
		finishFunction();
};

Game.verifyTestsInMission = function(finishFunction) {
	
	var fAfterThisTest = function() {
		
		var f = function() {
			Game.hideShadow();
			finishFunction();
		};
		
		Game.alertStarsByAttempt(f);
	};
	
	if (Game.tests == 0) {
		
		fAfterThisTest();
		return;
		
	}
	
	var talk = Game.loginData.userLogged.flags.TALK_RUNTESTS;
	if (talk === undefined || talk === "false") {
		var bbBox = BlocklyApps.getBBox_(document.getElementById("tests_qtd"));
		
		var msgs = [];
		msgs.push(BlocklyApps.getMsg("Intro_RepeatTest1") + " <img src='images/run.png' width='30'/> "
			 + BlocklyApps.getMsg("Intro_RepeatTest2") + " <img src='images/tests.jpg' width='30'/> " + BlocklyApps.getMsg("Intro_RepeatTest3"));
		msgs.push(BlocklyApps.getMsg("Intro_RepeatTest4"));
		msgs.push(BlocklyApps.getMsg("Intro_RepeatTest5"));
		msgs.push(BlocklyApps.getMsg("Intro_RepeatTest6") + "<img src='images/tests_finished.png'/>"  + BlocklyApps.getMsg("Intro_RepeatTest7"));
		
		Game.showShadow();

		CharacterDialog.creates(bbBox.x+30, bbBox.y-120, fAfterThisTest, msgs) ;
		
		Game.changeFlag("TALK_RUNTESTS", "true");
	} else
		fAfterThisTest();
}; 

Game.alertStarsByAttempt = function(finishFunction) {
	if (hero.objective.xpTotalRun == null) {
		finishFunction();
		return;
	}
		
	var talk = Game.loginData.userLogged.flags.TALK_STARSBYATTEMPT;
	if (talk === undefined || talk === "false") {
		var bbBox = BlocklyApps.getBBox_(document.getElementById("missionIdentification"));
		
		var msgs = [];
		msgs.push(BlocklyApps.getMsg("Intro_StarsByRun1"));
		msgs.push(BlocklyApps.getMsg("Intro_StarsByRun2"));
		msgs.push(BlocklyApps.getMsg("Intro_StarsByRun3"));
		
		Game.showShadow();
		CharacterDialog.creates(bbBox.x-130, bbBox.y+80, finishFunction, msgs) ;

		Game.changeFlag("TALK_STARSBYATTEMPT", "true");
	} else
		finishFunction();
	
};

Game.alertMissionView = function() {
	if (!Game.missionView)
		return;
	
	var talk = Game.loginData.userLogged.flags.TALK_MISSIONVIEW;
	if (talk === undefined || talk === "false") {
		var content = $("<div/>")
			.append(BlocklyApps.getMsg("NoBugs_ReviewMission"));
		Hints.stopHints();
		
		MyBlocklyApps.showDialog(content[0], null, true, true, true, "", {width: "500px"}, null, 
				function(){Hints.startHints();}, true);
	
		Game.changeFlag("TALK_MISSIONVIEW", "true");
	}
};

Game.alertSuccessMissionView = function() {
	if (!Game.missionView)
		return;
	/*										    
	var talk = Game.loginData.userLogged.flags.TALK_AFTERSUCCMVIEW;
	if (talk === undefined || talk === "false") {
	*/
		var content = $("<div/>")
			.append(BlocklyApps.getMsg("NoBugs_AfterSuccessMissionView"));
		Hints.stopHints();
	
		MyBlocklyApps.showDialog(content[0], null, true, true, true, "", {width: "500px"}, null, 
				function(){
					Game.resetButtonClick();
				}, true);
/*	
		Game.changeFlag("TALK_AFTERSUCCMVIEW", "true");
	}
	*/
};

Game.initTime = function() {
	
	CountXP.start();
	Game.currTime = new Date().getTime();
	Game.initCronometro();
	Game.startSaveUserProgress();

};

Game.initCronometro = function() {
	if (Game.cronometro != null)
		Game.cronometro.restart();
};

Game.cleanCronometro = function() {
	if (Game.cronometro != null) {
		Game.cronometro.stop();
		
		$('#timerCountUp').empty();
		Game.cronometro = null;
		
	}
};

Game.stopCronometro = function() {
	if (Game.cronometro != null) {
		Game.cronometro.stop();
	}
};

Game.doResizeWindow = function(style) {
	if (Game.variableBox == null)
		return; // this happens in the select mission dialog
	
	Game.resizeWindow(null);
    Blockly.fireUiEvent(window, 'resize');
};

Game.scrollEvent =  function() {
    Hints.hideHintWithTimer();
    Game.doResizeWindow();
};
  
Game.resizeWindow = function(e) {
	
	var visualization = document.getElementById('visualization'); // the animation area
	var top = visualization.offsetTop;

	Game.redimDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
	Game.redimDiv.style.left = Game.rtl ? '10px' : '380px';
    var w = window.innerWidth;
    if (Game.variableBox.style.display === "none" && Game.tipBox.style.display === "none") {
        w -= 400;
    	
    } else {
    	
    	document.getElementById("moveRight").style.display = 'none';
    	
    	Game.redimDiv.style.height = Game.optResize.blocklyDivH;
        w -= Game.optResize.blocklyDivW;
    	
        var box = null;
        if (Game.variableBox.style.display !== "none")
        	box = Game.variableBox;
        else
        	box = Game.tipBox;
        
        box.style.top = (Game.redimDiv.style.top);
    	box.style.left = ((Game.rtl ? 10 : 380) + w + 5) + 'px';
    	box.style.width = "200px";
        box.style.height = Game.optResize.varBoxH;
        
        if (Game.tipBox.style.display !== "none") {
        	var th = $("#tipBox .move-header")[0].clientHeight;
        	$("#tips_content").css("height", (box.clientHeight-th) + "px");
        } else {
        	var th = $("#variableBox .move-header")[0].clientHeight;
        	
        	var h = (box.clientHeight-th) + "px";
        	$("#var_content").css("height", h);
        	var dv = $("#var_content .basevarsgrid div:nth(2)");
        	if (dv.length > 0)
        		dv.css("height", h);
        } 
        	
        
    }
    Game.redimDiv.style.width = (w) + 'px';
   
	var t = Game.redimDiv.style.top;
	t = parseInt(t.substr(0, t.length-2));
    
	Game.editor.resize(t);
    
    var blocklyLock = document.getElementById("blocklyLock");
	
	if (blocklyLock !== null && blocklyLock !== "undefined" && blocklyLock !== undefined) {
	    blocklyLock.style.cssText = Game.redimDiv.style.cssText;
	    blocklyLock.style.height = Game.redimDiv.clientHeight  + "px";;
	    blocklyLock.style.position = "fixed";
	    blocklyLock.style.backgroundColor = "grey";
	    blocklyLock.style.opacity = "0.3";
	}
    
    if (Game.counterInstruction != null)
    	Game.counterInstruction.style.left = (Game.redimDiv.offsetLeft + Game.redimDiv.offsetWidth - Game.counterInstruction.clientWidth - 15) + "px";

 //   $("#tbSelectMission").css("width", ($("#topInfoTable")[0].clientWidth-150) + "px");
};


Game.moveDownButtonClick = function() {
	Hints.hideHintWithTimer();
	
	Game.varWindow = Game.DOWN;
	document.getElementById("moveDown").style.display = 'none';
	document.getElementById("moveRight").style.display = 'inline-block';
	
	  Game.optResize = {
		blocklyDivW: 400,
		blocklyDivH: "70%",
		varBoxT: false,
		varBoxH: "20%"
	  };
			  
     Game.doResizeWindow();
};

Game.moveRightButtonClick = function() {
	  Hints.hideHintWithTimer();
	  Game.varWindow = Game.RIGHT;
    //  document.getElementById("moveRight").style.display = 'none';
	//  document.getElementById("moveDown").style.display = 'inline-block';
	
	  Game.optResize = {
				blocklyDivW: 600,
				blocklyDivH: "90%",
				varBoxT: true,
				varBoxH: "90%"
			  };
	  Game.variableBox.style.display = "none";
	  
	  Game.doResizeWindow();
};

Game.moveRightTipBoxButtonClick = function() {
	  Hints.hideHintWithTimer();
	  Game.tipBox.style.display = "none";
	  
	  Game.doResizeWindow();
	
};
	
/**
 * Reset the game to the start position, clear the display, and kill any
 * pending tasks.
 */
Game.reset = function(flag) {
  
  Game.victory = false;
  Game.stopAlertGoalButton();
  hero.reset();
  
  if (flag === undefined)
	  CustomerManager.reset();

  Game.display();

  Game.killAll();
};

Game.killAll = function() {
  // Kill any task.
  // Kill all tasks.
  for (var x = 0; x < Game.pidList.length; x++) {
    window.clearTimeout(Game.pidList[x]);
  }
  Game.pidList = [];

};

/**
 * Just draw the states of objects. Other of this function happens the events that changes
 *     the states.
 */
Game.display = function() {

	Game.ctxDisplay.drawImage( Game.imgBackground, 0 , 0 );

	hero.draw(Game.ctxDisplay);
	CustomerManager.draw(Game.ctxDisplay);
	
};

Game.exitCountInstructions;

Game.countInstructions = function(c, f) {
	
	Game.exitCountInstructions = false;
	var conta = 0;
	for (var i = 0; i < c.length; i++) {
		var block = c[i];
		if (block.nextConnection != null) { // we dont count the blocks that are into other blocks, as parameter, for instance 
			conta++;
		} 	
		if (f != undefined)
			if (!f(block)) {
				Game.exitCountInstructions = true;
				return conta;
			}
		conta += Game.countInstructions(block.childBlocks_, f);
		if (Game.exitCountInstructions)
			return conta;
	}
	
	return conta;
	
};

Game.openGoalsButtonClick = function() {
	$("#goalsAccomplished").css("display", "none");
	$("#goalsAccomplishedWindow").css("display", "inline");
	
	if (Game.dialogMouseDownWrapper_) {
	   Blockly.unbindEvent_(Game.dialogMouseDownWrapper_);
	   Game.dialogMouseDownWrapper_ = null;
	}

	Game.dialogMouseDownWrapper_ =
        Blockly.bindEvent_(document.getElementById("goalsAccomplishedWindowHeader"), 'mousedown', null,
        		Game.dialogMouseDown_);
};

Game.dialogUnbindDragEvents_ = function() {
  if (Game.dialogMouseUpWrapper_) {
    Blockly.unbindEvent_(Game.dialogMouseUpWrapper_);
    Game.dialogMouseUpWrapper_ = null;
  }
  if (Game.dialogMouseMoveWrapper_) {
    Blockly.unbindEvent_(Game.dialogMouseMoveWrapper_);
    Game.dialogMouseMoveWrapper_ = null;
  }
};
	
Game.dialogMouseMove_ = function(e) {
	  var dialog = document.getElementById('goalsAccomplishedWindow');
	  var dialogLeft = Game.dialogStartX_ + e.clientX;
	  var dialogTop = Game.dialogStartY_ + e.clientY;
	  dialogTop = Math.max(dialogTop, 0);
	  dialogTop = Math.min(dialogTop, window.innerHeight - dialog.offsetHeight);
	  dialogLeft = Math.max(dialogLeft, 0);
	  dialogLeft = Math.min(dialogLeft, window.innerWidth - dialog.offsetWidth);
	  dialog.style.left = dialogLeft + 'px';
	  dialog.style.top = dialogTop + 'px';
	};


Game.dialogMouseDown_ = function(e) {
  Game.dialogUnbindDragEvents_();
  if (Blockly.isRightButton(e)) {
	// Right-click.
	return;
   }
  
  // Left click (or middle click).
  // Record the starting offset between the current location and the mouse.
  var dialog = document.getElementById('goalsAccomplishedWindow');
  Game.dialogStartX_ = dialog.offsetLeft - e.clientX;
  Game.dialogStartY_ = dialog.offsetTop - e.clientY;

  Game.dialogMouseUpWrapper_ = Blockly.bindEvent_(document,
      'mouseup', null, Game.dialogUnbindDragEvents_);
  Game.dialogMouseMoveWrapper_ = Blockly.bindEvent_(document,
      'mousemove', null, Game.dialogMouseMove_);
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
};


Game.closeGoalsButtonClick = function() {
	$("#goalsAccomplished").css("display", "inline");
	$("#goalsAccomplishedWindow").css("display", "none");

	if (Game.dialogMouseDownWrapper_) {
	   Blockly.unbindEvent_(Game.dialogMouseDownWrapper_);
	   Game.dialogMouseDownWrapper_ = null;
	}
};

Game.goalButtonClick = function() {
	
	Hints.stopHints();
	Blockly.WidgetDiv.hide();
	Game.stopAlertGoalButton();
	
	Explanation.showInfo(Game.mission.childNodes[0].getElementsByTagName("explanation")[0], false, null, false);
	
};

Game.instructionButtonClick = function() {
	
	Hints.stopHints();
	Blockly.WidgetDiv.hide();
	Game.stopAlertGoalButton();
	
	Explanation.showInfo(Game.mission.childNodes[0].getElementsByTagName("explanation")[0], false, null, true, {width: "900px"});
	
};

Game.emptyLines = function() {
	InGrid.emptyLines("#_varsgrid_vars_0 div:nth-child(2) table");
};

Game.goBackToDashboard = function(evt, callExitMission, callGameInit) {
	
	Game.editor.hideChaff();
    Blockly.WidgetDiv.hide();
    
    if (CountXP.times !== undefined)
    	Game.tracks[CountXP.times].stop();
    
    var ret = Game.closeBlockEditorStuffs();
    
    Game.editor.dispose();
    Game.missionSelection.dispose();
	
	if (callExitMission !== false) { // this peace of code runs when the user clicks the logoff button
		
		Game.exitMission(ret[0], ret[1]);
		
		if (callGameInit || callGameInit == undefined) 
			Game.init();
	}
	
};

Game.exitMission = function(timeSpend, answer) {
	
	UserControl.exitMission(timeSpend, Game.howManyRuns, Game.runningStatus, 
			(Blockly.mainWorkspace?Blockly.getMainWorkspace().scale:1), answer,
					{callback:function() {}, async:false});
	
};

Game.wizardFreeButtonClick = function() {
	
	var fShowTips = function(recordChanges) {
		
		Game.closeBoxes();
		
		if (recordChanges == 1) {
			
			CountXP.setConsumedMaxStars();

			UserControl.askWizardFree(Game.howManyRuns, Game.getTimeSpend());
			Game.saveMission();
			
		}
		
		var rows = [];
		
		var manyCols = 0;
		
		var lines = Game.wizardFreeContent[0].getElementsByTagName("line");
		for (var i = 0; i < lines.length; i++) {
			var indent = lines[i].getAttribute("indent");
			if (indent != null && manyCols < parseInt(indent)) {
				manyCols = parseInt(indent);
			}
			rows.push({text: lines[i].textContent.toString(), indent: (indent==null?0:parseInt(indent))});
		}
			
		
		InGrid.createNewTipTable(manyCols, rows);
		
		Game.tipBox.style.display = "inline";
		Game.doResizeWindow();
		
		Hints.startHints();
		
	};
	
	if (CountXP.getEnabledStars() > 0) {
		Hints.stopHints();
		confirm("Deseja realmente ver a dica para resolver a miss&#227;o ? <br/> "+
				"Ao confirmar ser&#227;o consumidas todas as estrelas.", 
				function () { fShowTips(1); },
				function () { Hints.startHints(); },
				{"height": "180px"}
		);
	} else
		fShowTips(0);
};

Game.wizardPayButtonClick = function() {
	
};

Game.closeBoxes = function() {
	
    Game.variableBox.style.display = "none";
    Game.tipBox.style.display = "none";
	
};

Game.closeBlockEditorStuffs = function() {

    Game.unlockBlockly();
	Hints.stopHints();
    
    $("#tests").css("display", "none");

    Game.stopAlertGoalButton();
	MyBlocklyApps.hideDialog(false);
	window.removeEventListener('beforeunload', Game.unload);
	
	var now = new Date().getTime();
	Game.cleanCronometro();
    CountXP.stop(true);
	
	Game.emptyLines();
	
	Game.closeBoxes();
	Game.doResizeWindow();
    Game.killAll();
    Game.runningStatus = 0;
	
    var answer = null;
    var timeSpent = 0;
    if (Game.currTime != 0) {
        answer = Game.workspaceAnswer(); //Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    	timeSpent = Math.floor((now - Game.currTime)/1000);
    }

    document.getElementById('blockly').innerHTML = ""; // clean the editor
    /* let this in commentary. this lines destroys the capacity to edit the fields in the blocks.
    $(".blocklyWidgetDiv").remove();
    $(".blocklyTooltipDiv").remove();
    */
    $(".blocklyToolboxDiv").remove();

    window.removeEventListener('scroll', Game.scrollEvent);  
    window.removeEventListener('resize',  Game.resizeWindow);

    $("#tabs-points").empty();
    $("#tabs-time").empty();
    $("#tabs-runs").empty();
    
	return [timeSpent, answer];
};

Game.intoTheMissionLogoffButtonClick = function() {
	
	Game.goBackToDashboard(null, true, false);
	Game.logoffButtonClick();
	
};

Game.logoffButtonClick = function() {
	
	LogClick.store("logoffgame");
	
	Game.loginData.doingLogoff = true;

	MyBlocklyApps.hideDialog(false);
	CityMap.stopAnimation();
	
	LogClick.save(false); // store the cache 
	// after performs the method, it is allowed to continue. Instead using save(true) risks that the method runs after logoff
	
	// passing callback and async is necessary in FF, because, when unloads the page, it doesnt guarantee the ajax method is called 
	UserControl.logoff({callback:function(){
		Game.loginData = null;
		
		// because is synchronous, we need wait to finish the last request 
		Game.init();
	}, async:false});
};

/**
 * Click the run button.  Start the program.
 */
Game.runButtonClick = function() {

  Game.disableButton("runButton");
  Game.enableButton("resetButton");
  Game.disableButton("debugButton");
  Game.disableButton("buyButton");
  Game.disableButton("wizardFreeButton", "");
  
  Game.closeBoxes();
  
  Game.doResizeWindow();
  
  Game.editor.traceOn(true);
  Game.execute(1);
};

/**
 * Click the reset button.  Reset the Game.
 */
Game.resetButtonClick = function() {
	
	Game.clickReseting = true;
	Game.finishedRun();
	
   $("#tests_finished").css("display", "none");
 
   Game.lastErrorData.iderror = 0;
   Game.lastErrorData.message = "";
   Game.lastErrorData.block = null;

   Hints.stopHints();
	
  Game.resetButtons();
  Game.reset(1); // dont reset the CustomerManager
  
  Game.closeBoxes();
  Game.doResizeWindow();
  
  Game.hideHints = true;
  
  Hints.startHints();
  Game.unlockBlockly();
  Game.stopAlertGoalButton();
  Game.clickReseting = false;
};

Game.enableButton = function(buttonName, className) {
	if (buttonName === "debugButton" && !Game.editor.hasDebug()) {
		Game.disableButton(buttonName);
		return;
	}
			
	if ((buttonName === "debugButton" && !Game.enabledDebug) ||
		(buttonName === "runButton" && (!Game.enabledRun || 
				(Game.qtAttempts != null && Game.howManyRuns > Game.qtAttempts))) ||
		(buttonName == "buyButton" && !Game.enabledBuy)) {
		
		var exit = true;
		
		if (buttonName === "runButton" && Game.qtAttempts != null && Game.showedWindowRunDisabled == false) {
			
			exit = false;
			if (Game.qtAttempts < Game.howManyRuns && !BlocklyApps.isDialogVisible_) {

				exit = true; // only apply this configuration when is possible to comunicate the user 
				
				Game.showedWindowRunDisabled = true;
				
				var content = $("<div/>")
					.append(BlocklyApps.getMsg("NoBugs_RunButtonDisabled"));
				Game.disableButton("runButton");
				Hints.stopHints();
				
				MyBlocklyApps.showDialog(content[0], null, true, true, true, "", {width: "500px"}, null, function(){
					Hints.startHints();
				}, true);
			}
		} 
			
		if (exit) return;
	}
		
	
   var button = document.getElementById(buttonName);
   button.disabled = "";
   button.className = (className != undefined?className:"buttonIDE");
};

Game.disableButton = function(buttonName, className) {
   var button = document.getElementById(buttonName);
   button.disabled = "disabled";
   button.className = (className != undefined?className:"buttonIDENotEnabled");
};

Game.firstClick = true;

/**
 * Click the debug button.  Start the program/go to next line.
 */
Game.debugButtonClick = function() {
	 
	Game.disableButton('debugButton');
	if (Game.runningStatus === 0) {
		
		Game.enableButton('resetButton');

		if (Game.enabledVarWindow) {
			Game.closeBoxes();
			Game.variableBox.style.display = "inline";
			Game.doResizeWindow();
			Game.disableButton('wizardFreeButton', "");
		}
		
		Game.editor.traceOn(true);
		Game.firstClick = true;
		
	} else {
		
		Hints.stopHints();
		Game.firstClick = false;
		if (!Blockly.mainWorkspace.traceOn_) // the second complete debug didn't show the highlight on the blocks 
			Game.editor.traceOn(true);
		
	}
	
	Game.execute(2);
};

Game.musicControlClick = function() {
	
	var musicDisabled = (Game.loginData.userLogged.flags.MUSIC_DISABLED === "true");
	
	Game.changeMusicControlButton(musicDisabled);

	Game.changeFlag("MUSIC_DISABLED", (musicDisabled?"false":"true"));

};

Game.changeFlag = function(name, value) {
	Game.loginData.userLogged.flags[name] = value;
	UserControl.saveFlag(name, value);
};

Game.changeMusicControlButton = function(musicDisabled) {
	
	if (!musicDisabled) {
		
		if (!Game.loadingMission && hero) {
			hero.verifyObjectives("music", {status: "off"});
			if (hero.allObjectivesAchieved)
				Game.verifyVictory();
		}
		
		$("#musicOff").css("display", "none");
		$("#musicOn").css("display", "inline");
		$("#musicControl").attr("title", BlocklyApps.getMsg("NoBugs_enableMusic") );
		if (CountXP.times != undefined)
			Game.tracks[CountXP.times].stop();
		
	} else {
	
		if (!Game.loadingMission && hero) {
			hero.verifyObjectives("music", {status: "on"});
			if (hero.allObjectivesAchieved)
				Game.verifyVictory();
		}
		
		$("#musicOn").css("display", "none");
		$("#musicOff").css("display", "inline");
		$("#musicControl").attr("title", BlocklyApps.getMsg("NoBugs_disableMusic") );
		if (CountXP.times != undefined)
			Game.tracks[CountXP.times].play();
		
	}
	
};

Game.resetButtons = function(hideVars) {
	
	Game.disableButton('resetButton');
	
	Game.enableButton('debugButton');
	
	Game.enableButton('runButton');
	
	Game.enableButton('buyButton');
	
	Game.enableButton('wizardFreeButton', "");
	
	if (Blockly.mainWorkspace != null)
		Game.editor.traceOn(false);
	
	Game.runningStatus = 0;
	
	if (hideVars == undefined || hideVars == true) {
		Game.emptyLines();
	}
};


Game.finishedRun = function() {
	
	// if it's in a fix bugs mission, start to count the attempts after the second run
	if (Game.missionType === "fixBugs" && Game.howManyRuns > 1)
	
		CountXP.newRun(); // after run, or after an error, then count the runs
	
};

Game.showTabs = function(id) {
	
	Game.editor.hideChaff();
	Blockly.WidgetDiv.hide();
	
	Game.editor.visibleTabs(id);
	
    Blockly.fireUiEvent(window, 'resize');

};

Game.selectTab = function(id) {
	
	if (id === "blockly") return;
	
	Game.selectedTab = id;
	Game.showTabs(id);
	$('#multiBlockly').easytabs("select", "#" + (id));
	Blockly.fireUiEvent(window, 'resize');
	
	if (Game.counterInstruction != null) {
		Game.counterInstruction.style.display = (id === "blockly1"?"inline":"none");
		Game.updateCounterInstructions(-1);	
	}
	
};

Game.changeTab = function(id, f) {
	
	if (id === "blockly") return;
	
	f = (f !== undefined && f !== null ?(f.data !== undefined?f.data:f):f);
	id = (id.data ? id.data : id);
	if (Game.selectedTab === id) {
		
		Game.editor.traceOn(true);
		return f;
	} 
	
	Game.selectTab(id);
	Game.editor.traceOn(true);
	return f;
};

Game.verifyFunctionTabs = function() {
	
	Game.editor.verifyFunctionTabs();
	
};

/**
 * Execute the user's code.  Heaven help us...
 */
Game.execute = function(debug) {
	
  if (Game.runningStatus === 0) {
	
	  try {
		  
     	Game.howManyRuns++;
     	Game.callTimes = {};

	    Game.verifyFunctionTabs();
		  
	    Game.editor.changeToFirstTab();

	    $("#tests_finished").css("display", "none");
	    Game.blinkPlayerStop = true;
	  
	    Game.highlightPause = false;
	  
	    Game.editor.hideChaff();
	    Hints.stopHints();
	    Blockly.WidgetDiv.hide();
	  
	    Game.hideHints = false;
	  
	    BlocklyApps.log = [];
	    BlocklyApps.ticks = 10000; // how many loops are acceptable before the system define it is in infinite loop ? 

	    Game.emptyLines();
	  
	    // Reset the graphic.
	    Game.reset();

	    Game.runningStatus = debug; // let here because the registration of the status in save mission
	  
		Game.saveMission();
		
		if (Blockly.selected != null) {
			
			myIsTargetSvg = true; // defined in blockly.js 
			Blockly.selected.unselect();
			myIsTargetSvg = false;
			
		}
		
		Game.editor.semanticAnalysis();
		
  	    var code = Game.editor.getJsCode();
  	    
  	    code = "var NoBugsJavaScript = {};\n" + code;
  	    Game.code = code;
  	    
	    Game.jsInterpreter = new NoBugsInterpreter(code, Game.initApi);

		// BlocklyApps.log now contains a transcript of all the user's actions.
        Game.stepSpeed = (1000 * Math.pow(1 - Game.speedSlider.getValue(), 3)) + Game.speedMultFactor ;
	    
        Game.lockBlockly();
        
	  } catch (e) {
		  
		  if (e == Infinity) { 
			  Game.showError(["Error_infinityLoopDetected"]);
		      Game.resetButtons();
		      Game.closeBoxes();
		      Game.doResizeWindow();
		      return;
		  } else
			  if (e.isNoBugs) {
				  Game.editor.traceOn(true); // allowing the hightlight
				  Game.editor.highlightBlock(Blockly.selected.id);

				  Game.showError([e.msg]);
			      Game.resetButtons();
			      Game.closeBoxes();
			      Game.doResizeWindow();
			      return;
			  }
		  
		  console.log(e);
		  
	  };
  }

  Game.runningStatus = debug; // let here because we can change from debug to run
  
  Game.pidList.push( window.setTimeout(function(){Game.nextStep();},2 )); // nothing in callstack
};

Game.convertWaits = function(code) {
	
	var c = 1;
	var i = code.search(/(WAIT_NOBUGS\[[0-9]*\])/g);
	while (i > -1) {
		
		var peace = code.substring(i+11);
		peace = /(\[[0-9]*\])/g.exec(peace)[0];
		peace = peace.substring(1, peace.length-1);
		
		
		code = code.replace(/(WAIT_NOBUGS\[[0-9]*\])/g, "var f"+c+" = function() { ");
		
		code = code + "}; \n NoBugsJavaScript.timeOut=false; mySetTimeout('f"+c + "', " + peace + "); while(!NoBugsJavaScript.timeOut);\n";
		
		c++;
		i = code.search(/(WAIT_NOBUGS\[[0-9]*\])/g);
	}
	
	
	
	return code;
};

Game.semanticAnalysis  = function(block) {
	
	if (Game.hasEmptyInputs(block)) {
		
		Game.selectTab(block.workspace.id);
		Blockly.selected = Game.blockWithEmptyInputs;

		throw {isNoBugs: true, msg : "Hints_EmptyInputError"};
		
	}
	return true;
};

Game.hasEmptyInputs = function (activeBlock) {
	var input = activeBlock.inputList;
	for (var i=0; i<input.length; i++) {
		if (input[i].connection != null) {
			if (!((input[i].sourceBlock_.type === "controls_for" || input[i].sourceBlock_.type === "controls_whileUntil" || input[i].sourceBlock_.type === "controls_if") && (input[i].name.indexOf("DO") === 0|| input[i].name === "ELSE")) &&
					 input[i].connection.targetConnection == null) {
				
				Game.blockWithEmptyInputs = activeBlock;
				
				return true;
			}
			  
			if (input[i].connection.targetConnection != null) {
				if (Game.hasEmptyInputs(input[i].connection.targetConnection.sourceBlock_))
					return true;
			}
		} 
	}
	
	return false;

};

Game.showCountInstructions = function() {

	if (Game.editor.editArea && Game.editor.showCountInstructions() && (hero.hasCommQtd || hero.objective.maxCommands > 0)) {

		var blck = Game.editor.getFirstEditArea();
		var t = blck.offsetTop + Game.editor.getOffsetTop();
		
		var ci = document.createElement("div");
		ci.id = "countInstruction";
		ci.style.position = "absolute";
		ci.style.top = t + "px";
		ci.style.backgroundColor = "rgba(153, 152, 152, 0.28)";
		ci.style.opacity = "0.3";
		
		
		ci.innerHTML = Game.editor.countInstructions();
		
		document.getElementById("mainBody").appendChild(ci);
		

		ci.style.left = (Game.redimDiv.offsetLeft + Game.redimDiv.offsetWidth - ci.clientWidth - 15) + "px";
		
		Game.counterInstruction = ci;
	} else
		Game.counterInstruction = null;
	
};

Game.updateCounterInstructions = function(howMany) {
	if (Game.counterInstruction == null)
		return;
	
	Game.counterInstruction.innerHTML = (howMany > -1?howMany + " blocks":Game.counterInstruction.innerHTML);
	Game.counterInstruction.style.left = (Game.redimDiv.offsetLeft + Game.redimDiv.offsetWidth - Game.counterInstruction.clientWidth - 15) + "px";
};

/**
 * Lock block panel during running
 */
Game.lockBlockly = function() {
	
	var blocklyLock = document.getElementById("blocklyLock");
	if (blocklyLock != null)
		return;
	
	blocklyLock = document.createElement("div");
    
    blocklyLock.id = "blocklyLock";
    blocklyLock.style.cssText = Game.editor.editArea.style.cssText;
    blocklyLock.style.height = Game.editor.editArea.clientHeight + "px";
    blocklyLock.style.position = "fixed";
    blocklyLock.style.backgroundColor = "grey";
    blocklyLock.style.opacity = "0.3";
    
    
	var mainBody = document.getElementById("mainBody");
	mainBody.appendChild(blocklyLock);
	
};

/**
 * Unlock block panel after run
 */
Game.unlockBlockly = function() {
	var blocklyLock = document.getElementById("blocklyLock");
	
	if (blocklyLock !== null && blocklyLock !== "undefined" && blocklyLock !== undefined) {
		var mainBody = document.getElementById("mainBody");
		mainBody.removeChild(blocklyLock);
	}
	
};

Game.verifyVariableInitialized = function(verifyVars) {
	
	var found = null;
	for (var j = 0; j < Game.jsInterpreter.stateStack.length; j++)
		if (Game.jsInterpreter.stateStack[j].scope) {
			found = Game.jsInterpreter.stateStack[j].scope;
			break;
		}
	
	if (found == null) {
		BlocklyApps.log = [];
		BlocklyApps.log.push(["fail", "Impossivel"]);
		throw false;
		
	} 
	

	var len = verifyVars.length;
	verifyVars = verifyVars.properties;
	for (var i = 0; i < len; i++) {
	
		var entry = verifyVars[i].data;
		if (found.properties[entry] !== undefined) // it's not a variable, but a statement declaration
			if (found.properties[entry].data === undefined) {
				
				BlocklyApps.log = [];
				BlocklyApps.log.push(["fail", "Error_variableNotInitialized", entry]);
				throw false;
				
			}
		
	}
	return true;
};

/**
 * - Show the values of variables in the variable window
 * - Update the variables array removing that variables where their procedure is not in stack
 */
Game.updateVariables = function() {
	
	var rows = [];
	
	var js = Game.jsInterpreter;
	for (var i = js.variables.length-1; i>=0; i--) {
		
		var found = false;
		var entry = js.variables[i];
		for (var j = 0; j < js.stateStack.length; j++)
			if (js.stateStack[j].scope) {
				found = entry.scope == js.stateStack[j].scope;
				break;
			}
				
				
		if (found) {

			if (Game.runningStatus == 2) {
				
				// only show the variables in current scope
				var data = entry.scope.properties[entry.name].data;
				if (data != undefined) {
					
					var fBuildData = function(data) {
						var res = data;
						if (data != null) {
							
							if (data.type != undefined) {
								res = "<div>" + 
										"<p style='margin: 0px' class="+data.type+"><img src='images/"+ data.descr + ".png'/></p>"+
										(data.sourceType==null?"":"<p style='margin: 0px'>"+BlocklyApps.getMsg("__" + data.sourceType)+" "+CustomerManager.getCustomerPosition(data.source)+"</p>") +  
										"</div>";
							} else {
								
								try {
									
									if (data.indexOf("\"$$$") == 0) {
										res = "<img src='images/"+ data.substring(2, data.length-1) + ".png'/>";
										
									} 
								} catch (ex) {
									// this happens when data is a number or other type different of string or array
								}
							}

						} 
						return res;
					};
					
					if (Array.isArray(data)) {
						var sV = "[";
						for (var k=0; k<data.length; k++) {
							var elem = data[k];
							if (sV.length > 1)
								sV = sV + ",";
							var r = fBuildData(elem);
							if (r === undefined)
								r = "0";
							sV = sV + r;
						}
						
						data = sV + "]";
					} else {
						data = fBuildData(data);
					}
						
					rows.push({"name":entry.name, "value": data+""});
				}

			}
			
		} else {
			if (i == js.variables.length-1) // it was a variable in a finished procedure
				js.variables.splice(i, 1);
		}

		
	}

	
	//InGrid.loadLines('#_varsgrid_vars_0 div:nth-child(2) table', rows);

	InGrid.createNewVarTable(rows);
	Game.assignIngrid();
};

Game.nextStep = function() {
	if (Game.runningStatus == 0)
		return;
	
	while (true) {
		try {
			if (Game.jsInterpreter.step()) {
				
				if (BlocklyApps.log.length > 0 || Game.highlightPause || Game.waitFunction) {
					
					if (Game.runningStatus != 2  || Game.highlightPause === false  || Game.waitFunction) {
						
						if (Game.waitFunction)
							hero.update('IM', 0);
							
						BlocklyApps.log.push(['nextStep']);
						
					}
					else {

						Game.highlightPause = false;
						if (Game.firstClick && Game.runningStatus == 2) {
							BlocklyApps.log.push(['nextStep']);
							Game.firstClick = false;
						}
					}
					
					Game.pidList.push( window.setTimeout(function(){Game.animate();},10) ); // nothing in callstack 
					
					return;
				}
				
			} else {
				
				Game.verifyVictory();
				return; // exit the while(true) loop
				
			}
		} catch (ex) {
			  console.log(ex);

			  if (Game.runningStatus == 2) {
				  document.getElementById("moveRight").style.display = 'inline-block';
			  }
			  // when was something wrong in the command execution, as wrong parameter value, or invalid moment of the command use
			  Game.animate();
			  
			  Game.unlockBlockly();
			  Game.stopAlertGoalButton();
			  Hints.startHints();
			  Game.finishedRun();
			  
		      return;
			
		}
	}
};

Game.verifyVictory = function() {
	
	if (Game.waitFunction) {
		
		hero.update('IM', 0);					
		BlocklyApps.log.push(['nextStep']);
		
		Game.pidList.push( window.setTimeout(function(){Game.animate();},10) ); // nothing in callstack 
		return;
	}
	
	var debugging = Game.runningStatus == 2;

    Game.editor.highlightBlock(null);
    
    hero.verifyObjectives("deliver", {allCustomers:true});
    hero.verifyObjectives("varQtd", null);
    hero.verifyObjectives("commQtd", null);
    hero.verifyObjectives("notExists", null);
    hero.verifyObjectives("cashIn", {allCustomers:true});
    hero.verifyObjectives("giveTheWholeChange", {allCustomers:true});
    hero.verifyObjectives("giveSomeChange", {allCustomers:true});
    hero.verifyObjectives("countTalk", {allCustomers:true});
    hero.verifyObjectives("conditional", {allCustomers:true});
    hero.verifyObjectives("callTimes", {allCustomers:true});
    hero.verifyObjectives("ordered", null);
    
    Game.lastErrorData.block = null;
    if (hero.allObjectivesAchieved) {
    	
    	if (Game.tests > 0) {
    		$("#tests_finished").css("display", "inline").html(CustomerManager.currentTest+1);
			
    		if (CustomerManager.nextTest()) {
    			
    			hero.reset();
    			
    			// there is no start or restart method
    			Game.jsInterpreter = new NoBugsInterpreter(Game.code, Game.initApi);
    			
    			Game.pidList.push( window.setTimeout(function(){Game.nextStep();},2 )); // nothing in callstack
    			return;
    		}
			
    	}
    	
		// if there isn't more lines to evaluate
		Game.resetButtons();
		
    	CountXP.stop(true);
    	
    	var r = Game.beforeFinishMission();
    	
		if (Game.missionView) { // it's when the user achieved this mission, but came back to test or see something. 
			Game.alertSuccessMissionView();
			return;
		}
			
		var reward;
		if (Game.pointsInThisMission) {
			
			if (Game.noXP) {
				
				reward = hero.addReward(-1, 0, 0, 0);
				
			} else {
				
		    	var count = Game.editor.countInstructions();
		    	reward = hero.addReward(count, (Game.cronometro == null?0:Game.cronometro.passed), Game.bonusTime, Game.bonusTimeReward);
		    	
			}

			Game.updatesReward([Game.globalXP + reward.totalXP, Game.globalMoney + reward.totalCoins]);
		} else {
			reward = {totalXP: 0, totalCoins: 0, baseXP: 0, bonusCoins: 0};
		}
		

    	UserControl.saveMission(reward.totalXP, reward.totalCoins, r.timeSpent, Game.howManyRuns, Game.missionFinishable, Game.runningStatus, Blockly.getMainWorkspace().scale, r.answer, function(achievements){
    		
    		var achievementTitle = BlocklyApps.getMsg("Achievement_Title");
    		achievements.forEach(function(achievement) {
    			var title = AchievementWindow.fillFields(BlocklyApps.getMsg(achievement['TITLE']),
    															achievement);
    			$.growl($.extend({title:achievementTitle, style: "notice", duration: 5000}, 
    					         {message : title}));	
    		});
    		
    		var msg = BlocklyApps.getMsg("NoBugs_goalAchievedVictory");
    		var xp2 = "<img style='vertical-align: middle; padding-left: 3px' src='images/xp.png'/>";
    		
    		if (reward.totalXP == 0) {
    			msg = msg.substring(0, msg.indexOf("<br/>"));
    		}
    		
    		var out = msg.format((reward.totalXP == 0 ? "" : reward.totalXP + xp2+ "<br/>"));
    		
    		if (reward.baseXP != reward.totalXP || reward.bonusCoins != reward.totalCoins) {
    			
	    		var out2;
	    		
	    		if (reward.baseXP != reward.totalXP) {
	    			
	    			out2 = "<table border='2px'  class='tableVictory' >";
		    		out2 = out2 + "<tr style='font-weight:bold'><td>" + BlocklyApps.getMsg("Victory_XPBaseValue") + " </td><td align='right' style='width: 50px;'> " + reward.baseXP + "</td></tr>";
		    		out2 = out2 + "<tr><td colspan='2'>" + BlocklyApps.getMsg("Victory_Bonus") + "</td></tr>" ;
		    		for (var i=0; i < reward.bonusXP.length; i++) {
		    			var b = BlocklyApps.getMsg(reward.bonusXP[i].name);
		    			var s = b.format(reward.bonusXP[i].extraInfo);
		    			out2 = out2 + "<tr><td> <img src='images/goal_ok.png'/>&nbsp;" + s + "</td> <td align='right' style='width: 50px;'>" + reward.bonusXP[i].value + "</td></tr>";   
		    		}

		    		out2 = out2 + "<tr style='font-weight:bold'><td>" + BlocklyApps.getMsg("total") +"</td><td align='right' >" + reward.totalXP + "</td></tr>";
		    		out = out + out2 + "</table>";
	    		}

	    		if (reward.bonusCoins != reward.totalCoins) {

	    			out2 = BlocklyApps.getMsg("NoBugs_goalAchievedVictoryWithCoins").format(reward.totalCoins + 
	    					                       "<img style='vertical-align: middle; padding-left: 3px' src='images/coin2.png'/>") + "<br/>";
	    			
	    			out2 = out2 + "<table border='2px' class='tableVictory' >";
	    			
		    		out2 = out2 + "<tr style='font-weight:bold'><td>" + BlocklyApps.getMsg("Victory_CoinsBaseValue") + " </td><td align='right' style='width: 50px;'> " + reward.baseCoins + "</td></tr>";
		    		out2 = out2 + "<tr><td colspan='2'>" + BlocklyApps.getMsg("Victory_Bonus") + "</td></tr>" ;
		    		for (var i=0; i < reward.bonusCoins.length; i++) {
		    			var b = BlocklyApps.getMsg(reward.bonusCoins[i].name);
		    			var s = b.format(reward.bonusCoins[i].extraInfo);
		    			out2 = out2 + "<tr><td> <img src='images/goal_ok.png'/>&nbsp;" + s + "</td> <td align='right' style='width: 50px;'>" + reward.bonusCoins[i].value + "</td></tr>";   
		    		}
		    		out2 = out2 + "<tr style='font-weight:bold'><td>" + BlocklyApps.getMsg("total") +"</td><td align='right' >" + reward.totalCoins + "</td></tr>";
		    		out = out + out2 + "</table>";
	    		}

    		}
    		
    		Game.showDialogVictory(out);
    	});
    	
    } else {
    	
    	Game.finishedRun();
		// if there isn't more lines to evaluate
		Game.resetButtons();
		
    	var objs = [];
		var os = hero.objective.objectives;
		for (var i=0; i<os.length; i++) {
			
			objs[i] = [Objective.factory(os[i].objective).createExplanationItem(os[i]), os[i].achieved];
		}
		
		if (!Game.missionView)
			UserControl.missionFail(Game.howManyRuns, CustomerManager.currentTest+1, objs);

	    if (debugging) {
		  document.getElementById("moveRight").style.display = 'inline-block';
	    }
    	
	    Game.lastErrorData.iderror = "missionFail";
	    Game.lastErrorData.message = document.getElementById("dialogFailText");

		var style = {};
		style.width = "600px";

    	MyBlocklyApps.showDialog(document.getElementById("dialogFail"), null, true, true, true, null, style,
    			function() {
    				Game.hideHints = true;
	    			Hints.showErrorHint();
    			}
    	);
    }
    
    Game.unlockBlockly();
    
};

/**********************************************************************
 *  Block of function and variables to save the progress of the user  *
 **********************************************************************/

Game.logEvent = null;

Game.startSaveUserProgress = function() {
	
	if (Game.logEvent == null)
		Game.logEvent = Game.editor.addChangeListener(function() {
			
			if (Game.missionView) // it's when the user achieved this mission, but came back to test or see something. 
				return;
			
			if (Blockly.Block.dragMode_ != 0)
				return;
			
			var now = new Date().getTime();
			var timeSpent = 0;
			if (Game.currTime != 0)
				timeSpent = Math.floor(((now) - Game.currTime) / 1000);
			
			if (timeSpent < 10) // the minimum interval to log the actions is 10 seconds
				return; 
			
			/*
			var answer = "<xml></xml>";
			if (Blockly.mainWorkspace != null) 
				answer = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
			*/
			
			var answer = Game.workspaceAnswer(); 
			UserControl.saveMission(0, 0, timeSpent, Game.howManyRuns, false, Game.runningStatus, Blockly.getMainWorkspace().scale, answer);

			Game.currTime = now;
		});
};

// because there are some events from the last mission, and the canvas instance 
// ... changed, then we need renovate the listeners  
Game.removeChangeListeners = function() {
  if (Game.scrollEvent != undefined) {
	  
	  window.removeEventListener("scroll", Game.scrollEvent);
	  //window.removeEventListener("resize", Game.resizeWindow); // not enable this line
	  window.removeEventListener('beforeunload', Game.unload);
	  
	  MyBlocklyApps.unbindClick('musicControl', Game.musicControlClick);

	  MyBlocklyApps.unbindClick('runButton', Game.runButtonClick);
	  MyBlocklyApps.unbindClick('resetButton', Game.resetButtonClick);
	  MyBlocklyApps.unbindClick('debugButton', Game.debugButtonClick);
	  
	  MyBlocklyApps.unbindClick('openGoalsButton', Game.openGoalsButtonClick);
	  MyBlocklyApps.unbindClick('closeGoalsButton', Game.closeGoalsButtonClick);

	  MyBlocklyApps.unbindClick('goalButton', Game.goalButtonClick);
	  MyBlocklyApps.unbindClick('logoffButton', Game.goBackToDashboard);

	  MyBlocklyApps.unbindClick('instructionButton', Game.instructionButtonClick);
	  MyBlocklyApps.unbindClick('showBadgesButton', Game.openAchievementList);
	  
	  MyBlocklyApps.unbindClick('wizardFreeButton', Game.wizardFreeButtonClick);
	  MyBlocklyApps.unbindClick('wizardPayButton', Game.wizardPayButtonClick);
	  
  }
  
  if (Blockly.mainWorkspace != null) {
	  
	  if (Game.logEvent != null) {

		  Blockly.mainWorkspace.removeChangeListener(Game.logEvent);
		  Game.logEvent = null;
	  }
	  
	  if (Hints.evtChangeListener != null) {

		  Blockly.mainWorkspace.removeChangeListener(Hints.evtChangeListener);
		  Hints.evtChangeListener = null;
	  }
  }
	
};


/**********************************************************************
 *                          Finish block                              *
 **********************************************************************/

Game.initApi = function(interpreter, scope) {
    // utilities commands
	var wrapper = function() {
        return interpreter.createPrimitive(Game.updateVariables());
      };
    
    interpreter.setProperty(scope, 'updateVariables',
          interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return interpreter.createPrimitive(alert(id));
      };
    
    interpreter.setProperty(scope, 'alert',
          interpreter.createNativeFunction(wrapper));
    
    wrapper = function(id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(Game.highlightBlock(id));
      };
    
    interpreter.setProperty(scope, 'highlightBlock',
          interpreter.createNativeFunction(wrapper));

	wrapper = function(a0, a1, op) {
        return interpreter.createPrimitive(nobugsComparison(a0, a1, op));
      };
    
    interpreter.setProperty(scope, 'nobugsComparison',
          interpreter.createNativeFunction(wrapper));

	wrapper = function(a0, a1, op) {
        return interpreter.createPrimitive(nobugsMathArith(a0, a1, op));
      };
    
    interpreter.setProperty(scope, 'nobugsMathArith',
          interpreter.createNativeFunction(wrapper));

	wrapper = function(op) {
        return interpreter.createPrimitive(NoBugsJavaScript.verifyLogicOperation(op));
      };
    
    interpreter.setProperty(scope, 'verifyLogicOperation',
          interpreter.createNativeFunction(wrapper));

   wrapper = function(f, t) {
        return interpreter.createPrimitive(Game.setTimeout(f.data, t.data));
      };
      
    interpreter.setProperty(scope, 'mySetTimeout',
          interpreter.createNativeFunction(wrapper));
    
    
    wrapper = function(v) {
        return interpreter.createPrimitive(Game.verifyVariableInitialized(v));
      };
    
    interpreter.setProperty(scope, 'verifyVariableInitialized',
          interpreter.createNativeFunction(wrapper));

    
    // Move commands
	wrapper = function(n) {
      return interpreter.createPrimitive(hero.goToBarCounter(n));
    };
    
    interpreter.setProperty(scope, 'goToBarCounter',
        interpreter.createNativeFunction(wrapper));

	wrapper = function(n) {
	      return interpreter.createPrimitive(hero.goToTable(n));
	    };
	    
    interpreter.setProperty(scope, 'goToTable',
        interpreter.createNativeFunction(wrapper));

	wrapper = function() {
	      return interpreter.createPrimitive(hero.goToDisplay());
	    };
	    
    interpreter.setProperty(scope, 'goToDisplay',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
	      return interpreter.createPrimitive(hero.goToCooler());
	    };
	    
    interpreter.setProperty(scope, 'goToCooler',
      interpreter.createNativeFunction(wrapper));
    
	// see commands
    wrapper = function() {
	      return interpreter.createPrimitive(hero.isThereACustomer());
	    };
	    
    interpreter.setProperty(scope, 'isThereACustomer',
      interpreter.createNativeFunction(wrapper));
    
    // ask the customer commands
    wrapper = function() {
	      return interpreter.createPrimitive(hero.hasHunger());
	    };
		  
    interpreter.setProperty(scope, 'hasHunger',
	      interpreter.createNativeFunction(wrapper));
  
    wrapper = function() {
        return interpreter.createPrimitive(hero.askForFood());
    };
    
    interpreter.setProperty(scope, 'askForFood',
         interpreter.createNativeFunction(wrapper));

    
    wrapper = function() {
        return interpreter.createPrimitive(hero.askWantHowManyDrinks());
    };
    
    interpreter.setProperty(scope, 'askWantHowManyDrinks',
            interpreter.createNativeFunction(wrapper));

   wrapper = function() {
        return interpreter.createPrimitive(hero.askWantHowManyFoods());
    };
    
    interpreter.setProperty(scope, 'askWantHowManyFoods',
         interpreter.createNativeFunction(wrapper));

    wrapper = function() {
	      return interpreter.createPrimitive(hero.hasThirsty());
	    };
		    
    interpreter.setProperty(scope, 'hasThirsty',
  	      interpreter.createNativeFunction(wrapper));
    
    wrapper = function() {
	      return interpreter.createPrimitive(hero.askForDrink());
	    };
	    
    interpreter.setProperty(scope, 'askForDrink',
      interpreter.createNativeFunction(wrapper));
    
    // about juice
    wrapper = function() {
	      return interpreter.createPrimitive(hero.goToBoxOfFruits());
	    };

	interpreter.setProperty(scope, 'goToBoxOfFruits',
		  interpreter.createNativeFunction(wrapper));
	
    wrapper = function() {
	      return interpreter.createPrimitive(hero.goToJuiceMachine());
	    };

	interpreter.setProperty(scope, 'goToJuiceMachine',
		  interpreter.createNativeFunction(wrapper));
	    
    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.pickUpFruits(o));
	    };

	interpreter.setProperty(scope, 'pickUpFruits',
		  interpreter.createNativeFunction(wrapper));
    
    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.prepareAndPickUpJuice(o));
	    };

	interpreter.setProperty(scope, 'prepareAndPickUpJuice',
		  interpreter.createNativeFunction(wrapper));
	
	// about ice cream
    wrapper = function() {
        return interpreter.createPrimitive(hero.goToIceCreamMachine());
      };
    
    interpreter.setProperty(scope, 'goToIceCreamMachine',
          interpreter.createNativeFunction(wrapper));

    wrapper = function(o) {
        return interpreter.createPrimitive(hero.pickUpIceCream(o));
      };
    
    interpreter.setProperty(scope, 'pickUpIceCream',
          interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(hero.askWantHowManyIceCream());
      };
    
    interpreter.setProperty(scope, 'askWantHowManyIceCream',
          interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(hero.askForIceCream());
      };
    
    interpreter.setProperty(scope, 'askForIceCream',
          interpreter.createNativeFunction(wrapper));

	// other commands
    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.pickUpHotDog(o));
	    };

	interpreter.setProperty(scope, 'pickUpHotDog',
		  interpreter.createNativeFunction(wrapper));
	
    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.pickUpDrink(o));
	    };
	    
    interpreter.setProperty(scope, 'pickUpDrink',
	  interpreter.createNativeFunction(wrapper));

    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.deliver(o));
	    };
	    
    interpreter.setProperty(scope, 'deliver',
      interpreter.createNativeFunction(wrapper));
    
	wrapper = function(t) {
	      return interpreter.createPrimitive(hero.talk(t));
	    };
	    
	interpreter.setProperty(scope, 'talk',
		interpreter.createNativeFunction(wrapper));

	// Money
	wrapper = function(v) {
	      return interpreter.createPrimitive(hero.cashIn(v));
	    };
	    
	interpreter.setProperty(scope, 'cashIn',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(v, m) {
	      return interpreter.createPrimitive(hero.giveChange(v, m));
	    };
	    
	interpreter.setProperty(scope, 'giveChange',
		interpreter.createNativeFunction(wrapper));

	// array functions
	wrapper = function(s) {
	      return interpreter.createPrimitive(NoBugsJavaScript.arrayCreate(s));
	    };
	    
	interpreter.setProperty(scope, 'arrayCreate',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(a, i) {
	      return interpreter.createPrimitive(NoBugsJavaScript.arrayGetValue(a, i));
	    };
	    
	interpreter.setProperty(scope, 'arrayGetValue',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(a, i, v) {
	      return interpreter.createPrimitive(NoBugsJavaScript.arraySetValue(a, i, v));
	    };
	    
	interpreter.setProperty(scope, 'arraySetValue',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(a) {
	      return interpreter.createPrimitive(NoBugsJavaScript.arrayLength(a));
	    };
	    
	interpreter.setProperty(scope, 'arrayLength',
		interpreter.createNativeFunction(wrapper));

	
	//
	wrapper = function(a, f) {
	      return interpreter.createPrimitive(Game.changeTab(a, f));
	    };
	    
	interpreter.setProperty(scope, 'changeTab',
		interpreter.createNativeFunction(wrapper));
	
	
    // extended commands
    for (var i=0; i<hero.extendedCommands.length; i++) {
    	wrapper = function(o) {
    	  var ex = interpreter.stateStack[0].func_.ex;
    	  return interpreter.createPrimitive(ex.run(ex.machine, o));
  	    };
  	    
  	  var nf = interpreter.createNativeFunction(wrapper);
  	  nf.ex = hero.extendedCommands[i];
  	  interpreter.setProperty(scope, nf.ex.nameLang, nf);
    }
  
};

/**********************************************************************************************************/ 
/**                                     Wait command management                                          **/
/**********************************************************************************************************/ 

Game.waitFunction = false;

Game.setTimeout = function(funcName, time) {
	Game.waitFunction = true;
	Game.funcName = funcName;
	setTimeout(Game.runFunction, time);
};

Game.runFunction = function() {
	Game.waitFunction = false;
	
	var node = {type: "CallExpression", callee: {name: Game.funcName, type: "Identifier"}, arguments: []};
	Game.jsInterpreter.stateStack.unshift({node: node, components: true});
	
	var noBugs = Game.jsInterpreter.getValueFromScope("NoBugsJavaScript");
	noBugs.properties.timeOut.data = true;
	
};

/**********************************************************************************************************/ 
/**                                     Highlight management                                             **/
/**********************************************************************************************************/ 

Game.highlightPause = false;

Game.highlightBlock = function(id) {
	
	if (!Blockly.mainWorkspace.traceOn_) // this happens when there was a previous block selected
		Game.editor.traceOn(true);
	
	BlocklyApps.log.push(['IM', 0]);
	BlocklyApps.log.push(['IM', 0]);
	BlocklyApps.log.push(['IM', 0]);
	BlocklyApps.log.push(['IM', 0]);
	BlocklyApps.log.push(['IM', 0]);
	
	CustomerManager.update(5);
	
    Game.editor.highlightBlock(id);
	Game.updateVariables();	

	Game.highlightPause = true;
};

/**
 * Iterate through the recorded path and animate the actions.
 */
Game.animate = function() {
 
  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
	if (Game.runningStatus == 2) {
		Game.enableButton('debugButton');
        Hints.startHints();
	}
    return;
  }
  var command = tuple.shift();
  
  if (command === "nextStep") {
	  Game.pidList.push( window.setTimeout(Game.nextStep, 1) );
	  return;
  }
  
  if (Game.step(command, tuple)) {

	  // call the next animate when the animation of the last command has finished
	  //if (Game.runningStatus === 1) 
	  Game.stepSpeed =  (1000 * Math.pow(1 - Game.speedSlider.getValue(), 3)) + Game.speedMultFactor ;

	  Game.pidList.push( window.setTimeout(function() {Game.animate();}, Game.stepSpeed) );
   } else {
	   // TODO ???
	  Game.resetButtons(false);
	  Game.editor.highlightBlock(null);
	  
  }
};

/**
 * Execute one step in the solution. Returns amount of time consumed by this step
 * @param {string} command 
 * @param {!Array} values List of arguments for the command.
 */
Game.step = function(command, values) {
	
	if (command === 'fail') {
  		Game.showError(values);
  		return false;
	}
	
	hero.animate(command, values);
	CustomerManager.animation();
	
	Game.display();
	
	return true;

};

Game.showError = function(iderror) {
	
	Game.finishedRun();
	
	Hints.stopHintsEx();
	Game.lastErrorData.iderror = iderror[0];
	
	var content = document.getElementById('dialogError');
	var container = document.getElementById('dialogErrorText');
	var msg = iderror[0];
	if (msg.indexOf("$") == 0) {
		UserControl.getMessage(msg.substring(1), BlocklyApps.LANG, {callback:function(msgret) {msg = msgret;}, async:false});
		msg = msg.replace(/\\nn/g, '<br/>');
	} else
		msg = BlocklyApps.getMsg(msg);
	
	if (iderror.length > 0)
		msg = msg.format(iderror[1]);
	
	container.innerHTML = msg;
	
	Game.lastErrorData.block = Blockly.selected;
	Game.lastErrorData.message = container.textContent;
	
	var blockid = (Blockly.selected == null?0:Blockly.selected.id);
	
	if (!Game.missionView)
		UserControl.missionError(Game.howManyRuns, CustomerManager.currentTest+1, iderror[0], blockid, container.textContent);
	
    var style = {top: '120px', width: 'auto'}; // };//{width: '370px', 
	style[Blockly.RTL ? 'right' : 'left'] = '215px';
	var origin = Blockly.mainWorkspace.topBlocks_[Blockly.mainWorkspace.topBlocks_.length-1].getSvgRoot();
	
	MyBlocklyApps.showDialog(content, origin, true, true, false, "", style, 
			function() { 
				Hints.startHintsEx();
				Hints.showErrorHint(); 
			});

};

Game.lastErrorHas = function(blockName) {
	
	if (Game.lastErrorData.block == null) return;
	
	var input = Game.lastErrorData.block.inputList;
	
	for (var i=0; i<input.length; i++) {
		if (input[i].connection != null) {
			if (input[i].connection.targetConnection != null) {
				if (input[i].connection.targetConnection.sourceBlock_.type === blockName)
					return true;
			}
		} 
	}
	
	return false;
};

Game.alertOpacity = [0.25, 0.5, 0.75, 1];
Game.handleAlertTimer = 0;

Game.alertGoalButton = function() {
	
	if (Game.handleAlertTimer != 0)
		return;
	
	Game.alertControl = 0;	
	
	Game.handleAlertTimer = 
		window.setInterval(function() {
			var gb = document.getElementById("goalButton");
			gb = gb.getElementsByTagName("img")[0];
			Game.alertControl = (Game.alertControl + 1) % 4;
			gb.style.opacity = Game.alertOpacity[Game.alertControl];
		}, 300);
};

Game.stopAlertGoalButton = function() {
	
	if (Game.handleAlertTimer == 0)
		return;
	
	window.clearInterval(Game.handleAlertTimer);
	Game.handleAlertTimer = 0;
	
	var gb = document.getElementById("goalButton");
	gb = gb.getElementsByTagName("img")[0];
	gb.style.opacity = "";
	
};

Game.readVariableTest = function(variableName) {
	// it is supposed that there are the variables
	var tests = Game.mission.childNodes[0].getElementsByTagName("testsvars")[0].getElementsByTagName("test");
	
	var vars = tests[CustomerManager.currentTest].getElementsByTagName("var");
	for (var i = 0; i < vars.length; i++)
		if (vars[i].getAttribute("name") === variableName)
			return vars[i].textContent.trim(); 
	
	return null;
	
};

Game.addCallTimes = function(block) {
	if (Game.callTimes[block] === undefined) {
		Game.callTimes[block] = 0;
	}
	
	Game.callTimes[block]++;
};

$(document).on('click', function(e) {
	if (e.target.id !== "ButtonLogin" && (Game.loginData == null || Game.loginData == undefined)) 
		return;
	
	
	var t = e.target;
	if (t.nodeName === "svg") {
		return;
	}
	
	while (t != null && t.id === "") {
		t = t.parentNode;
	}
	
	if (t == null)
		return;
	
	if (t.id === "blockly") {
		if (e.target.nodeName === "image") {
			var cp = e.target.getAttribute("clip-path");
			if (cp != null)
				LogClick.store(cp.substring(5));
			return;
		}
		
		return;
	}
	
	LogClick.store(t.id);
});

Game.onObjectiveAccomplished = function(params) {
	if (Game.clickReseting) return;
	
	var i = params[0], j = params[1];
	var msg = BlocklyApps.getMsg("NoBugs_GoalsAccomplished");	
	msg = msg.format(i, j);
	$("#goalsAccomplishedText").html(msg);
	$("#goalsAccomplishedTextHeader").html(msg);

	var container = document.getElementById("goalsAccomplishedWindowText");
	var firstTime = container.innerHTML === "";
	container.innerHTML = "";
	Explanation.createGoals(container);
	
	if (firstTime)
		$("#goalsAccomplishedWindow").css("top", $("#goalsAccomplished").position().top - $("#goalsAccomplishedWindow").height());
};

