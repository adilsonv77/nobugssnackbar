// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkTooltip">Save and link to blocks.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Executar</span><span id="resetProgram">Reiniciar</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Condicionais</span><span id="catLoops">Laços</span><span id="catMath">Matemática</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variáveis</span><span id="catProcedures">Functions</span><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="SnackMan_goToBarCounterTooltip">Move o cozinheiro até o balcão.</span><span id="SnackMan_goToDisplayTooltip">Move o cozinheiro até o mostrador.</span><span id="SnackMan_goToCoolerTooltip">Moves the snack man to the cooler.</span><span id="SnackMan_askForFoodTooltip">Pergunto ao cliente o que ele deseja.</span><span id="SnackMan_isThereACustomerTooltip">Verifica se existe um cliente na posição atual.</span><span id="Error_infinityLoopDetected">Ciclo perpétuo detectado pelo sistema.</span><span id="Error_doesntExistCounter">Esta posição é inválida.</span><span id="Error_isntCloseToCustomer">Não está junto de um cliente.</span><span id="Error_thereIsntCustomer">Não existe qualquer cliente nessa posição do balcão.</span><span id="Error_isntFrontCooler">O cozinheiro não está em frente à geladeira.</span><span id="Error_doesntHaveOrder">O cozinheiro esqueceu de anotar o pedido.</span><span id="Error_doesntOrderDrink">Não existem bebidas nesse pedido.</span><span id="NoBugs_unloadWarning">Deixar essa página resulta em perdas no trabalho.</span></div>';
};


nobugspage.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<link rel="stylesheet" type="text/css" href="easyui/easyui.css"><link rel="stylesheet" type="text/css" href="easyui/icon.css"><script type="text/javascript" src="easyui/jquery.min.js"><\/script><script type="text/javascript" src="easyui/jquery.easyui.min.js"><\/script><script type="text/javascript" src="jsinterpreter/acorn_interpreter.js"><\/script><script type="text/javascript" src="nobugs/graph.js"><\/script><script type="text/javascript" src="nobugs/snackman.js"><\/script><script type="text/javascript" src="nobugs/customer.js"><\/script><script type="text/javascript" src="nobugs/customerman.js"><\/script><script type="text/javascript" src="nobugs/sprite.js"><\/script><script type="text/javascript" src="nobugs/nobugsjsinterpreter.js"><\/script><script type="text/javascript" src="nobugs/nobugsblocklygeneratorjavascript.js"><\/script><script type="text/javascript" src="nobugs/xml.js"><\/script><script type="text/javascript" src="nobugs/money.js"><\/script><script type="text/javascript" src="nobugs/game.js"><\/script>' + nobugspage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title">NoBug\'s Snack Bar</span></h1></td><td class="farSide"><select style="visibility: hidden;" id="languageMenu"></select></td></tr></table><div id="visualization"><canvas id="display" width="352" height="448"></canvas></div><table style="padding-top: 1em;" class="buttons"><tr><td style="width: 120px; text-align: center"><button id="debugButton" class="primary" title="Executar somente um passo."><img src="media/1x1.gif" class="debug icon21">Passo</button></td><td style="width: 120px; text-align: center"><button id="runButton" class="primary" title="Executar o programa."><img src="media/1x1.gif" class="run icon21">Executar</button></td><td style="width: 120px; text-align: center"><button id="resetButton" class="notEnabled" disable="disabled" title="Restarts the execution."><img src="media/1x1.gif" class="stop icon21"> Reiniciar</button></td></tr></table><div id="toolbarDiv"></div><script type="text/javascript" src="blockly_compressed.js"><\/script><script type="text/javascript" src="blocks_compressed.js"><\/script><script type="text/javascript" src="javascript_compressed.js"><\/script><script type="text/javascript" src="python_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="nobugs/language.js"><\/script><div id="blockly"></div><div id="variableBox" style="display:none"><div class="move-header"><div class="move-title">Variáveis</div><div class="move-panel"><a id="moveDown" class="move-down" href="javascript:void(0)"></a><a id="moveRight" class="move-right" style="display:none" href="javascript:void(0)"></a></div></div><div class="var-content"><table id="vars" class="easyui-datagrid" data-options="singleSelect:true"><thead><tr><th data-options="field:\'name\', width:50">Nome</th><th data-options="field:\'value\', width: 100">Valor</th></tr></thead><tbody></tbody></table></div></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogError" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center" rowspan="2"><img src="images/error.png" height="80%" width="80%"></td><td id="dialogErrorText" style="width: 80%"></td></tr><tr><td></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogInfo" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center" rowspan="2"><img src="images/info.png" height="80%" width="80%"></td><td id="dialogInfoText" style="width: 80%"></td></tr><tr><td></td></tr></table><div id="dialogInfoButton" class="farSide" style="padding: 1ex 3ex 0"></div></div>';
};


nobugspage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="SnackMan">' + ((opt_ijData.enabled['goToBarCounter'] == null) ? '<block type="move_goToBarCounter"><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + ((opt_ijData.enabled['isThereACustomer'] == null) ? '<block type="ask_isThereACustomer"> </block>' : '') + ((opt_ijData.enabled['askHasHunger'] == null) ? '<block type="ask_askHasHunger"> </block>' : '') + ((opt_ijData.enabled['askForFood'] == null) ? '<block type="ask_askForFood"> </block>' : '') + ((opt_ijData.enabled['goToDisplay'] == null) ? '<block type="move_goToDisplay"> </block>' : '') + ((opt_ijData.enabled['catchFood'] == null) ? '<block type="prepare_catchFood"> </block>' : '') + ((opt_ijData.enabled['askHasThirsty'] == null) ? '<block type="ask_askHasThirsty"> </block>' : '') + ((opt_ijData.enabled['askForDrink'] == null) ? '<block type="ask_askForDrink"> </block>' : '') + ((opt_ijData.enabled['goToCooler'] == null) ? '<block type="move_goToCooler"> </block>' : '') + ((opt_ijData.enabled['catchDrink'] == null) ? '<block type="prepare_catchDrink"> </block>' : '') + ((opt_ijData.enabled['deliver'] == null) ? '<block type="do_deliver"> </block>' : '') + '</category>' + ((opt_ijData.enabled['logic']) ? '<category name="Condicionais"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block></category>' : '') + ((opt_ijData.enabled['loop']) ? '<category name="Laços">' + ((opt_ijData.enabled['whileUntil'] == null) ? '<block type="controls_whileUntil"></block>' : '') + ((opt_ijData.enabled['for'] == null) ? '<block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + '</category>' : '') + ((opt_ijData.enabled['math']) ? '<category name="Matemática"><block type="math_number"></block><block type="math_arithmetic"></block></category>' : '') + ((opt_ijData.enabled['vars']) ? '<category name="Variáveis" custom="VARIABLE"></category>' : '') + ((opt_ijData.enabled['function']) ? '<category name="Functions" custom="PROCEDURE"></category>' : '') + '</xml>';
};


nobugspage.nextButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Game.nextStatement()">Próximo</button>';
};


nobugspage.previousButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Game.previousStatement()">Anterior</button>';
};


nobugspage.finishButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Game.finishStatement()">OK</button>';
};
