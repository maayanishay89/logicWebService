
var Matcher = require("./matcher"); 


function addFormula(formula,callback){ 
  	Matcher.addFormula(formula, function(result) {
		callback(result);
	});
};


exports.addFormula = addFormula;
