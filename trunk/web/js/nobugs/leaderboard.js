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
	
	// adding the tooltip
	$('.leaderMoney').parent().tooltip({
		position: 'top',
		content: $('<span>' + BlocklyApps.getMsg("Tooltip_TabMoney")+ '</span>')
	});
	
	$('.leaderTime').parent().tooltip({
		position: 'top',
		content: $('<span>' + BlocklyApps.getMsg("Tooltip_TabTime")+ '</span>')
	});
	
	$('.leaderRun').parent().tooltip({
		position: 'top',
		content: $('<span>' + BlocklyApps.getMsg("Tooltip_TabRun")+ '</span>')
	});
	
};

function getRow(data) {
	for (var i = 0; i < data.length; i++)
		if (data[i].id == Game.loginData.userLogged.id)
			return i;
}

function createsLeaderBoard(idRoot) {

	// Only to display or hide elements
	createTabLeaderBoardInfo("#notEnabledLeaderMoney", "#dgLeaderMoney", "", "none", "");
	createTabLeaderBoardInfo("#notEnabledLeaderTime", "#dgLeaderTime", "", "none", "");
	createTabLeaderBoardInfo("#notEnabledLeaderRun", "#dgLeaderRun", "", "none", "");

	// Adjusting the styles
	$('#leaderBoard .datagrid-header-inner').hide();
	$('#leaderBoard .panel-body, #leaderBoard .datagrid-header').css("border-style", "none");

	$('#dgLeaderMoney').datagrid('getPanel').addClass("lines-no");
	$('#dgLeaderTime').datagrid('getPanel').addClass("lines-no");
	$('#dgLeaderRun').datagrid('getPanel').addClass("lines-no");

	addTooltip();
	
	var lbData = Game.loginData.leaderBoard;
	var lbMoneyData = [], lbTimeData = [], lbRunData = [];
	
	lbData.forEach(function(entry) {
		lbMoneyData.push({"id": entry[0], "name": entry[1], "money": entry[2] });
		
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
		
		lbTimeData.push({"id": entry[0], "name": entry[1], "time": h + addZeros(m, 2) + "min " + addZeros(s, 2) + "s", "missionDone": entry[5], "timeSeconds" : entry[3] });
		lbRunData.push({"id": entry[0], "name": entry[1], "runs": entry[4], "missionDone": entry[5] });
	});
	
	lbMoneyData.sort(function(a,b) {return b.money - a.money;});
	
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
			return a.runs - b.runs;
		else
			return r;
	});

	// the styler is defined in template.soy
	
	$("#dgLeaderMoney").datagrid("loadData", {"total": lbMoneyData.length, "rows": lbMoneyData});
	
	
	$("#dgLeaderTime").datagrid("loadData", {"total": lbTimeData.length, "rows": lbTimeData});

	$("#dgLeaderRun").datagrid("loadData", {"total": lbRunData.length, "rows": lbRunData});
	
	/* This stuff doesnt work :(
	$('#leaderBoard').tabs({
		  onSelect: function(title,index){
			  switch (index) {
			  case 0 : $("#dgLeaderMoney").datagrid("scrollTo", "16"); //getRow(lbMoneyData));
			  		   break;
			  		   
			  case 1:  $("#dgLeaderTime").datagrid("highlightRow", getRow(lbTimeData));
	  		   		   break;
	  		   
			  case 2: $("#dgLeaderRun").datagrid("highlightRow", getRow(lbRunData));
			  	      break;
			  }
		  	}});
	*/
	$('#leaderBoard').tabs('select', 0);
};

function createNoLeaderBoardInfo() {
	addTooltip();
	
	var tabs = $('#leaderBoard').tabs("tabs");
	
	var msg = BlocklyApps.getMsg("Text_NotEnabledToSeeLeaderBoard").format(Game.loginData.leaderBoard[0][1]);
	
	createTabLeaderBoardInfo("#notEnabledLeaderMoney", "#dgLeaderMoney", msg, "inline", "none");
	createTabLeaderBoardInfo("#notEnabledLeaderTime", "#dgLeaderTime", msg, "inline", "none");
	createTabLeaderBoardInfo("#notEnabledLeaderRun", "#dgLeaderRun", msg, "inline", "none");
};

function createTabLeaderBoardInfo(idDiv, idGrid, msg, idDivDisplay, idGridDisplay) {
	$(idGrid).parent().parent().parent().css("display", idGridDisplay);
	
	$(idDiv).css("display", idDivDisplay);
	$(idDiv + " span").text(msg);
};
	
function leaderStyler(value, rowData, index) {
	if (rowData.id == Game.loginData.userLogged.id) 
		return "font-weight: bold; color: red";
}
