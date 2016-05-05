var express = require('./model/configuration/expressConfig');


var app = express();

var port = process.env.PORT || 8000;
app.listen(port);
console.log("listening on port " + port + "\n");
