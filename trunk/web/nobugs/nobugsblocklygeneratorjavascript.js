var NoBugsJavaScript = {};

NoBugsJavaScript.redirect = function() {
	
	NoBugsJavaScript.oldVarSet = Blockly.JavaScript['variables_set'];
    Blockly.JavaScript['variables_set'] = NoBugsJavaScript.newVarSet;
    
};
  
NoBugsJavaScript.newVarSet = function(block) {
	var s = NoBugsJavaScript.oldVarSet(block);
	return 'highlightBlock('+block.id+');\n' + s;
};


