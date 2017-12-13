'use strict';

Blockly.Blocks['read'] = {
		  init: function() {
		    this.appendDummyInput()
		    	.appendField("read");
		    this.setOutput(true);
		    this.setColour(120);
		   }
		};


Blockly.JavaScript['read'] = function(block) {
	
	return 'read()';
};

Blockly.Blocks['print'] = {
		  init: function() {
		    this.appendValueInput('in')
		        .appendField("print");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.JavaScript['print'] = function(block) {
	var value = Blockly.JavaScript.valueToCode(block, 'PORTA',
		      Blockly.JavaScript.ORDER_NONE);
	return 'print('+value+')';
};

Blockly.Blocks['cons_pularLinha'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("PRÓXIMA LINHA");
		    this.setOutput(true);
		    this.setColour(65);
		  
		  }
		};