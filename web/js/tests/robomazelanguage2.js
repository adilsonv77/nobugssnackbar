'use strict';

Blockly.Blocks['robomaze_andar'] = {
		  init: function() {
		    this.appendDummyInput()
		    	.appendField("andar");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		   
		   }
		};

Blockly.Blocks['robomaze_ehFimDoMundo'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("ehFimDoMundo");
		    this.setOutput(true);
		    this.setColour(120);
		    
		  }
		};

Blockly.Blocks['robomaze_verItem'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("verItem");
		    this.setOutput(true);
		    this.setColour(120);
		    }
		};



Blockly.Blocks['robomaze_recolheritem'] = {
		  init: function() {
		   
			  this.appendValueInput('in')
		        .appendField("recolherItem");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		    
		  }
		};

Blockly.Blocks['robomaze_virarabaixo'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("virarAbaixo");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};
Blockly.Blocks['robomaze_viraresquerda'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("virarEsquerda");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.Blocks['robomaze_virardireita'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("virarDireita");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.Blocks['cons_dir'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("DIREITA");
		    this.setOutput(true);
		    this.setColour(65);
		    
		  }
		};

Blockly.Blocks['cons_esq'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("ESQUERDA");
		    this.setOutput(true);
		    this.setColour(65);
		  
		  }
		};

Blockly.Blocks['cons_dinheiro'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("DINHEIRO");
		    this.setOutput(true);
		    this.setColour(65);
		  
		  }
		};
Blockly.Blocks['cons_aranha'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("ARANHA");
		    this.setOutput(true);
		    this.setColour(65);
		  
		  }
		};