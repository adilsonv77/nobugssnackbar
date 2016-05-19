'use strict';

PreloadImgs.put('mission_selected', 'images/mission-completed.png');
PreloadImgs.put('mission_selected_high', 'images/mission-completed-hightlight.png');

var MissionSelection = {};

MissionSelection = function(level) {
	this.canvas = document.getElementById("mission_level");
	this.canvasCtx = this.canvas.getContext('2d');
	
	this.level = Game.loginData.missionHist[level-1];
	this.current = Game.loginData.missionIdx;
	this.hightlight = -1;
	
	this.mouseMoveWrapper = Blockly.bindEvent_(this.canvas, 'mousemove', this, this.mouseMove);
	this.clickWrapper = Blockly.bindEvent_(this.canvas, 'click', this, this.click);
	
	this.show();
};

MissionSelection.prototype.mouseMove = function(evt) {
    var mousePos = this.getMousePos(evt);
    var found = -1;
    
    for (var i=0; i<this.circles.length; i++) {
    	if (this.testMouseOver(mousePos.x, mousePos.y, this.circles[i].x, this.circles[i].y)) {
    		found = i;
    		break;
    	}
    }
    
    this.hightlight = found;
    this.show();
    this.canvas.style.cursor = (found==-1?"default":"pointer");
    
};

MissionSelection.prototype.click = function(evt) {
	
    var mousePos = this.getMousePos(evt);
    var found = -1;
    for (var i=0; i<this.circles.length; i++) {
    	if (this.testMouseOver(mousePos.x, mousePos.y, this.circles[i].x, this.circles[i].y)) {
    		found = i;
    		break;
    	}
    }

    if (found > -1) {
    	
    	LogClick.store("mission_level_"+(found+1));
    	var nextMission = true;
    	if (hero.verifyObjectives("clickMission", {missionId: found+1})) {
    		if (hero.allObjectivesAchieved) {
    			Game.verifyVictory();
    			nextMission = false;
    		}
    	}
    	
    	if (nextMission)
    		Game.nextMission(this.level[4], this.level[5], found+1, found+1<=this.level[3]);
    	
    }
};

MissionSelection.prototype.dispose = function() {
	
	Blockly.unbindEvent_(this.mouseMoveWrapper);
	Blockly.unbindEvent_(this.clickWrapper);
	
};

MissionSelection.prototype.getMousePos = function(evt) {
	var rect = this.canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
};

MissionSelection.prototype.testMouseOver = function(px, py, cx, cy) {
    var distX = Math.abs(px - cx),
    	distY = Math.abs(py - cy),
    	dist = Math.sqrt(distX * distX + distY * distY);
    
    return dist < 8;
};

MissionSelection.prototype.show = function() {
	
	var ctx = this.canvasCtx;
	var circ = 2*Math.PI;
	ctx.clearRect(0, 0, 500, 500);
	
	ctx.strokeStyle = "#ffd89d";
	
	var ref = 12;
	var raio = 6;
	var esp = 18;
	
	this.circles = [];
	
	for (var i = 0; i<this.level[2]; i++) {  
		ctx.beginPath();
		ctx.moveTo(ref+(i*esp)+raio, ref);
		ctx.arc(ref+(i*esp), ref, raio, 0, circ);
				
		this.circles.push({x: ref+(i*esp), y: ref});
		if (this.level[7][i] !== null) {
			if (i == this.hightlight) 
				ctx.fillStyle = "#ffd89d";
			else
				ctx.fillStyle = "#fff7eb";
			ctx.fill();
			
		}
		ctx.stroke();
		
		if (this.current-1 == i) {
			
			ctx.moveTo(ref+(i*esp)+raio+2, ref);
			ctx.arc(ref+(i*esp), ref, raio+2, 0, circ);
			ctx.stroke();
			
		}
		
		if (this.level[7][i] === "T") {
			if (i == this.hightlight) 
				ctx.drawImage(PreloadImgs.get('mission_selected_high'), (ref/2)+(i*esp), (ref/2)-3);
			else
				ctx.drawImage(PreloadImgs.get('mission_selected'), (ref/2)+(i*esp), (ref/2)-3);
		}
		
	}
	ctx.closePath();
	
};