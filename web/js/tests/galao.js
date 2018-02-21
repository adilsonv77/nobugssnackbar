'use strict';

Blockly.Blocks['encher'] = {
		  init: function() {
		    this.appendValueInput('in')
		        .appendField("encher");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.Blocks['esvaziar'] = {
		  init: function() {
		    this.appendValueInput('in')
		        .appendField("esvaziar");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.Blocks['virar'] = {
		  init: function() {
		    this.appendValueInput('in1')
		        .appendField("virar de");
		    this.appendValueInput('in2')
	        .appendField("para");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.Blocks['cons_galao_A'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("A");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_galao_B'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("B");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_galao_C'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("C");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};