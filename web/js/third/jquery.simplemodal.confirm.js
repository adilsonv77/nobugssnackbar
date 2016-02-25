/*
 * SimpleModal Confirm Modal Dialog
 * http://simplemodal.com
 *
 * Copyright (c) 2013 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
/*
jQuery(function ($) {
	$('#confirm-dialog input.confirm, #confirm-dialog a.confirm').click(function (e) {
		e.preventDefault();

		// example of calling the confirm function
		// you must use a callback function to perform the "yes" action
		confirm("Continue to the SimpleModal Project page?", function () {
			window.location.href = 'http://simplemodal.com';
		});
	});
});
*/
function confirm(message, callbackYes, callbackNo, options) {
	
	$('#confirm').modal({
    	closeHTML: "<button style='border:none;position:absolute;right:0px;padding:0px;margin:0px;margin-right:5px;min-width:0px;background-color:transparent;'><img src='images/closedialog.png' style='width:16px;height:16px'/></button>",
		position: ["20%",],
		overlayId: 'confirm-overlay',
		containerId: 'confirm-container', 
		onShow: function (dialog) {

			if (options != undefined) {
				
				var cc = $("#confirm-container"); 
				for (var opt in options) {
					cc.css(opt, options[opt]);
				}
			}
			
			var modal = this;

			$('.message', dialog.data[0]).append(message);

			// if the user clicks "yes"
			$('.yes', dialog.data[0]).click(function () {
				// call the callback
				if ($.isFunction(callbackYes)) {
					callbackYes.apply();
				}
				// close the dialog
				modal.close(); // or $.modal.close();
			});
			
			$('.no', dialog.data[0]).click(function () {
				if ($.isFunction(callbackNo)) {
					callbackNo.apply();
				}
				
			});
			
			
		}
	});
}