var InGrid = {};

InGrid.emptyLines = function(table) {
	
	var tBody = $(table + " tbody");
	tBody.empty();
};

InGrid.loadLines = function(table, lines) {
	
	InGrid.emptyLines(table);
	
	var tBody = $(table + " tbody");
  
	lines.forEach(function(entry) {
	  
	  var tr = $("<tr/>");
	  
	  tr.append($("<td>").html(entry.name));
	  tr.append($("<td>").html(entry.value));
	 
	  tBody.append(tr);
	  
	});

};