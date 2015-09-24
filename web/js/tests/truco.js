'use strict';

Blockly.Blocks['truco_valorDaCarta'] = {
		  init: function() {
		    this.appendValueInput("CARTA")
		    	.appendField("valorDaCarta");
		    this.setOutput(true);
		    this.setColour(120);
		   }
		};

Blockly.Blocks['truco_naipeDaCarta'] = {
		  init: function() {
		    this.appendValueInput("CARTA")
		    	.appendField("naipeDaCarta");
		    this.setOutput(true);
		    this.setColour(120);
		   }
		};

Blockly.Blocks['truco_busqueUmaCarta'] = {
		  init: function() {
		    this.appendDummyInput()
		    	.appendField("busqueUmaCarta");
		    this.setOutput(true);
		    this.setColour(120);
		   }
		};

Blockly.Blocks['truco_coloqueCartaNoSlot'] = {
		  init: function() {
		    this.appendValueInput('CARTA')
		        .appendField("coloqueCartaNoSlot");
		    this.appendValueInput('SLOT');
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.JavaScript['truco_valorDaCarta'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'CARTA',
	      Blockly.JavaScript.ORDER_NONE) || null;
	return ['TestRT.valorDaCarta( ' + value + ' )',Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['truco_naipeDaCarta'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'CARTA',
	      Blockly.JavaScript.ORDER_NONE) || null;
	return ['TestRT.naipeDaCarta( ' + value + ' )',Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['truco_busqueUmaCarta'] = function(block) {
	return ['TestRT.busqueUmaCarta()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['truco_coloqueCartaNoSlot'] = function(block) {
   var carta = Blockly.JavaScript.valueToCode(block, 'CARTA',
	      Blockly.JavaScript.ORDER_NONE) || '1';
   var slot = Blockly.JavaScript.valueToCode(block, 'SLOT',
	      Blockly.JavaScript.ORDER_NONE) || '1';
   return 'TestRT.coloqueCartaNoSlot(' +carta+ ',' +slot+');\n';
};

TestRT.cartas = [];
TestRT.slot = [null, null];

TestRT.initTest = function() {
	TestRT.cartas = [{valor:1, naipe:3}, {valor:2, naipe:3},
						  {valor:2, naipe:3}, {valor:1, naipe:3},
						  {valor:1, naipe:3}, {valor:2, naipe:2},
						  {valor:2, naipe:2}, {valor:1, naipe:3},
						  {valor:1, naipe:3}, {valor:1, naipe:2},
						  {valor:1, naipe:2}, {valor:1, naipe:3}
						  ];
};

TestRT.interactions = function() {
	return TestRT.cartas.length / 2;
};

TestRT.cleanSlots = function() {
	TestRT.slot = [null, null];
};

TestRT.evalOut = function() {
	
	if (TestRT.slot[0] != null && TestRT.slot[1] != null) {
		var aval =
					(TestRT.slot[0].valor < TestRT.slot[1].valor) || 
					(TestRT.slot[0].valor === TestRT.slot[1].valor && TestRT.slot[0].naipe <  TestRT.slot[1].naipe);
		
		if (!aval)
			return false;
		
	} else
		return false;
		
	return true;
};

TestRT.busqueUmaCarta = function() {
	if (TestRT.cartas.length == 0)
		return null;
	
	var carta = TestRT.cartas[0];
	TestRT.cartas.splice(0, 1);
	
	return carta;
};

TestRT.valorDaCarta = function(carta) {
	if (carta == null)
		return -1;
	
	return carta.valor;
};

TestRT.naipeDaCarta = function(carta) {
	if (carta == null)
		return -1;
	
	return carta.naipe;
};

TestRT.coloqueCartaNoSlot = function(carta, slot) {
	if (carta == null)
		return;
	
	if (isNaN(slot) || (slot < 1) && (slot > 2)) 
		return;
	
	TestRT.slot[slot-1] = carta;
};
