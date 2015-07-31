'use strict';

Blockly.Blocks['robomaze_andar'] = {
		  init: function() {
		    this.appendDummyInput()
		    	.appendField("andar");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		   }
		};

Blockly.Blocks['robomaze_retornar'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("retornar");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		  }
		};

Blockly.Blocks['robomaze_qtdadeitens'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("qtdadeItens");
		    this.setOutput(true);
		    this.setColour(120);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		  }
		};

Blockly.Blocks['robomaze_corcelula'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("corCelula");
		    this.setOutput(true);
		    this.setColour(120);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		  }
		};

Blockly.Blocks['robomaze_largaritem'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("largarItem");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		  }
		};

Blockly.Blocks['robomaze_viraresquerda'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("virarEsquerda");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		  }
		};

Blockly.Blocks['robomaze_virardireita'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("virarDireita");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		  }
		};

Blockly.Blocks['cons_preto'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("PRETO");
		    this.setOutput(true);
		    this.setColour(65);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		  }
		};

Blockly.Blocks['cons_amarelo'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("AMARELO");
		    this.setOutput(true);
		    this.setColour(65);
		    /*
		    this.setEditable(false);
		    this.setMovable(false);
		    this.setDeletable(false);
		    */
		  }
		};