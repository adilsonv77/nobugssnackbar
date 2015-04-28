/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://github.com/adilsonv77/nobugssnackbar/
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
 * @fileoverview Cooker 'intelligence'.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';

var SnackMan = {};

PreloadImgs.put('$cooker', 'images/$cooker.png');
PreloadImgs.put('$cooker_platter', 'images/$cooker_platter.png');
PreloadImgs.put('cooler', 'images/cooler.png');
PreloadImgs.put('display', 'images/display.png');
PreloadImgs.put('boxoffruits', 'images/boxoffruits.png');
PreloadImgs.put('juicemachine', 'images/juicemachine.png');

SnackMan = function(objectives, mission) {
	var position = mission.childNodes[0].getElementsByTagName("cooker")[0].childNodes[0].nodeValue;
	
	this.path = {n2:{n1:1, n3:1}, n3:{n2:1, n4:1}, n4:{n3:1, n5:1}, n5:{n4:1, n6:1}, n6:{n5:1, n7:1}, n7:{n6:1, n8:1}, n8:{n7:1, n9:1}, n9:{n8:1, n10:1}, n10:{n9:1, n11:1}, n12:{n11:1, n13:1}, n13:{n12:1, n14:1}, n14:{n13:1, n15:1}, n15:{n14:1, n16:1}, n16:{n15:1, n17:1}, n17:{n16:1, n18:1}, n18:{n17:1, n19:1}, n19:{n18:1, n20:1}, n20:{n19:1, n21:1}, n22:{n21:0.5, n23:0.5}, n23:{n22:0.5, n24:0.5}, n24:{n23:0.5, n25:0.5}, n25:{n24:0.5, n26:0.5}, n26:{n25:0.5, n27:0.5}, n27:{n26:0.5, n28:0.5}, n28:{n27:0.5, n29:0.5}, n29:{n28:0.5, n30:0.5}, n30:{n29:0.5, n31:0.5}, n32:{n31:1, n33:1}, n33:{n32:1, n34:1}, n34:{n33:1, n35:1}, n35:{n34:1, n36:1}, n36:{n35:1, n37:1}, n37:{n36:1, n38:1}, n38:{n37:1, n39:1}, n39:{n38:1, n40:1}, n40:{n39:1, n11:1}, n41:{n31:0.5, n42:0.5}, n42:{n41:0.5, n43:0.5}, n43:{n42:0.5, n44:0.5}, n44:{n43:0.5, n45:0.5}, n45:{n44:0.5, n46:0.5}, n46:{n45:0.5, n47:0.5}, n47:{n46:0.5, n48:0.5}, n48:{n47:0.5, n49:0.5}, n49:{n48:0.5, n50:0.5}, n50:{n49:0.5, n51:0.5}, n51:{n50:0.5, n52:0.5}, n52:{n51:0.5, n53:0.5}, n53:{n52:0.5, n54:0.5}, n54:{n53:0.5, n55:0.5}, n55:{n54:0.5, n56:0.5}, n56:{n55:0.5, n57:0.5}, n57:{n56:0.5, n58:0.5}, n58:{n57:0.5, n59:0.5}, n59:{n58:0.5, n1:0.5}, n60:{n1:1, n61:1}, n61:{n60:1, n62:1}, n62:{n61:1, n63:1}, n63:{n62:1, n64:1}, n64:{n63:1, n65:1}, n65:{n64:1, n66:1}, n66:{n65:1, n67:1}, n67:{n66:1, n68:1}, n68:{n67:1, n69:1}, n70:{n31:0.5, n71:0.5}, n71:{n70:0.5, n72:0.5}, n72:{n71:0.5, n73:0.5}, n73:{n72:0.5, n74:0.5}, n74:{n73:0.5, n75:0.5}, n75:{n74:0.5, n76:0.5}, n76:{n75:0.5, n77:0.5}, n77:{n76:0.5, n78:0.5}, n78:{n77:0.5, n79:0.5}, n80:{n79:0.5, n81:0.5}, n81:{n80:0.5, n82:0.5}, n82:{n81:0.5, n83:0.5}, n83:{n82:0.5, n84:0.5}, n84:{n83:0.5, n85:0.5}, n85:{n84:0.5, n86:0.5}, n86:{n85:0.5, n87:0.5}, n87:{n86:0.5, n88:0.5}, n88:{n87:0.5, n89:0.5}, n90:{n79:0.5, n91:0.5}, n91:{n90:0.5, n92:0.5}, n92:{n91:0.5, n93:0.5}, n93:{n92:0.5, n94:0.5}, n94:{n93:0.5, n95:0.5}, n95:{n94:0.5, n96:0.5}, n96:{n95:0.5, n97:0.5}, n97:{n96:0.5, n98:0.5}, n98:{n97:0.5, n99:0.5}, n99:{n98:0.5, n100:0.5}, n100:{n99:0.5, n101:0.5}, n101:{n100:0.5, n102:0.5}, n102:{n101:0.5, n103:0.5}, n103:{n102:0.5, n104:0.5}, n104:{n103:0.5, n105:0.5}, n105:{n104:0.5, n106:0.5}, n106:{n105:0.5, n107:0.5}, n107:{n106:0.5, n108:0.5}, n108:{n107:0.5, n109:0.5}, n109:{n108:0.5, n1:0.5}, n110:{n89:1, n111:1}, n111:{n110:1, n112:1}, n112:{n111:1, n113:1}, n113:{n112:1, n114:1}, n114:{n113:1, n115:1}, n115:{n114:1, n116:1}, n116:{n115:1, n117:1}, n117:{n116:1, n118:1}, n118:{n117:1, n119:1}, n119:{n118:1, n120:1}, n120:{n119:1, n121:1}, n121:{n120:1, n122:1}, n122:{n121:1, n123:1}, n123:{n122:1, n124:1}, n124:{n123:1, n125:1}, n125:{n124:1, n126:1}, n126:{n125:1, n127:1}, n127:{n126:1, n128:1}, n128:{n127:1, n129:1}, n129:{n128:1, n1:1}, n130:{n89:1, n131:1}, n131:{n130:1, n132:1}, n132:{n131:1, n133:1}, n133:{n132:1, n134:1}, n134:{n133:1, n135:1}, n135:{n134:1, n136:1}, n137:{n136:1, n138:1}, n138:{n137:1, n139:1}, n139:{n138:1, n140:1}, n140:{n139:1, n141:1}, n141:{n140:1, n142:1}, n142:{n141:1, n143:1}, n143:{n142:1, n144:1}, n144:{n143:1, n145:1}, n145:{n144:1, n146:1}, n146:{n145:1, n1:1}, n148:{n147:1, n149:1}, n149:{n148:1, n150:1}, n150:{n149:1, n151:1}, n151:{n150:1, n152:1}, n152:{n151:1, n153:1}, n153:{n152:1, n154:1}, n154:{n153:1, n155:1}, n155:{n154:1, n156:1}, n156:{n155:1, n157:1}, n157:{n156:1, n1:1}, n158:{n147:1, n159:1}, n159:{n158:1, n160:1}, n160:{n159:1, n161:1}, n161:{n160:1, n162:1}, n162:{n161:1, n163:1}, n163:{n162:1, n164:1}, n164:{n163:1, n165:1}, n165:{n164:1, n166:1}, n166:{n165:1, n167:1}, n167:{n166:1, n11:1}, n1:{n2:1, n59:1, n60:1, n109:1, n129:1, n146:1, n157:1}, n11:{n10:1, n12:1, n40:1, n167:1 }, n21:{n20:1, n22:1}, n31:{n30:1, n32:1, n41:1, n70:1}, n79:{n78:1, n80:1, n90:1}, n89:{n88:1, n110:1, n130:1}, n136:{n135:1, n137:1}, n147:{n148:1, n158:1}, n69:{n68:1} };
	this.nodes = {n1:{id: 'n1', x:260, y: 390}, n2:{id: 'n2', x:251, y: 380}, n3:{id: 'n3', x:242, y: 370}, n4:{id: 'n4', x:233, y: 360}, n5:{id: 'n5', x:224, y: 350}, n6:{id: 'n6', x:215, y: 340}, n7:{id: 'n7', x:206, y: 330}, n8:{id: 'n8', x:197, y: 320}, n9:{id: 'n9', x:188, y: 310}, n10:{id: 'n10', x:179, y: 300}, n11:{id: 'n11', x:170, y: 290}, n12:{id: 'n12', x:163, y: 290}, n13:{id: 'n13', x:156, y: 290}, n14:{id: 'n14', x:149, y: 290}, n15:{id: 'n15', x:142, y: 290}, n16:{id: 'n16', x:135, y: 290}, n17:{id: 'n17', x:128, y: 290}, n18:{id: 'n18', x:121, y: 290}, n19:{id: 'n19', x:114, y: 290}, n20:{id: 'n20', x:107, y: 290}, n21:{id: 'n21', x:100, y: 290}, n22:{id: 'n22', x:100, y: 294}, n23:{id: 'n23', x:100, y: 298}, n24:{id: 'n24', x:100, y: 302}, n25:{id: 'n25', x:100, y: 306}, n26:{id: 'n26', x:100, y: 310}, n27:{id: 'n27', x:100, y: 314}, n28:{id: 'n28', x:100, y: 318}, n29:{id: 'n29', x:100, y: 322}, n30:{id: 'n30', x:100, y: 326}, n31:{id: 'n31', x:100, y: 330}, n32:{id: 'n32', x:107, y: 326}, n33:{id: 'n33', x:114, y: 322}, n34:{id: 'n34', x:121, y: 318}, n35:{id: 'n35', x:128, y: 314}, n36:{id: 'n36', x:135, y: 310}, n37:{id: 'n37', x:142, y: 306}, n38:{id: 'n38', x:149, y: 302}, n39:{id: 'n39', x:156, y: 298}, n40:{id: 'n40', x:163, y: 294}, n41:{id: 'n41', x:108, y: 333}, n42:{id: 'n42', x:116, y: 336}, n43:{id: 'n43', x:124, y: 339}, n44:{id: 'n44', x:132, y: 342}, n45:{id: 'n45', x:140, y: 345}, n46:{id: 'n46', x:148, y: 348}, n47:{id: 'n47', x:156, y: 351}, n48:{id: 'n48', x:164, y: 354}, n49:{id: 'n49', x:172, y: 357}, n50:{id: 'n50', x:180, y: 360}, n51:{id: 'n51', x:188, y: 363}, n52:{id: 'n52', x:196, y: 366}, n53:{id: 'n53', x:204, y: 369}, n54:{id: 'n54', x:212, y: 372}, n55:{id: 'n55', x:220, y: 375}, n56:{id: 'n56', x:228, y: 378}, n57:{id: 'n57', x:236, y: 381}, n58:{id: 'n58', x:244, y: 384}, n59:{id: 'n59', x:252, y: 387}, n60:{id: 'n60', x:264, y: 394}, n61:{id: 'n61', x:268, y: 398}, n62:{id: 'n62', x:272, y: 402}, n63:{id: 'n63', x:276, y: 406}, n64:{id: 'n64', x:280, y: 410}, n65:{id: 'n65', x:284, y: 414}, n66:{id: 'n66', x:288, y: 418}, n67:{id: 'n67', x:292, y: 422}, n68:{id: 'n68', x:296, y: 426}, n69:{id: 'n69', x:300, y: 430}, n70:{id: 'n70', x:100, y: 334}, n71:{id: 'n71', x:100, y: 338}, n72:{id: 'n72', x:100, y: 342}, n73:{id: 'n73', x:100, y: 346}, n74:{id: 'n74', x:100, y: 350}, n75:{id: 'n75', x:100, y: 354}, n76:{id: 'n76', x:100, y: 358}, n77:{id: 'n77', x:100, y: 362}, n78:{id: 'n78', x:100, y: 366}, n79:{id: 'n79', x:100, y: 370}, n80:{id: 'n80', x:100, y: 374}, n81:{id: 'n81', x:100, y: 378}, n82:{id: 'n82', x:100, y: 382}, n83:{id: 'n83', x:100, y: 386}, n84:{id: 'n84', x:100, y: 390}, n85:{id: 'n85', x:100, y: 394}, n86:{id: 'n86', x:100, y: 398}, n87:{id: 'n87', x:100, y: 402}, n88:{id: 'n88', x:100, y: 406}, n89:{id: 'n89', x:100, y: 410}, n90:{id: 'n90', x:108, y: 371}, n91:{id: 'n91', x:116, y: 372}, n92:{id: 'n92', x:124, y: 373}, n93:{id: 'n93', x:132, y: 374}, n94:{id: 'n94', x:140, y: 375}, n95:{id: 'n95', x:148, y: 376}, n96:{id: 'n96', x:156, y: 377}, n97:{id: 'n97', x:164, y: 378}, n98:{id: 'n98', x:172, y: 379}, n99:{id: 'n99', x:180, y: 380}, n100:{id: 'n100', x:188, y: 381}, n101:{id: 'n101', x:196, y: 382}, n102:{id: 'n102', x:204, y: 383}, n103:{id: 'n103', x:212, y: 384}, n104:{id: 'n104', x:220, y: 385}, n105:{id: 'n105', x:228, y: 386}, n106:{id: 'n106', x:236, y: 387}, n107:{id: 'n107', x:244, y: 388}, n108:{id: 'n108', x:252, y: 389}, n109:{id: 'n109', x:260, y: 390}, n110:{id: 'n110', x:108, y: 409}, n111:{id: 'n111', x:116, y: 408}, n112:{id: 'n112', x:124, y: 407}, n113:{id: 'n113', x:132, y: 406}, n114:{id: 'n114', x:140, y: 405}, n115:{id: 'n115', x:148, y: 404}, n116:{id: 'n116', x:156, y: 403}, n117:{id: 'n117', x:164, y: 402}, n118:{id: 'n118', x:172, y: 401}, n119:{id: 'n119', x:180, y: 400}, n120:{id: 'n120', x:188, y: 399}, n121:{id: 'n121', x:196, y: 398}, n122:{id: 'n122', x:204, y: 397}, n123:{id: 'n123', x:212, y: 396}, n124:{id: 'n124', x:220, y: 395}, n125:{id: 'n125', x:228, y: 394}, n126:{id: 'n126', x:236, y: 393}, n127:{id: 'n127', x:244, y: 392}, n128:{id: 'n128', x:252, y: 391}, n129:{id: 'n129', x:260, y: 390}, n130:{id: 'n130', x:110, y: 410}, n131:{id: 'n131', x:120, y: 410}, n132:{id: 'n132', x:130, y: 410}, n133:{id: 'n133', x:140, y: 410}, n134:{id: 'n134', x:150, y: 410}, n135:{id: 'n135', x:160, y: 410}, n136:{id: 'n136', x:160, y: 410}, n137:{id: 'n137', x:170, y: 408}, n138:{id: 'n138', x:180, y: 406}, n139:{id: 'n139', x:190, y: 404}, n140:{id: 'n140', x:200, y: 402}, n141:{id: 'n141', x:210, y: 400}, n142:{id: 'n142', x:220, y: 398}, n143:{id: 'n143', x:230, y: 396}, n144:{id: 'n144', x:240, y: 394}, n145:{id: 'n145', x:250, y: 392}, n146:{id: 'n146', x:260, y: 390}, n147:{id: 'n147', x:300, y: 290}, n148:{id: 'n148', x:296, y: 300}, n149:{id: 'n149', x:292, y: 310}, n150:{id: 'n150', x:288, y: 320}, n151:{id: 'n151', x:284, y: 330}, n152:{id: 'n152', x:280, y: 340}, n153:{id: 'n153', x:276, y: 350}, n154:{id: 'n154', x:272, y: 360}, n155:{id: 'n155', x:268, y: 370}, n156:{id: 'n156', x:264, y: 380}, n157:{id: 'n157', x:260, y: 390}, n158:{id: 'n158', x:287, y: 290}, n159:{id: 'n159', x:274, y: 290}, n160:{id: 'n160', x:261, y: 290}, n161:{id: 'n161', x:248, y: 290}, n162:{id: 'n162', x:235, y: 290}, n163:{id: 'n163', x:222, y: 290}, n164:{id: 'n164', x:209, y: 290}, n165:{id: 'n165', x:196, y: 290}, n166:{id: 'n166', x:183, y: 290}, n167:{id: 'n167', x:170, y: 290} };
	this.keynodes = ['n1', 'n11', 'n21', 'n31', 'n69', 'n79', 'n89', 'n136', 'n147' ];

	
	this.snackManFinalPath = new Array();
	this.mapGraph = {};
	
	this.createGraph();
	this.counter = [this.snackManFinalPath[2], this.snackManFinalPath[3], // n21, n31, n79, n89
	                this.snackManFinalPath[5], this.snackManFinalPath[6]];

	this.coolerNode = this.snackManFinalPath[4];
	this.displayNode = this.snackManFinalPath[1];
	this.boxOfFruitsNode = this.snackManFinalPath[7];
	this.juiceMachineNode = this.snackManFinalPath[8];
	
	if (position.indexOf("counter") == 0) 
		this.initialPosition = this.counter[parseInt(position.substring(7)) - 1];
	else
		if (position === "cooler")
			this.initialPosition = this.coolerNode;
		else
			if (position === "display")
				this.initialPosition = this.displayNode;
			else
				this.initialPosition = this.snackManFinalPath[0];
	this.currentNode = this.initialPosition;
	  
	this.img = new Sprite({
			ticksPerFrame: 0,
			numberOfFrames: 3,
			horzSeq: true,
			x: this.currentNode.x,
			y: this.currentNode.y - 32,
			width: 96,
			height: 32,
			sourceY: 0,
			img : PreloadImgs.get("$cooker")
	});

	this.imgCooker = this.img.image;
	
	this.imgCookerPlatter = PreloadImgs.get("$cooker_platter");
	
	this.cooler = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 4,
		horzSeq: true,
		x: 288,
		y: 384,
		width: 256,
		height: 64,
		sourceX: 0,
		sourceY: 0,
		img : PreloadImgs.get("cooler")
	});
	
	this.display = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 4,
		horzSeq: true,
		x: 160,
		y: 256,
		width: 128,
		height: 32,
		sourceX: 0,
		sourceY: 0,
		img : PreloadImgs.get("display")
	});
	
	var juice = mission.evaluate("count(//mission/commands/category[@name='goToBoxOfFruits'])", mission, null,  XPathResult.ANY_TYPE, null);
	this.showJuice = juice.numberValue > 0; 
	if (this.showJuice) {
		this.boxOfFruits = new Sprite({
			ticksPerFrame: 0,
			numberOfFrames: 3,
			horzSeq: true,
			x: 160,
			y: 416,
			width: 96,
			height: 32,
			sourceX: 0,
			sourceY: 0,
			img : PreloadImgs.get("boxoffruits")
		});
		
		this.juiceMachine = new Sprite({
			ticksPerFrame: 0,
			numberOfFrames: 4,
			horzSeq: true,
			x: 320,
			y: 256,
			width: 128,
			height: 32,
			sourceX: 0,
			sourceY: 0,
			img : PreloadImgs.get("juicemachine")
		});
	}
	
	this.installedMachines = [];
	this.extendedCommands = [];
	/*
	this.frenchFries = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 2,
		horzSeq: false,
		x: 320,
		y: 288,
		width: 32,
		height: 64,
		sourceX: 0,
		sourceY: 0,
		img : PreloadImgs.get("frenchfries")
	});
	
	*/
	this.objective = {};
	
	this.objective.objectives = [];
	this.objective.ordered = objectives.getAttribute("ordered") === "true";
	this.objective.reward = parseInt( objectives.getAttribute("reward") );
	
	var m = objectives.getAttribute("maxCommands");
	this.objective.maxCommands = parseInt( (m == null?"0":m) ); 
	
	m = objectives.getAttribute("maxCommandsReward");
	this.objective.maxCommandsReward = parseInt( (m == null?"0":m)  ); 
	
	this.objective.debug = objectives.getAttribute("debug") === "true"; 
	
	var children = objectives.getElementsByTagName("objective");
	
	for (var i = 0; i < children.length; i++) {
		var obj = children[i].childNodes[0].nodeValue;
		
		var o = Objective.factory(obj);
		var p = o.init(children[i]);
		this.objective.objectives.push(p);
	}
	
	this.hasVarQtd = this.createAditionalObjective(objectives, "varQtd");
	this.hasCommQtd = this.createAditionalObjective(objectives, "commQtd");
	
	this.lastObjectiveAchieved = -1;
	this.allObjectivesAchieved = false;
	
	this.catched = 0;
	this.delivered = 0;

};


SnackMan.prototype.createAditionalObjective = function(objectives, key) {
	var m = objectives.getAttribute(key);
	if (m != null) {

		var o = Objective.factory(key);
		var p = o.init(m);
		this.objective.objectives.push(p);
		return true;
	}
	return false;
};
// extracts some important information and creates the graph
SnackMan.prototype.createGraph = function() {

	for (var key = 0; key < this.keynodes.length; key++)
		this.snackManFinalPath[key] = this.nodes[this.keynodes[key]];
	
	this.graph = new Graph(this.path);
};


SnackMan.prototype.reset = function() {
	this.currentNode = this.initialPosition;
	
	this.img.image = this.imgCooker;
	
	this.img.x = this.currentNode.x;
	this.img.y = this.currentNode.y  - 32;
	this.img.sourceY = 0;
	this.img.frameIndex = 0;
	
	this.cooler.sourceX = 0;
	this.cooler.frameIndex = 0;
	
	this.lastObjectiveAchieved = -1;
	this.allObjectivesAchieved = false;
	for (var i=0; i<this.objective.objectives.length; i++)
		this.objective.objectives[i].achieved = false;

};

SnackMan.prototype.draw = function(ctx) {
	
	if (this.showJuice) {
		this.boxOfFruits.draw(ctx);
		this.juiceMachine.draw(ctx);
	}
		
	this.drawInstalledMachines(ctx);
	this.display.draw(ctx);
	this.img.draw(ctx);
	this.cooler.draw(ctx);
	
};

/**********************************************************************/
/**          create the commands to evaluate - the action part        */
/**  actions (snackman and customers) are only performed in this time */
/**********************************************************************/

SnackMan.prototype.update = function() {
	var param = [];
	for (var i=0;i<arguments.length;i++)
	 param.push(arguments[i]);
	
	BlocklyApps.log.push(param);
	CustomerManager.update();
};

SnackMan.prototype.goToBarCounter = function(cust) {
	
	
	if (cust < 1 || cust > 4) {
		BlocklyApps.log.push(["fail", "Error_doesntExistCounter"]);
		throw false;
	}
	
	this.animateSnackMan( this.counter[cust-1] );
  
};

SnackMan.prototype.goToDisplay = function() {
	this.animateSnackMan( this.displayNode );
};

SnackMan.prototype.goToCooler = function() {
	this.animateSnackMan( this.coolerNode );
};

SnackMan.prototype.alertRun = function(txt) {
	alert(txt);
};

SnackMan.prototype.getCustomer = function() {
	
	var enter = false;
	for (var i=0; i<this.counter.length;i++)
		if (this.currentNode.id === this.counter[i].id) {
			enter = true;
			return (CustomerManager.getCustomerCounter(i+1));
		}
	
	if (!enter) {
		BlocklyApps.log.push(["fail", "Error_isntCloseToCustomer"]);
		throw false;
	}
	
	return null;
};

SnackMan.prototype.isThereACustomer = function() {
	
	var found = this.getCustomer();
	
	this.update('IM', 0);  // turn to front
	this.update('IM', 32); // turn to left to find a customer in the counter
	this.update('IM', 0);  // turn to front

	return found != null;
};

SnackMan.prototype.askForDrink = function() {
	
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	var drink = found.askForDrink();
	if (drink == null) {
		BlocklyApps.log.push(["fail", "Error_isntThirsty"]);
		throw false;
	}
	
	this.update('IM', 0);  // turn to front
	
	this.verifyObjectives("askForDrink", found);
	
	return drink;
};

SnackMan.prototype.pickUpDrink = function(order) {

	// is he in front of the cooler ?
	if (this.currentNode.id != this.coolerNode.id) {
		BlocklyApps.log.push(["fail", "Error_isntFrontCooler"]);
		throw false;
	}
	
	// does he have any order ? 
	if (order.data == null || order.data === undefined || order.data.type != "order") {
		BlocklyApps.log.push(["fail", "Error_doesntHaveOrder"]);
		throw false;
	}

	// does the order have food ?
	if (order.data.drinkOrFood != "drink") {
		BlocklyApps.log.push(["fail", "Error_doesntOrderDrink"]);
		throw false;
	}
	
	// does the order have the drink of this place ?
	if (order.data.descr.indexOf("coke") == -1) {
		BlocklyApps.log.push(["fail", "Error_wrongPlaceForDrink"]);
		throw false;
	}
	
	// open the cooler three times because there are three slides
	this.update('OC');
	this.update('OC');
	this.update('OC');

	// close the cooler 
	this.update('CC');
	this.update('CC');
	this.update('CC');

	this.update('IP');
	
	var item = {type: "item", descr:order.data.descr, drinkOrFood: "drink", source: order.data.source, sourceType: order.data.sourceType}; 
	this.verifyObjectives("pickUpDrink", item);
	this.catched++;
	
	// TODO in future version, maybe the cooler has limited stock
	return item;
	
};

SnackMan.prototype.hasThirsty = function() {
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	this.update('IM', 0);  // turn to front

	return found.hasThirsty();
	
};

SnackMan.prototype.askForFood = function() {
	
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	var food = found.askForFood();
	if (food == null) {
		BlocklyApps.log.push(["fail", "Error_isntHunger"]);
		throw false;
	}
	
	this.update('IM', 0);  // turn to front

	this.verifyObjectives("askForFood", found);
	
	return food;
};

SnackMan.prototype.hasHunger = function() {
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	this.update('IM', 0);  // turn to front
	
	return found.hasHunger();
	
};

SnackMan.prototype.pickUpHotDog= function(order) {

	// is he in front of the display ?
	if (this.currentNode.id != this.displayNode.id) {
		BlocklyApps.log.push(["fail", "Error_isntFrontDisplay"]);
		throw false;
	}
	
	// does he have any order ? 
	if (order.data == null || order.data === undefined || order.data.type != "order") {
		BlocklyApps.log.push(["fail", "Error_doesntHaveOrder"]);
		throw false;
	}

	// does the order have food ?
	if (order.data.drinkOrFood != "food") {
		BlocklyApps.log.push(["fail", "Error_doesntOrderFood"]);
		throw false;
	}
	
	// does the order have the food of this place ?
	if (order.data.descr.indexOf("hotdog") == -1) {
		BlocklyApps.log.push(["fail", "Error_onlyHotDog"]);
		throw false;
	}
	
	// open the display three times because there are three slides
	this.update('OD'); 
	this.update('OD'); 
	this.update('OD'); 

	this.update('CD'); 
	this.update('CD'); 
	this.update('CD'); 

	// close the display 
	this.update('IP'); 
	
	// TODO in future version, maybe the display has limited stock
	var item = {type: "item", descr:order.data.descr, drinkOrFood: "food", source: order.data.source, sourceType: order.data.sourceType};
	
	this.verifyObjectives("pickUpFood", item);
	this.catched++;
	
	return item; 
	
};

SnackMan.prototype.genericPickUp = function(order, machine) {

	if (this.currentNode.id != machine.node.id) {
		BlocklyApps.log.push(["fail", machine.errorIsntFront]);
		throw false;
	}
	
	// does he have any order ? 
	if (order.data == null || order.data === undefined || order.data.type != "order") {
		BlocklyApps.log.push(["fail", "Error_doesntHaveOrder"]);
		throw false;
	}

	// does the order have food or drink ?
	if (order.data.drinkOrFood != machine.drinkOrFood) {
		BlocklyApps.log.push(["fail", "Error_doesntOrder" + machine.drinkOrFood.substring(0,1).toUpperCase() + machine.drinkOrFood.substring(1)]);
		throw false;
	}
	
	// does the order have the food/drink of this place ?
	if (order.data.descr.indexOf(machine.typeOfDrinkFood) == -1) {
		BlocklyApps.log.push(["fail", "Error_only"+machine.typeOfDrinkFood.substring(0,1).toUpperCase() + machine.typeOfDrinkFood.substring(1)]);
		throw false;
	}
	
	// two animations slides: open machine
	this.update('OD'); 
	this.update('OD'); 

	this.update('CD'); 
	this.update('CD'); 

	this.update('IP'); 

	var item = {type: "item", descr:"$$"+machine.produce, drinkOrFood: machine.drinkOrFood, source: order.data.source, sourceType: order.data.sourceType};
	
	this.catched++;
	
	return item; 
	
};

SnackMan.prototype.deliver = function(item) {
	
	if (item.data === undefined || item.data === null || item.data === "undefined" || item.type === "number") {
		BlocklyApps.log.push(["fail", "Error_variableHaventContentToDeliver"]);
		throw false;
	}
	
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	var amount = found.deliver(item.data); 
	
	if (amount.happy == Customer.DELIVERED_BAD) {
		BlocklyApps.log.push(["fail", amount.reason]);
		throw false;
	}
	
	if (amount != null) {
		this.verifyObjectives("deliver", {allCustomers:false, customer:found});
	}
	
	item.data = null; // was deliver, then it's null
	
	if (amount.happy >= Customer.DELIVERED_PARTIAL)
		this.delivered++;
	
	if (amount.happy != Customer.DELIVERED_PARTIAL) {
		// 11 times to execute the coin animation and erase the coin
		for (var i=0; i<11; i++) {

			this.update('IM', 0);
		}
		
		this.update('IO', amount.money, this.catched - this.delivered);
	}
	
};



SnackMan.prototype.goToBoxOfFruits = function() {
	
	this.animateSnackMan( this.boxOfFruitsNode );

};

SnackMan.prototype.goToJuiceMachine = function() {
	
	this.animateSnackMan( this.juiceMachineNode );

};

SnackMan.prototype.pickUpFruits = function(order) {

	// is he in front of the box of fruits ?
	if (this.currentNode.id != this.boxOfFruitsNode.id) {
		BlocklyApps.log.push(["fail", "Error_isntFrontBoxOfFruits"]);
		throw false;
	}
	
	// does he have any order ? 
	if (order.data == null || order.data === undefined || order.data.type != "order") {
		BlocklyApps.log.push(["fail", "Error_doesntHaveOrder"]);
		throw false;
	}

	// does the order have the food of this place ?
	if (!(order.data.type === "order" && order.data.descr.indexOf("$$juiceof") == 0)) {
		BlocklyApps.log.push(["fail", "Error_onlyFruits"]);
		throw false;
	}
	
	// show a fruit two times because there are two slides
	this.update('SF');
	this.update('SF');

	// hide  the fruit 
	this.update('HF');
	this.update('HF');

	this.update('IP');
	
	// TODO in future version, maybe the display has limited stock
	var item = {type: "item", descr:"$$"+order.data.descr.substring(9), drinkOrFood: "drink", source: order.data.source, sourceType: order.data.sourceType};
	//this.verifyObjectives("catchFruits", item);
	
	return item; 
	
};

SnackMan.prototype.prepareAndPickUpJuice = function(order) {
	// is he in front of the juice machine ?
	if (this.currentNode.id != this.juiceMachineNode.id) {
		BlocklyApps.log.push(["fail", "Error_isntFrontJuiceMachine"]);
		throw false;
	}
	
	// does he have an item ? 
	if (order.data == null || order.data === undefined || order.data.type != "item") {
		BlocklyApps.log.push(["fail", "Error_doesntHaveItem"]);
		throw false;
	}

	// does the order have the food of this place ?
	if (order.data.descr != "$$orange") {
		BlocklyApps.log.push(["fail", "Error_onlyPutFruits"]);
		throw false;
	}
	
	// make juice three times because there are three slides
	this.update('MJ'); 
	this.update('MJ'); 
	this.update('MJ'); 
	
	// hide  the fruit 
	this.update('HJ'); 
	this.update('HJ'); 
	this.update('HJ'); 

	this.update('IP'); 

	// TODO in future version, maybe the display has limited stock
	var item = {type: "item", descr:"$$juiceof"+order.data.descr.substring(2), drinkOrFood: "drink", source: order.data.source, sourceType: order.data.sourceType};
	//this.verifyObjectives("catchFruits", item);
	this.catched++;
	
	return item; 
	
};

SnackMan.prototype.animateSnackMan = function(dest) {

	var solution = this.graph.findShortestPath(this.currentNode.id, dest.id);
	for (var i=0;i<solution.length;i++) {
		
		var node = this.nodes[solution[i]];
		
		this.update('MS', this.currentNode.x, this.currentNode.y, node.x, node.y); 
		this.currentNode = node;
		
	}
	this.update('CO', 0);

};

/**********************************************************/
/**                    draw methods                       */
/**********************************************************/

SnackMan.prototype.animate = function(command, values) {
	  switch (command) {
	    case 'AL' :
	    	this.alertRun(values);
	    	break;
	    	
	    case 'CO':
	    	this.checkObjectives();
	    	
	  	case 'IM' :
	  		this.changeSnackManImage(values);
	  		break;
	  
	  	case 'MS' :
	  		this.changeSnackManPosition(values.shift(), values.shift(), values.shift(), values.shift());
	  		break;
	  		
	  	case 'OC' :
	  		this.nextOpenCoolerImage();
	  		break;
	  		
	  	case 'CC' :
	  		this.nextCloseCoolerImage();
	  		break;
	  		
	  	case 'OD' :
	  		this.nextOpenDisplayImage();
	  		break;
	  		
	  	case 'CD' :
	  		this.nextCloseDisplayImage();
	  		break;
	  		
	 	case 'IP' :
	 		this.changeImagePlatter();
	  		break;
	  		
	  	case 'IO' :
	  		var value = values.shift();
	  		if (value != null)
	  			Game.missionMoney.amount += value;
	  		
	  		value = values.shift();
	  		if (value == 0)
	  			this.changeImageOriginal();
	  		break;

	 	case 'SF' :
	 		this.nextShowFruitImage();
	  		break;
	  		
	 	case 'HF' :
	 		this.nextHideFruitImage();
	  		break;
	  		
	 	case 'MJ':
	 		this.nextShowJuiceMachineImage();
	 		break;
	  		
	 	case 'HJ':
	 		this.nextHideJuiceMachineImage();
	 		break;
	  }
	  
};

SnackMan.prototype.changeSnackManImage = function(id) {

	this.img.sourceY = id;
	this.img.update();
	
};

SnackMan.prototype.changeSnackManPosition = function(ox, oy, nx, ny) {
	if (nx < ox)
		this.img.sourceY = 32;
	else
		if (nx > ox)
			this.img.sourceY = 64;
		else if (ny < oy)
			    this.img.sourceY = 96;
			 else
				this.img.sourceY = 0;
	
	this.img.update();
	
	this.img.x = nx;
	this.img.y = ny - 32;
};

SnackMan.prototype.nextOpenCoolerImage = function() {
	
	if (this.cooler.invert == true)
		this.cooler.invertDirection();

	this.updateCoolerImage();
	
};

SnackMan.prototype.nextCloseCoolerImage = function() {
	
	if (this.cooler.invert == false)
		this.cooler.invertDirection();

	this.updateCoolerImage();
	
};

SnackMan.prototype.updateCoolerImage = function() {

	this.cooler.update();
	
};

SnackMan.prototype.nextShowFruitImage = function() {
	if (this.boxOfFruits.invert == true)
		this.boxOfFruits.invertDirection();

	this.updateBoxOfFruitsImage();

};

SnackMan.prototype.nextHideFruitImage = function() {
	if (this.boxOfFruits.invert == false)
		this.boxOfFruits.invertDirection();

	this.updateBoxOfFruitsImage();

};

SnackMan.prototype.updateBoxOfFruitsImage = function() {
	
	this.boxOfFruits.update();

};

SnackMan.prototype.nextShowJuiceMachineImage = function() {
	if (this.juiceMachine.invert == true)
		this.juiceMachine.invertDirection();

	this.updateJuiceMachineImage();

};

SnackMan.prototype.nextHideJuiceMachineImage = function() {
	if (this.juiceMachine.invert == false)
		this.juiceMachine.invertDirection();

	this.updateJuiceMachineImage();

};

SnackMan.prototype.updateJuiceMachineImage = function() {
	this.juiceMachine.update();
};

SnackMan.prototype.nextOpenDisplayImage = function() {
	
	if (this.display.invert == true)
		this.display.invertDirection();

	this.updateDisplayImage();
	
};

SnackMan.prototype.nextCloseDisplayImage = function() {
	
	if (this.display.invert == false)
		this.display.invertDirection();

	this.updateDisplayImage();
	
};

SnackMan.prototype.updateDisplayImage = function() {
	this.display.update();
};

SnackMan.prototype.changeImagePlatter = function() {
	this.img.image = this.imgCookerPlatter;
};

SnackMan.prototype.changeImageOriginal = function() {
	this.img.image = this.imgCooker;
};

/**********************************************************/
/**                 Installed Machines                    */
/**********************************************************/

SnackMan.prototype.drawInstalledMachines = function(ctx) {
	for (var i = 0; i < this.installedMachines.length; i++) {
		this.installedMachines[i].draw(ctx);
	}
};

SnackMan.prototype.installMachine = function(idmachine, machinename, machinex, machiney, machinepath, 
		                   machineErrorIsntFront, machineDrinkOrFood, machineTypeOfDrinkFood, machineProduce, commands) {
	
	var machine = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 3,
		horzSeq: false,
		x: machinex, y: machiney,
		width: 32, height: 192,
		sourceX: 0, sourceY: 0,
		img : PreloadImgs.get(machinename.toLowerCase()),
	});
	
	this.installedMachines.push(machine);

	// connect the path to the main line
	var mp = machinepath.split("#$#");
	var path = JSON.parse(mp[0]);
	for (var key1 in path) {
		var myObj2 = path[key1];
		this.path[key1] = myObj2;
		for (var key2 in myObj2) {
			if (this.path[key2] != undefined)
				this.path[key2][key1] = myObj2[key2]; 
		}
	}
	
	var nodes = JSON.parse(mp[1]);
	for (var i = 0; i < nodes.length; i++)
		this.nodes[nodes[i].id] = nodes[i];
	
	var machineCfg = {};
	machineCfg.node = nodes[0];
	machineCfg.errorIsntFront = machineErrorIsntFront;
	machineCfg.drinkOrFood = machineDrinkOrFood;
	machineCfg.typeOfDrinkFood = machineTypeOfDrinkFood;
	machineCfg.produce = machineProduce;
	
	PreloadImgs.put('$' + machineProduce, 'images/$$' + machineProduce + '.png', true);	
	
	machine.machineCfg = machineCfg;

	// link the commands
	for (var i = 0; i < commands.length; i++) {
		var com = commands[i];
		Blockly.Blocks[com[0]] = {
				bodyFunc: com[3],
				init: new Function(com[2])
				
		};
		
		Blockly.JavaScript[com[0]] = function(block){
			
			var xpt = eval(Blockly.Blocks[block.type].bodyFunc);
			return xpt;
				
		};
		
		var run = null;
		switch (com[4]) {
			case "M" : 
				run = new Function("machine", "hero.animateSnackMan( machine.node );");
				break;
			case "C" : 
				run = new Function("machine", "order", "return hero.genericPickUp( order, machine ); ");
			    break;
		
		}
		
		this.extendedCommands.push({name: com[0], nameLang: com[1], run: run, machine: machineCfg});
	}
	
};

SnackMan.prototype.hasMachineFor = function(product) {
	
	if (product === "hotdog" || product === "coke" || product === "juiceoforange")
		return true;
	
	for( var i= 0; i < this.installedMachines.length; i++ ) {
		
		var machine = this.installedMachines[i].machineCfg;
		if (machine.produce === product)
			return true;
		
	}
	return false;
	
};

/**********************************************************/
/**                    Util Methods                       */
/**********************************************************/

SnackMan.prototype.checkObjectives = function() {
	
	this.verifyObjectives("counter", {nx: this.img.x, ny: this.img.y+32});
};

SnackMan.prototype.verifyObjectives = function(key, options) {
	if (!Objective.verifyObjectives(key, options))
		return;
	
	$.growl({ title: BlocklyApps.getMsg("NoBugs_goalAchieved"), 
		message: BlocklyApps.getMsg("NoBugs_achieved") + " " + (this.lastObjectiveAchieved+1) + 
						 " "  + BlocklyApps.getMsg("NoBugs_of") + " " +  this.objective.objectives.length});
	Game.alertGoalButton();
	
};

SnackMan.prototype.addReward = function(count, timeSpent, timeLimit, timeReward) {
	
	var ret = {total: 0, base: 0, bonus : []};
	if (this.allObjectivesAchieved) {
		
		ret.total = this.objective.reward;
		ret.base = ret.total;
		if (count <= this.objective.maxCommands) {
			ret.total += this.objective.maxCommandsReward;
			
			ret.bonus.push({name: "Victory_MaxCommands", value: this.objective.maxCommandsReward, extraInfo: null});
		} 
		
		if (timeLimit != null && timeSpent <= timeLimit) {
			timeReward = timeReward.split(" ");
			var timePart = Math.floor(timeLimit / timeReward.length);
			var timeBonus = 0;
			for (var i=1; i<=timeReward.length; i++) {
				if (timeSpent <= timePart*i) {
					timeBonus = parseInt(timeReward[i-1]);
					
					break;
				}
			}
			
			if (timeBonus > 0) {
				
				var minutes = Math.floor((timeSpent/60));
				var seconds = timeSpent - (minutes*60);
				
				ret.bonus.push({name: "Victory_TimeBonus", value: timeBonus, extraInfo: (minutes > 0 ? minutes + "'":"") + seconds + "\""});
				ret.total += timeBonus;
			}
		}
		
		
	}
	
	return ret;
	
};

