'use strict';
var NoBugsJavaScript = {};

NoBugsJavaScript.oldVarSet = null;
NoBugsJavaScript.oldLogicCompare = null;
NoBugsJavaScript.varName= null;

NoBugsJavaScript.oldMathArith = null;

NoBugsJavaScript.typeComparison = "function nobugsComparison(arg0, arg1, operator) {if (arg0.type != undefined ) {arg0 = arg0.descr; } else if (arg1.type != undefined) {arg1 = arg1.descr;}var OPERATORS={'EQ': '==','NEQ': '!=','LT': '<','LTE': '<=','GT': '>','GTE': '>='};return eval(arg0 + ' ' + OPERATORS[operator] + ' ' + arg1);};";

NoBugsJavaScript.redefine = function() {
	
    Blockly.Msg.CONTROLS_IF_MSG_THEN = BlocklyApps.getMsg('Blockly_ifThen'); 
	  
    if (NoBugsJavaScript.oldVarSet == null) {
    	
    	NoBugsJavaScript.oldVarSet = Blockly.JavaScript['variables_set'];
        Blockly.JavaScript['variables_set'] = NoBugsJavaScript.newVarSet;
        
        NoBugsJavaScript.oldMathArith = Blockly.JavaScript['math_arithmetic'];
        Blockly.JavaScript['math_arithmetic'] = NoBugsJavaScript.newMathArith;
    }
    
    if (NoBugsJavaScript.oldLogicCompare == null) {
    	
    	NoBugsJavaScript.oldLogicCompare = Blockly.JavaScript['logic_compare'];
    	Blockly.JavaScript['logic_compare'] = NoBugsJavaScript.newLogicCompare;
        
    }
    
    if (NoBugsJavaScript.oldLogicOperation == null) {
    	
    	NoBugsJavaScript.oldLogicOperation = Blockly.JavaScript['logic_operation'];
    	Blockly.JavaScript['logic_operation'] = NoBugsJavaScript.newLogicOperation;
    }
    
};
  
NoBugsJavaScript.newVarSet = function(block) {
	
	var s = NoBugsJavaScript.oldVarSet(block);
	
	return  'NoBugsJavaScript.varName="'+block.getFieldValue('VAR')+'";\n' + s +
				'\nNoBugsJavaScript.varName=null;\n';
};

//Basic arithmetic operators, and power.
NoBugsJavaScript.ARITH_OPERATORS = {
  'ADD': [' + ', Blockly.JavaScript.ORDER_ADDITION],
  'MINUS': [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
  'MULTIPLY': [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
  'DIVIDE': [' / ', Blockly.JavaScript.ORDER_DIVISION],
  'POWER': [null, Blockly.JavaScript.ORDER_COMMA]  // Handle power separately.
};


NoBugsJavaScript.newMathArith = function(block) {
	
	var vars = "";
	if (block.inputList[0].connection.targetConnection != null && block.inputList[0].connection.targetConnection.sourceBlock_.type === "variables_get") {
		vars = "\"" + block.inputList[0].connection.targetConnection.sourceBlock_.inputList[0].fieldRow[0].text_ + "\"" ;
	}

	if (block.inputList[1].connection.targetConnection != null && block.inputList[1].connection.targetConnection.sourceBlock_.type === "variables_get") {
		vars = vars + (vars === ""?"":",") + "\"" + block.inputList[1].connection.targetConnection.sourceBlock_.inputList[0].fieldRow[0].text_+ "\"";
	}
	
	// based from the original JavaScript
	  var operator = block.getFieldValue('OP');
	  var order = NoBugsJavaScript.ARITH_OPERATORS[operator][1];
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

	  var code = 'nobugsMathArith(%0, %1, "%2")'.format(argument0, argument1, operator);
	
	return ["(verifyMathArithVariable([" + vars + "])?" + code + ":null)", 
	        		Blockly.JavaScript.ORDER_FUNCTION_CALL]; 
	
};

function nobugsMathArith(arg0, arg1, operator) {
	
	operator = NoBugsJavaScript.ARITH_OPERATORS[(operator.data == null?operator:operator.data)][0];
	
	if (isNaN(parseInt(arg0))) {
		arg0 = arg0.data;
		
		if (arg0 == undefined) {
			BlocklyApps.log.push(["fail", "Error_variableDoesntInitialized"]);
			throw false;
		}
		
		if (arg0.type != undefined) 
			arg0 = arg0.value;
		
	}

	if (isNaN(parseInt(arg1))) {
		arg1 = arg1.data;
		
		if (arg1 == undefined) {
			BlocklyApps.log.push(["fail", "Error_variableDoesntInitialized"]);
			throw false;
		}
		
		if (arg1.type != undefined) 
			arg1 = arg1.value;
		
	}
	
	if (arg0 == undefined || arg1 == undefined) {
		BlocklyApps.log.push(["fail", "Error_onceVariableIsNotANumber"]);
		throw false;
	}
	
	if (!operator) {
	    var code = 'Math.pow(' + arg0 + ', ' + arg1 + ')';
	    return eval(code);
	} else 
		if (operator === NoBugsJavaScript.ARITH_OPERATORS['DIVIDE'][0]) {
			return eval ('Math.floor(' +arg0 + ' / ' + arg1+')');
		}
	
	return  eval(arg0 + ' ' + operator + ' ' + arg1);
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

	  var code = 'nobugsComparison(%0, %1, "%2")'.format(argument0, argument1, blockOperator); 
	  //code = 'nobugsComparison(order, "\\"$$coke\\"", "EQ")';
      return [code, order];
};

function nobugsComparison(arg0, arg1, operator) {
	
	hero.verifyObjectives("useBlock", "logic_compare");
	
	operator = NoBugsJavaScript.OPERATORS[(operator.data == null?operator:operator.data)];
	
	if (!isNaN(parseInt(arg0)))
		return eval(arg0 + ' ' + operator + ' ' + arg1); // the arguments are numbers. we dont deal with this type of values
			
	if (arg0 === true || arg0 === false || arg0 === "true" || arg0 === "false")
		return eval(arg0 + ' ' + operator + ' ' + arg1); // the arguments are booleans. we dont deal with this type of values
	
	arg0 = arg0.data;
	arg1 = arg1.data;
	
	if (arg0 == undefined || arg1 == undefined) {
		BlocklyApps.log.push(["fail", "Error_variableDoesntInitialized"]);
		throw false;
	}
	
	if (arg0.type != undefined) {
		arg0 = '\"' + arg0.descr + '\"';
	} else if (arg1.type != undefined) {
		arg1 = '\"' + arg1.descr + '\"';
	}
	var ret = eval(arg0 + ' ' + operator + ' ' + arg1);
	return ret;
};

NoBugsJavaScript.verifyLogicOperation = function () {
	hero.verifyObjectives("useBlock", "logic_operation");
	return true;
};

NoBugsJavaScript.newLogicOperation = function(block) {
	
	var r = NoBugsJavaScript.oldLogicOperation(block);
	r[0] = 'verifyLogicOperation()' + " && " + r[0];
	return r;
	
};