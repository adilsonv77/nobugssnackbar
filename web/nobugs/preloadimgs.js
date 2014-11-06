var PreloadImgs = {};
PreloadImgs.imgs = {};
PreloadImgs.keys = [];

PreloadImgs.put = function(key, source) {
	
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

	for (var i = 0; i < PreloadImgs.keys.length; i++) {
		var preload = PreloadImgs.imgs[PreloadImgs.keys[i]];
		preload.img = new Image();
	    preload.img.src = preload.src;
	}
};

