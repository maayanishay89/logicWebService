var utils = require("./../model/utils/utils");
var validation = require("./../model/utils/validation");
var Matcher = require("../model/logic/matcher"); 

// function calculateMatching(req,res){ 

//    if (validation.addMatchingObject(req)) {
//    //	console.log("im in if");
// 		var formula = JSON.stringify(req.body);
// 	  	Matcher.calculateMatching(formula, function(result) {
//             res.status(formula).json(result);
//         });
//     } else {
//     	    	console.log("im in else");
//         utils.sendErrorValidation(res);
//     }

// };

function calculateMatching(req,res){ 
    //console.log("im innn");
    var formula = JSON.stringify(req.body);
    Matcher.calculateMatching(formula, function(result) {
        res.json(result);   
    });
};

exports.calculateMatching = calculateMatching;


