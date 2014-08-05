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
 * @fileoverview Game management for NoBugs Snack Bar application.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

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
Game.jsInterpreter;

/**
 * Initialize Blockly and SnackBar. Called on page load.
 */
Game.init = function() {
  BlocklyApps.init();

  Blockly.Msg.CONTROLS_IF_MSG_THEN = "then"; // changing "do" to "then"
  // TODO how can I generalize this change ? 
  
  NoBugsJavaScript.redirect();
  
  var rtl = BlocklyApps.isRtl(); // Right-To-Left language. I keep this, but it's not our initial intention
    
  Game.optResize = {
	blocklyDivW: 600,
	blocklyDivH: "90%",
	varBoxT: true,
	varBoxH: "90%"
  };
  
  window.addEventListener('scroll', function() {
      Game.doResizeWindow();
    });
  window.addEventListener('resize',  Game.resizeWindow);
  
  var toolbox = document.getElementById('toolbox'); // xml definition of the available commands
  Blockly.inject(document.getElementById('blockly'),
      {path: '',
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});

  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'highlightBlock(%1);\n';

  // Add to reserved word list: API, local variables in execution environment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Game, code');

  /* enabled this in future
  window.addEventListener('beforeunload', function(e) {
    if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
      e.returnValue = BlocklyApps.getMsg('NoBugs_unloadWarning');  // Gecko.
      return BlocklyApps.getMsg('NoBugs_unloadWarning');  // Webkit.
    }
    return null;
  });
 */
  
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
	  defaultXml =/*
'    <xml xmlns="http://www.w3.org/1999/xhtml">' +
'	  <block type="controls_for" inline="true" x="116">' +
'	    <field name="VAR">i</field>' +
'	    <value name="FROM">' +
'	      <block type="math_number">' +
'	        <field name="NUM">1</field>' +
'	      </block>' +
'	    </value>' +
'	    <value name="TO">' +
'	      <block type="math_number" >' +
'	        <field name="NUM">2</field>' +
'	      </block>' +
'	    </value>' +
'	    <value name="BY">' +
'	      <block type="math_number" >' +
'	        <field name="NUM">1</field>' +
'	      </block>' +
'	    </value>' +
'       <statement name="DO">' +
'  <block type="move_goToCustomer">' +
'    <value name="VALUE">' +
'      <block type="variables_get" id="52">' +
'                <field name="VAR">i</field>' +
 '             </block>' +
'    </value>' +
'    <next>'+
	  '  <block type="move_goToDisplay">' +
	  '  </block>' +
'   </next>' +
'  </block>' +
'       </statement>' +
'	  </block>' +
'	</xml>';*/
		  
	  '<xml>' +
	  '  <block type="move_goToCustomer">' +
	  '    <value name="VALUE">' +
	  '      <block type="math_number">' +
	  '        <field name="NUM">1</field>' +
	  '      </block>' +
	  '    </value>' +
	  '    <next>'+
			  '<block type="controls_whileUntil" id="17" inline="false" x="111" y="58">'+
			  '  <field name="MODE">WHILE</field>'+
			  '  <value name="BOOL">'+
			  '    <block type="logic_negate" id="25" inline="false">'+
			  '      <value name="BOOL">' +
					  '  <block type="ask_isThereACustomer">' +
					  '  </block>' +
			  '      </value>'+
			  '    </block>'+
			  '  </value>'+
			  '  <next>'+
			  '     <block type="variables_set" inline="true">' +
			  '        <field name="VAR">drink</field>' +
			  '            <value name="VALUE">' +
						  '  <block type="ask_askForDrink">' +
						  '  </block>' +
			  '            </value>' +
			  '         <next>'+
					    '  <block type="move_goToCooler">' +
					    '  </block>' +
  			        '   </next>' +
			  '     </block>' +
		     '   </next>' +
			  '</block>'+
	  '   </next>' +
	  '  </block>' +
	  '</xml>';
	  
  }
  


  BlocklyApps.loadBlocks(defaultXml);

  BlocklyApps.bindClick('runButton', Game.runButtonClick);
  BlocklyApps.bindClick('resetButton', Game.resetButtonClick);
  BlocklyApps.bindClick('debugButton', Game.debugButtonClick);
  //BlocklyApps.bindClick('xmlButton', Game.xmlButtonClick);

  BlocklyApps.bindClick('moveDown', Game.moveDownButtonClick);
  BlocklyApps.bindClick('moveRight', Game.moveRightButtonClick);
  
  Game.variableBox = document.getElementById('variableBox');
  Game.blockly = document.getElementById('blockly');
  
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

Game.doResizeWindow = function(style) {
	if (style != undefined) {
	  Game.variableBox.style.display = style;
	}
	Game.resizeWindow(null);
    Blockly.fireUiEvent(window, 'resize');
};

Game.resizeWindow = function(e) {
	
	var rtl = BlocklyApps.isRtl();
	
	var visualization = document.getElementById('visualization'); // the animation area
	var top = visualization.offsetTop;

	Game.blockly.style.top = Math.max(10, top - window.pageYOffset) + 'px';
	Game.blockly.style.left = rtl ? '10px' : '380px';
    var w = window.innerWidth;
    if (Game.variableBox.style.display === "none") {
    	Game.blockly.style.height = "90%";
        w -= 400;
    	
    } else {
    	Game.blockly.style.height = Game.optResize.blocklyDivH;
        w -= Game.optResize.blocklyDivW;
    	
        Game.variableBox.style.top = (Game.optResize.varBoxT?Game.blockly.style.top:(Game.blockly.offsetTop+Game.blockly.offsetHeight+10)+"px");
        if (Game.optResize.varBoxT) {
        	Game.variableBox.style.left = ((rtl ? 10 : 380) + w + 5) + 'px';
        	Game.variableBox.style.width = "200px";
        }
        else {
        	Game.variableBox.style.left = Game.blockly.style.left;
        	Game.variableBox.style.width =  Game.blockly.style.width;
        }
        Game.variableBox.style.height = Game.optResize.varBoxH;
        
    }
    Game.blockly.style.width = (w) + 'px';

  };


Game.moveDownButtonClick = function() {
	document.getElementById("moveDown").style.display = 'none';
	document.getElementById("moveRight").style.display = 'inline-block';
	
	  Game.optResize = {
		blocklyDivW: 400,
		blocklyDivH: "70%",
		varBoxT: false,
		varBoxH: "20%"
	  };
			  
     Game.doResizeWindow();
};

Game.moveRightButtonClick = function() {
      document.getElementById("moveRight").style.display = 'none';
	  document.getElementById("moveDown").style.display = 'inline-block';
	
	  Game.optResize = {
				blocklyDivW: 600,
				blocklyDivH: "90%",
				varBoxT: true,
				varBoxH: "90%"
			  };
			  
	  Game.doResizeWindow();
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

  Game.disableButton("runButton");
  Game.enableButton("resetButton");
  Game.disableButton("debugButton");
  
  Game.doResizeWindow("none");
    
  Blockly.mainWorkspace.traceOn(true);
  Game.execute(1);
};

/**
 * Click the reset button.  Reset the Game.
 */
Game.resetButtonClick = function() {

  Game.resetButtons();
  Game.reset();
  
  Game.doResizeWindow("none");
  
};

Game.enableButton = function(buttonName) {
   var button = document.getElementById(buttonName);
   button.disabled = "";
   button.className = "primary";
};

Game.disableButton = function(buttonName) {
   var button = document.getElementById(buttonName);
   button.disabled = "disabled";
   button.className = "notEnabled";
};

/**
 * Click the debug button.  Start the program/go to next line.
 */
Game.debugButtonClick = function() {
	 
	if (Game.variableBox.style.display != "inline") {
		Game.enableButton('resetButton');

		Game.doResizeWindow("inline");
	    
		$('#vars').datagrid('resize');
		
		Blockly.mainWorkspace.traceOn(true);
	}
	
	Game.execute(2);
};

Game.resetButtons = function() {
	
	Game.disableButton('resetButton');
	Game.enableButton('debugButton');
	Game.enableButton('runButton');
	
	Blockly.mainWorkspace.traceOn(false); 
	
	Game.runningStatus = 0;
};


/**
 * Execute the user's code.  Heaven help us...
 */
Game.execute = function(debug) {
	
  if (Game.runningStatus === 0) {
	  
	  BlocklyApps.log = [];
	  BlocklyApps.ticks = 10000; // how many loops are acceptable before the system define it is in infinite loop ? 
	  // Reset the graphic.
	  Game.reset();

	  var code = Blockly.JavaScript.workspaceToCode();
	  
	  try {
	    Game.jsInterpreter = new NoBugsInterpreter(code, Game.initApi);

		// BlocklyApps.log now contains a transcript of all the user's actions.
        Game.stepSpeed = 1000 * Math.pow(0.5, 3);
	    
	  } catch (e) {
		  
		  if (e == Infinity) { 
			  Game.showError("Error_infinityLoopDetected");
		      Game.resetButtons();
		      return;
		  }
		  
	  }
	  
  }

  Game.runningStatus = debug;
  Game.pidList.push( window.setTimeout(function(){Game.nextStep();},2 )); // nothing in callstack
  
};

Game.updateVariables = function() {
	
	var totalrows = Game.jsInterpreter.variables.length;
	var rows = [];
	
	Game.jsInterpreter.variables.forEach(function(entry) {
		var data = entry.scope.properties[entry.name].data;
		if (data != undefined) {
			if (data.type != undefined) {
				data = "<p>" + data.qt + " X <img style='vertical-align: middle;' src='images/"+ data.type + ".png'/></p>";
			}
				
			rows.push({"name":entry.name, "value": data});
		}
	});
	
	$('#vars').datagrid('loadData', {
		"total": totalrows, "rows": rows
	});
};

Game.nextStep = function() {
	
	while (true) {
		if (Game.jsInterpreter.step()) {
			
			if (BlocklyApps.log.length > 0 || Game.highlightPause) {
				
				if (Game.runningStatus != 2 || Game.highlightPause === false)
					BlocklyApps.log.push(['nextStep']);
				else 
					Game.highlightPause = false;
				
				Game.pidList.push( window.setTimeout(function(){Game.animate();},10) ); // nothing in callstack 
				return;
			}
			
		} else {
			
			// if there isn't more lines to evaluate
			Game.resetButtons();
		    Blockly.mainWorkspace.highlightBlock(null);
		    return;
			
		}
	}
};

Game.initApi = function(interpreter, scope) {
    var wrapper = function(id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(Game.highlightBlock(id));
      };
    
    interpreter.setProperty(scope, 'highlightBlock',
          interpreter.createNativeFunction(wrapper));

    // Move commands
	wrapper = function(n) {
      return interpreter.createPrimitive(hero.goToBarCounter(n));
    };
    
    interpreter.setProperty(scope, 'goToBarCounter',
        interpreter.createNativeFunction(wrapper));

	wrapper = function() {
	      return interpreter.createPrimitive(hero.goToDisplay());
	    };
	    
    interpreter.setProperty(scope, 'goToDisplay',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
	      return interpreter.createPrimitive(hero.goToCooler());
	    };
	    
    interpreter.setProperty(scope, 'goToCooler',
      interpreter.createNativeFunction(wrapper));
    
    wrapper = function() {
	      return interpreter.createPrimitive(hero.isThereACustomer());
	    };
	    
    interpreter.setProperty(scope, 'isThereACustomer',
      interpreter.createNativeFunction(wrapper));
    
    wrapper = function() {
	      return interpreter.createPrimitive(hero.askForDrink());
	    };
	    
    interpreter.setProperty(scope, 'askForDrink',
      interpreter.createNativeFunction(wrapper));
    
    wrapper = function(o) {
	      return interpreter.createPrimitive(hero.catchDrink(o));
	    };
	    
    interpreter.setProperty(scope, 'catchDrink',
	  interpreter.createNativeFunction(wrapper));

};

Game.highlightPause = false;

Game.highlightBlock = function(id) {
	
	BlocklyApps.log.push(['IM', 0]);
	CustomerManager.update();
	
    Blockly.mainWorkspace.highlightBlock(id);
	if (Game.runningStatus === 2) { // if runs, doesnt need to update the variables
		Game.updateVariables();	
	}
    Game.highlightPause = true;
};

/**
 * Iterate through the recorded path and animate the actions.
 */
Game.animate = function() {
 
  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
	
    return;
  }
  var command = tuple.shift();
  
  if (command === "nextStep") {
	  Game.pidList.push( window.setTimeout(Game.nextStep, 1) );
	  return;
  }
  
  if (Game.step(command, tuple)) {

	  // call the next animate when the animation of the last command has finished
	  //if (Game.runningStatus === 1) 
	  Game.pidList.push( window.setTimeout(function() {Game.animate();}, Game.stepSpeed) );
   } else {
	   // TODO
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
  		
  	case 'OC' :
  		hero.nextOpenCoolerImage();
  		break;
  		
  	case 'CC' :
  		hero.nextCloseCoolerImage();
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