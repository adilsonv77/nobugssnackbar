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

InGrid.createNewVarTable = function(rows) {
	$("#var_content").empty();
	
	var t = $("<table>").attr("id", "vars");
	var thead = $("<thead>");
	
	var tr = $("<tr>");
	tr.append($("<th>").html(BlocklyApps.getMsg("NoBugs_VarName")));
	tr.append($("<th>").html(BlocklyApps.getMsg("NoBugs_VarValue")));
	
	thead.append(tr);
	t.append(thead);
	$("#var_content").append(t);
	var tBody = $("<tbody>");
	
	rows.forEach(function(entry) {
		  
		  var tr = $("<tr/>");
		  
		  tr.append($("<td>").html(entry.name));
		  tr.append($("<td>").html(entry.value));
		 
		  tBody.append(tr);
		  
		});
	
	t.append(tBody);
};

InGrid.createNewTipTable = function(cols, rows) {
	$("#tips_content").empty();
	
	var t = $("<table>").attr("id", "tips");
	t.addClass("varsgrid").addClass("tipsgrid");
	
	
/*	var thead = $("<thead>");
	
	var tr = $("<tr>");
	tr.append($("<th>").html("temp"));
	
	thead.append(tr);
	t.append(thead);
	*/
	$("#tips_content").append(t);
	var tBody = $("<tbody>");
	
	rows.forEach(function(entry) {
		  
		  var tr = $("<tr/>");
		  
		  var text = entry.text;
		  var indent = entry.indent;
		  
		  for (var i = 0; i < indent; i++)
			  tr.append($("<td>").css("background-color", "#DDDDDD"));
		  
		  tr.append($("<td>").attr("colspan", (cols-indent)+1).html(text));
		 
		  tBody.append(tr);
		  
		});
	
	t.append(tBody);
};