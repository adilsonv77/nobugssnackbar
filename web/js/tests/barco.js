'use strict';

Blockly.Blocks['atravessar'] = {
		  init: function() {
		    this.appendValueInput('in1')
		        .appendField("atravessar");
		    this.appendValueInput('in2')
	             .appendField("");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.Blocks['cons_barco_A'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("A");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_barco_B'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("B");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_barco_C'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("C");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_barco_P'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("P");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.Blocks['cons_barco_T'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("T");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.Blocks['cons_barco_V'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("V");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};