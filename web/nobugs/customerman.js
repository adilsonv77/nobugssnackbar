'use strict';

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
			place: CustOpt.counter[0],
			id: "01"
		});
	
	for (var i = 0; i < customers.length; i++)
		customers[i].update();
	
};

CustomerManager.animation = function() {
	
	for (var i = 0; i < customers.length; i++)
		customers[i].animate();
	
};

CustomerManager.draw = function(ctx) {
	for (var i=0; i<customers.length; i++)
		customers[i].draw(ctx);
};

CustomerManager.isThereACustomerCounter = function(id) {
	
	id = id - 1;
	
	for (var i=0; i<customers.length; i++)
	  if (customers[i].currentNode.id === CustOpt.counter[id])
		return true;
	
	return false;
};

