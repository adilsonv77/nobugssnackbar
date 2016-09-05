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
 *.
 * @fileoverview Initialization for NoBugs Snack Bar application.
 * @author adilsonv77@gmail.com (Adilson Vahldick)
 */
'use strict';

BlocklyApps.version = 20160905;
	
// Supported languages.
BlocklyApps.LANGUAGES =  [  'en', 'pt-pt', 'pt-br' ];
BlocklyApps.LANG = BlocklyApps.getLang();

var v = BlocklyApps.version; // Math.floor(Math.random() * 999999);
document.write('<script type="text/javascript" src="js/generated/' +
               BlocklyApps.LANG.toLowerCase() + '.js?v='+v+'"></script>\n');
