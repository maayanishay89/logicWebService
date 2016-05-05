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