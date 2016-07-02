var distance = require("google-distance");
async = require("async");


function calculateMatching(calculateMatching, callback) {
    var obj = JSON.parse(calculateMatching);
    var match = [];
    var matcher_grade = {
        "total_grade": null,
        "formula": {
            "requirements": {
                "details": [],
                "grade": null
            },
            "candidate_type": null,
            "locations": null,
            "scope_of_position": null,
            "academy": null
        }
    }

    // requirements
    if (obj.job.formula.requirements != 0) {
        calculateRequirements(obj, function(result) {
            match.push(result.grade * (obj.job.formula.requirements / 100));
            matcher_grade.formula.requirements.grade = result.grade;

            for (i = 0; i < result.details.length; i++) {
                var detailsTmp = {
                    "name": result.details[i].name,
                    "grade": result.details[i].grade
                }
                matcher_grade.formula.requirements.details.push(detailsTmp);
            }
            if (match.length == 5) {
                caclulateFormula(match, function(total) {
                    matcher_grade.total_grade = total;
                    callback(matcher_grade);
                });
            }
        });
    } else {
        var i = 0;
        for (var j = 0; j < obj.job.requirements[i].combination.length; j++) {
            var detailsTmp = {
                "name": obj.job.requirements[i].combination[j].name,
                "grade": 0
            }
            matcher_grade.formula.requirements.details.push(detailsTmp);
        }
        matcher_grade.formula.requirements.grade = 0;
        match.push(0);
        if (match.length == 5) {
            caclulateFormula(match, function(total) {
                matcher_grade.total_grade = total;
                callback(matcher_grade);
            });
        }
    }


    // locations
    if (obj.job.formula.locations != 0) {
        caclulateDistance(obj, function(result) {
            //console.log("result: "+ result);
            var locations_result = calc(result);
            match.push(locations_result * (obj.job.formula.locations / 100));
            matcher_grade.formula.locations = locations_result;
            if (match.length == 5) {
                caclulateFormula(match, function(total) {
                    matcher_grade.total_grade = total;
                    callback(matcher_grade);
                });
            }
        });
    } else {
        matcher_grade.formula.locations = 0;
        match.push(0);
        if (match.length == 5) {
            caclulateFormula(match, function(total) {
                matcher_grade.total_grade = total;
                callback(matcher_grade);
            });
        }
    }


    // candidate_type
    if (obj.job.formula.candidate_type != 0) {
        caclulateCandidateType(obj, function(result) {
            var candidate_type_result = result;
            match.push(candidate_type_result * (obj.job.formula.candidate_type / 100));
            matcher_grade.formula.candidate_type = candidate_type_result;
            if (match.length == 5) {
                caclulateFormula(match, function(total) {
                    matcher_grade.total_grade = total;
                    callback(matcher_grade);
                });
            }
        });
    } else {
        matcher_grade.formula.candidate_type = 0;
        match.push(0);
        if (match.length == 5) {
            caclulateFormula(match, function(total) {
                matcher_grade.total_grade = total;
                callback(matcher_grade);
            });
        }
    }


    // scope_of_position
    if (obj.job.formula.scope_of_position != 0) {
        caclulateScopeOfPosition(obj, function(result) {
            var scope_of_position_result = result;
            match.push(scope_of_position_result * (obj.job.formula.scope_of_position / 100));
            matcher_grade.formula.scope_of_position = scope_of_position_result;
            if (match.length == 5) {
                caclulateFormula(match, function(total) {
                    matcher_grade.total_grade = total;
                    callback(matcher_grade);
                });
            }
        });
    } else {
        matcher_grade.formula.scope_of_position = 0;
        match.push(0);
        if (match.length == 5) {
            caclulateFormula(match, function(total) {
                matcher_grade.total_grade = total;
                callback(matcher_grade);
            });
        }
    }


    // academy
    if (obj.job.formula.academy != 0) {
        caclulateAcademy(obj, function(result) {
            var academy_result = result;
            match.push(academy_result * (obj.job.formula.academy / 100));
            matcher_grade.formula.academy = academy_result;
            if (match.length == 5) {
                caclulateFormula(match, function(total) {
                    matcher_grade.total_grade = total;
                    callback(matcher_grade);
                });
            }
        });
    } else {
        matcher_grade.formula.academy = 0;
        match.push(0);
        if (match.length == 5) {
            caclulateFormula(match, function(total) {
                matcher_grade.total_grade = total;
                callback(matcher_grade);
            });
        }
    }

};



////////////////////////////////////////////////////// ** requierments functions ** //////////////////////////////////////////////////////


function calculateRequirements(obj, callback) {

    //var employer=[];
    var total_combination = [];
    var combination = [];
    var grades_of_combinations = [];
    var sumTotalGrade = 0;

    // data from the job seeker
    var employee = obj.cv.requirements[0].combination;

    var the_biggest_result = {
        "grade": 0,
        "index": 0
    };
    var comb = {
        "name": null,
        "grade": null
    }
    var requirements_result = {
        "details": [],
        "grade": null
    }

    // how many combination there is in employer array
    for (var i = 0; i < obj.job.requirements.length; i++) {

        var tmp_must = [];
        var tmp_or = [];
        var tmp_adv = [];

        for (var j = 0; j < obj.job.requirements[i].combination.length; j++) {

            if (obj.job.requirements[i].combination[j].mode == "must") {
                tmp_must.push(obj.job.requirements[i].combination[j]);
            }

            if (obj.job.requirements[i].combination[j].mode == "or") {
                tmp_or.push(obj.job.requirements[i].combination[j]);
            }

            if (obj.job.requirements[i].combination[j].mode == "adv") {
                tmp_adv.push(obj.job.requirements[i].combination[j]);
            }
        };
        combination.push({
            "must": tmp_must,
            "or": tmp_or,
            "adv": tmp_adv
        });
    };


    for (var c = 0; c < combination.length; c++) {

        var employer_must = [];
        var employer_or = [];
        var employer_adv = [];


        //data from the employer
        for (var b = 0; b < combination[c].must.length; b++) {
            employer_must.push(combination[c].must[b]);
        };
        for (var b = 0; b < combination[c].or.length; b++) {
            employer_or.push(combination[c].or[b]);
        };
        for (var b = 0; b < combination[c].adv.length; b++) {
            employer_adv.push(combination[c].adv[b]);
        };


        // add field "grade" to the employer_must json struct
        for (var i = 0; i < employer_must.length; i++) {
            employer_must[i].grade = null;
        };

        // add field "relative grade" to the employee json struct
        for (var i = 0; i < employee.length; i++) {
            employee[i].relative_grade = null;
        };        

        var must = employer_must.length;
        var adv = employer_adv.length;
        var or = employer_or.length;

        if (or > 0) {
            adv = adv + or - 1;
            must = must + 1;
        }

        var temp = 100 / (adv + must);
        var grade_per_adv = temp / 2;
        var grade_per_must = ((grade_per_adv * adv) / must) + temp;

      
        console.log("adv: "+ grade_per_adv);
        console.log("must: "+ grade_per_must);


        for (var a = 0; a < employer_must.length; a++) {
            employer_must[a].grade = ((employer_must[a].percentage) / 100) * (employer_must.length * grade_per_must);
        };


        for (var i = 0; i < employer_must.length; i++) {
            for (var j = 0; j < employee.length; j++) {
                if (employer_must[i].name == employee[j].name) {
                    if (employer_must[i].years == 0) {
                        employee[j].years = 1;
                    } else {
                        employee[j].years = employee[j].years / employer_must[i].years;
                        if (employee[j].years > 1) {
                            employee[j].years = 1;
                        }
                    }
                    employee[j].mode = "must";
                    employee[j].relative_grade =  (employee[j].years * employer_must[i].grade);
                    employee[j].grade = (100*(employee[j].years * employer_must[i].grade) / ((grade_per_must*must)*employer_must[i].percentage/100));
                    if ( employee[j].grade > 100 ){
                        employee[j].grade = 100;
                    }
                    if ( employer_must[i].percentage == 0){
                       employee[j].grade = 0;
                    }
                };
            };
        };


        for (var i = 0; i < employer_or.length; i++) {
            for (var j = 0; j < employee.length; j++) {
                if (employer_or[i].name == employee[j].name) {
                    if (employer_or[i].years == 0) {
                        employee[j].years = 1;
                    } else {
                        employee[j].years = employee[j].years / employer_or[i].years;
                        if (employee[j].years > 1) {
                            employee[j].years = 1;
                        }
                    }
                    employee[j].mode = "or";
                    employee[j].relative_grade =  employee[j].years * grade_per_adv;
                    employee[j].grade = ((employee[j].years * grade_per_adv) / grade_per_adv) *100 ;
                    if ( employee[j].grade > 100){
                        employee[j].grade = 100;
                    }
                };
            };
        };

        for (var i = 0; i < employer_adv.length; i++) {
            for (var j = 0; j < employee.length; j++) {
                if (employer_adv[i].name == employee[j].name) {
                    if (employer_adv[i].years == 0) {
                        employee[j].years = 1;
                    } else {
                        employee[j].years = employee[j].years / employer_adv[i].years;
                        if (employee[j].years > 1) {
                            employee[j].years = 1;
                        }
                    }
                    employee[j].mode = "adv";
                    employee[j].relative_grade = employee[j].years * grade_per_adv;
                    employee[j].grade = ((employee[j].years * grade_per_adv) / grade_per_adv) *100 ;
                    if ( employee[j].grade > 100){
                        employee[j].grade = 100;
                    }
                };
            };
        };

        for (i = 0; i < employee.length; i++) {
            if (employee[i].grade != undefined) {
                var comb = {
                    "name": employee[i].name,
                    "grade": employee[i].grade,
                    "relative_grade": employee[i].relative_grade,
                    "combination_index": c
                }
                total_combination.push(comb);
                employee[i].grade = undefined;
            }
        }
    };

   // console.log(total_combination);

//
    if (total_combination.length != 0) {
        for (var j = 0; j < total_combination[total_combination.length - 1].combination_index + 1; j++) {
            var sum = 0;
            for (var i = 0; i < total_combination.length; i++) {
                if (total_combination[i].combination_index == j) {
                    sum += total_combination[i].relative_grade;
                }
            };
            console.log("sum: "+sum);
            grades_of_combinations.push(sum);
        };

        for (var i = 0; i < grades_of_combinations.length; i++) {
            if (grades_of_combinations[i] > the_biggest_result.grade) {
                the_biggest_result.grade = grades_of_combinations[i];
                the_biggest_result.index = i;
            }
        };

        for (var i = 0; i < total_combination.length; i++) {
            if (total_combination[i].combination_index == the_biggest_result.index) {
                requirements_result.details.push(total_combination[i]);
            }
        };

        requirements_result.grade = the_biggest_result.grade;
    } else {
        requirements_result.grade = 0;
    }


    for (var i = 0; i < requirements_result.details.length; i++) {
       // console.log("requirements_result.details[i].grade: "+ requirements_result.details[i].grade);
        requirements_result.details[i].relative_grade = Math.round(requirements_result.details[i].relative_grade);
        sumTotalGrade += Math.round(requirements_result.details[i].relative_grade);
    };

    requirements_result.grade = sumTotalGrade;



    if (requirements_result.grade > 100) {
        requirements_result.grade = 100;
    }


    //console.log(requirements_result);
    callback(requirements_result);

}


////////////////////////////////////////////////////// ** Location ** //////////////////////////////////////////////////////

function caclulateDistance(obj, callback) {

    var destination = obj.job.locations;
    var origin = obj.cv.locations;
    var totalLength = destination.length * origin.length;
    var distanceArr = [];
    var x = 42;
    var min;


    // 1st para in async.each() is the array of items
    async.each(destination,
        // 2nd param is the function that each item is passed to
        function(item, callbackAsync) {
            // Call an asynchronous function, often a save() to DB
            distance.get({
                    origin: origin[0],
                    destination: item
                },
                function(err, data) {
                    if (err) {
                        return callbackAsync(new Error(err));
                    } else {
                        var stringDistance = data.distance;
                        var sp = stringDistance.split(/[a-z]+/);
                        sp[0] = sp[0].replace(/,/g, "");
                        distanceArr.push(sp[0]);
                        callbackAsync();
                    }
                });

        },
        // 3rd param is the function to call when everything is done
        function(err) {
            if (err) {
                console.log("error while trying to calculate location " + err);
                callback(42);
            } else {
                min = Math.min.apply(Math, distanceArr);
                console.log("distance calculated successfully with  value of min: " + min);
                callback(min);
            }
        }
    );
}



function calc(num) {

    if (num == undefined) {
        locations_result = 0;
    }
    if (num < 6) {
        locations_result = 100;
    }

    if (num < 11 && num > 5) {
        locations_result = 90;
    }

    if (num < 21 && num > 10) {
        locations_result = 80;
    }

    if (num < 31 && num > 20) {
        locations_result = 70;
    }

    if (num < 41 && num > 30) {
        locations_result = 60;
    }

    if (num > 41) {
        locations_result = 50;
    }
    return locations_result;
}



////////////////////////////////////////////////////// ** Candidate Type ** //////////////////////////////////////////////////////


function caclulateCandidateType(obj, callback) {

    var candidate_type_employer = obj.job.candidate_type;
    var candidate_type_cv = obj.cv.candidate_type;

    var size_of_type_cv = candidate_type_cv.length;

    // Descending score for each type that not contained in employer type
    var grade_of_diff = 20;
    // count the number of equal type between job seeker and the employer
    var counter = 0;

    for (var i = 0; i < candidate_type_employer.length; i++) {
        for (var j = 0; j < candidate_type_cv.length; j++) {
            if (candidate_type_employer[i] == candidate_type_cv[j]) {
                counter++;
            }
        };
    };

    if (counter != 0) {
        var diff = size_of_type_cv - counter;
        var candidate_type_result = 100 - (grade_of_diff * diff);
    } else {
        var candidate_type_result = 0;
    }

    callback(candidate_type_result);

}


////////////////////////////////////////////////////// ** Scope Of Position ** //////////////////////////////////////////////////////


function caclulateScopeOfPosition(obj, callback) {

    // full time
    // part time
    // by hours

    var scope_of_position_employer = obj.job.scope_of_position;
    var scope_of_position_cv = obj.cv.scope_of_position;
    var scope_of_position_result = 0;

    for (var i = 0; i < scope_of_position_employer.length; i++) {
        for (var j = 0; j < scope_of_position_cv.length; j++) {
            if (scope_of_position_employer[i] == scope_of_position_cv[j]) {
                scope_of_position_result = 100;
            }
        };
    };

    callback(scope_of_position_result);
}


////////////////////////////////////////////////////// ** Academy ** //////////////////////////////////////////////////////


function caclulateAcademy(obj, callback) {


    var academy_employer = {
        "academy_type": obj.job.academy.academy_type,
        "degree_type": obj.job.academy.degree_type
    };
    var academy_cv = {
        "academy_type": obj.cv.academy.academy_type,
        "degree_type": obj.cv.academy.degree_type
    };

    // add two fields "grade" to the json struct
    academy_cv.grade_academy_type = 0;
    academy_cv.grade_degree_type = 0;

    if (academy_cv.academy_type.length != 0 && academy_cv.degree_type.length != 0) {

        if (academy_employer.academy_type.length > 1) {
            academy_cv.grade_academy_type = 50;
        }

        if (academy_employer.academy_type.length == 1) {
            if (academy_employer.academy_type[0] == academy_cv.academy_type) {
                academy_cv.grade_academy_type = 50;
            } else {
                academy_cv.grade_academy_type = 0;
            }
        }

        if (academy_employer.degree_type.length > 1) {
            academy_cv.grade_degree_type = 50;
        }

        if (academy_employer.degree_type.length == 1) {
            if (academy_employer.degree_type[0] == academy_cv.degree_type) {
                academy_cv.grade_degree_type = 50;
            } else {
                academy_cv.grade_degree_type = 0;
            }
        }
    }


    var academy_result = academy_cv.grade_degree_type + academy_cv.grade_academy_type;
    callback(academy_result);
}

////////////////////////////////////////////////////// ** Formula ** //////////////////////////////////////////////////////


function caclulateFormula(match, callback) {

    var total = 0;
    for (i = 0; i < match.length; i++) {
        total += match[i];
    }
    callback(total);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.calculateMatching = calculateMatching;