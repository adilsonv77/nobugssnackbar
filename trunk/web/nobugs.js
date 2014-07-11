/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://nobugssnackbar.googlecode.com/
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
 * This code is based on Mazed application
 * 
 * @fileoverview JavaScript for NoBugs Snack Bar application.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

// Supported languages.
BlocklyApps.LANGUAGES =
    [  'en' ];
BlocklyApps.LANG = BlocklyApps.getLang();
//Game.student = BlocklyApps.getStringParamFromUrl('student', null);

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

/**
 * Create a namespace for the application.
 */
var Game = {};

Game.runningStatus = 0;

var hero = new SnackMan();
Game.mission = BlocklyApps.getStringParamFromUrl('mission', '1');


/**
 * PID of animation task currently executing.
 */
Game.pidList = [];


Game.lastErrorData;

/**
 * Initialize Blockly and SnackBar. Called on page load.
 */
Game.init = function() {
  BlocklyApps.init();

  Blockly.Msg.CONTROLS_IF_MSG_THEN = "then"; // changing "do" to "then"
  // TODO how can I generalize this change ? 
  
  var rtl = BlocklyApps.isRtl(); // Right-To-Left language. I keep this, but it's not our initial intention
    
  var onresize = function(e) {
	var blocklyDiv = document.getElementById('blockly'); // the Block Graphics edition area
	var visualization = document.getElementById('visualization'); // the animation area
	var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '380px';
    var w = window.innerWidth - 600;
    blocklyDiv.style.width = (w) + 'px';
    
    var variables = document.getElementById("variableBox");
    variables.style.top = blocklyDiv.style.top;
    variables.style.left = ((rtl ? 10 : 380) + w + 5) + 'px';
    variables.style.height = '89%';
    
    //variables.style.width = (window.innerWidth - blocklyDiv.style.width) + 'px';
  };
  window.addEventListener('scroll', function() {
      onresize();
      Blockly.fireUiEvent(window, 'resize');
    });
  window.addEventListener('resize', onresize);
  onresize();

  var toolbox = document.getElementById('toolbox'); // xml definition of the available commands
  Blockly.inject(document.getElementById('blockly'),
      {path: '',
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});

  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout(%1);\n';

  // Add to reserved word list: API, local variables in execution environment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Game,code');

  window.addEventListener('beforeunload', function(e) {
    if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
      e.returnValue = BlocklyApps.getMsg('NoBugs_unloadWarning');  // Gecko.
      return BlocklyApps.getMsg('NoBugs_unloadWarning');  // Webkit.
    }
    return null;
  });

  // Example how can assign a method to a button
  //  BlocklyApps.bindClick('captureButton', Game.createImageLink);

  var defaultXml = "";
  if (Game.mission === '2') {
	  defaultXml =
  '<xml xmlns="http://www.w3.org/1999/xhtml">' +
  '<block type="variables_set" id="43" inline="true" x="116" y="-17">' +
   ' <field name="VAR">i</field>' +
    '<value name="VALUE">' +
     ' <block type="math_number" id="45">' +
      '  <field name="NUM">1</field>' +
      '</block>' +
'    </value>' +
 '   <next>' +
  '    <block type="variables_set" id="6" inline="true">' +
   '     <field name="VAR">sair</field>' +
    '    <value name="VALUE">' +
     '     <block type="logic_boolean" id="12">' +
      '      <field name="BOOL">FALSE</field>' +
       '   </block>' +
        '</value>' +
'        <next>' +
 '         <block type="controls_whileUntil" id="18" inline="false">' +
  '          <field name="MODE">WHILE</field>' +
   '         <value name="BOOL">' +
    '          <block type="logic_negate" id="33" inline="false">' +
     '           <value name="BOOL">' +
      '            <block type="variables_get" id="38">' +
       '             <field name="VAR">sair</field>' +
        '          </block>' +
         '       </value>' +
          '    </block>' +
           ' </value>' +
'            <statement name="DO">' +
 '             <block type="move_goToCustomer" id="1" inline="false">' +
  '              <value name="VALUE">' +
   '               <block type="variables_get" id="52">' +
    '                <field name="VAR">i</field>' +
     '             </block>' +
      '          </value>' +
       '         <next>' +
        '          <block type="controls_if" id="65" inline="false">' +
         '           <mutation else="1"></mutation>' +
          '          <value name="IF0">' +
           '           <block type="ask_isThereACustomer" id="85"></block>' +
            '        </value>' +
             '       <statement name="DO0">' +
              '        <block type="move_goToCooler" id="93">' +
               '         <next>' +
                '          <block type="variables_set" id="100" inline="true">' +
                 '           <field name="VAR">sair</field>' +
                  '          <value name="VALUE">' +
                   '           <block type="logic_boolean" id="106">' +
                    '            <field name="BOOL">TRUE</field>' +
                     '         </block>' +
                      '      </value>' +
                       '   </block>' +
                        '</next>' +
'                      </block>' +
 '                   </statement>' +
  '                  <statement name="ELSE">' +
   '                   <block type="controls_if" id="116" inline="false">' +
    '                    <mutation else="1"></mutation>' +
     '                   <value name="IF0">' +
      '                    <block type="logic_compare" id="128" inline="true">' +
       '                     <field name="OP">EQ</field>' +
        '                    <value name="A">' +
         '                     <block type="variables_get" id="135">' +
          '                      <field name="VAR">i</field>' +
           '                   </block>' +
           '                 </value>' +
            '                <value name="B">' +
             '                 <block type="math_number" id="137">' +
              '                  <field name="NUM">1</field>' +
               '               </block>' +
                '            </value>' +
                 '         </block>' +
                  '      </value>' +
                   '     <statement name="DO0">' +
                    '      <block type="variables_set" id="144" inline="true">' +
                     '       <field name="VAR">i</field>' +
                      '      <value name="VALUE">' +
                       '       <block type="math_number" id="145">' +
                        '        <field name="NUM">2</field>' +
                         '     </block>' +
                          '  </value>' +
'                          </block>' +
 '                       </statement>' +
  '                      <statement name="ELSE">' +
   '                       <block type="variables_set" id="150" inline="true">' +
    '                        <field name="VAR">i</field>' +
     '                       <value name="VALUE">' +
      '                        <block type="math_number" id="151">' +
       '                         <field name="NUM">1</field>' +
        '                      </block>' +
         '                   </value>' +
          '                </block>' +
           '             </statement>' +
            '          </block>' +
             '       </statement>' +
              '    </block>' +
               ' </next>' +
'              </block>' +
 '           </statement>' +
  '        </block>' +
   '     </next>' +
    '  </block>' +
'    </next>' +
'  </block>' +
'</xml>';
  } else {
	  defaultXml =
	  '<xml>' +
	  '  <block type="move_goToCustomer">' +
	  '    <value name="VALUE">' +
	  '      <block type="math_number">' +
	  '        <field name="NUM">1</field>' +
	  '      </block>' +
	  '    </value>' +
	  '    <next>'+
		  '  <block type="move_goToDisplay">' +
		  '  </block>' +
	  '   </next>' +
	  '  </block>' +
	  '</xml>';
  }
  


  BlocklyApps.loadBlocks(defaultXml);

  BlocklyApps.bindClick('runButton', Game.runButtonClick);
  BlocklyApps.bindClick('resetButton', Game.resetButtonClick);
  BlocklyApps.bindClick('debugButton', Game.debugButtonClick);
  //BlocklyApps.bindClick('xmlButton', Game.xmlButtonClick);

  Game.ctxDisplay = document.getElementById('display').getContext('2d');
  
  Game.imgBackground = new Image();
  Game.imgBackground.onload = function() {
	  Game.reset();

	  // Lazy-load the syntax-highlighting.
	  window.setTimeout(Game.importPrettify, 1); // I dont know what this do :(
	
  };
  
  Game.imgDoor = new Image();
  Game.imgDoor.src = "images/doors.png";
  
  Game.lastErrorData = new Object();
  Game.lastErrorData.count = 0;
  Game.lastErrorData.comm = 0;
  
  var loginLoaded = function(data) {
      
      Game.mission = data;
      Game.imgBackground.src = 'images/fundo.png';	  
  
  };
  
  
  
  loginLoaded(1); // in the future the game must load the parameter from another place
  
};

window.addEventListener('load', Game.init);

// I dont know what this feature do in the game. 
// This is a copy from commons.js importPrettify function. Because my prettify files are in another
//   place, I need to overwrite this function.
Game.importPrettify = function() {
	  //<link rel="stylesheet" type="text/css" href="../prettify.css">
	  //<script type="text/javascript" src="../prettify.js"></script>
	  var link = document.createElement('link');
	  link.setAttribute('rel', 'stylesheet');
	  link.setAttribute('type', 'text/css');
	  link.setAttribute('href', 'prettify.css');
	  document.head.appendChild(link);
	  var script = document.createElement('script');
	  script.setAttribute('type', 'text/javascript');
	  script.setAttribute('src', 'prettify.js');
	  document.head.appendChild(script);
	};


/**
 * Reset the game to the start position, clear the display, and kill any
 * pending tasks.
 */
Game.reset = function() {
	
  hero.reset();
  CustomerManager.reset();

  Game.display();

  // Kill any task.
  // Kill all tasks.
  for (var x = 0; x < Game.pidList.length; x++) {
    window.clearTimeout(Game.pidList[x]);
  }
  Game.pidList = [];

};

/**
 * Just draw the states of objects. Other of this function happens the events that changes
 *     the states.
 */
Game.display = function() {

	CustomerManager.animation();

	Game.ctxDisplay.drawImage( Game.imgBackground, 0 , 0, 352, 448 );
	hero.draw(Game.ctxDisplay);
	CustomerManager.draw(Game.ctxDisplay);
	
};

Game.xmlButtonClick = function() {
	//var code = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
	var code = Blockly.JavaScript.workspaceToCode();
	alert(code);
};

/**
 * Click the run button.  Start the program.
 */
Game.runButtonClick = function() {
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  // TODO desabilitar o botao debug
  
  Blockly.mainWorkspace.traceOn(true);
  Game.execute(1);
};

/**
 * Click the reset button.  Reset the Game.
 */
Game.resetButtonClick = function() {
  Game.resetButtons();
  Game.reset();
};

/**
 * Click the debug button.  Start the program/go to next line.
 */
Game.debugButtonClick = function() {
	 
	// TODO mudar o status de alguma coisa para que quando clicar em Run continuará a execucao de onde parou
	Blockly.mainWorkspace.traceOn(true); 
	Game.execute(2);
};

Game.resetButtons = function() {
	document.getElementById('runButton').style.display = 'inline';
	document.getElementById('resetButton').style.display = 'none';
	Blockly.mainWorkspace.traceOn(false); 
	
	Game.runningStatus = 0;
};


/**
 * Execute the user's code.  Heaven help us...
 */
Game.execute = function(debug) {
	
  if (Game.runningStatus === 0) {
	  Game.runningStatus = debug;
	  
	  BlocklyApps.log = [];
	  BlocklyApps.ticks = 10000; // how many loops are acceptable before the system define it is in infinite loop ? 
	  // Reset the graphic.
	  Game.reset();

	  var code = Blockly.JavaScript.workspaceToCode();
	  try {
	    eval(code);
	  } catch (e) {
		  
		  if (e == Infinity) { 
			  Game.showError("Error_infinityLoopDetected");
		      Game.resetButtons();
		      return;
		  }
		  
	  }

	  // BlocklyApps.log now contains a transcript of all the user's actions.
	  Game.stepSpeed = 1000 * Math.pow(0.5, 3);
	  
  }
  
  Game.pidList.push( window.setTimeout(function() {Game.animate();}, 100) );

};

/**
 * Iterate through the recorded path and animate the actions.
 */
Game.animate = function() {
 
  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
	Game.resetButtons();
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  var command = tuple.shift();
  BlocklyApps.highlight(tuple.pop());
  // TODO por causa do debug temos que inserir um comando especial após cada comando. assim um clique do
  //                debug faz funcionar um conjunto de instrucoes
    
  
  if (Game.step(command, tuple)) {

	  // call the next animate when the animation of the last command has finished
	  if (Game.runningStatus === 1) 
		  Game.pidList.push( window.setTimeout(function() {Game.animate();}, Game.stepSpeed) );
   } else {

	  Game.resetButtons();
	  Blockly.mainWorkspace.highlightBlock(null);
	  
  }
};

/**
 * Execute one step in the solution. Returns amount of time consumed by this step
 * @param {string} command 
 * @param {!Array} values List of arguments for the command.
 */
Game.step = function(command, values) {
  switch (command) {
    case 'AL' :
    	hero.alertRun(values);
    	break;
    	
  	case 'IM' :
  		hero.changeSnackManImage(values);
  		break;
  
  	case 'MS' :
  		hero.changeSnackManPosition(values.shift(), values.shift(), values.shift(), values.shift());
  		break;
  		
  	case 'fail':
  		Game.showError(values);
  		return false;
  }
  
  return true;
};

Game.showError = function(iderror) {
	
	var content = document.getElementById('dialogError');
	var container = document.getElementById('dialogErrorText');
	container.textContent = BlocklyApps.getMsg(iderror);
	
    var style = {top: '120px'}; // };//{width: '370px', 
	style[Blockly.RTL ? 'right' : 'left'] = '215px';
	var origin = Blockly.mainWorkspace.topBlocks_[Blockly.mainWorkspace.topBlocks_.length-1].getSvgRoot();
	
	BlocklyApps.showDialog(content, origin, true, true, style, null);

};