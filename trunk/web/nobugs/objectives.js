
var Objective = {
	factories : []
};

Objective.init = function(elem, trata) {
	return {objective:elem.childNodes[0].nodeValue, achieved:false, trata:trata};
};

Objective.verifyObjectives = function(key, options) {
	if ((hero.allObjectivesAchieved || (hero.objective.debug && Game.runningStatus != 2)))
		return false;
	
	var dest = Objective.factory(key);

	if (hero.objective.ordered) {
		if (!hero.objective.objectives[hero.lastObjectiveAchieved + 1].objective === key)
			return false;
		
		if (dest.checkObjective(options, hero.objective.objectives[hero.lastObjectiveAchieved + 1])) {
			
			Objective.markAchieved(hero.objective.objectives[hero.lastObjectiveAchieved + 1]);
			return true;
		} 

		
	} else {
		for (var i = 0; i < hero.objective.objectives.length; i++) {
			if (hero.objective.objectives[i].objective === key && !hero.objective.objectives[i].achieved) {
				
				if (dest.checkObjective(options, hero.objective.objectives[i])) {
					
					Objective.markAchieved(hero.objective.objectives[i]);
					return true;
					
				}
			}
		}
		
	}

	return false;
};

Objective.markAchieved = function(objective) {
	
	objective.achieved = true;
	hero.lastObjectiveAchieved++;
	
	hero.allObjectivesAchieved = (hero.lastObjectiveAchieved+1) == hero.objective.objectives.length;

	
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

Counter.prototype.checkObjective = function(options, objective)  {
	var posObj = hero.counter[objective.pos-1];
	if (options.nx == posObj.x && options.ny == posObj.y) {
		
		return true;
	} 
	
	return false;

};

AskForFood = function() {};
AskForFood.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	p.distinct = elem.getAttribute("distinct") === "true";
	
	return p;
};

AskForFood.prototype.checkObjective = function(customer, objective)  {

	if (objective.place === "counter") {
		if (customer.currentNode.id === CustOpt.counter[objective.pos-1]) {
	
			return true;
		}
	}
	
	return false;
};
