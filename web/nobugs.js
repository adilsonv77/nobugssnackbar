/**
 * Meteoric Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://meteoricsnackbar.googlecode.com/
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
 * @fileoverview JavaScript for Meteoric Snack Bar application.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Meteoric = {};

/**
 * The hero.
 */
var SnackMan = {};
SnackMan.X = 280;
SnackMan.Y = 320;


var Cust1 = {};
Cust1.X = 100;
Cust1.Y = 320;

var Cust2 = {};
Cust2.X = 100;
Cust2.Y = 360;

// Supported languages.
BlocklyApps.LANGUAGES =
    [ 'en' ];
BlocklyApps.LANG = BlocklyApps.getLang();
Meteoric.student = BlocklyApps.getStringParamFromUrl('student', null);
Meteoric.level;

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');


/**
 * PID of animation task currently executing.
 */
Meteoric.pid = 0;

/**
 * Should the turtle be drawn?
 */
Meteoric.visible = true;

Meteoric.lastErrorData;

/**
 * Initialize Blockly and the turtle.  Called on page load.
 */
Meteoric.init = function() {
  BlocklyApps.init();

  var rtl = BlocklyApps.isRtl();
  var blocklyDiv = document.getElementById('blockly');
  var visualization = document.getElementById('visualization');
  var onresize = function(e) {
    var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '420px';
    blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
  };
  window.addEventListener('scroll', function() {
      onresize();
      Blockly.fireUiEvent(window, 'resize');
    });
  window.addEventListener('resize', onresize);
  onresize();

  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blockly'),
      {path: '',
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});

  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout(%1);\n';

  // Add to reserved word list: API, local variables in execution evironment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Meteoric,code');

  window.addEventListener('beforeunload', function(e) {
    if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
      e.returnValue = BlocklyApps.getMsg('Turtle_unloadWarning');  // Gecko.
      return BlocklyApps.getMsg('Turtle_unloadWarning');  // Webkit.
    }
    return null;
  });

  // Hide download button if browser lacks support
  // (http://caniuse.com/#feat=download).
  if (!(goog.userAgent.GECKO ||
       (goog.userAgent.WEBKIT && !goog.userAgent.SAFARI))) {
    document.getElementById('captureButton').className = 'disabled';
  } else {
    BlocklyApps.bindClick('captureButton', Meteoric.createImageLink);
  }

  // Initialize the slider.
  var sliderSvg = document.getElementById('slider');
  //Meteoric.speedSlider = new Slider(10, 35, 130, sliderSvg);

  var defaultXml =
      '<xml>' +
      /*
      '  <block type="move_gotoConsumer" x="70" y="70">' +
      '    <value name="VALUE">' +
      '      <block type="math_number">' +
      '        <field name="NUM">1</field>' +
      '      </block>' +
      '    </value>' +
      '  </block>' +*/
      '</xml>';
  BlocklyApps.loadBlocks(defaultXml);

  BlocklyApps.bindClick('runButton', Meteoric.runButtonClick);
  BlocklyApps.bindClick('resetButton', Meteoric.resetButtonClick);

  Meteoric.ctxDisplay = document.getElementById('display').getContext('2d');
  
  Cust1.img = new Image();
  Cust1.img.src = '$customer01.png';

  Cust2.img = new Image();
  Cust2.img.src = '$customer02.png';

  SnackMan.img = new Image();
  SnackMan.img.src = 'snackman.png';
  
  Meteoric.imgBackground = new Image();
  Meteoric.imgBackground.onload = function() {
	  Meteoric.reset();

	  // Lazy-load the syntax-highlighting.
	  window.setTimeout(BlocklyApps.importPrettify, 1);
        //  Blockly.addChangeListener(function() {Meteoric.changed();});
	
  };
  
  Meteoric.lastErrorData = new Object();
  Meteoric.lastErrorData.count = 0;
  Meteoric.lastErrorData.comm = 0;
  
  var loginLoaded = function(data) {
      
      Meteoric.level = data;
      Meteoric.imgBackground.src = 'fundo.png';	  
  
  };
  
  // esse faz como um trabalho da disciplina de TAMC. 
  // Posso seguir a mesma ideia do momento de login e carregamento:
  //     AgStudent.login(Meteoric.student, loginLoaded);
  
  
  
};

window.addEventListener('load', Meteoric.init);

Meteoric.lastComandSize = 0;

Meteoric.changed = function() {
    var w = Blockly.mainWorkspace;
    
    if (w.topBlocks_.length === Meteoric.lastComandSize)
        return;
    
    Meteoric.lastComandSize = w.topBlocks_.length;
    var comms = new Array(w.topBlocks_.length);
    for (var i = 0; i < w.topBlocks_.length; i++) {
        comms[i] = w.topBlocks_[i].type;
    }
    
    var f = function(r) { 
        if (r === "ok") {
            BlocklyApps.hideDialog(false);
            return;   
        }
        
        var div = document.getElementById('iframeOneTopBlock');

        div.innerHTML = r;
        var content = document.getElementById('dialogHelp');
        var style = {width: '370px', top: '120px'};
        style[Blockly.RTL ? 'right' : 'left'] = '215px';
        var origin = Blockly.mainWorkspace.topBlocks_[Blockly.mainWorkspace.topBlocks_.length-1].getSvgRoot();;

        BlocklyApps.showDialog(content, origin, true, false, style, null);
        
    };
    
   // AgTeacher.evaluate(comms, Meteoric.student, f);
};

/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
Meteoric.reset = function() {
  // Starting location of the snackman
  SnackMan.x = SnackMan.X;
  SnackMan.y = SnackMan.Y;

  Cust1.x = Cust1.X;
  Cust1.y = Cust1.Y;

  Cust2.x = Cust2.X;
  Cust2.y = Cust2.Y;

  Meteoric.heading = 0;
  Meteoric.penDownValue = true;
  Meteoric.visible = true;

  Meteoric.display();

  // Kill any task.
  if (Meteoric.pid) {
    window.clearTimeout(Meteoric.pid);
  }
  Meteoric.pid = 0;
};

Meteoric.display = function() {
	
	var level = Meteoric.level;

	Meteoric.ctxDisplay.drawImage( Meteoric.imgBackground, 0 , 0, 367, 415 );
	Meteoric.ctxDisplay.drawImage( SnackMan.img, SnackMan.x, SnackMan.y );

	//Meteoric.ctxDisplay.drawImage( Cust1.img, Cust1.x, Cust1.y, 32, 32 );
	Meteoric.ctxDisplay.drawImage( Cust1.img, 32, 64, 32, 32, Cust1.x, Cust1.y, 32, 32 );
	
	if (level === "ex2") {
		
		Meteoric.ctxDisplay.drawImage( Cust2.img, 32, 64, 32, 32, Cust2.x, Cust2.y, 32, 32 );
	}
	
};

/**
 * Click the run button.  Start the program.
 */
Meteoric.runButtonClick = function() {
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
//  document.getElementById('spinner').style.visibility = 'visible';
  Blockly.mainWorkspace.traceOn(true);
  Meteoric.execute();
};

/**
 * Click the reset button.  Reset the Meteoric.
 */
Meteoric.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
//  document.getElementById('spinner').style.visibility = 'hidden';
  Blockly.mainWorkspace.traceOn(false);
  Meteoric.reset();
};


/**
 * Execute the user's code.  Heaven help us...
 */
Meteoric.execute = function() {
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
    }
  }

  // BlocklyApps.log now contains a transcript of all the user's actions.
  // Reset the graphic and animate the transcript.
  Meteoric.reset();
  Meteoric.pid = window.setTimeout(Meteoric.animate, 100);
};

/**
 * Iterate through the recorded path and animate the turtle's actions.
 */
Meteoric.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Meteoric.pid = 0;

  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  var command = tuple.shift();
  BlocklyApps.highlight(tuple.pop());
  
  Meteoric.step(command, tuple);

  var stepSpeed = 1000 * Math.pow(0.5, 2);
  Meteoric.pid = window.setTimeout(Meteoric.animate, stepSpeed);
};

/**
 * Execute one step.
 * @param {string} command Logo-style command (e.g. 'FD' or 'RT').
 * @param {!Array} values List of arguments for the command.
 */
Meteoric.step = function(command, values) {
  switch (command) {
  case 'GTC' :
	  SnackMan.animateGoToConsumer(values);
	  break;
  }
};

/**
 * Save an image of the SVG canvas.
 */
Meteoric.createImageLink = function() {
  var imgLink = document.getElementById('downloadImageLink');
  imgLink.setAttribute('href',
      document.getElementById('display').toDataURL('image/png'));
  var temp = window.onbeforeunload;
  window.onbeforeunload = null;
  imgLink.click();
  window.onbeforeunload = temp;
};

// Meteoric API.

SnackMan.goToConsumer = function(consumer, id) {
  BlocklyApps.log.push(['GTC', consumer, id]);
};

SnackMan.moveOneStep = function(id) {
  BlocklyApps.log.push(['GTC', id]);
};


SnackMan.animateGoToConsumer = function(values) {
	//TODO precisa existir um grafo com os caminhos, e ele busca o caminho mais curto e cria a rota
	
	if (SnackMan.x > 200) {
		SnackMan.x = SnackMan.x - 10; 
		Meteoric.display();
		//Meteoric.pid = window.setTimeout(SnackMan.animateGoToConsumer, Meteoric.stepSpeed);
	}
	
};
