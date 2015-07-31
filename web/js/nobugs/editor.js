/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://github.com/adilsonv77/nobugssnackbar/
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
 * Editor that can use to incorporate in the administration feature.
 * 
 * @fileoverview Game management for NoBugs Snack Bar application.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

var EditorNoBug = {};

EditorNoBug.init = function() {
	
	  BlocklyApps.init();
		
	  NoBugsJavaScript.redefine();
	  
	  Blockly.JavaScript.addReservedWords('Game, code, NoBugsJavaScript');
	  
	  var toolbox = null; 
	  if (Blockly.myToolBox != undefined) 
		  toolbox = Blockly.myToolBox;
	  else
  	      toolbox = nobugspage.toolbox(null, null, 
			  {enabled: {"snackMan": true, 
				  		   "goToBarCounter": true,
				  		   "isThereACustomer": true,
				  		   "askHasHunger": true,
				  		   "askForFood": true,
				  		   "goToDisplay": true,
				  		   "pickUpHotDog": true,
				  		   "askHasThirsty": true,
				  		   "askForDrink": true,
				  		   "goToCooler": true,
				  		   "goToBoxOfFruits": true,
				  		   "pickUpFruits": true,
				  		   "goToJuiceMachine": true,
				  		   "prepareAndPickUpJuice": true,
				  		   "pickUpDrink": true,
				  		   "deliver": true,
				  		   "wait": true,

				  		 "loop": true, 
				  		   "for": true,
				  		   "whileUntil": true,
				  		   
				  		 "logic": true, "math": true, "vars": true, "function": true, 
				  		 
				  		 "const": true,
				  		 	"const.juiceOfOrange": true,
				  		 	"const.softDrink": true}}); 
	  
	  EditorNoBug.blockly = document.getElementById('blockly');
	  
	  Blockly.inject(EditorNoBug.blockly,
			     { media: "media/",
			       rtl: false,
			       toolbox: toolbox,
			       trashcan: true,
			       comments: false,
			       scrollbars: true});

	var top = document.getElementById('title').clientHeight;
	EditorNoBug.blockly.style.top = Math.max(70, top - window.pageYOffset) + 'px';
	  
    Blockly.BlockSvg.Game = EditorNoBug;
    
    EditorNoBug.CTRLPRESSED = false;
    EditorNoBug.blocksSelected = [];

    window.addEventListener('keydown',  EditorNoBug.keyDown);
    window.addEventListener('keyup',  EditorNoBug.keyUp);
    
    /*    ask the application which blocks need to read */
    UserControl.loadBlocksToEditor(function (answer) {
    	
    	answer = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="robomaze_andar" id="21" x="129.99999999999977" y="32"><next><block type="controls_if" id="27" inline="false"><mutation else="1"></mutation><value name="IF0"><block type="logic_operation" id="39" inline="true"><field name="OP">AND</field><value name="A"><block type="logic_compare" id="33" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_qtdadeitens" id="79"></block></value><value name="B"><block type="math_number" id="113"><field name="NUM">2</field></block></value></block></value><value name="B"><block type="logic_compare" id="40" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_corcelula" id="89"></block></value><value name="B"><block type="cons_preto" id="99"></block></value></block></value></block></value><statement name="DO0"><block type="robomaze_viraresquerda" id="50"><next><block type="robomaze_andar" id="60"><next><block type="controls_if" id="66" inline="false"><value name="IF0"><block type="logic_operation" id="114" inline="true"><field name="OP">OR</field><value name="A"><block type="logic_compare" id="115" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_qtdadeitens" id="116"></block></value><value name="B"><block type="math_number" id="117"><field name="NUM">2</field></block></value></block></value><value name="B"><block type="logic_compare" id="118" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_corcelula" id="119"></block></value><value name="B"><block type="cons_amarelo" id="130"></block></value></block></value></block></value><statement name="DO0"><block type="robomaze_largaritem" id="140"></block></statement><next><block type="robomaze_virardireita" id="150"></block></next></block></next></block></next></block></statement><statement name="ELSE"><block type="controls_if" id="239" inline="false"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare" id="194" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_corcelula" id="204"></block></value><value name="B"><block type="cons_amarelo" id="214"></block></value></block></value><statement name="DO0"><block type="robomaze_virardireita" id="224"></block></statement><statement name="ELSE"><block type="robomaze_retornar" id="258"></block></statement></block></statement><next><block type="robomaze_andar" id="259"><next><block type="controls_if" id="260" inline="false"><mutation else="1"></mutation><value name="IF0"><block type="logic_operation" id="261" inline="true"><field name="OP">OR</field><value name="A"><block type="logic_compare" id="265" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_corcelula" id="266"></block></value><value name="B"><block type="cons_amarelo" id="277"></block></value></block></value><value name="B"><block type="logic_compare" id="262" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_qtdadeitens" id="263"></block></value><value name="B"><block type="math_number" id="264"><field name="NUM">4</field></block></value></block></value></block></value><statement name="DO0"><block type="robomaze_largaritem" id="286"><next><block type="robomaze_virardireita" id="284"><next><block type="robomaze_andar" id="269"><next><block type="controls_if" id="270" inline="false"><mutation else="1"></mutation><value name="IF0"><block type="logic_operation" id="271" inline="true"><field name="OP">AND</field><value name="A"><block type="logic_compare" id="275" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_corcelula" id="276"></block></value><value name="B"><block type="cons_preto" id="267"></block></value></block></value><value name="B"><block type="logic_compare" id="272" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_qtdadeitens" id="273"></block></value><value name="B"><block type="math_number" id="274"><field name="NUM">4</field></block></value></block></value></block></value><statement name="DO0"><block type="robomaze_viraresquerda" id="268"></block></statement><statement name="ELSE"><block type="robomaze_largaritem" id="278"><next><block type="robomaze_andar" id="300"></block></next></block></statement></block></next></block></next></block></next></block></statement><statement name="ELSE"><block type="controls_if" id="280" inline="false"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare" id="281" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_qtdadeitens" id="301"></block></value><value name="B"><block type="math_number" id="302"><field name="NUM">4</field></block></value></block></value><statement name="DO0"><block type="robomaze_largaritem" id="303"></block></statement><statement name="ELSE"><block type="robomaze_virardireita" id="279"><next><block type="controls_if" id="309" inline="false"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare" id="310" inline="true"><field name="OP">EQ</field><value name="A"><block type="robomaze_corcelula" id="311"></block></value><value name="B"><block type="cons_amarelo" id="312"></block></value></block></value><statement name="DO0"><block type="robomaze_viraresquerda" id="322"></block></statement><statement name="ELSE"><block type="robomaze_andar" id="336"></block></statement></block></next></block></statement></block></statement><next><block type="robomaze_andar" id="337"><next><block type="robomaze_viraresquerda" id="338"><next><block type="robomaze_andar" id="339"><next><block type="robomaze_largaritem" id="340"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>';
        var xml = Blockly.Xml.textToDom(answer);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
        
    });

};

EditorNoBug.keyDown = function(evt) {
	EditorNoBug.CTRLPRESSED = evt.ctrlKey;
};

EditorNoBug.keyUp = function(evt) {
	EditorNoBug.CTRLPRESSED = false;
};

EditorNoBug.clickSave = function() {
	
	var xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
	console.log(xml);
	UserControl.saveBlocksFromEditor(xml, function() {
		parent.PF('loadBlocksDlg').hide();
	});
};

window.addEventListener('load', EditorNoBug.init);

