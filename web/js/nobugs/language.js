/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://github.com/adilsonv77/nobugssnackbar
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
	  return 'goToBarCounter(' + value + ');\n';
	};

Blockly.Blocks['do_talk'] = {
		  init: function() {
		    this.setColour(160);
		    this.appendValueInput('VALUE')
		        .appendField('talk');
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_talkTooltip'));
		  }
		};

Blockly.JavaScript['do_talk'] = function(block) {
	  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
	      Blockly.JavaScript.ORDER_NONE) || '0';
	  return 'talk(' + value + ');\n';
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
	  return 'deliver(' + value + ');\n updateVariables(); \n ';
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
	
Blockly.Blocks['do_wait'] = {
		init : function() {
			
		    this.jsonInit({
		    	"message0": 'wait %1 s',
		    	 "args0": [
		     	           {
		    	             "type": "input_value",
		    	             "name": "VALUE"
		    	           }
		    	         ],
		    	 "colour": Blockly.Blocks.variables.HUE
		    });
			
//		    this.setColour(160);
		    /*
		    this.interpolate_(
		    	'wait %1 s',
		    	['VALUE', null, Blockly.ALIGN_RIGHT],
		        Blockly.ALIGN_RIGHT);
		        */
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('SnackMan_waitTooltip');
		}
	  };
	
Blockly.JavaScript['do_wait'] = function(block) {
	  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
	      Blockly.JavaScript.ORDER_NONE) || '0';
	  
	  return 'WAIT_NOBUGS[' + (parseInt(value)*1000) + ']';
	};


/******************************************************************************
 *                          Snackman Money
 ******************************************************************************/	

Blockly.Blocks['money_cashIn'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendValueInput("VALUE")
		        .appendField('cashIn');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_cashInTooltip'));
		  }
		};

Blockly.JavaScript['money_cashIn'] = function(block) {
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || 'null';
	return ['cashIn( ' + value + ' )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['money_giveChange'] = {
		  init: function() {
			  
		    this.jsonInit({
		    	"message0": 'giveChange %1 '+BlocklyApps.getMsg('_with')+' %2 ',
		    	 "args0": [
		     	           {
		    	             "type": "input_value",
		    	             "name": "VALUE"
		    	           },
		     	           {
		    	             "type": "input_value",
		    	             "name": "COINSBANKNOTES"
		    	           }
		    	           
		    	         ],
		    	 "colour": 160
		    });
				
		    this.setInputsInline(true);

		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_giveChangeTooltip'));
		  }
		};

Blockly.JavaScript['money_giveChange'] = function(block) {
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || 'null';
	var coinsBankNotes = Blockly.JavaScript.valueToCode(block, 'COINSBANKNOTES', Blockly.JavaScript.ORDER_NONE) || 'null';
	return 'giveChange( ' + value + ',' + coinsBankNotes +' );\n';
};

Blockly.Blocks['const_money1'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField(BlocklyApps.getMsg('_coin') + ' 1');
		  }
		};

Blockly.JavaScript['const_money1'] = function(block) {
	return ['\"\\\"$$$money1\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_money2'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField(BlocklyApps.getMsg('_coin') + ' 2');
		  }
		};

Blockly.JavaScript['const_money2'] = function(block) {
	return ['\"\\\"$$$money2\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_money5'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField(BlocklyApps.getMsg('_banknote') + ' 5');
		  }
		};

Blockly.JavaScript['const_money5'] = function(block) {
	return ['\"\\\"$$$money5\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_money10'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField(BlocklyApps.getMsg('_banknote') + ' 10');
		  }
		};

Blockly.JavaScript['const_money10'] = function(block) {
	return ['\"\\\"$$$money10\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_money20'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField(BlocklyApps.getMsg('_banknote') + ' 20');
		  }
		};

Blockly.JavaScript['const_money20'] = function(block) {
	return ['\"\\\"$$$money20\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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
	  return 'goToDisplay();\n';
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

Blockly.Blocks['prepare_pickUpHotDog'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true, "Foods");
		    this.appendValueInput("VALUE")
		        .setCheck("FoodOrder")
		        .appendField('pickUpHotDog');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_catchFoodTooltip'));
		  }
		};

Blockly.JavaScript['prepare_pickUpHotDog'] = function(block) {
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || 'null';
	return ['pickUpHotDog( ' + value + ' )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['ask_askWantHowManyFoods'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askWantHowManyFoods');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askWantHowManyFoodsTooltip'));
		  }
		};

Blockly.JavaScript['ask_askWantHowManyFoods'] = function(block) {
	  return ['askWantHowManyFoods()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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
	  return 'goToCooler();\n';
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
	  return 'goToBoxOfFruits();\n';
	};

Blockly.Blocks['prepare_pickUpFruits'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendValueInput("VALUE")
		        .appendField('pickUpFruits');
		    
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_catchFruitsTooltip'));
		  }
		};

Blockly.JavaScript['prepare_pickUpFruits'] = function(block) {
	 var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || 'null';

	  return ['pickUpFruits(' +  value +')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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
	  return 'goToJuiceMachine();\n';
	};
	
Blockly.Blocks['prepare_prepareAndPickUpJuice'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendValueInput("VALUE")
		        .appendField('prepareAndPickUpJuice');
		    
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_prepareAndCatchJuiceTooltip'));
		  }
		};

Blockly.JavaScript['prepare_prepareAndPickUpJuice'] = function(block) {
	 var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || 'null';

	  return ['prepareAndPickUpJuice(' +  value +')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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

Blockly.Blocks['prepare_pickUpDrink'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true, "Drinks");
		    this.appendValueInput("VALUE")
		        .setCheck("DrinkOrder")
		        .appendField('pickUpDrink');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_catchDrinkTooltip'));
		  }
		};

Blockly.JavaScript['prepare_pickUpDrink'] = function(block) {
	 var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		      Blockly.JavaScript.ORDER_NONE) || 'null';
	return ['pickUpDrink( ' + value + ' )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['ask_askWantHowManyDrinks'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askWantHowManyDrinks');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askWantHowManyDrinksTooltip'));
		  }
		};

Blockly.JavaScript['ask_askWantHowManyDrinks'] = function(block) {
	  return ['askWantHowManyDrinks()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
	};
		
/******************************************************************************
 *                          Snackman Constants
 ******************************************************************************/	
	
Blockly.Blocks['const_juiceOfOrange'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('juiceOfOrange');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_constjuiceOfOrangeTooltip'));
		  }
		};

Blockly.JavaScript['const_juiceOfOrange'] = function(block) {
	return ['\"\\\"$$$juiceoforange\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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
	return ['\"\\\"$$$coke\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_hotdog'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('hotdog');
		    
		  }
		};

Blockly.JavaScript['const_hotdog'] = function(block) {
	return ['\"\\\"$$$hotdog\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/******************************************************************************
 *                              Ice Cream
 ******************************************************************************/	

Blockly.Blocks['move_goToIceCreamMachine'] = {
		 init: function() {
			this.setColour(160);
			this.appendDummyInput().appendField('goToIceCreamMachine');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip(BlocklyApps.getMsg('SnackMan_goToIceCreamMachineTooltip'));
		 }
};

Blockly.JavaScript['move_goToIceCreamMachine'] = function(block) {
	return "goToIceCreamMachine(); \n";
};

Blockly.Blocks['prepare_pickUpIceCream'] = {
		 init: function() {
		   this.setColour(160); 
		   this.setOutput(true, "Foods");
		   this.appendValueInput("VALUE").setCheck("FoodOrder").appendField('preparePickUpIceCream');
		   this.setTooltip(BlocklyApps.getMsg('SnackMan_pickUpIceCreamTooltip'));
		 }
};

Blockly.JavaScript['prepare_pickUpIceCream'] = function(block) {
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || 'null'; 
	return ['pickUpIceCream( ' + value + ' )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_chocolate'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('Chocolate');
		  }
		};

Blockly.JavaScript['const_chocolate'] = function(block) {
	return ['\"\\\"$$$icecreamofchocolate\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_strawberry'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField(BlocklyApps.getMsg('_strawberry'));
		  }
		};

Blockly.JavaScript['const_strawberry'] = function(block) {
	return ['\"\\\"$$$icecreamofstrawberry\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['const_vanilla'] = {
		  init: function() {
		    this.setColour(50);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField(BlocklyApps.getMsg('_vanilla'));
		  }
		};

Blockly.JavaScript['const_vanilla'] = function(block) {
	return ['\"\\\"$$$icecreamofvanilla\\\"\"', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['ask_askWantHowManyIceCream'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askWantHowManyIceCream');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askWantHowManyIceCreamTooltip'));
		  }
		};

Blockly.JavaScript['ask_askWantHowManyIceCream'] = function(block) {
	  return ['askWantHowManyIceCream()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
	};
		
Blockly.Blocks['ask_askForIceCream'] = {
		  init: function() {
		    this.setColour(160);
		    this.setOutput(true);
		    this.appendDummyInput()
		        .appendField('askForIceCream');
		    this.setTooltip(BlocklyApps.getMsg('SnackMan_askForIceCreamTooltip'));
		  }
		};

Blockly.JavaScript['ask_askForIceCream'] = function(block) {
	return ['askForIceCream( )', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


/**********************************************************************************/
/**            Provided from the blockly forum                                    */
/** Author: Florian Pechwitz (Block) and Jungwon Rhyu (JavaScript)
/**********************************************************************************/
Blockly.Blocks['switch_case'] = {
		  init: function() {
		    this.setColour(180);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.appendValueInput('CONDITION')
		        .appendField('the case is');
		    this.appendValueInput('CASECONDITION0')
		        .appendField('in case of');
		    this.appendStatementInput('CASE0')
		        .appendField('do');
		    this.setMutator(new Blockly.Mutator(['case_incaseof','case_default']));
		    this.setTooltip('Does something if the condition is true. If there isn\'t a matching case the default function will be executed.');
		    this.caseCount_ = 0;
		    this.defaultCount_ = 0;
		  },

		  mutationToDom: function() {
		    if(!this.caseCount_ && !this.defaultCount_) {
		        return null;
		    }
		    var container = document.createElement('mutation');
		    if (this.caseCount_) {
		        container.setAttribute('case', this.caseCount_);
		    }
		    if (this.defaultCount_) {
		        container.setAttribute('default', 1);
		    }
		    return container;
		  },

		  domToMutation: function(xmlElement) {
		    this.caseCount_ = parseInt(xmlElement.getAttribute('case'), 10);
		    this.defaultCount_ = parseInt(xmlElement.getAttribute('default'), 10);
		    for (var x = 1; x <= this.caseCount_; x++) {
		        this.appendValueInput('CASECONDITION' + x)
		            .appendField('in case of');
		        this.appendStatementInput('CASE' + x)
		            .appendField('do');
		    }
		    if (this.defaultCount_) {
		        this.appendStatementInput('ONDEFAULT')
		            .appendField('default');
		    }
		  },

		  decompose: function(workspace) {
		    var containerBlock = Blockly.Block.obtain(workspace, 'control_case');
		    containerBlock.initSvg();
		    var connection = containerBlock.getInput('STACK').connection;
		    for (var x = 1; x <= this.caseCount_; x++) {
		        var caseBlock = Blockly.Block.obtain(workspace, 'case_incaseof');
		        caseBlock.initSvg();
		        connection.connect(caseBlock.previousConnection);
		        connection = caseBlock.nextConnection;
		    }
		    if(this.defaultCount_) {
		        var defaultBlock = Blockly.Block.obtain(workspace, 'case_default');
		        defaultBlock.initSvg();
		        connection.connect(defaultBlock.previousConnection);
		    }
		    return containerBlock;
		  },

		  compose: function(containerBlock) {
		    //Disconnect all input blocks and remove all inputs.
		    if (this.defaultCount_) {
		        this.removeInput('ONDEFAULT');
		    }
		    this.defaultCount_ = 0;
		    for (var x = this.caseCount_; x > 0; x--) {
		        this.removeInput('CASECONDITION' + x);
		        this.removeInput('CASE' + x);
		    }
		    this.caseCount_ = 0;
		    var caseBlock = containerBlock.getInputTargetBlock('STACK');
		    while (caseBlock) {
		        switch(caseBlock.type) {
		            case 'case_incaseof':
		                this.caseCount_++;
		                var caseconditionInput = this.appendValueInput('CASECONDITION' + this.caseCount_)
		                                             .appendField('in case of');   
		                var caseInput = this.appendStatementInput('CASE' + this.caseCount_)
		                                    .appendField('do');
		                if (caseBlock.valueConnection_) {
		                    caseconditionInput.connection.connect(caseBlock.valueConnection_);
		                }
		                if (caseBlock.statementConnection_) {
		                    caseInput.connection.connect(caseBlock.statementConnection_);
		                }
		                break;
		            case 'case_default':
		                this.defaultCount_++;
		                var defaultInput = this.appendStatementInput('ONDEFAULT')
		                                       .appendField('default');
		                if(caseBlock.statementConnection_) {
		                    defaultInput.connection.connect(caseBlock.statementConnection_);
		                }
		                break;
		            default:
		                throw 'Unknown block type.';
		        }
		        caseBlock = caseBlock.nextConnection &&
		                  caseBlock.nextConnection.targetBlock();
		    }
		  },

		  saveConnections: function(containerBlock) {
		    var caseBlock = containerBlock.getInputTargetBlock('STACK');
		    var x = 1;
		    while (caseBlock) {
		        switch (caseBlock.type) {
		            case'case_incaseof':
		                var caseconditionInput = this.getInput('CASECONDITION' + x);  
		                var caseInput = this.getInput('CASE' + x);
		                caseBlock.valueConnection_ = caseconditionInput && caseconditionInput.connection.targetConnection;
		                caseBlock.statementConnection_ = caseInput && caseInput.connection.targetConnection;
		                x++;
		                break;
		            case'case_default':
		                var defaultInput = this.getInput('ONDEFAULT');
		                caseBlock.satementConnection_ = defaultInput && defaultInput.connection.targetConnection;
		                break;
		            default:
		                throw 'Unknown block type';
		        }
		        caseBlock = caseBlock.nextConnection &&
		                    caseBlock.nextConnection.targetBlock();
		    }
		  }
		};

Blockly.Blocks['control_case'] = {
  init: function() {
    this.setColour(180);
    this.appendDummyInput()
        .appendField('the case is');
    this.appendStatementInput('STACK');
    this.setTooltip('--Placeholder--');
    this.contextMenu = false;
  }
};

Blockly.Blocks['case_incaseof'] = {
  init: function() {
    this.setColour(180);
    this.appendDummyInput()
        .appendField('in case of');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('--Placeholder--');
    this.contextMenu = false;
  }
};

Blockly.Blocks['case_default'] = {
  init: function() {
      this.setColour(180);
      this.appendDummyInput()
          .appendField('default');
      this.setPreviousStatement(true);
      this.setNextStatement(false);
      this.setTooltip('This function will run if there aren\'t any matching cases.');
      this.contextMenu = false;
  }
};  
		
Blockly.JavaScript['switch_case'] = function(block) {
	var code = '';
	var do_n;
	var case_n;
	var switchVariable = Blockly.JavaScript.valueToCode(block, 'CONDITION',
												Blockly.JavaScript.ORDER_NONE) || null;
	if (switchVariable){
		var pattern = /^([a-zA-Z_]+(\d|[a-zA-Z_])*)$/g;
		if (pattern.test(switchVariable)){ // Check to see if the switch is a kind of variable type
			code = '\nswitch (' + switchVariable + '){\n';
			var case_0 = Blockly.JavaScript.valueToCode(block, 'CASECONDITION0',
														Blockly.JavaScript.ORDER_NONE) || null;
			var do_0 = Blockly.JavaScript.statementToCode(block, 'CASE0');
			code += '\tcase ' + case_0 + ':\n' + do_0 + '\n\t\tbreak;\n';
			
			for (var n = 1; n <= block.caseCount_; n++) {
				case_n = Blockly.JavaScript.valueToCode(block, 'CASECONDITION' + n,
					Blockly.JavaScript.ORDER_NONE) || null;
				if (case_n){
					do_n = Blockly.JavaScript.statementToCode(block, 'CASE' + n);
					code += '\tcase ' + case_n + ':\n' + do_n + '\n\t\tbreak;\n';
				}
			}
			if (block.defaultCount_) {
				do_n = Blockly.JavaScript.statementToCode(block, 'ONDEFAULT');
				code += '\tdefault:\n' + do_n + '\n\t\tbreak;\n';
			}
			code += '}\n';
	  }
	  else
		  alert('switch_case: ' + switchVariable + ' is not a variable name');
	}
	return code;
};