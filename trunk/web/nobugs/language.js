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

/******************************************************************************
 *                          Snackman General
 ******************************************************************************/	
Blockly.Blocks['move_goToBarCounter'] = {
		  // Block for moving to a specific customer in the counter.
		  init: function() {
		    this.setColour(160);
		    this.appendValueInput('VALUE')
		        .setCheck('Number')
		        .appendField('goToBarCounter');
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_goToBarCounterTooltip'));
		  }
		};

Blockly.JavaScript['move_goToBarCounter'] = function(block) {
	  // Generate JavaScript for moving to a specific customer in the counter.
	  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
	      Blockly.JavaScript.ORDER_NONE) || '0';
	  return 'highlightBlock('+block.id+'); \n goToBarCounter(' + value + ');\n';
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
	  //
	  return 'highlightBlock('+block.id+'); \n deliver(' + value + ');\n updateVariables(); \n ';
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
	
/******************************************************************************
 *                          Snackman Food
 ******************************************************************************/	
	
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
	  return 'highlightBlock('+block.id+'); \n goToDisplay();\n';
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

Blockly.Blocks['ask_askHasHunger'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askHasHunger');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askHasHungerTooltip'));
		  }
		};

Blockly.JavaScript['ask_askHasHunger'] = function(block) {
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

	
/******************************************************************************
 *                          Snackman Drinks
 ******************************************************************************/	

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
	  return 'highlightBlock('+block.id+'); \n goToCooler();\n';
	};

Blockly.Blocks['move_goToBoxOfFruits'] = {
		  init: function() {
		    this.setColour(160);
		   
		    this.appendDummyInput()
		        .appendField('goToBoxOfFruits');
		    
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_goToBoxOfFruitsTooltip'));
		  }
		};

Blockly.JavaScript['move_goToBoxOfFruits'] = function(block) {
	  return 'highlightBlock('+block.id+'); \n goToBoxOfFruits();\n';
	};

Blockly.Blocks['prepare_catchFruits'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendValueInput("VALUE")
		        .appendField('catchFruits');
		    
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_catchFruitsTooltip'));
		  }
		};

Blockly.JavaScript['prepare_catchFruits'] = function(block) {
	 var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || 'null';

	  return ['catchFruits(' +  value +')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
	};
	
Blockly.Blocks['move_goToJuiceMachine'] = {
		  init: function() {
		    this.setColour(160);
		   
		    this.appendDummyInput()
		        .appendField('goToJuiceMachine');
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_goToJuiceMachineTooltip'));
		  }
		};

Blockly.JavaScript['move_goToJuiceMachine'] = function(block) {
	  return 'highlightBlock('+block.id+'); \n goToJuiceMachine();\n';
	};
	
Blockly.Blocks['prepare_prepareAndCatchJuice'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendValueInput("VALUE")
		        .appendField('prepareAndCatchJuice');
		    
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_prepareAndCatchJuiceTooltip'));
		  }
		};

Blockly.JavaScript['prepare_prepareAndCatchJuice'] = function(block) {
	 var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || 'null';

	  return ['prepareAndCatchJuice(' +  value +')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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

Blockly.Blocks['compare_isTypeOfDrink'] = {
		  // Verify if at this position there is a customer
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true, "Boolean");
		    this.appendDummyInput()
		        .appendField("isTypeOfDrink");
		    this.appendValueInput("VALUE1")
	        	.appendField("order");
		    this.appendValueInput("VALUE2")
        		.appendField("type");
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_isTypeOfDrinkTooltip'));
		  }
		};

Blockly.JavaScript['compare_isTypeOfDrink'] = function(block) {
   
	 var value1 = Blockly.JavaScript.valueToCode(block, 'VALUE1',
		      Blockly.JavaScript.ORDER_NONE) || 'null';
	 var value2 = Blockly.JavaScript.valueToCode(block, 'VALUE2',
		      Blockly.JavaScript.ORDER_NONE) || 'null';
	 
	  return [value1+'.type === '+value2, Blockly.JavaScript.ORDER_FUNCTION_CALL];
	
	};

Blockly.Blocks['ask_askHasThirsty'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askHasThirsty');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askHasThirstyTooltip'));
		  }
		};

Blockly.JavaScript['ask_askHasThirsty'] = function(block) {
	return ['hasThirsty( )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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

/******************************************************************************
 *                          Snackman Constants
 ******************************************************************************/	
	
Blockly.Blocks['const_orange'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('orange');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_constOrangeTooltip'));
		  }
		};

Blockly.JavaScript['const_orange'] = function(block) {
	return ['\"$$orange\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_softDrink'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('softDrink');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_constSoftDrinkTooltip'));
		  }
		};

Blockly.JavaScript['const_softDrink'] = function(block) {
	return ['\"$$coke\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/******************************************************************************
 *                          Modification of default language 
 ******************************************************************************/	

Blockly.Blocks['variables_set'].init = function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.setColour(330);
    this.interpolateMsg(
    	BlocklyApps.getMsg('Blockly_variableSet'),
    	['VALUE', null, Blockly.ALIGN_RIGHT],
        ['VAR', new Blockly.FieldVariable(Blockly.Msg.VARIABLES_SET_ITEM)],
        Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    this.contextMenuType_ = 'variables_get';
  };

