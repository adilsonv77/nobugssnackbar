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
CustOpt.path = {n2:{n1:1, n3:1}, n3:{n2:1, n4:1}, n4:{n3:1, n5:1}, n5:{n4:1, n6:1}, n6:{n5:1, n7:1}, n7:{n6:1, n8:1}, n8:{n7:1, n9:1}, n9:{n8:1, n10:1}, n10:{n9:1, n11:1}, n11:{n10:1, n12:1}, n12:{n11:1, n13:1}, n13:{n12:1, n14:1}, n14:{n13:1, n15:1}, n15:{n14:1, n16:1}, n16:{n15:1, n17:1}, n17:{n16:1, n18:1}, n18:{n17:1, n19:1}, n19:{n18:1, n20:1}, n20:{n19:1, n21:1}, n21:{n20:1, n22:1}, n22:{n21:1, n23:1}, n23:{n22:1, n24:1}, n24:{n23:1, n25:1}, n25:{n24:1, n26:1}, n26:{n25:1, n27:1}, n27:{n26:1, n28:1}, n28:{n27:1, n29:1}, n29:{n28:1, n30:1}, n30:{n29:1, n31:1}, n31:{n30:1, n32:1}, n32:{n31:1, n33:1}, n34:{n33:1, n35:1}, n35:{n34:1, n36:1}, n36:{n35:1, n37:1}, n37:{n36:1, n38:1}, n38:{n37:1, n39:1}, n39:{n38:1, n40:1}, n40:{n39:1, n41:1}, n41:{n40:1, n42:1}, n42:{n41:1, n43:1}, n33:{n32:1, n34:1, n44:1}, n44:{n33:1, n45:1}, n45:{n44:1, n46:1}, n46:{n45:1, n47:1}, n47:{n46:1, n48:1}, n48:{n47:1, n49:1}, n49:{n48:1, n50:1}, n50:{n49:1, n51:1}, n51:{n50:1, n52:1}, n52:{n51:1, n53:1}, n54:{n53:1, n55:1}, n55:{n54:1, n56:1}, n56:{n55:1, n57:1}, n57:{n56:1, n58:1}, n58:{n57:1, n59:1}, n59:{n58:1, n60:1}, n60:{n59:1, n61:1}, n61:{n60:1, n62:1}, n62:{n61:1, n63:1}, n53:{n52:1, n54:1, n64:1}, n64:{n53:1, n65:1}, n65:{n64:1, n66:1}, n66:{n65:1, n67:1}, n67:{n66:1, n68:1}, n68:{n67:1, n69:1}, n69:{n68:1, n70:1}, n70:{n69:1, n71:1}, n71:{n70:1, n72:1}, n72:{n71:1, n73:1}, n74:{n73:1, n75:1}, n75:{n74:1, n76:1}, n76:{n75:1, n77:1}, n77:{n76:1, n78:1}, n78:{n77:1, n79:1}, n79:{n78:1, n80:1}, n80:{n79:1, n81:1}, n81:{n80:1, n82:1}, n82:{n81:1, n83:1}, n73:{n72:1, n74:1, n84:1}, n84:{n73:1, n85:1}, n85:{n84:1, n86:1}, n86:{n85:1, n87:1}, n87:{n86:1, n88:1}, n88:{n87:1, n89:1}, n89:{n88:1, n90:1}, n90:{n89:1, n91:1}, n91:{n90:1, n92:1}, n92:{n91:1, n93:1}, n94:{n93:1, n95:1}, n95:{n94:1, n96:1}, n96:{n95:1, n97:1}, n97:{n96:1, n98:1}, n98:{n97:1, n99:1}, n99:{n98:1, n100:1}, n100:{n99:1, n101:1}, n101:{n100:1, n102:1}, n102:{n101:1, n103:1}, n93:{n92:1, n94:1}, n1:{n2:1}, n43:{n42:1}, n63:{n62:1}, n83:{n82:1}, n103:{n102:1} };
CustOpt.nodes = {n1:{id: 'n1', x:14, y: 96}, n2:{id: 'n2', x:14, y: 102}, n3:{id: 'n3', x:14, y: 108}, n4:{id: 'n4', x:14, y: 114}, n5:{id: 'n5', x:14, y: 120}, n6:{id: 'n6', x:14, y: 126}, n7:{id: 'n7', x:14, y: 132}, n8:{id: 'n8', x:14, y: 138}, n9:{id: 'n9', x:14, y: 144}, n10:{id: 'n10', x:14, y: 150}, n11:{id: 'n11', x:14, y: 156}, n12:{id: 'n12', x:14, y: 162}, n13:{id: 'n13', x:14, y: 168}, n14:{id: 'n14', x:14, y: 174}, n15:{id: 'n15', x:14, y: 180}, n16:{id: 'n16', x:14, y: 186}, n17:{id: 'n17', x:14, y: 192}, n18:{id: 'n18', x:14, y: 198}, n19:{id: 'n19', x:14, y: 204}, n20:{id: 'n20', x:14, y: 210}, n21:{id: 'n21', x:14, y: 216}, n22:{id: 'n22', x:14, y: 222}, n23:{id: 'n23', x:14, y: 228}, n24:{id: 'n24', x:14, y: 234}, n25:{id: 'n25', x:14, y: 240}, n26:{id: 'n26', x:14, y: 246}, n27:{id: 'n27', x:14, y: 252}, n28:{id: 'n28', x:14, y: 258}, n29:{id: 'n29', x:14, y: 264}, n30:{id: 'n30', x:14, y: 270}, n31:{id: 'n31', x:14, y: 276}, n32:{id: 'n32', x:14, y: 282}, n33:{id: 'n33', x:14, y: 288}, n34:{id: 'n34', x:17, y: 290}, n35:{id: 'n35', x:20, y: 290}, n36:{id: 'n36', x:23, y: 290}, n37:{id: 'n37', x:26, y: 290}, n38:{id: 'n38', x:29, y: 290}, n39:{id: 'n39', x:32, y: 290}, n40:{id: 'n40', x:35, y: 290}, n41:{id: 'n41', x:38, y: 290}, n42:{id: 'n42', x:41, y: 290}, n43:{id: 'n43', x:44, y: 290}, n44:{id: 'n44', x:14, y: 294}, n45:{id: 'n45', x:14, y: 298}, n46:{id: 'n46', x:14, y: 302}, n47:{id: 'n47', x:14, y: 306}, n48:{id: 'n48', x:14, y: 310}, n49:{id: 'n49', x:14, y: 314}, n50:{id: 'n50', x:14, y: 318}, n51:{id: 'n51', x:14, y: 322}, n52:{id: 'n52', x:14, y: 326}, n53:{id: 'n53', x:14, y: 330}, n54:{id: 'n54', x:17, y: 330}, n55:{id: 'n55', x:20, y: 330}, n56:{id: 'n56', x:23, y: 330}, n57:{id: 'n57', x:26, y: 330}, n58:{id: 'n58', x:29, y: 330}, n59:{id: 'n59', x:32, y: 330}, n60:{id: 'n60', x:35, y: 330}, n61:{id: 'n61', x:38, y: 330}, n62:{id: 'n62', x:41, y: 330}, n63:{id: 'n63', x:44, y: 330}, n64:{id: 'n64', x:14, y: 334}, n65:{id: 'n65', x:14, y: 338}, n66:{id: 'n66', x:14, y: 342}, n67:{id: 'n67', x:14, y: 346}, n68:{id: 'n68', x:14, y: 350}, n69:{id: 'n69', x:14, y: 354}, n70:{id: 'n70', x:14, y: 358}, n71:{id: 'n71', x:14, y: 362}, n72:{id: 'n72', x:14, y: 366}, n73:{id: 'n73', x:14, y: 370}, n74:{id: 'n74', x:17, y: 370}, n75:{id: 'n75', x:20, y: 370}, n76:{id: 'n76', x:23, y: 370}, n77:{id: 'n77', x:26, y: 370}, n78:{id: 'n78', x:29, y: 370}, n79:{id: 'n79', x:32, y: 370}, n80:{id: 'n80', x:35, y: 370}, n81:{id: 'n81', x:38, y: 370}, n82:{id: 'n82', x:41, y: 370}, n83:{id: 'n83', x:44, y: 370}, n84:{id: 'n84', x:14, y: 374}, n85:{id: 'n85', x:14, y: 378}, n86:{id: 'n86', x:14, y: 382}, n87:{id: 'n87', x:14, y: 386}, n88:{id: 'n88', x:14, y: 390}, n89:{id: 'n89', x:14, y: 394}, n90:{id: 'n90', x:14, y: 398}, n91:{id: 'n91', x:14, y: 402}, n92:{id: 'n92', x:14, y: 406}, n93:{id: 'n93', x:14, y: 410}, n94:{id: 'n94', x:17, y: 410}, n95:{id: 'n95', x:20, y: 410}, n96:{id: 'n96', x:23, y: 410}, n97:{id: 'n97', x:26, y: 410}, n98:{id: 'n98', x:29, y: 410}, n99:{id: 'n99', x:32, y: 410}, n100:{id: 'n100', x:35, y: 410}, n101:{id: 'n101', x:38, y: 410}, n102:{id: 'n102', x:41, y: 410}, n103:{id: 'n103', x:44, y: 410} };
CustOpt.keynodes = ['n1', 'n43', 'n63', 'n83', 'n103' ];

CustOpt.counter = ['n43', 'n63', 'n83', 'n103'];
CustOpt.door = 'n1';

CustOpt.customerFinalPath = new Array();

Game.preloadImgs.push('images/$customer01.png');
Game.preloadImgs.push('images/$customer01_anger.png');
Game.preloadImgs.push('images/$customer02.png');
Game.preloadImgs.push('images/$customer02_anger.png');
Game.preloadImgs.push('images/$customer03.png');
Game.preloadImgs.push('images/$customer03_anger.png');
Game.preloadImgs.push('images/$customer04.png');
Game.preloadImgs.push('images/$customer04_anger.png');
Game.preloadImgs.push('images/coin.png');
Game.preloadImgs.push('images/anger.png');


// acts as a state machine
CustOpt.createCustomerPath = function() {
	for (var key = 0; key < CustOpt.keynodes.length; key++)
		CustOpt.customerFinalPath[key] = CustOpt.nodes[CustOpt.keynodes[key]];
	
	CustOpt.graph = new Graph(CustOpt.path);
	
};

CustOpt.createCustomerPath();

var Customer = {};

Customer = function(options) {
	
	this.drinks = options.drinks;
	this.dUnfulfilled = 0;
	
	this.foods = options.foods;
	this.fUnfulfilled = 0;
	
	this.currentNode = CustOpt.nodes[options.init];
	this.dest = CustOpt.nodes[options.place];
	
	this.place = options.place;

	// if he is in the door, then he is in state = 0 else state = 8
	this.state = (this.currentNode.id === CustOpt.customerFinalPath[0].id?0:8);
	this.showCustomer = this.state !== 0;
	this.showDoor = !this.showCustomer;

	this.log = [];
	
	this.img = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 3,
		horzSeq: true,
		x: this.currentNode.x,
		y: this.currentNode.y - 32,
		width: 96,
		height: 32,
		sourceY: 0,
		imgSrc : "images/$customer" +options.id+ ".png"
    });
	
	if (this.state === 8)
		this.img.update();
	
	this.imgCustAnger = new Image();
	this.imgCustAnger.src = "images/$customer" +options.id+ "_anger.png";
	
	this.door = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 4,
		horzSeq: false,
		x: 0,
		y: 32,
		width: 64,
		height: 256,
		imgSrc : "images/doors.png"
	});
	
	this.coin = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 10,
		horzSeq: true,
		width: 440,
		height: 40,
		sourceY: 0,
		imgSrc : "images/coin.png"
	});
	this.showCoin = false;
	
	this.fire = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 10,
		horzSeq: true,
		width: 160,
		height: 32,
		sourceY: 0,
		imgSrc : "images/anger.png"
	});
	this.showFire = false;

};

Customer.prototype.update = function() {

	switch (this.state) {
	
	// open the door 
	case 0: ;
	case 1: ;
	case 2: ;
	case 3: this.log.push(['UD']);
			break;
	
	// appear the customer 
	case 4: 
			this.log.push(['SC', true]);
			break;
	
	// go to some place
	case 5: 
			this.log.push(['SD', false]);
			this.path = CustOpt.graph.findShortestPath(this.currentNode.id, this.dest.id);
			break;
			
	// moving to some place
	case 6: var node = this.path.shift();
			if (node) {
				node = CustOpt.nodes[node];
				this.log.push(['MC', this.currentNode.x, this.currentNode.y, node.x, node.y]);
				this.currentNode = node;
				
				return;
			}
			break;
			
	// turn to front
	case 7: this.log.push(['MC', this.currentNode.x, this.currentNode.y, this.currentNode.x, this.currentNode.y]);
			break;
			
	// finish state: nothing to do on this moment
	case 8: return;
	
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
			 this.log.push(['UF', false]); // hide the coin
			 this.state = 8;
			 return;			 
	}

	this.state++;
};

Customer.prototype.animate = function() {
	
	var tuple = this.log.shift();
	if (tuple) {
		
		var command = tuple.shift();
		
		switch (command) {
			case 'MC' : 
				this.changeCustomerPosition(tuple);
				break;
				
			case 'SC' :
				this.showCustomer = tuple.shift();
				break;
				
			case 'SD' :
				this.showDoor = tuple.shift();
				break;
				
			case 'UD' :
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
		}
		
	}
	
};

Customer.prototype.changeCustomerPosition = function(pos) {
	
	if (pos[2] < pos[0])
		this.img.sourceY = 32;
	else
		if (pos[2] > pos[0])
			this.img.sourceY = 64;
		else if (pos[3] < pos[1])
			    this.img.sourceY = 128;
			 else
				this.img.sourceY = 0;
	
	this.img.update();
	this.img.x = pos[2];
	this.img.y = pos[3] - 32;
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
		}
	}
		
	if (this.showCoin) {
		this.coin.draw(ctx, 22, 20); 
	} else {
		if (this.showFire) {
			this.fire.draw(ctx);
		}
	}
		
};

Customer.prototype.askForDrink = function() {
	if (this.dUnfulfilled >= this.drinks.length)
		return null;
	
	var d = this.drinks[this.dUnfulfilled];
	return {type: "order", descr:"$$" + d.item, drinkOrFood: "drink"};
};

Customer.prototype.hasThirsty = function() {
	return (this.dUnfulfilled < this.drinks.length);
};

Customer.prototype.askForFood = function() {
	if (this.fUnfulfilled >= this.foods.length)
		return null;
	
	var d = this.foods[this.fUnfulfilled];
	return {type: "order", descr:"$$" + d.item, drinkOrFood: "food"};
};

Customer.prototype.hasHunger = function() {
	return (this.fUnfulfilled < this.foods.length);
};


Customer.prototype.deliver = function(item) {
	
	// item is the "delivered item"
	
	var happy = false;
	var money = 0;
	
	if  ((item.type === "item") &&
	    ((item.drinkOrFood === "drink" && (this.dUnfulfilled < this.drinks.length)) ||
			(item.drinkOrFood === "food" && (this.fUnfulfilled < this.foods.length)))) {
		
		var d = (item.drinkOrFood === "drink"?this.drinks[this.dUnfulfilled]:this.foods[this.fUnfulfilled]);
		// d is the "ordered item"
		
		happy = (item.descr === "$$" + d.item);
		if (happy) {
			
			if (item.drinkOrFood === "drink")
				this.dUnfulfilled++;
			else
				this.fUnfulfilled++;
			
			money = d.price;
		}
	}
	
	if (happy) {
		
		this.showCoin = true;
		this.coin.x = this.img.x+5;
		this.coin.y = this.img.y-20;
		this.state = 9;
		
	} else {
		
		this.showFire = true;
		this.fire.x = this.img.x+8;
		this.fire.y = this.img.y-32;
		this.state = 21;
		
	}
	
	return money;
};
