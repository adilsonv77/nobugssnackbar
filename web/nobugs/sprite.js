'use strict';

// based in http://blocksjs.com/
var Sprite = {};

Sprite = function(options) {
	this.frameIndex = 0 ;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 1;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.horzSeq = options.horzSeq;
    
    this.x = options.x;
    this.y = options.y;
    
    this.sourceX = options.sourceX || 0;
    this.sourceY = options.sourceY || 0;
    this.width = options.width;
    this.height = options.height;
    
    this.image = new Image();
	this.image.src = options.imgSrc;
	
	this.invert = false;
};

Sprite.prototype.update = function() {
   
	this.tickCount += 1;
	
    if (this.tickCount > this.ticksPerFrame) {
    
    	this.tickCount = 1;
    	
    	// If the current frame index is in range
        if ( (!this.invert && this.frameIndex < this.numberOfFrames - 1) || 
        	 (this.invert && this.frameIndex > 0)){	
        	
            // Go to the next frame
        	if (this.invert)
        		this.frameIndex -= 1;
        	else
        		this.frameIndex += 1;
        } else if (this.invert) {
        	this.frameIndex = this.numberOfFrames - 1;
        } else {
        	this.frameIndex = 0;
        }
    }
	
};

Sprite.prototype.invertDirection = function() {
	this.invert =  !this.invert;
	this.tickCount = 0;
	this.frameIndex = (this.invert?this.numberOfFrames - 1:0);
};

Sprite.prototype.draw = function(ctx) {

    var numberOfFrames = this.numberOfFrames;
    var frameIndex = this.frameIndex;
    
    var sx, sy, sw, sh, dw, dh;
    if (this.horzSeq) {
    	sx = frameIndex * this.width / numberOfFrames;
    	sy = this.sourceY;

    	sw = this.width / numberOfFrames;
    	sh = this.height;

    	dw = this.width / numberOfFrames;
    	dh = this.height;
    } else {
    	sx = this.sourceX;
    	sy = frameIndex * this.height / numberOfFrames;
    	
    	sw = this.width;
    	sh = this.height / numberOfFrames;
    	
    	dw = this.width;
    	dh = this.height / numberOfFrames;
    }
    
	// Draw the animation
    ctx.drawImage(
       this.image,
       sx,
       sy,
       sw,
       sh,
       this.x,
       this.y,
       dw,
       dh);
	
};