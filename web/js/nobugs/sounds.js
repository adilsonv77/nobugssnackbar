/**
 * NoBug's Snack Bar
 *
 * Copyright 2015 Adilson Vahldick.
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
 * Sounds of the game.
 * 
 * @fileoverview Sound API for the game.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */

'use strict';

/**
 * "Daily Beetle" Kevin MacLeod (incompetech.com) 
 * Licensed under Creative Commons: By Attribution 3.0
 * http://creativecommons.org/licenses/by/3.0/
 */

/**
 * "Carefree" Kevin MacLeod (incompetech.com) 
 * Licensed under Creative Commons: By Attribution 3.0
 * http://creativecommons.org/licenses/by/3.0/
 */

/**
 * "Wallpaper" Kevin MacLeod (incompetech.com) 
 * Licensed under Creative Commons: By Attribution 3.0
 * http://creativecommons.org/licenses/by/3.0/
 */

/**
 * "Your Call" Kevin MacLeod (incompetech.com) 
 * Licensed under Creative Commons: By Attribution 3.0
 * http://creativecommons.org/licenses/by/3.0/
 */

var noBugsAudio = document.createElement("audio");

var PlayAudio = function(filenames, autoplay) {
	
	this.files = filenames;
	this.index = 0;

	noBugsAudio.autoplay = autoplay;
	noBugsAudio.pause();
	this.playing = autoplay;
	
	noBugsAudio.addEventListener('ended', this.playNext);

};

PlayAudio.prototype.playNext = function() {
	if(this.index == this.files.length)
		this.index = 0;

	noBugsAudio.src = this.files[this.index];
	this.index += 1;
};

PlayAudio.prototype.play = function() {
	if (!this.playing)
	  this.playNext();
	noBugsAudio.play();
};

PlayAudio.prototype.stop = function() {
	noBugsAudio.pause();
};

PlayAudio.prototype.clear = function() {
	noBugsAudio.removeEventListener('ended', this.playNext);
};




