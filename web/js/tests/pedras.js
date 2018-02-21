'use strict';

Blockly.Blocks['mover_pedra'] = {
		  init: function() {
		    this.appendValueInput('in1')
		        .appendField("mover");
		    this.appendValueInput('in2')
	             .appendField("quantos");
		    this.appendValueInput('in3')
            .appendField("direção");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.Blocks['fugir_pedra'] = {
		  init: function() {
			  this.appendDummyInput()
		    	.appendField("fugir");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.Blocks['cons_pedra_dir_cima'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Cima");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.Blocks['cons_pedra_dir_baixo'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Baixo");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.Blocks['cons_pedra_dir_esq'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Esquerda");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.Blocks['cons_pedra_dir_dir'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Direita");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.Blocks['cons_pedra_A'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("A");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};


Blockly.Blocks['cons_pedra_B'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("B");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_pedra_C'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("C");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_pedra_D'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("D");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_pedra_E'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("E");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_pedra_F'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("F");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_pedra_G'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("G");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_pedra_H'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("H");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_pedra_I'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("I");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
Blockly.Blocks['cons_pedra_HEROI'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Herói");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};
