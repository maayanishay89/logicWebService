
var Matcher = require("../model/logic/matcher"); 

function calculateMatching(req,res){ 
	var formula = JSON.stringify(req.body);
  	Matcher.calculateMatching(formula, function(result) {
		res.json(result);	
	});
};

exports.calculateMatching = calculateMatching;
