"use strict";

PreloadImgs.put('run', 'images/run.png');
PreloadImgs.put('runout', 'images/run_out.png');

var CountXP = {};

CountXP.init = function(canvasId, showCanvas) {
	
	CountXP.timeReset = true;

	if (CountXP.ctx != null)
		CountXP.stop(true);
	
	this.canvasId = canvasId;
	CountXP.ctx = document.getElementById(canvasId).getContext("2d");
	this.showCanvas = showCanvas;
	
};

//cfg: {aFraction, current, dif}
CountXP.config = function(byTime, cfg, pointsPerStar, pointsFinal, eventChangeStars, showPoints, stopShowingWhenReachTheTime, noXP) {
	
	CountXP.starting = true;
	CountXP.consumedMaxStars = false;
	CountXP.dif = 0;
	CountXP.current = 0;
	CountXP.aFraction = 1;
	CountXP.timeReset = false;
	
	$("#missionXP2").css("display", (noXP?"none":"inline"));
	$("#missionXP3").css("display", (noXP?"none":"inline"));
	$("#stopWatch").css("display", (noXP?"none":"inline"));

	if (noXP) {
		$("#xpPoints").html(pointsPerStar);
		if (eventChangeStars)
			eventChangeStars(0);
		return;
	}
	
	if (!this.showCanvas) {
		if (eventChangeStars)
			eventChangeStars(3);
		return;
	}
	
	if (cfg.dif == undefined)
		cfg.dif = 0;
	
	CountXP.byTime = byTime;
	if (byTime)
		document.getElementById(CountXP.canvasId).width = "32";
	else {
		document.getElementById(CountXP.canvasId).width = "40";
		CountXP.lastHowManyRuns = Game.howManyRuns;
	}
		
	CountXP.dif = cfg.dif;
	
	CountXP.runImg = PreloadImgs.get("run");
	CountXP.runOutImg = PreloadImgs.get("runout");

	CountXP.stopShowingWhenReachTheTime = (stopShowingWhenReachTheTime === undefined?false:stopShowingWhenReachTheTime);
	CountXP.eventChangeStars = eventChangeStars;
	CountXP.showPoints = showPoints;
	
	CountXP.aFraction = cfg.aFraction;
	CountXP.current = cfg.current;
	CountXP.freeWizardConsumed = cfg.freeWizardConsumed;
	
	CountXP.pointsFinal = pointsFinal;
	CountXP.changeImgs();
	
	
	if ((CountXP.getTimes() < 3) && (CountXP.showPoints)) {
		$("#xpPoints").html("x" + pointsPerStar);
		CountXP.draw();
	}
	CountXP.starting = false;
};
	
CountXP.start = function() {
	
	if (!this.showCanvas) {
		CountXP.ctx.clearRect(0, 0, 40, 40);
		return;
	}
	
	if (!CountXP.byTime)
		return;
	
	if (CountXP.getTimes() < 3) {
		CountXP.tick();
		CountXP.handler = setInterval(CountXP.tick, 1000);
	}
};

CountXP.stop = function(clearRect) {
	
	if (!this.showCanvas)
		return;
	
	if (clearRect && CountXP.ctx != null) {
		
		CountXP.ctx.clearRect(0, 0, 40, 40);
		
	}
	clearInterval(CountXP.handler);
	
};

CountXP.tick = function() {
	
	CountXP.draw();
	
	CountXP.sumCurrent();
	
};

CountXP.sumCurrent = function() {
	if (CountXP.stopShowingWhenReachTheTime && CountXP.getTimes() > 0) {
		CountXP.stop(false);
	}
	
	CountXP.current++;
	if (CountXP.getCurrent() > 0 && CountXP.getCurrent()%CountXP.aFraction == 0) {
		
		CountXP.changeImgs();
	
	}
};

CountXP.draw = function() {
	
	var ctx = CountXP.ctx;
	
	ctx.clearRect(0, 0, 40, 40);
	
	if (CountXP.byTime) {
		
		ctx.beginPath();
		ctx.arc(16,18,10,0,2*Math.PI);
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';		
		ctx.rect(15, 4, 2, 2);
		ctx.rect(13, 2, 6, 2);
		
		ctx.stroke();

		var clockPointer = CountXP.getCurrent()/CountXP.aFraction; // isso precisa ser revisto pois foi depois de umas mudancas drasticas 
		if (CountXP.stopShowingWhenReachTheTime && CountXP.getTimes() > 0) {
			clockPointer = 1;
		} 
		ctx.beginPath();
		ctx.arc(16,18,5,1.5*Math.PI,(1.5+((clockPointer)*2))*Math.PI, false);
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#ad2323';	
		ctx.stroke();

	} else {
		
		/*
		// CountXP.aFraction could be 1, 2 or 3
		
		var sizeImg = 32;
		switch (CountXP.aFraction) {
			case 2: sizeImg = 20; break;
			case 3: sizeImg = 12; break;
		}
		*/
		var sizeImg = 8;

		var y = 32 - sizeImg - 8;
		
		var cornerRadius = 10;
		var halfCornerRadius = cornerRadius/2;
		ctx.fillStyle = "#fff7eb";
		ctx.lineJoin = "round";
		ctx.lineWidth = cornerRadius;
		ctx.strokeStyle =  "#fff7eb";
		
		var rectX = 2, rectY = y, rectWidth = 4+(CountXP.aFraction*(2+sizeImg)), rectHeight = sizeImg+8;
		ctx.strokeRect(rectX+halfCornerRadius, rectY+halfCornerRadius, rectWidth-cornerRadius, rectHeight-cornerRadius);
		ctx.fillRect(rectX+halfCornerRadius, rectY+halfCornerRadius, rectWidth-cornerRadius, rectHeight-cornerRadius);
		

		y+=4;
		var yy = CountXP.aFraction - (CountXP.getCurrent()%CountXP.aFraction);
		for (var i = 0; i < CountXP.aFraction;  i++) {
			ctx.drawImage((i>=yy?CountXP.runOutImg:CountXP.runImg), 6+(i*(2+sizeImg)), y, sizeImg, sizeImg);
		}
		
		
		
	} 
	
};

CountXP.changeImgs = function() {
	if (!CountXP.showPoints) {
		return;
	}
		
	
	for (var x = 0; x < 3; x++) {
		document.getElementById("missionXP" + (x+1)).style.backgroundImage = "url(images/"+(3-CountXP.getTimes() >= (x+1)?"xp.png":"xp_disabled.png") + ")";
	}
	
	if (CountXP.eventChangeStars)
		CountXP.eventChangeStars(CountXP.getTimes());

	if (CountXP.getTimes() >= 3) {
		
		CountXP.clearTheWatch();
		
	}
};

CountXP.getEnabledStars = function() {
	return 3 - CountXP.getTimes();
};

CountXP.setConsumedMaxStars = function() {
	CountXP.stop();
	CountXP.consumedMaxStars = true;
	CountXP.changeImgs();
};

CountXP.clearTheWatch = function() {
	
	CountXP.ctx.clearRect(0, 0, 40, 40);
	$("#xpPoints").html("+" + CountXP.pointsFinal);
	CountXP.stop(true);
	
};

CountXP.resetTimes = function() {
	CountXP.timeReset = true;
};

CountXP.getTimes = function() {
	if (CountXP.timeReset)
		return undefined;
	
	var ret = 0;
	if (CountXP.freeWizardConsumed || CountXP.consumedMaxStars) {
		ret = 3;
	} else {
		
		ret = Math.floor(CountXP.getCurrent() / CountXP.aFraction);
		ret = (ret > 3?3:ret);
		
	}
	return ret;
};

CountXP.getCurrent = function() {
	var ret = CountXP.current + CountXP.dif;
	ret = (ret < 0?0:ret);
	return ret;
};

CountXP.newRun = function() {
	if (!Game.noXP && !Game.missionView && CountXP.lastHowManyRuns != Game.howManyRuns && !CountXP.byTime && CountXP.getTimes() < 3) {
		
		CountXP.lastHowManyRuns = Game.howManyRuns; // security to avoid enter into this "if" when it's not time do to this
		
		CountXP.sumCurrent();
		
		if (CountXP.getTimes() < 3)
		  CountXP.draw();
		
	}
		
};

CountXP.updateStars = function() {
	
	if (CountXP.byTime) 
		return;
	
	if (CountXP.getTimes() >= 3)
		CountXP.clearTheWatch();
	else
		CountXP.draw();
};