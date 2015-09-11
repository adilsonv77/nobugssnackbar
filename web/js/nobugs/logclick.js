LogClick = {};

LogClick.clicks = [];

LogClick.store = function(name) {
	
	var dateTime = Date.now();

	LogClick.clicks.push([name, dateTime]);
	if (LogClick.clicks.length > 10) {
		LogClick.save();
	}
	
};

LogClick.save = function() {
	
	UserControl.saveClicks(LogClick.clicks);
	LogClick.clicks = [];
	
};

