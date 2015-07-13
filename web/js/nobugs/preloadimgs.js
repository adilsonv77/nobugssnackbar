'use strict';
var PreloadImgs = {};
PreloadImgs.imgs = {};
PreloadImgs.keys = [];
PreloadImgs.loaded = false;

PreloadImgs.put = function(key, source, loadNow) {
	
	if (PreloadImgs.keys.indexOf(key) > -1)
		return;
	
	PreloadImgs.keys.push(key);
	PreloadImgs.imgs[key] = {src: source, img: null};
	
	if (loadNow != undefined && loadNow) {

		PreloadImgs.imgs[key].img = new Image();
		PreloadImgs.imgs[key].img.src = PreloadImgs.imgs[key].src;
		
	}
	
};

PreloadImgs.get = function(key) {
	
	return PreloadImgs.imgs[key].img;
	
};

/**
 * Without this some draws don't work. 
 */
PreloadImgs.loadImgs = function() {
	
    var preloadImgs = document.getElementById("preloadimgsxx");
	
	for (var i = 0; i < PreloadImgs.keys.length; i++) {
		var preload = PreloadImgs.imgs[PreloadImgs.keys[i]];
		if (preload.img == null) {
			preloadImgs.style.background = "url(" + preload.src + ")";
			
			preload.img = new Image();
		    preload.img.src = preload.src;
		}
	}

	PreloadImgs.loaded = true;
};

