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
	  
	  Blockly.JavaScript['logic_compare'] = NoBugsJavaScript.oldLogicCompare; // it mustn't use the new version of comparison because here we dont use javascript interpreter classes 
	  
	  Blockly.JavaScript.addReservedWords('Game, code, NoBugsJavaScript');
	  
	  var toolbox = null; 
	  if (Blockly.myToolBox != undefined) 
		  toolbox = Blockly.myToolBox;
	  else
  	      toolbox = nobugspage.toolbox(null, null, 
			  {enabled: {"snackMan": true, 
				  		   "goToBarCounter": true,
				  		   "isThereACustomer": true,
				  		   "askWantHowManyFoods": true,
				  		   "askHasHunger": true,
				  		   "askForFood": true,
				  		   "goToDisplay": true,
				  		   "pickUpHotDog": true,
				  		   "askWantHowManyDrinks": true,
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
   
    var mx=null;
    try{
    	mx=fAlternative;
    }catch(ex){
    	
    }
    if (mx) {
    	var xml = Blockly.Xml.textToDom(fAlternative());
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    	
    } else {

    	/*    ask the application which blocks need to read */
        UserControl.loadBlocksToEditor(function (answer) {
            var xml = Blockly.Xml.textToDom(answer);
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
            
        });
    	
    }

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

EditorNoBug.genJS = function() {
	BlocklyApps.log = [];
	var js = Blockly.JavaScript;
	var code = "var NoBugsJavaScript = {};\n" +  
	 				js.workspaceToCode(Blockly.mainWorkspace);
	
	alert( afterGenJS(code) );
	 
};

window.addEventListener('load', EditorNoBug.init);

