"use strict";

var CountXP = {};

CountXP.init = function(canvasId, showCanvas) {
	
	if (CountXP.ctx != null)
		CountXP.stop(true);
	
	CountXP.ctx = document.getElementById(canvasId).getContext("2d");
	this.showCanvas = showCanvas;
	
};

CountXP.config = function(umaFracao, current, pointsPerStar, pointsFinal, eventChangeStars, showPoints, stopShowingWhenReachTheTime) {
	
	if (!this.showCanvas)
		return;
	
	CountXP.stopShowingWhenReachTheTime = (stopShowingWhenReachTheTime === undefined?false:stopShowingWhenReachTheTime);
	CountXP.eventChangeStars = eventChangeStars;
	CountXP.showPoints = showPoints;
	
	CountXP.umaFracao = umaFracao;
	CountXP.current = current % umaFracao;
	CountXP.times = Math.floor(current / umaFracao);
	CountXP.times = (CountXP.times > 3?3:CountXP.times);
	
	CountXP.pointsFinal = pointsFinal;
	CountXP.starting = true;
	CountXP.changeImgs();
	
	if ((CountXP.times < 3) && (CountXP.showPoints)) {
		$("#xpPoints").html("X " + pointsPerStar);
		CountXP.draw();
	}
	CountXP.starting = false;
};
	
CountXP.start = function() {
	
	if (!this.showCanvas) {
		CountXP.ctx.clearRect(0, 0, 32, 32);
		return;
	}
	
	if (CountXP.times < 3) {
		CountXP.tick();
		CountXP.handler = setInterval(CountXP.tick, 1000);
	}
};

CountXP.stop = function(clearRect) {
	
	if (!this.showCanvas)
		return;
	
	if (clearRect && CountXP.ctx != null) {
		
		CountXP.ctx.clearRect(0, 0, 32, 32);
		
	}
	clearInterval(CountXP.handler);
	
};

CountXP.tick = function() {
	
	CountXP.draw();
	
	if (CountXP.stopShowingWhenReachTheTime && CountXP.times > 0) {
		CountXP.stop(false);
	}
	
	CountXP.current++;
	if (CountXP.current > CountXP.umaFracao) {
		CountXP.times++;
		
		CountXP.changeImgs();

		CountXP.current = 0;
	}
	
};

CountXP.draw = function() {
	
	var ctx = CountXP.ctx;
	
	ctx.clearRect(0, 0, 32, 32);
	
	ctx.beginPath();
	ctx.arc(16,18,10,0,2*Math.PI);
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#000000';		
	ctx.rect(15, 4, 2, 2);
	ctx.rect(13, 2, 6, 2);
	
	ctx.stroke();

	var clockPointer = CountXP.current/CountXP.umaFracao;
	if (CountXP.stopShowingWhenReachTheTime && CountXP.times > 0) {
		clockPointer = 1;
	} 
	ctx.beginPath();
	ctx.arc(16,18,5,1.5*Math.PI,(1.5+((clockPointer)*2))*Math.PI, false);
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#ad2323';	
	ctx.stroke();

};

CountXP.changeImgs = function() {
	if (!CountXP.showPoints) {
		return;
	}
		
	
	for (var x = 0; x < 3; x++) {
		document.getElementById("missionXP" + (x+1)).style.backgroundImage = "url(images/"+(CountXP.times >= (x+1)?"xp_disabled.png":"xp.png") + ")";
	}
	
	if (CountXP.eventChangeStars)
		CountXP.eventChangeStars(CountXP.times);

	if (CountXP.times >= 3) {
		
		CountXP.ctx.clearRect(0, 0, 32, 32);
		$("#xpPoints").html("+ " + CountXP.pointsFinal);
		CountXP.stop(true);
		
	}
};