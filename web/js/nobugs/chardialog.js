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
 * Dialog with the character face as in RPG Maker games.
 * 
 * @fileoverview Core of conversation dialogs.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';
var CharacterDialog = {};
CharacterDialog =  function (left, top, showClose, evtClose, conversation) {

	var div = $("<div>").attr("id", "talkDlg").addClass("dlgTalk").appendTo("body");
	
	var divBaloon = $("<div>").addClass("dlgTalkBaloon");
	divBaloon.append($("<button id='dlgClose'>").addClass("dlgTalkClose"));
	divBaloon.append($("<div>").addClass("dlgTalkText"));
	
	var prevB = $("<button id='dlgPrevious'>").addClass("dlgTalkButton").addClass("nobugs_button")
		.append($("<img>").attr("src","images/talkprevious.png"));
	divBaloon.append(prevB);
	
	var nextB = $("<button id='dlgNext'>").addClass("dlgTalkButton").addClass("nobugs_button")
		.append($("<img>").attr("src","images/talknext.png"));
	divBaloon.append(nextB);
	
	var nextC = $("<button id='dlgCloseOK'>").addClass("dlgTalkButton").addClass("nobugs_button")
		.append($("<img>").attr("src","images/talknextclose.png"));
	divBaloon.append(nextC);
	
	div.append(divBaloon);
	
	var dlg = document.getElementById("talkDlg");
	dlg.style.display = "inline";
  	dlg.style.left = left + "px";
  	dlg.style.top = top + "px";

	var rightButtonStyle = {top: "200px", left: "700px"};
	var leftButtonStyle = {top: "200px", left: "600px"};

  	this.dlg = dlg;
  	this.conversation = conversation;
  	this.idx = 0;
  	this.previousChar = null;
  	this.evtClose = evtClose;
  	
  	this.leftChar = (left - 3) + "px";
  	this.topChar = (top-96) + "px";

  	this.txt = this.dlg.getElementsByClassName("dlgTalkText")[0];
  	this.updateText();

  	this.nextButton = nextB.get(0);
  	this.nextButton.onclick = this.next.bind(this);
	this.nextButton.style.top  = rightButtonStyle.top;
	this.nextButton.style.left = rightButtonStyle.left;

  	this.nextCloseButton = nextC.get(0);
  	this.nextCloseButton.onclick = this.nextClose.bind(this);
	this.nextCloseButton.style.top  = rightButtonStyle.top;
	this.nextCloseButton.style.left = rightButtonStyle.left;
  	
  	if (this.conversation.length == 1) {

	  	var nextShape = conversation[0].nextButton;
	  	if (nextShape === undefined)
	  		nextShape = "close";
	  	
	  	if (nextShape === "close")
	  		this.nextCloseButton.style.display = "inline";
	  	else 
	  		if (nextShape === "next") {
	  			
	  		  	this.nextButton.style.display = "inline";
	  		  	this.nextButton.onclick = this.nextClose.bind(this);
	  		} else {
	  			// show no button
	  		}
  		
  	} else {

	  	this.nextButton.style.display = "inline";
	 }

  	this.prevButton = prevB.get(0);
  	this.prevButton.onclick = this.previous.bind(this);
	this.prevButton.style.top  = leftButtonStyle.top;
	this.prevButton.style.left = leftButtonStyle.left;

	this.closeButton = this.dlg.getElementsByClassName("dlgTalkClose")[0];
	if (showClose)
		this.closeButton.onclick = this.nextClose.bind(this);
	else
		this.closeButton.style.display = "none";

	Cufon('.dlgTalkText');
};

CharacterDialog.prototype.show = function(style) {
  this.dlg.style.display = "inline";
  
  for (var s in style)
	  this.dlg.style[s] = style[s];
};

CharacterDialog.prototype.nextClose = function() {
	$("#talkDlg").remove();
	
	if (this.previousChar != null)
		this.previousChar.css("display", "none");
	if (this.evtClose != null)
		this.evtClose();
};

CharacterDialog.prototype.next = function() {
	this.idx++;
	this.updateText();

	if (this.idx == this.conversation.length-1) {

		this.nextButton.style.display = "none";
		this.nextCloseButton.style.display = "inline";

	}

	this.prevButton.style.display = "inline";
};

CharacterDialog.prototype.previous = function() {
	this.idx--;
	this.updateText();

	if (this.idx == 0) {

		this.prevButton.style.display = "none";

	}

	this.nextCloseButton.style.display = "none";
	this.nextButton.style.display = "inline";
};

CharacterDialog.prototype.updateText = function() {
	if (this.previousChar != null)
		this.previousChar.css("display", "none");
	
	var charType = this.conversation[this.idx].character;
	if (charType != null)
		this.previousChar = $("#" + charType).css("display", "inline").css("left", this.leftChar).css("top", this.topChar);
	

  	this.txt.innerHTML = this.conversation[this.idx].msg;
	Cufon('.dlgTalkText');
};

CharacterDialog.creates = function(x, y, finishFunction, msgs) {
	
	$("<img>").attr("id", "teachTalk").attr("src", "images/teacher.png").addClass("dlgCharPhoto").css("display", "none").appendTo("body");
	
	var config = [];
	msgs.forEach(function(msg) {
		config.push({character: "teachTalk", msg: msg});
	});
	
	new CharacterDialog(x, y, false, function(){$("#teachTalk").remove(); finishFunction();}, config);

};

