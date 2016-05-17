var utils = require("./../model/utils/utils");
var validation = require("./../model/utils/validation");
var Matcher = require("../model/logic/matcher"); 

function calculateMatching(req,res){ 

   if (validation.addMatchingObject(req)) {
		var formula = JSON.stringify(req.body);
	  	Matcher.calculateMatching(formula, function(result) {
            res.json(result);
        });
    } else {
    	    	console.log("im in else");
        utils.sendErrorValidation(res);
    }

};

exports.calculateMatching = calculateMatching;


