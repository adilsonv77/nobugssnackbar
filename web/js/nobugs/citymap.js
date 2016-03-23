PreloadImgs.put('bus', 'images/bus.png');

PreloadImgs.put('city_map1', 'images/city_map.png');
PreloadImgs.put('managedSnackBar', 'images/city_map-buildings.png');

PreloadImgs.put('busback', 'images/bus_back.png');
PreloadImgs.put('middleBuildings', 'images/middleBuildings.png');
PreloadImgs.put('signs', 'images/signs.png');
PreloadImgs.put('blinkSchool', 'images/blinkSchool.png');
PreloadImgs.put('school', 'images/school.png');
PreloadImgs.put('trees', 'images/trees.png');

PreloadImgs.put('carred', 'images/car_red.png');
PreloadImgs.put('carredback', 'images/car_red_back.png');

PreloadImgs.put('cargreen', "images/car_green.png");
PreloadImgs.put('cargreendown', "images/car_green_down.png");

var CityMap = {};

CityMap.init = function(options) {
	
	CityMap.flagBusDir = false;
	CityMap.flagCarRedDir = true;
	CityMap.flagCarGreenDir = false;
	
	CityMap.onclick = options.onclick;
	
	CityMap.blinkSchool = false;
	
	CityMap.bus = {left: 0, top: 100};
	CityMap.bus.img = new Sprite({
		ticksPerFrame: 1,
		numberOfFrames: 2,
		horzSeq: true,
		x: 403,
		y: -73,
		width: 160,
		height: 59,
		sourceY: 0,
		img : PreloadImgs.get('bus')
	});
	
	CityMap.busBack = {left: 0, top: 100};
	CityMap.busBack.img = new Sprite({
		ticksPerFrame: 1,
		numberOfFrames: 2,
		horzSeq: true,
		x: 400,
		y: 212,
		width: 160,
		height: 59,
		sourceY: 0,
		img : PreloadImgs.get('busback')
	});

	CityMap.car_red  = {left: 0, top: 100};
	CityMap.car_red.img = new Sprite({
			ticksPerFrame: 0,
			numberOfFrames: 2,
			horzSeq: true,
			x: -280,
			y: -152,
			width: 160,
			height: 59,
			sourceY: 0,
			img : PreloadImgs.get('carred')
	});
	
	CityMap.car_red_back = {left: 0, top: 100};
	CityMap.car_red_back.img = new Sprite({
				ticksPerFrame: 0,
				numberOfFrames: 2,
				horzSeq: true,
				x: -161,
				y: 280,
				width: 160,
				height: 59,
				sourceY: 0,
				img : PreloadImgs.get('carredback')
	});
	
	CityMap.car_green = {left: 0, top: 100};
	CityMap.car_green.img = new Sprite({
				ticksPerFrame: 0,
				numberOfFrames: 2,
				horzSeq: true,
				x: -280,
				y: -152,
				width: 160,
				height: 59,
				sourceY: 0,
				img : PreloadImgs.get('cargreen')
	});
	
	CityMap.car_green_down = {left: 0, top: 100}; 
	CityMap.car_green_down.img = new Sprite({
				ticksPerFrame: 0,
				numberOfFrames: 2,
				horzSeq: true,
				x: 703,
				y: -240,
				width: 160,
				height: 59,
				sourceY: 0,
				img : PreloadImgs.get('cargreendown')
	});

	
	CityMap.map1 = PreloadImgs.get('city_map1');
	
	CityMap.middleBuildings = PreloadImgs.get("middleBuildings");
	
	CityMap.managedSnackBar = PreloadImgs.get("managedSnackBar");
	
	CityMap.signs = PreloadImgs.get( "signs");
	
	CityMap.school_hoover = PreloadImgs.get( "blinkSchool");
	
	CityMap.school = PreloadImgs.get("school");
	
	CityMap.trees = PreloadImgs.get("trees");

	
	CityMap.canvas = document.getElementById('city_map');
	CityMap.canvasCtx = CityMap.canvas.getContext('2d');

	CityMap.canvas.removeEventListener('mousemove', CityMap.mouseMove);
	CityMap.canvas.removeEventListener('click', CityMap.click);
	
	CityMap.canvas.addEventListener('mousemove', CityMap.mouseMove, false);
		  
	CityMap.canvas.addEventListener('click', CityMap.click, false);
};

CityMap.mouseMove = function(evt) {
    var mousePos = CityMap.getMousePos(evt);
    CityMap.blinkSchool = CityMap.testMouseOver(mousePos.x, mousePos.y);
};
  
CityMap.click = function(evt) {
      if (CityMap.blinkSchool) 
      	CityMap.onclick(evt);
};
  
CityMap.getMousePos = function(evt) {
	var rect = CityMap.canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
};

CityMap.testMouseOver = function(x, y) {
   var xs = [190,230,233,241,198,172,184,172,160,142,159,160];
   var ys = [163,187,228,233,262,250,238,232,241,229,216,178];
   
   return CityMap.pnpoly(xs.length, xs, ys, x, y);
};

CityMap.pnpoly = function( nvert, vertx, verty, testx, testy ) {
    var i, j, c = false;
    for( i = 0, j = nvert-1; i < nvert; j = i++ ) {
        if( ( ( verty[i] > testy ) != ( verty[j] > testy ) ) &&
            ( testx < ( vertx[j] - vertx[i] ) * ( testy - verty[i] ) / ( verty[j] - verty[i] ) + vertx[i] ) ) {
                c = !c;
        }
    }
    return c;
};

CityMap.startAnimation = function() {
	CityMap.animate = true;
	window.setTimeout(CityMap.animateMap, 75);
};

CityMap.stopAnimation = function() {
	CityMap.animate = false;
};

CityMap.animateMap = function() {
	if (!CityMap.animate) return;
	
	CityMap.canvas.style.cursor = (CityMap.blinkSchool?"pointer":"default");
	
	CityMap.canvasCtx.drawImage((CityMap.map1), 0, 0, 400, 300);
	
	CityMap.animateBus();
	CityMap.animateCarRed();
	CityMap.animateCarGreen();
	
	CityMap.canvasCtx.drawImage((CityMap.signs), 0, 0, 400, 300);
	CityMap.canvasCtx.drawImage((CityMap.middleBuildings), 0, 0, 400, 300);
	CityMap.canvasCtx.drawImage((CityMap.trees), 0, 0, 400, 300);
	CityMap.canvasCtx.drawImage((CityMap.managedSnackBar), 0, 0, 400, 300);
	
	CityMap.canvasCtx.drawImage((CityMap.blinkSchool?CityMap.school_hoover:CityMap.school), 0, 0, 400, 300);

	window.setTimeout(CityMap.animateMap, 75);
};

CityMap.animateBus = function() {
	
	  CityMap.bus.img.draw(CityMap.canvasCtx);	
	  CityMap.bus.img.update();
	  CityMap.bus.img.x -= 1.00 + Math.cos(60 * Math.PI/180);
	  CityMap.bus.img.y += Math.sin(60 * Math.PI/180);
	  CityMap.busBack.img.x = 400;
	  CityMap.busBack.img.y = 212;	  

	  /*  if (!CityMap.flagBusDir) {
	   
	  CityMap.bus.img.draw(CityMap.canvasCtx);	
	  CityMap.bus.img.update();
	  CityMap.flagBusDir = (CityMap.bus.img.x + CityMap.bus.img.width) > 0 ? false : true;
	  CityMap.bus.img.x -= 1.00 + Math.cos(60 * Math.PI/180);
	  CityMap.bus.img.y += Math.sin(60 * Math.PI/180);
	  CityMap.busBack.img.x = 400;
	  CityMap.busBack.img.y = 212;	  
	  
   } else {
	   
	 CityMap.bus.img.x = 403;
	 CityMap.bus.img.y = -73;
	 CityMap.busBack.img.draw(CityMap.canvasCtx);	
	 CityMap.busBack.img.update();  
	 
	 CityMap.flagBusDir = (CityMap.busBack.img.x + CityMap.busBack.img.width) <= 0 ? false : true;
   	 
   	 CityMap.busBack.img.x -= 1.00 + Math.cos(60 * Math.PI/180);
   	 CityMap.busBack.img.y -= Math.sin(60 * Math.PI/180);	  
   	 
   }
   */
};

CityMap.animateCarRed = function() {
   if (!CityMap.flagCarRedDir) {
	   CityMap.car_red.img.draw(CityMap.canvasCtx);	
	   CityMap.car_red.img.update();
	   CityMap.flagCarRedDir = CityMap.car_red.img.x >= 400 ? true : false;
	   CityMap.car_red.img.x += 1.00 + Math.cos(60 * Math.PI/180);
	   CityMap.car_red.img.y += Math.sin(60 * Math.PI/180);
	   CityMap.car_red_back.img.x = -161;
	   CityMap.car_red_back.img.y = 280;
   }
   else {
	   CityMap.car_red.img.x = -280;
	   CityMap.car_red.img.y = -152;
	   CityMap.car_red_back.img.draw(CityMap.canvasCtx);	
	   CityMap.car_red_back.img.update();
	   CityMap.flagCarRedDir = CityMap.car_red_back.img.x <= 400 ? true : false;
	   CityMap.car_red_back.img.x += 1.00 + Math.cos(60 * Math.PI/180);
	   CityMap.car_red_back.img.y -= Math.sin(60 * Math.PI/180);  
   }
};

CityMap.animateCarGreen = function() {
   if (!CityMap.flagCarGreenDir) {
      CityMap.car_green.img.draw(CityMap.canvasCtx);	
      CityMap.car_green.img.update();
      CityMap.flagCarGreenDir = CityMap.car_green.img.x <= 400 ? false : true;
	  CityMap.car_green.img.x += 1.00 + Math.cos(60 * Math.PI/180);
	  CityMap.car_green.img.y += Math.sin(60 * Math.PI/180);
	  CityMap.car_green_down.img.x = 703;
	  CityMap.car_green_down.img.y = -240;
   }
   else {
      CityMap.car_green.img.x = -280;
	  CityMap.car_green.img.y = -152;
      CityMap.car_green_down.img.draw(CityMap.canvasCtx);	
      CityMap.car_green_down.img.update();  
      CityMap.flagCarGreenDir = (CityMap.car_green_down.img.x + CityMap.car_green_down.img.width) < 0 ? false : true;
	  CityMap.car_green_down.img.x -= 1.00 + Math.cos(60 * Math.PI/180);
	  CityMap.car_green_down.img.y += Math.sin(60 * Math.PI/180);  
   }
};


