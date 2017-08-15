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
	return {objective:elem.childNodes[0].nodeValue, 
			notExists:elem.getAttribute("notExists"),  
			level:elem.getAttribute("level"),
			achieved:false, achievedOrder: 0,
			trata:trata, resetable:true};
};

Objective.verifyObjectives = function(key, options) {
	if ((hero.allObjectivesAchieved || (hero.objective.debug && Game.runningStatus != 2)))
		return false;
	
	if (key === "notExists") {
		Objective.notExists();
		return;
	}
		
	var ret = false;
	/*
	if (hero.objective.ordered) {
		if (hero.objective.objectives[hero.lastObjectiveAchieved + 1].objective !== key)
			return false;
		
		if (hero.objective.objectives[hero.lastObjectiveAchieved + 1].notExists === "true")
			return false;
		
		
		var dest = Objective.factory(key); // put here for optimization in the time

		if (dest.checkObjective(options, hero.objective.objectives[hero.lastObjectiveAchieved + 1])) {
			
			Objective.markAchieved(hero.objective.objectives[hero.lastObjectiveAchieved + 1]);
			return true;
		} 

		
	} else { */
		for (var i = 0; i < hero.objective.objectives.length; i++) {
			if (hero.objective.objectives[i].objective === key && !hero.objective.objectives[i].achieved) {
				
				var dest = Objective.factory(key); // put here for optimization in the time
				if (hero.objective.objectives[i].notExists == null && 
						dest.checkObjective(options, hero.objective.objectives[i])) {
					
					Objective.markAchieved(hero.objective.objectives[i]);
					if ((key === "deliver" || key === "giveTheWholeChange" || 
							key === "giveSomeChange" || key === "conditional" || 
							key === "customDeliver" || key === "callTimes" || 
							key === "deliverGifts" || key === "talk")
							&& options.allCustomers) {
						ret = true;
					} else
						return true;
					
				}
			}
		}
		

	return ret;
};

Objective.search = function(key, searchParams) {
	for (var i = 0; i < hero.objective.objectives.length; i++) {
		if (hero.objective.objectives[i].objective === key) {
			var found = true;
			
			for (var j=0;j<searchParams.length;j++) {
				var param = searchParams[j];
				if (hero.objective.objectives[i][param.field] !== param.value) {
					found = false;
					break;
				}
			}
			if (found)
				return hero.objective.objectives[i];
		}
	}
	return null;
};

Objective.notExists = function() {
	
	for (var i = 0; i < hero.objective.objectives.length; i++) {
		if (hero.objective.objectives[i].notExists === "true")
			Objective.markAchieved(hero.objective.objectives[i]);
			
	}
};

Objective.reset = function(objective) {
	
	if (objective.resetable !== undefined && !objective.resetable) return;
	
	objective.achieved = false;
	
	var dest = Objective.factory(objective.objective);
	
	if (dest.reset) 
		dest.reset(objective);
};

Objective.markAchieved = function(objective) {
	
	hero.lastObjectiveAchieved++;
	hero.allObjectivesAchieved = (hero.lastObjectiveAchieved+1) == hero.objective.objectives.length;

	objective.achieved = true;
	objective.achievedOrder = hero.lastObjectiveAchieved;
	
};

Objective.factory = function(key) {
	var r = this.factories[key];
	if (r != undefined)
		return r;
	
	switch (key) {
	
	case "goesTo": 
		this.factories[key] = new Objective.Counter();
		break;

	case "goesToDisplay": 
		this.factories[key] = new Objective.GoesToDisplay();
		break;

	case "goesToCooler": 
		this.factories[key] = new Objective.GoesToCooler();
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
		
	case "conditional":
		this.factories[key] = new Objective.Conditional();
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
		
	case "countTalk":
		this.factories[key] = new Objective.CountTalk();
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
		
	case "totalOfSell":
		this.factories[key] = new Objective.TotalOfSell();
		break;
		
	case "callTimes":
		this.factories[key] = new Objective.CallTimes();
		break;

	case "ordered" :
		this.factories[key] = new Objective.Ordered();
		break;
		
	case "music" : 
		this.factories[key] = new Objective.Music();
		break;
		
	case "clickMission" : 
		this.factories[key] = new Objective.ClickMission();
		break;

	case "clickInfo1" : 
		this.factories[key] = new Objective.ClickInfo(1);
		break;

	case "clickInfo2" : 
		this.factories[key] = new Objective.ClickInfo(2);
		break;
		
	case "keyPressed" : 
		this.factories[key] = new Objective.KeyPressed();
		break;
	
	case "useMath":
		this.factories[key] = new Objective.UseMath();
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
 *                                GoesToDisplay
 ******************************************************************************/

Objective.GoesToDisplay = function() {};
Objective.GoesToDisplay.prototype.init = function(elem) {
	var p = {objective:"goesToDisplay", achieved:false, level:elem.getAttribute("level"), trata:this};
	return p;
};

Objective.GoesToDisplay.prototype.checkObjective = function(options, objective)  {
	if (options.nx == hero.displayNode.x && options.ny == hero.displayNode.y) {
		
		return true;
	} 
	
	return false;

};

Objective.GoesToDisplay.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_goestodisplay");
	return text;
};

/******************************************************************************
 *                                GoesToCooler
 ******************************************************************************/

Objective.GoesToCooler = function() {};
Objective.GoesToCooler.prototype.init = function(elem) {
	var p = {objective:"goesToCooler", achieved:false, level:elem.getAttribute("level"), trata:this};
	return p;
};

Objective.GoesToCooler.prototype.checkObjective = function(options, objective)  {
	if (options.nx == hero.coolerNode.x && options.ny == hero.coolerNode.y) {
		
		return true;
	} 
	
	return false;

};

Objective.GoesToCooler.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_goestocooler");
	return text;
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
		return true; // change on 09-03-2016: there is some missions that sometimes
	 	            ////  dont have customers. 
	                ///  I change this if from avoid error to satisfy the objective 
	
	var typeOfGift = eval(objective.value);
	if (typeOfGift === "") { // if he must not receive a gift
		for (var i = 0; i<cust.deliveredItems.length; i++)
			if (cust.deliveredItems[i].source == null)
				return false;
		
		return true; // is true if the customer didnt received
	}
		
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
	p.fullText = elem.getAttribute("fullText");
	
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
	} else
		if (objective.place === "table") {
			
			if (options.allCustomers)
				cust = CustomerManager.getCustomerTable(objective.pos);
			else {
				
				if (options.customer.currentNode.id === CustOpt.table[objective.pos-1]) 
					cust = options.customer;
			}
		}
	if (cust == null)
		return false;
	
	var typeOfItem = eval(objective.value);
	
	if (typeOfItem === "") { // the customer must not received any item
		
		return (cust.fUnfulfilled == 0) && (cust.dUnfulfilled == 0); // there arent any deliver 
	}
	
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
	if (objective.fullText === "true")
		return objective.text;
	
	return Objective.createExplanationItemPlacePos("explanation_customdeliver", objective, objective.text);
};

/******************************************************************************
 *                                 Conditional
 ******************************************************************************/

Objective.Conditional = function() {};

Objective.Conditional.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.pos = elem.getAttribute("pos");
	p.place = elem.getAttribute("place");
	p.condition = elem.getAttribute("condition");
	p.text = elem.getAttribute("text");

	return p;
};

Objective.Conditional.prototype.checkObjective = function(options, objective)  {
	
	return eval(objective.condition);
	
};

Objective.Conditional.prototype.createExplanationItem = function(objective) {
	return objective.text;
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

	var count = Game.editor.countInstructions();

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
	p.type = elem.getAttribute("type");
	p.condition = elem.getAttribute("condition");
	return p;
};

Objective.Talk.prototype.checkObjective = function(options, objective)  {

	if (objective.condition != null) {
		if (!eval(objective.condition)) // if it's not necessary to talk
			return options.allCustomers;
	}
	
	var value = eval(objective.value);
	
	if (objective.type !== null) {
		if (objective.type === "functionCompare")
			return value;
		
		if (Array.isArray(options.data) && objective.type === "array") {
			if (value.indexOf("##") > -1) {
				
				value = value.split("##");
				if (value.length !== options.data.length)
					return false;
			} else {
				value = [value];
			}
				
			
			for (var i = 0; i<options.data.length; i++) {
				if (JSON.stringify(options.data[i]) !== value[i]+"")
					return false;
			}
			return true;
		}
	}
	
	return value === options.data;

};

Objective.Talk.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_talk");
	return text.format(objective.text);
};

/******************************************************************************
 *                                CountTalk
 ******************************************************************************/

Objective.CountTalk = function() {};
Objective.CountTalk.prototype.init = function(qtd) {
	var p = {objective:"countTalk", achieved:false, trata:this};
	
	p.qtd = qtd;
	p.count = 0;
	
	return p;
};

Objective.CountTalk.prototype.reset = function(objective) {
	objective.count = 0;
};

Objective.CountTalk.prototype.checkObjective = function(options, objective)  {

	if (options && options.allCustomers) {
		return objective.count <= objective.qtd;
	} 
	
	objective.count++;
	return false;

};

Objective.CountTalk.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_counttalk");
	return text.format(objective.qtd);
};

/******************************************************************************
 *                                UseBlock
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

/******************************************************************************
 *                                TotalOfSell
 ******************************************************************************/

Objective.TotalOfSell = function() {};

Objective.TotalOfSell.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.value = parseInt(elem.getAttribute("value"));
	p.current = 0;
	
	return p;
};

Objective.TotalOfSell.prototype.reset = function(objective) {
	objective.current = 0;
};

Objective.TotalOfSell.prototype.checkObjective = function(options, objective)  {
	
	objective.current += options.value;
	
	
	return (objective.current >= objective.value);
};

Objective.TotalOfSell.prototype.createExplanationItem = function(objective)  {
	
	var text = BlocklyApps.getMsg("explanation_sellobjective");
	return text.format(objective.value);
 
};

/******************************************************************************
 *                                CallTimes
 ******************************************************************************/

Objective.CallTimes = function() {};

Objective.CallTimes.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.block = elem.getAttribute("block");
	p.times = parseInt(elem.getAttribute("times"));
	p.blockType = elem.getAttribute("type");
	
	return p;
};

Objective.CallTimes.prototype.reset = function(objective) {
	Game.callTimes = {};
};

Objective.CallTimes.prototype.checkObjective = function(options, objective)  {
	
	var times = Game.callTimes[objective.blockType];
	times = (times === undefined?0:times);
	
	return (times <= objective.times);
};

Objective.CallTimes.prototype.createExplanationItem = function(objective)  {
	
	var text = BlocklyApps.getMsg("explanation_callTimesObjective");
	return text.format(objective.block, objective.times);
 
};

/******************************************************************************
 *                                  Ordered
 ******************************************************************************/

Objective.Ordered = function() {};
Objective.Ordered.prototype.init = function() {
	
	var p = {objective:"ordered", achieved:false, trata:this, achievedOrder: 0};
	
	return p;
};

Objective.Ordered.prototype.reset = function(objective) {
	objective.achievedOrder = hero.objective.objectives.length-1;
};

Objective.Ordered.prototype.checkObjective = function(options, objective)  {
	
	if (!hero.objective.ordered) 
		return true;
	
	var lastOrder = -1;
	for (var i = 0; i < hero.objective.objectives.length-1; i++) {
		if (!(hero.objective.objectives[i].achievedOrder === lastOrder+1)) 
			return false;
		
		lastOrder = hero.objective.objectives[i].achievedOrder;
	}
	return true;

};

Objective.Ordered.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_ordered");
	return text;
};


/******************************************************************************
 *                                  Music
 ******************************************************************************/

Objective.Music = function() {};
Objective.Music.prototype.init = function(elem) {
	
	var p = {objective:"music", achieved:false, trata:this, achievedOrder: 0};
	p.status = elem.getAttribute("status");
	
	return p;
};

Objective.Music.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_music");
	return text.format(BlocklyApps.getMsg("explanation_"+objective.status));
};

Objective.Music.prototype.checkObjective = function(options, objective)  {
	return options.status === objective.status;
};

/******************************************************************************
 *                                  Click Mission 
 ******************************************************************************/

Objective.ClickMission = function() {};
Objective.ClickMission.prototype.init = function(elem) {
	
	var p = {objective:"clickMission", achieved:false, trata:this, achievedOrder: 0};
	p.missionId = parseInt(elem.getAttribute("missionId"));
	
	return p;
};

Objective.ClickMission.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_clickmission");
	return text.format(objective.missionId);
};

Objective.ClickMission.prototype.checkObjective = function(options, objective)  {
	return options.missionId === objective.missionId;
};

/******************************************************************************
 *                                  Click Info 
 ******************************************************************************/

Objective.ClickInfo = function(infoId) { this.infoId = infoId; };
Objective.ClickInfo.prototype.init = function(elem) {
	
	var p = {objective:"clickInfo"+this.infoId, achieved:false, trata:this, achievedOrder: 0};
	
	return p;
};

Objective.ClickInfo.prototype.createExplanationItem = function(objective) {
	var text = BlocklyApps.getMsg("explanation_"+objective.objective);
	return text;
};

Objective.ClickInfo.prototype.checkObjective = function(options, objective)  {
	return true;
};

/******************************************************************************
 *                                  Key Pressed
 ******************************************************************************/

Objective.KeyPressed = function() {};

Objective.KeyPressed.prototype.init = function(elem) {
	
	var p = {objective:"keyPressed", achieved:false, trata:this, achievedOrder: 0};
	p.key = parseInt(elem.getAttribute("key"));
	p.ctrlPressed = elem.getAttribute("ctrlKey") === "true";
	p.shiftPressed = elem.getAttribute("shiftKey") === "true";
	p.text = elem.getAttribute("text");
	
	p.resetable = false;
	
	return p;
};

Objective.KeyPressed.prototype.createExplanationItem = function(objective) {
	var text = "Utilize as teclas " + objective.text;
	return text;
};

Objective.KeyPressed.prototype.checkObjective = function(options, objective)  {
	return (options.key == objective.key && options.ctrlPressed == objective.ctrlPressed && options.shiftPressed == objective.shiftPressed);
};

/******************************************************************************
 *                                UseMath
 ******************************************************************************/

Objective.UseMath = function() {};

// read from XML
Objective.UseMath.prototype.init = function(elem) {
	var p = Objective.init(elem, this);
	
	p.op = elem.getAttribute("operator");
	p.arg0 = elem.getAttribute("arg0");
	p.arg1 = elem.getAttribute("arg1");
	p.text = elem.getAttribute("text");
	
	return p;
};

Objective.UseMath.prototype.checkObjective = function(options, objective)  {
	
	console.log("Deu");
	
	var arg0 = eval(objective.arg0);
	var arg1 = eval(objective.arg1);
	
	return (objective.op === options.op && ((arg0 == options.arg0.data && arg1 == options.arg1.data) || (arg0 == options.arg1.data && arg1 == options.arg0.data)));
	
};

Objective.UseMath.prototype.createExplanationItem = function(objective)  {
	return objective.text;

};
