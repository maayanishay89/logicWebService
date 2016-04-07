
var Matcher = require("./matcher"); 


function addFormula(formula,callback){ 
	//console.log("im in Controllerrrr");
  	Matcher.addFormula(formula, function(result) {
		callback(result);
	});
};


exports.addFormula = addFormula;


// {
// 	"job": {
// 		"_id": {
// 			"$oid": "56ed4a6fe4b0a216f2521c3b"
// 		},
// 		"matching_object_type": "job",
// 		"date": "10/03/2016",
// 		"original_text": null,
// 		"sector": "software engineering",
// 		"locations": [
// 			"Tel Aviv", "Ramat Gan", "Hadera"
// 		],
// 		"candidate_type": ["student", "no_experience", "mothers", "pensioners"],
// 		"scope_of_position": [
// 			"full time",
// 			"by hours"
// 		],
// 		"academy": {
// 			"academy_type": ["university", "college"],
// 			"degree_type": ["bsc"]
// 		},
// 		"formula": {
// 			"locations": 20,
// 			"candidate_type": 20,
// 			"scope_of_position": 20,
// 			"academy": 20,
// 			"requirements": 20
// 		},
// 		"requirements": [{
// 			"combination": [{
// 				"name": "c++",
// 				"years": 1,
// 				"mode": "must",
// 				"percentage": 80
// 			}, {
// 				"name": "c",
// 				"years": 3,
// 				"mode": "must",
// 				"percentage": 20
// 			}, {
// 				"name": "java",
// 				"years": 0,
// 				"mode": "or",
// 				"percentage": null
// 			}, {
// 				"name": "html",
// 				"years": 0,
// 				"mode": "or",
// 				"percentage": null
// 			}, {
// 				"name": "c#",
// 				"years": 1,
// 				"mode": "adv",
// 				"percentage": null
// 			}, {
// 				"name": "js",
// 				"years": 2,
// 				"mode": "adv",
// 				"percentage": null
// 			}, {
// 				"name": "angular",
// 				"years": 1,
// 				"mode": "adv",
// 				"percentage": null
// 			}]
// 		}, {
// 			"combination": [{
// 				"name": "c++",
// 				"years": 3,
// 				"mode": "must",
// 				"percentage": 80
// 			}, {
// 				"name": "c",
// 				"years": 1,
// 				"mode": "must",
// 				"percentage": 20
// 			}, {
// 				"name": "java",
// 				"years": 0,
// 				"mode": "or",
// 				"percentage": null
// 			}, {
// 				"name": "html",
// 				"years": 0,
// 				"mode": "or",
// 				"percentage": null
// 			}, {
// 				"name": "c#",
// 				"years": 2,
// 				"mode": "adv",
// 				"percentage": null
// 			}, {
// 				"name": "js",
// 				"years": 1,
// 				"mode": "adv",
// 				"percentage": null
// 			}, {
// 				"name": "angular",
// 				"years": 2,
// 				"mode": "adv",
// 				"percentage": null
// 			}]
// 		}],
// 		"compatibility_level": null,
// 		"status": {
// 			"status_id": "56ed3e9be4b0a216f2521b68",
// 			"current_status": "unread"
// 		},
// 		"favorites": null,
// 		"cvs": null,
// 		"google_user_id": "100",
// 		"active": true,
// 		"user": "56ed7bd2e4b0fd187fd7a723"
// 	},

// 	"cv": {
// 		"_id": {
// 			"$oid": "56ed4a6fe4b0a216f2521c3b"
// 		},
// 		"matching_object_type": "cv",
// 		"date": "10/03/2016",
// 		"original_text": null,
// 		"sector": "software engineering",
// 		"locations": [
// 			"Raanana", "Haifa", "Tel Aviv"
// 		],
// 		"candidate_type": ["discharged_soldiers", "no_experience", "mothers", "pensioners"],
// 		"scope_of_position": [
// 			"part time",
// 			"by hours"
// 		],
// 		"academy": {
// 			"academy_type": ["college"],
// 			"degree_type": ["bsc"]
// 		},
// 		"formula": {
// 			"locations": null,
// 			"candidate_type": null,
// 			"scope_of_position": null,
// 			"academy": null,
// 			"requirements": null
// 		},
// 		"requirements": [{
// 			"combination": [{
// 				"name": "c++",
// 				"years": 1,
// 				"mode": null,
// 				"percentage": null
// 			}, {
// 				"name": "java",
// 				"years": 0,
// 				"mode": null,
// 				"percentage": null
// 			}, {
// 				"name": "c",
// 				"years": 1,
// 				"mode": null,
// 				"percentage": null
// 			}, {
// 				"name": "angular",
// 				"years": 0.5,
// 				"mode": null,
// 				"percentage": null
// 			}]
// 		}],
// 		"compatibility_level": null,
// 		"status": {
// 			"status_id": "56ed3e9be4b0a216f2521b68",
// 			"current_status": "unread"
// 		},
// 		"favorites": null,
// 		"cvs": null,
// 		"google_user_id": "100",
// 		"active": true,
// 		"user": "56ed7bd2e4b0fd187fd7a723"
// 	}
// }