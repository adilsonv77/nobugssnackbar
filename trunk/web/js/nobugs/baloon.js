'use strict';
var Baloon = {};

Baloon.draw = function(ctx, x, y, orders, dim) {
	
	if (dim == null || dim == undefined || dim == 0) 
		dim = 1;
	
	if (ctx) {

		var startX = x - (20*dim);
		var startY = y - (40*dim);
	
		ctx.beginPath();
		ctx.moveTo(startX, startY);
			
		var factorY = (20.75*dim) * (orders.length - 1);
		
		ctx.quadraticCurveTo(startX-(25*dim), startY, startX-(25*dim), startY+(18.75*dim));
		for (var i = 1;i < orders.length;i++) {
			ctx.quadraticCurveTo(startX-(25*dim), startY+(25*dim) ,startX-(25*dim), startY+(37.5*dim));
		}
		ctx.quadraticCurveTo(startX-(25*dim), startY+(37.5*dim)+factorY, startX-(12.5*dim), startY+(37.5*dim)+factorY);
		ctx.quadraticCurveTo(startX-(12.5*dim), startY+(47.5*dim)+factorY, startX+(2.5*dim), startY+(50*dim)+factorY);
		ctx.quadraticCurveTo(startX-(7.5*dim), startY+(47.5*dim)+factorY, startX-(5*dim), startY+(37.5*dim)+factorY);
	
		ctx.quadraticCurveTo(startX+(25*dim), startY+(37.5*dim)+factorY, startX+(25*dim), startY+(18.75)*dim+factorY);
		for (var i = 1;i < orders.length;i++) {
			ctx.quadraticCurveTo(startX+(25*dim), startY+(25*dim), startX+(25*dim), startY+(37.5*dim)-factorY);
		}
		ctx.quadraticCurveTo(startX+(25*dim), startY, startX, startY);
		ctx.fillStyle = "#C9FFDB";
		
		ctx.fill();
		ctx.stroke();
		
		for (var i = 0;i < orders.length;i++) {
			ctx.drawImage(orders[i], startX-(18*dim), orders.length > 1 ? startY+(((30*dim)*i)-7*dim) : startY+((30*i)*dim), (32*dim), (32*dim));
		}
	}
}