function loadXML(fileName) {
	
	 var xml = new XMLHttpRequest();
	 
	  // Define which file to open and
	  // send the request.
	 xml.open("GET", fileName, false);
	 xml.setRequestHeader("Content-Type", "text/xml");
	 xml.send(null);
	 
	  // Place the response in an XML document.
	 var doc = xml.responseText;
	 return doc;
}
