/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://meteoricsnackbar.googlecode.com/
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Programming Commands for NoBug's Snack Bar application.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['move_goToCustomer'] = {
		  // Block for moving to a specific customer in the counter.
		  init: function() {
		    this.setColour(160);
		    this.appendValueInput('VALUE')
		        .setCheck('Number')
		        .appendField('goToBarCounter');
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_goToCustomerTooltip'));
		  }
		};

Blockly.JavaScript['move_goToCustomer'] = function(block) {
	  // Generate JavaScript for moving to a specific customer in the counter.
	  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
	      Blockly.JavaScript.ORDER_NONE) || '0';
	  return 'goToBarCounter(' + value + ');\n';
	};

Blockly.Blocks['move_goToDisplay'] = {
		  // Block for moving to the display.
		  init: function() {
		    this.setColour(160);
		   
		    this.appendDummyInput()
		        .appendField('goToDisplay');
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_goToDisplayTooltip'));
		  }
		};

Blockly.JavaScript['move_goToDisplay'] = function(block) {
	  // Generate JavaScript for moving to the display.
	  return 'goToDisplay();\n';
	};

Blockly.Blocks['move_goToCooler'] = {
		  // Block for moving to the cooler.
		  init: function() {
		    this.setColour(160);
		   
		    this.appendDummyInput()
		        .appendField('goToCooler');
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_goToCoolerTooltip'));
		  }
		};

Blockly.JavaScript['move_goToCooler'] = function(block) {
	  // Generate JavaScript for moving to the cooler.
	  return 'goToCooler();\n';
	};

Blockly.Blocks['ask_isThereACustomer'] = {
		  // Verify if at this position there is a customer
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true, "Boolean");
		    this.appendDummyInput()
		        .appendField("isThereACustomer");
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_isThereACustomerTooltip'));
		  }
		};

Blockly.JavaScript['ask_isThereACustomer'] = function(block) {
     
	  return ['isThereACustomer( )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
	
	};

	
Blockly.Blocks['ask_askForFood'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askForFood');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askForFoodTooltip'));
		  }
		};

Blockly.JavaScript['ask_askForFood'] = function(block) {
	  return ['askForFood()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
	};

Blockly.Blocks['ask_askForDrink'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true, "DrinkOrder");
		    this.appendDummyInput()
		        .appendField('askForDrink');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askForDrinkTooltip'));
		  }
		};

Blockly.JavaScript['ask_askForDrink'] = function(block) {
	return ['askForDrink( )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['ask_hasThirsty'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askHasThirsty');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askHasThirstyTooltip'));
		  }
		};

Blockly.JavaScript['ask_hasThirsty'] = function(block) {
	return ['hasThirsty( )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['ask_hasHunger'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askHasHunger');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askHasHungerTooltip'));
		  }
		};

Blockly.JavaScript['ask_hasHunger'] = function(block) {
	return ['hasHunger( )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['prepare_catchFood'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true, "Foods");
		    this.appendValueInput("VALUE")
		        .setCheck("FoodOrder")
		        .appendField('catchFood');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_catchFoodTooltip'));
		  }
		};

Blockly.JavaScript['prepare_catchFood'] = function(block) {
	 var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || 'null';
	return ['catchFood( ' + value + ' )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['prepare_catchDrink'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true, "Drinks");
		    this.appendValueInput("VALUE")
		        .setCheck("DrinkOrder")
		        .appendField('catchDrink');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_catchDrinkTooltip'));
		  }
		};

Blockly.JavaScript['prepare_catchDrink'] = function(block) {
	 var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || 'null';
	return ['catchDrink( ' + value + ' )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['do_deliver'] = {
		  init: function() {
		    this.setColour(160);
		    this.appendValueInput('VALUE')
		        .appendField('deliver');
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_deliverTooltip'));
		  }
		};

Blockly.JavaScript['do_deliver'] = function(block) {
	  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
	      Blockly.JavaScript.ORDER_NONE) || '0';
	  return 'deliver(' + value + ');\n';
	};

