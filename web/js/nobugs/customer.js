/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://nobugssnackbar.googlecode.com/
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Customer 'intelligence'.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';

var CustOpt = {};

CustOpt.path = {n2:{n1:1, n3:1}, n3:{n2:1, n4:1}, n4:{n3:1, n5:1}, n5:{n4:1, n6:1}, n6:{n5:1, n7:1}, n7:{n6:1, n8:1}, n8:{n7:1, n9:1}, n9:{n8:1, n10:1}, n10:{n9:1, n11:1}, n11:{n10:1, n12:1}, n12:{n11:1, n13:1}, n13:{n12:1, n14:1}, n14:{n13:1, n15:1}, n15:{n14:1, n16:1}, n16:{n15:1, n17:1}, n17:{n16:1, n18:1}, n18:{n17:1, n19:1}, n19:{n18:1, n20:1}, n20:{n19:1, n21:1}, n21:{n20:1, n22:1}, n22:{n21:1, n23:1}, n23:{n22:1, n24:1}, n24:{n23:1, n25:1}, n25:{n24:1, n26:1}, n26:{n25:1, n27:1}, n27:{n26:1, n28:1}, n28:{n27:1, n29:1}, n29:{n28:1, n30:1}, n30:{n29:1, n31:1}, n31:{n30:1, n32:1}, n32:{n31:1, n33:1}, n33:{n32:1, n34:1}, n34:{n33:1, n35:1}, n35:{n34:1, n36:1}, n36:{n35:1, n37:1}, n37:{n36:1, n38:1}, n38:{n37:1, n39:1}, n40:{n39:1, n41:1}, n41:{n40:1, n42:1}, n42:{n41:1, n43:1}, n43:{n42:1, n44:1}, n44:{n43:1, n45:1}, n45:{n44:1, n46:1}, n46:{n45:1, n47:1}, n47:{n46:1, n48:1}, n48:{n47:1, n49:1}, n39:{n38:1, n40:1, n50:1}, n50:{n39:1, n51:1}, n51:{n50:1, n52:1}, n52:{n51:1, n53:1}, n53:{n52:1, n54:1}, n54:{n53:1, n55:1}, n55:{n54:1, n56:1}, n56:{n55:1, n57:1}, n57:{n56:1, n58:1}, n58:{n57:1, n59:1}, n59:{n58:1, n60:1}, n60:{n59:1, n61:1}, n61:{n60:1, n62:1}, n62:{n61:1, n63:1}, n63:{n62:1, n64:1}, n64:{n63:1, n65:1}, n65:{n64:1, n66:1}, n66:{n65:1, n67:1}, n67:{n66:1, n68:1}, n68:{n67:1, n69:1}, n70:{n69:1, n71:1}, n71:{n70:1, n72:1}, n72:{n71:1, n73:1}, n73:{n72:1, n74:1}, n74:{n73:1, n75:1}, n75:{n74:1, n76:1}, n76:{n75:1, n77:1}, n77:{n76:1, n78:1}, n78:{n77:1, n79:1}, n69:{n68:1, n70:1, n80:1}, n80:{n69:1, n81:1}, n81:{n80:1, n82:1}, n82:{n81:1, n83:1}, n83:{n82:1, n84:1}, n84:{n83:1, n85:1}, n85:{n84:1, n86:1}, n86:{n85:1, n87:1}, n87:{n86:1, n88:1}, n88:{n87:1, n89:1}, n89:{n88:1, n90:1}, n90:{n89:1, n91:1}, n91:{n90:1, n92:1}, n92:{n91:1, n93:1}, n93:{n92:1, n94:1}, n94:{n93:1, n95:1}, n95:{n94:1, n96:1}, n96:{n95:1, n97:1}, n97:{n96:1, n98:1}, n98:{n97:1, n99:1}, n100:{n99:1, n101:1}, n101:{n100:1, n102:1}, n102:{n101:1, n103:1}, n103:{n102:1, n104:1}, n104:{n103:1, n105:1}, n105:{n104:1, n106:1}, n106:{n105:1, n107:1}, n107:{n106:1, n108:1}, n108:{n107:1, n109:1}, n99:{n98:1, n100:1}, n1:{n2:1}, n49:{n48:1}, n79:{n78:1}, n109:{n108:1}, };
CustOpt.nodes = {n1:{id: 'n1', x:40, y: 105}, n2:{id: 'n2', x:36, y: 105}, n3:{id: 'n3', x:32, y: 105}, n4:{id: 'n4', x:28, y: 105}, n5:{id: 'n5', x:24, y: 105}, n6:{id: 'n6', x:20, y: 105}, n7:{id: 'n7', x:16, y: 105}, n8:{id: 'n8', x:12, y: 105}, n9:{id: 'n9', x:8, y: 105}, n10:{id: 'n10', x:4, y: 105}, n11:{id: 'n11', x:0, y: 105}, n12:{id: 'n12', x:0, y: 111}, n13:{id: 'n13', x:0, y: 117}, n14:{id: 'n14', x:0, y: 123}, n15:{id: 'n15', x:0, y: 129}, n16:{id: 'n16', x:0, y: 135}, n17:{id: 'n17', x:0, y: 141}, n18:{id: 'n18', x:0, y: 147}, n19:{id: 'n19', x:0, y: 153}, n20:{id: 'n20', x:0, y: 159}, n21:{id: 'n21', x:0, y: 165}, n22:{id: 'n22', x:0, y: 171}, n23:{id: 'n23', x:0, y: 177}, n24:{id: 'n24', x:0, y: 183}, n25:{id: 'n25', x:0, y: 189}, n26:{id: 'n26', x:0, y: 195}, n27:{id: 'n27', x:0, y: 201}, n28:{id: 'n28', x:0, y: 207}, n29:{id: 'n29', x:0, y: 213}, n30:{id: 'n30', x:0, y: 219}, n31:{id: 'n31', x:0, y: 225}, n32:{id: 'n32', x:0, y: 231}, n33:{id: 'n33', x:0, y: 237}, n34:{id: 'n34', x:0, y: 243}, n35:{id: 'n35', x:0, y: 249}, n36:{id: 'n36', x:0, y: 255}, n37:{id: 'n37', x:0, y: 261}, n38:{id: 'n38', x:0, y: 267}, n39:{id: 'n39', x:0, y: 273}, n40:{id: 'n40', x:3, y: 276}, n41:{id: 'n41', x:6, y: 276}, n42:{id: 'n42', x:9, y: 276}, n43:{id: 'n43', x:12, y: 276}, n44:{id: 'n44', x:15, y: 276}, n45:{id: 'n45', x:18, y: 276}, n46:{id: 'n46', x:21, y: 276}, n47:{id: 'n47', x:24, y: 276}, n48:{id: 'n48', x:27, y: 276}, n49:{id: 'n49', x:44, y: 276}, n50:{id: 'n50', x:0, y: 280}, n51:{id: 'n51', x:0, y: 284}, n52:{id: 'n52', x:0, y: 288}, n53:{id: 'n53', x:0, y: 292}, n54:{id: 'n54', x:0, y: 296}, n55:{id: 'n55', x:0, y: 300}, n56:{id: 'n56', x:0, y: 304}, n57:{id: 'n57', x:0, y: 308}, n58:{id: 'n58', x:0, y: 312}, n59:{id: 'n59', x:0, y: 316}, n60:{id: 'n60', x:0, y: 320}, n61:{id: 'n61', x:0, y: 324}, n62:{id: 'n62', x:0, y: 328}, n63:{id: 'n63', x:0, y: 332}, n64:{id: 'n64', x:0, y: 336}, n65:{id: 'n65', x:0, y: 340}, n66:{id: 'n66', x:0, y: 344}, n67:{id: 'n67', x:0, y: 348}, n68:{id: 'n68', x:0, y: 352}, n69:{id: 'n69', x:0, y: 356}, n70:{id: 'n70', x:3, y: 356}, n71:{id: 'n71', x:6, y: 356}, n72:{id: 'n72', x:9, y: 356}, n73:{id: 'n73', x:12, y: 356}, n74:{id: 'n74', x:15, y: 356}, n75:{id: 'n75', x:18, y: 356}, n76:{id: 'n76', x:21, y: 356}, n77:{id: 'n77', x:24, y: 356}, n78:{id: 'n78', x:27, y: 356}, n79:{id: 'n79', x:44, y: 356}, n80:{id: 'n80', x:0, y: 360}, n81:{id: 'n81', x:0, y: 364}, n82:{id: 'n82', x:0, y: 368}, n83:{id: 'n83', x:0, y: 372}, n84:{id: 'n84', x:0, y: 376}, n85:{id: 'n85', x:0, y: 380}, n86:{id: 'n86', x:0, y: 384}, n87:{id: 'n87', x:0, y: 388}, n88:{id: 'n88', x:0, y: 392}, n89:{id: 'n89', x:0, y: 396}, n90:{id: 'n90', x:0, y: 400}, n91:{id: 'n91', x:0, y: 404}, n92:{id: 'n92', x:0, y: 408}, n93:{id: 'n93', x:0, y: 412}, n94:{id: 'n94', x:0, y: 416}, n95:{id: 'n95', x:0, y: 420}, n96:{id: 'n96', x:0, y: 424}, n97:{id: 'n97', x:0, y: 428}, n98:{id: 'n98', x:0, y: 432}, n99:{id: 'n99', x:0, y: 436}, n100:{id: 'n100', x:3, y: 436}, n101:{id: 'n101', x:6, y: 436}, n102:{id: 'n102', x:9, y: 436}, n103:{id: 'n103', x:12, y: 436}, n104:{id: 'n104', x:15, y: 436}, n105:{id: 'n105', x:18, y: 436}, n106:{id: 'n106', x:21, y: 436}, n107:{id: 'n107', x:24, y: 436}, n108:{id: 'n108', x:27, y: 436}, n109:{id: 'n109', x:44, y: 436}, };
CustOpt.keynodes = ['n1', 'n49', 'n79', 'n109', ];

CustOpt.counter = [CustOpt.keynodes[1], CustOpt.keynodes[2], CustOpt.keynodes[3]];
CustOpt.door = 'n1';

CustOpt.customerFinalPath = new Array();

PreloadImgs.put('$customer01', 'images/$customer01.png');
PreloadImgs.put('$customer01_anger', 'images/$customer01_anger.png');
PreloadImgs.put('$customer02', 'images/$customer02.png');
PreloadImgs.put('$customer02_anger', 'images/$customer02_anger.png');
PreloadImgs.put('$customer03', 'images/$customer03.png');
PreloadImgs.put('$customer03_anger', 'images/$customer03_anger.png');
PreloadImgs.put('coin', 'images/coin.png');
PreloadImgs.put('anger', 'images/anger.png');
PreloadImgs.put('duvida', 'images/duvida.png');
PreloadImgs.put('heart', 'images/heart.png');

//Candidate Orders
PreloadImgs.put('$coke', 'images/$$coke.png');
PreloadImgs.put('$hotdog', 'images/$$hotdog.png');
PreloadImgs.put('$juiceoforange', 'images/$$juiceoforange.png');
PreloadImgs.put('$orange', 'images/$$orange.png');
PreloadImgs.put('$icecreamofchocolate', 'images/$$icecreamofchocolate.png');
PreloadImgs.put('$icecreamofvanilla', 'images/$$icecreamofvanilla.png');
PreloadImgs.put('$icecreamofstrawberry', 'images/$$icecreamofstrawberry.png');

//Balloons
PreloadImgs.put('baloon_1', 'images/baloon_1.png');
PreloadImgs.put('baloonr_1', 'images/baloonr_1.png');
PreloadImgs.put('baloon_2', 'images/baloon_2.png');
PreloadImgs.put('baloonr_2', 'images/baloonr_2.png');
PreloadImgs.put('baloon_3', 'images/baloon_3.png');
PreloadImgs.put('baloonr_3', 'images/baloonr_3.png');


// acts as a state machine
CustOpt.createCustomerPath = function() {
	for (var key = 0; key < CustOpt.keynodes.length; key++)
		CustOpt.customerFinalPath[key] = CustOpt.nodes[CustOpt.keynodes[key]];
	
	CustOpt.graph = new Graph(CustOpt.path);
	
};

CustOpt.createCustomerPath();

var Customer = {};

Customer = function(options) {
	
	this.pay = options.pay;
	this.limitedChanges = options.limitedChanges.split(",");
	for (var i=0; i<this.limitedChanges.length; i++)
		this.limitedChanges[i] = parseInt(this.limitedChanges[i]);
		
	this.randomType = options.randomType;
	this.hasRandom = options.hasRandom;
	this.drinks = options.drinks;
	this.dUnfulfilled = 0;
	
	this.foods = options.foods;
	this.fUnfulfilled = 0;
	
	var fAddDeliveredFalse = function(item) { item.delivered = false; };
	
	this.drinks.forEach(fAddDeliveredFalse);
	this.foods.forEach(fAddDeliveredFalse);
	
	this.currentNode = CustOpt.nodes[options.init];
	this.reallyCurrentNode = this.currentNode;
	this.dest = CustOpt.nodes[options.place.id];
	
	this.place = options.place.id;
	this.placeType = options.place.type;

	// if he is in the door, then he is in state = 0 else state = 8
	this.state = (this.currentNode.id === CustOpt.customerFinalPath[0].id?0:8);
	this.showCustomer = this.state !== 0;
	this.showDoor = !this.showCustomer;

	this.log = [];
	
	this.custHeight = 76;
	
	this.img = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 3,
		horzSeq: true,
		x: this.currentNode.x,
		y: this.currentNode.y - this.custHeight,
		width: 120,
		height: 77,
		sourceY: 0,
		img : PreloadImgs.get("$customer" +options.id),
    });
	
	if (this.state === 8)
		this.img.update();
	
	this.id = options.id;
	this.imgCustAnger = PreloadImgs.get("$customer" +options.id+ "_anger");
	
	this.door = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 4,
		horzSeq: false,
		x: 0,
		y: 0,
		width: 120,
		height: 480,
		img : PreloadImgs.get("doors")
	});
	
	this.coin = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 10,
		horzSeq: true,
		width: 440,
		height: 40,
		sourceY: 0,
		img : PreloadImgs.get("coin")
	});
	this.showCoin = false;
	
	this.fire = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 10,
		horzSeq: true,
		width: 160,
		height: 32,
		sourceY: 0,
		img : PreloadImgs.get("anger")
	});
	this.showFire = false;
	
	this.heart = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 5,
		horzSeq: true,
		width: 200,
		height: 40,
		sourceY: 0,
		img : PreloadImgs.get("heart")
	});
	this.showLove = false;
	
	this.openMission = options.openMission;
	this.idxPattern = options.idxPattern;
	this.baloonLeft = options.baloonLeft;
	
	this.amountPaid = 0;
	this.amountChangeReceived = 0;
	this.amountChangeExpected = 0;
	this.changeReceived = [];
	
	this.deliveredItems = [];
	/*
	if (this.randomType != null) // I transfered this task to customerman.js
		this.randomizeFoodAndDrink();
	 */
};

Customer.prototype.afterConstruct = function() {
	
	this.wishesDrinks = [];
	this.wishesDrinks = this.wishesDrinks.concat(this.drinks);
	
	this.wishesFoods = [];
	this.wishesFoods = this.wishesFoods.concat(this.foods);
	
};

Customer.prototype.randomizeFoodAndDrink = function() {

	// implementation for randomType = "atLeastOne"

	var which = (Math.floor(Math.random() * 100) % 3); // 0 - food, 1 - drink, 2 - both
	switch (which) {
	
		case 0 : this.drinks = []; break;
		case 1 : this.foods = []; break;
		// otherwise, both stays in the order 
	}
	
	
};

Customer.prototype.update = function() {

	switch (this.state) {
	
	// open the door 
	case 0: ;
	case 1: ;
	case 2: this.log.push(['UD']);
	case 3: break;
			
	
	// appear the customer 
	case 4: 
			this.log.push(['SC', true]);
			this.state = 50;
			return;
	
	// close the door
	case 50: ;
	case 51: ;
	case 52: this.log.push(['CD']);
 			 if (this.state == 52) {
				this.state = 5;
				return;
			 } 
		
		     break;
	// go to some place
	case 5: 
			this.log.push(['SD', false]);
			this.path = CustOpt.graph.findShortestPath(this.currentNode.id, this.dest.id);
			break;
			
	// moving to some place
	case 6: if (this.moveToSomePlace())
				return;
			else
				break;
			
	// turn to front
	case 7: this.log.push(['MF', this.currentNode.x, this.currentNode.y, this.currentNode.x, this.currentNode.y, this.currentNode.id]);
			break;
			
	// finish state: nothing to do on this moment
	case 8: 
		   if (this.drinks.length == this.dUnfulfilled && this.foods.length == this.fUnfulfilled && this.openMission)
			   this.state = 32;
		   
			return;
	
	case  9: ;
	case 10: ;
	case 11: ;
	case 12: ;
	case 13: ;
	case 14: ;
	case 15: ;
	case 16: ;
	case 17: ;
	case 18: ;
	case 19: ;
		     this.log.push(['UC', true]); // update coin
			 break;
			 
	case 20:
			this.log.push(['UC', false]); // hide the coin
			this.state = 8;
			return;
			
	case 21: ;
	case 22: ;
	case 23: ;
	case 24: ;
	case 25: ;
	case 26: ;
	case 27: ;
	case 28: ;
	case 29: ;
	
	case 30: this.log.push(['UF', true]); // update fire
			 break;
			
	case 31:
			 this.log.push(['UF', false]); // hide the fire
			 this.state = 8;
			 return;	
			 
	// go back to the door
	case 32:
		this.log.push(['SD', true]);
		this.path = CustOpt.graph.findShortestPath(this.dest.id, CustOpt.door);
		break;
	
	case 33: // go back to the door
		if (this.moveToSomePlace())
			return;
		else
			break;
		
		// open the door 
	case 34: ;
	case 35: ;
	case 36: this.log.push(['UD']);
			 break;
			
	// hide the customer
	case 37: this.log.push(['SC', false]);
			 this.log.push(['UD']);
			 this.log.push(['SD', false]);
			 break;

	
	case 38: 
		if (this.log.length == 0) {
			// only performs if there is not before animations
			CustomerManager.removeCustomer(this);
			if (this.openMission)
				CustomerManager.createCustomerByPattern(this.idxPattern, CustOpt.door);
			
		}
		return; // doesn't matter... this is the last state of the customer... it's his death

	case 39: ;
	case 41: ;
	case 42: ;
	case 43: ;
	case 44: ;
		this.log.push(['UH', true]); // update heart
		break;	
	
	case 45:
		this.log.push(['UH', false]); // hide heart
		break;	
		
	case 46:
		// think about the next state
		return;
	}
	this.state++;
};


Customer.prototype.moveToSomePlace = function() {
	
	var node = this.path.shift();
	if (node) {
		node = CustOpt.nodes[node];
		this.log.push(['MC', this.currentNode.x, this.currentNode.y, node.x, node.y, node.id]);
		this.currentNode = node;
		
		return true;
	}
	return false;
};

Customer.prototype.animate = function() {
	
	var tuple = this.log.shift();
	if (tuple) {
		
		var command = tuple.shift();
		
		switch (command) {
			case 'MF' :
				this.img.frameIndex = 0;
				
			case 'MC' : 
				this.changeCustomerPosition(tuple);
				break;
				
			case 'SC' :
				this.showCustomer = tuple.shift();
				break;
				
			case 'SD' :
				this.showDoor = tuple.shift();
				break;
				
			case 'CD':
				this.door.invert = true;
				this.door.update();
				break;
				
			case 'UD' :
				this.door.invert = false;
				this.door.update();
				break;

			case 'UC' :
				this.showCoin = tuple.shift();
				this.coin.update();
				break;

			case 'UF' :
				this.showFire = tuple.shift();
				this.fire.update();
				break;
				
			case 'UH' :
				this.showLove = tuple.shift();
				this.heart.update();
				break;
			
		}
		
	}
	
};

Customer.prototype.changeCustomerPosition = function(pos) {
	
	if (pos[2] < pos[0])
		this.img.sourceY = 80;
	else
		if (pos[2] > pos[0])
			this.img.sourceY = 160;
		else if (pos[3] < pos[1])
			    this.img.sourceY = 240;
			 else
				this.img.sourceY = 0;
	
	this.img.update();
	this.img.x = pos[2];
	this.img.y = pos[3] - this.custHeight;
	
	this.reallyCurrentNode = CustOpt.nodes[pos[4]];
};

Customer.prototype.draw = function(ctx) {
	
	if (this.showDoor) {
		this.door.draw(ctx);
	}
	
	if (this.showCustomer) {
		if (this.showFire) {
			ctx.drawImage(this.imgCustAnger, this.img.x, this.img.y);
		} else {
			this.img.draw(ctx);
			
			var ordersUnfulfilled = [];
			
			var withDoubt = (CustomerManager.randomization.length > 0)|| (this.hasRandom);
			
			var withouDoubt = (!withDoubt) || (Game.runningStatus !== 0) || (Game.victory);
			if (withouDoubt) {
				for (var i = 0;i < this.foods.length;i++) {
					if (!this.foods[i].delivered)
						ordersUnfulfilled.push(PreloadImgs.get('$' + this.foods[i].item));
				}
				
				for (var i = 0;i < this.drinks.length;i++) {
					if (!this.drinks[i].delivered)
						ordersUnfulfilled.push(PreloadImgs.get('$' + this.drinks[i].item));
				}
				
			} else
				ordersUnfulfilled.push(PreloadImgs.get("duvida"));
			
			if (ordersUnfulfilled.length > 0) {
				Baloon.draw(ctx, this.img.x, this.img.y+20, ordersUnfulfilled, this.baloonLeft);
			}
		}
	}
		
	if (this.showCoin) {
		this.coin.draw(ctx, 22, 20); 
	} else {
		if (this.showFire) {
			this.fire.draw(ctx);
		} else {
			if (this.showLove)
				this.heart.draw(ctx);
		}
	}
		
};

Customer.prototype.askWantHowManyFoods = function() {
	return this.wishesFoods.length;
};

Customer.prototype.askHowMuchInFoodsIfSell = function() {
	var ret = 0;
	for (var i = 0; i < this.wishesFoods.length; i++)
		ret += this.wishesFoods[i].price;
	
	return ret;
};

Customer.prototype.askWantHowManyDrinks = function() {
	return this.wishesDrinks.length;
};

Customer.prototype.askHowMuchInDrinksIfSell = function() {
	var ret = 0;
	for (var i = 0; i < this.wishesDrinks.length; i++)
		ret += this.wishesDrinks[i].price;
	
	return ret;
};

Customer.prototype.askForDrink = function() {
	if (this.dUnfulfilled >= this.drinks.length)
		return null;
	
	var d = null;
	for (var i=0; i<this.drinks.length; i++)
		if (!this.drinks[i].delivered) {
			d = this.drinks[i];
			break;
		}

	return {type: "order", descr:"$$" + d.item, drinkOrFood: "drink", source: this.currentNode.id, sourceType: this.placeType};
};

Customer.prototype.hasThirsty = function() {
	return (this.dUnfulfilled < this.drinks.length);
};

Customer.prototype.askForFood = function() {
	if (this.fUnfulfilled >= this.foods.length)
		return null;
	
	var d = null;
	for (var i=0; i<this.foods.length; i++)
		if (!this.foods[i].delivered) {
			d = this.foods[i];
			break;
		}

	return {type: "order", descr:"$$" + d.item, drinkOrFood: "food", source: this.currentNode.id, sourceType: this.placeType};
};

Customer.prototype.hasHunger = function() {
	return (this.fUnfulfilled < this.foods.length);
};

Customer.prototype.askForIceCream = function() {
	if (this.fUnfulfilled >= this.foods.length)
		return null;
	
	
	for (var i = this.fUnfulfilled; i < this.foods.length; i++) {
		var d = this.foods[i];
		if (d.item.indexOf("icecreamof") == 0) {
			
			return {type: "order", descr:"$$" + d.item, drinkOrFood: "food", source: this.currentNode.id, sourceType: this.placeType};
		}
	}
	
	return null;
};

Customer.prototype.askWantHowManyIceCream = function() {
	var c = 0;
	for (var i=0; i<this.wishesFoods.length; i++)
		if (this.wishesFoods[i].item.indexOf("icecreamof") === 0)
			c++;
	return c;
};

Customer.DELIVERED_BAD = 0;
Customer.DELIVERED_PARTIAL = 1;
Customer.DELIVERED_TOTAL = 2; 

Customer.DELIVERED_THANK_YOU = 4;

Customer.prototype.deliver = function(item) {
	
	// item is the "delivered item"

	var money = 0;
	var happy = Customer.DELIVERED_BAD;
	var reason = null;
	
	if (item.source == null) { // it is a gift
		
		happy = Customer.DELIVERED_THANK_YOU;
		this.showLove = true;
		this.heart.x = this.img.x+5;
		this.heart.y = this.img.y-20;
		
		this.state = 39;
		
	} else {
		
		if  ((item.type === "item") &&
			    ((item.drinkOrFood === "drink" && (this.dUnfulfilled < this.drinks.length)) ||
					(item.drinkOrFood === "food" && (this.fUnfulfilled < this.foods.length)))) {
				
				if (item.source === this.currentNode.id) {

					var d = null;
					var l = (item.drinkOrFood === "drink"?this.drinks:this.foods);
					for (var i=0; i<l.length; i++)
						if (l[i].delivered == false && item.descr === "$$" + l[i].item) {
							d = l[i];
							break;
						}
							
					if (d != null) {
						
						if (item.drinkOrFood === "drink")
							this.dUnfulfilled++;
						else
							this.fUnfulfilled++;
						
						d.delivered = true;
						
						happy = ((this.dUnfulfilled == this.drinks.length) && (this.fUnfulfilled == this.foods.length)?Customer.DELIVERED_TOTAL:Customer.DELIVERED_PARTIAL);
					} else {
						reason = "Error_deliveredWrongRequest"; 	
					}
					
				} else {
					reason = "Error_doesntMatchPosition";
				}
				
			} else {
				reason = "Error_deliveredWrongRequest";
			}
			
		if (happy ===  Customer.DELIVERED_TOTAL) {
			
			var fConta = function(entry) {
				
				money += entry.price;

			};
			
			this.foods.forEach(fConta);
			this.drinks.forEach(fConta);
			
			this.showCoin = true;
			this.coin.x = this.img.x+5;
			this.coin.y = this.img.y-20;
			this.state = 9;
			
		} else 
			if (happy == Customer.DELIVERED_BAD){
				
				this.showFire = true;
				this.fire.x = this.img.x+8;
				this.fire.y = this.img.y-32;
				this.state = 21;
				
			} 
		
	}
	
	if (happy != Customer.DELIVERED_BAD)
		this.deliveredItems.push(item); // i dont know how it is possible this situation : (item.descr == undefined?item:item.descr));
	
	return {money: money, happy: happy, reason: reason};
};

Customer.prototype.totalOfFoodDelivered = function() {
	return this.fUnfulfilled;
};

Customer.prototype.totalOfDrinksDelivered = function() {
	return this.dUnfulfilled;
};

Customer.prototype.qtdDeliveredOf = function(key) {
	var t = 0;
	this.deliveredItems.forEach(function(delivered) {
		if (delivered.descr.indexOf(key) == 0)
			t++;
	});
	return t;
};

Customer.prototype.hasReceivedGift = function(gift) {
	
	for (var i = 0; i < this.deliveredItems.length; i++)
		if (this.deliveredItems[i].source == null && this.deliveredItems[i].descr === gift)
			return true;
	
	return false;
};

Customer.prototype.hasReceivedItem = function(foodOrDrink, itemId) {
	if (foodOrDrink == null || foodOrDrink === "food") {
		for (var i = 0; i < this.foods.length; i++)
			if (this.foods[i].delivered && this.foods[i].item == itemId)
				return true;
	}
	
	if (foodOrDrink == null || foodOrDrink === "drink") {
		for (var i = 0; i < this.drinks.length; i++)
			if (this.drinks[i].delivered && this.drinks[i].item == itemId)
				return true;
	}
	
	return false;
};

Customer.typesOfMoney = [10, 20];

Customer.prototype.cashIn = function(value) {
	
	var amountPayable = this.askHowMuchInDrinksIfSell() + this.askHowMuchInFoodsIfSell();
	
	// the customer has already paid
	if (this.amountPaid != 0) {
		BlocklyApps.log.push(["fail", "Error_alreadyPaid"]);
		throw false;
	}
	
	// Both values are not the same
	if (amountPayable != value) {
		BlocklyApps.log.push(["fail", "Error_incorrectAccount"]);
		throw false;
	}
	
	if (this.pay == null) {
		
		var selectMoney = [].concat(Customer.typesOfMoney);
		if (amountPayable > 10)
			selectMoney.splice(0, 1);
		
		var idx = Math.floor(Math.random() * selectMoney.length);
		this.amountPaid = selectMoney[idx];
	} else
		this.amountPaid = parseInt(this.pay);
	
	this.amountChangeExpected = this.amountPaid - amountPayable;
	
	return {type: "money", descr:"$$banknote" + this.amountPaid, value:this.amountPaid, source: this.currentNode.id, sourceType: this.placeType};
};

Customer.prototype.isPaid = function() {
	return this.amountPaid > 0;
};

Customer.prototype.isChangeReceived = function() {
	return this.amountChangeExpected == this.amountChangeReceived;
};

Customer.prototype.isTheBestChange = function() {
	
	var v = this.amountChangeExpected;
	var keys = this.limitedChanges;
	for (var k = 0; k < keys.length; k++) {
		
		var keyType = keys[k];
		var n = Math.floor(v / keyType);
		
		var foundType = null;
		
		var f = function(entry) {
			if (entry.type == keyType)
				foundType = entry.qtd;
		};
		
		this.changeReceived.forEach(f);
		var mistake = !(n == 0 || (foundType != null && foundType == n));
		if (mistake) return false;
		v -= (n * keyType);
	}
		
	return true;
	
};

Customer.prototype.receivedChange = function(type, qtd) {
	var sum = 0;
	type = this.convertMoney(type);
	
	this.changeReceived.forEach(function(item){
		if (item.type === type)
			sum += item.qtd;
	});
	
	return (qtd == sum);
};

Customer.prototype.convertMoney = function(type) {

	var tm = "";
	switch (type) {
		case "\"$$$money20\"": tm = 20; break;
		case "\"$$$money10\"": tm = 10; break;
		case "\"$$$money5\"": tm = 5; break;
		case "\"$$$money2\"": tm = 2; break;
		case "\"$$$money1\"": tm = 1; break;
	}
	
	return tm;
};

Customer.prototype.giveChange = function(value, typeOfMoney) {
	
	if (value === undefined || value.data === undefined || isNaN(value.data)) {
		BlocklyApps.log.push(["fail", "Error_qtyOfMoneyInvalid"]); // primeiro parametro deveria ser um numero
		throw false;
	}
	
	value = parseInt(value.data);
	
	var tm = 0;
	
	if (typeOfMoney != undefined && typeOfMoney.data != undefined) {
		tm = this.convertMoney(typeOfMoney.data);
	}
	
	if (tm == 0) {
		BlocklyApps.log.push(["fail", "Error_typeOfMoneyInvalid"]); // segundo parametro deveria ser do tipo nota ou moeda
		throw false;
	}
	
	var totalChange = tm * value;
	
	if (this.amountChangeReceived + totalChange > this.amountChangeExpected) {
		BlocklyApps.log.push(["fail", "Error_changeExceeded"]); 
		throw false;
	}
	
	this.amountChangeReceived += totalChange;
	this.changeReceived.push({qtd:value, type: tm});
	
	return this.amountChangeExpected == this.amountChangeReceived;
};