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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="SnackMan_goToCustomerTooltip">Move o cozinheiro até o balcão.</span><span id="SnackMan_goToDisplayTooltip">Move o cozinheiro até o mostrador.</span><span id="SnackMan_goToCoolerTooltip">Moves the snack man to the cooler.</span><span id="SnackMan_askForFoodTooltip">Pergunto ao cliente o que ele deseja.</span><span id="SnackMan_isThereACustomerTooltip">Verifica se existe um cliente na posição atual.</span><span id="Error_infinityLoopDetected">Ciclo perpétuo detectado pelo sistema.</span><span id="Error_doesntExistCustomer">Esta posição é inválida.</span><span id="NoBugs_unloadWarning">Deixar essa página resulta em perdas no trabalho.</span></div>';
};


nobugspage.start = function(opt_data, opt_ignored, opt_ijData) {
  return nobugspage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title">NoBug\'s Snack Bar</span></h1></td><td class="farSide"><select style="visibility: hidden;" id="languageMenu"></select></td></tr></table><div id="visualization"><canvas id="display" width="352" height="448"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 120px; text-align: center"><button id="debugButton" class="primary" title="Executar somente um passo."><img src="media/1x1.gif" class="debug icon21">Passo</button></td><td style="width: 190px; text-align: center"><button id="runButton" class="primary" title="Executar o programa."><img src="media/1x1.gif" class="run icon21">Executar</button><button id="resetButton" class="primary"  style="display: none"><img src="media/1x1.gif" class="stop icon21"> Reiniciar</button></td></tr></table><div id="toolbarDiv"></div><script type="text/javascript" src="blockly_compressed.js"><\/script><script type="text/javascript" src="blocks_compressed.js"><\/script><script type="text/javascript" src="javascript_compressed.js"><\/script><script type="text/javascript" src="python_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="language.js"><\/script>' + nobugspage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="variableBox"><div class="move-header"><div class="move-title">Variáveis</div><div class="move-panel"><a id="moveDown" class="move-down" href="javascript:void(0)"></a><a id="moveRight" class="move-right" style="display:none" href="javascript:void(0)"></a></div></div><div class="var-content"><table id="vars" class="easyui-datagrid" data-options="singleSelect:true"><thead><tr><th data-options="field:\'name\', width:50">Nome</th><th data-options="field:\'value\', width: 100">Valor</th></tr></thead><tbody></tbody></table></div></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogError" class="dialogHiddenContent"><table><tr><td><img src="images/error.png" height="50%" width="50%"></td><td id="dialogErrorText"></td><td>' + apps.ok(null, null, opt_ijData) + '</td></tr></table></div>';
};


nobugspage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="SnackMan"><block type="move_goToCustomer"><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="move_goToDisplay"> </block><block type="move_goToCooler"> </block><block type="ask_askForFood"> </block><block type="ask_isThereACustomer"> </block><block type="alert"> </block></category><category name="Condicionais"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block></category><category name="Laços"><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block></category><category name="Matemática"><block type="math_number"></block><block type="math_arithmetic"></block></category><category name="Variáveis" custom="VARIABLE"></category><category name="Functions" custom="PROCEDURE"></category></xml>';
};
