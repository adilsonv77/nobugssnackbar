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

function addTooltip() {
	
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
	
};

function createTable(table) {
	table.ingrid({height: 250, paging: false, resizableCols: false, sorting: false,
				  gridClass: 'leaderboard-table',
				  headerClass: 'leaderboard-table-header',
				  colWidths: [25, 74, 140],
				  colClasses: ['leaderboard-table-col-position', 'leaderboard-table-col-picture', 'leaderboard-table-col-name']});
}

function populateLBTables(table, data) {
	
	  var tBody = $("<tbody/>");
	  var contaRow = 1;
	  
	  data.forEach(function(entry) {
		  
		  var tr = $("<tr id = " + table + "_" + entry.id + "/>");
		  
		  tr.append($("<td>").html(contaRow));
		  tr.append($("<td>").html("<img src='images/profile_blank.png'/>"));
		  tr.append($("<td>").html(entry.name + "<br/>" + entry.value));
		 
		  tBody.append(tr);
		  
		  contaRow++;

	  });
	  
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

function createsLeaderBoard() {
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
	
	$("#tabs-points").append(populateLBTables("table_points", lbMoneyData));
	$("#tabs-time").append(populateLBTables("table_time", lbTimeData));
	$("#tabs-runs").append(populateLBTables("table_runs", lbRunData));

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

	createTable($("#table_points"));
	highlightCurrentUser(rowId);

	createTable($("#table_time"));
	highlightCurrentUser($("#tabs-time").attr("rowId"));
	
	createTable($("#table_runs"));
	highlightCurrentUser($("#tabs-runs").attr("rowId"));

	$(".ingrid > div:nth-child(2)").addClass("mCustomScrollbar")
		.mCustomScrollbar({ theme:"nobug" });
	
	goToLine("#tabs-points", rowId);

};

function createNoLeaderBoardInfo() {
	addTooltip();
	
	var data = [{id: 0, name: BlocklyApps.getMsg("Text_NotEnabledToSeeLeaderBoard").format(Game.loginData.leaderBoard[0][1]), value: ""}];
	
	$("#tabs-points").append(populateLBTables("table_points", data));
	$("#tabs-time").append(populateLBTables("table_time", data));
	$("#tabs-runs").append(populateLBTables("table_runs", data));
	
	$('#leaderboard').easytabs({updateHash: false, animate: false});
	$('#leaderboard').easytabs('select', '#tabs-points');
	
	createTable($("#table_points"));
	createTable($("#table_time"));
	createTable($("#table_runs"));

	$(".ingrid > div:nth-child(2)").addClass("mCustomScrollbar")
		.mCustomScrollbar({ theme:"nobug" });
	
};