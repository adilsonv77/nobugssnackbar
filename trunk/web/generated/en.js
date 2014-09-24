// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkTooltip">Save and link to blocks.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Run Program</span><span id="resetProgram">Reset</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Functions</span><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Share your blocks with this link:\n\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof nobugspage == 'undefined') { var nobugspage = {}; }


nobugspage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="SnackMan_goToBarCounterTooltip">Moves the snack man to the customer.</span><span id="SnackMan_goToDisplayTooltip">Moves the snack man to the display.</span><span id="SnackMan_goToCoolerTooltip">Moves the snack man to the cooler.</span><span id="SnackMan_askForFoodTooltip">Asks the customer about his order.</span><span id="SnackMan_isThereACustomerTooltip">Verify if there is a customer in the currently position.</span><span id="SnackMan_catchFoodTooltip">Catches the food from the display and put it on a platter ready will deliver to the customer.</span><span id="SnackMan_deliverTooltip">Delivers the food or drink to the customer near the cooker.</span><span id="Error_login">User not found.</span><span id="Error_infinityLoopDetected">Infinity loop detected by system.</span><span id="Error_doesntExistCounter">This position is invalid.</span><span id="Error_isntCloseToCustomer">The cooker is not close to any customer.</span><span id="Error_thereIsntCustomer">There isn\'t any customer in this position of the counter.</span><span id="Error_isntFrontCooler">The cooker is not in front of the cooler.</span><span id="Error_onlyHotDog">Here only has hotdog. The customer didn\'t order hotdog.</span><span id="Error_wrongPlaceForDrink">There isn\'t here the drink that customer orders.</span><span id="Error_doesntHaveOrder">The cooker forget to request the order.</span><span id="Error_isntHunger">The customer doesn\'t have hunger.</span><span id="Error_doesntOrderDrink">There isn\'t any drink in the order.</span><span id="Error_isntThirsty">The customer doesn\'t have thirsty.</span><span id="NoBugs_unloadWarning">Leaving this page will result in the loss of your work.</span><span id="NoBugs_goalAchieved">New Goal Achieved</span><span id="NoBugs_achieved">Achieved</span><span id="NoBugs_of">of</span><span id="explanation_counter">Go to counter 0.</span><span id="explanation_askForFood">Ask the customer at 0 what he wants to eat.</span><span id="explanation_catchFood">Catch the food that the customer at 0 ordered.</span><span id="explanation_askForDrink">Ask the customer at 0 what he wants to drink.</span><span id="explanation_catchDrink">Catch the drink that the customer at 0 ordered.</span><span id="explanation_deliver">Deliver what the customer at 0 ordered.</span><span id="_counter">in the counter</span><span id="rewardExplanation">Reward of 0 if you achieve all the objectives above.</span><span id="commandBonusExplanation">You\'ll receive a bonus of 0 if accomplish this mission in 1 commands or less.</span><span id="_mission">Mission</span></div>';
};


nobugspage.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<link rel="stylesheet" type="text/css" href="easyui/easyui.css"><link rel="stylesheet" type="text/css" href="easyui/icon.css"><script type="text/javascript" src="easyui/jquery.min.js"><\/script><script type="text/javascript" src="easyui/jquery.easyui.min.js"><\/script><script src="jquery.growl/jquery.growl.js" type="text/javascript"><\/script><link href="jquery.growl/jquery.growl.css" rel="stylesheet" type="text/css" /><script type="text/javascript" src="nobugs/explanation.js"><\/script><script type="text/javascript" src="nobugs/game.js"><\/script><script type="text/javascript" src="nobugs/blockly.js"><\/script><script type="text/javascript" src="jsinterpreter/acorn_interpreter.js"><\/script><script type="text/javascript" src="nobugs/graph.js"><\/script><script type="text/javascript" src="nobugs/snackman.js"><\/script><script type="text/javascript" src="nobugs/customer.js"><\/script><script type="text/javascript" src="nobugs/customerman.js"><\/script><script type="text/javascript" src="nobugs/sprite.js"><\/script><script type="text/javascript" src="nobugs/nobugsjsinterpreter.js"><\/script><script type="text/javascript" src="nobugs/nobugsblocklygeneratorjavascript.js"><\/script><script type="text/javascript" src="nobugs/xml.js"><\/script><script type="text/javascript" src="nobugs/money.js"><\/script><script type="text/javascript" src="nobugs/objectives.js"><\/script><script type="text/javascript" src="dwr/engine.js"><\/script><script type="text/javascript" src="dwr/interface/UserControl.js"><\/script><script type="text/javascript" src="blockly_compressed.js"><\/script><script type="text/javascript" src="blocks_compressed.js"><\/script><script type="text/javascript" src="javascript_compressed.js"><\/script><script type="text/javascript" src="python_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="nobugs/language.js"><\/script><div id="initialBackground" style="display: none"><table width="100%" height="100%"><tr><td align="center"><img src="images/nobugs.gif"/></td></tr><tr><td align="center"><img src="images/snackbar.gif"/></td></tr></table></div>' + nobugspage.messages(null, null, opt_ijData) + '<div id="mainBody" style="display: none"><table width="100%"><tr><td><h1><span id="title">NoBug\'s SnackBar</span></h1></td><td class="farSide"><select style="visibility: hidden;" id="languageMenu"></select><button id="logoffButton" style="background-color: white" title="Logoff the game."><img src="images/logoff.png" style="width:32px; height:32px"/></button></td></tr></table><div id="visualization"><canvas id="display" width="352" height="448"></canvas></div><table style="padding-top: 1em;" class="buttons"><tr><td style="width: 120px; text-align: center"><button id="debugButton" class="primary" style="margin:5px" title="Makes the snack man do what the next block say."><img src="media/1x1.gif" class="debug icon21"></button></td><td style="width: 120px; text-align: center"><button id="runButton" class="primary" style="margin:5px" title="Makes the snack man do what the blocks say."><img src="media/1x1.gif" class="run icon21"></button><button id="resetButton" class="notEnabled" style="margin:5px" disable="disabled" title="Restarts the execution."><img src="media/1x1.gif" class="stop icon21"></button></td><td style="width: 120px; text-align: center"><button id="goalButton" class="primary" style="margin:5px" title="See the objectives of this mission."><img src="media/1x1.gif" class="code icon21"></button></td></tr></table><div id="toolbarDiv"></div><div id="blockly"></div><div id="variableBox" style="display:none"><div class="move-header"><div class="move-title">Variables</div><div class="move-panel"><a id="moveDown" class="move-down" href="javascript:void(0)"></a><a id="moveRight" class="move-right" style="display:none" href="javascript:void(0)"></a></div></div><div class="var-content"><table id="vars" class="easyui-datagrid" data-options="singleSelect:true"><thead><tr><th data-options="field:\'name\', width:50">Name</th><th data-options="field:\'value\', width: 100">Value</th></tr></thead><tbody></tbody></table></div></div></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogError" class="dialogHiddenContent"><table><tr><td align="center" rowspan="2"><img src="images/error.png" style="padding: 10px" /></td><td id="dialogErrorText"></td></tr><tr><td></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogInfo" class="dialogHiddenContent"><table><tr><td align="center" rowspan="2"><img src="images/info.png" style="margin: 10px"/></td><td id="dialogInfoText"></td></tr><tr><td></td></tr></table><div id="dialogInfoButton" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogHint" class="dialogHiddenContent"><table><tr><td id="beforetd" style=" align="center" rowspan="2"><img id="imgHintBefore"></img></td><td id="dialogHintText" style=""></td><td id="aftertd" style="align="center" rowspan="2"><img id="imgHintAfter"></img></td></tr><tr><td></td></tr></table><div id="dialogHintButton" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogLogin" class="dialogHiddenContent"><form><table><tr><td colspan="2"><div id="errorLogin" style="color: red"></div></td></tr><tr><td>User :</td><td><input type="text" id="loginuser"/></td></tr><tr><td>Password :</td><td><input type="password" id="loginpassw"/></td></tr></table></form><div class="farSide" ><button class="secondary" onclick="Game.login()">Login</button></div></div><div id="dialogNoMoreMissions" class="dialogHiddenContent"><table><tr><td align="center" rowspan="2"><img src="images/expert.png" style="margin: 10px"/></td><td>You\'re an expert !!! There aren\'t more missions for you.</td></tr><tr><td></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogVictory" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center" rowspan="2"><img src="images/victory.png"></td><td>You achieved this mission. The game will load a new mission.</td></tr><tr><td></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogFail" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center" rowspan="2"><img src="images/fail.png"></td><td>You don\'t achieved this mission. You need to try again.</td></tr><tr><td></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div>';
};


nobugspage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none">' + ((opt_ijData.enabled['snackMan']) ? '<category name="SnackMan">' + ((opt_ijData.enabled['goToBarCounter']) ? '<block type="move_goToBarCounter"><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + ((opt_ijData.enabled['isThereACustomer']) ? '<block type="ask_isThereACustomer"> </block>' : '') + ((opt_ijData.enabled['askHasHunger']) ? '<block type="ask_askHasHunger"> </block>' : '') + ((opt_ijData.enabled['askForFood']) ? '<block type="ask_askForFood"> </block>' : '') + ((opt_ijData.enabled['goToDisplay']) ? '<block type="move_goToDisplay"> </block>' : '') + ((opt_ijData.enabled['catchFood']) ? '<block type="prepare_catchFood"> </block>' : '') + ((opt_ijData.enabled['askHasThirsty']) ? '<block type="ask_askHasThirsty"> </block>' : '') + ((opt_ijData.enabled['askForDrink']) ? '<block type="ask_askForDrink"> </block>' : '') + ((opt_ijData.enabled['isTypeOfDrink']) ? '<block type="compare_isTypeOfDrink"> </block>' : '') + ((opt_ijData.enabled['goToCooler']) ? '<block type="move_goToCooler"> </block>' : '') + ((opt_ijData.enabled['goToBoxOfFruits']) ? '<block type="move_goToBoxOfFruits"><value name="VALUE"><block type="const_orange"></block></value></block>' : '') + ((opt_ijData.enabled['catchFruits']) ? '<block type="prepare_catchFruits"> </block>' : '') + ((opt_ijData.enabled['goToJuiceMachine']) ? '<block type="move_goToJuiceMachine"> </block>' : '') + ((opt_ijData.enabled['prepareAndCatchJuice']) ? '<block type="prepare_prepareAndCatchJuice"> </block>' : '') + ((opt_ijData.enabled['catchDrink']) ? '<block type="prepare_catchDrink"> </block>' : '') + ((opt_ijData.enabled['deliver']) ? '<block type="do_deliver"> </block>' : '') + '</category>' : '') + ((opt_ijData.enabled['const']) ? '<category name="Constants">' + ((opt_ijData.enabled['const.orange']) ? '<block type="const_orange"> </block>' : '') + ((opt_ijData.enabled['const.softDrink']) ? '<block type="const_softDrink"> </block>' : '') + '</category>' : '') + ((opt_ijData.enabled['logic']) ? '<category name="Logic"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block></category>' : '') + ((opt_ijData.enabled['loop']) ? '<category name="Loops">' + ((opt_ijData.enabled['whileUntil']) ? '<block type="controls_whileUntil"></block>' : '') + ((opt_ijData.enabled['for']) ? '<block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + '</category>' : '') + ((opt_ijData.enabled['math']) ? '<category name="Math"><block type="math_number"></block><block type="math_arithmetic"></block></category>' : '') + ((opt_ijData.enabled['vars']) ? '<category name="Variables" custom="VARIABLE"></category>' : '') + ((opt_ijData.enabled['function']) ? '<category name="Functions" custom="PROCEDURE"></category>' : '') + '</xml>';
};


nobugspage.nextButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Explanation.nextStatement()">Next</button>';
};


nobugspage.previousButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Explanation.previousStatement()">Previous</button>';
};


nobugspage.finishButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Explanation.finishStatement()">OK</button>';
};
