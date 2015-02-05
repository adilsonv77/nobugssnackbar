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
 * @fileoverview Progress bar of money in open missions.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';

var ProgressMoney = {};

PreloadImgs.put("mission_points", "images/mission_points.png");
PreloadImgs.put("numbers", "images/numbers.png");


ProgressMoney = function(openMission, x, y) {
	this.x = x;
	this.y = y;
	
	this.openMission = openMission;
	this.amount = 0;
	
	this.digitsImage = PreloadImgs.get("numbers");
};

ProgressMoney.prototype.draw = function(ctx) {
	
	if (this.openMission) {
		ctx.drawImage(PreloadImgs.get("mission_points"), this.x-35, 0);
	}
	
	var smoney = this.amount + ""; // convert to string
	while (smoney.length < 3) {
		smoney = "0" + smoney;
	}
	
	for (var i=0; i<3; i++) {
		var x = parseInt( smoney[i] ) * 16;
		ctx.drawImage(this.digitsImage, x, 0, 16, 16, this.x+(i*13), this.y, 16, 16);
	}
	
};
