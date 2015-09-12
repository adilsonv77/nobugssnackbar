'use strict';
var LogClick = {};

LogClick.clicks = [];

LogClick.store = function(name) {
	
	var dateTime = Date.now();

	LogClick.clicks.push([name, dateTime]);
	if (LogClick.clicks.length > 10) {
		LogClick.save(true);
	}
	
};

LogClick.save = function(async) {
	
	var c = {callback:function() {}, async:async};
	
	UserControl.saveClicks(LogClick.clicks, c);
	LogClick.clicks = [];
	
};

