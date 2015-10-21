'use strict';

NoBugsInterpreter.prototype = new Interpreter;
NoBugsInterpreter.prototype.constructor = NoBugsInterpreter;
NoBugsInterpreter.prototype.parent = Interpreter.prototype;

function NoBugsInterpreter(code, opt_initFunc) {
	this.creatingScope = 0;
	this.variables = [];
	this.prepareAddArguments = false;

	this.base = Interpreter;
	this.base(code, opt_initFunc);

};

NoBugsInterpreter.prototype.populateScope_ = function(node, scope) {
	this.creatingScope++;
	this.parent.populateScope_.call(this, node, scope);
	this.creatingScope--;
};

NoBugsInterpreter.prototype.setProperty = function(obj, name, value,
        opt_fixed, opt_nonenum) {
	
	this.parent.setProperty.call(this, obj, name, value,
            opt_fixed, opt_nonenum);
	
	if (this.creatingScope > 0 || this.stateStack[0].func_) {
		if (name !== "prototype" && name !== "length" && value.type !== "function") {
			if (this.stateStack[0].func_ && ((name.data !== undefined && name.type !== "string") || name === "arguments" ))
				return;
			
			this.variables.push({"scope":obj, "name":(name.data?name.data:name)});
			
		}
	}
};
