/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://meteoricsnackbar.googlecode.com/
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
CustOpt.path = {n2:{n1:1, n3:1}, n3:{n2:1, n4:1}, n4:{n3:1, n5:1}, n5:{n4:1, n6:1}, n6:{n5:1, n7:1}, n7:{n6:1, n8:1}, n8:{n7:1, n9:1}, n9:{n8:1, n10:1}, n10:{n9:1, n11:1}, n11:{n10:1, n12:1}, n12:{n11:1, n13:1}, n13:{n12:1, n14:1}, n14:{n13:1, n15:1}, n15:{n14:1, n16:1}, n16:{n15:1, n17:1}, n17:{n16:1, n18:1}, n18:{n17:1, n19:1}, n19:{n18:1, n20:1}, n20:{n19:1, n21:1}, n21:{n20:1, n22:1}, n22:{n21:1, n23:1}, n23:{n22:1, n24:1}, n24:{n23:1, n25:1}, n25:{n24:1, n26:1}, n26:{n25:1, n27:1}, n27:{n26:1, n28:1}, n28:{n27:1, n29:1}, n29:{n28:1, n30:1}, n30:{n29:1, n31:1}, n31:{n30:1, n32:1}, n32:{n31:1, n33:1}, n33:{n32:1, n34:1}, n34:{n33:1, n35:1}, n35:{n34:1, n36:1}, n36:{n35:1, n37:1}, n37:{n36:1, n38:1}, n38:{n37:1, n39:1}, n39:{n38:1, n40:1}, n40:{n39:1, n41:1}, n41:{n40:1, n42:1}, n42:{n41:1, n43:1}, n1:{n2:1}, n43:{n42:1} };
CustOpt.nodes = {n1:{id: 'n1', x:14, y: 96}, n2:{id: 'n2', x:14, y: 102}, n3:{id: 'n3', x:14, y: 108}, n4:{id: 'n4', x:14, y: 114}, n5:{id: 'n5', x:14, y: 120}, n6:{id: 'n6', x:14, y: 126}, n7:{id: 'n7', x:14, y: 132}, n8:{id: 'n8', x:14, y: 138}, n9:{id: 'n9', x:14, y: 144}, n10:{id: 'n10', x:14, y: 150}, n11:{id: 'n11', x:14, y: 156}, n12:{id: 'n12', x:14, y: 162}, n13:{id: 'n13', x:14, y: 168}, n14:{id: 'n14', x:14, y: 174}, n15:{id: 'n15', x:14, y: 180}, n16:{id: 'n16', x:14, y: 186}, n17:{id: 'n17', x:14, y: 192}, n18:{id: 'n18', x:14, y: 198}, n19:{id: 'n19', x:14, y: 204}, n20:{id: 'n20', x:14, y: 210}, n21:{id: 'n21', x:14, y: 216}, n22:{id: 'n22', x:14, y: 222}, n23:{id: 'n23', x:14, y: 228}, n24:{id: 'n24', x:14, y: 234}, n25:{id: 'n25', x:14, y: 240}, n26:{id: 'n26', x:14, y: 246}, n27:{id: 'n27', x:14, y: 252}, n28:{id: 'n28', x:14, y: 258}, n29:{id: 'n29', x:14, y: 264}, n30:{id: 'n30', x:14, y: 270}, n31:{id: 'n31', x:14, y: 276}, n32:{id: 'n32', x:14, y: 282}, n33:{id: 'n33', x:14, y: 288}, n34:{id: 'n34', x:17, y: 290}, n35:{id: 'n35', x:20, y: 290}, n36:{id: 'n36', x:23, y: 290}, n37:{id: 'n37', x:26, y: 290}, n38:{id: 'n38', x:29, y: 290}, n39:{id: 'n39', x:32, y: 290}, n40:{id: 'n40', x:35, y: 290}, n41:{id: 'n41', x:38, y: 290}, n42:{id: 'n42', x:41, y: 290}, n43:{id: 'n43', x:44, y: 290} };
CustOpt.keynodes = ['n1', 'n43' ];

CustOpt.counter = ['n43', 'xxx', 'yyy', 'zzz'];

CustOpt.customerFinalPath = new Array();

// acts as a state machine
CustOpt.createCustomerPath = function() {
	for (var key = 0; key < CustOpt.keynodes.length; key++)
		CustOpt.customerFinalPath[key] = CustOpt.nodes[CustOpt.keynodes[key]];
	
	CustOpt.graph = new Graph(CustOpt.path);
	
};

CustOpt.createCustomerPath();

var Customer = {};

Customer = function(options) {
	this.currentNode = CustOpt.customerFinalPath[0];
	this.dest = CustOpt.nodes[options.place];
	
	this.place = options.place;
	this.showCustomer = false;
	this.showDoor = true;
	this.state = 0;
	
	this.log = [];
	this.x = 0;
	this.y = 0;
	
	this.img = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 3,
		horzSeq: true,
		x: 14,
		y: 64,
		width: 96,
		height: 32,
		sourceY: 0,
		imgSrc : "images/$customer" +options.id+ ".png"
    });
	
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
			
	// finish state: nothing to do on this moment
	case 7: return;
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
	
	if (this.showDoor) 	this.door.draw(ctx);
	
	if (this.showCustomer) {
		this.img.draw(ctx);
	}
		
};

Customer.prototype.askForDrink = function() {
	return {qt:1, type: "drink", descr:"$$coke"};
};
