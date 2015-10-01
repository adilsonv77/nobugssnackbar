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

PreloadImgs.put('cooler', 'images/cooler_new.png');
PreloadImgs.put('display', 'images/display_new.png');
PreloadImgs.put('boxoffruits', 'images/boxoffruits.png');
PreloadImgs.put('juicemachine', 'images/juicemachine.png');
PreloadImgs.put('icecreammachine', 'images/icecreammachine.png');

SnackMan = function(objectives, mission, avatar) {
	var position = mission.childNodes[0].getElementsByTagName("cooker")[0].childNodes[0].nodeValue;
	
	this.path = {n2:{n1:1, n3:1}, n3:{n2:1, n4:1}, n4:{n3:1, n5:1}, n5:{n4:1, n6:1}, n6:{n5:1, n7:1}, n7:{n6:1, n8:1}, n8:{n7:1, n9:1}, n9:{n8:1, n10:1}, n10:{n9:1, n11:1}, n12:{n11:1, n13:1, nIceCream:1}, n13:{n12:1, n14:1}, n14:{n13:1, n15:1, nIceCream:1}, n15:{n14:1, n16:1}, n16:{n15:1, n17:1}, n17:{n16:1, n18:1}, n18:{n17:1, n19:1}, n19:{n18:1, n20:1}, n20:{n19:1, n21:1}, n22:{n21:0.5, n23:0.5}, n23:{n22:0.5, n24:0.5}, n24:{n23:0.5, n25:0.5}, n25:{n24:0.5, n26:0.5}, n26:{n25:0.5, n27:0.5}, n27:{n26:0.5, n28:0.5}, n28:{n27:0.5, n29:0.5}, n29:{n28:0.5, n30:0.5}, n30:{n29:0.5, n31:0.5}, n32:{n31:1, n33:1}, n33:{n32:1, n34:1}, n34:{n33:1, n35:1}, n35:{n34:1, n36:1}, n36:{n35:1, n37:1}, n37:{n36:1, n38:1}, n38:{n37:1, n39:1}, n39:{n38:1, n40:1}, n40:{n39:1, n11:1}, n41:{n31:0.5, n42:0.5}, n42:{n41:0.5, n43:0.5}, n43:{n42:0.5, n44:0.5}, n44:{n43:0.5, n45:0.5}, n45:{n44:0.5, n46:0.5}, n46:{n45:0.5, n47:0.5}, n47:{n46:0.5, n48:0.5}, n48:{n47:0.5, n49:0.5}, n49:{n48:0.5, n50:0.5},
	             n50:{n49:0.5, n51:0.5}, n51:{n50:0.5, n52:0.5}, n52:{n51:0.5, n53:0.5}, n53:{n52:0.5, n54:0.5}, n54:{n53:0.5, n55:0.5}, n55:{n54:0.5, n56:0.5}, n56:{n55:0.5, n57:0.5}, n57:{n56:0.5, n58:0.5}, n58:{n57:0.5, n59:0.5}, n59:{n58:0.5, n1:0.5}, n60:{n1:1, n61:1}, n61:{n60:1, n62:1}, n62:{n61:1, n63:1}, n63:{n62:1, n64:1}, n64:{n63:1, n65:1}, n65:{n64:1, n66:1}, n66:{n65:1, n67:1}, n67:{n66:1, n68:1}, n68:{n67:1, n69:1}, n70:{n31:0.5, n71:0.5}, n71:{n70:0.5, n72:0.5}, n72:{n71:0.5, n73:0.5}, n73:{n72:0.5, n74:0.5}, n74:{n73:0.5, n75:0.5}, n75:{n74:0.5, n76:0.5}, n76:{n75:0.5, n77:0.5}, n77:{n76:0.5, n78:0.5}, n78:{n77:0.5, n79:0.5}, n80:{n79:0.5, n81:0.5}, n81:{n80:0.5, n82:0.5}, n82:{n81:0.5, n83:0.5}, n83:{n82:0.5, n84:0.5}, n84:{n83:0.5, n85:0.5}, n85:{n84:0.5, n86:0.5}, n86:{n85:0.5, n87:0.5}, n87:{n86:0.5, n88:0.5}, n88:{n87:0.5, n89:0.5}, n89:{n88:0.5, n90:0.5}, n90:{n89:0.5, n91:0.5}, n91:{n90:0.5, n92:0.5}, n92:{n91:0.5, n93:0.5}, 
	             n93:{n92:0.5, n94:0.5}, n94:{n93:0.5, n95:0.5}, n95:{n94:0.5, n96:0.5}, n96:{n95:0.5, n97:0.5}, n97:{n96:0.5, n98:0.5}, n98:{n97:0.5, n99:0.5}, n99:{n98:0.5, n1:0.5}, n100:{n79:1, n101:1}, n101:{n100:1, n102:1}, n102:{n101:1, n103:1}, n103:{n102:1, n104:1}, n104:{n103:1, n105:1}, n105:{n104:1, n106:1}, n107:{n106:1, n108:1}, n108:{n107:1, n109:1}, n109:{n108:1, n110:1}, n110:{n109:1, n111:1}, n111:{n110:1, n112:1}, n112:{n111:1, n113:1}, n113:{n112:1, n114:1}, n114:{n113:1, n115:1}, n115:{n114:1, n116:1}, n116:{n115:1, n1:1}, n117:{n106:1, n118:1}, n118:{n117:1, n119:1}, n119:{n118:1, n120:1}, n120:{n119:1, n121:1}, n121:{n120:1, n122:1}, n122:{n121:1, n123:1}, n123:{n122:1, n124:1}, n124:{n123:1, n125:1}, n125:{n124:1, n126:1}, n126:{n125:1, n69:1}, n128:{n127:1, n129:1}, n129:{n128:1, n130:1}, n130:{n129:1, n131:1}, n131:{n130:1, n132:1}, n132:{n131:1, n133:1}, n133:{n132:1, n134:1}, n134:{n133:1, n135:1}, n135:{n134:1, n136:1}, 
	             n136:{n135:1, n137:1}, n137:{n136:1, n1:1}, n138:{n127:1, n139:1}, n139:{n138:1, n140:1}, n140:{n139:1, n141:1}, n141:{n140:1, n142:1}, n142:{n141:1, n143:1}, n143:{n142:1, n144:1}, n144:{n143:1, n145:1}, n145:{n144:1, n146:1}, n146:{n145:1, n147:1}, n147:{n146:1, n11:1}, n1:{n2:1, n59:1, n60:1, n99:1, n116:1, n137:1}, n11:{n10:1, n12:1, n40:1, n147:1, nIceCream3: 1}, n21:{n20:1, n22:1}, n31:{n30:1, n32:1, n41:1, n70:1}, n79:{n78:1, n80:1, n100:1}, n106:{n105:1, n107:1, n117:1}, n127:{n128:1, n138:1}, n69:{n68:1, n126:1} 
	             ,nIceCream3:{n11: 1, nIceCream2:1}, nIceCream2:{n11: 1, nIceCream1:1}, nIceCream1:{nIceCream2:1, nIceCream:1}, nIceCream:{nIceCream1:1, n14:1, n12:1}             
	};
	this.nodes = {n1:{id: 'n1', x:270, y: 356}, n2:{id: 'n2', x:266, y: 344}, n3:{id: 'n3', x:262, y: 332}, n4:{id: 'n4', x:258, y: 320}, n5:{id: 'n5', x:254, y: 308}, n6:{id: 'n6', x:250, y: 296}, n7:{id: 'n7', x:246, y: 284}, n8:{id: 'n8', x:242, y: 272}, n9:{id: 'n9', x:238, y: 260}, n10:{id: 'n10', x:234, y: 248}, n11:{id: 'n11', x:230, y: 240}, n12:{id: 'n12', x:218, y: 243}, n13:{id: 'n13', x:206, y: 246}, n14:{id: 'n14', x:194, y: 249}, n15:{id: 'n15', x:182, y: 252}, n16:{id: 'n16', x:170, y: 255}, n17:{id: 'n17', x:158, y: 258}, n18:{id: 'n18', x:146, y: 261}, n19:{id: 'n19', x:134, y: 264}, n20:{id: 'n20', x:122, y: 267}, n21:{id: 'n21', x:110, y: 276}, n22:{id: 'n22', x:110, y: 284}, n23:{id: 'n23', x:110, y: 292}, n24:{id: 'n24', x:110, y: 300}, n25:{id: 'n25', x:110, y: 308}, n26:{id: 'n26', x:110, y: 316}, n27:{id: 'n27', x:110, y: 324}, n28:{id: 'n28', x:110, y: 332}, n29:{id: 'n29', x:110, y: 340}, n30:{id: 'n30', x:110, y: 348}, n31:{id: 'n31', x:110, y: 356}, n32:{id: 'n32', x:122, y: 345}, n33:{id: 'n33', x:134, y: 334}, n34:{id: 'n34', x:146, y: 323}, n35:{id: 'n35', x:158, y: 312}, n36:{id: 'n36', x:170, y: 301}, n37:{id: 'n37', x:182, y: 290}, n38:{id: 'n38', x:194, y: 279}, n39:{id: 'n39', x:206, y: 268}, n40:{id: 'n40', x:218, y: 257}, n41:{id: 'n41', x:118, y: 356}, n42:{id: 'n42', x:126, y: 356}, n43:{id: 'n43', x:134, y: 356}, n44:{id: 'n44', x:142, y: 356}, n45:{id: 'n45', x:150, y: 356}, n46:{id: 'n46', x:158, y: 356}, n47:{id: 'n47', x:166, y: 356}, n48:{id: 'n48', x:174, y: 356}, n49:{id: 'n49', x:182, y: 356}, n50:{id: 'n50', x:190, y: 356}, n51:{id: 'n51', x:198, y: 356}, n52:{id: 'n52', x:206, y: 356}, n53:{id: 'n53', x:214, y: 356}, n54:{id: 'n54', x:222, y: 356}, n55:{id: 'n55', x:230, y: 356}, n56:{id: 'n56', x:238, y: 356}, n57:{id: 'n57', x:246, y: 356}, n58:{id: 'n58', x:254, y: 356}, n59:{id: 'n59', x:262, y: 356}, n60:{id: 'n60', x:271, y: 364}, n61:{id: 'n61', x:272, y: 372}, n62:{id: 'n62', x:273, y: 380}, n63:{id: 'n63', x:274, y: 388}, n64:{id: 'n64', x:275, y: 396}, n65:{id: 'n65', x:276, y: 404}, n66:{id: 'n66', x:277, y: 412}, n67:{id: 'n67', x:278, y: 420}, n68:{id: 'n68', x:279, y: 428}, n69:{id: 'n69', x:284, y: 438}, n70:{id: 'n70', x:110, y: 364}, n71:{id: 'n71', x:110, y: 372}, n72:{id: 'n72', x:110, y: 380}, n73:{id: 'n73', x:110, y: 388}, n74:{id: 'n74', x:110, y: 396}, n75:{id: 'n75', x:110, y: 404}, n76:{id: 'n76', x:110, y: 412}, n77:{id: 'n77', x:110, y: 420}, n78:{id: 'n78', x:110, y: 428}, n79:{id: 'n79', x:110, y: 436}, n80:{id: 'n80', x:118, y: 432}, n81:{id: 'n81', x:126, y: 428}, n82:{id: 'n82', x:134, y: 424}, n83:{id: 'n83', x:142, y: 420}, n84:{id: 'n84', x:150, y: 416}, n85:{id: 'n85', x:158, y: 412}, n86:{id: 'n86', x:166, y: 408}, n87:{id: 'n87', x:174, y: 404}, n88:{id: 'n88', x:182, y: 400}, n89:{id: 'n89', x:190, y: 396}, n90:{id: 'n90', x:198, y: 392}, n91:{id: 'n91', x:206, y: 388}, n92:{id: 'n92', x:214, y: 384}, n93:{id: 'n93', x:222, y: 380}, n94:{id: 'n94', x:230, y: 376}, n95:{id: 'n95', x:238, y: 372}, n96:{id: 'n96', x:246, y: 368}, n97:{id: 'n97', x:254, y: 364}, n98:{id: 'n98', x:262, y: 360}, n99:{id: 'n99', x:270, y: 356}, n100:{id: 'n100', x:125, y: 433}, n101:{id: 'n101', x:140, y: 430}, n102:{id: 'n102', x:155, y: 427}, n103:{id: 'n103', x:170, y: 424}, n104:{id: 'n104', x:185, y: 421}, n105:{id: 'n105', x:200, y: 418}, n106:{id: 'n106', x:200, y: 416}, n107:{id: 'n107', x:207, y: 410}, n108:{id: 'n108', x:214, y: 404}, n109:{id: 'n109', x:221, y: 398}, n110:{id: 'n110', x:228, y: 392}, n111:{id: 'n111', x:235, y: 386}, n112:{id: 'n112', x:242, y: 380}, n113:{id: 'n113', x:249, y: 374}, n114:{id: 'n114', x:256, y: 368}, n115:{id: 'n115', x:263, y: 362}, n116:{id: 'n116', x:270, y: 356}, n117:{id: 'n117', x:208, y: 418}, n118:{id: 'n118', x:216, y: 420}, n119:{id: 'n119', x:224, y: 422}, n120:{id: 'n120', x:232, y: 424}, n121:{id: 'n121', x:240, y: 426}, n122:{id: 'n122', x:248, y: 428}, n123:{id: 'n123', x:256, y: 430}, n124:{id: 'n124', x:264, y: 432}, n125:{id: 'n125', x:272, y: 434}, n126:{id: 'n126', x:280, y: 436}, n127:{id: 'n127', x:300, y: 240}, n128:{id: 'n128', x:296, y: 251}, n129:{id: 'n129', x:292, y: 262}, n130:{id: 'n130', x:288, y: 273}, n131:{id: 'n131', x:284, y: 284}, n132:{id: 'n132', x:280, y: 295}, n133:{id: 'n133', x:276, y: 306}, n134:{id: 'n134', x:272, y: 317}, n135:{id: 'n135', x:268, y: 328}, n136:{id: 'n136', x:264, y: 339}, n137:{id: 'n137', x:260, y: 350}, n138:{id: 'n138', x:293, y: 240}, n139:{id: 'n139', x:286, y: 240}, n140:{id: 'n140', x:279, y: 240}, n141:{id: 'n141', x:272, y: 240}, n142:{id: 'n142', x:265, y: 240}, n143:{id: 'n143', x:258, y: 240}, n144:{id: 'n144', x:251, y: 240}, n145:{id: 'n145', x:244, y: 240}, n146:{id: 'n146', x:237, y: 240}, n147:{id: 'n147', x:230, y: 240}
				,nIceCream:{id: "nIceCream", x:200, y:240}, nIceCream1:{id:"nIceCream1", x:208,y:240}, nIceCream2:{id:"nIceCream2",x:215,y:240}, nIceCream3:{id:"nIceCream3",x:223,y:240}		
	};
	this.keynodes = ['n1', 'n11', 'n21', 'n31', 'n69', 'n79', 'n106', 'n127', 'nIceCream' ];

	this.snackManFinalPath = new Array();
	this.mapGraph = {};
	
	this.createGraph();
	this.counter = [this.snackManFinalPath[2], this.snackManFinalPath[3], // n21, n31, n79
	                this.snackManFinalPath[5]];

	this.displayNode = this.snackManFinalPath[1];
	this.coolerNode = this.snackManFinalPath[4];

	this.boxOfFruitsNode = this.snackManFinalPath[6];
	this.juiceMachineNode = this.snackManFinalPath[7];
	this.iceCreamMachineNode = this.snackManFinalPath[8];
	
	this.heightCooker = 76;
	
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
	
	AvatarImgMaker.createMiniAnimationBody(Game.tempCtxDisplay, avatar);
	this.img = new Sprite({
			ticksPerFrame: 0,
			numberOfFrames: 3,
			horzSeq: true,
			x: this.currentNode.x,
			y: this.currentNode.y - this.heightCooker,
			width: 120,
			height: this.heightCooker,
			sourceY: 0,
			img : Game.tempDisplay
	});
 	
	this.imgCooker = this.img.image;
	
	var runCanvas = document.createElement("canvas");
	runCanvas.width = Game.tempDisplay.width; runCanvas.height = Game.tempDisplay.height;
	var runCanvasCtx = runCanvas.getContext('2d');
	
	AvatarImgMaker.createMiniAnimationBodyPlatter(runCanvasCtx, avatar);
	this.imgPlatter = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 3,
		horzSeq: true,
		x: this.currentNode.x,
		y: this.currentNode.y - this.heightCooker,
		width: 120,
		height: this.heightCooker,
		sourceY: 0,
		img : runCanvas
	});
	
	this.imgCookerPlatter = this.imgPlatter.image;
	
	this.cooler = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 4,
		horzSeq: true,
		x: 280,
		y: 360,
		width: 320,
		height: 80,
		sourceX: 0,
		sourceY: 0,
		img : PreloadImgs.get("cooler")
	});
	
	this.display = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 4,
		horzSeq: true,
		x: 200,
		y: 200,
		width: 160,
		height: 40,
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
			x: 200,
			y: 408,
			width: 96,
			height: 32,
			sourceX: 0,
			sourceY: 0,
			img : PreloadImgs.get("boxoffruits")
		});
		
		this.juiceMachine = new Sprite({
			ticksPerFrame: 0,
			numberOfFrames: 3,
			horzSeq: true,
			x: 320,
			y: 190,
			width: 120,
			height: 40,
			sourceX: 0,
			sourceY: 0,
			img : PreloadImgs.get("juicemachine")
		});
	}
	
	var icecream = mission.evaluate("count(//mission/commands/category[@name='icecream'])", mission, null,  XPathResult.ANY_TYPE, null);
	this.showIceCream = icecream.numberValue > 0; 
	if (this.showIceCream) {
		this.iceCreamMachine = new Sprite({
			ticksPerFrame: 0,
			numberOfFrames: 9,
			horzSeq: false,
			x: 160,
			y: 160,
			width: 40,
			height: 720,
			sourceX: 0,
			sourceY: 0,
			img : PreloadImgs.get("icecreammachine")
		});
		
	} else
		this.iceCreamMachine = null;
	
	this.installedMachines = [];
	this.extendedCommands = [];

	this.objective = {};
	
	this.objective.objectives = [];
	this.objective.ordered = objectives.getAttribute("ordered") === "true";

	this.objective.xpIndividual = parseInt(objectives.getAttribute("xpIndividual")); 
	this.objective.xpFinal = parseInt(objectives.getAttribute("xpFinal"));
	this.objective.xpTotalTime = parseInt(objectives.getAttribute("xpTotalTime"));
	
	var m = objectives.getAttribute("maxCommands");
	this.objective.maxCommands = parseInt( (m == null?"0":m) ); 
	
	m = objectives.getAttribute("maxCommandsReward");
	this.objective.maxCommandsReward = parseInt( (m == null?"0":m)  ); 
	
	m = objectives.getAttribute("maxCommandsRewardCoins");
	this.objective.maxCommandsRewardCoins = parseInt( (m == null?"0":m)  ); 
	
	this.objective.debug = objectives.getAttribute("debug") === "true"; 
	
	var children = objectives.getElementsByTagName("objective");
	
	var countTalk = 0;
	
	for (var i = 0; i < children.length; i++) {
		var obj = children[i].childNodes[0].nodeValue;
		
		if (obj === "talk") 
			countTalk++;
		
		this.createObjective(obj, children[i]);
	}
	
	if (countTalk > 0)
		this.createObjective("countTalk", countTalk);
		
	this.hasVarQtd = this.createAditionalObjective(objectives, "varQtd");
	this.hasCommQtd = this.createAditionalObjective(objectives, "commQtd");
	
	this.lastObjectiveAchieved = -1;
	this.allObjectivesAchieved = false;
	
	this.catched = 0;
	this.delivered = 0;
	
	this.talkText = null;
};

SnackMan.prototype.createObjective = function(key, elem) {

	var o = Objective.factory(key);
	var p = o.init(elem);
	this.objective.objectives.push(p);
	
};

SnackMan.prototype.createAditionalObjective = function(objectives, key) {
	var m = objectives.getAttribute(key);
	if (m != null) {

		this.createObjective(key, m);

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
	
	this.catched = 0;
	this.delivered = 0;
	
	this.talkText = null;
	
	this.img.image = this.imgCooker;
	
	this.img.x = this.currentNode.x;
	this.img.y = this.currentNode.y  - this.heightCooker;
	this.img.sourceY = 0;
	this.img.frameIndex = 1; // sprite in the middle is the initial sprite 
	
	this.cooler.sourceX = 0;
	this.cooler.frameIndex = 0;
	
	if (this.iceCreamMachine != null)
		this.iceCreamMachine.frameIndex = 0;
	
	this.lastObjectiveAchieved = -1;
	this.allObjectivesAchieved = false;
	for (var i=0; i<this.objective.objectives.length; i++)
		Objective.reset(this.objective.objectives[i]);
	
	for (var i = 0; i < this.installedMachines.length; i++) 
		this.installedMachines[i].machineCfg.production = [];

};

/**
 * Draw a speech bubble on an HTML5-Canvas.
 * Adapted by me (Adilson Vahldick)
 *
 * @author Alexander Thiemann <mail@agrafix.net>
 * @license CC BY-SA 2.0
 * 
 * @param ctx Canvas 2d context
 * @param text Text for the speech bubble
 * @param x bottom left x-coordinate of speech bubble
 * @param y bottom left y-coordinate of speech bubble
 *
 */
SnackMan.prototype.speechBubble = function(ctx, text, x, y) {
	
	var messure = ctx.measureText(text);
	
	var w = messure.width;
	if (w < 25)
	  w = 25;
	var h = 20;
	
	ctx.beginPath();
	ctx.strokeStyle="black";
	ctx.lineWidth="1";
	ctx.fillStyle="rgba(255, 255, 255, 0.8)";
	
	// corner of balloon
	ctx.moveTo(x, y);
	ctx.lineTo(x + 4, y);
	ctx.lineTo(x + 9, y+10);
	ctx.lineTo(x + 9, y);
	ctx.lineTo(x + w, y);
	
	ctx.quadraticCurveTo(x + 5 + w, y, x + 5 + w, y-(h*0.2)); // corner: right-bottom
	
	ctx.lineTo(x + 5 + w, y-(h*0.8)); // right
	
	ctx.quadraticCurveTo(x + 5 + w, y-h, x + w, y-h); // corner: right-top
	
	ctx.lineTo(x, y-h); // top
	
	ctx.quadraticCurveTo(x-5, y-h, x-5, y-(h*0.8)); // corner: left-top
	
	ctx.lineTo(x-5, y-(h*0.2)); // left
	
	ctx.quadraticCurveTo(x-5, y, x, y); // corner: left-bottom
	
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	
	ctx.textAlign = 'left';
	ctx.fillStyle = '#000';
	ctx.fillText(text, x, y-6);
	
};

SnackMan.prototype.draw = function(ctx) {
	
	this.drawInstalledMachines(ctx);
	this.display.draw(ctx);
	
	if (this.showJuice) 
		this.juiceMachine.draw(ctx);
	
	if (this.showIceCream) 
		this.iceCreamMachine.draw(ctx);
	
	this.img.draw(ctx);
	this.cooler.draw(ctx);

	if (this.showJuice) {
		this.boxOfFruits.draw(ctx);
	}
	
	if (this.talkText != null) {
		
		this.speechBubble(ctx, this.talkText, this.img.x, this.img.y);
		
	}
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
	
	
	if (cust < 1 || cust > 3) {
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
	
	this.update('XX'); // reset any speech bubble
	
	this.update('IM', 0);  // turn to front
	this.update('IM', 80); // turn to left to find a customer in the counter
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
	
	this.update('XX'); // reset any speech bubble
	
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

SnackMan.prototype.askWantHowManyDrinks = function() {
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	var qtd = found.askWantHowManyDrinks();
	
	this.verifyObjectives("askWantHowManyDrinks", found);
	
	return qtd;
	
};

SnackMan.prototype.hasThirsty = function() {
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	this.update('XX'); // reset any speech bubble
	
	this.update('IM', 0);  // turn to front
	this.verifyObjectives("askHasThirsty", found);

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
	
	this.update('XX'); // reset any speech bubble
	
	this.update('IM', 0);  // turn to front

	this.verifyObjectives("askForFood", found);
	
	return food;
};

SnackMan.prototype.askWantHowManyFoods = function() {
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	var qtd = found.askWantHowManyFoods();
	
	this.verifyObjectives("askWantHowManyFoods", found);
	
	return qtd;
	
};

SnackMan.prototype.hasHunger = function() {
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	this.update('XX'); // reset any speech bubble
	
	this.update('IM', 0);  // turn to front
	this.verifyObjectives("askHasHunger", found);
	
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

SnackMan.prototype.verifyGenericPickUp = function(order, machine) {
	
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
	if (order.data.descr.indexOf(machine.produce) == -1) {
		BlocklyApps.log.push(["fail", "$Error_only"+machine.typeOfDrinkFood.substring(0,1).toUpperCase() + machine.typeOfDrinkFood.substring(1)]);
		throw false;
	}
	
};

SnackMan.prototype.finishPickUp = function(order, machine) {
	var item = {type: "item", descr:"$$"+machine.produce, drinkOrFood: machine.drinkOrFood, source: order.data.source, sourceType: order.data.sourceType};
	
	this.catched++;
	
	return item; 
};

SnackMan.prototype.genericPickUp = function(order, machineCfg) {

	this.verifyGenericPickUp(order, machineCfg);
	
	var c = machineCfg.numberOfFrames - 1;
	for (var x = 0; x < c; x++)
		this.update('OM', machineCfg); 

	for (var x = 0; x < c; x++)
		this.update('CM', machineCfg); 

	this.update('IP'); 

	return this.finishPickUp(order, machineCfg);
	
};

SnackMan.prototype.genericPrepare = function(machineCfg, idxConfig) {
	
	if (this.currentNode.id != machineCfg.node.id) {
		BlocklyApps.log.push(["fail", machineCfg.errorIsntFront]);
		throw false;
	}
	
	// can only produce if there is no product in stock
	if (machineCfg.production.length > 0) {
		BlocklyApps.log.push(["fail", "$Error_StillHasProductInStock"]);
		throw false;
	}

	var confProd = machineCfg.commsProduce[idxConfig];
	var production = [];
	for (var i = 0; i < machineCfg.commsProduce[idxConfig].qtProduce; i++) {
		production.push({prodX: confProd.prodX, prodY: confProd.prodY, 
							prodXDelta: confProd.prodXDelta, prodYDelta: confProd.prodYDelta, 
							   prodImg: confProd.prodImg });	
	}
		
	var c = machineCfg.numberOfFrames;
	for (var x = 0; x < c; x++)
		this.update('OM', machineCfg); 
	
	this.update('PM', machineCfg, production);
	
};

SnackMan.prototype.genericOnlyPickUp = function(order, machineCfg) {

	this.verifyGenericPickUp(order, machineCfg);

	// is there some in stock ?
	if (machineCfg.production.length == 0) {
		BlocklyApps.log.push(["fail", "$Error_DoesntHaveProductInStock"]);
		throw false;
	}
	
	machineCfg.production.shift();
	this.update('KM', machineCfg);
	this.update('IP');
	
	var p = this.finishPickUp(order, machineCfg);
	return p;
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
	} else
		this.update('IO', null, this.catched - this.delivered);

	
};

SnackMan.prototype.talk = function(text) {
	
	this.update('TA', text);
	this.verifyObjectives("talk", text);
	this.verifyObjectives("countTalk");
	
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
	
	// make juice two times because there are two slides
	this.update('MJ'); 
	this.update('MJ'); 
	
	// hide  the fruit 
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
/**                    money methods                      */
/**********************************************************/

SnackMan.prototype.cashIn = function(value) {
	
	if (value == undefined) {
		BlocklyApps.log.push(["fail", "Error_variableNotInitialized", varName]);
		throw false;
	}
	
	if (isNaN(value)) {
		BlocklyApps.log.push(["fail", "Error_paramIsNotANumber"]);
		throw false;
	}
	
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	var ret = found.cashIn(value);
	this.verifyObjectives("cashIn", {allCustomers:false, customer:found});
	
	// TODO: o cozinheiro tem um balao com moedas e o cliente um balao com cedulas
	
	return ret;
};

SnackMan.prototype.giveChange = function(value, typeOfMoney) {
	
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	if (found.giveChange(value, typeOfMoney)) {
		
	      this.verifyObjectives("giveTheWholeChange", {allCustomers:false, customer:found});
		  this.verifyObjectives("giveSomeChange", {allCustomers:false, customer:found});
		  
	}
};

/**********************************************************/
/**                  ice cream methods                    */
/**********************************************************/

SnackMan.prototype.goToIceCreamMachine = function() {
	this.animateSnackMan(this.iceCreamMachineNode);
};

SnackMan.prototype.pickUpIceCream = function(order) {

	// is he in front of the ice cream machine ?
	if (this.currentNode.id != this.iceCreamMachineNode.id) {
		BlocklyApps.log.push(["fail", "Error_isntFrontIceCreamMachine"]);
		throw false;
	}
	
	var order_data = order.data;
	if (order_data === "\"$$$icecreamofchocolate\"" || 
			order_data === "\"$$$icecreamofstrawberry\"" || order_data === "\"$$$icecreamofvanilla\"") {
		// prepare a ice cream even there is no customer order
		// we create another variable, because changing order.data reflects outside 
		
		order_data = {type: "order", descr: order_data.substring(2, order_data.length-1), source: null, sourceType: null};
	}
	
	// does he have any order ? 
	if (order_data == null || order_data === undefined || (order_data.type != "order")) {
		BlocklyApps.log.push(["fail", "Error_doesntHaveOrder"]);
		throw false;
	}

	// does the order have the food of this place ?
	if (!((order_data.type === "order" && order_data.descr.indexOf("$$icecreamof") == 0))) {
		BlocklyApps.log.push(["fail", "Error_onlyIceCream"]);
		throw false;
	}
	
	var flavor = null;
	switch (order_data.descr) {
		case "$$icecreamofchocolate" : 
			flavor = 0;
			break;
					
		case "$$icecreamofvanilla" :
			flavor = 3;
			break;

		case "$$icecreamofstrawberry" :
			flavor = 6;
			break;

	}
	
	this.update("DI", flavor);
	this.update("DI", flavor+1);
	this.update("DI", flavor+2);
	
	this.update("UI", flavor+2);
	this.update("UI", flavor+1);
	this.update("UI", flavor);
	
	this.update('IP'); 

	var item = {type: "item", descr:order_data.descr, drinkOrFood: "food", source: order_data.source, sourceType: order_data.sourceType};
	this.verifyObjectives("catchFruits", item);
	this.catched++;
	
	return item; 
};

SnackMan.prototype.askWantHowManyIceCream = function() {
	
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	var qtd = found.askWantHowManyIceCream();
	
	this.verifyObjectives("askWantHowManyIceCream", found);
	
	return qtd;
	
};

SnackMan.prototype.askForIceCream = function() {
	var found = this.getCustomer();
	
	if (!found) {
		BlocklyApps.log.push(["fail", "Error_thereIsntCustomer"]);
		throw false;
	}
	
	var iceCream = found.askForIceCream();
	if (iceCream == null) {
		BlocklyApps.log.push(["fail", "Error_isntHungerForIceCream"]);
		throw false;
	}
	
	this.update('XX'); // reset any speech bubble
	
	this.update('IM', 0);  // turn to front

	this.verifyObjectives("askForIceCream", found);
	
	return iceCream;
	
};

/**********************************************************/
/**                    draw methods                       */
/**********************************************************/

SnackMan.prototype.animate = function(command, values) {
	if (command !== "IM") // the sequence of talk is TA and IM. So, if come any other command, can reset the text
		this.talkText = null;
	
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
	  		/*
	  		if (value != null)
	  			Game.missionMoney.amount += value;
	  		*/
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
	 		
	 	case 'OM':
	 		var machine = values.shift().machine;
	 		if (machine.invert == true)
	 			machine.invertDirection();	 		
	 		machine.update();
	 		break;
	 		
	 	case 'CM':
	 		var machine = values.shift().machine;
	 		if (machine.invert == false)
	 			machine.invertDirection();	 		
	 		machine.update();
	 		break;
	 		
	 	case 'PM':
	 		var machine = values.shift();
	 		machine.production = values.shift();
	 		break;
	 		
	 	case 'KM':
	 		break;
	 	
	 	case 'TA':
	 		this.talkText = values.shift();
	 		break;
	 	
	 	case 'DI': ;
	 	case 'UI':
	 		this.showIceCreamMachine(values.shift());
	 		break;

	  }
	  
};

SnackMan.prototype.changeSnackManImage = function(id) {

	this.img.sourceY = id;
	this.img.update();
	
};

SnackMan.prototype.changeSnackManPosition = function(ox, oy, nx, ny) {
	if (nx < ox)
		this.img.sourceY = 80;
	else
		if (nx > ox)
			this.img.sourceY = 160;
		else if (ny < oy)
			    this.img.sourceY = 240;
			 else
				this.img.sourceY = 0;
	
	this.img.update();
	
	this.img.x = nx;
	this.img.y = ny - this.heightCooker;
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

SnackMan.prototype.showIceCreamMachine = function(flavor) {
	this.iceCreamMachine.frameIndex = flavor;
};

/**********************************************************/
/**                 Installed Machines                    */
/**********************************************************/

SnackMan.prototype.drawInstalledMachines = function(ctx) {
	for (var i = 0; i < this.installedMachines.length; i++) {
		this.installedMachines[i].drawExt(ctx);
	}
};

SnackMan.prototype.installMachine = function(idmachine, machinename, machinex, machiney, machinepath, 
		                   machineErrorIsntFront, machineDrinkOrFood, machineTypeOfDrinkFood, commands, machineImg,
		                   machineNumberOfFrames, machineHeight) {
	
	var machineProduce = "machine" + idmachine + "-prod";
	
	var machine = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: machineNumberOfFrames,
		horzSeq: false,
		x: parseInt(machinex), y: parseInt(machiney),
		width: 32, height: machineHeight,
		sourceX: 0, sourceY: 0,
		img : PreloadImgs.get(machineImg)
	});
	
	machine.drawExt = function (ctx) {
		this.draw(ctx);
		
		for (var i = 0; i < this.machineCfg.production.length; i++) {
			var p = this.machineCfg.production[i];
			
			var img = PreloadImgs.get(p.prodImg);
			ctx.drawImage(img, this.x + p.prodX + (i*p.prodXDelta), this.y + p.prodY + (i*p.prodYDelta));
			
		}
	};
	
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
	machineCfg.numberOfFrames = machineNumberOfFrames;
	machineCfg.machine = machine;
	
	machineCfg.production = [];
	
	PreloadImgs.put('$' + machineProduce, 'images/$$' + machineProduce + '.png', true);	
	
	machine.machineCfg = machineCfg;

	machineCfg.commsProduce = [];
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
		
			case "P" :
				
				var confProduce = {};
				
				confProduce.qtProduce = parseInt(com[5]);
				confProduce.prodX = parseInt(com[6]);
				confProduce.prodY = parseInt(com[7]);
				confProduce.prodXDelta = parseInt(com[8]);
				confProduce.prodYDelta = parseInt(com[9]);
				confProduce.prodImg = com[10];
				
				machineCfg.commsProduce.push(confProduce);
				
				PreloadImgs.put(confProduce.prodImg, 'images/machine' + confProduce.prodImg + '.png', true);	
				
				run = new Function("machine", "hero.genericPrepare( machine, " +(machineCfg.commsProduce.length-1)+ " ); ");
				break;
			
			case "K" :
				run = new Function("machine", "order", "return hero.genericOnlyPickUp( order, machine ); ");
				break;
		
		}
		
		this.extendedCommands.push({name: com[0], nameLang: com[1], run: run, machine: machineCfg});
	}
	
};

SnackMan.prototype.hasMachineFor = function(product) {
	
	if (product === "hotdog" || product === "coke" || product === "juiceoforange" || product.indexOf("icecreamof") == 0)
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
	
	this.verifyObjectives("goesTo", {nx: this.img.x, ny: this.img.y+this.heightCooker});
};

SnackMan.prototype.verifyObjectives = function(key, options) {
	if (key === "deliver") {
		this.verifyObjectives("deliverGifts", options);
		this.verifyObjectives("customDeliver", options);
	}

	if (!Objective.verifyObjectives(key, options)) {
		return;
	}
	
	$.growl({ title: BlocklyApps.getMsg("NoBugs_goalAchieved"), 
		message: BlocklyApps.getMsg("NoBugs_achieved") + " " + (this.lastObjectiveAchieved+1) + 
						 " "  + BlocklyApps.getMsg("NoBugs_of") + " " +  this.objective.objectives.length});
	Game.alertGoalButton();
	
};

SnackMan.prototype.addReward = function(count, timeSpent, timeLimit, timeReward) {
	
	var ret = {totalXP: 0, baseXP: 0, totalCoins:0, baseCoins: 0, bonusXP : [], bonusCoins: []};
	if (this.allObjectivesAchieved) {
		
		var times = 3 - CountXP.times;
		if (times == 0)
			ret.totalXP = this.objective.xpFinal;
		else
			ret.totalXP = this.objective.xpIndividual*times;
		
		ret.baseXP = ret.totalXP;
		if (count <= this.objective.maxCommands) {
			
			if (this.objective.maxCommandsReward > 0) {
				
				ret.totalXP += this.objective.maxCommandsReward;
				
				ret.bonusXP.push({name: "Victory_MaxCommands", value: this.objective.maxCommandsReward, extraInfo: null});
			} else {
				
				ret.totalCoins += this.objective.maxCommandsRewardCoins;				
				ret.bonusCoins.push({name: "Victory_MaxCommands", value: this.objective.maxCommandsRewardCoins, extraInfo: null});
			}
				
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
				
				ret.bonusCoins.push({name: "Victory_TimeBonus", value: timeBonus, extraInfo: (minutes > 0 ? minutes + "'":"") + seconds + "\""});
				ret.totalCoins += timeBonus;
			}
		}
		
		
	}
	
	return ret;
	
};

