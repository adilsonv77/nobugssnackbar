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
    [ 'en' ];
BlocklyApps.LANG = BlocklyApps.getLang();
//Game.student = BlocklyApps.getStringParamFromUrl('student', null);

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

/**
 * Create a namespace for the application.
 */
var Game = {};

var hero = new SnackMan();
Game.mission = 0;


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

  var rtl = BlocklyApps.isRtl(); // Right-To-Left language. I keep this, but it's not our initial intention
    
  var onresize = function(e) {
	var blocklyDiv = document.getElementById('blockly'); // the Block Graphics edition area
	var visualization = document.getElementById('visualization'); // the animation area
	var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '380px';
    blocklyDiv.style.width = (window.innerWidth - 400) + 'px';
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

  var defaultXml =
	  /*
      '<xml>' +
      '  <block type="controls_for" x="70" y="70">'+
      '    <value name="FROM">'+
      '      <block type="math_number">' +
      '        <field name="NUM">1</field>' +
      '      </block>' +
      '    </value>' +
      '    <value name="TO">'+
      '      <block type="math_number">' +
      '        <field name="NUM">3</field>' +
      '      </block>' +
      '    </value>' +
      '    <value name="BY">'+
      '      <block type="math_number">' +
      '        <field name="NUM">1</field>' +
      '      </block>' +
      '    </value>' +
      '    <statement name="DO">' +
		  '  <block type="move_goToCustomer">' +
		  '    <value name="VALUE">' +
		  '      <block type="variables_get">' +
		  '        <field name="VAR">i</field>' +
		  '      </block>' +
		  '    </value>' +
		  '    <next>'+
			  '  <block type="move_goToDisplay">' +
			  '  </block>' +
		  '   </next>' +
		  '  </block>' +

      '    </statement>' + 
      '  </block>' +
      '</xml>';
      */
  '<xml>' +
  '  <block type="move_goToDisplay">' +
  '  </block>' +
  '</xml>';

  BlocklyApps.loadBlocks(defaultXml);

  BlocklyApps.bindClick('runButton', Game.runButtonClick);
  BlocklyApps.bindClick('resetButton', Game.resetButtonClick);

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
	
	Game.ctxDisplay.drawImage( Game.imgBackground, 0 , 0, 352, 448 );
	hero.draw(Game.ctxDisplay);
	CustomerManager.draw(Game.ctxDisplay);
	
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
  Blockly.mainWorkspace.traceOn(true); // I dont know what this do. Probably shows the current line
  Game.execute();
};

/**
 * Click the reset button.  Reset the Game.
 */
Game.resetButtonClick = function() {
  Game.resetButtons();
  Game.reset();
};

Game.resetButtons = function() {
	document.getElementById('runButton').style.display = 'inline';
	document.getElementById('resetButton').style.display = 'none';
	Blockly.mainWorkspace.traceOn(false); // I dont know what this do
};


/**
 * Execute the user's code.  Heaven help us...
 */
Game.execute = function() {
  BlocklyApps.log = [];
  BlocklyApps.ticks = 1000000;

  var code = Blockly.JavaScript.workspaceToCode();
  try {
    eval(code);
  } catch (e) {
    // Null is thrown for infinite loop.
    // Otherwise, abnormal termination is a user error.
    if (e !== Infinity) {
      alert(e);
      Game.resetButtons();
      return;
    }
  }

  // BlocklyApps.log now contains a transcript of all the user's actions.
  // Reset the graphic and animate the transcript.
  Game.reset();
  Game.pidList.push( window.setTimeout(function() {Game.animate();}, 100) );
};

/**
 * Iterate through the recorded path and animate the actions.
 */
Game.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
//  Game.pid = 0;

  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
	Game.resetButtons();
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  var command = tuple.shift();
  BlocklyApps.highlight(tuple.pop());
  
  Game.stepSpeed = 1000 * Math.pow(0.5, 3);
  
  var t = Game.step(command, tuple) + 1;

  // call the next animate when the animation of the last command has finished
  Game.pidList.push( window.setTimeout(function() {Game.animate();}, Game.stepSpeed*t) );
};

/**
 * Execute one step in the solution. Returns amount of time consumed by this step
 * @param {string} command 
 * @param {!Array} values List of arguments for the command.
 */
Game.step = function(command, values) {
  switch (command) {
  case 'GTC' :
	  return hero.animateGoToConsumer(values);
  case 'GTD':
	  return hero.animateGoToDisplay();
  case 'GTCO':
	  return hero.animateGoToCooler();
  }
};

