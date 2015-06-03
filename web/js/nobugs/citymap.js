PreloadImgs.put('bus', 'images/bus.png');
PreloadImgs.put('city_map1', 'images/city_map.png');
PreloadImgs.put('city_map2', 'images/city_map2.png');

var CityMap = {};

CityMap.init = function(options) {
	
	CityMap.onclick = options.onclick;
	
	CityMap.blinkSchool = false;
	
	CityMap.bus = {left: 0, top: 100};
	CityMap.bus.img = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 2,
		horzSeq: true,
		x: 0,
		y: 8,
		width: 160,
		height: 59,
		sourceY: 0,
		img : PreloadImgs.get('bus')
	});
	
	CityMap.canvas = document.getElementById('city_map');
	CityMap.canvasCtx = CityMap.canvas.getContext('2d');

	CityMap.canvas.addEventListener('mousemove', function(evt) {
	        var mousePos = CityMap.getMousePos(evt);
	        CityMap.blinkSchool = CityMap.testMouseOver(mousePos.x, mousePos.y);
	      }, false);
		  
	CityMap.canvas.addEventListener('click', function(evt) {
	        if (CityMap.blinkSchool) 
	        	CityMap.onclick(evt);
	      }, false);
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
	window.setTimeout(CityMap.animateMap, 100);
};

CityMap.stopAnimation = function() {
	CityMap.animate = false;
};

CityMap.animateMap = function() {
	if (!CityMap.animate) return;
	
	CityMap.canvas.style.cursor = (CityMap.blinkSchool?"pointer":"default");
	CityMap.canvasCtx.drawImage((CityMap.blinkSchool?PreloadImgs.get('city_map2'):PreloadImgs.get('city_map1')), 0, 0, 400, 300);

	CityMap.bus.img.draw(CityMap.canvasCtx);
   
	CityMap.bus.img.update();
   
	window.setTimeout(CityMap.animateMap, 100);
};
