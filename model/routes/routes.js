var Controller = require('./../../controller/controller');


function fieldValidation(field) {

    if ((typeof field !== 'undefined' && field )) {
        return true;
    } else {
        return false;
    }
}

function sendErrorFieldValidation(res) {
    var error = {
        error: "the value of fields is incorrect or undefined"
    };
    res.json(error);
}

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send("Welcome");
    });

 app.post('/calculateMatching', Controller.calculateMatching);

};

// var express = require('express');
// var bodyParser = require('body-parser');
// var Controller = require('./controller');
// var validation = require('./validation');
// var utils = require('./utils');



// var app = express();

// app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.get('/',function (req,res){
// 	res.send("Welcome");
// });

// app.post('/addFormula',function(req,res){
	
// 	console.log("in addFormula");

// 	if (validation.addMatchingObject(req)) {
// 		var formula = JSON.stringify(req.body);
// 		Controller.addFormula(formula,function(formula){
// 			res.json(formula);
// 		});
// 	} else {
//         utils.sendErrorValidation(res);
//     }

// });


// var port = process.env.PORT || 8005;
// app.use('/',express.static('./public')).listen(port);
// console.log("listening on port " + port +"\n");

