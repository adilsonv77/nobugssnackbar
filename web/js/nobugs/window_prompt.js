'use strict';

function addAlertMsg(dialog, alertMsg) {
	$("#alertwindowprompt").remove();
	
	var d = $("<div/>").attr("id", "alertwindowprompt").appendTo(dialog);
	var table = $("<table/>").appendTo(d);
	var tr = $("<tr/>").attr("align", "center").attr("rowspan", "2"). appendTo(table);
	var td = $("<td/>").appendTo(tr);
	$("<img/>").attr("src", "images/error.png").css("padding","10px").appendTo(td);
	
	$("<td/>").html(alertMsg).appendTo(tr);

	$("<tr/>").append("<td/>").append("<td/>").appendTo(table);
	
}

function centerWindowPrompt() {
	var w = $(window);
	var top = Math.max((w.height() - $("#window_prompt")[0].clientHeight) / 2, 0) ;
	var left = Math.max(($(window).width() - $("#window_prompt")[0].clientWidth) / 2, 0);
	
	$("#window_prompt").css("top", top + "px");
	$("#window_prompt").css("left", left + "px"); 

}

function NoBugsWindowPrompt(info, initialValue, closeFunction, alertMsg) {
	var dialog = $("<div/>").addClass("WindowPrompt").attr("id", "window_prompt");
	
	if (alertMsg !== undefined && alertMsg !== null) {
		addAlertMsg(dialog, alertMsg);
	}
	
	$("<p/>").html(info).appendTo(dialog);
	
	var f = $("<form/>").appendTo(dialog);
	$("<input/>").addClass("nobugs_inputs").css("width","100%").val(initialValue).appendTo(f);
	$("<br/>").appendTo(f);
	$("<button/>").attr("type", "submit").addClass("nobugs_button").html("OK").appendTo(f);
	$("<button/>").attr("type", "button").addClass("nobugs_button").attr("id", "closePrompt").html((BlocklyApps?BlocklyApps.getMsg("dialogCancel"):"Cancel")).appendTo(f);
	dialog.appendTo("body");
	
    var prompt = $("#window_prompt").overlay({

	      // some mask tweaks suitable for modal dialogs
	      mask: {
	        color: '#000',
	        loadSpeed: 200,
	      },

	      closeOnClick: false,
	      load: false,
	      onLoad : function() {
	    	  $("#window_prompt input").focus();
	      }
	});
    
    $("#closePrompt").click(function(e) {
    	
        closeFunction(null);

        // close the overlay
        prompt.eq(0).overlay().close();
       	$("#window_prompt").remove();
    	$("#exposeMask").remove();
   });
    
   $("#window_prompt form").submit(function(e) {

        // get user input
        var input = $("input", this).val();

       	// close the overlay
        var errorMsg = (closeFunction(input));
        if (errorMsg == null) {
        	
            prompt.eq(0).overlay().close();
           	$("#window_prompt").remove();
          	$("#exposeMask").remove();
        } else {
        	
    		addAlertMsg($("#window_prompt")[0], errorMsg);
    		centerWindowPrompt();
        }
        	
        // do not submit the form
        return e.preventDefault();
    });
    
    
    $("#window_prompt").overlay().load();
	centerWindowPrompt();

}

function alert(message, callback, options) {
	$('#alert').modal({
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

			var fClose = function () {
				// call the callback
				if ($.isFunction(callback)) {
					callback.apply();
				}
				$('.simplemodal-close').unbind('click');
				// close the dialog
				modal.close(); // or $.modal.close();
			};
			
			$('.simplemodal-close').click(fClose);
			
			
		}
	});
	
}