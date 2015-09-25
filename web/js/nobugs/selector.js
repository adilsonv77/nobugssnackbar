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
 * @fileoverview Selector component: visual component to select something.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';

var Selector = {};
Selector = function(data, tamCell, width, height, enabledCssClass, disabledCssClass, generalTabCss, tabCss, clickTarget, genContent, 
					fMissionEnabled, fMissionTarget) {
	this.data = data;
	this.clickTarget = clickTarget;
	this.genContent = genContent;
	
	this.enabledCssClass = enabledCssClass;
	this.disabledCssClass = disabledCssClass;
	
	this.generalTabCss = generalTabCss;
	this.tabCss = tabCss;
	
	this.fMissionEnabled  = fMissionEnabled;
	this.fMissionTarget   = fMissionTarget;
	
	this.width = width;
	this.height = height;
	
	this.tamCell = tamCell;
};

Selector.prototype.build = function() {
	
	var data = this.data;
	
	if (document.getElementById("tt0") != null) {
		$( "#tt0" ).remove();
	}
	
	var i = 0; // this I kept because sometime in the past a player was allowed to belong more than one class		
	var lastAllAchieved = true;
	
	var appendTo = "body";
	var idTabs = "tt" + i;
	var tabs = $('<div id = "'+idTabs+'"/>')
					.addClass("tab-container")
					.appendTo(appendTo);
	var listTabs = $('<ul>').addClass(this.generalTabCss).appendTo(tabs);
	var tabSelected = "";
	var jTabSelected = 0;
	for (var j = 0; j < data[i].levels.length; j++) {

		var id = 'selectMissionPanel' + i + j;
		$('<div id = "'+id+'"/>')
			  			.addClass('selectMissionPanel')
						.appendTo(tabs);
		
		var mm = parseInt(data[i].levels[j].howManyItems);
		var ma = parseInt((lastAllAchieved?data[i].levels[j].howManyItemsAchieved:"-1"));
		
		var li = $('<li id = "l'+id+'"/>').addClass(this.tabCss).appendTo(listTabs);
		$('<a/>').attr("href","#"+id).appendTo(li).html(data[i].levels[j].name);
		
		if (ma < mm && lastAllAchieved) {
			
			tabSelected = "li#l"+id;
			jTabSelected = j;
			
		}
		data[i].levels[j].lastAllAchieved = lastAllAchieved;
		
		this.createGridView(i, j, "#" + id , mm, ma, data[i].groupId, data[i].levels[j].id);
		
		lastAllAchieved = ma == mm;
			
	}
	
	$('#'+idTabs).easytabs({
		defaultTab: tabSelected,
		updateHash: false
	});
	
	this.tabSelected = jTabSelected;
	
	if (data[i].levels.length > 3) {
		
		var setOfTabs = Math.floor(jTabSelected / 3);
		
		var bPrevious = $("<button id='previousSetOfTab'/>")
				.css("min-width", "2em")
				.css("padding", "0px")
				.css("background-color", "transparent")
				.css("display", (setOfTabs == 0?"none":""))
				.appendTo(listTabs);

		$("<img>")
			.attr("src", "images/talkprevious.png")
			.css("width", "20px")
			.appendTo(bPrevious);

		$('#previousSetOfTab').unbind('click').click(this.previousTabs.bind(this));

		var bNext = $("<button id='nextSetOfTab'/>")
					.css("min-width", "2em")
					.css("padding", "0px")
					.css("background-color", "transparent")
					.css("display", (setOfTabs == (data[i].levels.length/3)?"none":""))
					.appendTo(listTabs);

		$("<img>")
			.attr("src", "images/talknext.png")
			.css("width", "20px")
			.appendTo(bNext);
		
		$('#nextSetOfTab').unbind('click').click(this.nextTabs.bind(this));
		

		// jTabSelected / 3 => set de 3 abas q	vais estar disponivel
		
		for (var j = 0; j < setOfTabs * 3; j++) {
			$('#lselectMissionPanel' + i + j).css("display", "none");
		}

		for (var j = (setOfTabs+1) * 3; j < data[i].levels.length; j++) {
			$('#lselectMissionPanel' + i + j).css("display", "none");
		}
	}
	
	return ("tt0");
	
};

Selector.prototype.previousTabs = function() {
	this.goToTabs((Math.floor(this.tabSelected/3) * 3) - 3);
};

Selector.prototype.nextTabs = function() {
	this.goToTabs((Math.floor(this.tabSelected/3) * 3) + 3);
};

Selector.prototype.goToTabs = function(selectedTab) {
	var setOfTabs = Math.floor(this.tabSelected/3);
	var firstTab = setOfTabs * 3;
	
	var i = 0;
	
	for (var j = 0; j < 3; j++) {
		$('#lselectMissionPanel' + '0' + (firstTab + j)).css("display", "none");
	}
	
	firstTab = selectedTab;

	for (var j = 0; j < 3 && j < this.data[i].levels.length; j++) {
		$('#lselectMissionPanel' + '0' + (firstTab + j)).css("display", "");
	}
	
	if (firstTab == 0)
		$("#previousSetOfTab").css("display", "none");
	else
		$("#previousSetOfTab").css("display", "");
		
	
	if (firstTab+3 >= this.data[i].levels.length)
		$("#nextSetOfTab").css("display", "none");
	else
		$("#nextSetOfTab").css("display", "");
	
	this.tabSelected = firstTab;
	$('#tt0').easytabs('select', 'selectMissionPanel' + '0' + this.tabSelected);
	
};

Selector.prototype.createGridView = function (group, level, missionPanel, numberOfMissions, missionsAchieved, groupId, levelId) {
    var l = 5; // Math.ceil(Math.sqrt(numberOfMissions));
	
	for (var i=1; i<=numberOfMissions; i++) {
		var xOff = Math.floor((i-1)/l);
		var yOff = (i-1)%l;
    	var div = $('<div />')
    	    .attr("id", "mission_l"+levelId+"_m"+i)
    	    .attr("idgroup", groupId)
    		.attr("iditem", i)
    	    .attr("idlevel", levelId)
  			.addClass('gridViewChild')
  			.addClass('missionSquare')
			.css("height", this.tamCell)
			.css("width", this.tamCell)
			.css("left", (35*yOff) + 10 + (yOff * this.tamCell))
			.css("top", (35*xOff) + 60 + (xOff * this.tamCell))
  			.html(this.genContent(i));

			if (this.fMissionEnabled(group, level, i)) { 
				div.addClass(this.enabledCssClass);
				div.addClass('missionEnabled');
			} else
	    	if (this.fMissionTarget(group, level, i)) {
				div.addClass(this.disabledCssClass);
	    		div.addClass('missionTarget');
				div.addClass('missionTargetFlat');
	    	} else {
				div.addClass(this.disabledCssClass);
	    		div.addClass('missionDisabled');
	    	}
	        $(missionPanel).append(div);
    }

	// without unbind, i need this code must appear just in one loop
	 $('.missionTarget').unbind('click').click(this.clickTarget);
	
};

