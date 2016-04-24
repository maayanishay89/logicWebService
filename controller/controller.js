
var Matcher = require("../model/logic/matcher"); 

//var express = require('./model/configuration/expressConfig');



// function addFormula(formula,callback){ 
//   	Matcher.addFormula(formula, function(result) {
// 		callback(result);
// 	});
// };

function calculateMatching(req,res){ 
	var formula = JSON.stringify(req.body);
  	Matcher.calculateMatching(formula, function(result) {
		res.json(result);	
	});
};


// app.post('/addFormula',function(req,res){
	
	
// 	var formula = JSON.stringify(req.body);
// 	Controller.addFormula(formula,function(formula){
// 		res.json(formula);
// 	});
// });

exports.calculateMatching = calculateMatching;
