// This file was automatically generated from importjs_compressed.soy.
// Please don't edit this file by hand.

if (typeof importsjs == 'undefined') { var importsjs = {}; }


importsjs.imports = function(opt_data, opt_ignored, opt_ijData) {
  return '<script type="text/javascript" src="nobugs/nobugs-min.js"><\/script>';
};

;
// This file was automatically generated from hints.soy.
// Please don't edit this file by hand.

if (typeof hints == 'undefined') { var hints = {}; }


hints.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="Hints_ChooseCategory">Selecione a categoria {0} para ver os blocos.</span><span id="Hints_RunProgram">Clique nesse botão para acompanhar o cozinheiro movimentar-se de acordo com seu programa.</span><span id="Hints_DebugProgram">Clique nesse botão para acompanhar o cozinheiro movimentar-se de acordo com o próximo comando do seu programa.</span><span id="Hints_GoalButton">Clique nesse botão para verificar quais objetivos você já finalizou.</span><span id="Hints_GoalButtonError">Clique nesse botão para relembrar o que precisas fazer nessa missão.</span><span id="Hints_DebugButtonError">Se está difícil de finalizar a missão, experimente utilizar esse botão e preste atenção na janela de variáveis.</span><span id="Hints_WhileDebugging">Cada vez que clica no botão Depurar, o movimento do cozinheiro é executado de acordo com um comando do seu programa. Observe que o bloco realçado é o próximo a ser executado. Clique novamente no botão Depurar.</span><span id="Hints_VariableWindow">Aqui estão as variáveis criadas durante a execução. Observe que o nome da variável é o mesmo que aquele configurado no último comando executado.</span><span id="Hints_ShowCountInstructions">Aqui está a quantidade de blocos que você tem em seu programa.</span><span id="Hints_EmptyInputError">Existem uma ou mais entradas vazias nesse bloco. Você precisa inserir um bloco nessas aberturas vazias.</span></div>';
};


hints.dialogs = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="RightHint" class="dialogHiddenContent"><table><tr><td id="RightHintText"></td><td valign="top"><img src="images/help_right.png" style="padding: 10px" /></td></tr></table></div><div id="LeftHint" class="dialogHiddenContent"><table><tr><td valign="top"><img src="images/help_left.png" style="padding: 10px" /></td><td id="LeftHintText"></td></tr></table></div><div id="SelectCommand" class="dialogHiddenContent"><table><tr><td>Arraste um bloco para a área de trabalho.</td><td ><img src="images/help_stack.png" style="padding: 10px" /></td></tr></table></div><div id="StackTogether" class="dialogHiddenContent"><table><tr><td>Empilhe um par desse bloco para ficar mais perto do objetivo.</td><td ><img src="images/help_stack.png" style="padding: 10px" /></td></tr></table></div><div id="DownHint" class="dialogHiddenContent"><table><tr><td ><img src="images/help_down.png" style="padding: 10px" /></td><td id="DownHintText"></td></tr></table></div>';
};

;
// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkTooltip">Save and link to blocks.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Run Program</span><span id="resetProgram">Reset</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Condicionais</span><span id="catLoops">Laços</span><span id="catMath">Matemática</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variáveis</span><span id="catProcedures">Functions</span><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="MyBlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof nobugspage == 'undefined') { var nobugspage = {}; }


nobugspage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + hints.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Blockly_variableSet">%1 e guardar em %2</span><span id="Blockly_ifThen">então</span><span id="SnackMan_goToBarCounterTooltip">Move o cozinheiro até o balcão.</span><span id="SnackMan_isThereACustomerTooltip">Verifica se existe um cliente na posição atual.</span><span id="SnackMan_deliverTooltip">Entrega a comida ou bebida ao cliente na posição atual.</span><span id="SnackMan_goToDisplayTooltip">Move o cozinheiro até o mostrador.</span><span id="SnackMan_askForFoodTooltip">Pergunto ao cliente o que ele deseja comer.</span><span id="SnackMan_catchFoodTooltip">Pega a comida do mostrador e coloca na bandeja pronto para ser entregue ao cliente.</span><span id="SnackMan_askHasHungerTooltip">Pergunto ao cliente se deseja comer algo.</span><span id="SnackMan_goToCoolerTooltip">Move o cozinheiro até o refrigerador.</span><span id="SnackMan_askForDrinkTooltip">Pergunto ao cliente o que ele deseja beber.</span><span id="SnackMan_catchDrinkTooltip">Pega a bebida do refrigerador e coloca na bandeja pronto para ser entregue ao cliente.</span><span id="SnackMan_askHasThirstyTooltip">Pergunto ao cliente se deseja beber algo.</span><span id="SnackMan_goToBoxOfFruitsTooltip">Move o cozinheiro até a caixa de frutas.</span><span id="SnackMan_catchFruitsTooltip">Pega uma fruta da caixa necessária para preparar o sumo.</span><span id="SnackMan_goToJuiceMachineTooltip">Move o cozinheiro até a máquina de sumos.</span><span id="SnackMan_prepareAndCatchJuiceTooltip">Usa a fruta pêga e prepara o sumo.</span><span id="SnackMan_constjuiceOfOrangeTooltip">Sumo de laranja.</span><span id="SnackMan_constSoftDrinkTooltip">Refrigerante.</span><span id="Error_login">Usuário não encontrado.</span><span id="Error_infinityLoopDetected">Ciclo perpétuo detectado pelo sistema.</span><span id="Error_doesntExistCounter">Esta posição é inválida.</span><span id="Error_isntCloseToCustomer">Não está junto de um cliente.</span><span id="Error_thereIsntCustomer">Não existe qualquer cliente nessa posição do balcão.</span><span id="Error_isntFrontCooler">O cozinheiro não está em frente à refrigerador.</span><span id="Error_isntFrontDisplay">O cozinheiro não está em frente ao mostrador aquecido.</span><span id="Error_doesntOrderFood">Não existe comida anotada no pedido.</span><span id="Error_isntFrontBoxOfFruits">O cozinheiro não está em frente à caixa de frutas.</span><span id="Error_onlyFruits">Aqui o cozinheiro somente consegue obter frutas.</span><span id="Error_isntFrontJuiceMachine">O cozinheiro não está em frente à máquina de sumos.</span><span id="Error_doesntHaveItem">O cozinheiro não trouxe qualquer fruta para inserir na máquina de sumos.</span><span id="Error_onlyPutFruits">A máquina de sumos só aceita frutas.</span><span id="Error_onlyHotDog">Aqui só tem cachorro-quente. O cliente não pediu esse tipo de comida.</span><span id="Error_wrongPlaceForDrink">Aqui não tem a bebida pedida pelo cliente.</span><span id="Error_doesntHaveOrder">O cozinheiro esqueceu de anotar o pedido.</span><span id="Error_isntHunger">O cliente não está com fome.</span><span id="Error_doesntOrderDrink">Não existem bebidas nesse pedido.</span><span id="Error_isntThirsty">O cliente não está com sede.</span><span id="Error_variableHaventContentToDeliver">Não há nada a ser entregue.</span><span id="Error_deliveredWrongRequest">A entrega não corresponde ao que o cliente pediu.</span><span id="Error_doesntMatchPosition">A entrega não corresponde à mesma posição do cliente.</span><span id="Error_variableName">O nome da variável está incorreto: use somente caracteres alfabéticos e números.</span><span id="Error_showPrompt">Você marcou a caixa "Prevenir esta página de criar diálogos adicionais". Com isso você desabilitou novas janelas de lhe pedirem informações. Pressione [F5] e tente novamente atribuir o nome de uma variável.</span><span id="NoBugs_unloadWarning">Deixar essa página resulta em perdas no trabalho.</span><span id="NoBugs_goalAchieved">Novo Objetivo Cumprido</span><span id="NoBugs_achieved">Cumprido(s)</span><span id="NoBugs_of">de</span><span id="NoBugs_goalAchievedVictory">Você finalizou todos os objetivos da missão. Você recebeu no total {0}.</span><span id="NoBugs_intro2">Desenvolve o teu ingrediente secreto e sê a esplanada que atende mais rápido, atrai mais clientes e gera mais dinheiro. Torna-te {0} das Esplanadas.</span><span id="NoBugs_slider">Aqui você configura a velocidade do cozinheiro.</span><span id="NoBugs_requiredField">Campo obrigatório.</span><span id="explanation_counter">Vá para o balcão {0}.</span><span id="explanation_askForFood">Pergunta pelo que o cliente {0} deseja comer.</span><span id="explanation_askForFoodDistinctVar">Pergunta pelo que o cliente {0} deseja comer e armazena o pedido em uma nova variável.</span><span id="explanation_catchFood">Pegue a comida solicitada pelo cliente {0}.</span><span id="explanation_askForDrink">Pergunta pelo que o cliente {0} deseja beber.</span><span id="explanation_catchDrink">Pegue a bebida solicitada pelo cliente {0}.</span><span id="explanation_deliver">Entregue o pedido do cliente {0}.</span><span id="explanation_varQtd">A quantidade máxima de variável(is) aceita(s) é(são) {0}.</span><span id="explanation_commsQtd">A quantidade máxima de comandos aceitos são {0}.</span><span id="_counter">no balcão</span><span id="__counter">Balcão</span><span id="rewardExplanation">Receba {0} se cumprir todos os objetivos acima.</span><span id="commandBonusExplanation">Você receberá um bônus de {0} se cumprir a missão com {1} comandos ou menos.</span><span id="timeBonusExplanation">Você receberá um bônus de {0} (ou mais) se cumprir a missão em {1} minutos ou menos.</span><span id="_mission">missão</span><span id="_missions">Missões</span><span id="questionnaire">Questionário</span><span id="Victory_BaseValue">Valor base</span><span id="Victory_Bonus">Bônus</span><span id="Victory_MaxCommands">Para o máximo de comandos</span><span id="Victory_TimeBonus">Para o seu tempo de {0}</span><span id="King">o Rei</span><span id="Queen">a Rainha</span></div>';
};


nobugspage.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<script type="text/javascript" src="blockly_compressed.js"><\/script><script type="text/javascript" src="blocks_compressed.js"><\/script><script type="text/javascript" src="javascript_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><link rel="stylesheet" type="text/css" href="easyui/easyui.css"><link rel="stylesheet" type="text/css" href="easyui/icon.css"><script type="text/javascript" src="easyui/jquery.min.js"><\/script><script type="text/javascript" src="easyui/jquery.easyui.min.js"><\/script><script src="jquery.growl/jquery.growl.js" type="text/javascript"><\/script><link href="jquery.growl/jquery.growl.css" rel="stylesheet" type="text/css" /><script type="text/javascript" src="jquery.gridview/jquery.gridview.min.js"><\/script><script type="text/javascript" src="drop/drop.min.js"><\/script><link rel="stylesheet" href="drop/drop-theme-arrows-alert.css" /><link rel="stylesheet" href="jquery.countup/jquery.countup.css"><script src="jquery.countup/base.js"><\/script><script src="jquery.countup/jquery.countup.js"><\/script><script type="text/javascript" src="jsinterpreter/acorn_interpreter.js"><\/script><script type="text/javascript" src="dwr/engine.js"><\/script><script type="text/javascript" src="dwr/interface/UserControl.js"><\/script>' + importsjs.imports(null, null, opt_ijData) + '<div id="initialBackground" style="display: none"><div><form class="farSide" onsubmit="return false"><fieldset style="border: 0px none"><label class="user"><input type="text" id="loginuser" placeHolder="Usuário"/></label><label class="password"><input type="password" id="loginpassw" placeHolder="Senha"/></label><button id="ButtonLogin" class="secondary" onclick="Game.login()">Entrar</button></fieldset></form><div id="errorLogin" style="color: red; position: absolute"></div><div id="suporte" style="text-align: right; position: absolute; left: 879px;padding-right:15px">Em caso de problemas técnicos, entre em contacto com <a href="mailto:adilsonv77@gmail.com">adilsonv77@gmail.com</a></div></div><div style="width: 100%"><table style="position: fixed; bottom: 0px; right: 0px;"><tr><td colspan="2" align="center" style="padding-bottom: 5px"><i>Sponsored by</i></td><td colspan="2" align="center"><i>Developed by</i></td></tr><tr><td align="center" style="padding: 5px;"><img src="images/capes.png"/></td><td align="center" style="padding: 5px; border-right: solid 1px black"><img src="images/udesc.png"/></td><td align="center" style="padding: 5px;"><img src="images/uc.png"/></td><td align="center" style="padding: 5px;"><img src="images/cms.png"/></td></tr></table></div></div>' + nobugspage.messages(null, null, opt_ijData) + '<div id="mainBody" style="display: none"><table width="100%"><tr><td><span id="title"><img src="images/logotipo.png" height="60px" width="185px"/></span></td><td class="farSide"><select style="display: none" id="languageMenu"></select><div><span id="timerCountUp" style="position: absolute"></span><button id="logoffButton" style="background-color: white" title="Sair do jogo"><img src="images/logoff.png" style="width:32px; height:32px"/></button></div></td></tr></table><div id="visualization"><canvas id="display" width="352" height="448"></canvas></div><table style="padding-top: 1em;" class="buttons"><tr><td style="width: 120px; text-align: center"><button id="debugButton" class="primary" style="margin:5px" title="Executar somente um passo."><img src="media/1x1.gif" class="debug icon21"></button></td><td style="width: 120px; text-align: center"><button id="runButton" class="primary" style="margin:5px" title="Executar o programa."><img src="media/1x1.gif" class="run icon21"></button><button id="resetButton" class="notEnabled" style="margin:5px" disable="disabled" title="Reinicia a execução."><img src="media/1x1.gif" class="stop icon21"></button></td><td style="width: 120px; text-align: center"><button id="goalButton" class="primary" style="margin:5px" title="Consultar os objetivos da missão"><img src="media/1x1.gif" class="code icon21"></button></td></tr><tr><td colspan="3"><div style="margin: 0 auto; width: 150px" id="divslider"><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="images/icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="images/icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></div></td></tr></table><div id="blockly"></div><div id="variableBox" style="display:none"><div class="move-header"><div class="move-title">Variáveis</div><!--<div class="move-panel"><a id="moveDown" class="move-down" href="javascript:void(0)"></a><a id="moveRight" class="move-right" style="display:none" href="javascript:void(0)"></a></div>--></div><div class="var-content"><table id="vars" class="easyui-datagrid" data-options="singleSelect:true"><thead><tr><th data-options="field:\'name\', width:50">Nome</th><th data-options="field:\'value\', width: 100">Valor</th></tr></thead><tbody></tbody></table></div></div></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + hints.dialogs(null, null, opt_ijData) + '<div id="dialogIntro" class="dialogHiddenContent"><table><tr><td align="center"><img src="images/info.png" style="margin: 10px"/></td><td><span id="userCompleteName"></span><br/><br/>O ramo das esplanadas é muito competitivo: como os lanches são idênticos em todos os estabelecimentos os melhores são aqueles em que o cliente é melhor atendido e que possuem um clima agradável para se estar algumas horas. Porém, podes ter um ingrediente secreto nos lanches servidos e a tua esplanada se tornar aquela a que toda gente gostaria de ir pelo menos uma vez por semana. Começa como aprendiz na esplanada e evolui até teres condições de adquirir o teu estabelecimento. Vou estar a acompanhar-te ao longo de várias missões até te tornares auto-suficiente.<br/><br/><span id="NoBugsIntro2"></span><br/></td></tr></table><div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="Game.finishIntro()">OK</button></div></div><div id="dialogError" class="dialogHiddenContent"><table><tr><td align="center" rowspan="2"><img src="images/error.png" style="padding: 10px" /></td><td id="dialogErrorText"></td></tr><tr><td></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogInfo" class="dialogHiddenContent"><table><tr><td align="center"><img src="images/info.png" style="margin: 10px"/></td><td id="dialogInfoText"></td></tr></table><div id="dialogInfoButton" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogVictory" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center"><img src="images/victory.png"></td><td id="victoyText"></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogNoMoreMissions" class="dialogHiddenContent"><table><tr><td align="center"><img src="images/expert.png" style="margin: 10px"/></td><td>Você já é um expert no assunto. Não existem mais missões para si.</td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogFail" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center"><img src="images/fail.png"></td><td><span id="dialogFailText">Você não concluiu todos os objetivos da missão. Tente novamente.</span></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogQuestionnaire" class="dialogHiddenContent"><div id="contentQuestionnaire"></div><div id="buttonsQuestionnaire" class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="Questionnaire.closeDrop(); Game.logoffButtonClick()">Sair</button><button class="secondary" onclick="Game.finishQuestionnaire()">OK</button></div></div><div id="dialogHint" class="dialogHiddenContent"><div id="dialogHintText"></div></div>';
};


nobugspage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none">' + ((opt_ijData.enabled['snackMan']) ? '<category name="SnackMan">' + ((opt_ijData.enabled['goToBarCounter']) ? '<block type="move_goToBarCounter"><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + ((opt_ijData.enabled['isThereACustomer']) ? '<block type="ask_isThereACustomer"> </block>' : '') + ((opt_ijData.enabled['askHasHunger']) ? '<block type="ask_askHasHunger"> </block>' : '') + ((opt_ijData.enabled['askForFood']) ? '<block type="ask_askForFood"> </block>' : '') + ((opt_ijData.enabled['goToDisplay']) ? '<block type="move_goToDisplay"> </block>' : '') + ((opt_ijData.enabled['catchFood']) ? '<block type="prepare_catchFood"> </block>' : '') + ((opt_ijData.enabled['askHasThirsty']) ? '<block type="ask_askHasThirsty"> </block>' : '') + ((opt_ijData.enabled['askForDrink']) ? '<block type="ask_askForDrink"> </block>' : '') + ((opt_ijData.enabled['isTypeOfDrink']) ? '<block type="compare_isTypeOfDrink"> </block>' : '') + ((opt_ijData.enabled['goToCooler']) ? '<block type="move_goToCooler"> </block>' : '') + ((opt_ijData.enabled['goToBoxOfFruits']) ? '<block type="move_goToBoxOfFruits"></block>' : '') + ((opt_ijData.enabled['catchFruits']) ? '<block type="prepare_catchFruits"> </block>' : '') + ((opt_ijData.enabled['goToJuiceMachine']) ? '<block type="move_goToJuiceMachine"> </block>' : '') + ((opt_ijData.enabled['prepareAndCatchJuice']) ? '<block type="prepare_prepareAndCatchJuice"> </block>' : '') + ((opt_ijData.enabled['catchDrink']) ? '<block type="prepare_catchDrink"> </block>' : '') + ((opt_ijData.enabled['deliver']) ? '<block type="do_deliver"> </block>' : '') + '</category>' : '') + ((opt_ijData.enabled['const']) ? '<category name="Constantes">' + ((opt_ijData.enabled['const.juiceOfOrange']) ? '<block type="const_juiceOfOrange"> </block>' : '') + ((opt_ijData.enabled['const.softDrink']) ? '<block type="const_softDrink"> </block>' : '') + '</category>' : '') + ((opt_ijData.enabled['logic']) ? '<category name="Condicionais"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block></category>' : '') + ((opt_ijData.enabled['loop']) ? '<category name="Laços">' + ((opt_ijData.enabled['whileUntil']) ? '<block type="controls_whileUntil"></block>' : '') + ((opt_ijData.enabled['for']) ? '<block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + '</category>' : '') + ((opt_ijData.enabled['math']) ? '<category name="Matemática"><block type="math_number"></block><block type="math_arithmetic"></block></category>' : '') + ((opt_ijData.enabled['vars']) ? '<category name="Variáveis" custom="VARIABLE"></category>' : '') + ((opt_ijData.enabled['function']) ? '<category name="Functions" custom="PROCEDURE"></category>' : '') + '</xml>';
};


nobugspage.nextButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Explanation.nextStatement()">Próximo</button>';
};


nobugspage.previousButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Explanation.previousStatement()">Anterior</button>';
};


nobugspage.finishButton = function(opt_data, opt_ignored, opt_ijData) {
  return '<button class="secondary" onclick="Explanation.finishStatement()">OK</button>';
};


nobugspage.logoffDlgButton = function(opt_data, opt_ignored, opt_ijData) {
  return '\t<div class="farSide" ><button class="secondary" onclick="Game.logoffButtonClick()">Sair</button></div>';
};
