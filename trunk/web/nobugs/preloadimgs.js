'use strict';
var PreloadImgs = {};
PreloadImgs.imgs = {};
PreloadImgs.keys = [];
PreloadImgs.loaded = false;

PreloadImgs.put = function(key, source) {
	
	if (PreloadImgs.keys.indexOf(key) > -1)
		return;
	
	PreloadImgs.keys.push(key);
	PreloadImgs.imgs[key] = {src: source, img: null};
	
};

PreloadImgs.get = function(key) {
	
	return PreloadImgs.imgs[key].img;
	
};

/**
 * Without this some draws don't work. 
 */
PreloadImgs.loadImgs = function() {
	
	if (PreloadImgs.loaded)
		return;
	
	for (var i = 0; i < PreloadImgs.keys.length; i++) {
		var preload = PreloadImgs.imgs[PreloadImgs.keys[i]];
		preload.img = new Image();
	    preload.img.src = preload.src;
	}
	
	PreloadImgs.loaded = true;
};

