'use strict';
var LogClick = {};

LogClick.clicks = [];

LogClick.store = function(name, elem) {

	if (name === "slider") {
		
		name = name + " " + Game.speedSlider.getValue();
		
	} else
		if (elem !== undefined && elem.className === "blocklyTreeLabel") {
			name = name + " " + elem.innerText;
		}
					
	
	var dateTime = Date.now();

	LogClick.clicks.push([name, dateTime, (Game.mission != null?Game.mission.id:null)]);
	if (LogClick.clicks.length > 10) {
		LogClick.save(true);
	}
	
};

LogClick.save = function(async) {
	if (LogClick.clicks.length == 0)
		return;
	
	var c = {callback:function() {}, async:async};
	
	UserControl.saveClicks(LogClick.clicks, c);
	LogClick.clicks = [];
	
};

