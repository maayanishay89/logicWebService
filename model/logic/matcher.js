
var distance = require('google-distance');
var matching_percent = 0;
async = require("async");


function calculateMatching(calculateMatching,callback){ 



		var obj = JSON.parse(calculateMatching);
		var match = [];
		var matcher_grade = {
			"total_grade": null,
			"formula": {
				"requirements":{
					"details":[],
					"grade":null
				},
				"candidate_type": null,
				"locations": null,
				"scope_of_position": null,
				"academy": null
			}
		}

		// requirements
		calculateRequirements(obj, function(result){
			//console.log("result.grade: "+ result.grade);
			//console.log("obj.job.formula.requirements : "+ obj.job.formula.requirements);
			match.push(result.grade * (obj.job.formula.requirements / 100));
			matcher_grade.formula.requirements.grade = result.grade;

			for (i=0; i < result.details.length; i++)
			{
				var detailsTmp ={	
							"name": result.details[i].name,
							"grade": result.details[i].grade
				}
			 	matcher_grade.formula.requirements.details.push(detailsTmp);
			}
			if (match.length == 5){
				caclulateFormula(match, function(total){
					matcher_grade.total_grade = total;
					//console.log(JSON.stringify(matcher_grade));
					callback(matcher_grade);
				});
			} 		
		});


		// locations
		caclulateDistance(obj, function(result) {
			var locations_result = calc(result);
			match.push(locations_result * (obj.job.formula.locations / 100));
			matcher_grade.formula.locations = locations_result;
			//console.log("locations_result: "+ locations_result);
			if (match.length == 5){
				caclulateFormula(match, function(total){
					matcher_grade.total_grade = total;
				//	console.log(JSON.stringify(matcher_grade));
					callback(matcher_grade);
				});
			}
		});

		// candidate_type
		caclulateCandidateType(obj, function(result) {
			var candidate_type_result = result;
			match.push(candidate_type_result * (obj.job.formula.candidate_type / 100));
			matcher_grade.formula.candidate_type = candidate_type_result;
			//console.log("candidate_type_result: "+ candidate_type_result);
			if (match.length == 5){
				caclulateFormula(match, function(total){
					matcher_grade.total_grade = total;
					//console.log(JSON.stringify(matcher_grade));
					callback(matcher_grade);				
				});
			} 
		});

		// scope_of_position
		caclulateScopeOfPosition(obj, function(result) {
			var scope_of_position_result = result;
			match.push(scope_of_position_result * (obj.job.formula.scope_of_position / 100));
			matcher_grade.formula.scope_of_position = scope_of_position_result;
			//console.log("scope_of_position_result: "+ scope_of_position_result);
			if (match.length == 5){
				caclulateFormula(match, function(total){
					matcher_grade.total_grade = total;
				//	console.log(JSON.stringify(matcher_grade));
					callback(matcher_grade);				
				});
			} 
		});

		// academy
		caclulateAcademy(obj, function(result) {
			var academy_result = result;
			match.push(academy_result * (obj.job.formula.academy / 100));
			matcher_grade.formula.academy = academy_result;
			//console.log("academy_result: "+ academy_result);
			if (match.length == 5){
				caclulateFormula(match, function(total){
					matcher_grade.total_grade = total;
					//console.log(JSON.stringify(matcher_grade));
					callback(matcher_grade);						
				});
			}  
		});

};



////////////////////////////////////////////////////// ** requierments functions ** //////////////////////////////////////////////////////


 function calculateRequirements(obj, callback){

	var employer=[];
	var employee = [];
	var total_combination=[];
	var combination =[];
	var grades_of_combinations = [];

	var the_biggest_result={
		"grade": 0,
		"index": 0
	};
	var comb = {
		"name": null,
		"grade": null
	}
	var requirements_result = {
		"details":[],
		"grade":null
    }


	// data from the job seeker
	for (var i = 0; i < obj.cv.requirements[0].combination.length; i++) {
		employee.push(obj.cv.requirements[0].combination[i]);	
	};

 // var combination = [
	//  	{
	//  		"must":[{"name":"c++","years":1,"mode":"must","percentage":80},{"name":"c","years":3,"mode":"must","percentage":20}],
	//  		"or":[{"name":"java","years":0,"mode":"or","percentage":null},{"name":"html","years":0,"mode":"or","percentage":null}],
	//  		"adv":[{"name":"c#","years":1,"mode":"adv","percentage":null},{"name":"js","years":2,"mode":"adv","percentage":null},{"name":"angular","years":1,"mode":"adv","percentage":null}]
	//  	},
	//  	{
	//  		"must":[{"name":"c++","years":3,"mode":"must","percentage":80},{"name":"c","years":1,"mode":"must","percentage":20}],
	//  		"or":[{"name":"java","years":2,"mode":"or","percentage":null},{"name":"html","years":2,"mode":"or","percentage":null}],
	//  		"adv":[{"name":"c#","years":2,"mode":"adv","percentage":null},{"name":"js","years":1,"mode":"adv","percentage":null},{"name":"angular","years":2,"mode":"adv","percentage":null}]
	//  	}
 	// ]



	// how many combination there is in employer array

	for (var i = 0; i < obj.job.requirements.length; i++) {	

		var tmp_must = [];
		var tmp_or = [];
		var tmp_adv = [];

		for (var j = 0; j < obj.job.requirements[i].combination.length; j++) {

				if(obj.job.requirements[i].combination[j].mode == "must") {
					tmp_must.push(obj.job.requirements[i].combination[j]);
				}

				if(obj.job.requirements[i].combination[j].mode == "or") {
					tmp_or.push(obj.job.requirements[i].combination[j]);
				}

				if(obj.job.requirements[i].combination[j].mode == "adv") {
					tmp_adv.push(obj.job.requirements[i].combination[j]);
				}
		};
		combination.push({
			"must":tmp_must,
			"or":tmp_or,
			"adv":tmp_adv
		});
	};

	for (var c = 0; c < combination.length; c++) {

			var employer_must=[];
			var employer_or=[];
			var employer_adv=[];
			var grade_result = 0;
			var total = 0;
			var counter = 0;
			
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


			var must = employer_must.length;
			var adv = employer_adv.length;
			var or = employer_or.length;

			if (or > 0){
				adv = adv + or - 1;
				must = must + 1;
			}

			var temp = 100 / (adv + must);
			var grade_per_adv = temp / 2;
			var grade_per_must = ((grade_per_adv * adv) / must) + temp;


			for (var a = 0; a < employer_must.length; a++) {
			 	employer_must[a].grade = ((employer_must[a].percentage)/100) * (employer_must.length * grade_per_must);
			 }; 


			for (var i = 0; i < employer_must.length; i++) {
				for (var j = 0; j < employee.length; j++) {
					if(employer_must[i].name == employee[j].name){
						if(employer_must[i].years == 0) {
							employee[j].years = 1;
						}
						else {
							employee[j].years = employee[j].years / employer_must[i].years;
								if(employee[j].years > 1) {
									employee[j].years = 1;
								}
						}
						employee[j].mode = "must";
						employee[j].grade = (employee[j].years * employer_must[i].grade);
					};
				};	
			};


			for (var i = 0; i < employer_or.length; i++) {
				for (var j = 0; j < employee.length; j++) {
					if(employer_or[i].name == employee[j].name){
						if(employer_or[i].years == 0) {
							employee[j].years = 1;
						}
						else {
							employee[j].years = employee[j].years / employer_or[i].years;
								if(employee[j].years > 1) {
									employee[j].years = 1;
								}
						}
						employee[j].mode = "or";
						employee[j].grade = employee[j].years * grade_per_adv;
					};
				};	
			};

			for (var i = 0; i < employer_adv.length; i++) {
				for (var j = 0; j < employee.length; j++) {
					if(employer_adv[i].name == employee[j].name){
						if(employer_adv[i].years == 0) {
							employee[j].years = 1;
						}
						else {
							employee[j].years = employee[j].years / employer_adv[i].years;
									if(employee[j].years > 1) {
									employee[j].years = 1;
								}
						}
						employee[j].mode = "adv";
						employee[j].grade = employee[j].years * grade_per_adv;
					};
				};	
			};

			// console.log(employer_must);
			// console.log(employer_or);
			// console.log(employer_adv);
			// console.log(employee);


			for (i=0; i < employee.length; i++)
			{
				if(employee[i].grade != undefined){
						var comb ={	
							"name": employee[i].name,
							"grade": employee[i].grade,
							"combination_index":c
						}
				}	
			total_combination.push(comb);
			}

	};

			for (var j = 0; j < total_combination[total_combination.length -1].combination_index +1; j++) {
				var sum = 0;
				for (var i = 0; i < total_combination.length; i++) {
					if(total_combination[i].combination_index == j) {
						sum += total_combination[i].grade;
					}
				};
				grades_of_combinations.push(sum);
			};

			for (var i = 0; i < grades_of_combinations.length; i++) {
				if(grades_of_combinations[i]> the_biggest_result.grade){
					the_biggest_result.grade = grades_of_combinations[i];
					the_biggest_result.index = i; 
				}
			};


			for (var i = 0; i < total_combination.length; i++) {
				if (total_combination[i].combination_index == the_biggest_result.index ) {
					requirements_result.details.push(total_combination[i]);	
				}
			};

			requirements_result.grade = the_biggest_result.grade;

			console.log(requirements_result);


callback(requirements_result);
 }


////////////////////////////////////////////////////// ** Location ** //////////////////////////////////////////////////////

function caclulateDistance(obj,callback) {

		var destination = []; //tv haifa natania
		var origin = []; //ranat gan raanana
		var locations_result = 0;
		var x = 42;


		for (var i = 0; i < obj.job.locations.length; i++) {
				destination.push(obj.job.locations[i]);
		};

		for (var i = 0; i < obj.cv.locations.length; i++) {
				origin.push(obj.cv.locations[i]);
		};

    	var x = 42;

		// 1st para in async.each() is the array of items
		async.each(origin,
				// 2nd param is the function that each item is passed to
				function(item, callback){
						// Call an asynchronous function, often a save() to DB
						distance.get({
							origin: item + ', IL',
							destination: destination[0] + ', IL'
						},
						function(err, data) {
							if (err) {
								console.log(err);
								callback(false);
							}
							else{
								//console.log(item);
								var stringDistance = data.distance;
								var numberDistance = stringDistance.split(" ");
													
								if (numberDistance[0] < x){
									x = numberDistance[0];
									//console.log("x: "+x);								
								}
								callback();
							}
						});							
				},
				// 3rd param is the function to call when everything's done
				function (err) {
					// All tasks are done now
					if (err) {
						console.log("error in save requirements combination to db ");
						console.log(err);
						callback(false);
					} else {
						callback(x);
						//console.log("x in the function: "+ x);
					}
				}
		);	
}



function calc(num){

		// 0 - 5 km      ----->	100%
		// 6 - 10 km	 ----->	90%
		// 11 - 20 km	 -----> 80%
		// 21 - 30 km	 -----> 70%
		// 31 - 40 km	 -----> 60%
		// 40 +			 -----> 50%		

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


function caclulateCandidateType(obj,callback){

		var candidate_type_employer = []; //tv haifa natania
		var candidate_type_cv = []; //ranat gan raanana


		for (var i = 0; i < obj.job.candidate_type.length; i++) {
				candidate_type_employer.push(obj.job.candidate_type[i]);
		};

		for (var i = 0; i < obj.cv.candidate_type.length; i++) {
				candidate_type_cv.push(obj.cv.candidate_type[i]);
		};

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

		var diff = size_of_type_cv - counter;
		var candidate_type_result = 100 - (grade_of_diff * diff);
		callback(candidate_type_result);

}


////////////////////////////////////////////////////// ** Scope Of Position ** //////////////////////////////////////////////////////


function caclulateScopeOfPosition(obj, callback){

		// full time
		// part time
		// by hours

		var scope_of_position_employer = [];
		var scope_of_position_cv = [];
		var scope_of_position_result = 0;

		for (var i = 0; i < obj.job.scope_of_position.length; i++) {
				scope_of_position_employer.push(obj.job.scope_of_position[i]);
		};

		for (var i = 0; i < obj.cv.scope_of_position.length; i++) {
				scope_of_position_cv.push(obj.cv.scope_of_position[i]);
		};		


		for (var i = 0; i < scope_of_position_employer.length; i++) {
			for (var j = 0; j < scope_of_position_cv.length; j++) {
					if (scope_of_position_employer[i].scope == scope_of_position_cv[j].scope) {
						scope_of_position_result = 100;
					}
			};		
		};

		callback(scope_of_position_result);
}


////////////////////////////////////////////////////// ** Academy ** //////////////////////////////////////////////////////


function caclulateAcademy(obj, callback){


		var academy_employer = { "academy_type": [] , "degree_type": [] };
		var academy_cv = { "academy_type": [] , "degree_type": [] };

		// add two fields "grade" to the json struct

		academy_cv.grade_academy_type = null;
		academy_cv.grade_degree_type = null;


		//console.log(obj.cv.academy.academy_type.length);

		for (var i = 0; i < obj.job.academy.academy_type.length; i++) {
				academy_employer.academy_type.push(obj.job.academy.academy_type[i]);
		};

		for (var i = 0; i < obj.job.academy.degree_type.length; i++) {
				academy_employer.degree_type.push(obj.job.academy.degree_type[i]);
		};

		for (var i = 0; i < obj.cv.academy.academy_type.length; i++) {
				academy_cv.academy_type.push(obj.cv.academy.academy_type[i]);
		};

		for (var i = 0; i < obj.cv.academy.degree_type.length; i++) {
				academy_cv.degree_type.push(obj.cv.academy.degree_type[i]);
		};

		//console.log(academy_employer);
		//console.log(academy_cv);


		if (academy_cv.academy_type && academy_cv.degree_type) {

			if (academy_employer.academy_type.length > 1) {
			academy_cv.grade_academy_type = 50;	
			}

			if (academy_employer.academy_type.length == 1) {
				if (academy_employer.academy_type[0] == academy_cv.academy_type) {
					academy_cv.grade_academy_type = 50;
				}
				else {
					academy_cv.grade_academy_type = 0;
				}
			}

			if (academy_employer.degree_type.length > 1) {
				academy_cv.grade_degree_type = 50;	
			} 

			if (academy_employer.degree_type.length == 1) {
				if (academy_employer.degree_type[0] == academy_cv.degree_type) {
					academy_cv.grade_degree_type = 50;
				}
				else {
					academy_cv.grade_degree_type = 0;
				}
			}
		}


		var academy_result = academy_cv.grade_degree_type + academy_cv.grade_academy_type;
		callback(academy_result);

}

////////////////////////////////////////////////////// ** Formula ** //////////////////////////////////////////////////////


function caclulateFormula(match, callback){

	var total = 0;
	for (i=0; i< match.length; i++)
	{
		total += match[i];
	}
	callback(total);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.calculateMatching = calculateMatching;














