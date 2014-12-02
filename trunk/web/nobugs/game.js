/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://nobugssnackbar.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This code is based on Mazed application
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
Game.howManyRuns = 0; // in this session

var hero;
Game.mission = null;

/**
 * PID of animation task currently executing.
 */
Game.pidList = [];


Game.money = 0;
Game.currentlyMoney = Game.money;

Game.lastErrorData;
Game.jsInterpreter;
Game.variableBox = null;

Game.DOWN = 1;
Game.RIGHT = 2;
Game.varWindow = Game.RIGHT;

Game.counterInstruction = null;
/**
 * Initialize Blockly and SnackBar. Called on page load.
 */
Game.init = function() {
	
	Game.currTime = 0;
	
	PreloadImgs.put('fundo', 'images/fundo.png');
	PreloadImgs.put('doors', 'images/doors.png');
	
    PreloadImgs.loadImgs();
    
    // if the user's key is stored in cookies, then the system will not show the login dialog
    UserControl.verifyLogged(function(ret) {
		
		if (ret[0]) 
			Game.renderQuestionnaire(ret[1], ret[2], ret[3], ret[4], ret[5]);
		else {
			window.removeEventListener('unload', Game.unload);

  		    document.getElementById("mainBody").style.display = "none";
		    document.getElementById("initialBackground").style.display = "inline";

	    	var lu = document.getElementById("loginuser");
		    document.getElementById("errorLogin").style.left = lu.offsetLeft + "px";

		}
	});


};

window.addEventListener('load', Game.init);


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
	  			
  				Game.renderQuestionnaire(ret[1], ret[2]);
	  			
	  				  			
	  		} else {
	  			error.innerHTML = BlocklyApps.getMsg(ret[0]);
	  		}
  		  }
    );
};

Game.renderQuestionnaire = function(u, missionsHistorical, clazzId, levelId, missionIdx) {
	/*
	 * missionsHistorical [...][n], where n are 
	 *   0 - class name
	 *   1 - level name
	 *   2 - how many missions
	 *   3 - how many solved missions
	 *   4 - class id
	 *   5 - level id
	 */
	Game.loginData = {userLogged: u, missionHist: missionsHistorical, clazzId: clazzId, levelId:levelId , missionIdx:missionIdx };
	
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
	//TODO consistir formulario

	var consistido = Questionnaire.consistQuestionnaire();
	
	if (consistido) {
		
		Questionnaire.handlingQuestionnaire();
		
		BlocklyApps.hideDialog(false);

		Game.continueLoginProcess();
	}
};

Game.continueLoginProcess = function() {
	if (Game.loginData.userLogged.lastTime == null) {
		
		var userName = document.getElementById("userCompleteName");
		userName.innerHTML = Game.loginData.userLogged.name;
		
		var intro2 = BlocklyApps.getMsg("NoBugs_intro2");
		intro2 = intro2.format((Game.loginData.userLogged.sex==="M"?BlocklyApps.getMsg("King"):BlocklyApps.getMsg("Queen")));
		
		
		var intro2Span = document.getElementById("NoBugsIntro2");
		intro2Span.innerHTML = intro2;
		
		MyBlocklyApps.showDialog(document.getElementById('dialogIntro'), 
				null, false, true, true, "Intro", {width: "540px"},null);
		
	} else 
		Game.logged(Game.loginData.missionHist);
	
};

Game.finishIntro = function() {
	BlocklyApps.hideDialog(false);
	Game.logged(Game.loginData.missionHist);
};

Game.logged = function(missionsHistorical) {
	
	UserControl.updateUserLastTime();
	
	if (Game.variableBox != null)
		Game.variableBox.style.display = "none";
	
	
	if (Game.loginData.clazzId == undefined || Game.loginData.clazzId == 0) {

		// this is necessary when unloads
	    document.getElementById("mainBody").style.display = "none";
	    document.getElementById("initialBackground").style.display = "inline";
		 
		var idRoot = Game.missionsRetrieved(missionsHistorical);
		var content = $("<div/>")
				.append($("#" + idRoot))
				.append(nobugspage.logoffDlgButton(null, null, null));

		MyBlocklyApps.showDialog(content[0], null, false, true, true,
					BlocklyApps.getMsg("_missions"), null, 
					function() { $("#" + idRoot).remove();});
	} else {
		Game.missionSelected(Game.loginData.clazzId, Game.loginData.levelId, Game.loginData.missionIdx);
	}
};

Game.missionsRetrieved = function(missions) {
	var s = [];
	
	var data = [];
	for (var i= 0; i<missions.length; i++){
		var rec = null;
		var idx = s.indexOf(missions[i][0]);
		if (idx == -1) {
			s.push(missions[i][0]);
			
			rec = {clazz: missions[i][0], clazzId: missions[i][4], levels:[]};
			data.push(rec); 
			
		} else {
			rec = data[idx];
		}
		
		var l = {name: missions[i][1], id: missions[i][5], howManyMissions: missions[i][2], howManyAchieved: missions[i][3]};
		rec.levels.push(l);
	}
	
	var useAccordion = data.length > 1;
	if (useAccordion) {
		if (document.getElementById("aa") != null) {
			$( "#aa" ).remove();
		}
			
		var ac = $('<div id="aa"/>').addClass("easyui-accordion").addClass("accordion").appendTo("body");
		
		ac.accordion({
		    animate:false
		});
		
	}
	
	var wMax = 0;
	for (var i = 0; i <data.length; i++) {
		
		var lastAllAchieved = true;
		
		var appendTo = "body";
		if (useAccordion) {
			
			$('#aa').accordion('add', {
				title: data[i].clazz
			} );
			
			appendTo = $('#aa').accordion('getPanel', i);
		}
		
		var idTabs = "tt" + i;
		var tabs = $('<div id = "'+idTabs+'"/>')
						.addClass('easyui-tabs')
						.addClass('tabs-container')
						.appendTo(appendTo);
		
		$('#'+idTabs).tabs();
		
		for (var j = 0; j < data[i].levels.length; j++) {

			var id = 'selectMissionPanel' + i + j;
			var div = $('<div id = "'+id+'"/>')
				  			.addClass('selectMissionPanel');
			
			var mm = parseInt(data[i].levels[j].howManyMissions);
			var ma = parseInt((lastAllAchieved?data[i].levels[j].howManyAchieved:"-1"));
			$('#'+idTabs).tabs('add',{
			    title: data[i].levels[j].name,
			    content: div,
			    selected: (ma < mm && lastAllAchieved)
			});
			
			var w = Game.createGridView("#" + id , mm, ma, data[i].clazzId, data[i].levels[j].id);
			
			lastAllAchieved = ma == mm;
				
			if (w > wMax)
				wMax = w;
			
		}
		
	}

	for (var i = 0; i <data.length; i++) {
		$('#tt'+i).tabs({
		    width: wMax + 50,
			border:false
		});
	}
		
	$('#aa').accordion({
	    animate:false,
	    border:false,
	    width: wMax + 50
	});
	
	return (useAccordion?"aa": "tt0");
	
	
};

Game.createGridView = function (missionPanel, numberOfMissions, missionsAchieved, clazzId, levelId) {
    var missionTarget = missionsAchieved + 1;
    for (var i=1; i<=numberOfMissions; i++) {
    	var imgs = generateImages(i, 2);
    	var div = $('<div />')
    	    .attr("idclazz", clazzId)
    		.attr("idmission", i)
    	    .attr("idlevel", levelId)
  			.addClass('gridViewChild')
  			.addClass('missionSquare')
  			.html($.each(imgs, function(i){
  				   imgs[i] = "<img src='images/"+this+"'/>";
			         }));
			if (i < missionTarget) {
				div.addClass('missionEnabled');
			} else
	    	if (i == missionTarget) {
	    		div.addClass('missionTarget');
	    	} else 
	    		div.addClass('missionDisabled');
    	
	        $(missionPanel).append(div);
    }
	 var l = Math.ceil(Math.sqrt(numberOfMissions));
	 
	 var onPosition = function(i, zoomedChild, margin) { 
		 return {x: (70 * (i%l)) + margin, 
			 	 y: (70 * Math.floor(i/l)) + margin}; 
		};
	 
	 $(missionPanel).gridview({
		 						draggable: false,
		 						scrollToZoom: false, 
		 						animationSpeed: 0,
								width: (l*70)+10,
		 						height: (l*70)+10,
		 						onPosition: onPosition
		 					});
	 
	 $(missionPanel).gridview("zoom",
			 {level: l});
	 
	 // without unbind, i need this code must appear just in one loop
	 $('.missionSquare').unbind('click').click(function (evt) {
		 if (this.className.indexOf("missionTarget") >= 0) {
			 var clazzId = this.getAttribute("idclazz");
			 var missionIdx = this.getAttribute("idmission");
	    	 var levelId = this.getAttribute("idlevel");
	    	 BlocklyApps.hideDialog(true);
			 
			 Game.missionSelected(clazzId, levelId, missionIdx);
			 
		 }
	 });

	 return $(missionPanel).width();
	
};

Game.missionSelected = function(clazzId, levelId, missionIdx) {
	
  document.getElementById("initialBackground").style.display = "none";
  
  document.getElementById("mainBody").style.display = "inline";
  if (Game.counterInstruction != null) {
	  mainBody.removeChild(Game.counterInstruction);
	  Game.counterInstruction = null;
  }
	  			
  Game.removeChangeListeners();

  BlocklyApps.init();
	
  UserControl.retrieveMoney(function(ret) {
	  Game.money = ret;
  });

  NoBugsJavaScript.redefine();
  
  Game.rtl = BlocklyApps.isRtl(); // Right-To-Left language. I keep this, but it's not our initial intention
    
  Game.optResize = {
	blocklyDivW: 600,
	blocklyDivH: "90%",
	varBoxT: true,
	varBoxH: "90%"
  };
  
  Game.scrollEvent =  function() {
	  Hints.hideHintWithTimer();
      Game.doResizeWindow();
    };
    
  window.addEventListener('scroll', Game.scrollEvent);  
  window.addEventListener('resize',  Game.resizeWindow);

  Blockly.Generator.prototype.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'highlightBlock(%1);\n';

  // Add to reserved word list: API, local variables in execution environment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Game, code');

  window.addEventListener('unload', Game.unload);
 
  Game.slider = {};
  Game.slider.svg = document.getElementById('slider');
  Game.slider.svg.style.visibility = "hidden";
  
  if (Game.speedSlider == undefined)
	  Game.speedSlider = new Slider(10, 35, 130, Game.slider.svg);

  BlocklyApps.bindClick('runButton', Game.runButtonClick);
  BlocklyApps.bindClick('resetButton', Game.resetButtonClick);
  BlocklyApps.bindClick('debugButton', Game.debugButtonClick);

  //BlocklyApps.bindClick('nextMissionButton', Game.nextMissionButtonClick);
  BlocklyApps.bindClick('goalButton', Game.goalButtonClick);
  BlocklyApps.bindClick('logoffButton', Game.logoffButtonClick);
  //BlocklyApps.bindClick('xmlButton', Game.xmlButtonClick);

 // BlocklyApps.bindClick('moveDown', Game.moveDownButtonClick);
 // BlocklyApps.bindClick('moveRight', Game.moveRightButtonClick);
  
  Game.variableBox = document.getElementById('variableBox');
  Game.blockly = document.getElementById('blockly');
  
  Game.ctxDisplay = document.getElementById('display').getContext('2d');
  Game.imgBackground = PreloadImgs.get("fundo");	

  Game.imgDoor = PreloadImgs.get("doors");
  
  Game.lastErrorData = new Object();
  Game.lastErrorData.iderror = 0;
  Game.lastErrorData.message = "";
  Game.lastErrorData.block = null;
  
  try {
	  UserControl.loadMission(clazzId, levelId, missionIdx, Game.missionLoaded);
  } catch (ex) {
	  Game.init();
  }

};

Game.unload = function(e) {

	Game.saveMission();
	
    return null;
};

Game.onload = function(e) {
	console.log(navigator.appName);
	if ((validateIE() || validateOpera()) && (!validateChrome() || !validateFirefox() || !validateSafari())) {
		window.location.herf = "error.html";
	}
	
	function validateIE() {
		return navigator.appName == "Microsoft Internet Explorer";
	}
	
	function validateChrome() {
		return navigator.appName == "Netscape";
	}
	
	function validateFirefox() {
		return navigator.appName == "Netscape";
	}
	
	function validateSafari() {
		return navigator.appName == "Netscape";
	}
	
	function validateOpera() {
		return navigator.appName == "Opera";
	}
};

Game.saveMission = function() {
	
	var answer = null;
	if (Blockly.mainWorkspace != null) 
		answer = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
	var timeSpent = 0;
	if (Game.currTime != 0)
		timeSpent = Math.floor(((new Date().getTime()) - Game.currTime)/1000);
	
	UserControl.saveMission(0, timeSpent, Game.howManyRuns, false, answer, 
			{callback:function() {}, async:false});
	
	Game.currTime = new Date().getTime();
	
};

Game.missionLoaded = function(ret){
	
  Game.howManyRuns = parseInt(ret[4]);
	
  var xml = ret[1];
  var mission = transformStrToXml(xml);
  var t = BlocklyApps.getMsg("_mission");
  Game.missionTitle =  t.charAt(0).toUpperCase() + t.substring(1) + " " + ret[0];
	  
  var commands = mission.childNodes[0].getElementsByTagName("commands")[0];
  
  Game.slider.timesBefore = 0;
  
  var slider = mission.childNodes[0].getElementsByTagName("slider");
  if (slider.length > 0) {
	  Game.slider.timesBefore = parseInt(slider[0].getAttribute("timesBefore"));
  }
  if (Game.howManyRuns >= Game.slider.timesBefore) {
	  Game.slider.svg.style.visibility = "visible";
  }
   
  
  var toolbox = nobugspage.toolbox(null, null, 
		  {enabled: Explanation.selectCommands(commands)}); // xml definition of the available commands
  
  document.getElementById('blockly').innerHTML = ""; // clean the editor
  Blockly.inject(document.getElementById('blockly'),
      {path: '',
       rtl: Game.rtl,
       toolbox: toolbox,
       trashcan: true});


  var objectives = mission.childNodes[0].getElementsByTagName("objectives")[0];
  Game.verifyButtons(objectives);
  
  hero = new SnackMan(objectives, mission);
  var sourceXML = mission.childNodes[0].getElementsByTagName("xml")[0];
  if (ret[2] != null) // the user try this mission before, than load the previous code
	  Game.nextPartOfMissionLoaded(false, ret[2], mission, ret[3]);
  else {
      var preload = sourceXML.getAttribute("preload");
	  if (preload != null) {
		  UserControl.loadAnswer(preload, function (ret) {
			  Game.nextPartOfMissionLoaded(true, ret, mission, 0);
		  });
	  }
	  else {
		  var outerHTML = sourceXML.outerHTML || (new XMLSerializer()).serializeToString(sourceXML);
		  Game.nextPartOfMissionLoaded(true, outerHTML, mission, 0);
	  }
  }
};
  
Game.nextPartOfMissionLoaded = function(firstTime, answer, mission, timeSpent) {
	
  var xml = Blockly.Xml.textToDom(answer);
  MyDomToWorkspace(Blockly.mainWorkspace, xml);
  
  Game.moveBlocks();
  
  Game.firstTime = firstTime;
  
  var loginLoaded = function(data) {
      
      CustomerManager.init(data.childNodes[0].getElementsByTagName("customers")[0],
    		  			   data.childNodes[0].getElementsByTagName("customersSN")[0]);
      
      Game.mission = data;
	  Game.reset();
	  
	  Game.bonusTime = data.childNodes[0].getElementsByTagName("objectives")[0].getAttribute("bonusTime");
	  Game.bonusTimeReward = data.childNodes[0].getElementsByTagName("objectives")[0].getAttribute("bonusTimeReward");
	  Game.addCronometro(Game.bonusTime , timeSpent );
	  
	  Game.showCountInstructions();
	  
	  // Lazy-load the syntax-highlighting.
	  window.setTimeout(Game.importPrettify, 1);
	  
	  if (firstTime) {
		  var explanation = Explanation.parseUserLogged(mission.childNodes[0].getElementsByTagName("explanation")[0]);
		  
		  Explanation.showInfo(explanation, true);
	  } else {
		  Hints.init(data.getElementsByTagName("hints")[0]);
		  Game.initTime();
	  }
	  
	  
  };

  window.setTimeout(function(){loginLoaded(mission);}, 1000); 
	  
	  
}; 

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
		//var xy = blocks[i].getRelativeToSurfaceXY();
		blocks[i].setDragging_(true);
		blocks[i].moveBy(minPosX, minPosY);
		//Game.moveConnections_(blocks[i], minPosX, minPosY);
		blocks[i].setDragging_(false);
	}	
	
};

Game.moveConnections_ = function(block_, dx, dy) {
	  if (!block_.rendered) {
	    // Rendering is required to lay out the blocks.
	    // This is probably an invisible block attached to a collapsed block.
	    return;
	  }
	  var myConnections = block_.getConnections_(false);
	  for (var x = 0; x < myConnections.length; x++) {
	    myConnections[x].moveBy(dx, dy);
	  }
	  var icons = block_.getIcons();
	  for (var x = 0; x < icons.length; x++) {
	    icons[x].computeIconLocation();
	  }

	  // Recurse through all blocks attached under this one.
	  for (var x = 0; x < block_.childBlocks_.length; x++) {
	    this.childBlocks_[x].moveConnections_(dx, dy);
	  }
	};



Game.verifyButtons = function(objectives) {
	Game.enabledDebug = objectives.getAttribute("buttonDebug") !== "false";
	Game.enabledRun = objectives.getAttribute("buttonRun") !== "false";
	Game.enabledVarWindow = objectives.getAttribute("variableWindow") !== "false";
	
	if (!Game.enabledDebug)
		Game.disableButton('debugButton');
	
	if (!Game.enabledRun)
		Game.disableButton('runButton');

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

Game.addCronometro = function(bonusTime, timeSpent) {

	$('#timerCountUp').empty();
	Game.cronometro = null;
	
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

Game.initTime = function() {
	
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

// I dont know what this feature do in the game. 
// This is a copy from commons.js importPrettify function. Because my prettify files are in another
//   place, I need to overwrite this function.
Game.importPrettify = function() {
	  //<link rel="stylesheet" type="text/css" href="../prettify.css">
	  //<script type="text/javascript" src="../prettify.js"></script>
	  var link = document.createElement('link');
	  link.setAttribute('rel', 'stylesheet');
	  link.setAttribute('type', 'text/css');
	  link.setAttribute('href', 'prettify.css');
	  document.head.appendChild(link);
	  var script = document.createElement('script');
	  script.setAttribute('type', 'text/javascript');
	  script.setAttribute('src', 'prettify.js');
	  document.head.appendChild(script);
};

Game.doResizeWindow = function(style) {
	if (Game.variableBox == null)
		return; // this happens in the select mission dialog
	
	if (style != undefined) {
	  Game.variableBox.style.display = style;
	}
	Game.resizeWindow(null);
    Blockly.fireUiEvent(window, 'resize');
};

Game.resizeWindow = function(e) {
	
	var visualization = document.getElementById('visualization'); // the animation area
	var top = visualization.offsetTop;

	Game.blockly.style.top = Math.max(10, top - window.pageYOffset) + 'px';
	Game.blockly.style.left = Game.rtl ? '10px' : '380px';
    var w = window.innerWidth;
    if (Game.variableBox.style.display === "none") {
    	//Game.blockly.style.height = "90%";
        w -= 400;
    	
    } else {
    	Game.blockly.style.height = Game.optResize.blocklyDivH;
        w -= Game.optResize.blocklyDivW;
    	
        Game.variableBox.style.top = (Game.optResize.varBoxT?Game.blockly.style.top:(Game.blockly.offsetTop+Game.blockly.offsetHeight+10)+"px");
        if (Game.optResize.varBoxT) {
        	Game.variableBox.style.left = ((Game.rtl ? 10 : 380) + w + 5) + 'px';
        	Game.variableBox.style.width = "200px";
        }
        else {
        	Game.variableBox.style.left = Game.blockly.style.left;
        	Game.variableBox.style.width =  Game.blockly.style.width;
        }
        Game.variableBox.style.height = Game.optResize.varBoxH;
        
    }
    Game.blockly.style.width = (w) + 'px';
    
    var blocklyLock = document.getElementById("blocklyLock");
	
	if (blocklyLock !== null && blocklyLock !== "undefined" && blocklyLock !== undefined) {
	    blocklyLock.style.cssText = Game.blockly.style.cssText;
	    blocklyLock.style.height = Game.blockly.clientHeight  + "px";;
	    blocklyLock.style.position = "fixed";
	    blocklyLock.style.backgroundColor = "grey";
	    blocklyLock.style.opacity = "0.3";
	}
    
    if (Game.counterInstruction != null)
    	Game.counterInstruction.style.left = (Game.blockly.offsetLeft + Game.blockly.offsetWidth - Game.counterInstruction.clientWidth - 15) + "px";

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
      document.getElementById("moveRight").style.display = 'none';
	  document.getElementById("moveDown").style.display = 'inline-block';
	
	  Game.optResize = {
				blocklyDivW: 600,
				blocklyDivH: "90%",
				varBoxT: true,
				varBoxH: "90%"
			  };
			  
	  Game.doResizeWindow();
};
	
/**
 * Reset the game to the start position, clear the display, and kill any
 * pending tasks.
 */
Game.reset = function() {
	
  Game.stopAlertGoalButton();
  hero.reset();
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

	CustomerManager.animation();

	Game.ctxDisplay.drawImage( Game.imgBackground, 0 , 0, 352, 448 );
	hero.draw(Game.ctxDisplay);
	CustomerManager.draw(Game.ctxDisplay);
	showMoney(Game.money, Game.ctxDisplay);
	
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

Game.goalButtonClick = function() {
	
	Hints.stopHints();
	Blockly.WidgetDiv.hide();
	Game.stopAlertGoalButton();
	Explanation.showInfo(Game.mission.childNodes[0].getElementsByTagName("explanation")[0], false);
	
};

Game.logoffButtonClick = function() {
	
	Hints.stopHints();
	Game.stopAlertGoalButton();
	BlocklyApps.hideDialog(false);
	window.removeEventListener('unload', Game.unload);
	
	var now = new Date().getTime();
	Game.cleanCronometro();

	$('#vars').datagrid('loadData', {
		"total": 0, "rows": []
	});
    Game.doResizeWindow("none");
    Game.killAll();
    Game.runningStatus = 0;
	
    var answer = null;
    var timeSpent = 0;
    if (Game.currTime != 0) {
        answer = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    	timeSpent = Math.floor((now - Game.currTime)/1000);
    	
    }

    document.getElementById('blockly').innerHTML = ""; // clean the editor
	
	UserControl.logoff(timeSpent, Game.howManyRuns, answer, function(){
		// because is synchronous, we need wait to finish the last request 
		Game.init();
		
	});
};

/**
 * Click the run button.  Start the program.
 */
Game.runButtonClick = function() {

  Game.disableButton("runButton");
  Game.enableButton("resetButton");
  Game.disableButton("debugButton");
  
  Game.doResizeWindow("none");
  
  Game.saveMoney();
  
  Blockly.mainWorkspace.traceOn(true);
  Game.execute(1);
};

/**
 * Click the reset button.  Reset the Game.
 */
Game.resetButtonClick = function() {

   Game.lastErrorData.iderror = 0;
   Game.lastErrorData.message = "";
   Game.lastErrorData.block = null;

   Hints.stopHints();
	
  Game.resetButtons();
  Game.reset();
  
  Game.doResizeWindow("none");
  
  Hints.startHints();
  Game.unlockBlockly();
  Game.stopAlertGoalButton();
};

Game.enableButton = function(buttonName) {

	if ((buttonName === "debugButton" && !Game.enabledDebug) ||
		(buttonName === "runButton" && !Game.enabledRun))
		return;
	
   var button = document.getElementById(buttonName);
   button.disabled = "";
   button.className = "primary";
};

Game.disableButton = function(buttonName) {
   var button = document.getElementById(buttonName);
   button.disabled = "disabled";
   button.className = "notEnabled";
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
			Game.doResizeWindow("inline");
			$('#vars').datagrid('resize');
		}
		
  	    Game.saveMoney();
		Blockly.mainWorkspace.traceOn(true);
		Game.firstClick = true;
		
	} else {
		
		Hints.stopHints();
		Game.firstClick = false;
		if (!Blockly.mainWorkspace.traceOn_) // the second complete debug didn't show the highlight on the blocks 
			Blockly.mainWorkspace.traceOn(true);
		
	}
	
	Game.execute(2);
};

Game.resetButtons = function(hideVars) {
	
	Game.disableButton('resetButton');
	
	Game.enableButton('debugButton');
	
	Game.enableButton('runButton');
	
	if (Blockly.mainWorkspace != null)
		Blockly.mainWorkspace.traceOn(false); 
	
	Game.runningStatus = 0;
	
	if (hideVars == undefined || hideVars == true)
		$('#vars').datagrid('loadData', {
			"total": 0, "rows": []
		});
};


/**
 * Execute the user's code.  Heaven help us...
 */
Game.execute = function(debug) {
	
  if (Game.runningStatus === 0) {
	  
	  Game.highlightPause = false;
	  
	  Blockly.hideChaff();
	  Hints.stopHints();
	  Blockly.WidgetDiv.hide();
	  
	  BlocklyApps.log = [];
	  BlocklyApps.ticks = 10000; // how many loops are acceptable before the system define it is in infinite loop ? 
		
		$('#vars').datagrid('loadData', {
			"total": 0, "rows": []
		});

	  // Reset the graphic.
	  Game.reset();

	  
	  try {
		  
		var js = Blockly.JavaScript;
		
		Game.howManyRuns++;

		Game.saveMission();
		
  	    var code = "var NoBugsJavaScript = {};\n" + js.workspaceToCode();
  	    
  	  //  alert(code);
	    Game.jsInterpreter = new NoBugsInterpreter(code, Game.initApi);

		// BlocklyApps.log now contains a transcript of all the user's actions.
        Game.stepSpeed = 1000 * Math.pow(0.5, 3);
	    
        Game.lockBlockly();
	  } catch (e) {
		  
		  if (e == Infinity) { 
			  Game.showError("Error_infinityLoopDetected");
		      Game.resetButtons();
		      return;
		  }
		  
		  console.log(e);
		  
	  };
  }

  Game.runningStatus = debug;
  Game.pidList.push( window.setTimeout(function(){Game.nextStep();},2 )); // nothing in callstack
};

Game.showCountInstructions = function() {

	if (hero.hasCommQtd || hero.objective.maxCommands > 0) {

		var ci = document.createElement("div");
		ci.id = "countInstruction";
		ci.style.position = "absolute";
		ci.style.top = blockly.offsetTop + "px";
		ci.style.backgroundColor = "rgba(153, 152, 152, 0.28)";
		ci.style.opacity = "0.3";
		
		ci.innerHTML = Game.countInstructions(Blockly.mainWorkspace.getTopBlocks()) + " blocks";
		document.getElementById("mainBody").appendChild(ci);

		ci.style.left = (Game.blockly.offsetLeft + Game.blockly.offsetWidth - ci.clientWidth - 15) + "px";
		
		
		Game.counterInstruction = ci;
	} else
		Game.counterInstruction = null;
	
};

Game.updateCounterInstructions = function(howMany) {
	if (Game.counterInstruction == null)
		return;
	
	Game.counterInstruction.innerHTML = howMany + " blocks";
	Game.counterInstruction.style.left = (Game.blockly.offsetLeft + Game.blockly.offsetWidth - Game.clientWidth - 15) + "px";
};

/**
 * Lock block panel during running
 */
Game.lockBlockly = function() {
	
    var blocklyLock = document.createElement("div");
    
    blocklyLock.id = "blocklyLock";
    blocklyLock.style.cssText = Game.blockly.style.cssText;
    blocklyLock.style.height = Game.blockly.clientHeight + "px";
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

Game.updateVariables = function() {
	
	var totalrows = Game.jsInterpreter.variables.length;
	var rows = [];
	
	Game.jsInterpreter.variables.forEach(function(entry) {
		var data = entry.scope.properties[entry.name].data;
		if (data != undefined) {
			if (data.type != undefined) {
				data = "<div>" + 
						"<p style='margin: 0px' class="+data.type+"><img src='images/"+ data.descr + ".png'/></p>"+
						"<p style='margin: 0px'>"+BlocklyApps.getMsg("__" + data.sourceType)+" "+CustomerManager.getCustomerPosition(data.source)+"</p>" +  
						"</div>";
			}
				
			rows.push({"name":entry.name, "value": data});
		}
	});
	
	$('#vars').datagrid('loadData', {
		"total": totalrows, "rows": rows
	});
};

Game.nextStep = function() {
	if (Game.runningStatus == 0)
		return;
	
	while (true) {
		try {
			if (Game.jsInterpreter.step()) {
				
				if (BlocklyApps.log.length > 0 || Game.highlightPause) {
					
					if (Game.runningStatus != 2  || Game.highlightPause === false) {
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
				
				// if there isn't more lines to evaluate
				Game.resetButtons();
				
			    Blockly.mainWorkspace.highlightBlock(null);
			    
			    hero.verifyObjectives("deliver", {allCustomers:true});
			    hero.verifyObjectives("varQtd", null);
			    hero.verifyObjectives("commQtd", null);
			    
			    Game.lastErrorData.block = null;
			    if (hero.allObjectivesAchieved) {
			    	
		    	    Game.lastErrorData.iderror = 0;
		    	    Game.lastErrorData.message = "";
			    	
			    	Hints.stopHints();
				    Game.stopCronometro();
			    	//TODO animar o cooker no final da missao

			    	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			    	var count = Game.countInstructions(Blockly.mainWorkspace.getTopBlocks());

			    	var now = new Date().getTime();
			    	var timeSpent = Math.floor((now - Game.currTime)/1000);
			    	
			    	var reward = hero.addReward(count, (Game.cronometro == null?0:Game.cronometro.passed), Game.bonusTime, Game.bonusTimeReward);
			    	Game.money = parseInt(Game.money) + reward.total;
			    	Game.display();

			        var answer = Blockly.Xml.domToText(xml);
			    	
			    	UserControl.saveMission(reward.total, timeSpent, Game.howManyRuns, true, answer, function(){
			    		
			    		var msg = BlocklyApps.getMsg("NoBugs_goalAchievedVictory");
			    		var coin2 = "<img style='vertical-align: middle;' src='images/coin2.png'/>";
			    		var out = msg.format(reward.total + coin2)+ "<br/>";
			    		
			    		if (reward.base != reward.total) {
			    			
				    		var out2 =  "<table class='tableVictory' ><tr style='font-weight:bold'><td>" + BlocklyApps.getMsg("Victory_BaseValue") + " </td><td align='right' style='width: 50px;'> " + reward.base + "</td></tr>";
				    		out2 = out2 + "<tr style='font-weight:bold'><td colspan='2'>" + BlocklyApps.getMsg("Victory_Bonus") + "</td></tr>" ;
				    		for (var i=0; i < reward.bonus.length; i++) {
				    			var b = BlocklyApps.getMsg(reward.bonus[i].name);
				    			var s = b.format(reward.bonus[i].extraInfo);
				    			out2 = out2 + "<tr><td> <img src='images/goal_ok.png'/>&nbsp;" + s + "</td> <td align='right' style='width: 50px;'>" + reward.bonus[i].value + "</td></tr>";   
				    		}
				    		out = out + out2 + "</table>";
				    		
			    		}
			    		
			    		var vicText = document.getElementById("victoyText");
			    		vicText.innerHTML = out;
			    		
					    Game.stopAlertGoalButton();

					    MyBlocklyApps.showDialog(document.getElementById("dialogVictory"), null, true, true, true, null, null, 
				    			function(){
					    			Game.init();
				    				/*
				    				window.removeEventListener('unload', Game.unload);	
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
/*
				    				try {
					    				UserControl.retrieveMissions(function(ret) {
					    					Game.loginData.clazzId = 0;
					    					Game.logged(ret);
					    				});
				    					
				    				} catch(ex) {
				    					Game.init();
				    				}
				    		*/
		    				});
			    	});
			    	
			    } else {
			    	
			    	var objs = [];
					var os = hero.objective.objectives;
					for (var i=0; i<os.length; i++) {
						
						objs[i] = [Objective.factory(os[i].objective).createExplanationItem(os[i]), os[i].achieved];
					}
					UserControl.missionFail(Game.howManyRuns, objs);

				    
			    	
		    	    Game.lastErrorData.iderror = "missionFail";
		    	    Game.lastErrorData.message = document.getElementById("dialogFailText");

			    	
			    	MyBlocklyApps.showDialog(document.getElementById("dialogFail"), null, true, true, true, null, null,
			    			function() {
				    			Hints.showErrorHint();
			    			}
			    	);
			    }
			    
			    Game.unlockBlockly();
			    
			    return;
				
			}
		} catch (ex) {
			// when was something wrong in the command execution, as wrong parameter value, or invalid moment of the command use
			  Game.animate();
			  
			  Game.unlockBlockly();
			  Game.stopAlertGoalButton();
			  Hints.startHints();

		      return;
			
		}
	}
};

/**********************************************************************
 *  Block of function and variables to save the progress of the user  *
 **********************************************************************/

Game.logEvent = null;

Game.startSaveUserProgress = function() {
	
	if (Game.logEvent == null)
		Game.logEvent = Blockly.addChangeListener(function() {
			
			if (Blockly.Block.dragMode_ != 0)
				return;
			
			var now = new Date().getTime();
			var timeSpent = 0;
			if (Game.currTime != 0)
				timeSpent = Math.floor(((now) - Game.currTime) / 1000);
			
			if (timeSpent < 10) // the minimum interval to log the actions is 10 seconds
				return; 
			
			var answer = "<xml></xml>";
			if (Blockly.mainWorkspace != null) 
				answer = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
			

			
			UserControl.saveMission(0, timeSpent, Game.howManyRuns, false, answer);

			Game.currTime = now;
		});
};

// because there are some events from the last mission, and the canvas instance 
// ... changed, then we need renovate the listeners  
Game.removeChangeListeners = function() {
  if (Game.scrollEvent != undefined) {
	  
	  window.removeEventListener("scroll", Game.scrollEvent);
	  //window.removeEventListener("resize", Game.resizeWindow); // not enable this line
	  window.removeEventListener('unload', Game.unload);
	  
	  MyBlocklyApps.unbindClick('runButton', Game.runButtonClick);
	  MyBlocklyApps.unbindClick('resetButton', Game.resetButtonClick);
	  MyBlocklyApps.unbindClick('debugButton', Game.debugButtonClick);

	  MyBlocklyApps.unbindClick('goalButton', Game.goalButtonClick);
	  MyBlocklyApps.unbindClick('logoffButton', Game.logoffButtonClick);
	  
  }
	
  if (Game.logEvent != null) {

	  Blockly.removeChangeListener(Game.logEvent);
	  Game.logEvent = null;
  }
  
  if (Hints.evtChangeListener != null) {

	  Blockly.removeChangeListener(Hints.evtChangeListener);
	  Hints.evtChangeListener = null;
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

    var wrapper = function(id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(Game.highlightBlock(id));
      };
    
    interpreter.setProperty(scope, 'highlightBlock',
          interpreter.createNativeFunction(wrapper));

	var wrapper = function(a0, a1, op) {
        return interpreter.createPrimitive(nobugsComparison(a0, a1, op));
      };
    
    interpreter.setProperty(scope, 'nobugsComparison',
          interpreter.createNativeFunction(wrapper));

    // Move commands
	wrapper = function(n) {
      return interpreter.createPrimitive(hero.goToBarCounter(n));
    };
    
    interpreter.setProperty(scope, 'goToBarCounter',
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
    
    wrapper = function() {
	      return interpreter.createPrimitive(hero.isThereACustomer());
	    };
	    
	// see commands
    interpreter.setProperty(scope, 'isThereACustomer',
      interpreter.createNativeFunction(wrapper));
    
    wrapper = function() {
	      return interpreter.createPrimitive(hero.hasHunger());
	    };
		  
  // ask the customer commands
  interpreter.setProperty(scope, 'hasHunger',
	      interpreter.createNativeFunction(wrapper));
  
  wrapper = function() {
      return interpreter.createPrimitive(hero.askForFood());
    };
    
   interpreter.setProperty(scope, 'askForFood',
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
	      return interpreter.createPrimitive(hero.catchFruits(o));
	    };

	interpreter.setProperty(scope, 'catchFruits',
		  interpreter.createNativeFunction(wrapper));
    
    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.prepareAndCatchJuice(o));
	    };

	interpreter.setProperty(scope, 'prepareAndCatchJuice',
		  interpreter.createNativeFunction(wrapper));
	
	
	
	// other commands
    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.catchFood(o));
	    };

	interpreter.setProperty(scope, 'catchFood',
		  interpreter.createNativeFunction(wrapper));
	
    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.catchDrink(o));
	    };
	    
    interpreter.setProperty(scope, 'catchDrink',
	  interpreter.createNativeFunction(wrapper));

    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.deliver(o));
	    };
	    
    interpreter.setProperty(scope, 'deliver',
      interpreter.createNativeFunction(wrapper));
  
};

Game.highlightPause = false;

Game.highlightBlock = function(id) {
	
	BlocklyApps.log.push(['IM', 0]);
	CustomerManager.update();
	
    Blockly.mainWorkspace.highlightBlock(id);
	if (Game.runningStatus === 2) { // if runs, doesnt need to update the variables
		Game.updateVariables();	
	}
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
	  Game.stepSpeed = 1000 * Math.pow(1 - Game.speedSlider.getValue(), 3);

	  Game.pidList.push( window.setTimeout(function() {Game.animate();}, Game.stepSpeed) );
   } else {
	   // TODO ???
	  Game.resetButtons(false);
	  Blockly.mainWorkspace.highlightBlock(null);
	  
  }
};

/**
 * Execute one step in the solution. Returns amount of time consumed by this step
 * @param {string} command 
 * @param {!Array} values List of arguments for the command.
 */
Game.step = function(command, values) {
  switch (command) {
    case 'AL' :
    	hero.alertRun(values);
    	break;
    	
    case 'CO':
    	hero.checkObjectives();
  	case 'IM' :
  		hero.changeSnackManImage(values);
  		break;
  
  	case 'MS' :
  		hero.changeSnackManPosition(values.shift(), values.shift(), values.shift(), values.shift());
  		break;
  		
  	case 'OC' :
  		hero.nextOpenCoolerImage();
  		break;
  		
  	case 'CC' :
  		hero.nextCloseCoolerImage();
  		break;
  		
  	case 'OD' :
  		hero.nextOpenDisplayImage();
  		break;
  		
  	case 'CD' :
  		hero.nextCloseDisplayImage();
  		break;
  		
 	case 'IP' :
  		hero.changeImagePlatter();
  		break;
  		
  	case 'IO' :
  		var value = values.shift();
  		if (value != null)
  			Game.money += value;
  		value = values.shift();
  		if (value == 0)
  			hero.changeImageOriginal();
  		break;

 	case 'SF' :
  		hero.nextShowFruitImage();
  		break;
  		
 	case 'HF' :
  		hero.nextHideFruitImage();
  		break;
  		
 	case 'MJ':
 		hero.nextShowJuiceMachineImage();
 		break;
  		
 	case 'HJ':
 		hero.nextHideJuiceMachineImage();
 		break;
  		
  	case 'fail':
  		Game.showError(values);
  		return false;
  }
  
  return true;
};

Game.showError = function(iderror) {
	
	Hints.stopHintsEx();
	Game.lastErrorData.iderror = iderror[0];
	
	var content = document.getElementById('dialogError');
	var container = document.getElementById('dialogErrorText');
	container.textContent = BlocklyApps.getMsg(iderror[0]);
	Game.lastErrorData.block = Blockly.selected;
	Game.lastErrorData.message = container.textContent;
	
	UserControl.missionError(Game.howManyRuns, iderror[0], Blockly.selected.id, container.textContent);
	
    var style = {top: '120px'}; // };//{width: '370px', 
	style[Blockly.RTL ? 'right' : 'left'] = '215px';
	var origin = Blockly.mainWorkspace.topBlocks_[Blockly.mainWorkspace.topBlocks_.length-1].getSvgRoot();
	
	BlocklyApps.showDialog(content, origin, true, true, style, 
			function() { 
				Hints.startHintsEx(); 
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

Game.saveMoney = function() {
	this.currentlyMoney = this.money;
};

Game.alertColor = ["#DD4B39", "#E07c70", "#edcdc9", "#E07c70"];
Game.handleAlertTimer = 0;

Game.alertGoalButton = function() {
	
	if (Game.handleAlertTimer != 0)
		return;
	
	Game.alertControl = 0;	
	
	Game.handleAlertTimer = 
		window.setInterval(function() {
			var gb = document.getElementById("goalButton");
			Game.alertControl = (Game.alertControl + 1) % 4;
			gb.style.backgroundColor = Game.alertColor[Game.alertControl];
		}, 300);
};

Game.stopAlertGoalButton = function() {
	
	if (Game.handleAlertTimer == 0)
		return;
	
	window.clearInterval(Game.handleAlertTimer);
	Game.handleAlertTimer = 0;
	
	var gb = document.getElementById("goalButton");
	gb.style.backgroundColor = "#DD4B39";
	
};