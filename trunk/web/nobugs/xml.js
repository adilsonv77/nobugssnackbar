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
