var NoBugsJavaScript = {};

NoBugsJavaScript.redefine = function() {
    Blockly.Msg.CONTROLS_IF_MSG_THEN = "then"; // changing "do" to "then"
	  
	NoBugsJavaScript.oldVarSet = Blockly.JavaScript['variables_set'];
    Blockly.JavaScript['variables_set'] = NoBugsJavaScript.newVarSet;
    
};
  
NoBugsJavaScript.newVarSet = function(block) {
	var s = NoBugsJavaScript.oldVarSet(block);
	return 'highlightBlock('+block.id+');\n' + s;
};


