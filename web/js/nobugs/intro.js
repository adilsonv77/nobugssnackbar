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
 * Introduction story of the game.
 * 
 * @fileoverview Screens of the game intro.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';

PreloadImgs.put("intro-background", "images/family_dinner.png", false);

var IntroGame = {};

IntroGame.start = function () {
	
	$("<div>").attr("id", "introback").append(
		   $("<img>").css("width", "700px").attr("src", "images/family_dinner.png")
		).appendTo("body");
	
	$("<img>").attr("id", "dadTalk").attr("src", "images/father.png").addClass("dlgCharPhoto").css("display", "none").appendTo("body");
	$("<img>").attr("id", "youTalk").attr("src", "images/you.png").addClass("dlgCharPhoto").css("display", "none").appendTo("body");
	$("<img>").attr("id", "momTalk").attr("src", "images/mother.png").addClass("dlgCharPhoto").css("display", "none").appendTo("body");
	$("<img>").attr("id", "grandmomTalk").attr("src", "images/grandmother.png").addClass("dlgCharPhoto").css("display", "none").appendTo("body");
	
	MyBlocklyApps.showDialog(document.getElementById("introback"), 
			null, false, true, true, null, {width: "auto"}, null, null, false);
	
	var d = document.getElementById("dialog");
	
	var dlg = new CharacterDialog(d.offsetLeft - 50 , (d.offsetTop + 340) , false, 
			IntroGame.finish,
			[{character: "dadTalk", msg: "Ent&#227;o Manuel... <br/><br/> J&#225; tens 20 anos e andas a fazer nada além de comer e dormir."}, 
			 {character: "momTalk", msg: "Outro"}, 
			 {character: "youTalk", msg: "terceira"},
			 {character: "dadTalk", msg: "Outro"}]);
	
	dlg.show();
	
	
};

IntroGame.finish = function() {
	$("#introback").remove();
	$("#dadTalk").remove();
	$("#youTalk").remove();
	$("#momTalk").remove();
	$("#grandmomTalk").remove();
	
	MyBlocklyApps.hideDialog();
	Game.logged();
};