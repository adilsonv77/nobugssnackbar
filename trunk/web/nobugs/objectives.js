/******************************************************************************
 *                                Utility functions
 ******************************************************************************/

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function findVariable(){
	// the variable must not be initialized
	var vars = Game.jsInterpreter.variables;
	
	// always the first variable is NoBugsJavaScript.varName
	var varname = vars[0].scope.properties["NoBugsJavaScript"].properties["varName"].data;
	
	for (var i=1; i<vars.length; i++)
		if (vars[i].name === varname) {
			return vars[i].scope.properties[varname].data;
		}
	
	return null;
}

// Based on Professional JavaScript for Web Developers (Nicholas C. Zakas)
var inherits = function(parent, inherited){
    // makes a copy of the parent prototype
    var parentCopy = Object.create(parent.prototype);
 
    // inherits from the parent
    inherited.prototype = parentCopy; 
 
    // fixs the inherited constructor
    inherited.prototype.constructor = inherited;
};

/******************************************************************************
 *                                Objective
 ******************************************************************************/

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
		this.factories[key] = new Objective.Counter();
		break;

	case "askForFood":
		this.factories[key] = new Objective.AskForFood();
		break;

	case "catchFood": 
		this.factories[key] = new Objective.CatchFood();
		break;

	case "askForDrink":
		this.factories[key] = new Objective.AskForDrink();
		break;

	case "catchDrink": 
		this.factories[key] = new Objective.CatchDrink();
		break;
	
	case "deliver": 
		this.factories[key] = new Objective.Deliver();
		break;

	}
	
	return this.factories[key];
};

Objective.createExplanationItemPlacePos = function(msgKey, objective) {
	var key = BlocklyApps.getMsg("_"+objective.place);
	var text = BlocklyApps.getMsg(msgKey);
	return text.format(key  + " " + objective.pos);
};

/******************************************************************************
 *                                Counter
 ******************************************************************************/

Objective.Counter = function() {};
Objective.Counter.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	p.pos = elem.getAttribute("pos");
	return p;
};

Objective.Counter.prototype.checkObjective = function(options, objective)  {
	var posObj = hero.counter[objective.pos-1];
	if (options.nx == posObj.x && options.ny == posObj.y) {
		
		return true;
	} 
	
	return false;

};

Objective.Counter.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_counter");
	return text.format(objective.pos);
};

/******************************************************************************
 *                                AskForFood
 ******************************************************************************/

Objective.AskForFood = function() {};
Objective.AskForFood.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	p.distinct = elem.getAttribute("distinct") === "true";
	
	return p;
};

Objective.AskForFood.prototype.checkObjective = function(customer, objective)  {

	if (objective.distinct) {
		
		var varData = findVariable();
		if (varData != undefined)
			return false;
		
	}
	if (objective.place === "counter") {
		if (customer.currentNode.id === CustOpt.counter[objective.pos-1]) {
	
			return true;
		}
	}
	
	return false;
};

Objective.AskForFood.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_askForFood", objective);
};

/******************************************************************************
 *                                Catch... Something
 ******************************************************************************/
Objective.CatchSomething = function(explanationKey) {
	this.key = explanationKey;
}; 

Objective.CatchSomething.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	
	return p;
};

Objective.CatchSomething.prototype.checkObjective = function(itemCatched, objective)  {
	
	var cust = null;
	if (objective.place === "counter") {
		cust = CustomerManager.getCustomerCounter(objective.pos);
	}
	if (cust == null)
		return false;
	

	var something = this.askSomething(cust);
	return itemCatched.descr === something.descr;
		
	
};

Objective.CatchSomething.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos(this.key, objective);
};

Objective.CatchSomething.prototype.askSomething = function(cust) {
	// the child class must implement this method
	
	return {descr: "nothing"};
};


/******************************************************************************
 *                                CatchFood
 ******************************************************************************/
Objective.CatchFood = function() {
	Objective.CatchSomething.call(this, "explanation_catchFood");
}; 

inherits(Objective.CatchSomething, Objective.CatchFood);

Objective.CatchFood.prototype.askSomething = function(cust) {
		
	return cust.askForFood();
};

/******************************************************************************
 *                                CatchDrink
 ******************************************************************************/
Objective.CatchDrink = function() {
	Objective.CatchSomething.call(this, "explanation_catchDrink");
}; 

inherits(Objective.CatchSomething, Objective.CatchDrink);

Objective.CatchDrink.prototype.askSomething = function(cust) {
		
	return cust.askForDrink();
};

/******************************************************************************
 *                                AskForDrink
 ******************************************************************************/

Objective.AskForDrink = function() {
	Objective.AskForFood.call(this);
};

inherits(Objective.AskForFood, Objective.AskForDrink);

Objective.AskForDrink.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_askForDrink", objective);
};

/******************************************************************************
 *                                 Deliver
 ******************************************************************************/

Objective.Deliver = function() {};

Objective.Deliver.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	
	return p;
};

Objective.Deliver.prototype.checkObjective = function(options, objective)  {
	var cust = null;
	if (objective.place === "counter") {
		cust = CustomerManager.getCustomerCounter(objective.pos);
	}
	if (cust == null)
		return false;
	
	
	var closeCust = hero.getCustomer();
	return (closeCust.currentNode.id == cust.currentNode.id);

};

Objective.Deliver.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_deliver", objective);
};


