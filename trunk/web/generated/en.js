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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="SnackMan_goToBarCounterTooltip">Moves the snack man to the customer.</span><span id="SnackMan_goToDisplayTooltip">Moves the snack man to the display.</span><span id="SnackMan_goToCoolerTooltip">Moves the snack man to the cooler.</span><span id="SnackMan_askForFoodTooltip">Asks the customer about his order.</span><span id="SnackMan_isThereACustomerTooltip">Verify if there is a customer in the currently position.</span><span id="Error_infinityLoopDetected">Infinity loop detected by system.</span><span id="Error_doesntExistCounter">This position is invalid.</span><span id="Error_isntCloseToCustomer">The cooker is not close to any customer.</span><span id="Error_thereIsntCustomer">There isn\'t any customer in this position of the counter.</span><span id="Error_isntFrontCooler">The cooker is not in front of the cooler.</span><span id="Error_doesntHaveOrder">The cooker forget to request the order.</span><span id="Error_doesntOrderDrink">There isn\'t any drink in the order.</span><span id="NoBugs_unloadWarning">Leaving this page will result in the loss of your work.</span></div>';
};


nobugspage.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<link rel="stylesheet" type="text/css" href="easyui/easyui.css"><link rel="stylesheet" type="text/css" href="easyui/icon.css"><script type="text/javascript" src="easyui/jquery.min.js"><\/script><script type="text/javascript" src="easyui/jquery.easyui.min.js"><\/script><script type="text/javascript" src="jsinterpreter/acorn_interpreter.js"><\/script><script type="text/javascript" src="nobugs/graph.js"><\/script><script type="text/javascript" src="nobugs/snackman.js"><\/script><script type="text/javascript" src="nobugs/customer.js"><\/script><script type="text/javascript" src="nobugs/customerman.js"><\/script><script type="text/javascript" src="nobugs/sprite.js"><\/script><script type="text/javascript" src="nobugs/nobugsjsinterpreter.js"><\/script><script type="text/javascript" src="nobugs/nobugsblocklygeneratorjavascript.js"><\/script><script type="text/javascript" src="nobugs/xml.js"><\/script><script type="text/javascript" src="nobugs/money.js"><\/script><script type="text/javascript" src="nobugs/game.js"><\/script>' + nobugspage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title">NoBug\'s SnackBar</span></h1></td><td class="farSide"><select style="visibility: hidden;" id="languageMenu"></select></td></tr></table><div id="visualization"><canvas id="display" width="352" height="448"></canvas></div><table style="padding-top: 1em;" class="buttons"><tr><td style="width: 120px; text-align: center"><button id="debugButton" class="primary" title="Makes the snack man do what the next block say."><img src="media/1x1.gif" class="debug icon21">Step</button></td><td style="width: 120px; text-align: center"><button id="runButton" class="primary" title="Makes the snack man do what the blocks say."><img src="media/1x1.gif" class="run icon21">Run Program</button></td><td style="width: 120px; text-align: center"><button id="resetButton" class="notEnabled" disable="disabled" title="Restarts the execution."><img src="media/1x1.gif" class="stop icon21"> Reset</button></td></tr></table><div id="toolbarDiv"></div><script type="text/javascript" src="blockly_compressed.js"><\/script><script type="text/javascript" src="blocks_compressed.js"><\/script><script type="text/javascript" src="javascript_compressed.js"><\/script><script type="text/javascript" src="python_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="nobugs/language.js"><\/script><div id="blockly"></div><div id="variableBox" style="display:none"><div class="move-header"><div class="move-title">Variables</div><div class="move-panel"><a id="moveDown" class="move-down" href="javascript:void(0)"></a><a id="moveRight" class="move-right" style="display:none" href="javascript:void(0)"></a></div></div><div class="var-content"><table id="vars" class="easyui-datagrid" data-options="singleSelect:true"><thead><tr><th data-options="field:\'name\', width:50">Name</th><th data-options="field:\'value\', width: 100">Value</th></tr></thead><tbody></tbody></table></div></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogError" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center" rowspan="2"><img src="images/error.png" height="80%" width="80%"></td><td id="dialogErrorText" style="width: 80%"></td></tr><tr><td></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogInfo" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center" rowspan="2"><img src="images/info.png" height="80%" width="80%"></td><td id="dialogInfoText" style="width: 80%"></td></tr><tr><td></td></tr></table><div id="dialogInfoButton" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogHint" class="dialogHiddenContent"><table><tr><td id="beforetd" style="width: 20%" align="center" rowspan="2"><img id="imgHintBefore" height="80%" width="80%"></img></td><td id="dialogHintText" style="width: 80%"></td><td id="aftertd" style="width: 20%" align="center" rowspan="2"><img id="imgHintAfter" height="80%" width="80%"></img></td></tr><tr><td></td></tr></table><div id="dialogHintButton" class="farSide" style="padding: 1ex 3ex 0"></div></div>';
};


nobugspage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="SnackMan">' + ((opt_ijData.enabled['goToBarCounter'] == null) ? '<block type="move_goToBarCounter"><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + ((opt_ijData.enabled['isThereACustomer'] == null) ? '<block type="ask_isThereACustomer"> </block>' : '') + ((opt_ijData.enabled['askHasHunger'] == null) ? '<block type="ask_askHasHunger"> </block>' : '') + ((opt_ijData.enabled['askForFood'] == null) ? '<block type="ask_askForFood"> </block>' : '') + ((opt_ijData.enabled['goToDisplay'] == null) ? '<block type="move_goToDisplay"> </block>' : '') + ((opt_ijData.enabled['catchFood'] == null) ? '<block type="prepare_catchFood"> </block>' : '') + ((opt_ijData.enabled['askHasThirsty'] == null) ? '<block type="ask_askHasThirsty"> </block>' : '') + ((opt_ijData.enabled['askForDrink'] == null) ? '<block type="ask_askForDrink"> </block>' : '') + ((opt_ijData.enabled['goToCooler'] == null) ? '<block type="move_goToCooler"> </block>' : '') + ((opt_ijData.enabled['catchDrink'] == null) ? '<block type="prepare_catchDrink"> </block>' : '') + ((opt_ijData.enabled['deliver'] == null) ? '<block type="do_deliver"> </block>' : '') + '</category>' + ((opt_ijData.enabled['logic']) ? '<category name="Logic"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block></category>' : '') + ((opt_ijData.enabled['loop']) ? '<category name="Loops">' + ((opt_ijData.enabled['whileUntil'] == null) ? '<block type="controls_whileUntil"></block>' : '') + ((opt_ijData.enabled['for'] == null) ? '<block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + '</category>' : '') + ((opt_ijData.enabled['math']) ? '<category name="Math"><block type="math_number"></block><block type="math_arithmetic"></block></category>' : '') + ((opt_ijData.enabled['vars']) ? '<category name="Variables" custom="VARIABLE"></category>' : '') + ((opt_ijData.enabled['function']) ? '<category name="Functions" custom="PROCEDURE"></category>' : '') + '</xml>';
};


nobugspage.nextButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Game.nextStatement()">Next</button>';
};


nobugspage.previousButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Game.previousStatement()">Previous</button>';
};


nobugspage.finishButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Game.finishStatement()">OK</button>';
};
