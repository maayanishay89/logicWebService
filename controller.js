
var Matcher = require("./matcher"); 


function addFormula(formula,callback){ 
	//console.log("im in Controllerrrr");
  	Matcher.addFormula(formula, function(result) {
		callback(result);
	});
};


exports.addFormula = addFormula;



