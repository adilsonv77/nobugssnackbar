// acts as a state machine
Customer = function(options) {
	this.path = {n2:{n1:1, n3:1}, n3:{n2:1, n4:1}, n4:{n3:1, n5:1}, n5:{n4:1, n6:1}, n6:{n5:1, n7:1}, n7:{n6:1, n8:1}, n8:{n7:1, n9:1}, n9:{n8:1, n10:1}, n10:{n9:1, n11:1}, n11:{n10:1, n12:1}, n12:{n11:1, n13:1}, n13:{n12:1, n14:1}, n14:{n13:1, n15:1}, n15:{n14:1, n16:1}, n16:{n15:1, n17:1}, n17:{n16:1, n18:1}, n18:{n17:1, n19:1}, n19:{n18:1, n20:1}, n20:{n19:1, n21:1}, n21:{n20:1, n22:1}, n22:{n21:1, n23:1}, n23:{n22:1, n24:1}, n24:{n23:1, n25:1}, n25:{n24:1, n26:1}, n26:{n25:1, n27:1}, n27:{n26:1, n28:1}, n28:{n27:1, n29:1}, n29:{n28:1, n30:1}, n30:{n29:1, n31:1}, n31:{n30:1, n32:1}, n32:{n31:1, n33:1}, n33:{n32:1, n34:1}, n34:{n33:1, n35:1}, n35:{n34:1, n36:1}, n36:{n35:1, n37:1}, n37:{n36:1, n38:1}, n38:{n37:1, n39:1}, n39:{n38:1, n40:1}, n1:{n2:1}, n40:{n39:1}, };
	this.nodes = {n1:{id: 'n1', x:14, y: 96}, n2:{id: 'n2', x:14, y: 105}, n3:{id: 'n3', x:14, y: 114}, n4:{id: 'n4', x:14, y: 123}, n5:{id: 'n5', x:14, y: 132}, n6:{id: 'n6', x:14, y: 141}, n7:{id: 'n7', x:14, y: 150}, n8:{id: 'n8', x:14, y: 159}, n9:{id: 'n9', x:14, y: 168}, n10:{id: 'n10', x:14, y: 177}, n11:{id: 'n11', x:14, y: 186}, n12:{id: 'n12', x:14, y: 195}, n13:{id: 'n13', x:14, y: 204}, n14:{id: 'n14', x:14, y: 213}, n15:{id: 'n15', x:14, y: 222}, n16:{id: 'n16', x:14, y: 231}, n17:{id: 'n17', x:14, y: 240}, n18:{id: 'n18', x:14, y: 249}, n19:{id: 'n19', x:14, y: 258}, n20:{id: 'n20', x:14, y: 267}, n21:{id: 'n21', x:14, y: 276}, n22:{id: 'n22', x:14, y: 285}, n23:{id: 'n23', x:14, y: 294}, n24:{id: 'n24', x:14, y: 303}, n25:{id: 'n25', x:14, y: 312}, n26:{id: 'n26', x:14, y: 321}, n27:{id: 'n27', x:14, y: 330}, n28:{id: 'n28', x:14, y: 339}, n29:{id: 'n29', x:14, y: 348}, n30:{id: 'n30', x:14, y: 357}, n31:{id: 'n31', x:17, y: 366}, n32:{id: 'n32', x:20, y: 366}, n33:{id: 'n33', x:23, y: 366}, n34:{id: 'n34', x:26, y: 366}, n35:{id: 'n35', x:29, y: 366}, n36:{id: 'n36', x:32, y: 366}, n37:{id: 'n37', x:35, y: 366}, n38:{id: 'n38', x:38, y: 366}, n39:{id: 'n39', x:41, y: 366}, n40:{id: 'n40', x:50, y: 370}, };
	this.keynodes = ['n1', 'n40'];
	
	this.customerFinalPath = new Array();
	this.createCustomerPath();
	this.currentNode = this.customerFinalPath[0];
	this.dest = this.customerFinalPath[1];
	
	this.place = options.place;
	this.showCustomer = false;
	this.showDoor = true;
	this.state = 0;
	
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

Customer.prototype.createCustomerPath = function() {
	for (var key = 0; key < this.keynodes.length; key++)
		this.customerFinalPath[key] = this.nodes[this.keynodes[key]];
	
	this.graph = new Graph(this.path);
	
};

Customer.prototype.update = function() {

	switch (this.state) {
	
	// open the door 
	case 0: ;
	case 1: ;
	case 2: ;
	case 3: this.door.update();
			break;
	
	// appear the customer 
	case 4: this.showCustomer = true; 
			break;
	
	// go to some place
	case 5: this.showDoor = false; // not more neccessary updates the door appeareance
			this.path = this.graph.findShortestPath(this.currentNode.id, this.dest.id);
			break;
			
	// moving to some place
	case 6: var node = this.path.shift();
			if (node) {
				this.changeCustomerPosition(this.nodes[node]);
				return;
			}
			break;
			
	// finish state: nothing to do on this moment
	case 7: return;
	}

	this.state++;
};

Customer.prototype.changeCustomerPosition = function(node) {
	if (node.x < this.currentNode.x)
		this.img.sourceY = 32;
	else
		if (node.x > this.currentNode.x)
			this.img.sourceY = 64;
		else if (node.y < this.currentNode.y)
			    this.img.sourceY = 128;
			 else
				this.img.sourceY = 0;
	
	this.img.update();
	this.currentNode = node;
};

Customer.prototype.draw = function(ctx) {
	
	if (this.showDoor) 	this.door.draw(ctx);
	
	if (this.showCustomer) {
		this.img.x = this.currentNode.x;
		this.img.y = this.currentNode.y - 32;
		
		this.img.draw(ctx);
	}
		
};
