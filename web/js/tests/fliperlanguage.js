'use strict';

Blockly.Blocks['fliper_pegarbola'] = {
		  init: function() {
		    this.appendDummyInput()
		    	.appendField("pegarBola");
		    this.setOutput(true);
		    this.setColour(120);
		   }
		};

Blockly.JavaScript['fliper_pegarbola'] = function(block) {
	return ['TestRT.pegarBola()',Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['fliper_dirporta'] = {
		  init: function() {
		    this.appendValueInput("PORTA")
		    	.appendField("direcaoPorta");
		    this.setColour(120);
		    this.setOutput(true);
		   }
		};

Blockly.JavaScript['fliper_dirporta'] = function(block) {
	  var value = Blockly.JavaScript.valueToCode(block, 'PORTA',
		      Blockly.JavaScript.ORDER_NONE) || null;
	return ['TestRT.dirPorta(' + value + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['fliper_coloqueBola'] = {
		  init: function() {
		    this.appendValueInput('BOLA')
		        .appendField("colocarBolaNaSaida");
		    this.appendValueInput('SAIDA');
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.JavaScript['fliper_coloqueBola'] = function(block) {
   var bola = Blockly.JavaScript.valueToCode(block, 'BOLA',
	      Blockly.JavaScript.ORDER_NONE) || '1';
   var saida = Blockly.JavaScript.valueToCode(block, 'SAIDA',
	      Blockly.JavaScript.ORDER_NONE) || '1';
   return 'TestRT.colocarBola(' +bola+ ',' +saida+');\n';
};


Blockly.Blocks['cons_porta_p'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("PORTA P");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_porta_p'] = function(block) {
	return ['\"\\\"$$$porta_p\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['cons_porta_r'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("PORTA R");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_porta_r'] = function(block) {
	return ['\"\\\"$$$porta_r\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['cons_posicao_0'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("POSICAO 0");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_posicao_0'] = function(block) {
	return ['\"\\\"$$$posicao_0\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.Blocks['cons_posicao_1'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("POSICAO 1");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_posicao_1'] = function(block) {
	return ['\"\\\"$$$posicao_1\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['cons_saida_a'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("SAIDA A");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_saida_a'] = function(block) {
	return ['\"\\\"$$$saida_a\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['cons_saida_b'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("SAIDA B");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_saida_b'] = function(block) {
	return ['\"\\\"$$$saida_b\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.Blocks['cons_saida_c'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("SAIDA C");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_saida_c'] = function(block) {
	return ['\"\\\"$$$saida_c\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

TestRT.portas = ['\"$$$porta_p\"', '\"$$$porta_r\"'];
TestRT.posicoes = ['\"$$$posicao_0\"', '\"$$$posicao_1\"'];
TestRT.saidas = ['\"$$$saida_a\"', '\"$$$saida_b\"', '\"$$$saida_c\"'];

TestRT.bolas = [];
TestRT.direcoesPortasP = [];
TestRT.direcoesPortasR = [];
TestRT.saidasEsperadas = [];
TestRT.saidasRealizadas = [];

TestRT.initTest = function() {
	TestRT.bolas = [{id: "c"}, {id: "a"}, {id: "b"}];
	TestRT.bolasEsperadas = ["c", "a", "b"];
	TestRT.direcoesPortasP = [null, '\"$$$posicao_0\"', '\"$$$posicao_1\"', '\"$$$posicao_1\"'];
	TestRT.direcoesPortasR = [null, '\"$$$posicao_1\"', '\"$$$posicao_1\"', '\"$$$posicao_0\"'];
	TestRT.saidasEsperadas = ['\"$$$saida_b\"', '\"$$$saida_a\"', '\"$$$saida_c\"'];
	TestRT.saidasRealizadas = [];
};

TestRT.evalOut = function() {
	if (TestRT.saidasRealizadas.length == 3) {
		for (var i = 0; i < 3; i++) {
			var sr = TestRT.saidasRealizadas[i];
			if (sr.bola == null)
				return false;
			
			if (!(sr.bola.id === TestRT.bolasEsperadas[i] && sr.saida == TestRT.saidasEsperadas[i])) {
				return false;
			}
		}
		return true;
			
	}
	return false;
};


TestRT.pegarBola = function() {
	if (TestRT.bolas.length == 0)
		return null;
	
	var bola = TestRT.bolas[0];
	TestRT.bolas.splice(0, 1);
	TestRT.direcoesPortasP.splice(0, 1);
	TestRT.direcoesPortasR.splice(0, 1);
	return bola;
};

TestRT.dirPorta = function(PORTA) {
	if (PORTA === (TestRT.portas[0])) {
		if (TestRT.direcoesPortasP.length == 0)
			return 2;
		
		return TestRT.direcoesPortasP[0];
	} else
		if (PORTA === (TestRT.portas[1])) {
			if (TestRT.direcoesPortasR.length == 0)
				return 2;
			
			return TestRT.direcoesPortasR[0];
			
		} else {
			return 2;
		}
};

TestRT.colocarBola = function(bola, saida) {
	
	TestRT.saidasRealizadas.push({saida: saida, bola: bola});
};

