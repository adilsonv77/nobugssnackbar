/**
 * @fileoverview Modifications of the original Blockly blocks.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

Blockly.genUid.soup_ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

Blockly.Blocks['controls_if'].oldControlsIfInit = Blockly.Blocks['controls_if'].init;

Blockly.Blocks['controls_if'].init = function() {
	
	this.oldControlsIfInit();
	
	if (Blockly.Blocks['controls_if'].useMutator)
		this.setMutator(new Blockly.Mutator(['controls_if_else']));
	else
		this.setMutator(null);
	
};

function initBasedOnMissionConfig(obj){
	
	var disableContextMenu = true;
	var this_ = obj;
    if (Game.toolbox) {
    	if (Game.missionType === "fixBugs")
    		this_.showNewVar = Game.allowsCreateVars === "true";
    	else {
        	if (Game.toolbox === '<xml id="toolbox" style="display: none"></xml>') {
            	
        		if (this_.inputList[0].fieldRow.length > 0)
	        		// changes the context menu of the variable name
	        		this_.inputList[0].fieldRow[0].menuGenerator_ = function() {
	        	    	return [[this.getText(), this.getText()]];
	        	    };
        	} else
        		disableContextMenu = false;
    		
    	}
    	if (disableContextMenu) {
    		this_.contextMenuMsg_ = null;
    		this_.contextMenuType_ = null;
    	    
    		this_.customContextMenu = null;
    		
    	}
	}
    
    return !disableContextMenu;
}

Blockly.Blocks['variables_get'].oldVariablesGetInit = Blockly.Blocks['variables_get'].init;
Blockly.Blocks['variables_get'].init = function() {
	

	this.oldVariablesGetInit();
	initBasedOnMissionConfig(this);
    
};

Blockly.Blocks['variables_set'].init = function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    
    this.jsonInit({
    	"message0": BlocklyApps.getMsg('Blockly_variableSet'),
    	 "args0": [
     	           {
    	             "type": "input_value",
    	             "name": "VALUE"
    	           },
       	           {
      	             "type": "field_variable",
      	             "name": "VAR",
      	             "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME
      	           }
    	         ],
    	 "colour": Blockly.Blocks.variables.HUE
    });
 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    
    // if it's a mission that does not accept adding new blocks, then is not allowed to change the variables
    var useContextMenu = initBasedOnMissionConfig(this);
    
    this.contextMenuMsg_ = (useContextMenu?Blockly.Msg.VARIABLES_SET_CREATE_GET:null);
    this.contextMenuType_ = (useContextMenu?'variables_get':null);
  };


Blockly.Connection.prototype.checkType_ = function(otherConnection) {
  // Don't split a connection where both sides are immovable.
  var thisTargetBlock = this.targetBlock();
  if (thisTargetBlock && !thisTargetBlock.isMovable() &&
      !this.sourceBlock_.isMovable()) {
    return true;
  }
  var otherTargetBlock = otherConnection.targetBlock();
  if (otherTargetBlock && !otherTargetBlock.isMovable() &&
      !otherConnection.sourceBlock_.isMovable()) {
    return true;
  }
  if (!this.check_ || !otherConnection.check_) {
    // One or both sides are promiscuous enough that anything will fit.
    return true;
  }
  // Find any intersection in the check lists.
  for (var x = 0; x < this.check_.length; x++) {
    if (otherConnection.check_.indexOf(this.check_[x]) != -1) {
      return true;
    }
  }
  // No intersection.
  return false;
};

Blockly.Blocks['controls_whileUntil'].oldInit = Blockly.Blocks['controls_whileUntil'].init;
Blockly.Blocks['controls_whileUntil'].init = function() {
	
	this.oldInit();
	this.inputList.shift();
	
    this.appendValueInput('BOOL')
    	.setCheck('Boolean')
    	.appendField(new Blockly.FieldLabel(Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE));
    
    var f = this.inputList[0];
    this.inputList[0] = this.inputList[1];
    this.inputList[1] = f;

	this.inputList[0].fieldRow[0].name = "MODE";
	this.inputList[0].fieldRow[0].value = "WHILE";
};

Blockly.FieldTextInput.prototype.oldShowEditor_ = Blockly.FieldTextInput.prototype.showEditor_;

Blockly.FieldTextInput.prototype.showEditor_ = function(opt_quietInput) {
	if (Game.toolbox === '<xml id="toolbox" style="display: none"></xml>' && Game.missionType !== "fixBugs")
		return;
	
	this.oldShowEditor_(opt_quietInput);
};

//I added parentesis in the expression, to facilitate reading to the students
Blockly.Blocks['math_arithmetic'].init = function() {
    this.jsonInit({
        "message0": "(%1 %2 %3)",
        "colour" : Blockly.Blocks.math.HUE,
        "args0": [
          {
              "type": "input_value",
              "name": "A",
              "check" : "Number"
            },
          {
            "type": "field_dropdown",
            "name": "OP",
            "options": [
              [Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
              [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
              [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
              [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE'],
              [Blockly.Msg.MATH_POWER_SYMBOL, 'POWER']
            ]
          },
            {
                "type": "input_value",
                "name": "B",
                "check" : "Number"
              },
        ]});

	this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);

    this.setOutput(true, 'Number');

    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
      };
      return TOOLTIPS[mode];
    });
	  	
	if (Game.toolbox === '<xml id="toolbox" style="display: none"></xml>' && Game.missionType !== "fixBugs") {
		
		this.inputList[1].fieldRow[0].options_ = this.inputList[1].fieldRow[0].menuGenerator_;
		this.inputList[1].fieldRow[0].menuGenerator_ = function() {
			var t = this.getText();
	    	for (var i = 0; i < this.options_.length; i++)
	    		if (this.options_[i][1] === this.getValue()) {
	    			t = this.options_[i][0];
	    			break;
	    		}
	    			
			return [[t, this.getValue()]];
	    };
		
	}
};

//I added parentesis in the expression, to facilitate reading to the students
Blockly.Blocks['logic_operation'].init = function() {
		    var OPERATORS =
		        [[Blockly.Msg.LOGIC_OPERATION_AND, 'AND'],
		         [Blockly.Msg.LOGIC_OPERATION_OR, 'OR']];
		    this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
		    this.setColour(Blockly.Blocks.logic.HUE);
		    this.setOutput(true, 'Boolean');
		    
		    this.appendDummyInput()
		    	.appendField('(');
		    this.appendValueInput('A')
		        .setCheck('Boolean');
		    this.appendValueInput('B')
		        .setCheck('Boolean')
		        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
		    this.appendDummyInput()
		    	.appendField(')');

		    this.setInputsInline(true);
		    // Assign 'this' to a variable for use in the tooltip closure below.
		    var thisBlock = this;
		    this.setTooltip(function() {
		      var op = thisBlock.getFieldValue('OP');
		      var TOOLTIPS = {
		        'AND': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
		        'OR': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
		      };
		      return TOOLTIPS[op];
		    });
		  };
		


Blockly.Blocks['logic_compare'].oldInit = Blockly.Blocks['logic_compare'].init;
Blockly.Blocks['logic_compare'].init = function() {

	this.oldInit();
	
	if (Game.toolbox === '<xml id="toolbox" style="display: none"></xml>' && Game.missionType !== "fixBugs") {
		
		this.inputList[1].fieldRow[0].options_ = this.inputList[1].fieldRow[0].menuGenerator_;
		this.inputList[1].fieldRow[0].menuGenerator_ = function() {
			var t = this.getText();
	    	for (var i = 0; i < this.options_.length; i++)
	    		if (this.options_[i][1] === this.getValue()) {
	    			t = this.options_[i][0];
	    			break;
	    		}
	    			
			return [[t, this.getValue()]];
	    };
		
	}
	
};

/* 
 * I changed the default behaviour because always is an increment.
 */
Blockly.JavaScript['controls_for'] = function(block) {
	  // For loop.
	  var variable0 = Blockly.JavaScript.variableDB_.getName(
	      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
	      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
	      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	  var increment = Blockly.JavaScript.valueToCode(block, 'BY',
	      Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
	  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
	  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
	  var code;

	  code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
	        variable0 + ' <= '  + argument1 + '; ' +
	        variable0;
	  var step = Math.abs(parseFloat(increment));
      code += ' += ' + step;
	  code += ') {\n' + branch + '}\n';
	  return code;
};

/* ************************************************************************************/
/*     Change the original window.prompt to nobugswindow.prompt         */
/* ************************************************************************************/

Blockly.FieldVariable.dropdownChange = function(text) {
	
	  function promptName(promptText, defaultText, finishPrompt) {
	    Blockly.hideChaff();
	    var finishWindowPrompt = function(newVar) {
		    // Merge runs of whitespace.  Strip leading and trailing whitespace.
		    // Beyond this, all names are legal.
		    if (newVar) {
		      newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
		      if (newVar == Blockly.Msg.RENAME_VARIABLE ||
		          newVar == Blockly.Msg.NEW_VARIABLE) {
		        // Ok, not ALL names are legal...
		        newVar = null;
		      }
		    }
		    
		    Hints.startHints();
		    finishPrompt(newVar);
	    };

	    window.prompt(promptText, defaultText, finishWindowPrompt);
	  }
	  
	  Game.sourceBlock_ = this.sourceBlock_;
	  var workspace = this.sourceBlock_.workspace;
	  var window_prompt_field = this;
	  if (text == Blockly.Msg.RENAME_VARIABLE) {
	    var oldVar = this.getText();
	    
	    var finishRenameVariable = function(text) {
		    if (text) {
		      Blockly.Variables.renameVariable(oldVar, text, workspace);
		    }
	    };
	    
	    text = promptName(Blockly.Msg.RENAME_VARIABLE_TITLE.replace('%1', oldVar),
	                      oldVar, finishRenameVariable);
	    return null;
	    
	  } else 
		  if (text == Blockly.Msg.NEW_VARIABLE) {
		    
			  var finishNewVariable = function(text) {
				  
				    // Since variables are case-insensitive, ensure that if the new variable
				    // matches with an existing variable, the new case prevails throughout.
				    if (text) {
				      Blockly.Variables.renameVariable(text, text, workspace);
				      window_prompt_field.setValue(text);
				    }
			  
			  };
			  
			  promptName(Blockly.Msg.NEW_VARIABLE_TITLE, '', finishNewVariable);
		      return null;
		  }
	  
	  
	  return undefined;
	};

/* ************************************************************************************/
/*     Change the original window.prompt to nobugswindow.prompt                       */
/* ************************************************************************************/
	
Blockly.FieldVariable.getVars = function(block) {

	var ret = [];
	if (block.getVars) {
		var v = block.getVars();
		
		for (var i = v.length-1; i >= 0; i--)
			ret.push(v[i]);
	}

	if (block.childBlocks_) {
		block.childBlocks_.forEach(function(c) {
    		Blockly.FieldVariable.getVars(c).forEach(function(v){
    			ret.push(v);	
    		});
    	});
	}
	
	return ret;

};

Blockly.FieldVariable.dropdownCreate = function() {
	
  var showNewVar = (this.sourceBlock_ == null?true:this.sourceBlock_.showNewVar);
  
  var variableList = [];
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {

	  variableList = Blockly.Variables.procVariables(this.sourceBlock_);
    
  }
  
  // Ensure that the currently selected variable is an option.
  var name = this.getText();
  if (name && variableList.indexOf(name) == -1) {
    variableList.push(name);
  }
  variableList.sort(goog.string.caseInsensitiveCompare);
  if (showNewVar == undefined || showNewVar) {
	  
	  variableList.push(Blockly.Msg.RENAME_VARIABLE);
	  variableList.push(Blockly.Msg.NEW_VARIABLE);
	  
  }
  // Variables are not language-specific, use the name as both the user-facing
  // text and the internal representation.
  var options = [];
  for (var x = 0; x < variableList.length; x++) {
    options[x] = [variableList[x], variableList[x]];
  }
  return options;
};


/* ******************************************************************************/
/* *                              Lists/Arrays                                 **/   
/* ******************************************************************************/

Blockly.Blocks['lists_create_limited'] = {
  /**
   * Block for creating an empty list with some dimension.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": BlocklyApps.getMsg('Blockly_listsCreate') + " [%1]",
      "args0": [
                {
                    "type": "input_value",
                    "name": "SIZE",
                    "check" : "Number"
                  }
                ],

      "output": "Array",
      "colour": Blockly.Blocks.lists.HUE,
    });
  }
};

Blockly.JavaScript['lists_create_limited'] = function(block) {
	var size = Blockly.JavaScript.valueToCode(block, 'SIZE', Blockly.JavaScript.ORDER_NONE) || '';
	return ['arrayCreate(' + size + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['lists_get'] = {
  /**
   * Block for getting element at index.
   * @this Blockly.Block
   */
  init: function() {
    
	    this.jsonInit({
	        "message0": BlocklyApps.getMsg('Blockly_listsGet'),
	        "args0": [
	                  {
	                      "type": "input_value",
	                      "name": "ARRAY",
	                      "check" : "Array"
	                    },
	                  {
	                      "type": "input_value",
	                      "name": "INDEX",
	                      "check" : "Number"
	                    }

	                  ],

	        "colour": Blockly.Blocks.lists.HUE,
	      });
	  
	    this.setOutput(true);
	    this.setInputsInline(true);
	    
  }
};

Blockly.JavaScript['lists_get'] = function(block) {
	var array = Blockly.JavaScript.valueToCode(block, 'ARRAY', Blockly.JavaScript.ORDER_NONE) || 'null';
	var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_NONE) || '-1';
	
	return ['arrayGetValue(' + array + ', ' + index + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['lists_set'] = {
	  /**
	   * Block for setting the element at index.
	   * @this Blockly.Block
	   */
	  init: function() {
		    this.jsonInit({
		        "message0": BlocklyApps.getMsg('Blockly_listsSet'),
		        "args0": [
		                  {
		                      "type": "input_value",
		                      "name": "ARRAY",
		                      "check" : "Array"
		                    },
		                  {
		                      "type": "input_value",
		                      "name": "INDEX",
		                      "check" : "Number"
		                    },
		                  {
		                      "type": "input_value",
		                      "name": "VALUE",
		                    }

		                  ],

		        "colour": Blockly.Blocks.lists.HUE,
		      });

	    this.setInputsInline(true);
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	  }
	};

Blockly.JavaScript['lists_set'] = function(block) {
	var array = Blockly.JavaScript.valueToCode(block, 'ARRAY', Blockly.JavaScript.ORDER_NONE) || 'null';
	var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_NONE) || '-1';
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '-1';
	
	return 'arraySetValue('+ array + ',' + index + ',' + value + ');\n';
};

Blockly.JavaScript['lists_length'] = function(block) {
	  // List length.
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
	      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '[]';
	  return ['arrayLength('+argument0 + ')', Blockly.JavaScript.ORDER_MEMBER];
	};



/* ******************************************************************************/
/* *                              Procedures                                   **/   
/* ******************************************************************************/

Blockly.Blocks['procedures_callnoreturn'].oldInit = Blockly.Blocks['procedures_callnoreturn'].init;
Blockly.Blocks['procedures_callnoreturn'].init = function() {
	this.oldInit();
	this.setInputsInline(true);
};

Blockly.Blocks['procedures_callnoreturn'].oldRenderArgs_ = Blockly.Blocks['procedures_callnoreturn'].renderArgs_;
Blockly.Blocks['procedures_callnoreturn'].renderArgs_ = function() {
	this.oldRenderArgs_();
};

Blockly.Blocks['procedures_callreturn'].oldInit = Blockly.Blocks['procedures_callreturn'].init;
Blockly.Blocks['procedures_callreturn'].init = function() {
	this.oldInit();
	this.setInputsInline(true);
};
	

Blockly.Block.prototype.setColour = function(colour) {
	  var hue = parseFloat(colour);
	  if (!isNaN(hue)) {
	    this.colour_ = Blockly.hueToRgb(hue);
	  } else if (goog.isString(colour) && colour.match(/^#[0-9a-fA-F]{6}$/)) {
	    this.colour_ = colour;
	  } else {
	    throw 'Invalid colour: ' + colour;
	  }
	  if (this.rendered) {
	    this.updateColour();
	  }

};