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

var userLogged = null;
var missionHist = null;
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

/**
 * All the imgs will added in this array. Anyone that uses an image, must 
 * before add in this array.
 */
Game.preloadImgs = []; 

Game.money = 0;
Game.currentlyMoney = Game.money;

Game.lastErrorData;
Game.jsInterpreter;
Game.variableBox = null;

/**
 * Initialize Blockly and SnackBar. Called on page load.
 */
Game.init = function() {
	
	Game.currTime = 0;
	
    Game.preloadImgs.push('images/fundo.png');
    Game.preloadImgs.push('images/doors.png');
	
    Game.loadImgs(); // if the user's key is stored in cookies, then the system will not show the login dialog

    UserControl.verifyLogged(function(ret) {
		
		if (ret[0]) 
			Game.logged(ret[1], ret[2], ret[3], ret[4], ret[5]);
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


/**
 * Without this some draws don't work. 
 */
Game.loadImgs = function() {
	for (var i = 0; i < Game.preloadImgs.length; i++) {
	    var preload = new Image();
	    preload.src = Game.preloadImgs[i];
	}
};

Game.login = function() {
	
	var user = document.getElementById('loginuser').value;
	var passw = document.getElementById('loginpassw').value;
	
    UserControl.login(user, passw, 
		  function(ret) {
			var error = document.getElementById("errorLogin");

			if (ret[0] == null) {
				
	  			document.getElementById('loginuser').value = "";
	  			document.getElementById('loginpassw').value = "";
	  			
	  			error.innerHTML = "";
	  			if (ret[1].lastTime == null) {
	  				
	  				var userName = document.getElementById("userCompleteName");
	  				userName.innerHTML = ret[1].name;
	  				
	  				var intro2 = BlocklyApps.getMsg("NoBugs_intro2");
	  				intro2 = intro2.format((ret[1].sex==="M"?BlocklyApps.getMsg("King"):BlocklyApps.getMsg("Queen")));
	  				
	  				
	  				var intro2Span = document.getElementById("NoBugsIntro2");
	  				intro2Span.innerHTML = intro2;
	  				
	  				userLogged = ret[1];
	  				missionHist = ret[2];
	  				
	  				MyBlocklyApps.showDialog(document.getElementById('dialogIntro'), 
	  						null, false, true, true, "Intro", {width: "540px"},null);
	  				
	  			} else 
	  				Game.logged(ret[1], ret[2]);
	  			
	  		} else {
	  			error.innerHTML = BlocklyApps.getMsg(ret[0]);
	  		}
  		  }
    );
	
};

Game.finishIntro = function() {
	BlocklyApps.hideDialog(false);
	Game.logged(userLogged, missionHist);
};

Game.logged = function(u, missionsHistorical, clazzId, levelId, missionIdx) {
	
	if (Game.variableBox != null)
		Game.variableBox.style.display = "none";
	
	userLogged = u;
	
	if (clazzId == undefined || clazzId == 0) {

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
		Game.missionSelected(clazzId, levelId, missionIdx);
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
  
  window.addEventListener('scroll', function() {
      Game.doResizeWindow();
    });  window.addEventListener('resize',  Game.resizeWindow);

  Blockly.Generator.prototype.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'highlightBlock(%1);\n';

  // Add to reserved word list: API, local variables in execution environment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Game, code');

  window.addEventListener('unload', Game.unload);
 
  
  BlocklyApps.bindClick('runButton', Game.runButtonClick);
  BlocklyApps.bindClick('resetButton', Game.resetButtonClick);
  BlocklyApps.bindClick('debugButton', Game.debugButtonClick);

  //BlocklyApps.bindClick('nextMissionButton', Game.nextMissionButtonClick);
  BlocklyApps.bindClick('goalButton', Game.goalButtonClick);
  BlocklyApps.bindClick('logoffButton', Game.logoffButtonClick);
  //BlocklyApps.bindClick('xmlButton', Game.xmlButtonClick);

  BlocklyApps.bindClick('moveDown', Game.moveDownButtonClick);
  BlocklyApps.bindClick('moveRight', Game.moveRightButtonClick);
  
  Game.variableBox = document.getElementById('variableBox');
  Game.blockly = document.getElementById('blockly');
  
  Game.ctxDisplay = document.getElementById('display').getContext('2d');
  Game.imgBackground = new Image();
  Game.imgBackground.src = 'images/fundo.png';	
  Game.imgBackground.onload = function() {
	  
	  Game.imgDoor = new Image();
	  Game.imgDoor.src = "images/doors.png";
	  
	  Game.lastErrorData = new Object();
	  Game.lastErrorData.count = 0;
	  Game.lastErrorData.comm = 0;
	  
	  UserControl.loadMission(clazzId, levelId, missionIdx, Game.missionLoaded);
	  
  };
  
};

Game.unload = function(e) {

	Game.stopSaveMissionEverySeconds();
	
	var answer = null;
	if (Blockly.mainWorkspace != null) 
		answer = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
	var timeSpent = 0;
	if (Game.currTime != 0)
		timeSpent = Math.floor(((new Date().getTime()) - Game.currTime)/1000);
	
	UserControl.saveMission(0, timeSpent, false, answer, 
			{callback:function() {}, async:false});
	
    return null;
};

Game.missionLoaded = function(ret){
	
  Game.howManyRuns = 0;
	
  var xml = ret[1];
  var mission = transformStrToXml(xml);
  var t = BlocklyApps.getMsg("_mission");
  Game.missionTitle =  t.charAt(0).toUpperCase() + t.substring(1) + " " + ret[0];
	  
  var commands = mission.childNodes[0].getElementsByTagName("commands")[0];
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
	  Game.nextPartOfMissionLoaded(ret[2], mission, ret[3]);
  else {
      var preload = sourceXML.getAttribute("preload");
	  if (preload != null) {
		  UserControl.loadAnswer(preload, function (ret) {
			  Game.nextPartOfMissionLoaded(ret, mission, 0);
		  });
	  }
	  else {
		  var outerHTML = sourceXML.outerHTML || (new XMLSerializer()).serializeToString(sourceXML);
		  Game.nextPartOfMissionLoaded(outerHTML, mission, 0);
	  }
  }
};
  
Game.nextPartOfMissionLoaded = function(answer, mission, timeSpent) {
	
  var xml = Blockly.Xml.textToDom(answer);
  MyDomToWorkspace(Blockly.mainWorkspace, xml);
  
  
  var loginLoaded = function(data) {
      
      CustomerManager.init(data.childNodes[0].getElementsByTagName("customers")[0],
    		  			   data.childNodes[0].getElementsByTagName("customersSN")[0]);
      
      Game.mission = data;
	  Game.reset();
	  
	  Game.totalTimeSpent = parseInt(timeSpent);
	  Game.bonusTime = data.childNodes[0].getElementsByTagName("objectives")[0].getAttribute("bonusTime");
	  Game.bonusTimeReward = data.childNodes[0].getElementsByTagName("objectives")[0].getAttribute("bonusTimeReward");
	  Game.addCronometro(Game.bonusTime , timeSpent );
	  
	  // Lazy-load the syntax-highlighting.
	  window.setTimeout(Game.importPrettify, 1);
	  
	  var explanation = Explanation.parseUserLogged(mission.childNodes[0].getElementsByTagName("explanation")[0]);
	  
	  Explanation.showInfo(explanation, true);
	  
  };

  window.setTimeout(function(){loginLoaded(mission);}, 1000); 
	  
	  
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
    	Game.blockly.style.height = "90%";
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

  };


Game.moveDownButtonClick = function() {
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

Game.countInstructions = function(c) {
	
	var conta = 0;
	while (c != null) {
		var a = c;
		if (!a.attributes["disabled"])
			conta++;

		if (c.childNodes.length == 0)
			break;
		else
			c = c.childNodes[c.childElementCount-1];
		
		if (!a.attributes["disabled"] && 
			 ((a.childElementCount >= 2 && a.childNodes[a.childElementCount-2].nodeName === "STATEMENT") ||
					 (a.childNodes[0].nodeName === "STATEMENT"))) {
			var offset = 1;
			if (c.nodeName === "NEXT")
				offset = 2;
			if (a.childNodes[0].nodeName === "MUTATION")
				conta = conta + Game.countInstructions(a.childNodes[a.childElementCount-(offset+1)].childNodes[0]);
			conta = conta + Game.countInstructions(a.childNodes[a.childElementCount-offset].childNodes[0]);
			
		}
		if (c.nodeName === "NEXT") {
			c  = c.childNodes[0];
			
		} else
			break;
	}
	
	return conta;
	
};

Game.goalButtonClick = function() {
  
	Explanation.showInfo(Game.mission.childNodes[0].getElementsByTagName("explanation")[0], false);
  
};

Game.logoffButtonClick = function() {
	
	BlocklyApps.hideDialog(false);
	window.removeEventListener('unload', Game.unload);
	Game.stopSaveMissionEverySeconds();
	
	var now = new Date().getTime();
	Game.cleanCronometro();

	$('#vars').datagrid('loadData', {
		"total": 0, "rows": []
	});
    Game.doResizeWindow("none");
    Game.killAll();
    Game.runningStatus = 0;
	
    document.getElementById('blockly').innerHTML = ""; // clean the editor
    var answer = null;
    var timeSpent = 0;
    if (Game.currTime != 0) {
        answer = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    	timeSpent = Math.floor((now - Game.currTime)/1000);
    	
    }
	
	UserControl.logoff(timeSpent, answer, function(){
		// because is synchronous, we need wait to finish the last request 
		Game.init();
		
	});
};

/*
Game.xmlButtonClick = function() {
	//var code = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
	var code = Blockly.JavaScript.workspaceToCode();
	alert(code);
};
*/
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

  Game.resetButtons();
  Game.reset();
  
  Game.doResizeWindow("none");
  
  Game.unlockBlockly();
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

/**
 * Click the debug button.  Start the program/go to next line.
 */
Game.debugButtonClick = function() {
	 
	if (Game.runningStatus === 0) {
		Game.enableButton('resetButton');

		if (Game.enabledVarWindow) {
			Game.doResizeWindow("inline");
			$('#vars').datagrid('resize');
		}
		
  	    Game.saveMoney();
		Blockly.mainWorkspace.traceOn(true);
	} else {
		if (!Blockly.mainWorkspace.traceOn_) // the second complete debug didn't show the highlight on the blocks 
			Blockly.mainWorkspace.traceOn(true);
	}
	
	Game.execute(2);
};

Game.resetButtons = function() {
	
	Game.disableButton('resetButton');
	
	Game.enableButton('debugButton');
	
	Game.enableButton('runButton');
	
	if (Blockly.mainWorkspace != null)
		Blockly.mainWorkspace.traceOn(false); 
	
	Game.runningStatus = 0;
	
	$('#vars').datagrid('loadData', {
		"total": 0, "rows": []
	});
};


/**
 * Execute the user's code.  Heaven help us...
 */
Game.execute = function(debug) {
	
  if (Game.runningStatus === 0) {
	  
	  BlocklyApps.log = [];
	  BlocklyApps.ticks = 10000; // how many loops are acceptable before the system define it is in infinite loop ? 
		
		$('#vars').datagrid('loadData', {
			"total": 0, "rows": []
		});

	  // Reset the graphic.
	  Game.reset();

	  
	  try {
		  
		var js = Blockly.JavaScript;
		
		UserControl.registerExecution();
		  
		Game.howManyRuns++;
		
  	    var code = "var NoBugsJavaScript = {};\n" + js.workspaceToCode();
  	    
  	   // alert(code);
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

/**
 * Lock block panel during running
 */
Game.lockBlockly = function() {
	
	var blockly = document.getElementById('blockly');
	
    var blocklyLock = document.createElement('div');
    blocklyLock.id = 'blocklyLock';
    blocklyLock.style.cssText = blockly.style.cssText;
    blocklyLock.style.position = 'absolute';

	var mainBody = document.getElementById('mainBody');
	mainBody.appendChild(blocklyLock);
};

/**
 * Unlock block panel after run
 */
Game.unlockBlockly = function() {
	var blocklyLock = document.getElementById('blocklyLock');
	
	if (blocklyLock !== 'undefined' && blocklyLock !== undefined) {
		var mainBody = document.getElementById('mainBody');
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
				data = "<p class="+data.type+"><img src='images/"+ data.descr + ".png'/></p>";
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
					
					if (Game.runningStatus != 2 || Game.highlightPause === false)
						BlocklyApps.log.push(['nextStep']);
					else 
						Game.highlightPause = false;
					
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
			    
			    if (hero.allObjectivesAchieved) {
			    	
				    Game.stopCronometro();
				    Game.stopSaveMissionEverySeconds();
			    	//TODO animar o cooker no final da missao

			    	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			    	var count = Game.countInstructions(xml.childNodes[0]);

			    	var now = new Date().getTime();
			    	var timeSpent = Math.floor((now - Game.currTime)/1000);
			    	
			    	var reward = hero.addReward(count, Game.totalTimeSpent + timeSpent, Game.bonusTime, Game.bonusTimeReward);
			    	Game.money = parseInt(Game.money) + reward;
			    	Game.display();

			        var answer = Blockly.Xml.domToText(xml);
			    	
			    	UserControl.saveMission(reward, timeSpent, true, answer, function(){
			    		
			    		var msg = BlocklyApps.getMsg("NoBugs_goalAchievedVictory");
			    		var coin2 = "<img style='vertical-align: middle;' src='images/coin2.png'/>";
			    		var out = msg.format(reward + coin2)+ "<br/>";
			    		
			    		var vicText = document.getElementById("victoyText");
			    		vicText.innerHTML = out;
			    		
				    	MyBlocklyApps.showDialog(document.getElementById("dialogVictory"), null, true, true, true, null, null, 
				    			function(){
				    				
				    				window.removeEventListener('unload', Game.unload);				    				
				    				UserControl.retrieveMissions(function(ret) {
				    					Game.logged(userLogged, ret);
				    				});
				    		
		    				});
			    	});
			    	
			    } else {
			    	MyBlocklyApps.showDialog(document.getElementById("dialogFail"), null, true, true, true, null, null, null);
			    }
			    
			    Game.unlockBlockly();
			    
			    return;
				
			}
		} catch (ex) {
			// when was something wrong in the command execution, as wrong parameter value, or invalid moment of the command use
			  Game.animate();
			  
			  Game.unlockBlockly();
		      return;
			
		}
	}
};

/**********************************************************************
 *  Block of function and variables to save the progress of the user  *
 **********************************************************************/
Game.taskIntervalForSave = null;
Game.INTERVAL_FOR_SAVE = 30000;

Game.startSaveMissionEverySeconds = function() {
	if (Game.taskIntervalForSave == null) {
		console.log('Starting save mission every ' + (Game.INTERVAL_FOR_SAVE / 1000) + ' seconds ');
		Game.taskIntervalForSave = window.setInterval(function() {
			var answer = null;
			if (Blockly.mainWorkspace != null) 
				answer = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
			
			var timeSpent = 0;
			var now = new Date().getTime();
			if (Game.currTime != 0)
				timeSpent = Math.floor(((now) - Game.currTime) / 1000);
			
			UserControl.saveMission(0, timeSpent, false, answer, function() {console.log('saved')});
			
			Game.currTime = now;
		}, Game.INTERVAL_FOR_SAVE);
	}
};

Game.stopSaveMissionEverySeconds = function() {
	if (Game.taskIntervalForSave != null) {
		window.clearInterval(Game.taskIntervalForSave);
		Game.taskIntervalForSave = null;
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
	  Game.pidList.push( window.setTimeout(function() {Game.animate();}, Game.stepSpeed) );
   } else {
	   // TODO ???
	  Game.resetButtons();
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
	
	var content = document.getElementById('dialogError');
	var container = document.getElementById('dialogErrorText');
	container.textContent = BlocklyApps.getMsg(iderror);
	
    var style = {top: '120px'}; // };//{width: '370px', 
	style[Blockly.RTL ? 'right' : 'left'] = '215px';
	var origin = Blockly.mainWorkspace.topBlocks_[Blockly.mainWorkspace.topBlocks_.length-1].getSvgRoot();
	
	BlocklyApps.showDialog(content, origin, true, true, style, null);

};

Game.saveMoney = function() {
	this.currentlyMoney = this.money;
};
