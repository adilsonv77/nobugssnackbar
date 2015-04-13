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
Selector = function(data, levelZoom, tamCell, enabledCssClass, disabledCssClass, rerunCssClass, clickTarget, genContent, 
					fMissionEnabled, fMissionTarget, fMissionRerun) {
	this.data = data;
	this.clickTarget = clickTarget;
	this.genContent = genContent;
	
	this.enabledCssClass = enabledCssClass;
	this.disabledCssClass = disabledCssClass;
	this.rerunCssClass = rerunCssClass;
	
	this.fMissionEnabled  = fMissionEnabled;
	this.fMissionTarget   = fMissionTarget;
	this.fMissionRerun    = fMissionRerun;
	
	Selector.tamCell = tamCell;
};

Selector.prototype.build = function() {
	
	var data = this.data;
	
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
	
	if (document.getElementById("tt0") != null) {
		$( "#tt0" ).remove();
	}
	
	var wMax = 0;
	for (var i = 0; i <data.length; i++) {
		
		var lastAllAchieved = true;
		
		var appendTo = "body";
		if (useAccordion) {
			
			$('#aa').accordion('add', {
				title: data[i].group
			} );
			
			appendTo = $('#aa').accordion('getPanel', i);
		}
		
		var idTabs = "tt" + i;
		var tabs = $('<div id = "'+idTabs+'"/>')
						.addClass('easyui-tabs')
						.appendTo(appendTo);
		
		// TODO: if it is necessary the accordion, because the player belongs more than one class, then we have some problems in height
		$('#'+idTabs).tabs({height: 342});
		
		for (var j = 0; j < data[i].levels.length; j++) {

			var id = 'selectMissionPanel' + i + j;
			var div = $('<div id = "'+id+'"/>')
				  			.addClass('selectMissionPanel');
			
			var mm = parseInt(data[i].levels[j].howManyItems);
			var ma = parseInt((lastAllAchieved?data[i].levels[j].howManyItemsAchieved:"-1"));
			$('#'+idTabs).tabs('add',{
			    title: data[i].levels[j].name,
			    content: div,
			    selected: (ma < mm && lastAllAchieved)
			});
			
			data[i].levels[j].lastAllAchieved = lastAllAchieved;
			
			var w = this.createGridView(i, j, "#" + id , mm, ma, data[i].groupId, data[i].levels[j].id);
			
			lastAllAchieved = ma == mm;
				
			if (w > wMax)
				wMax = w;
			
		}
		
	}

	for (var i = 0; i <data.length; i++) {
		$('#tt'+i).tabs({
		    width: wMax + 50
		});
	}
		
	if (useAccordion)
		$('#aa').accordion({
		    animate:false,
		    border:false,
		    width: wMax + 50
		});
	
	return (useAccordion?"aa": "tt0");
	
};

Selector.prototype.createGridView = function (group, level, missionPanel, numberOfMissions, missionsAchieved, groupId, levelId) {
    for (var i=1; i<=numberOfMissions; i++) {
    	var div = $('<div />')
    	    .attr("idgroup", groupId)
    		.attr("iditem", i)
    	    .attr("idlevel", levelId)
  			.addClass('gridViewChild')
  			.addClass('missionSquare')
  			.html(this.genContent(i));

			if (this.fMissionEnabled(group, level, i)) { 
				div.addClass(this.enabledCssClass);
				div.addClass('missionEnabled');
			} else
	    	if (this.fMissionTarget(group, level, i)) {
	    		if (this.fMissionRerun && this.fMissionRerun(group, level, i))
					div.addClass(this.rerunCssClass);
	    		else
	    			div.addClass(this.enabledCssClass);
	    		div.addClass('missionTarget');
	    	} else {
				div.addClass(this.disabledCssClass);
	    		div.addClass('missionDisabled');
	    	}
	        $(missionPanel).append(div);
    }
	 var l = Math.ceil(Math.sqrt(numberOfMissions));
	 
	 var onPosition = function(i, zoomedChild, margin) { 
		 return {x: (Selector.tamCell * (i%l)) + margin, 
			 	 y: (Selector.tamCell * Math.floor(i/l)) + margin}; 
		};
	 
	 $(missionPanel).gridview({
		 						draggable: false,
		 						scrollToZoom: false, 
		 						animationSpeed: 0,
								width: (l*Selector.tamCell)+10,
		 						height: (l*Selector.tamCell)+10,
		 						onPosition: onPosition
		 					});
	 
	 $(missionPanel).gridview("zoom",
			 {level: l});
	 
	 // without unbind, i need this code must appear just in one loop
	 $('.missionTarget').unbind('click').click(this.clickTarget);
	 /*
	 
	 $('.missionEnabled').unbind('click').click(function (evt) {
		 
		 var fret = function(ret) {
			 
			 var answer = ret;
			 
			 var divMissionSelected = document.createElement("div");
			 divMissionSelected.style.width = "800px";
			 divMissionSelected.style.height = "600px";
			 document.getElementById("mainBody").appendChild(divMissionSelected);
			 
			 try {
				 
				 Blockly.inject(divMissionSelected, {path: ''});
				 var xml = Blockly.Xml.textToDom(answer);
			     Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
			    // Game.moveBlocksToZero();
				 
				 MyBlocklyApps.newShowModalDialog(divMissionSelected);
			 } catch (ex) {
				 console.log(ex);
			 }
		 };
		 
		 var clazzId = this.getAttribute("idclazz");
		 var missionIdx = this.getAttribute("idmission");
    	 var levelId = this.getAttribute("idlevel");
		 UserControl.loadMissionAnswer(clazzId, levelId, missionIdx, fret);
		 
	 });
*/
	 return $(missionPanel).width();
	
};

