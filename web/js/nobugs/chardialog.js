CharacterDialog =  function (charType, left, top, msg) {

	var dlg = document.getElementById(charType);
  	dlg.style.left = left;
  	dlg.style.top = top;

	this.rightButtonStyle = {top: top + 230 - 40, left: left + 700};
	this.leftButtonStyle = {top: top + 230 - 40, left: left + 600};

  	this.dlg = dlg;
  	this.msg = msg;
  	this.idx = 0;

  	this.txt = this.dlg.getElementsByClassName("dlgTalkText")[0];
  	this.txt.innerHTML = this.msg[this.idx];

  	this.nextButton = this.dlg.getElementsByClassName("dlgTalkNext")[0];
  	this.nextButton.onclick = this.next.bind(this);

  	if (this.msg.length > 1) {
		this.nextButton.style.top  = this.rightButtonStyle.top;
		this.nextButton.style.left = this.rightButtonStyle.left;

	  	this.nextButton.style.display = "inline";
	 }

  	this.prevButton = this.dlg.getElementsByClassName("dlgTalkPrevious")[0];
  	this.prevButton.onclick = this.previous.bind(this);

	this.closeButton = this.dlg.getElementsByClassName("dlgTalkClose")[0];
	this.closeButton.style.top = top - 30;
	this.closeButton.style.left = left + 760;

	this.closeButton.onclick = (function() { this.dlg.style.display = "none"; }).bind(this);

	Cufon('.dlgTalkText');
}

CharacterDialog.prototype.show = function() {
  this.dlg.style.display = "inline";
}

CharacterDialog.prototype.next = function() {
	this.idx++;
	this.updateText();

	if (this.idx == this.msg.length-1) {

		this.nextButton.style.display = "none";

		this.prevButton.style.top  = this.rightButtonStyle.top;
		this.prevButton.style.left = this.rightButtonStyle.left;

	} else {

		this.prevButton.style.top  = this.leftButtonStyle.top;
		this.prevButton.style.left = this.leftButtonStyle.left;

	}

	this.prevButton.style.display = "inline";
}

CharacterDialog.prototype.previous = function() {
	this.idx--;
	this.updateText();

	if (this.idx == 0) {

		this.prevButton.style.display = "none";

	} else {

		this.prevButton.style.top  = this.leftButtonStyle.top;
		this.prevButton.style.left = this.leftButtonStyle.left;

	}

	this.nextButton.style.display = "inline";
}

CharacterDialog.prototype.updateText = function() {
  	this.txt.innerHTML = this.msg[this.idx];
	Cufon('.dlgTalkText');
}
