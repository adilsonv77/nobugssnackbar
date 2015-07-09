CharacterDialog =  function (left, top, showClose, evtClose, conversation) {

	var div = $("<div>").attr("id", "talkDlg").addClass("dlgTalk").appendTo("body");
	
	var divBaloon = $("<div>").addClass("dlgTalkBaloon");
	divBaloon.append($("<button>").addClass("dlgTalkClose"));
	divBaloon.append($("<div>").addClass("dlgTalkText"));
	
	var prevB = $("<button>").addClass("dlgTalkButton").addClass("nobugs_button")
		.append($("<img>").attr("src","images/talkprevious.png"));
	divBaloon.append(prevB);
	
	var nextB = $("<button>").addClass("dlgTalkButton").addClass("nobugs_button")
		.append($("<img>").attr("src","images/talknext.png"));
	divBaloon.append(nextB);
	
	var nextC = $("<button>").addClass("dlgTalkButton").addClass("nobugs_button")
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

	  	this.nextCloseButton.style.display = "inline";
  		
  	} else {

	  	this.nextButton.style.display = "inline";
	 }

  	this.prevButton = prevB.get(0);
  	this.prevButton.onclick = this.previous.bind(this);
	this.prevButton.style.top  = leftButtonStyle.top;
	this.prevButton.style.left = leftButtonStyle.left;

	this.closeButton = this.dlg.getElementsByClassName("dlgTalkClose")[0];
	if (showClose)
		this.closeButton.onclick = (function() { this.dlg.style.display = "none"; }).bind(this);
	else
		this.closeButton.style.display = "none";

	Cufon('.dlgTalkText');
};

CharacterDialog.prototype.show = function() {
  this.dlg.style.display = "inline";
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
	this.previousChar = $("#" + charType).css("display", "inline").css("left", this.leftChar).css("top", this.topChar);
	

  	this.txt.innerHTML = this.conversation[this.idx].msg;
	Cufon('.dlgTalkText');
};
