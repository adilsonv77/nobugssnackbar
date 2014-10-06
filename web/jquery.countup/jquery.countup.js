/**
 * @name		jQuery Count-UP Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2012/09/count-up-jquery/
 * @license		MIT License
 * 
 * Modified by Adilson Vahldick
 */

var CountUp;

(function($){
	
	"use strict";
	CountUp = function(obj, prop) {
		return new CountUp.Base(obj, prop);
	};
	
	CountUp.Base = Base.extend({

		// prop.start -> seconds
		constructor: function(obj, prop) {
			this.options = $.extend({
				callback	: function(){},
				start		: 0,
				stopped		: false,
				cssDigit	: 'static'
			},prop);
			
			this.stopped = this.options.stopped;
			this.passed = this.options.start;

			// Initialize the plugin
			this.init($(obj));
			
			this.positions = $(obj).find('.position');
			this.tick(this);
			
		},


		init: function (elem){
			elem.addClass('countdownHolder');

			var s = '<span class="position">\
						<span class="digit static">0</span>\
					</span>';

			// Creating the markup inside the container
			$.each(['Minutes','Seconds'],function(i){
				$('<span class="count'+this+'">').html(
					'<span class="position">\
						<span class="digit static">0</span>\
					</span>\
					<span class="position">\
						<span class="digit static">0</span>\
					</span>'+(this==="Minutes"?s:"")
				).appendTo(elem);
				
				if(this!="Seconds"){
					elem.append('<span class="countDiv countDiv'+i+'"></span>');
				}
			});

		},

		tick: function(t){
			t
			
			// Number of minutes left
			var m = Math.floor(t.passed / 60);
			t.updateThree(0, 1, 2, m, t);
			
			// Number of seconds left
			var s = t.passed - (m*60);
			t.updateDuo(3, 4, s, t);
			
			// Calling an optional user supplied callback
			t.options.callback(m, s);
			
			
			if (t.stopped)
				return;
			
			t.passed++;
			
			// Scheduling another call of this function in 1s
			setTimeout(function() {	t.tick(t); }, 1000);
		},
		
		// This function updates two digit positions at once
		updateDuo: function (minor,major,value,t){
			this.switchDigit(this.positions.eq(minor),Math.floor(value/10)%10,t);
			this.switchDigit(this.positions.eq(major),value%10,t);
		},
	
		// This function updates two digit positions at once
		updateThree: function (v1,v2,v3,value,t){
			this.switchDigit(this.positions.eq(v1),Math.floor(value/100)%100,t);
			this.switchDigit(this.positions.eq(v2),Math.floor(value/10)%10,t);
			this.switchDigit(this.positions.eq(v3),value%10,t);
		},
	
		// Creates an animated transition between the two numbers
		switchDigit: function (position,number,t){
			
			var digit = position.find('.digit');
			
			if(digit.is(':animated')){
				return false;
			}
			
			if(position.data('digit') == number){
				// We are already showing this number
				return false;
			}
			
			position.data('digit', number);
			
			var replacement = $('<span>',{
				'class':'digit',
				css:{
					backgroundColor: $('.digit').css('background-color'),
					top:'-2.1em',
					opacity:0
				},
				html:number
			});
			
			// The .static class is added when the animation
			// completes. This makes it run smoother.
			
			digit
				.before(replacement)
				.removeClass(t.options.cssDigit)
				.animate({top:'2.5em',opacity:0},'fast',function(){
					digit.remove();
				});

			replacement
				.delay(100)
				.animate({top:0,opacity:1},'fast',function(){
					replacement.addClass(t.options.cssDigit);
				});
		},
		
		stop: function() {
			this.stopped = true;
		},
		
		restart: function() {
			this.stopped = false;
			this.tick(this);
		}
	});
	
})(jQuery);