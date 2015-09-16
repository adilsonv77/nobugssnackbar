TeacherControl.loadMissions(function(ret) {
	
	var squareWidth = 120;

	var w = 500, h = 300, yDesloc = 10, xDesloc = 10;
	var img = new Image();
	img.src = "../images/user.png";
	
	var canvas = document.getElementById("diagramCanvas");
	var ctx = canvas.getContext('2d');
	ctx.font = "12px Arial";
	ctx.lineWidth = 1;
	
	var my_gradient = ctx.createLinearGradient(0,0,0,50);
	my_gradient.addColorStop(0,"#2989d8");
	my_gradient.addColorStop(0.5,"#7db9e8");
	my_gradient.addColorStop(1,"#207cca");
	
	var my_gradient_hover = ctx.createLinearGradient(0,0,0,50);
	my_gradient_hover.addColorStop(0,"#207cca");
	my_gradient_hover.addColorStop(0.5,"#2989d8");
	my_gradient_hover.addColorStop(1,"#207cca");
	
	function getMousePos(evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}
	
	function testMouseOver(x, y) {
		if (y > yDesloc+50 || y < yDesloc)
			return null;
		
		var squarecount = Math.floor(x/squareWidth);
		if (x < xDesloc || x > xDesloc + (squarecount*squareWidth) + 100)
			return null;
		
		var m = ret[0][0][squarecount];
		if (m.qtdUsers == 0)
			return null;
		
		return {x:squarecount};
	}

	function drawHover(x) {
		var m = ret[0][0][x];
		drawSquare(xDesloc + (x*squareWidth), yDesloc, my_gradient_hover, m.idx + "-" + m.name, m.qtdUsers);
	}
	
	function drawSquare(x, y, gradient, name, qtdUsers) {
		
		ctx.strokeStyle = "black";
		ctx.strokeRect(x, y, 100, 50);

		ctx.fillStyle = gradient;
		ctx.fillRect(x, y, 100, 50);
		
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText(name, x+10, y+20);
		ctx.fillText(qtdUsers, x+50, y+40);
		
		ctx.drawImage(img, x+34, y+30);
		
	}
		
	function draw() {
		ctx.clearRect(0, 0, w, h);
		
		var levels = ret[0];
		
		var x = xDesloc, y = yDesloc; 
		levels.forEach(function(level) {
			for (var i = 0; i < level.length; i++) {
				var m = level[i];
				
				drawSquare(x, y, my_gradient, m.idx + "-"+m.name, m.qtdUsers);
				
				x+= squareWidth;
			}
			
		});
		
	}

	// ret[0][1][2][3]:: 0 - classes; 1 - levels; 2 - missions; 3 - data of missions (idx, name, qtdUsers)
	
	draw();
	
	canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(evt);
        var square = testMouseOver(mousePos.x, mousePos.y);
        draw();
        if (square != null && square.x < ret[0][0].length) {
        	canvas.style.cursor = "pointer";
        	drawHover(square.x);
        } else
        	canvas.style.cursor = "default";
      }, false);
	
	canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(evt);
        var square = testMouseOver(mousePos.x, mousePos.y);
        if (square == null)
        	return;
        var m = ret[0][0][square.x];
        alert(m.qtdUsers);
        draw();
      }, false);

});

