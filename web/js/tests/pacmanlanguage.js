'use strict';

Blockly.Blocks['pacman_enxerga'] = {
		  init: function() {
		    this.appendValueInput('VALUE')
		    	.appendField("enxergaHeroi");
		    this.setColour(120);
		    this.setOutput(true);
		   }
		};

Blockly.JavaScript['pacman_enxerga'] = function(block) {
	  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
	      Blockly.JavaScript.ORDER_NONE) || '\"\\\"$$$esquerda\\\"\"';
	  return ['PacMan.enxergaHeroi(' + value + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['pacman_calcdistheroi'] = {
		  init: function() {
		    this.appendValueInput('VALUE')
		    	.appendField("calculaDistanciaHeroi");
		    this.setColour(120);
		    this.setOutput(true);
		   }
		};

Blockly.JavaScript['pacman_calcdistheroi'] = function(block) {
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || '\"\\\"$$$esquerda\\\"\"';
	return ['PacMan.calculaDistanciaHeroi(' + value + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['pacman_acelerar'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("acelerar");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.JavaScript['pacman_acelerar'] = function(block) {
	return 'PacMan.acelerar();\n';
};

Blockly.Blocks['pacman_heroiVitaminado'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("heroiVitaminado");
		    this.setOutput(true);
		    this.setColour(120);
		  }
		};

Blockly.JavaScript['pacman_heroiVitaminado'] = function(block) {
	return ['PacMan.heroiVitaminado()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['pacman_escolheDirecaoAleatoria'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("escolheDirecaoAleatoria");
		    this.setOutput(true);
		    this.setColour(120);
		  }
		};

Blockly.JavaScript['pacman_escolheDirecaoAleatoria'] = function(block) {
	return ['PacMan.escolheDirecaoAleatoria()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.Blocks['pacman_disparar'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("disparar");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};

Blockly.JavaScript['pacman_disparar'] = function(block) {
	return 'PacMan.disparar();\n';
};

Blockly.Blocks['pacman_andarProxDirecao'] = {
		  init: function() {
		    this.appendValueInput('VALUE')
		        .appendField("andarProxDirecao");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(120);
		  }
		};


Blockly.JavaScript['pacman_andarProxDirecao'] = function(block) {
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || '\"\\\"$$$esquerda\\\"\"';
	return 'PacMan.andarProxDirecao(' + value + ');\n';
};

Blockly.Blocks['cons_esq'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("ESQ");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_esq'] = function(block) {
	return ['\"\\\"$$$esquerda\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['cons_dir'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("DIR");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_dir'] = function(block) {
	return ['\"\\\"$$$direita\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['cons_acima'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("ACIMA");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_acima'] = function(block) {
	return ['\"\\\"$$$acima\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['cons_abaixo'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("ABAIXO");
		    this.setOutput(true);
		    this.setColour(65);
		  }
		};

Blockly.JavaScript['cons_abaixo'] = function(block) {
	return ['\"\\\"$$$abaixo\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

var PacMan = {};
PacMan.direcoes = ['\"$$$esquerda\"', '\"$$$direita\"', '\"$$$acima\"', '\"$$$abaixo\"'];

PacMan.enxergaHeroi = function(dir) {
	return (dir === PacMan.dir);
};

PacMan.calculaDistanciaHeroi = function(dir) {
	if (dir === PacMan.dir) {
		return PacMan.dist;
	} else {
		return 0;
	}
};

PacMan.acelerar = function() {
	PacMan.veloc++;
};
PacMan.heroiVitaminado = function() {
	return PacMan.vitam;
};
PacMan.disparar = function() {
	PacMan.energia--;
};

PacMan.escolheDirecaoAleatoria = function() {
	return PacMan.direcoes[Math.floor((Math.random() * 4))];
};

PacMan.andarProxDirecao = function(dir) {
	PacMan.dir = dir;
};

PacMan.initTest = function(dir, dist, vitam, veloc, energia) {
	
	PacMan.veloc = veloc;
	PacMan.energia = energia;
	PacMan.dist = dist;
	PacMan.dir = dir;
	PacMan.vitam = vitam;
	
	var res = {"this.veloc": veloc, "this.energia":energia};
	if (dist <= 10) {
		res["this.dir"] = dir;
		if (dist == 10)
			res["this.veloc"] = (vitam?veloc+1:veloc);
		else
			if (dist >= 4 && dist <= 6)
				res["this.energia"] = energia-1;
	}
		
	return res;
	
};

PacMan.evalOutput = function(config) {
	if (config["this.veloc"] == PacMan.veloc && config["this.energia"] == PacMan.energia) {
		if (config["this.dir"] == null || config["this.dir"] === PacMan.dir) {
			return true;
		} else
			return false;
	} else
		return false;
	
};
