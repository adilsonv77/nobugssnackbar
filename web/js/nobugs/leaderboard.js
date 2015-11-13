/**
 * NoBug's Snack Bar
 *
 * Copyright 2015 Adilson Vahldick.
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
 * Leaderboard management
 * 
 * @fileoverview The construction of the leaderboard tabs.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */


'use strict';

var leaderBoardCreated = false;
var version  = 0;

function addTooltip() {
	
	if (leaderBoardCreated)
		return;
	
	new Tooltip({
		  target: document.getElementById("leaderpoints"),
		  position: 'top left',
		  content: BlocklyApps.getMsg("Tooltip_TabMoney")
	});

	new Tooltip({
		  target: document.getElementById("leadertime"),
		  position: 'top left',
		  content: BlocklyApps.getMsg("Tooltip_TabTime")
	});

	new Tooltip({
		  target: document.getElementById("leaderruns"),
		  position: 'top left',
		  content: BlocklyApps.getMsg("Tooltip_TabRun")
	});
	
	new Tooltip({
		  target: document.getElementById("leadercontest"),
		  position: 'top left',
		  content: "Entre as miss&#245;es do torneio: ordenado pela quantidade vencida, tentativas e tempo"
	});
};

function createTable(table) {
	table.ingrid({height: 250, paging: false, resizableCols: false, sorting: false,
				  gridClass: 'leaderboard-table',
				  headerClass: 'leaderboard-table-header',
				  colWidths: [25, 45, 250],
				  colClasses: ['leaderboard-table-col-position', 'leaderboard-table-col-picture', 'leaderboard-table-col-name']});
}

function populateLBTables(table, data) {
	
	  var tBody = $("<tbody/>");
	  var contaRow = 1;
	  
	  data.forEach(function(entry) {
		  
		  var tr = $("<tr id = " + table + "_" + entry.id + "/>");
		  
		  tr.append($("<td>").html((data.pos !== undefined?data.pos:contaRow)));
		  // the version i use to force the server give another photo
		  tr.append($("<td>").html("<img height='64px' src='userPhoto?u=" + entry.id + "&v=" + version + "'/>"));
		  tr.append($("<td>").html(entry.name + "<br/>" + entry.value));
		 
		  tBody.append(tr);
		  
		  contaRow++;

	  });
	  
	  return finishTable(table, tBody);
}

function populateContestTable(table, data) {
	
	data = [{id: Game.loginData.userLogged.id, name: data.name, value: "", pos: data.pos}];
    return populateLBTables(table, data);
}

function finishTable(table, tBody) {
	  var tTable = $("<table id = " + table + "/>");
	  
	  var trHead = $("<tr/>");
	  trHead.append($("<th/>")); trHead.append($("<th/>")); trHead.append($("<th/>"));
	  
	  tTable.append($("<thead/>").append(trHead));

	  tTable.append(tBody);
	  
	  return tTable;
}

function goToLine(tabName, idrow) {
	
	 $(tabName + " .mCustomScrollbar" ).mCustomScrollbar("scrollTo", $(idrow), {scrollInertia:0});
	 
}

function highlightCurrentUser(idrow) {
    $(idrow).addClass('leaderboard-row-me');
}  

function explainTab(event, clicked, targetPanel, settings) {
	$("#explaintab").html(BlocklyApps.getMsg("LeaderBoard_" + targetPanel.selector.substring(1)));
	
}

function createsLeaderBoard() {
	
	UserControl.retrieveContest(continueCreating);
}

function continueCreating(ret) {
	
	if (ret[0]) {
		$("#leadercontest").css("display", "inline-block");
	} else {
		$("#leadercontest").css("display", "none");
	}
	
	version++;
	addTooltip();
	
	var lbData = Game.loginData.leaderBoard;
	var lbMoneyData = [], lbTimeData = [], lbRunData = [];
	
	lbData.forEach(function(entry) {
		lbMoneyData.push({"id": entry[0], "name": entry[1], "value": entry[2] });
		
		var s = entry[3];
		var m = Math.floor(s / 60);

		s = s - (m * 60);
		
		var h;
		if (m > 60) {
			h = Math.floor(m / 60);
			m = m - (h * 60);
			h = h + "h "; 
		} else {
			h = "";
		}
		
		lbTimeData.push({"id": entry[0], "name": entry[1], "value": h + addZeros(m, 2) + "min " + addZeros(s, 2) + "s", "missionDone": entry[5], "timeSeconds" : entry[3] });
		lbRunData.push({"id": entry[0], "name": entry[1], "value": entry[4], "missionDone": entry[5] });
	});
	
	lbMoneyData.sort(function(a,b) {return b.value - a.value;});
	
	lbTimeData.sort(function(a,b) { 
		var r = b.missionDone - a.missionDone;
		if (r == 0)
			return a.timeSeconds - b.timeSeconds;
		else
			return r;
	});
	
	lbRunData.sort(function(a,b) { 
		var r = b.missionDone - a.missionDone;
		if (r == 0)
			return a.value - b.value;
		else
			return r;
	});
	
    if (leaderBoardCreated) {
    	
    	$("#tabs-points").empty();
    	$("#tabs-time").empty();
    	$("#tabs-runs").empty();
    	$("#tabs-contest").empty();
    	
    }

	$("#tabs-points").append(populateLBTables("table_points", lbMoneyData));
	$("#tabs-time").append(populateLBTables("table_time", lbTimeData));
	$("#tabs-runs").append(populateLBTables("table_runs", lbRunData));
	if (ret[0])
		$("#tabs-contest").append(populateContestTable("table_contest", ret[1]));

	var rowId = "#table_points_" + Game.loginData.userLogged.id;
	$("#tabs-points").attr("rowId", rowId);
	
	$("#tabs-time").attr("rowId", "#table_time_" + Game.loginData.userLogged.id);
	$("#tabs-runs").attr("rowId", "#table_runs_" + Game.loginData.userLogged.id);
	
	$('#leaderboard').easytabs({updateHash: false, animate: false});
	$('#leaderboard').easytabs('select', '#tabs-points');
	$('#leaderboard')
		.bind('easytabs:after', function(evt, clicked, targetPanel) {
           goToLine(targetPanel.selector, targetPanel.attr("rowId"));
		});

	$('#leaderboard').bind("easytabs:after", explainTab);
	
	createTable($("#table_points"));
	highlightCurrentUser(rowId);

	createTable($("#table_time"));
	highlightCurrentUser($("#tabs-time").attr("rowId"));
	
	createTable($("#table_runs"));
	highlightCurrentUser($("#tabs-runs").attr("rowId"));
	
	if (ret[0])
		createTable($("#table_contest"));
	
	$(".ingrid > div:nth-child(2)").addClass("mCustomScrollbar")
		.mCustomScrollbar({ theme:"nobug" });
	
	// $(".mCSB_inside>.mCSB_container").css("margin", "15px"); this is ugly.... wont repeat it	
	goToLine("#tabs-points", rowId);
	
	leaderBoardCreated = true;
	$("#explaintab").html(BlocklyApps.getMsg("LeaderBoard_tabs-points"));

};

function createNoLeaderBoardInfo() {
	version++;
	addTooltip();
	
	$("#leadercontest").css("display", "none");
	
	var data = [{id: Game.loginData.userLogged.id, 
		         name: BlocklyApps.getMsg("Text_NotEnabledToSeeLeaderBoard").format(Game.loginData.leaderBoard[0][1]), value: ""}];
	
    if (leaderBoardCreated) {
    	
    	$("#tabs-points").empty();
    	$("#tabs-time").empty();
    	$("#tabs-runs").empty();
    	
    }

    $("#tabs-points").append(populateLBTables("table_points", data));
	$("#tabs-time").append(populateLBTables("table_time", data));
	$("#tabs-runs").append(populateLBTables("table_runs", data));
	
	$('#leaderboard').easytabs({updateHash: false, animate: false});
	$('#leaderboard').easytabs('select', '#tabs-points');
	$('#leaderboard').bind("easytabs:after", explainTab);
	
	createTable($("#table_points"));
	createTable($("#table_time"));
	createTable($("#table_runs"));

	$(".ingrid > div:nth-child(2)").addClass("mCustomScrollbar")
		.mCustomScrollbar({ theme:"nobug" });
	
	leaderBoardCreated = true;
	$("#explaintab").html(BlocklyApps.getMsg("LeaderBoard_tabs-points"));
	
};