function loadMission(fileName) {
	
	 var xml = new window.XMLHttpRequest();
	 
	  // Define which file to open and
	  // send the request.
	 xml.open("GET", fileName, false);
	 xml.setRequestHeader("Content-Type", "text/xml");
	 xml.send("");
	 
	  // Place the response in an XML document.
	 var doc = xml.responseXML;
	 return doc;
}

function transformStrToXml(string) {
	if (window.DOMParser) {
        return ( new window.DOMParser() ).parseFromString(string, "text/xml");
	} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
	        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
	        xmlDoc.async = "false";
	        xmlDoc.loadXML(xmlStr);
	        return xmlDoc;
	} else {
	    return null; 
	}
}