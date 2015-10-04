/**
 * NoBug's Snack Bar
 *
 * Copyright 2015 Adilson Vahldick.
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
 * Avatar editor and image maker
 * 
 * @fileoverview The avatar editor.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';

PreloadImgs.put("body", "images/cooker-body.png", false);
PreloadImgs.put("mouth-M", "images/cooker-mouth-m.png", false);
PreloadImgs.put("mouth-F", "images/cooker-mouth-f.png", false);
PreloadImgs.put("eyes-M", "images/cooker-eyes-m.png", false);
PreloadImgs.put("eyes-F", "images/cooker-eyes-f.png", false);
PreloadImgs.put("head", "images/cooker-head.png", false);
PreloadImgs.put("Hat-1", "images/cooker-hat-1.png", false);
PreloadImgs.put("Hat-2", "images/cooker-hat-2.png", false);
PreloadImgs.put("Clothes-1", "images/cooker-clothes-1.png", false);

PreloadImgs.put("Add-1", "images/cooker-add-1-m.png", false);
PreloadImgs.put("Add-2", "images/cooker-add-2-m.png", false);
PreloadImgs.put("Add-3", "images/cooker-add-3-m.png", false);

/*
PreloadImgs.put("add-1-F", "images/cooker-add-1-f.png", false);
PreloadImgs.put("add-2-F", "images/cooker-add-2-f.png", false);
PreloadImgs.put("add-3-F", "images/cooker-add-3-f.png", false);
*/

PreloadImgs.put("mini-body", "images/mini-cooker-body.png", false);
PreloadImgs.put("mini-mouth-M", "images/mini-cooker-mouth-m.png", false);
PreloadImgs.put("mini-mouth-F", "images/mini-cooker-mouth-f.png", false);
PreloadImgs.put("mini-eyes", "images/mini-cooker-eyes.png", false);
PreloadImgs.put("mini-head", "images/mini-cooker-head.png", false);
PreloadImgs.put("mini-Hat-1", "images/mini-cooker-hat-1.png", false);
PreloadImgs.put("mini-Hat-2", "images/mini-cooker-hat-2.png", false);
PreloadImgs.put("mini-Clothes-1", "images/mini-cooker-clothes-1.png", false);

PreloadImgs.put("mini-Add-1", "images/mini-cooker-add-1-m.png", false);
PreloadImgs.put("mini-Add-2", "images/mini-cooker-add-2-m.png", false);
PreloadImgs.put("mini-Add-3", "images/mini-cooker-add-3-m.png", false);

/* ******************************************************************** */
/*                     First row of cooker animation                    */
/* ******************************************************************** */

PreloadImgs.put("0#0.mini-Clothes-1", "images/mini-cooker-clothes-1-r0c0.png", false);
PreloadImgs.put("0#1.mini-Clothes-1", "images/mini-cooker-clothes-1.png", false);
PreloadImgs.put("0#2.mini-Clothes-1", "images/mini-cooker-clothes-1-r0c2.png", false);

PreloadImgs.put("0#0.mini-body", "images/mini-cooker-body-r0c0.png", false);
PreloadImgs.put("0#1.mini-body", "images/mini-cooker-body.png", false);
PreloadImgs.put("0#2.mini-body", "images/mini-cooker-body-r0c2.png", false);

PreloadImgs.put("0#0.mini-hand", "images/mini-cooker-body-r0c0-hand.png", false);
PreloadImgs.put("0#1.mini-hand", "", false);
PreloadImgs.put("0#2.mini-hand", "images/mini-cooker-body-r0c2-hand.png", false);

/* ******************************************************************** */
/*                     Second row of cooker animation                    */
/* ******************************************************************** */

PreloadImgs.put("1#0.mini-Clothes-1", "images/mini-cooker-clothes-1-r1c0.png", false);
PreloadImgs.put("1#1.mini-Clothes-1", "images/mini-cooker-clothes-1-r1c1.png", false);
PreloadImgs.put("1#2.mini-Clothes-1", "images/mini-cooker-clothes-1-r1c2.png", false);

PreloadImgs.put("1#0.mini-body", "images/mini-cooker-body-r1c0.png", false);
PreloadImgs.put("1#1.mini-body", "images/mini-cooker-body-r1c1.png", false);
PreloadImgs.put("1#2.mini-body", "images/mini-cooker-body-r1c2.png", false);

PreloadImgs.put("1#0.mini-hand", "images/mini-cooker-body-r1c0-hand.png", false);
PreloadImgs.put("1#1.mini-hand", "images/mini-cooker-body-r1c1-hand.png", false);
PreloadImgs.put("1#2.mini-hand", "images/mini-cooker-body-r1c2-hand.png", false);

PreloadImgs.put("1.mini-mouth-M", "images/mini-cooker-mouth-m-r1.png", false);
PreloadImgs.put("1.mini-mouth-F", "images/mini-cooker-mouth-f-r1.png", false);
PreloadImgs.put("1.mini-head", "images/mini-cooker-head-r1.png", false);
PreloadImgs.put("1.mini-eyes", "images/mini-cooker-eyes-r1.png", false);

/* ******************************************************************** */
/*                     Third row of cooker animation                    */
/* ******************************************************************** */

PreloadImgs.put("2#0.mini-Clothes-1", "images/mini-cooker-clothes-1-r2c0.png", false);
PreloadImgs.put("2#1.mini-Clothes-1", "images/mini-cooker-clothes-1-r2c1.png", false);
PreloadImgs.put("2#2.mini-Clothes-1", "images/mini-cooker-clothes-1-r2c2.png", false);

PreloadImgs.put("2#0.mini-body", "images/mini-cooker-body-r2c0.png", false);
PreloadImgs.put("2#1.mini-body", "images/mini-cooker-body-r2c1.png", false);
PreloadImgs.put("2#2.mini-body", "images/mini-cooker-body-r2c2.png", false);

PreloadImgs.put("2#0.mini-hand", "images/mini-cooker-body-r2c0-hand.png", false);
PreloadImgs.put("2#1.mini-hand", "images/mini-cooker-body-r2c1-hand.png", false);
PreloadImgs.put("2#2.mini-hand", "images/mini-cooker-body-r2c2-hand.png", false);

PreloadImgs.put("2.mini-mouth-M", "images/mini-cooker-mouth-m-r2.png", false);
PreloadImgs.put("2.mini-mouth-F", "images/mini-cooker-mouth-m-r2.png", false);
PreloadImgs.put("2.mini-head", "images/mini-cooker-head-r2.png", false);
PreloadImgs.put("2.mini-eyes", "images/mini-cooker-eyes-r2.png", false);

/* ******************************************************************** */
/*                     Fourth row of cooker animation                    */
/* ******************************************************************** */

PreloadImgs.put("3#0.mini-Clothes-1", "images/mini-cooker-clothes-1-r3c0.png", false);
PreloadImgs.put("3#1.mini-Clothes-1", "images/mini-cooker-clothes-1-r3c1.png", false);
PreloadImgs.put("3#2.mini-Clothes-1", "images/mini-cooker-clothes-1-r3c2.png", false);

PreloadImgs.put("3#0.mini-body", "images/mini-cooker-body-r0c0.png", false);
PreloadImgs.put("3#1.mini-body", "images/mini-cooker-body.png", false);
PreloadImgs.put("3#2.mini-body", "images/mini-cooker-body-r0c2.png", false);

PreloadImgs.put("3.mini-head", "images/mini-cooker-head.png", false);

PreloadImgs.put("3#0.mini-hand", "", false);
PreloadImgs.put("3#1.mini-hand", "", false);
PreloadImgs.put("3#2.mini-hand", "", false);

PreloadImgs.put("3.mini-eyes", "", false);

PreloadImgs.put("mini-Hat-1-back", "images/mini-cooker-hat-1-back.png", false);
PreloadImgs.put("mini-Hat-2-back", "images/mini-cooker-hat-2-back.png", false);

/* ******************************************************************** */
/*                                Platter                               */
/* ******************************************************************** */

PreloadImgs.put("0#0.mini-platter", "images/platter-r0.png", false);
PreloadImgs.put("0#1.mini-platter", "images/platter-r0.png", false);
PreloadImgs.put("0#2.mini-platter", "images/platter-r0c2.png", false);

PreloadImgs.put("1#0.mini-platter", "images/platter-r0.png", false);
PreloadImgs.put("1#1.mini-platter", "images/platter-r0.png", false);
PreloadImgs.put("1#2.mini-platter", "images/platter-r0.png", false);

PreloadImgs.put("2#0.mini-platter", "images/platter-r2c0.png", false);
PreloadImgs.put("2#1.mini-platter", "images/platter-r2c1.png", false);
PreloadImgs.put("2#2.mini-platter", "images/platter-r2c2.png", false);

PreloadImgs.put("3#0.mini-platter", "images/platter-r0.png", false);
PreloadImgs.put("3#1.mini-platter", "images/platter-r0.png", false);
PreloadImgs.put("3#2.mini-platter", "images/platter-r0.png", false);

var AvatarEditor = {};
var AvatarImgMaker = {};
var ae_Width = 288, ae_Height = 464, ae_TopHead = 118;

/****************************************************************************************/
/**                                  Functions                                         **/             
/****************************************************************************************/

function filterChangeColor(ctx, w, h, findColor, applyColor, ctxDest) {
	
	var imgData = ctx.getImageData(0,0,w,h);
	var imgDataDest = null;
	if (ctxDest != undefined)
		imgDataDest = ctxDest.getImageData(0,0,w,h);
	else {
		ctxDest = ctx;
		imgDataDest = imgData;
	}
		
	var destColor = applyColor;
	for (var i=0;i<imgData.data.length;i+=4)  {
	
		if (imgData.data[i+3] < 230) // skip transparent/semiTransparent pixels
			continue;
		
		var r = imgData.data[i];
		var g = imgData.data[i+1];
		var b = imgData.data[i+2];
		
		var d = Math.sqrt((r - findColor.r)*(r - findColor.r) + (g - findColor.g)*(g - findColor.g) + (b - findColor.b)*(b - findColor.b));
		if (d < 200){
		
			imgDataDest.data[i] = destColor.r;
			imgDataDest.data[i+1] = destColor.g;
			imgDataDest.data[i+2]= destColor.b;
		}
	}
	
	ctxDest.putImageData(imgDataDest,0,0);
	
};

/****************************************************************************************/
/**                                  Img Items Creation                                **/             
/****************************************************************************************/

var CreateItems = {};

CreateItems.hat = function (prefix, id, hatColor) {

	return {id: id, img: (id === ""?id:PreloadImgs.get(prefix + id)), x: 0, y: 0, width: ae_Width, height: 320,
		 baseColor: {r:255, g: 255, b: 255}, color: hatColor};

};

CreateItems.add = function (prefix, id, addColor) {

	return {id: id, img: (id === ""?id:PreloadImgs.get(prefix + id)), x: 0, y: ae_TopHead, width: ae_Width, height: 320,
		 baseColor: {r:0, g: 0, b: 0}, color: addColor};

};
 

CreateItems.clothes = function (prefix, id, coatColor, scarfColor) {
	
	var r = {img: PreloadImgs.get(prefix + id), x: 0, y: 228, width: ae_Width, height: 179,
		 baseColor: {r:255, g: 255, b: 255}, color: coatColor,
		 baseColor2: {r:255, g: 0, b: 0}, color2: scarfColor};
	
	r.id = id;
	
	return r;
};

CreateItems.mouth = function(prefix) {
	return {id: "mouth", img: PreloadImgs.get(prefix+"mouth-"+AvatarImgMaker.gender), x: 0, y: ae_TopHead, width: ae_Width, height: 172}; 
};

CreateItems.eyes = function (id, eyesColor) {
	if (id === "eyes")
		id += "-"+AvatarImgMaker.gender; 
	return {img: PreloadImgs.get(id), x: 0, y: ae_TopHead, width: ae_Width, height: 172,
		 baseColor: {r:255, g: 255, b: 0}, color: eyesColor};
};

CreateItems.head = function(id, colorHead) {

	return 	{img: PreloadImgs.get(id), x: 0, y: ae_TopHead, width: ae_Width, height: 172,
		 baseColor: {r:255, g: 255, b: 0}, color: colorHead};

};	
								 
CreateItems.body = function(id, colorBody) {

	return {img: PreloadImgs.get(id), x: 0, y: 0, width: ae_Width, height: ae_Height,
		 baseColor: {r:255, g: 255, b: 0}, color: colorBody};
	
};	

CreateItems.platter = function(id) {
	return {img: PreloadImgs.get(id), x: 0, y: 0, width: ae_Width, height: ae_Height,
		 baseColor: {r:255, g: 0, b: 0}, color: {r:255, g: 0, b: 0}};
	
};

/****************************************************************************************/
/**                                  Avatar Img Maker                                  **/             
/****************************************************************************************/

AvatarImgMaker.init = function() {

	if (AvatarImgMaker.initialized === true)
		return;
	
	AvatarImgMaker.initialized = true;
	
	AvatarImgMaker.canvasTemp = document.getElementById('avatarTemp');
	AvatarImgMaker.canvasTempCtx = AvatarImgMaker.canvasTemp.getContext('2d');
	
	AvatarImgMaker.canvasTemp2 = document.getElementById('avatarTemp2');
	AvatarImgMaker.canvasTemp2Ctx = AvatarImgMaker.canvasTemp2.getContext('2d');
	
	AvatarImgMaker.canvas = document.getElementById('avatar');
	AvatarImgMaker.canvasCtx = AvatarImgMaker.canvas.getContext('2d');

	AvatarImgMaker.keys = [];
	AvatarImgMaker.keys.push("body");
	AvatarImgMaker.keys.push("clothes");
	AvatarImgMaker.keys.push("head");
	AvatarImgMaker.keys.push("eyes");
	AvatarImgMaker.keys.push("hat");
	AvatarImgMaker.keys.push("mouth");
	AvatarImgMaker.keys.push("add");

};

AvatarImgMaker.configGender = function(gender) {
	
	AvatarImgMaker.mouth = PreloadImgs.get("mouth-"+gender);
	AvatarImgMaker.miniMouth = PreloadImgs.get("mini-mouth-"+gender);
	
	AvatarImgMaker.gender = gender;
};

function cloneArray(configOrig) {

	var ret = new Array();
	configOrig.forEach(function(entry) {
		ret.push(entry.slice());
	});
	return ret;
	
}	
	
AvatarImgMaker.createBody = function(canvasDest, configOrig, w, h) {

	// it is neccessary because changes the original array
	var config = cloneArray(configOrig);
	
	AvatarImgMaker.createItems(config, "");
	AvatarImgMaker._draw(AvatarImgMaker.canvasCtx, 0, 0, ae_Width, ae_Height, 1, AvatarImgMaker.mouth, ae_TopHead, AvatarImgMaker.keys, AvatarImgMaker.items, w, h);
	
	canvasDest.clearRect(0, 0, w, h);
	canvasDest.drawImage(AvatarImgMaker.canvas, 0, 0, w, h);

};

AvatarImgMaker.createMiniBody = function(canvasDest, configOrig) {
	
	// it is neccessary because changes the original array
	var config = cloneArray(configOrig);

	AvatarImgMaker.createItems(config, "mini-");
	
	AvatarImgMaker._draw(canvasDest, 0, 0, 50, 80, 6, AvatarImgMaker.miniMouth, 0, AvatarImgMaker.keys, AvatarImgMaker.items);
	
};

AvatarImgMaker.createMiniAnimationBody = function(canvasDest, configOrig) {

	// it is neccessary because changes the original array
	var config = cloneArray(configOrig);
	
	AvatarImgMaker.createItems(config, "mini-");
	
	var keys = [];
	
	keys.push("body");
	keys.push("clothes");
	keys.push("head");
	keys.push("eyes");
	keys.push("hat");
	keys.push("mouth");
	keys.push("add");
	
	canvasDest.clearRect(0,0,120,320);
	
	// row 0
	AvatarImgMaker._draw(canvasDest, 40, 0, 0, 0, 6, AvatarImgMaker.miniMouth, ae_TopHead, keys, AvatarImgMaker.items);

	keys.splice(2, 0, "hand");

	AvatarImgMaker.createRowItems("0#0.mini-");
	AvatarImgMaker._draw(canvasDest, 0, 0, 0, 0, 6, AvatarImgMaker.miniMouth, ae_TopHead, keys, AvatarImgMaker.items);
	
	AvatarImgMaker.createRowItems("0#2.mini-");
	AvatarImgMaker._draw(canvasDest, 80, 0, 0, 0, 6, AvatarImgMaker.miniMouth, ae_TopHead, keys, AvatarImgMaker.items);
	
	
	for (var j=1;j<=3;j++) {
		
		var miniMouth = null;
		if (j < 3) 
			miniMouth = PreloadImgs.get(j+".mini-mouth-"+AvatarImgMaker.gender);
		else {
			keys.splice(4, 1);
			if (AvatarImgMaker.items.hat.id !== "")
				AvatarImgMaker.items.hat.img = PreloadImgs.get("mini-"+AvatarImgMaker.items.hat.id + "-back");
		}
		
		AvatarImgMaker.items.head.img = PreloadImgs.get(j+".mini-head"); 
		AvatarImgMaker.items.eyes.img = PreloadImgs.get(j+".mini-eyes");
			
		for (var i = 0; i <= 2; i++) {
			var prefix = j+"#"+i+".mini-";
			AvatarImgMaker.createRowItems(prefix);
			
			AvatarImgMaker._draw(canvasDest, i * 40, 80 * j, 0, 0, 6, miniMouth, ae_TopHead, keys, AvatarImgMaker.items);
		}
	}
	
	
	
};

AvatarImgMaker.createMiniAnimationBodyPlatter = function(canvasDest, config) {

	AvatarImgMaker.createItems(config, "mini-");
	
	var keys = [];
	
	keys.push("body");
	keys.push("clothes");
	keys.push("platter");
	keys.push("head");
	keys.push("eyes");
	keys.push("hat");
	keys.push("mouth");
	keys.push("add");
	
	canvasDest.clearRect(0,0,120,320);
	
	// row 0
	AvatarImgMaker.items["platter"] = CreateItems.platter("0#1.mini-platter");
	AvatarImgMaker._draw(canvasDest, 40, 0, 0, 0, 6, AvatarImgMaker.miniMouth, ae_TopHead, keys, AvatarImgMaker.items);

	keys.splice(2, 0, "hand");

	AvatarImgMaker.createRowItems("0#0.mini-");
	AvatarImgMaker._draw(canvasDest, 0, 0, 0, 0, 6, AvatarImgMaker.miniMouth, ae_TopHead, keys, AvatarImgMaker.items);
	
	AvatarImgMaker.items["platter"] = CreateItems.platter("0#2.mini-platter");
	AvatarImgMaker.createRowItems("0#2.mini-");
	AvatarImgMaker._draw(canvasDest, 80, 0, 0, 0, 6, AvatarImgMaker.miniMouth, ae_TopHead, keys, AvatarImgMaker.items);
	
	
	for (var j=1;j<=3;j++) {
		
		var miniMouth = null;
		if (j < 3) 
			miniMouth = PreloadImgs.get(j+".mini-mouth-"+AvatarImgMaker.gender);
		else {
			keys.splice(5, 1);
			if (AvatarImgMaker.items.hat.id !== "")
				AvatarImgMaker.items.hat.img = PreloadImgs.get("mini-"+AvatarImgMaker.items.hat.id + "-back");
		}
		
		AvatarImgMaker.items.head.img = PreloadImgs.get(j+".mini-head"); 
		AvatarImgMaker.items.eyes.img = PreloadImgs.get(j+".mini-eyes");
			
		if (j == 1 || j == 3) {
				keys.splice(3, 1);
				keys.splice(0, 0, "platter");
		} else {
			keys.splice(0, 1);
			keys.splice(3, 0, "platter");
		}
		
		for (var i = 0; i <= 2; i++) {
			var prefix = j+"#"+i+".mini-";
			AvatarImgMaker.createRowItems(prefix);
			AvatarImgMaker.items["platter"] = CreateItems.platter(prefix + "platter");
			AvatarImgMaker._draw(canvasDest, i * 40, 80 * j, 0, 0, 6, miniMouth, ae_TopHead, keys, AvatarImgMaker.items);
		}
	}
	
};


AvatarImgMaker.createRowItems = function(prefix) {
	
	AvatarImgMaker.items.clothes.img = PreloadImgs.get(prefix + AvatarImgMaker.items.clothes.id);
	AvatarImgMaker.items.body.img = PreloadImgs.get(prefix + "body");
	AvatarImgMaker.items["hand"] = CreateItems.body(prefix + "hand", AvatarImgMaker.items.body.color);
	
};	

AvatarImgMaker.createItems = function(config, prefix) {
	
	AvatarImgMaker.items = [];

	config.forEach(function(entry) {
		
		var e = null;
		switch (entry[0]) {
			case "clothes":
				e = CreateItems[entry[0]](prefix, entry[1], hexToRgb(entry[2]), hexToRgb(entry[3]));
				break;
			case "body":
			case "skin":
				AvatarImgMaker.items["head"] = CreateItems.head(prefix + "head", hexToRgb(entry[2]));
				e = CreateItems.body(prefix + "body", hexToRgb(entry[2]));
				entry[0] = "body";
				break;
			case "add":;
			case "hat":
				e = CreateItems[entry[0]](prefix, entry[1], hexToRgb(entry[2]));
				break;
			default:
				e = CreateItems[entry[0]](prefix + entry[1], hexToRgb(entry[2]));
		}

		AvatarImgMaker.items[entry[0]] = e;
		
	});
	
};


AvatarImgMaker._draw = function(canvasDest, x, y, w, h, p, mouth, top, keys, items) {
	
	canvasDest.clearRect(x, y, w, h);

	keys.forEach(function(key) {
		var entry = items[key];
		
		if (entry.img === "")
			return;
		
		var ew = (entry.width/p) + 1;
		var eh = (entry.height/p) + 1;
		
		var eimg = entry.img;
		
		if (eimg.currentSrc === "")
			return;
		
		AvatarImgMaker.canvasTemp.width = ew;
		AvatarImgMaker.canvasTemp.height = eh;
		
		AvatarImgMaker.canvasTempCtx.clearRect(0, 0, ew, eh);
		AvatarImgMaker.canvasTempCtx.drawImage(eimg, 0, 0);
		
		if (entry.color2 == undefined) {
			if (entry.color !== undefined) // some peaces of body are unchangeabled
				filterChangeColor(AvatarImgMaker.canvasTempCtx, ew, eh, entry.baseColor, entry.color);
		} else {
		
			AvatarImgMaker.canvasTemp2.width = ew;
			AvatarImgMaker.canvasTemp2.height = eh;
		
			AvatarImgMaker.canvasTemp2Ctx.clearRect(0, 0, w, h);
			AvatarImgMaker.canvasTemp2Ctx.drawImage(eimg, 0, 0);
		
			filterChangeColor(AvatarImgMaker.canvasTemp2Ctx, ew, eh, entry.baseColor, entry.color, AvatarImgMaker.canvasTempCtx);
			
			filterChangeColor(AvatarImgMaker.canvasTemp2Ctx, ew, eh, entry.baseColor2, entry.color2, AvatarImgMaker.canvasTempCtx);
		}
		
		canvasDest.drawImage(AvatarImgMaker.canvasTemp, x+(entry.x/p), y+(entry.y/p));
		
	});
	/*
	if (mouth != null)
		canvasDest.drawImage(mouth, x, y + (top/p));
	 */
};

/****************************************************************************************/
/**                                  Avatar Editor                                     **/             
/****************************************************************************************/

AvatarEditor.initialized = false;

AvatarEditor.init = function() {
	
	if (AvatarEditor.initialized)
		return;
	
	$('#avatar-tabs').easytabs({
		animate: false, updateHash: false,
		tabActiveClass: "selected-tab",
		panelActiveClass: "displayed"
	});
	$("#avatar-tabs ul li a").addClass("nobugs_font_light");

	AvatarEditor.itemColor = {r: 255, g: 255, b: 255};
	AvatarEditor.items = [];
	AvatarEditor.miniItems = [];	
	AvatarEditor.keys = [];
	
	AvatarEditor.canvasTemp = document.getElementById('avatarTemp');
	AvatarEditor.canvasTempCtx = AvatarEditor.canvasTemp.getContext('2d');
	
	AvatarEditor.canvasTemp2 = document.getElementById('avatarTemp2');
	AvatarEditor.canvasTemp2Ctx = AvatarEditor.canvasTemp2.getContext('2d');
	
	AvatarEditor.canvas = document.getElementById('avatar');
	AvatarEditor.canvasCtx = AvatarEditor.canvas.getContext('2d');

	$('.avatar-item').click(AvatarEditor.selectItem);
	
	AvatarEditor.hatColor = {r: 255, g: 255, b: 255};
	$('#cpHat').colorpicker({history: false, displayIndicator: false});
	$('#cpHat').on("change.color", function(event, color){
		if (arguments.length == 3)
			AvatarEditor.hatColor = arguments[2];
		else
			AvatarEditor.hatColor = hexToRgb(color);
		AvatarEditor.changeColor(AvatarEditor.hatColor, '#tab-hats',{r: 255, g: 255, b: 255} );
		AvatarEditor.selectHat(AvatarEditor.hat);
		AvatarEditor.draw();
	});
	AvatarEditor.removeColorLines('#cpHat');
	$("#cpHat div:first-child").css("width", "0px");
	
	AvatarEditor.drawTab("#tab-hats");

	$("#tab-hats").on("click", function(evt) {
		if (evt.target.id === "tab-hats")
			$('#cpHat').trigger("change.color", [null, AvatarEditor.hatColor]);
	});

	$('#cpEyes').colorpicker({history: false, displayIndicator: false});
	$('#cpEyes').on("change.color", function(event, color){
		AvatarEditor.selectEye(color);
		AvatarEditor.draw();
	});
	AvatarEditor.removeColorLines('#cpEyes');
	AvatarEditor.choicesOfColor('#cpEyes', ["#000000", "#5977FF", "#188242"]);
	$("#cpEyes div:first-child").css("width", "0px");
	
	$('#cpSkin, #cpSkinSpecial').colorpicker({history: false, displayIndicator: false});
	$('#cpSkin, #cpSkinSpecial').on("change.color", function(event, color){
		AvatarEditor.selectSkin(color);
		AvatarEditor.draw();
	
	});
	AvatarEditor.removeColorLines('#cpSkin');
	AvatarEditor.choicesOfColor('#cpSkin', ["#F39C7A", "#AF876D", "#544035"]);
	
	AvatarEditor.removeColorLines('#cpSkinSpecial');
	AvatarEditor.choicesOfColor('#cpSkinSpecial', ["#FFD90F", "#88CCFF"]);
	
	$("#cpSkin div:first-child, #cpSkinSpecial div:first-child").css("width", "0px");

	$('#cpAdd').colorpicker({history: false, displayIndicator: false});
	AvatarEditor.removeColorLines('#cpAdd');
	AvatarEditor.choicesOfColor('#cpAdd', ["#000000", "#F2DA91", "#B73801", "#FFFFFF"]);
	$("#cpAdd div:first-child").css("width", "0px");
	$('#cpAdd').on("change.color", function(event, color){
		if (arguments.length == 3)
			AvatarEditor.addColor = arguments[2];
		else
			AvatarEditor.addColor = hexToRgb(color);
		AvatarEditor.changeColor(AvatarEditor.addColor, '#notab-adds', {r: 0, g: 0, b: 0} );
		AvatarEditor.selectAdd(AvatarEditor.add);
		AvatarEditor.draw();
	});
	AvatarEditor.addColor = {r: 0, g: 0, b: 0};
	
	AvatarEditor.drawTab("#notab-adds");

	$("#tab-body").on("click", function(evt) {
		if (evt.target.id === "tab-body")
			$('#cpAdd').trigger("change.color", [null, AvatarEditor.addColor]);
	});
	
	AvatarEditor.scarfColor = {r: 255, g: 0, b: 0};
	AvatarEditor.coatColor  = {r: 255, g: 255, b: 255};
	
	$('#cpCoat').colorpicker({history: false, displayIndicator: false});
	$('#cpCoat').on("change.color", function(event, color){
		if (arguments.length == 3)
			AvatarEditor.coatColor = arguments[2];
		else
			AvatarEditor.coatColor = hexToRgb(color);
		AvatarEditor.changeColor2Elements('#tab-clothes', AvatarEditor.coatColor, {r: 255, g: 255, b: 255}, AvatarEditor.scarfColor, {r: 255, g: 0, b: 0} );
		AvatarEditor.selectClothes(AvatarEditor.clothes);
		AvatarEditor.draw();
	});
	AvatarEditor.removeColorLines('#cpCoat');
	
	$('#cpScarf').colorpicker({history: false, displayIndicator: false});
	$('#cpScarf').on("change.color", function(event, color){
		AvatarEditor.scarfColor = hexToRgb(color);
		AvatarEditor.changeColor2Elements('#tab-clothes', AvatarEditor.coatColor, {r: 255, g: 255, b: 255}, AvatarEditor.scarfColor,  {r: 255, g: 0, b: 0} );
		AvatarEditor.selectClothes(AvatarEditor.clothes);
		AvatarEditor.draw();
	});
	AvatarEditor.removeColorLines('#cpScarf');
	
	AvatarEditor.drawTab("#tab-clothes");

	$("#tab-clothes").on("click", function(evt) {
		if (evt.target.id === "tab-clothes")
			$('#cpCoat').trigger("change.color", [null, AvatarEditor.coatColor]);
	});

	BlocklyApps.bindClick('avatarEditorOK', AvatarEditor.okClick);
    BlocklyApps.bindClick('avatarEditorCancel', AvatarEditor.cancelClick);

	/* cleaning the widget for my interests */
	$('.evo-more').remove();
	$('#cpHat .evo-palette tr').append($('<td>').css('background-color','#ffffff'));
	$('#cpCoat .evo-palette tr').append($('<td>').css('background-color','#ffffff'));
	$('#cpScarf .evo-palette tr').append($('<td>').css('background-color','#ffffff'));
	
	AvatarEditor.initialized = true;
};

AvatarEditor.cancelClick = function() {
	if (document.getElementById("blockhats") != null)
		$("#blockhats").remove();
	
	if (document.getElementById("blockclothes") != null)
		$("#blockclothes").remove();
	
	if (document.getElementById("blockskinSpecial") != null)
		$("#blockskinSpecial").remove();
	
	MyBlocklyApps.hideDialog(true); 
	
	if (AvatarEditor.afterCloseFunc !== undefined && AvatarEditor.afterCloseFunc !== null)
		AvatarEditor.afterCloseFunc();
};

AvatarEditor.okClick = function() {
	
	var avatar = Game.loginData.avatar;

	avatar[0] = ["skin", "", rgbToHex(AvatarEditor.skinColor)];
	avatar[1] = ["eyes", "eyes", rgbToHex(AvatarEditor.eyeColor)];
	avatar[2] = ["hat", AvatarEditor.hat, rgbToHex(AvatarEditor.hatColor)];
	avatar[3] = ["clothes", AvatarEditor.clothes, 
	             				rgbToHex(AvatarEditor.coatColor), 
	             				rgbToHex(AvatarEditor.scarfColor)];
	avatar[4] = ["mouth", ""];
	avatar[5] = ["add", AvatarEditor.add, rgbToHex(AvatarEditor.addColor)];
	
	AvatarEditor.cancelClick();
	
	Game.drawMiniAvatar();
	
	UserControl.saveAvatar(document.getElementById("avatarPlayer").toDataURL(), Game.loginData.avatar, Game.createsLeaderboard);
};

AvatarEditor.show = function(clothes, cloatColor, scarfColor, skin, eyes, hat, hatColor, add, addColor, afterCloseFunc) {
	
	AvatarEditor.itemColor = {r: 0, g: 0, b: 0};
	AvatarEditor.items = [];
	AvatarEditor.miniItems = [];	
	AvatarEditor.keys = [];
	
	$('#avatar-tabs').easytabs('select', '#tab-body');
	
	AvatarEditor.hatColor = hexToRgb(hatColor); 
	AvatarEditor.scarfColor = hexToRgb(scarfColor);
	AvatarEditor.coatColor = hexToRgb(cloatColor);
	AvatarEditor.addColor = hexToRgb(addColor);
	
	var pointsHat = "";
	if (hat.indexOf("blocked") == 0) {
		pointsHat = hat.split(":")[1];
		hat = "";
	}
	
	var pointsClothes = "";	
	if (clothes.indexOf("blocked") == 0) {
		pointsClothes = clothes.split(":")[1];
		clothes = clothes.split(":")[2];
	}
	
	var pointsSkin = "";	
	if (skin.indexOf("blocked") == 0) {
		pointsSkin = skin.split(":")[1];
		skin = skin.split(":")[2];
	}

	AvatarEditor.clothes = clothes;
	AvatarEditor.hat = hat;
	AvatarEditor.add = add;
	
	/* initialize the main appearance of the cooker */
	AvatarEditor.keys.push("body");
	
	AvatarEditor.changeColor2Elements('#tab-clothes', AvatarEditor.coatColor, {r: 255, g: 255, b: 255}, AvatarEditor.scarfColor,  {r: 255, g: 0, b: 0} );
	AvatarEditor.selectClothes(clothes);
	
	AvatarEditor.keys.push("head");
	
	AvatarEditor.selectSkin(skin);
	AvatarEditor.selectEye(eyes);
	
	AvatarEditor.changeColor(AvatarEditor.hatColor, '#tab-hats',{r: 255, g: 255, b: 255} );
	AvatarEditor.selectHat(hat);
	
	AvatarEditor.items["mouth"] = CreateItems.mouth("");
	AvatarEditor.miniItems["mouth"] = CreateItems.mouth("mini-");	
	
	AvatarEditor.keys.push("mouth");

	AvatarEditor.changeColor(AvatarEditor.addColor, '#notab-adds',{r: 255, g: 255, b: 255} );
	AvatarEditor.selectAdd(add);
	
	$('#avatar-tabs').bind('easytabs:after', function(evt, clicked, targetPanel) {
       
       $( targetPanel.selector ).trigger( "click" );
	});

	
	/* after configure all the components, it is allowed to show the tabs and draw de cooker */
	$("#avatar-tabs").css("display", "block");
	
	AvatarEditor.afterCloseFunc = afterCloseFunc;
	AvatarEditor.draw();
	
	MyBlocklyApps.showDialog(document.getElementById("profileditor"), 
			null, false, true, true, BlocklyApps.getMsg("Avatar_EditorTitle"), {width: "auto"},null);

	// here is better because all the components have their size (height and width)
	if (pointsHat !== "")
		AvatarEditor.blockTab(pointsHat, "hats");
	
	if (pointsClothes !== "")
		AvatarEditor.blockTab(pointsClothes, "clothes");
	
	if (pointsSkin !== "")
		AvatarEditor.blockElement(pointsSkin, "skinSpecial");
	
};

AvatarEditor.createBlock = function(id, h, w, mt) {
	return $("<div id ='block"+id+"'>")
				.css("height", h)
				.css("width", w)
				.css("margin-top", mt)
				.css("position","fixed")
				.css("backgroundColor","grey")
				.css("opacity","0.9");

};


AvatarEditor.createWarn = function(points, id, completeInfo) {
	
	var table = $("<table width='100%' height='100%'>").append($("<tr>").append($("<td align='center' id='avatar_info_"+id+"'>")));
	$("#block"+id).append(table);

	$("#avatar_info_" + id).append($("<span>").html((completeInfo?BlocklyApps.getMsg("Avatar_EnableByXp"):"") + points + "<img style='vertical-align: middle;' src='images/xp.png'/>")
										.addClass("nobugs_font"));
	
};

AvatarEditor.blockTab = function(points, id) {
	
	AvatarEditor.createBlock(id, "450px", "272px",  "-7px").prependTo("#tab-"+id);
	
	AvatarEditor.createWarn(points, id, true);
};


AvatarEditor.blockElement = function(points, id) {
	AvatarEditor.createBlock(id, "50px", "120px", "-15px").prependTo("#" + id);
	AvatarEditor.createWarn(points, id, false);
};

AvatarEditor.removeColorLines = function(divId) {
	
	var trs = $(divId + ' .evo-palette tr');
	trs.splice(trs.length-1, 1);
	trs.remove();
	
};

AvatarEditor.choicesOfColor = function(divId, colors) {
	var tr = $(divId + ' .evo-palette tr');
	tr.empty();

	for (var i = 0; i < colors.length; i++) {
		tr.append($("<td/>").css('background-color', colors[i]));
	}
	
};

AvatarEditor.draw = function() {
	
	AvatarImgMaker._draw(AvatarImgMaker.canvasCtx, 0, 0, ae_Width, ae_Height, 1, AvatarImgMaker.mouth, ae_TopHead, AvatarEditor.keys, AvatarEditor.items);
	AvatarImgMaker._draw(AvatarImgMaker.canvasCtx, ae_Width-50, ae_Height-85, 50, 80, 6, AvatarImgMaker.miniMouth, ae_TopHead, AvatarEditor.keys, AvatarEditor.miniItems);
	
};

AvatarEditor.selectItem = function(evt) {
	var id = this.id.split("-");
	
	AvatarEditor["select"+id[0]](this.id);
	
	AvatarEditor.draw();
};

AvatarEditor.selectHat = function(id) {
	if (id === "")
		return;
	
	if (AvatarEditor.keys.indexOf("hat") == -1)
		AvatarEditor.keys.push("hat");
	
	AvatarEditor.hat = id;
	
	AvatarEditor.items["hat"] = CreateItems.hat("", id, AvatarEditor.itemColor);
	AvatarEditor.miniItems["hat"] = CreateItems.hat("mini-", id, AvatarEditor.itemColor);
	
};

AvatarEditor.selectClothes = function(id) {
	
	if (AvatarEditor.keys.indexOf("clothes") == -1)
		AvatarEditor.keys.push("clothes");

	AvatarEditor.clothes = id;
	
	AvatarEditor.items["clothes"] = CreateItems.clothes("", id, AvatarEditor.coatColor, AvatarEditor.scarfColor);  
	AvatarEditor.miniItems["clothes"] = CreateItems.clothes("mini-", id, AvatarEditor.coatColor, AvatarEditor.scarfColor);  
	
};

AvatarEditor.selectEye = function(color) {
	
	AvatarEditor.eyeColor = hexToRgb(color);
	if (AvatarEditor.keys.indexOf("eyes") == -1)
		AvatarEditor.keys.push("eyes");

	AvatarEditor.items["eyes"] = CreateItems.eyes("eyes-"+AvatarImgMaker.gender, AvatarEditor.eyeColor);
	AvatarEditor.miniItems["eyes"] = CreateItems.eyes("mini-eyes", AvatarEditor.eyeColor);	
};

AvatarEditor.selectAdd = function(id) {
	if (id === "")
		return;
	
	if (AvatarEditor.keys.indexOf("add") == -1)
		AvatarEditor.keys.push("add");
	
	AvatarEditor.add = id;
	
	AvatarEditor.items["add"] = CreateItems.add("", id, AvatarEditor.itemColor);
	AvatarEditor.miniItems["add"] = CreateItems.add("mini-", id, AvatarEditor.itemColor);
	
};
 

AvatarEditor.selectSkin = function(color) {

	AvatarEditor.skinColor = hexToRgb(color);
	
	AvatarEditor.items["head"] = CreateItems.head("head", AvatarEditor.skinColor);
	AvatarEditor.items["body"] = CreateItems.body("body", AvatarEditor.skinColor);
	
	AvatarEditor.miniItems["head"] = CreateItems.head("mini-head", AvatarEditor.skinColor);
	AvatarEditor.miniItems["body"] = CreateItems.body("mini-body", AvatarEditor.skinColor);

};


AvatarEditor.drawTab = function(id, filter, findColor, newColor) {

   var canvases = $(id + " .avatar-item");
   
   for (var i=0; i<canvases.length; i++) {
   
	   var ctx = canvases[i].getContext('2d');
	
	   var img = PreloadImgs.get(canvases[i].id);
	   ctx.drawImage(img, 0, 0, canvases[i].width, canvases[i].height);
	   
	   if (filter !== undefined)
			filter(ctx, canvases[i].width, canvases[i].height, findColor, newColor);
   }
   
   
};

AvatarEditor.changeColor = function(newColor, id, findColor) {

	AvatarEditor.itemColor = newColor;
	
	AvatarEditor.drawTab(id, filterChangeColor, findColor, newColor);

};

AvatarEditor.changeColor2Elements = function(id, newColor1, findColor1, newColor2, findColor2) {
	
	var canvases = $(id + " .avatar-item");
	for (var i=0; i<canvases.length; i++) {
		
		var _width = canvases[i].width;
		var _height = canvases[i].height;
		
		AvatarEditor.canvasTemp2.width = _width;
		AvatarEditor.canvasTemp2.height = _height;
		AvatarEditor.canvasTemp2Ctx.clearRect(0, 0, _width, _height);

		var img = PreloadImgs.get(canvases[i].id);
		AvatarEditor.canvasTemp2Ctx.drawImage(img, 0, 0, _width, _height);

		var ctx = canvases[i].getContext('2d');
		ctx.drawImage(img, 0, 0, _width, _height);
		
		filterChangeColor(AvatarEditor.canvasTemp2Ctx, _width, _height, findColor1, newColor1, ctx);
		
		filterChangeColor(AvatarEditor.canvasTemp2Ctx, _width, _height, findColor2, newColor2, ctx);
	}			
	
};


