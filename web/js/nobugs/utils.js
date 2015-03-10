'use strict';
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
    	formatted = formatted.replace("%"+i, arguments[i]);

        //var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        //formatted = formatted.replace(regexp, arguments[i]);
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

			if (p === two)
				return two;

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

function convertImgHex(imgHex, fConvert) {

	  var imgsHexId = [];
	  var imgsHexH = [];
	  for (var i=0; i<imgHex.length; i++) {
		  imgsHexId.push(imgHex[i].getAttribute("id"));
		  imgsHexH.push(imgHex[i].textContent);
	  }

	  UserControl.existsImageKey(imgsHexId, {async:false, callback:function(b){

		  for (var i=0; i<b.length; i++) {
			  if (!b[i]) {

				  UserControl.convertHexToImage(imgsHexId[i], imgsHexH[i]);
			  }
			  var imgOrig = " <img src=\"hintimg?i=" + imgsHexId[i] + "\"/>";
			  fConvert(imgsHexId[i], imgsHexH[i], imgOrig);
		  }

	  }});

}

function changeImgHex(containerText) {
	if (containerText == null)
		return containerText;
	
	var copyText = containerText;
	
	var oParser = new DOMParser();
	var imgHexArr = [];
	// this is because in Safari containerText is only a String ;(
	do {
		
		var init = containerText.indexOf("<imghex id=");
		if (init == -1) 
			break;
		
		
		var finish = containerText.indexOf("</imghex>")+9;
		
		var imgHex = containerText.substring(init, finish);
		
		var dom = oParser.parseFromString(imgHex, 'text/xml');
		
		imgHexArr.push(dom.firstChild);
		
		containerText = containerText.substring(finish+1);
		
	} while (true);
	
	containerText = copyText;
		
	convertImgHex(imgHexArr, function(hexId, hexHex, img) {
		containerText = containerText.replace("<imghex id=\"" + hexId + "\">"+ hexHex +"</imghex>", img);
	});
		
	return containerText;
}

function addZeros(number, digits) {

	number = number + "";
	while (number.length < digits) {
		number = "0" + number;
	}
	return number;
}

function generateImages(number, digits) {

	number = addZeros(number, digits);

	var imgs = new Array(digits);
	$.each(imgs, function(i){
		imgs[i] = number[i]+ ".png";
	});

	return imgs;
}


	
