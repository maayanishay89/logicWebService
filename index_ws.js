var express = require('express');
var bodyParser = require('body-parser');
var Controller = require('./controller');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function (req,res){
	res.send("Welcome");
});

app.post('/addFormula',function(req,res){
	
	
	var formula = JSON.stringify(req.body);
	Controller.addFormula(formula,function(formula){
		res.json(formula);
	});
});

var port = process.env.PORT || 8005;
app.use('/',express.static('./public')).listen(port);
console.log("listening on port " + port +"\n");

