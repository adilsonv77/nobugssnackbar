var StatusMissions = {};

StatusMissions.hMax = 100;
StatusMissions.iframe = null;
StatusMissions.canvas = null;
StatusMissions.squareWidth = 150;
StatusMissions.squareDrawWidth = 130;
StatusMissions.w = 0;
StatusMissions.h = 0;
StatusMissions.yDesloc = 10;
StatusMissions.xDesloc = 10;
StatusMissions.ctx = null;
StatusMissions.my_gradient = null;
StatusMissions.my_gradient_hover = null ;
StatusMissions.missions = null;
StatusMissions.font = "12px Arial";

StatusMissions.callLoadMissions = function() {
	var select = PF('clazzTeacher').value;

	if (select === "") {
		StatusMissions.teacherControlLoadMissionsRet(null);
		return;
	}
	
	TeacherControl.loadMissions(select, StatusMissions.teacherControlLoadMissionsRet);
};

StatusMissions.getMousePos = function (evt) {
	var rect = StatusMissions.canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
};

StatusMissions.testMouseOver = function(x, y) {
	if (StatusMissions.missions == null)
		return null;
	
	if (y > StatusMissions.yDesloc+70 || y < StatusMissions.yDesloc)
		return null;
	
	var squarecount = Math.floor(x/StatusMissions.squareWidth);
	if (x < StatusMissions.xDesloc || x > StatusMissions.xDesloc + (squarecount*StatusMissions.squareWidth) + StatusMissions.squareDrawWidth)
		return null;
	
	var m = StatusMissions.missions[squarecount];
	if (m == null || m.qtdUsers == 0)
		return null;
	
	return {x:squarecount};
};

StatusMissions.drawHover = function(x) {
	var m = StatusMissions.missions[x];
	StatusMissions.drawSquare(StatusMissions.xDesloc + (x*StatusMissions.squareWidth), StatusMissions.yDesloc, StatusMissions.my_gradient_hover, m);
};

StatusMissions.drawSquare = function(x, y, gradient, mission) {
	
	if (mission == null) {
		
		StatusMissions.ctx.fillStyle = "#000000";
		StatusMissions.ctx.font = "20px Arial";
		StatusMissions.ctx.fillText(" . . . ", x+30, y+40);
		StatusMissions.ctx.font = StatusMissions.font;
		
	} else {
		
		var name = mission.idx + "-" + mission.name;
		
		StatusMissions.ctx.strokeStyle = "black";
		StatusMissions.ctx.strokeRect(x, y, StatusMissions.squareDrawWidth, StatusMissions.hMax-10);

		StatusMissions.ctx.fillStyle = gradient;
		StatusMissions.ctx.fillRect(x, y, StatusMissions.squareDrawWidth, StatusMissions.hMax-10);
		
		StatusMissions.ctx.fillStyle = "#FFFFFF";
		
		var part = name;
		while (StatusMissions.ctx.measureText(part).width > StatusMissions.squareDrawWidth-5) {
			part = part.substring(0, part.length-1);
		};
		
		StatusMissions.ctx.fillText(part, x+5, y+20);
		
		if (part !== name) {
			name = name.substring(part.length);
			part = name;
			while (StatusMissions.ctx.measureText(part).width > StatusMissions.squareDrawWidth-5) {
				part = part.substring(0, part.length-1);
			};
			StatusMissions.ctx.fillText(part, x+5, y+40);
			
			if (part !== name) {
				name = name.substring(part.length);
				part = name;
				while (StatusMissions.ctx.measureText(part).width > StatusMissions.squareDrawWidth-5) {
					part = part.substring(0, part.length-1);
				};
				StatusMissions.ctx.fillText(part, x+5, y+60);
			}
		}
		
		StatusMissions.ctx.fillText(mission.qtdUsers, x+50, y+80);
		
		StatusMissions.ctx.drawImage(StatusMissions.img, x+34, y+70);

	}
	
};
	
StatusMissions.draw = function() {
	StatusMissions.ctx.clearRect(0, 0, StatusMissions.w, StatusMissions.h);
	
	var missions = StatusMissions.missions;
	
	if (missions == null)
		return;
	
	var x = StatusMissions.xDesloc, y = StatusMissions.yDesloc; 
	for (var i = 0; i < missions.length; i++) {
		var m = missions[i];
		
		StatusMissions.drawSquare(x, y, StatusMissions.my_gradient, m);
		
		x+= StatusMissions.squareWidth;
	}
		
};

StatusMissions.teacherControlLoadMissionsRet = function (retx) {
	
	StatusMissions.missions = retx;

	StatusMissions.canvas.width = (StatusMissions.missions == null?0:StatusMissions.missions.length*StatusMissions.squareWidth);
	StatusMissions.w = StatusMissions.canvas.width;
	
	// after canvas.width, some settings are reset
	StatusMissions.ctx.font = StatusMissions.font;
	StatusMissions.ctx.lineWidth = 1;
	
	// StatusMissions.missions[0][1] :: 0 - missions; 1 - data of missions (id, idx, name, qtdUsers)
	StatusMissions.draw();
		
		
};

StatusMissions.initFormStatusMissions = function () {
	
	StatusMissions.iframe = document.getElementById("myDiagram");
	StatusMissions.iframe.width = window.innerWidth - 10;
	StatusMissions.iframe.height = StatusMissions.hMax + 80;

	var iframediv = StatusMissions.iframe.contentWindow.document;

	StatusMissions.canvas = document.createElement("canvas");
	StatusMissions.ctx = StatusMissions.canvas.getContext('2d');
	
	StatusMissions.img = new Image();
	
	StatusMissions.img.onload = function() {
		
		StatusMissions.canvas.height = StatusMissions.hMax;
		
		StatusMissions.h = StatusMissions.canvas.height;
		
		StatusMissions.my_gradient = StatusMissions.ctx.createLinearGradient(0,0,0,StatusMissions.hMax);
		StatusMissions.my_gradient.addColorStop(0,"#2989d8");
		StatusMissions.my_gradient.addColorStop(0.5,"#7db9e8");
		StatusMissions.my_gradient.addColorStop(1,"#207cca");
		
		StatusMissions.my_gradient_hover = StatusMissions.ctx.createLinearGradient(0,0,0,StatusMissions.hMax);
		StatusMissions.my_gradient_hover.addColorStop(0,"#207cca");
		StatusMissions.my_gradient_hover.addColorStop(0.5,"#2989d8");
		StatusMissions.my_gradient_hover.addColorStop(1,"#207cca");
	};
	
	StatusMissions.img.src = "../images/user.png";
	
	StatusMissions.canvas.addEventListener('mousemove', function(evt) {
        var mousePos = StatusMissions.getMousePos(evt);
        var square = StatusMissions.testMouseOver(mousePos.x, mousePos.y);
        StatusMissions.draw();
        if (square != null && square.x < StatusMissions.missions.length) {
        	StatusMissions.canvas.style.cursor = "pointer";
        	StatusMissions.drawHover(square.x);
        } else
        	StatusMissions.canvas.style.cursor = "default";
      }, false);
	
	StatusMissions.canvas.addEventListener('click', function(evt) {
        var mousePos = StatusMissions.getMousePos(evt);
        var square = StatusMissions.testMouseOver(mousePos.x, mousePos.y);
        if (square == null)
        	return;
        var m = StatusMissions.missions[square.x];

        updateMission([{name:'mission', value: m.id}, {name:'users', value: m.users}]); // updateMission is a <p:remotecommand/>

        StatusMissions.draw();
      }, false);

	iframediv.body.appendChild(StatusMissions.canvas);

};


