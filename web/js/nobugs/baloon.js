var Baloon = {};

Baloon.draw = function(ctx, x, y, orders, left) {
	if (ctx) {

		var startX = 0, startFoodX = 0;
		var baloon1, baloon2, baloon3 ;
		if (left) {
			baloon1 = "baloon_1";
			baloon2 = "baloon_2";
			baloon3 = "baloon_3";
			startX = x - 32;
		} else {
			baloon1 = 'baloonr_1';
			baloon2 = "baloonr_2";
			baloon3 = "baloonr_3";
			startX = x + 32;
			startFoodX = 2;
		}
		
		var startY = y - 30;
	
		switch (orders.length) {
			case 1: {
				ctx.drawImage(PreloadImgs.get(baloon1), startX, startY);
				ctx.drawImage(orders[0], startX+startFoodX+5, startY+5, 20, 20);
				break;
			}
			case 2: {
				ctx.drawImage(PreloadImgs.get(baloon2), startX, startY);
				for (var i = 0;i < orders.length;i++) {
					ctx.drawImage(orders[i], startX+startFoodX+6, startY+2+(18*i), 18, 18);
				}
				break;
			}
			case 3: {
				ctx.drawImage(PreloadImgs.get(baloon3), startX, startY);
				if (left) 
					startX += 3;
				else
					startX += 10;

				for (var i = 0;i < orders.length;i++) {
					ctx.drawImage(orders[i], startX+startFoodX+5, startY+2+(16*i), 16, 16);
				}
				break;
			}
		}
	}
};