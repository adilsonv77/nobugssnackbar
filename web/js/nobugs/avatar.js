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
 * Avatar editor e image maker
 * 
 * @fileoverview The avatar editor.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';

PreloadImgs.put("body", "images/cooker-body.png", true);
PreloadImgs.put("mouth", "images/cooker-mouth.png", true);
PreloadImgs.put("eyes", "images/cooker-eyes.png", true);
PreloadImgs.put("head", "images/cooker-head.png", true);
PreloadImgs.put("Hat-1", "images/cooker-hat-1.png", true);
PreloadImgs.put("Hat-2", "images/cooker-hat-2.png", true);
PreloadImgs.put("Clothes-1", "images/cooker-clothes-1.png", true);

PreloadImgs.put("mini-body", "images/mini-cooker-body.png", true);
PreloadImgs.put("mini-mouth", "images/mini-cooker-mouth.png", true);
PreloadImgs.put("mini-eyes", "images/mini-cooker-eyes.png", true);
PreloadImgs.put("mini-head", "images/mini-cooker-head.png", true);
PreloadImgs.put("mini-Hat-1", "images/mini-cooker-hat-1.png", true);
PreloadImgs.put("mini-Hat-2", "images/mini-cooker-hat-2.png", true);
PreloadImgs.put("mini-Clothes-1", "images/mini-cooker-clothes-1.png", true);

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
	var color1 = rgbToHex(destColor.r, destColor.g, destColor.b);
	for (var i=0;i<imgData.data.length;i+=4)  {
	
		if (imgData.data[i+3] < 230) // skip transparent/semiTransparent pixels
			continue;
		
		var r = imgData.data[i];
		var g = imgData.data[i+1];
		var b = imgData.data[i+2];
		
		var d = Math.sqrt((r - findColor.r)*(r - findColor.r) + (g - findColor.g)*(g - findColor.g) + (b - findColor.b)*(b - findColor.b));
		if (d < 200){
		
		
			var color2 = rgbToHex(r, g, b);
			color2 = hexToRgb(shadeBlend(0.1, color1, color2));
		
			
			imgDataDest.data[i] = color2.r;
			imgDataDest.data[i+1] = color2.g;
			imgDataDest.data[i+2]= color2.b;
		}
	}
	
	ctxDest.putImageData(imgDataDest,0,0);
	
};

/****************************************************************************************/
/**                                  Img Items Creation                                **/             
/****************************************************************************************/

var CreateItems = {};

CreateItems.hat = function (id, hatColor) {

	return {img: PreloadImgs.get(id), x: 0, y: 0, width: ae_Width, height: 160,
		 baseColor: {r:255, g: 255, b: 255}, color: hatColor,
		 mini:PreloadImgs.get("mini-" + id)};

};

CreateItems.clothes = function (id, coatColor, scarfColor) {
	
	return {img: PreloadImgs.get(id), x: 0, y: 228, width: ae_Width, height: 179,
		 baseColor: {r:255, g: 255, b: 255}, color: coatColor,
		 baseColor2: {r:255, g: 0, b: 0}, color2: scarfColor,
		 mini:PreloadImgs.get("mini-" + id)};
		 
};

CreateItems.eyes = function (id, eyesColor) {
	
	return {img: PreloadImgs.get("eyes"), x: 0, y: ae_TopHead, width: ae_Width, height: 172,
		 baseColor: {r:255, g: 255, b: 0}, color: eyesColor,
		 mini:PreloadImgs.get("mini-eyes")};
};

CreateItems.head = function(id, colorHead) {

	return 	{img: PreloadImgs.get("head"), x: 0, y: ae_TopHead, width: ae_Width, height: 172,
		 baseColor: {r:255, g: 255, b: 0}, color: colorHead,
		 mini:PreloadImgs.get("mini-head")};

};	
								 
CreateItems.body = function(id, colorBody) {

	return {img: PreloadImgs.get("body"), x: 0, y: 0, width: ae_Width, height: ae_Height,
		 baseColor: {r:255, g: 255, b: 0}, color: colorBody,
		 mini:PreloadImgs.get("mini-body")};
	
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

AvatarImgMaker.createBody = function(canvasDest, config, w, h) {
	
	AvatarImgMaker.createItems(config);
	AvatarImgMaker._draw(AvatarImgMaker.canvasCtx, 0, 0, ae_Width, ae_Height, 1, false, ae_TopHead, AvatarImgMaker.keys, AvatarImgMaker.items, w, h);
	
	canvasDest.drawImage(AvatarImgMaker.canvas, 0, 0, w, h);

};

AvatarImgMaker.createMiniBody = function(canvasDest, config) {
	
	AvatarImgMaker.createItems(config);
	AvatarImgMaker._draw(canvasDest, 0, 0, 50, 80, 6, true, 0, AvatarImgMaker.keys, AvatarImgMaker.items);
	
};

AvatarImgMaker.createItems = function(config) {
	
	AvatarImgMaker.items = [];

	config.forEach(function(entry) {
		
		var e = null;
		switch (entry[0]) {
			case "clothes":
				e = CreateItems[entry[0]](entry[1], hexToRgb(entry[2]), hexToRgb(entry[3]));
				break;
			case "skin":
				AvatarImgMaker.items["head"] = CreateItems.head("head", hexToRgb(entry[2]));
				e = CreateItems.body("body", hexToRgb(entry[2]));
				entry[0] = "body";
				break;
			default:
				e = CreateItems[entry[0]](entry[1], hexToRgb(entry[2]));
		}

		AvatarImgMaker.items[entry[0]] = e;
		
	});
	
};


AvatarImgMaker._draw = function(canvasDest, x, y, w, h, p, mini, top, keys, items) {
	
	canvasDest.clearRect(x, y, w, h);

	keys.forEach(function(key) {
		var entry = items[key];
		
		var ew = (entry.width/p) + 1;
		var eh = (entry.height/p) + 1;
		
		var eimg = (mini?entry.mini:entry.img);
		
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
	
	canvasDest.drawImage((mini?AvatarImgMaker.miniMouth:AvatarImgMaker.mouth), x, y + (top/p));

};

/****************************************************************************************/
/**                                  Avatar Editor                                     **/             
/****************************************************************************************/

AvatarEditor.init = function() {
	$('#avatar-tabs').easytabs({
		animate: false, updateHash: false,
		tabActiveClass: "selected-tab",
		panelActiveClass: "displayed"
	});
	$("#avatar-tabs ul li a").addClass("nobugs_font_light");

	AvatarEditor.itemColor = {r: 255, g: 255, b: 255};
	AvatarEditor.items = [];	
	AvatarEditor.keys = [];
	
	AvatarEditor.canvasTemp = document.getElementById('avatarTemp');
	AvatarEditor.canvasTempCtx = AvatarEditor.canvasTemp.getContext('2d');
	
	AvatarEditor.canvasTemp2 = document.getElementById('avatarTemp2');
	AvatarEditor.canvasTemp2Ctx = AvatarEditor.canvasTemp2.getContext('2d');
	
	AvatarEditor.canvas = document.getElementById('avatar');
	AvatarEditor.canvasCtx = AvatarEditor.canvas.getContext('2d');

	$('.avatar-item').click(AvatarEditor.selectItem);
	
	$('#cpHat').colorpicker({history: false, displayIndicator: false});
	$('#cpHat').on("change.color", function(event, color){
		AvatarEditor.changeColor(hexToRgb(color), '#tab-hats',{r: 255, g: 255, b: 255} );
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
	});
	AvatarEditor.removeColorLines('#cpCoat');
	
	$('#cpScarf').colorpicker({history: false, displayIndicator: false});
	$('#cpScarf').on("change.color", function(event, color){
		AvatarEditor.scarfColor = hexToRgb(color);
		AvatarEditor.changeColor2Elements('#tab-clothes', AvatarEditor.coatColor, {r: 255, g: 255, b: 255}, AvatarEditor.scarfColor,  {r: 255, g: 0, b: 0} );
	});
	AvatarEditor.removeColorLines('#cpScarf');
	
	AvatarEditor.drawTab("#tab-clothes");
	
	/* cleaning the widget for my interests */
	$('.evo-more').remove();
	$('#cpHat .evo-palette tr').append($('<td>').css('background-color','#ffffff'));
	$('#cpCoat .evo-palette tr').append($('<td>').css('background-color','#ffffff'));
	
	/* initialize the main appearance of the cooker */
	AvatarEditor.keys.push("body");
	AvatarEditor.selectClothes("Clothes-1");
	AvatarEditor.keys.push("head");
	AvatarEditor.selectSkin("#F39C7A");
	AvatarEditor.selectEye("#000000");
	AvatarEditor.selectHat("Hat-1");
	
	/* after configure all the components, it is allowed to show the tabs and draw de cooker */
	$("#avatar-tabs").css("display", "block");
	
	AvatarEditor.draw();

};

AvatarEditor.removeColorLines = function(divId) {
	var trs = $(divId + ' .evo-palette tr');
	for(var i=0; i <9; i++)
		trs[i].remove();
};

AvatarEditor.choicesOfColor = function(divId, colors) {
	var tr = $(divId + ' .evo-palette tr');
	tr.empty();
	
	colors.forEach(function(entry) {
		tr.append($("<td/>").css('background-color',entry));
	});
};

AvatarEditor.draw = function() {
	
	AvatarImgMaker._draw(AvatarImgMaker.canvasCtx, 0, 0, ae_Width, ae_Height, 1, false, ae_TopHead);
	AvatarImgMaker._draw(AvatarImgMaker.canvasCtx, ae_Width-50, ae_Height-85, 50, 80, 6, true, ae_TopHead);
	
};

AvatarEditor.selectItem = function(evt) {
	var id = this.id.split("-");
	
	AvatarEditor["select"+id[0]](this.id);
	
	AvatarEditor.draw();
};

AvatarEditor.selectHat = function(id) {
	if (AvatarEditor.keys.indexOf("hat") == -1)
		AvatarEditor.keys.push("hat");
	AvatarEditor.items["hat"] = CreateItems.hat(id, AvatarEditor.itemColor);
	
};

AvatarEditor.selectClothes = function(id) {
	
	if (AvatarEditor.keys.indexOf("clothes") == -1)
		AvatarEditor.keys.push("clothes");
	AvatarEditor.items["clothes"] = CreateItems.clothes(id, AvatarEditor.coatColor, AvatarEditor.scarfColor);  
	
};

AvatarEditor.selectEye = function(color) {
	
	if (AvatarEditor.keys.indexOf("eyes") == -1)
		AvatarEditor.keys.push("eyes");
	AvatarEditor.items["eyes"] = CreateItems.eyes("eyes", hexToRgb(color));
		
};

AvatarEditor.selectSkin = function(color) {

	AvatarEditor.items["head"] = CreateItems.head("head", hexToRgb(color));

	AvatarEditor.items["body"] = CreateItems.body("body", hexToRgb(color));

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


