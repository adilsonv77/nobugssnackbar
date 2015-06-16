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

/*****************************************************************************************************************/
/**                                  Colours deals                                                              **/
/*****************************************************************************************************************/

function shadeBlend(p,c0,c1) {
	var n=p<0?p*-1:p,u=Math.round,w=parseInt;
	if(c0.length>7){
		var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
		return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
	}else{
		var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
		return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
	}
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

	
