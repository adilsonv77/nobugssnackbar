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

ProgressMoney.init = function(openMission) {
	this.openMission = openMission;
	
	if (openMission) {
		this.value = 0;
		
		$( "#progressMoney" ).progressbar({ value: 0, max: 100 });

		
		$('#progressMoney').show();
	}

};

ProgressMoney.draw = function(ctx) {
   if (!this.openMission) return;
	
   this.value += 1;
   $( "#progressMoney" ).progressbar("value" , this.value);
};
