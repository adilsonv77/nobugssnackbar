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
 * @fileoverview The money management.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

var digitsImage = new Image();
digitsImage.src = "images/numbers.png";

function showMoney(amount, ctx) {
	
	var smoney = amount + ""; // convert to string
	while (smoney.length < 3) {
		smoney = "0" + smoney;
	}
	
	for (var i=0; i<3; i++) {
		var x = parseInt( smoney[i] ) * 16;
		ctx.drawImage(digitsImage, x, 0, 16, 16, 298+(i*13), 8, 16, 16);
	}
	
}