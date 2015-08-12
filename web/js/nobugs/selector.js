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
	
	var wMax = 0;
	for (var i = 0; i <data.length; i++) {
		
		var lastAllAchieved = true;
		
		var appendTo = "body";
		var idTabs = "tt" + i;
		var tabs = $('<div id = "'+idTabs+'"/>')
						.addClass("tab-container")
						.appendTo(appendTo);
		var listTabs = $('<ul>').addClass(this.generalTabCss).appendTo(tabs);
		var tabSelected = "";
		for (var j = 0; j < data[i].levels.length; j++) {

			var id = 'selectMissionPanel' + i + j;
			var div = $('<div id = "'+id+'"/>')
				  			.addClass('selectMissionPanel')
							.appendTo(tabs);
			
			var mm = parseInt(data[i].levels[j].howManyItems);
			var ma = parseInt((lastAllAchieved?data[i].levels[j].howManyItemsAchieved:"-1"));
			
			var li = $('<li id = "l'+id+'"/>').addClass(this.tabCss).appendTo(listTabs);
			$('<a/>').attr("href","#"+id).appendTo(li).html(data[i].levels[j].name);
			
			if (ma < mm && lastAllAchieved)
				tabSelected = "li#l"+id;
			data[i].levels[j].lastAllAchieved = lastAllAchieved;
			
			this.createGridView(i, j, "#" + id , mm, ma, data[i].groupId, data[i].levels[j].id);
			
			lastAllAchieved = ma == mm;
				
			wMax = this.width;
			
		}
		
		$('#'+idTabs).easytabs({
			defaultTab: tabSelected,
			updateHash: false
		});
		
	}

	return ("tt0");
	
};

Selector.prototype.createGridView = function (group, level, missionPanel, numberOfMissions, missionsAchieved, groupId, levelId) {
    var l = 5; // Math.ceil(Math.sqrt(numberOfMissions));
	
	for (var i=1; i<=numberOfMissions; i++) {
		var xOff = Math.floor((i-1)/l);
		var yOff = (i-1)%l;
    	var div = $('<div />')
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

