var express = require('./node_modules/express');
var url = require('url');
var app = express();
var bodyParser = require('./node_modules/body-parser');
var Controller = require('./controller');
//var matchingObjectController = require('./matchingObjectController');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser());

app.get('/',function (req,res){
	res.send("Welcome");
});




app.post('/addFormula',function(req,res){

	console.log("Im in addFormula post");
	var formula = JSON.stringify(req.body);

		Controller.addFormula(formula,function(formula){
		res.json(formula);
		});
});







var port = process.env.PORT || 8080;
app.use('/',express.static('./public')).listen(port);
console.log("listening on port " + port +"\n");

