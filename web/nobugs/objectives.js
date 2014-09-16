
var Objective = {
	factories : []
};

Objective.init = function(elem, trata) {
	return {objective:elem.childNodes[0].nodeValue, achieved:false, trata:trata};
};

Objective.factory = function(key) {
	var r = this.factories[key];
	if (r != undefined)
		return r;
	
	switch (key) {
	
	case "counter": 
		this.factories[key] = new Counter();
		break;

	case "askForFood":
		this.factories[key] = new AskForFood();
		break;
	}
	
	return this.factories[key];
};

Counter = function() {};
Counter.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	p.pos = elem.getAttribute("pos");
	return p;
};

AskForFood = function() {};
AskForFood.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	p.distinct = elem.getAttribute("distinct") === "true";
	
	return p;
};