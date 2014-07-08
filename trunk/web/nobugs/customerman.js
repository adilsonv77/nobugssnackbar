var CustomerManager = {};
var customers = [];

CustomerManager.init = function() {
	
};

CustomerManager.reset = function() {
	customers = [];
};

CustomerManager.update = function() {
	if (customers.length == 0)
		customers[0] = new Customer({
			place: "counte1",
			id: "01"
		});
	
	customers[0].update();
	
};

CustomerManager.draw = function(ctx) {
	for (var i=0; i<customers.length; i++)
		customers[i].draw(ctx);
};