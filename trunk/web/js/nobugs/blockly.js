'use strict';
/**
 * Modification of some basic functions
 **/
var MyBlocklyApps = {};

MyBlocklyApps.showDialog = function(content, origin, animate, modal, centered, title, style,
                                  disposeFunc) {
  if (BlocklyApps.isDialogVisible_) {
	  MyBlocklyApps.hideDialog(false);
  }
  BlocklyApps.isDialogVisible_ = true;
  BlocklyApps.dialogOrigin_ = origin;
  BlocklyApps.dialogDispose_ = disposeFunc;
  
  var dialog = document.getElementById('dialog');
  dialog.style["width"] = "auto";
  dialog.style["height"] = "auto";

  var shadow = document.getElementById('dialogShadow');
  var border = document.getElementById('dialogBorder');

  // Copy all the specified styles to the dialog.
  for (var name in style) {
    dialog.style[name] = style[name];
  }
  if (modal) {
    shadow.style.visibility = 'visible';
    shadow.style.opacity = 0.3;
    var header = document.createElement('div');
    header.id = 'dialogHeader';
    if (title != null)
    	header.innerHTML = "<b>" + title + "</b>";
    
    dialog.appendChild(header);
    BlocklyApps.dialogMouseDownWrapper_ =
        Blockly.bindEvent_(header, 'mousedown', null,
                           BlocklyApps.dialogMouseDown_);
  }
  
  dialog.appendChild(content);
  content.className = content.className.replace('dialogHiddenContent', '');
  
  if (centered) {
	  dialog.style['top'] =
	     Math.max(0, ((window.innerHeight - dialog.clientHeight) / 2)) + "px";
	  
	  dialog.style['left'] =
		  Math.max(0, ((window.innerWidth - dialog.clientWidth) / 2)) + "px";
  }

  function endResult() {
    // Check that the dialog wasn't closed during opening.
    if (BlocklyApps.isDialogVisible_) {
      dialog.style.visibility = 'visible';
      dialog.style.zIndex = 1;
      border.style.visibility = 'hidden';
    }
  }
  if (animate && origin) {
    BlocklyApps.matchBorder_(origin, false, 0.2);
    BlocklyApps.matchBorder_(dialog, true, 0.8);
    // In 175ms show the dialog and hide the animated border.
    window.setTimeout(endResult, 175);
  } else {
    // No animation.  Just set the final state.
    endResult();
  }
};

// the difference instead the original is, that here the disposeFunc is called at the end, after hidden the whole dialog
MyBlocklyApps.hideDialog = function(opt_animate) {
	  if (!BlocklyApps.isDialogVisible_) {
	    return;
	  }
	  BlocklyApps.dialogUnbindDragEvents_();
	  if (BlocklyApps.dialogMouseDownWrapper_) {
	    Blockly.unbindEvent_(BlocklyApps.dialogMouseDownWrapper_);
	    BlocklyApps.dialogMouseDownWrapper_ = null;
	  }

	  BlocklyApps.isDialogVisible_ = false;
	  var origin = (opt_animate === false) ? null : BlocklyApps.dialogOrigin_;
	  var dialog = document.getElementById('dialog');
	  var shadow = document.getElementById('dialogShadow');
	  var border = document.getElementById('dialogBorder');

	  shadow.style.opacity = 0;

	  function endResult() {
	    shadow.style.visibility = 'hidden';
	    border.style.visibility = 'hidden';
	  }
	  if (origin) {
	    BlocklyApps.matchBorder_(dialog, false, 0.8);
	    BlocklyApps.matchBorder_(origin, true, 0.2);
	    // In 175ms hide both the shadow and the animated border.
	    window.setTimeout(endResult, 175);
	  } else {
	    // No animation.  Just set the final state.
	    endResult();
	  }
	  dialog.style.visibility = 'hidden';
	  dialog.style.zIndex = -1;
	  var header = document.getElementById('dialogHeader');
	  if (header) {
	    header.parentNode.removeChild(header);
	  }
	  while (dialog.firstChild) {
	    var content = dialog.firstChild;
	    content.className += ' dialogHiddenContent';
	    document.body.appendChild(content);
	  }
	  BlocklyApps.dialogDispose_ && BlocklyApps.dialogDispose_();
	  BlocklyApps.dialogDispose_ = null;
	};

MyBlocklyApps.unbindClick = function(el, func) {
	  if (typeof el == 'string') {
	    el = document.getElementById(el);
	  }
	  el.removeEventListener('click', func);
	  el.removeEventListener('touchend', func);
	};

	
MyBlocklyApps.newShowModalDialog = function(content) {
	
	var dialog = $('<div />')
			.css({width: "800px", height: "600px", zIndex: "1"})
			.addClass("dialog");
	
	dialog.css("visibility", "visible");
	dialog.html(content);
	
	var top_ = Math.max(0, ((window.innerHeight - dialog.height()) / 2));
	var left_ = Math.max(0, ((window.innerWidth - dialog.width()) / 2));
	dialog.offset({ top: top_, left: left_ });
	
	$( "body" ).append( dialog );
	

	
};