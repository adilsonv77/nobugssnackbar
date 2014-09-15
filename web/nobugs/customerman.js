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
 * @fileoverview Customer life's management.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

var CustomerManager = {};
var customers = [];

Game.preloadImgs.push('images/banco.png');

CustomerManager.init = function(customers) {
	
    this.banco = new Image();
	this.banco.src = 'images/banco.png';

	this.optCustomers = customers;
};

CustomerManager.reset = function() {
	customers = [];
	
	for (var i = 0; i < this.optCustomers.children.length; i++) {
		var init = this.optCustomers.children[i].getElementsByTagName("init")[0].textContent.toString();
		if (init === "door") {
			init = CustOpt.door;
		} else {
			if (init.indexOf("counter") == 0) {
				init = CustOpt.counter[parseInt(init.substring(7)) - 1];
			}
		}
		var dest = this.optCustomers.children[i].getElementsByTagName("dest")[0];
		if (dest != null) {
			dest = dest.textContent.toString();
			if (dest.indexOf("counter") == 0) {
				dest = CustOpt.counter[parseInt(dest.substring(7)) - 1];
			}
		}
			
		var id = this.optCustomers.children[i].getElementsByTagName("id")[0].textContent.toString();
		
		var foods = CustomerManager.extractItems(this.optCustomers.children[i].getElementsByTagName("foods")[0]);
		var drinks =  CustomerManager.extractItems(this.optCustomers.children[i].getElementsByTagName("drinks")[0]);
		customers[i] = new Customer({init: init, place: dest, id: id, foods: foods, drinks: drinks});
		
	}
};

CustomerManager.extractItems = function(list) {
	
	var items = [];
	for (var j=0; j < list.children.length; j++) {
		var item = list.children[j];
		var theItem = item.childNodes[0].nodeValue;
		var theQtd = item.getAttribute("qt");
		var thePrice = item.getAttribute("price");
		items.push({item: theItem, qt: theQtd, price: thePrice});
	} 
	
	return items;
	
};

CustomerManager.update = function() {
	for (var i = 0; i < customers.length; i++)
		customers[i].update();
	
};

CustomerManager.animation = function() {
	
	for (var i = 0; i < customers.length; i++)
		customers[i].animate();
	
};

CustomerManager.draw = function(ctx) {
	
	var counters = [true, true, true, true];
	
	for (var i=0; i<customers.length; i++) {
		customers[i].draw(ctx);
		var nId = customers[i].currentNode.id;
		for (var j=0; j<CustOpt.counter.length; j++) {
			if (nId === CustOpt.counter[j]) {
				counters[j] = false;
				break;
			}
		}
		
	}
	
	CustomerManager.drawCounters(ctx, counters);
	
};

CustomerManager.drawCounters = function(ctx, counters) {
	
	for (var i= 0; i < counters.length; i++) {
		if (counters[i]) {
			var n = CustOpt.nodes[CustOpt.counter[i]];
			ctx.drawImage(this.banco, n.x, n.y-32);
		}
	}
	
};

CustomerManager.getCustomerCounter = function(id) {
	
	id = id - 1;
	
	for (var i=0; i<customers.length; i++)
	  if (customers[i].currentNode.id === CustOpt.counter[id])
		return customers[i];
	
	return null;
};

