var NoBugsJavaScript = {};

NoBugsJavaScript.oldVarSet = null;
NoBugsJavaScript.oldLogicCompare = null;
NoBugsJavaScript.varName= null;
NoBugsJavaScript.typeComparison = "function nobugsComparison(arg0, arg1, operator) {if (arg0.type != undefined ) {arg0 = arg0.descr; } else if (arg1.type != undefined) {arg1 = arg1.descr;}var OPERATORS={'EQ': '==','NEQ': '!=','LT': '<','LTE': '<=','GT': '>','GTE': '>='};return eval(arg0 + ' ' + OPERATORS[operator] + ' ' + arg1);};";

NoBugsJavaScript.redefine = function() {
	
    Blockly.Msg.CONTROLS_IF_MSG_THEN = BlocklyApps.getMsg('Blockly_ifThen'); 
	  
    if (NoBugsJavaScript.oldVarSet == null) {
    	
    	NoBugsJavaScript.oldVarSet = Blockly.JavaScript['variables_set'];
        Blockly.JavaScript['variables_set'] = NoBugsJavaScript.newVarSet;
        
    }
    
    if (NoBugsJavaScript.oldLogicCompare == null) {
    	
    	NoBugsJavaScript.oldLogicCompare = Blockly.JavaScript['logic_compare'];
    	Blockly.JavaScript['logic_compare'] = NoBugsJavaScript.newLogicCompare;
        
    }
    
};
  
NoBugsJavaScript.newVarSet = function(block) {
	
	var s = NoBugsJavaScript.oldVarSet(block);
	
	return  'NoBugsJavaScript.varName="'+block.getFieldValue('VAR')+'";\n' + s +
				'\nNoBugsJavaScript.varName=null;\n';
};

NoBugsJavaScript.OPERATORS = {
		'EQ' : '==',
		'NEQ' : '!=',
		'LT' : '<',
		'LTE' : '<=','GT': '>',
		'GTE' : '>='
	};

NoBugsJavaScript.newLogicCompare = function(block) {
	
	  // Comparison operator.
	  var blockOperator = block.getFieldValue('OP');

	  var operator = NoBugsJavaScript.OPERATORS[blockOperator];
	  var order = (operator == '==' || operator == '!=') ?
	      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

	  var code = 'nobugsComparison({0}, {1}, "{2}")'.format(argument0, argument1, blockOperator); 
	  code = 'nobugsComparison(order, "\\"$$coke\\"", "EQ")';
      return [code, order];
};

function nobugsComparison(arg0, arg1, operator) {
	arg0 = arg0.data;
	arg1 = arg1.data;
	operator = NoBugsJavaScript.OPERATORS[operator.data];
	
	if (arg0.type != undefined) {
		arg0 = '\"' + arg0.descr + '\"';
	} else if (arg1.type != undefined) {
		arg1 = '\"' + arg1.descr + '\"';
	}
	var ret = eval(arg0 + ' ' + operator + ' ' + arg1);
	return ret;
};
