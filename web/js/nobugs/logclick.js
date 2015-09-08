LogClick = {};

LogClick.clicks = [];

LogClick.store = function(name) {
	
	var dateTime = new Date().toJSON();

	LogClick.clicks.push([name, dateTime]);
	if (LogClick.clicks.length > 10) {
		LogClick.save();
	}
	
};

LogClick.save = function() {
	
	UserControl.saveClicks(LogClick.clicks);
	LogClick.clicks = [];
	
};

