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
PreloadImgs.put("mouth", "images/cooker-mouth.png", false);
PreloadImgs.put("eyes", "images/cooker-eyes.png", false);
PreloadImgs.put("head", "images/cooker-head.png", false);
PreloadImgs.put("Hat-1", "images/cooker-hat-1.png", false);
PreloadImgs.put("Hat-2", "images/cooker-hat-2.png", false);
PreloadImgs.put("Clothes-1", "images/cooker-clothes-1.png", false);

PreloadImgs.put("mini-body", "images/mini-cooker-body.png", false);
PreloadImgs.put("mini-mouth", "images/mini-cooker-mouth.png", false);
PreloadImgs.put("mini-eyes", "images/mini-cooker-eyes.png", false);
PreloadImgs.put("mini-head", "images/mini-cooker-head.png", false);
PreloadImgs.put("mini-Hat-1", "images/mini-cooker-hat-1.png", false);
PreloadImgs.put("mini-Hat-2", "images/mini-cooker-hat-2.png", false);
PreloadImgs.put("mini-Clothes-1", "images/mini-cooker-clothes-1.png", false);

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

PreloadImgs.put("1.mini-mouth", "images/mini-cooker-mouth-r1.png", false);
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

PreloadImgs.put("2.mini-mouth", "images/mini-cooker-mouth-r2.png", false);
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

CreateItems.clothes = function (prefix, id, coatColor, scarfColor) {
	
	var r = {img: PreloadImgs.get(prefix + id), x: 0, y: 228, width: ae_Width, height: 179,
		 baseColor: {r:255, g: 255, b: 255}, color: coatColor,
		 baseColor2: {r:255, g: 0, b: 0}, color2: scarfColor};
	
	r.id = id;
	
	return r;
};

CreateItems.eyes = function (id, eyesColor) {
	
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

	AvatarImgMaker.mouth = PreloadImgs.get("mouth");
	AvatarImgMaker.miniMouth = PreloadImgs.get("mini-mouth");
	
	AvatarImgMaker.keys = [];
	AvatarImgMaker.keys.push("body");
	AvatarImgMaker.keys.push("clothes");
	AvatarImgMaker.keys.push("head");
	AvatarImgMaker.keys.push("eyes");
	AvatarImgMaker.keys.push("hat");

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
			miniMouth = PreloadImgs.get(j+".mini-mouth");
		else {
			keys.splice(4, 1);
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
			miniMouth = PreloadImgs.get(j+".mini-mouth");
		else {
			keys.splice(5, 1);
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
			case "hat":
				e = CreateItems.hat(prefix, entry[1], hexToRgb(entry[2]));
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
		
		AvatarImgMaker.canvasTemp.width = ew;
		AvatarImgMaker.canvasTemp.height = eh;
		
		AvatarImgMaker.canvasTempCtx.clearRect(0, 0, ew, eh);
		AvatarImgMaker.canvasTempCtx.drawImage(eimg, 0, 0);
		
		if (entry.color2 == undefined) {
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
	if (mouth != null)
		canvasDest.drawImage(mouth, x, y + (top/p));

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
		AvatarEditor.hatColor = hexToRgb(color);
		AvatarEditor.changeColor(AvatarEditor.hatColor, '#tab-hats',{r: 255, g: 255, b: 255} );
		AvatarEditor.selectHat(AvatarEditor.hat);
		AvatarEditor.draw();
	});
	AvatarEditor.removeColorLines('#cpHat');
	$("#cpHat div:first-child").css("width", "0px");
	
	AvatarEditor.drawTab("#tab-hats");

	$('#cpEyes').colorpicker({history: false, displayIndicator: false});
	$('#cpEyes').on("change.color", function(event, color){
		AvatarEditor.selectEye(color);
		AvatarEditor.draw();
	});
	AvatarEditor.removeColorLines('#cpEyes');
	AvatarEditor.choicesOfColor('#cpEyes', ["#000000", "#5977FF", "#188242"]);
	$("#cpEyes div:first-child").css("width", "0px");
	
	$('#cpSkin').colorpicker({history: false, displayIndicator: false});
	$('#cpSkin').on("change.color", function(event, color){
		AvatarEditor.selectSkin(color);
		AvatarEditor.draw();
	
	});
	AvatarEditor.removeColorLines('#cpSkin');
	AvatarEditor.choicesOfColor('#cpSkin', ["#F39C7A", "#AF876D", "#544035"]);
	$("#cpSkin div:first-child").css("width", "0px");
	
	AvatarEditor.scarfColor = {r: 255, g: 0, b: 0};
	AvatarEditor.coatColor  = {r: 255, g: 255, b: 255};
	
	$('#cpCoat').colorpicker({history: false, displayIndicator: false});
	$('#cpCoat').on("change.color", function(event, color){
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
	
	AvatarEditor.cancelClick();
	
	UserControl.saveAvatar(Game.loginData.avatar, Game.drawMiniAvatar);
};

AvatarEditor.show = function(clothes, cloatColor, scarfColor, skin, eyes, hat, hatColor, afterCloseFunc) {
	
	$('#avatar-tabs').easytabs('select', '#tab-body');
	
	AvatarEditor.hatColor = hexToRgb(hatColor); 
	AvatarEditor.scarfColor = hexToRgb(scarfColor);
	AvatarEditor.coatColor = hexToRgb(cloatColor);
	
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

	AvatarEditor.clothes = clothes;
	AvatarEditor.hat = hat;
	
	/* initialize the main appearance of the cooker */
	if (AvatarEditor.keys.indexOf("body") == -1)
		AvatarEditor.keys.push("body");
	
	AvatarEditor.changeColor2Elements('#tab-clothes', AvatarEditor.coatColor, {r: 255, g: 255, b: 255}, AvatarEditor.scarfColor,  {r: 255, g: 0, b: 0} );
	AvatarEditor.selectClothes(clothes);
	
	if (AvatarEditor.keys.indexOf("head") == -1)
		AvatarEditor.keys.push("head");
	
	AvatarEditor.selectSkin(skin);
	AvatarEditor.selectEye(eyes);
	
	AvatarEditor.changeColor(AvatarEditor.hatColor, '#tab-hats',{r: 255, g: 255, b: 255} );
	AvatarEditor.selectHat(hat);
	
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
	
};

AvatarEditor.blockTab = function(points, id) {
	
	$("<div id ='block"+id+"'>")
			.css("height", "450px")
			.css("width", "272px")
			.css("margin-top", "-7px")
			.css("position","fixed")
			.css("backgroundColor","grey")
			.css("opacity","0.9")
		.prependTo("#tab-"+id);
	
	var table = $("<table width='100%' height='100%'>").append($("<tr>").append($("<td align='center' id='avatar_info_"+id+"'>")));
	$("#block"+id).append(table);

	$("#avatar_info_" + id).append($("<span>").html(BlocklyApps.getMsg("Avatar_EnableByXp") + points + "<img style='vertical-align: middle;' src='images/xp.png'/>")
										.addClass("nobugs_font"));
};

AvatarEditor.removeColorLines = function(divId) {
	
	var trs = $(divId + ' .evo-palette tr');
	trs.splice(trs.length-1, 1);
	trs.remove();
	
};

AvatarEditor.choicesOfColor = function(divId, colors) {
	var tr = $(divId + ' .evo-palette tr');
	tr.empty();
	
	colors.forEach(function(entry) {
		tr.append($("<td/>").css('background-color',entry));
	});
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

	AvatarEditor.items["eyes"] = CreateItems.eyes("eyes", AvatarEditor.eyeColor);
	AvatarEditor.miniItems["eyes"] = CreateItems.eyes("mini-eyes", AvatarEditor.eyeColor);	
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


