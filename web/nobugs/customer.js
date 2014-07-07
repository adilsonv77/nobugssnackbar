Customer = function(options) {
	
	this.place = options.place;
	this.showCustomer = false;
	
	this.img = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 3,
		horzSeq: true,
		x: 14,
		y: 64,
		width: 96,
		height: 32,
		sourceY: 0,
		imgSrc : "images/$customer" +options.id+ ".png"
    });
	
	this.door = new Sprite({
		ticksPerFrame: 0,
		numberOfFrames: 4,
		horzSeq: false,
		x: 0,
		y: 32,
		width: 64,
		height: 256,
		imgSrc : "images/doors.png"
});

};

Customer.prototype.animateGoToPlace = function() {

	var that = this;
	
	// open the door
	Game.pidList.push( window.setTimeout( function(){
		that.door.update();
		
		}, Game.stepSpeed*1) );
	
	Game.pidList.push( window.setTimeout( function(){
		that.door.update();
		}, Game.stepSpeed*2) );

	Game.pidList.push( window.setTimeout( function(){
		that.door.update();
		}, Game.stepSpeed*3) );
	
	Game.pidList.push( window.setTimeout( function(){
		that.door.update();
		}, Game.stepSpeed*4) );
	
	
	Game.pidList.push( window.setTimeout( function(){
		that.showCustomer = true;
		}, Game.stepSpeed*4) );
	
	return 4;
};

Customer.prototype.draw = function(ctx) {
	
	this.door.draw(ctx);
	if (this.showCustomer) 
		this.img.draw(ctx);
};
