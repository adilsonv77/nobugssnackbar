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
	
	IntroGame.track = new PlayAudio(["sound/DailyBeetle.mp3"], false);
	
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
			[{character: "dadTalk", msg: BlocklyApps.getMsg("Intro_Dlg1")}, 
			 {character: "momTalk", msg: BlocklyApps.getMsg("Intro_Dlg2")}, 
			 {character: "youTalk", msg: BlocklyApps.getMsg("Intro_Dlg3")},
			 {character: "dadTalk", msg: BlocklyApps.getMsg("Intro_Dlg4")},
			 {character: "grandmomTalk", msg: BlocklyApps.getMsg("Intro_Dlg5")},
			 {character: "momTalk", msg: BlocklyApps.getMsg("Intro_Dlg6")}, 
			 {character: "youTalk", msg: BlocklyApps.getMsg("Intro_Dlg7")},
			 {character: "dadTalk", msg: BlocklyApps.getMsg("Intro_Dlg8")},
			 {character: "youTalk", msg: BlocklyApps.getMsg("Intro_Dlg9")}]);
	
	IntroGame.track.play();
	dlg.show();
	
};

IntroGame.finish = function() {
	$("#introback").remove();
	$("#dadTalk").remove();
	$("#youTalk").remove();
	$("#momTalk").remove();
	$("#grandmomTalk").remove();
	
	MyBlocklyApps.hideDialog(true);
	Game.logged();
	IntroGame.track.stop();
	IntroGame.track.clear();
};

IntroGame.createDiv = function(id) {
	
	var div = $("<div id ='"+id+"'>")
		.css("height", "100%")
		.css("width", "100%")
		.css("position","fixed")
		.css("backgroundColor","grey")
		.css("opacity","0.5")
		.css("z-index", "1000")
	.prependTo("body");

	return div;
};

IntroGame.presentTeacher = function(fret) {
	IntroGame.createDiv("presentTeacher");
	var img = $("<img>").attr("id", "imgTeacher").attr("src", "images/teacher_talking.png").css("width", "30%")
						.css("position", "absolute").css("z-index", "2001").css("left", "150px").css("top", "50px");
	img.prependTo("body");
	
	var cdialog = new CharacterDialog(375, 200, false, IntroGame.closePresentTeacher, 
								[{character: null, msg: BlocklyApps.getMsg("Intro_PresentTeacher").format($("#playerName").html()), nextButton:"next"}]);
	
	$("#talkDlg").css("z-index", "2000");
	cdialog.show();
	IntroGame.fRet = fret;
	
};

IntroGame.closePresentTeacher = function() {
	$("#presentTeacher").remove();
	$("#imgTeacher").remove();
	IntroGame.fRet();
};

IntroGame.focusAvatar = function() {
	
	var div = IntroGame.createDiv("focusAvatar"); 
	
	var img = $("<img>").attr("id", "imgTeacher").attr("src", "images/teacher_point_hand.png").css("width", "30%")
						.css("position", "absolute").css("z-index", "2001").css("left", "100px").css("top", "50px");
	img.prependTo("body");

	var p = $("#avatarEditorButton").position();
	
	var focusButton = $("<button>").addClass("nobugs_button")
										.attr("id", "focusButton")
										.css("font-size", "14px")
										.css("width", "80px")
										.css("position", "relative")
										.css("top", p.top)
										.css("left", "10px")
										.html("Avatar");
		
	focusButton.click(IntroGame.closeFocusAvatar);
	div.append(focusButton);
	var cdialog = new CharacterDialog(375, 200, false, null, 
			[{character: null, msg: BlocklyApps.getMsg("Intro_AvatarEditor"), nextButton:null}]);

	$("#talkDlg").css("z-index", "2000");
	cdialog.show();
	IntroGame.cDialog = cdialog;
};

IntroGame.closeFocusAvatar = function() {
	
	IntroGame.cDialog.nextClose();
	$("#focusButton").remove();
	$("#focusAvatar").remove();
	$("#imgTeacher").remove();
	
	Game.openAvatarEditor(null, IntroGame.closeAvatarEditor);
};

IntroGame.closeAvatarEditor = function() {
	
	IntroGame.createDiv("closeAvatarEditor1").css("left", "526px");
	IntroGame.createDiv("closeAvatarEditor2").css("height", "100px").css("width", "518px");
	IntroGame.createDiv("closeAvatarEditor3").css("width", "110px").css("height", "305px").css("top", "100px");
	IntroGame.createDiv("closeAvatarEditor4").css("top", "405px").css("width", "518px");
	
	var img = $("<img>").attr("id", "imgTeacher-hand").attr("src", "images/teacher_attention_hand-hand.png").css("width", "105px%")
						.css("position", "absolute").css("z-index", "2001").css("left", "291px").css("top", "347px").css("height", "135px");
	
	img.prependTo("body");
	img = $("<img>").attr("id", "imgTeacher-body").attr("src", "images/teacher_attention_hand-body.png").css("width", "296px")
			.css("position", "absolute").css("z-index", "2001").css("left", "396px").css("top", "250px");
	img.prependTo("body");
	
	var cdialog = new CharacterDialog(400, 200, false, IntroGame.closePresentTeacher, 
								[{character: null, msg: BlocklyApps.getMsg("Intro_ClickSchool"), nextButton:null}]);
	
	$("#talkDlg").css("z-index", "2000");
	cdialog.show();
	
};

IntroGame.closeBeforeCity = function() {
	IntroGame.cDialog.nextClose();
	
	$("#closeAvatarEditor1").remove();
	$("#closeAvatarEditor2").remove();
	$("#closeAvatarEditor3").remove();
	$("#closeAvatarEditor4").remove();
	$("#imgTeacher-hand").remove();
	$("#imgTeacher-body").remove();
	
};