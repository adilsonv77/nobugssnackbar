String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};


// Based on Professional JavaScript for Web Developers (Nicholas C. Zakas)
// Parasitic Combination Inheritance
var inherits = function(parent, inherited){
    // makes a copy of the parent prototype
    var parentCopy = Object.create(parent.prototype);
 
    // inherits from the parent
    inherited.prototype = parentCopy; 
 
    // fixs the inherited constructor
    inherited.prototype.constructor = inherited;
};

