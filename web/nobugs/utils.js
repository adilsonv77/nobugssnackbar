String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var window_prompt = window.prompt;

window.prompt = function(one, two) {
	Blockly.fireUiEventNow(window, 'showWindowPrompt');
	
	var p;
	do {
		try {
			
			p = window_prompt(one, two);
			
			if (p != null)
				p = p.trim();
			
			var valid = p == null || VariableNames.validate(p);
			if (valid == false) {
				alert(BlocklyApps.getMsg("Error_variableName"));
			}
		} catch (ex) {
			
			var content = document.getElementById('dialogError');
			var container = document.getElementById('dialogErrorText');
			container.textContent = BlocklyApps.getMsg("Error_showPrompt");

		    var style = {width: '400px'}; 
			style[Blockly.RTL ? 'right' : 'left'] = '215px';

			MyBlocklyApps.showDialog(content, null, false, true, true, "", style, null);
			
			return null;
		}
	} while(!valid);
	
	return p;
};


// Based on Professional JavaScript for Web Developers (Nicholas C. Zakas)
// Parasitic Combination Inheritance
var inherits = function(parent, inherited){
    // makes a copy of the parent prototype
    var parentCopy = Object.create(parent.prototype);
 
    // inherits from the parent
    inherited.prototype = parentCopy; 
 
    // fixs the inherited constructor
    inherited.prototype.constructor = inherited;
};

function innerXML ( node ) {
	
	var sinnerXML = "";
	for (var i = 0; i < node.childNodes.length; i++)  
	{  
	    var childNode = node.childNodes.item(i);  
	    var xml = childNode.xml || (new XMLSerializer()).serializeToString(childNode);  
	    sinnerXML += xml;  
	}  
	
	return sinnerXML;
}

 function MyDomToWorkspace(workspace, xml) {
	  if (Blockly.RTL) {
	    var width = workspace.getMetrics().viewWidth;
	  }
	  for (var x = 0; x < xml.childNodes.length; x++) {
		var xmlChild = xml.childNodes[x];
	  
	    if (xmlChild.nodeName.toLowerCase() == 'block') {
	      var block = Blockly.Xml.domToBlock(workspace, xmlChild);
	      var blockX = parseInt(xmlChild.getAttribute('x'), 10);
	      var blockY = parseInt(xmlChild.getAttribute('y'), 10);
	      if (!isNaN(blockX) && !isNaN(blockY)) {
	        block.moveBy(Blockly.RTL ? width - blockX : blockX, blockY);
	      }
	    }
	  }
	};


