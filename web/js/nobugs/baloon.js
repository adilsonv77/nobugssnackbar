var Baloon = {};

Baloon.draw = function(ctx, x, y, orders, dim) {
	
	if (dim == null || dim == undefined || dim == 0) 
		dim = 1;
	
	if (ctx) {

		var startX = x - (60*dim);
		var startY = y - (40*dim);
	
		ctx.beginPath();
		ctx.moveTo(startX, startY);
			
		var factorY = (20.75*dim) * (orders.length - 1);
		
		switch (orders.length) {
			case 1: {
				ctx.drawImage(PreloadImgs.get('baloon_1'), startX + (20 * dim), startY + (30*dim));
				for (var i = 0;i < orders.length;i++) {
					ctx.drawImage(orders[i], startX + (28 * dim), startY + (37 * dim), (16*dim), (16*dim))
				}
				break;
			}
			case 2: {
				ctx.drawImage(PreloadImgs.get('baloon_2'), startX + (17 * dim), startY + (20 * dim));
				for (var i = 0;i < orders.length;i++) {
					var foodFactor = orders[i].height;
					if (orders[i].src.indexOf('hotdog') > -1) {
						foodFactor -= 12*dim;
					} else if (orders[i].src.indexOf('coke') > -1) {
						foodFactor -= -24*dim;
					}
					ctx.drawImage(orders[i], startX + (28 * dim), i > 0 ? startY + (15 * dim) + (((foodFactor*dim)*i)-((foodFactor / 2)*dim)) : startY+(22*dim), (16*dim), (16*dim));
				}
				break;
			}
			case 3: {
				ctx.drawImage(PreloadImgs.get('baloon_3'), startX + (15 * dim), startY - (5 * dim));
				for (var i = 0;i < orders.length;i++) {
					var foodFactor = orders[i].height;
					if (orders[i].src.indexOf('hotdog') > -1) {
						foodFactor -= 7;
					} else if (orders[i].src.indexOf('coke') > -1) {
						foodFactor -= 12;
					}
					ctx.drawImage(orders[i], startX + (28 * dim), i > 0 ? startY + (2*dim) + (((foodFactor*dim)*i)-((foodFactor / 2)*dim)) : startY, (16*dim), (16*dim));
				}
				break;
			}
		}
//		ctx.drawImage(orders[i], startX-(18*dim), orders.length > 1 ? (i > 0 ? startY+(((40*dim)*i)-7*dim) : startY+(((40*dim)*i)*dim)) : startY+((40*i)+6*dim), (32*dim), (32*dim));
	}
}