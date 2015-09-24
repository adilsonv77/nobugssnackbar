'use strict';
/******************************************************************************
 *                                Utility functions
 ******************************************************************************/

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

/******************************************************************************
 *                                Objective
 ******************************************************************************/

var Objective = {
	factories : []
};

Objective.init = function(elem, trata) {
	return {objective:elem.childNodes[0].nodeValue, notExists:elem.getAttribute("notExists"),  achieved:false, trata:trata};
};

Objective.verifyObjectives = function(key, options) {
	if ((hero.allObjectivesAchieved || (hero.objective.debug && Game.runningStatus != 2)))
		return false;
	
	if (key === "notExists") {
		Objective.notExists();
		return;
	}
		
	
	var dest = Objective.factory(key);

	var ret = false;
	if (hero.objective.ordered) {
		if (!hero.objective.objectives[hero.lastObjectiveAchieved + 1].objective === key)
			return false;
		
		if (hero.objective.objectives[hero.lastObjectiveAchieved + 1].notExists === "true")
			return false;
		
		if (dest.checkObjective(options, hero.objective.objectives[hero.lastObjectiveAchieved + 1])) {
			
			Objective.markAchieved(hero.objective.objectives[hero.lastObjectiveAchieved + 1]);
			return true;
		} 

		
	} else {
		for (var i = 0; i < hero.objective.objectives.length; i++) {
			if (hero.objective.objectives[i].objective === key && !hero.objective.objectives[i].achieved) {
				
				if (hero.objective.objectives[i].notExists == null && 
						dest.checkObjective(options, hero.objective.objectives[i])) {
					
					Objective.markAchieved(hero.objective.objectives[i]);
					if ((key === "deliver" || key === "giveTheWholeChange" ||  key === "giveSomeChange" ) && options.allCustomers) {
						ret = true;
					} else
						return true;
					
				}
			}
		}
		
	}

	return ret;
};

Objective.notExists = function() {
	
	for (var i = 0; i < hero.objective.objectives.length; i++) {
		if (hero.objective.objectives[i].notExists === "true")
			Objective.markAchieved(hero.objective.objectives[i]);
			
	}
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
	
	case "goesTo": 
		this.factories[key] = new Objective.Counter();
		break;

	case "askForFood":
		this.factories[key] = new Objective.AskForFood();
		break;

	case "pickUpFood": 
		this.factories[key] = new Objective.PickUpFood();
		break;

	case "askHasHunger":
		this.factories[key] = new Objective.AskSomething("explanation_askHasHunger");
		break;
		
	case "askForDrink":
		this.factories[key] = new Objective.AskSomething("explanation_askForDrink");
		break;
		
	case "askWantHowManyFoods":
		this.factories[key] = new Objective.AskSomething("explanation_askWantHowManyFoods");
		break;
		
	case "askWantHowManyDrinks":
		this.factories[key] = new Objective.AskSomething("explanation_askWantHowManyDrinks");
		break;

	case "askForIceCream":
		this.factories[key] = new Objective.AskSomething("explanation_askForIceCream");
		break;
		
	case "askWantHowManyIceCream":
		this.factories[key] = new Objective.AskSomething("explanation_askWantHowManyIceCream");
		break;
		
	case "pickUpDrink": 
		this.factories[key] = new Objective.PickUpDrink();
		break;
	
	case "askHasThirsty":
		this.factories[key] = new Objective.AskSomething("explanation_askHasThirsty");
		break;

	case "deliver": 
		this.factories[key] = new Objective.Deliver();
		break;
		
	case "deliverGifts": 
		this.factories[key] = new Objective.DeliverGifts();
		break;
		
	case "customDeliver":
		this.factories[key] = new Objective.CustomDeliver();
		break;
		
	case "varQtd": 
		this.factories[key] = new Objective.VarQtd();
		break;

	case "commQtd": 
		this.factories[key] = new Objective.CommsQtd();
		break;
		
	case "talk":
		this.factories[key] = new Objective.Talk();
		break;
		
	case "cashIn":
		this.factories[key] = new Objective.CashIn();
		break;
		
	case "giveTheWholeChange":
		this.factories[key] = new Objective.GiveTheWholeChange();
		break;
		
	case "giveSomeChange":
		this.factories[key] = new Objective.GiveSomeChange();
		break;
		
	case "useBlock":
		this.factories[key] = new Objective.UseBlock();
		break;
	}
	
	return this.factories[key];
};

Objective.createExplanationItemPlacePos = function(msgKey, objective, arg0, arg1) {
	var key = BlocklyApps.getMsg("_"+objective.place);
	var text = BlocklyApps.getMsg(msgKey);
	
	return text.format(key  + " " + objective.pos, arg0, arg1);
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
	if (objective.distinct) {
		return Objective.createExplanationItemPlacePos("explanation_askForFoodDistinctVar", objective);
	}
	
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
 *                                PickUpFood
 ******************************************************************************/
Objective.PickUpFood = function() {
	Objective.CatchSomething.call(this, "explanation_catchFood");
}; 

inherits(Objective.CatchSomething, Objective.PickUpFood);

Objective.PickUpFood.prototype.askSomething = function(cust) {
		
	return cust.askForFood();
};

/******************************************************************************
 *                                PickUpDrink
 ******************************************************************************/
Objective.PickUpDrink = function() {
	Objective.CatchSomething.call(this, "explanation_catchDrink");
}; 

inherits(Objective.CatchSomething, Objective.PickUpDrink);

Objective.PickUpDrink.prototype.askSomething = function(cust) {
		
	return cust.askForDrink();
};

/******************************************************************************
 *                                AskSomething
 ******************************************************************************/

Objective.AskSomething = function(keyExplanation) {
	Objective.AskForFood.call(this);
	this.keyExplanation = keyExplanation;
};

inherits(Objective.AskForFood, Objective.AskSomething);

Objective.AskSomething.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos(this.keyExplanation, objective);
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
 *                                AskHasThisty
 ******************************************************************************/

Objective.AskHasThirsty = function() {
	Objective.AskForFood.call(this);
};

inherits(Objective.AskForFood, Objective.AskHasThirsty);

Objective.AskHasThirsty.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_askHasThirsty", objective);
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
		
		if (options.allCustomers)
			cust = CustomerManager.getCustomerCounter(objective.pos);
		else {
			
			if (options.customer.currentNode.id === CustOpt.counter[objective.pos-1]) 
				cust = options.customer;
		}
	}
	if (cust == null)
		return false;
	
	return !(cust.hasThirsty() || cust.hasHunger());
};

Objective.Deliver.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_deliver", objective);
};

/******************************************************************************
 *                                 DeliverGifts
 ******************************************************************************/

Objective.DeliverGifts = function() {};

Objective.DeliverGifts.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	p.value = elem.getAttribute("value");
	p.gift = elem.getAttribute("gift");
	
	return p;
};

Objective.DeliverGifts.prototype.checkObjective = function(options, objective)  {
	var cust = null;
	if (objective.place === "counter") {
		
		if (options.allCustomers)
			cust = CustomerManager.getCustomerCounter(objective.pos);
		else {
			
			if (options.customer.currentNode.id === CustOpt.counter[objective.pos-1]) 
				cust = options.customer;
		}
	}
	if (cust == null)
		return false;
	
	var typeOfGift = eval(objective.value);
	
	return (cust.hasReceivedGift(typeOfGift));
};

Objective.DeliverGifts.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_delivergifts", objective, objective.gift);
};

/******************************************************************************
 *                                 CustomDeliver
 ******************************************************************************/

Objective.CustomDeliver = function() {};

Objective.CustomDeliver.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	p.value = elem.getAttribute("value");
	p.text = elem.getAttribute("text");
	
	return p;
};

Objective.CustomDeliver.prototype.checkObjective = function(options, objective)  {
	var cust = null;
	if (objective.place === "counter") {
		
		if (options.allCustomers)
			cust = CustomerManager.getCustomerCounter(objective.pos);
		else {
			
			if (options.customer.currentNode.id === CustOpt.counter[objective.pos-1]) 
				cust = options.customer;
		}
	}
	if (cust == null)
		return false;
	
	var typeOfItem = eval(objective.value);
	
	var foodOrDrink = null;
	var itemId = typeOfItem;
	
	if (typeOfItem.indexOf("#") > 0) {
		var ti = typeOfItem.split("#");
		foodOrDrink = ti[0];
		itemId = ti[1];
	}
	
	return (cust.hasReceivedItem(foodOrDrink, itemId));
};

Objective.CustomDeliver.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_customdeliver", objective, objective.text);
};

/******************************************************************************
 *                                 CashIn
 ******************************************************************************/

Objective.CashIn = function() {};

Objective.CashIn.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	
	return p;
};

Objective.CashIn.prototype.checkObjective = function(options, objective)  {
	var cust = null;
	if (objective.place === "counter") {
		
		if (options.allCustomers)
			cust = CustomerManager.getCustomerCounter(objective.pos);
		else {
			
			if (options.customer.currentNode.id === CustOpt.counter[objective.pos-1]) 
				cust = options.customer;
		}
	}
	if (cust == null)
		return false;
	
	return (cust.isPaid());
};

Objective.CashIn.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_cashin", objective);
};

/******************************************************************************
 *                                 GiveTheWholeChange
 ******************************************************************************/

Objective.GiveTheWholeChange = function() {};

Objective.GiveTheWholeChange.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	
	return p;
};

Objective.GiveTheWholeChange.prototype.checkObjective = function(options, objective)  {
	var cust = null;
	if (objective.place === "counter") {
		
		if (options.allCustomers)
			cust = CustomerManager.getCustomerCounter(objective.pos);
		else {
			
			if (options.customer.currentNode.id === CustOpt.counter[objective.pos-1]) 
				cust = options.customer;
		}
	}
	if (cust == null)
		return false;
	
	return (cust.isPaid() && cust.isChangeReceived() && cust.isTheBestChange());
};

Objective.GiveTheWholeChange.prototype.createExplanationItem = function(objective) {
	return Objective.createExplanationItemPlacePos("explanation_givethewholechange", objective);
};

/******************************************************************************
 *                                 GiveSomeChange
 ******************************************************************************/

Objective.GiveSomeChange = function() {};

Objective.GiveSomeChange.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	
	p.type = elem.getAttribute("type");
	p.qtd  = elem.getAttribute("qtd");
	
	return p;
};

Objective.GiveSomeChange.prototype.checkObjective = function(options, objective)  {
	var cust = null;
	if (objective.place === "counter") {
		
		if (options.allCustomers)
			cust = CustomerManager.getCustomerCounter(objective.pos);
		else {
			
			if (options.customer.currentNode.id === CustOpt.counter[objective.pos-1]) 
				cust = options.customer;
		}
	}
	if (cust == null)
		return false;
	
	var q = eval(objective.qtd);
	
	return (cust.isPaid() && cust.receivedChange('"'+objective.type+'"', q));
};

Objective.GiveSomeChange.prototype.createExplanationItem = function(objective) {
	var tm1="", tm2="";
	if (objective.type === "$$$money20") {
		tm1 = "_banknotes"; tm2 = 20;
	} else
		if (objective.type === "$$$money10") {
			tm1 = "_banknotes"; tm2 = 10;
		} else
			if (objective.type === "$$$money5") {
				tm1 = "_banknotes"; tm2 = 5;
			} else
				if (objective.type === "$$$money2") {
					 tm1 = "_coins"; tm2 = 2;
				} else {
					 tm1 = "_coins"; tm2 = 1;
				}

	return Objective.createExplanationItemPlacePos("explanation_givesomechange", 
					objective,	BlocklyApps.getMsg(tm1), tm2);
};

/******************************************************************************
 *                          Quantity of Variables
 ******************************************************************************/

Objective.VarQtd = function() {};
Objective.VarQtd.prototype.init = function(qtd) {
	var p = {objective:"varQtd", achieved:false, trata:this};
	
	p.qtd = qtd;
	
	return p;
};

Objective.VarQtd.prototype.checkObjective = function(options, objective)  {
	// -1 because there is a special variable
	return (Game.jsInterpreter.variables.length-1) <= objective.qtd;
};

Objective.VarQtd.prototype.createExplanationItem = function(objective) {
	
	var text = BlocklyApps.getMsg("explanation_varQtd");
	return text.format(objective.qtd);
	
};


/******************************************************************************
 *                          Quantity of Commands
 ******************************************************************************/

Objective.CommsQtd = function() {};
Objective.CommsQtd.prototype.init = function(qtd) {
	var p = {objective:"commQtd", achieved:false, trata:this};
	
	p.qtd = qtd;
	
	return p;
};

Objective.CommsQtd.prototype.checkObjective = function(options, objective)  {

	var count = Game.countInstructions(Blockly.mainWorkspace.getTopBlocks());

	return count <= objective.qtd;
};

Objective.CommsQtd.prototype.createExplanationItem = function(objective) {
	
	var text = BlocklyApps.getMsg("explanation_commsQtd");
	return text.format(objective.qtd);
	
};

/******************************************************************************
 *                                Talk
 ******************************************************************************/

Objective.Talk = function() {};
Objective.Talk.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	p.text = elem.getAttribute("text");
	p.value = elem.getAttribute("value");
	return p;
};

Objective.Talk.prototype.checkObjective = function(options, objective)  {

	var value = eval(objective.value);
	
	return value === options.data;

};

Objective.Talk.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_talk");
	return text.format(objective.text);
};

/******************************************************************************
 *                                Talk
 ******************************************************************************/

Objective.UseBlock = function() {};

Objective.UseBlock.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.type = elem.getAttribute("type");
	p.value = elem.getAttribute("value");
	
	return p;
};

Objective.UseBlock.prototype.checkObjective = function(options, objective)  {
	if (objective.value != null) 
		if (!(objective.value === options.value))
			return false;
	
	return (objective.type === options.type);
};

Objective.UseBlock.prototype.createExplanationItem = function(objective)  {
	var text = BlocklyApps.getMsg("explanation_useblock");
	var value = (objective.value != null? " [" + objective.value + "]":"");
	return text.format(BlocklyApps.getMsg("descr_" + objective.type) + value);

};
