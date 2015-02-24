// This file was automatically generated from importjs_descompressed.soy.
// Please don't edit this file by hand.

if (typeof importsjs == 'undefined') { var importsjs = {}; }


importsjs.imports = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var v__soy3 = 1;
  output += '<script type="text/javascript" src="js/nobugs/language.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/slider.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/utils.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/preloadimgs.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/game.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/explanation.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/hints.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/blockly.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/graph.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/snackman.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/customer.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/customerman.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/sprite.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/nobugsjsinterpreter.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/nobugsblocklygeneratorjavascript.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/xml.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/objectives.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/questionnaire.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/variablenamesvalidate.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/navigator.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/selector.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/baloon.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/progressmoney.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script><script type="text/javascript" src="js/nobugs/leaderboard.js?v=' + soy.$$escapeHtml(v__soy3) + '"><\/script>';
  return output;
};

;
// This file was automatically generated from hints.soy.
// Please don't edit this file by hand.

if (typeof hints == 'undefined') { var hints = {}; }


hints.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="Hints_ChooseCategory">Choose a category 0 to see the blocks.</span><span id="Hints_RunProgram">Click in this button for track the cooker actions according your program.</span><span id="Hints_DebugProgram">Click in this button for track the next cooker action according your program.</span><span id="Hints_GoalButton">Click in this button for see which goals are you achieved.</span><span id="Hints_GoalButtonError">Click in this button for remember what you must do in this mission.</span><span id="Hints_DebugButtonError">If it\'s hard to achieve the goals, try to use this button and pay attention in the window of variables.</span><span id="Hints_WhileDebugging">Each time the debug button is clicked, the cooker moves according of the program command (block). The highlighted block is the next to be executed. Click again on debug button.</span><span id="Hints_VariableWindow">Here are the variables created during the game. Please note the variable name is the same as configured in the last command performed.</span><span id="Hints_ShowCountInstructions">Here is showed the quantity of blocks you are using in your program.</span><span id="Hints_EmptyInputError">There are one or more empty inputs in this block. You need insert blocks in these empty slots.</span></div>';
};


hints.dialogs = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="RightHint" class="dialogHiddenContent"><table><tr><td id="RightHintText"></td><td valign="top"><img src="images/help_right.png" style="padding: 10px" /></td></tr></table></div><div id="LeftHint" class="dialogHiddenContent"><table><tr><td valign="top"><img src="images/help_left.png" style="padding: 10px" /></td><td id="LeftHintText"></td></tr></table></div><div id="SelectCommand" class="dialogHiddenContent"><table><tr><td>Drag a block to the workspace.</td><td ><img src="images/help_stack.png" style="padding: 10px" /></td></tr></table></div><div id="StackTogether" class="dialogHiddenContent"><table><tr><td>Stack a couple of this command blocks together to be more closer to reach the goal.<br/><img src="images/stacktogether.png"/></td><td ><img src="images/help_stack.png" style="padding: 10px" /></td></tr></table></div><div id="DownHint" class="dialogHiddenContent"><table><tr><td ><img src="images/help_down.png" style="padding: 10px" /></td><td id="DownHintText"></td></tr></table></div>';
};

;
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="MyBlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from messages.soy.
// Please don't edit this file by hand.

if (typeof messages == 'undefined') { var messages = {}; }


messages.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="Blockly_variableSet">%1 and store in %2</span><span id="Blockly_ifThen">then</span><span id="Apps_catYourMachines">Your machines</span><span id="SnackMan_goToBarCounterTooltip">Moves the snack man to the customer.</span><span id="SnackMan_isThereACustomerTooltip">Verify if there is a customer in the currently position.</span><span id="SnackMan_deliverTooltip">Delivers the food or drink to the customer near the cooker.</span><span id="SnackMan_goToDisplayTooltip">Moves the snack man to the display.</span><span id="SnackMan_askForFoodTooltip">Asks the customer about what he wants to eat.</span><span id="SnackMan_catchFoodTooltip">Catches the food from the display and put it on a platter ready will deliver to the customer.</span><span id="SnackMan_askHasHungerTooltip">Asks the customer if he wants to eat something.</span><span id="SnackMan_goToCoolerTooltip">Moves the snack man to the cooler.</span><span id="SnackMan_askForDrinkTooltip">Asks the customer about what he wants to drink.</span><span id="SnackMan_catchDrinkTooltip">Catches the drink from the cooler and put it on a platter ready will deliver to the customer.</span><span id="SnackMan_askHasThirstyTooltip">Asks the customer if he wants to drink something.</span><span id="SnackMan_goToBoxOfFruitsTooltip">Moves the snack man to the box of fruits.</span><span id="SnackMan_catchFruitsTooltip">Catches a fruit necessary to prepare juice.</span><span id="SnackMan_goToJuiceMachineTooltip">Moves the snack man to the juice machine.</span><span id="SnackMan_prepareAndCatchJuiceTooltip">Use the fruit catched and prepare a juice.</span><span id="SnackMan_constjuiceOfOrangeTooltip">Juice of orange.</span><span id="SnackMan_constSoftDrinkTooltip">Soft drink.</span><span id="Error_login">User not found.</span><span id="Error_infinityLoopDetected">Infinity loop detected by system.</span><span id="Error_doesntExistCounter">This position is invalid.</span><span id="Error_isntCloseToCustomer">The cooker is not close to any customer.</span><span id="Error_thereIsntCustomer">There isn\'t any customer in this position of the counter.</span><span id="Error_isntFrontCooler">The cooker is not in front of the cooler.</span><span id="Error_isntFrontDisplay">The cooker is not in front of the display.</span><span id="Error_doesntOrderFood">There isn\'t any food in the order.</span><span id="Error_isntFrontBoxOfFruits">The cooker is not in front of the box of fruits.</span><span id="Error_onlyFruits">Here the cooker can only catch fruits.</span><span id="Error_isntFrontJuiceMachine">The cooker is not in front of the juice machine.</span><span id="Error_doesntHaveItem">The cooker bring anything to put into the juicer.</span><span id="Error_onlyPutFruits">The juicer only accepts fruits.</span><span id="Error_onlyHotDog">Here only has hotdog. The customer didn\'t order hotdog.</span><span id="Error_wrongPlaceForDrink">There isn\'t here the drink that customer orders.</span><span id="Error_doesntHaveOrder">The cooker forget to request the order.</span><span id="Error_isntHunger">The customer doesn\'t have hunger.</span><span id="Error_doesntOrderDrink">There isn\'t any drink in the order.</span><span id="Error_isntThirsty">The customer doesn\'t have thirsty.</span><span id="Error_variableHaventContentToDeliver">There is nothing to delivery.</span><span id="Error_deliveredWrongRequest">The deliver doesn\'t match the order.</span><span id="Error_doesntMatchPosition">The deliver doesn\'t match the position of the customer.</span><span id="Error_variableName">Variable name is wrong:\n\n- Don\'t use repeated variable names.\n- Use only alphabetic characters and numbers.\n\n</span><span id="Error_showPrompt">You checked before the box "Prevent this page from creating additional dialogs". So you disabled new windows to ask you information. Press [F5] and try again to give a new variable name.</span><span id="Error_navigatorNotSupported">This game is not supported by this browser. <br/>It is recommended to be downloaded and the installation of any of the browsers below:</span><span id="NoBugs_unloadWarning">Leaving this page will result in the loss of your work.</span><span id="NoBugs_goalAchieved">New Goal Achieved</span><span id="NoBugs_achieved">Achieved</span><span id="NoBugs_of">of</span><span id="NoBugs_goalAchievedVictory">You achieved this mission. \n You won a total of %0.</span><span id="NoBugs_intro2">TODO %0</span><span id="NoBugs_slider">Here you configure the cooker velocity.</span><span id="NoBugs_requiredField">Required field.</span><span id="NoBugs_finishOpenMission">The mission\'s time is over. &#60;br/&#62;&#60;br/&#62; You earned &#60;b&#62;%0&#60;/b&#62; delivering the requests.</span><span id="explanation_counter">Go to counter %0.</span><span id="explanation_askForFood">Ask the customer %0 what he wants to eat.</span><span id="explanation_askForFoodDistinctVar">Ask the customer %0 what he wants to eat and store in a new variable.</span><span id="explanation_catchFood">Catch the food that the customer %0 ordered.</span><span id="explanation_askForDrink">Ask the customer %0 what he wants to drink.</span><span id="explanation_catchDrink">Catch the drink that the customer %0 ordered.</span><span id="explanation_deliver">Deliver what the customer %0 ordered.</span><span id="explanation_varQtd">The max quantity of variables used is %0.</span><span id="explanation_commsQtd">The max quantity of commands used is %0.</span><span id="_counter">in the counter</span><span id="__counter">Counter</span><span id="rewardExplanation">Reward of %0 if you achieve all the objectives above.</span><span id="commandBonusExplanation">You\'ll receive a bonus of %0 if accomplish this mission in %1 commands or less.</span><span id="timeBonusExplanation">You\'ll receive a bonus of %0 (or more) if accomplish this mission in %1 minutes or less.</span><span id="_mission">Mission</span><span id="questionnaire">Questionnaire</span><span id="Victory_BaseValue">Base value</span><span id="Victory_Bonus">Bonus</span><span id="Victory_MaxCommands">For the maximum quantity of commands</span><span id="Victory_TimeBonus">For your time of %0</span><span id="King">King</span><span id="Queen">Queen</span><span id="Text_YourProgress">Your progress</span><span id="Text_IceCreamMachine">Ice Cream</span><span id="Text_FrenchFryer">French Fryer</span><span id="Text_Equipments">Equipments</span><span id="Text_AddNewEquipment">Add new equipments in your snackbar.</span><span id="Text_NotEnabledToSeeLeaderBoard">We only can see these values after accomplish mission %0.</span><span id="Tooltip_TabMoney">Players ordered by their money earned.</span><span id="Tooltip_TabTime">Players ordered by their level and time spent.</span><span id="Tooltip_TabRun">Players ordered by their level and amount of runs.</span></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof nobugspage == 'undefined') { var nobugspage = {}; }


nobugspage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + hints.messages(null, null, opt_ijData) + messages.messages(null, null, opt_ijData);
};


nobugspage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var v__soy454 = Math.floor(Math.random() * 999999);
  output += '<link rel="stylesheet" type="text/css" href="css/easyui/easyui.css?v=' + soy.$$escapeHtml(v__soy454) + '"><link rel="stylesheet" type="text/css" href="css/easyui/icon.css?v=' + soy.$$escapeHtml(v__soy454) + '"><link rel="stylesheet" type="text/css" href="css/jquery.growl/jquery.growl.css?v=' + soy.$$escapeHtml(v__soy454) + '" /><link rel="stylesheet" type="text/css" href="css/drop/drop-theme-arrows-alert.css?v=' + soy.$$escapeHtml(v__soy454) + '" /><link rel="stylesheet" type="text/css" href="css/jquery.countup/jquery.countup.css?v=' + soy.$$escapeHtml(v__soy454) + '"><script type="text/javascript" src="js/blockly_compressed.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/blocks_compressed.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/javascript_compressed.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.langSrc) + '?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/easyui/jquery.min.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/easyui/jquery.easyui.min.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/jquery.growl/jquery.growl.js?v=' + soy.$$escapeHtml(v__soy454) + '" ><\/script><script type="text/javascript" src="js/jquery.gridview/jquery.gridview.min.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/drop/drop.min.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/jquery.countup/base.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/jquery.countup/jquery.countup.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="js/jsinterpreter/acorn_interpreter.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script type="text/javascript" src="dwr/engine.js"><\/script><script type="text/javascript" src="dwr/util.js"><\/script><script type="text/javascript" src="dwr/interface/UserControl.js?v=' + soy.$$escapeHtml(v__soy454) + '"><\/script><script>dwr.util.useLoadingMessage();<\/script>' + importsjs.imports(null, null, opt_ijData) + '<div id="initialBackground" style="display: none"><div><form class="farSide" onsubmit="return false"><fieldset style="border: 0px none"><label class="user"><input type="text" id="loginuser" placeHolder="User"/></label><label class="password"><input type="password" id="loginpassw" placeHolder="Password"/></label><button id="ButtonLogin" class="secondary" onclick="Game.login()">Login</button></fieldset></form><div><div id="errorLogin" style="color: red; position: relative"></div></div><div id="suporte" style="position: relative">In case of technical problems, please contact <a href="mailto:adilsonv77@gmail.com">adilsonv77@gmail.com</a></div></div><div style="width: 100%"><table style="position: fixed; bottom: 0px; right: 0px;"><tr><td colspan="2" align="center" style="padding-bottom: 5px"><i>Sponsored by</i></td><td colspan="2" align="center"><i>Developed by</i></td></tr><tr><td align="center" style="padding: 5px;"><img src="images/capes.png"/></td><td align="center" style="padding: 5px; border-right: solid 1px black"><img src="images/udesc.png"/></td><td align="center" style="padding: 5px;"><img src="images/uc.png"/></td><td align="center" style="padding: 5px;"><img src="images/cms.png"/></td></tr></table></div></div>' + nobugspage.messages(null, null, opt_ijData) + '<div id="mainBody" style="display: none"><table width="100%"><tr><td><span id="title"><img src="images/logotipo.png" height="60px" width="185px"/></span></td><td class="farSide"><select style="display: none" id="languageMenu"></select><div><span id="timerCountUp" style="position: absolute"></span><button id="logoffButton" style="background-color: white" title="Logoff the game."><img src="images/logoff.png" style="width:32px; height:32px"/></button></div></td></tr></table><div id="visualization"><canvas id="display" width="352" height="448"></canvas></div><table style="padding-top: 1em;" class="buttons"><tr><td style="width: 120px; text-align: center"><button id="debugButton" class="primary" style="margin:5px" title="Makes the snack man do what the next block say."><img src="media/1x1.gif" class="debug icon21"></button></td><td style="width: 120px; text-align: center"><button id="runButton" class="primary" style="margin:5px" title="Makes the snack man do what the blocks say."><img src="media/1x1.gif" class="run icon21"></button><button id="resetButton" class="notEnabled" style="margin:5px" disable="disabled" title="Restarts the execution."><img src="media/1x1.gif" class="stop icon21"></button></td><td style="width: 120px; text-align: center"><button id="buyButton" class="primary" style="margin:5px" title="Buy some machines."><img src="media/1x1.gif" class="buy icon21"></button><button id="goalButton" class="primary" style="margin:5px" title="See the objectives of this mission."><img src="media/1x1.gif" class="code icon21"></button></td></tr><tr><td colspan="3"><div style="margin: 0 auto; width: 150px" id="divslider"><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="images/icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="images/icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></div></td></tr></table><div id="blockly"></div><div id="variableBox" style="display:none"><div class="move-header"><div class="move-title">Variables</div><!--<div class="move-panel"><a id="moveDown" class="move-down" href="javascript:void(0)"></a><a id="moveRight" class="move-right" style="display:none" href="javascript:void(0)"></a></div>--></div><div class="var-content"><table id="vars" class="easyui-datagrid" data-options="singleSelect:true"><thead><tr><th data-options="field:\'name\', width:50">Name</th><th data-options="field:\'value\', width: 100">Value</th></tr></thead><tbody></tbody></table></div></div></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + hints.dialogs(null, null, opt_ijData) + '<div id="dialogIntro" class="dialogHiddenContent"><table><tr><td align="center"><img src="images/info.png" style="margin: 10px"/></td><td><span id="userCompleteName"></span><br/><br/>TODO<br/><br/><span id="NoBugsIntro2"></span><br/></td></tr></table><div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="Game.finishIntro()">OK</button></div></div><div id="dialogError" class="dialogHiddenContent"><table><tr><td align="center" rowspan="2"><img src="images/error.png" style="padding: 10px" /></td><td id="dialogErrorText"></td></tr><tr><td></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogInfo" class="dialogHiddenContent"><table><tr><td align="center"><img src="images/info.png" style="margin: 10px"/></td><td id="dialogInfoText"></td></tr></table><div id="dialogInfoButton" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogVictory" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center"><img src="images/victory.png"></td><td id="victoyText"></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogNoMoreMissions" class="dialogHiddenContent"><table><tr><td align="center"><img src="images/expert.png" style="margin: 10px"/></td><td>You\'re an expert !!! There aren\'t more missions for you.</td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogFail" class="dialogHiddenContent"><table><tr><td style="width: 20%" align="center"><img src="images/fail.png"></td><td><span id="dialogFailText">You don\'t achieved this mission. You need to try again.</span></td></tr></table>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogQuestionnaire" class="dialogHiddenContent"><div id="contentQuestionnaire"></div><div id="buttonsQuestionnaire" class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="Questionnaire.closeDrop(); Game.logoffButtonClick()">Logoff</button><button class="secondary" onclick="Game.finishQuestionnaire()">OK</button></div></div><div id="dialogHint" class="dialogHiddenContent"><div id="dialogHintText"></div></div><div id = "dialogSelectMission" class="dialogHiddenContent"><table><tr><td id="tdSelectMission" style="height: 342px"><span class="tabs-title" style="font-weight: bold">Select a Mission</span></td><td style="height: 342px"><span class="tabs-title" style="font-weight: bold">Leader Board</span><div id="leaderBoard" class="easyui-tabs" style="height: 342px; width: 250px"><div id="tdLeaderMoney" data-options="iconCls: \'leaderMoney\'"><table id="dgLeaderMoney" class="easyui-datagrid" data-options="rownumbers:true, singleSelect:true"><thead><tr><!-- the widths are slighty lower than the total width because the game showed a horizontal bar --><th data-options="field:\'name\', width: 148, styler: leaderStyler"></th><th data-options="field:\'money\', width: 68, styler: leaderStyler, align: \'right\'"></th></tr></thead></table><div id="notEnabledLeaderMoney" style="display: none; height: 100%"><span style="position: relative; top: 40%;"></span></div></div><div id="tdLeaderTime" data-options="iconCls: \'leaderTime\'"><table id="dgLeaderTime" class="easyui-datagrid" data-options="rownumbers:true, singleSelect:true"><thead><tr><th data-options="field:\'name\', width: 120, styler: leaderStyler"></th><th data-options="field:\'time\', width: 100, styler: leaderStyler"></th></tr></thead></table><div id="notEnabledLeaderTime" style="display: none; height: 100%"><span style="position: relative; top: 40%;"></span></div></div><div id="tdLeaderRun" data-options="iconCls: \'leaderRun\'"><table id="dgLeaderRun" class="easyui-datagrid" data-options="rownumbers:true, singleSelect:true"><thead><tr><th data-options="field:\'name\', width: 160, styler: leaderStyler"></th><th data-options="field:\'runs\', width: 60, styler: leaderStyler, align: \'right\'"></th></tr></thead></table><div id="notEnabledLeaderRun" style="display: none; height: 100%"><span style="position: relative; top: 40%;"></span></div></div></div></td></tr></table>' + nobugspage.logoffDlgButton(null, null, opt_ijData) + '</div>';
  return output;
};


nobugspage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none">' + ((opt_ijData.enabled['snackMan']) ? '<category name="SnackMan">' + ((opt_ijData.enabled['goToBarCounter']) ? '<block type="move_goToBarCounter"><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + ((opt_ijData.enabled['isThereACustomer']) ? '<block type="ask_isThereACustomer"> </block>' : '') + ((opt_ijData.enabled['askHasHunger']) ? '<block type="ask_askHasHunger"> </block>' : '') + ((opt_ijData.enabled['askForFood']) ? '<block type="ask_askForFood"> </block>' : '') + ((opt_ijData.enabled['goToDisplay']) ? '<block type="move_goToDisplay"> </block>' : '') + ((opt_ijData.enabled['pickUpHotDog']) ? '<block type="prepare_pickUpHotDog"> </block>' : '') + ((opt_ijData.enabled['askHasThirsty']) ? '<block type="ask_askHasThirsty"> </block>' : '') + ((opt_ijData.enabled['askForDrink']) ? '<block type="ask_askForDrink"> </block>' : '') + ((opt_ijData.enabled['isTypeOfDrink']) ? '<block type="compare_isTypeOfDrink"> </block>' : '') + ((opt_ijData.enabled['goToCooler']) ? '<block type="move_goToCooler"> </block>' : '') + ((opt_ijData.enabled['goToBoxOfFruits']) ? '<block type="move_goToBoxOfFruits"></block>' : '') + ((opt_ijData.enabled['pickUpFruits']) ? '<block type="prepare_pickUpFruits"> </block>' : '') + ((opt_ijData.enabled['goToJuiceMachine']) ? '<block type="move_goToJuiceMachine"> </block>' : '') + ((opt_ijData.enabled['prepareAndPickUpJuice']) ? '<block type="prepare_prepareAndPickUpJuice"> </block>' : '') + ((opt_ijData.enabled['pickUpDrink']) ? '<block type="prepare_pickUpDrink"> </block>' : '') + ((opt_ijData.enabled['deliver']) ? '<block type="do_deliver"> </block>' : '') + '</category>' : '') + ((opt_ijData.enabled['vars']) ? '<category name="Variables" custom="VARIABLE"></category>' : '') + ((opt_ijData.enabled['logic']) ? '<category name="Logic"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block></category>' : '') + ((opt_ijData.enabled['const']) ? '<category name="Constants">' + ((opt_ijData.enabled['const.juiceOfOrange']) ? '<block type="const_juiceOfOrange"> </block>' : '') + ((opt_ijData.enabled['const.softDrink']) ? '<block type="const_softDrink"> </block>' : '') + '</category>' : '') + ((opt_ijData.enabled['loop']) ? '<category name="Loops">' + ((opt_ijData.enabled['whileUntil']) ? '<block type="controls_whileUntil"></block>' : '') + ((opt_ijData.enabled['for']) ? '<block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block>' : '') + '</category>' : '') + ((opt_ijData.enabled['math']) ? '<category name="Math"><block type="math_number"></block><block type="math_arithmetic"></block></category>' : '') + ((opt_ijData.enabled['function']) ? '<category name="Functions" custom="PROCEDURE"></category>' : '') + '</xml>';
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


nobugspage.logoffDlgButton = function(opt_data, opt_ignored, opt_ijData) {
  return '\t<div class="farSide" ><button class="secondary" onclick="Game.logoffButtonClick()">Logoff</button></div>';
};


nobugspage.buyButton = function(opt_data, opt_ignored, opt_ijData) {
  return '\t<div class="farSide" ><button class="secondary" id="BuyMachine" onclick="Game.buyMachineButtonClick()" disabled="disabled">Buy</button><button class="secondary" onclick="BlocklyApps.hideDialog(false)">Close</button></div>';
};
