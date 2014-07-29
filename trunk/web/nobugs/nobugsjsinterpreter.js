NoBugsInterpreter.prototype = new Interpreter;
NoBugsInterpreter.prototype.constructor = NoBugsInterpreter;
NoBugsInterpreter.prototype.parent = Interpreter.prototype;

function NoBugsInterpreter(code, opt_initFunc) {
	this.creatingScope = false;
	this.variables = [];

	this.base = Interpreter;
	this.base(code, opt_initFunc);

};

NoBugsInterpreter.prototype.populateScope_ = function(node, scope) {
	this.creatingScope = true;
	this.parent.populateScope_.call(this, node, scope);
	this.creatingScope = false;
};

NoBugsInterpreter.prototype.setProperty = function(obj, name, value,
        opt_fixed, opt_nonenum) {
	
	this.parent.setProperty.call(this, obj, name, value,
            opt_fixed, opt_nonenum);
	
	if (this.creatingScope) {
		this.scope = obj;
		this.variables.push({"scope":obj, "name":name});
	}
};
