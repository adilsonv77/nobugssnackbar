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
 * "bensound-buddy" Royalty Free Music from Bensound
 * Licensed under Creative Commons License
 * http://www.bensound.com
 */

/**
 * "bensound-cute" Royalty Free Music from Bensound
 * Licensed under Creative Commons License
 * http://www.bensound.com
 */

/**
 * "bensound-energy" Royalty Free Music from Bensound
 * Licensed under Creative Commons License
 * http://www.bensound.com
 */

/**
 * "savage-law" Music by Di Evantile
 * Royalty free
 * http://www.dievantile.com
 */


var noBugsAudio = document.createElement("audio");

var PlayAudio = function(filenames, autoplay) {
	
	this.files = filenames;
	this.index = 0;

	noBugsAudio.autoplay = autoplay;
	try {
		noBugsAudio.pause();	
	} catch (ex) {}
	
	this.playing = autoplay;
	
};

PlayAudio.prototype.playNext = function() {
	if (!window['Audio']) // browser don't support audio
		return; 
	
	
	if(this.index == this.files.length)
		this.index = 0;

	noBugsAudio.src = this.files[this.index];
	this.index += 1;
	noBugsAudio.play();
};

PlayAudio.prototype.shuffle = function() {
	
    for (var i = this.files.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.files[i];
        this.files[i] = this.files[j];
        this.files[j] = temp;
    }
};

PlayAudio.prototype.play = function() {
	if (!window['Audio']) // browser don't support audio
		return; 

	noBugsAudio.addEventListener('ended', this.playNext.bind(this));

	if (!this.playing) 
	  this.playNext();
	noBugsAudio.play();
};

PlayAudio.prototype.stop = function() {
	this.clear();
	try {
		noBugsAudio.pause();
	} catch (ex) {
		
	}
	
};

PlayAudio.prototype.clear = function() {
	noBugsAudio.removeEventListener('ended', this.playNext);
};




