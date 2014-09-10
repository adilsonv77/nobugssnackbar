/**
 * Modification of some basic functions
 **/
var MyBlocklyApps = {};

MyBlocklyApps.showDialog = function(content, origin, animate, modal, centered, title, style,
                                  disposeFunc) {
  if (BlocklyApps.isDialogVisible_) {
    BlocklyApps.hideDialog(false);
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
