var Controller = require('./../../controller/controller');



module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send("Welcome");
    });

 app.post('/calculateMatching', Controller.calculateMatching);

};