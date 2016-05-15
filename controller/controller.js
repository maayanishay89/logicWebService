var utils = require("./../model/utils/utils");
var validation = require("./../model/utils/validation");
var Matcher = require("../model/logic/matcher"); 

function calculateMatching(req,res){ 

   if (validation.addMatchingObject(req)) {
   //	console.log("im in if");
		var formula = JSON.stringify(req.body);
	  	Matcher.calculateMatching(formula, function(result) {
            res.status(formula).json(result);
        });
    } else {
    	    	console.log("im in else");
        utils.sendErrorValidation(res);
    }

  // var x = validation.addMatchingObject(req);
  // console.log(!x);

};

// function calculateMatching(req,res){ 
//     //console.log("im innn");
//     var formula = JSON.stringify(req.body);
//     Matcher.calculateMatching(formula, function(result) {
//         res.json(result);   
//     });
// };

exports.calculateMatching = calculateMatching;




// {
// 	"job":       {
//     "_id": "57237d5c5a52650300fa7ecf",
//     "matching_object_type": "job",
//     "date": "2016-04-29T15:27:26.672Z",
//     "original_text": {
//       "_id": "57237d5b5a52650300fa7eca",
//       "title": "ddd",
//       "description": "cs",
//       "requirements": "Must: Must: Must: css    |||  Advantage: Advantage: Advantage:",
//       "__v": 0,
//       "history_timeline": []
//     },
//     "sector": "software engineering",
//     "academy": {
//       "_id": "57237d5b5a52650300fa7ecd",
//       "degree_name": "software engineering",
//       "__v": 0,
//       "degree_type": [
//         "bsc"
//       ],
//       "academy_type": [
//        "university"
//       ]
//     },
//     "formula": {
//       "_id": "57237d5c5a52650300fa7ece",
//       "locations": 10,
//       "candidate_type": 10,
//       "scope_of_position": 60,
//       "academy": 10,
//       "requirements": 10,
//       "__v": 0,
//       "matching_requirements": {
//         "details": []
//       }
//     },
//     "compatibility_level": 30,
//     "archive": false,
//     "active": true,
//     "user": "5723349d5a52650300fa7dd9",
//     "__v": 0,
//     "cvs": [],
//     "favorites": [],
//     "requirements": [
//       {
//         "_id": "572387defe00580300d7a6f4",
//         "__v": 0,
//         "combination": [
//           {
//             "_id": "572387defe00580300d7a6f3",
//             "name": "c#",
//             "years": 1,
//             "mode": "must",
//             "percentage": 50,
//             "__v": 0
//           },
//           {
//             "_id": "572387defe00580300d7a6f3",
//             "name": "c",
//             "years": 3,
//             "mode": "must",
//             "percentage": 50,
//             "__v": 0
//           }
//         ]
//       }
//     ],
//     "scope_of_position": [
//       "full"
//     ],
//     "candidate_type": [
//       "student", "mom"
//     ],
//     "locations": [
//       "raanana"
//     ]
//   },

// 	"cv":       {
//     "_id": "5724f0e7a2e15164376f5c13",
//     "matching_object_type": "cv",
//     "date": "2016-01-02T22:00:00.000Z",
//     "original_text": {
//       "_id": "5724f0e6a2e15164376f5c0b",
//       "title": null,
//       "description": null,
//       "requirements": null,
//       "__v": 0,
//       "history_timeline": []
//     },
//     "sector": "software engineering",
//     "academy": {
//       "_id": "5724f0e6a2e15164376f5c11",
//       "degree_name": "software engineering",
//       "__v": 0,
//       "degree_type": [
//         "bsc"
//       ],
//       "academy_type": [
//         "university"
//       ]
//     },
//     "personal_properties": {
//       "_id": "5724f0e6a2e15164376f5c12",
//       "university_degree": false,
//       "degree_graduation_with_honors": false,
//       "above_two_years_experience": false,
//       "psychometric_above_680": false,
//       "multilingual": false,
//       "volunteering": false,
//       "full_army_service": false,
//       "officer": false,
//       "high_school_graduation_with_honors": false,
//       "youth_movements": false,
//       "__v": 0
//     },
//     "archive": false,
//     "active": true,
//     "user": {
//       "_id": "5723349d5a52650300fa7dd9",
//       "google_user_id": "111352360246654011035",
//       "first_name": "Roni",
//       "last_name": "Chabra",
//       "email": "roni691986@gmail.com",
//       "active": true,
//       "__v": 0,
//       "phone_number": "04",
//       "linkedin": "ewf",
//       "address": "Los Angeles, CA, United States",
//       "birth_date": "2016-04-21",
//       "personal_id": "300014008",
//       "company": "572339695a52650300fa7de6",
//       "current_cv": "5724f0e7a2e15164376f5c13",
//       "jobs": [
//         {
//           "cv": "57238b01fe00580300d7a72e",
//           "job": "57237d81e333793043506263",
//           "_id": "57238b01fe00580300d7a733",
//           "favorite": true
//         },
//         {
//           "cv": "5725277d8aa7540300472dbf",
//           "job": "5724f124a2e15164376f5c3b",
//           "_id": "5725277d8aa7540300472dc4",
//           "favorite": false
//         },
//         {
//           "cv": "572527eb8aa7540300472de6",
//           "job": "5724f131a2e15164376f5c77",
//           "_id": "572527eb8aa7540300472deb",
//           "favorite": true
//         },
//         {
//           "cv": "572528e48aa7540300472dfd",
//           "job": "572528b48aa7540300472df2",
//           "_id": "572528e48aa7540300472e00",
//           "favorite": false
//         },
//         {
//           "cv": "57260bdc5716f60300fd298f",
//           "job": "5724f12ba2e15164376f5c63",
//           "_id": "57260bdc5716f60300fd2994",
//           "favorite": false
//         },
//         {
//           "cv": "57260cc9c376540300983c0d",
//           "job": "57260cb1c376540300983c04",
//           "_id": "57260cc9c376540300983c10",
//           "favorite": false
//         },
//         {
//           "cv": "57260d5ec376540300983c28",
//           "job": "57260d25c376540300983c18",
//           "_id": "57260d5ec376540300983c2b",
//           "favorite": false
//         },
//         {
//           "cv": "57261372bf10fb030059220c",
//           "job": "572612abbf10fb03005921fe",
//           "_id": "57261372bf10fb030059220f",
//           "favorite": false
//         },
//         {
//           "cv": "5726162b3a8689030001cb6d",
//           "job": "5724f128a2e15164376f5c4f",
//           "_id": "5726162b3a8689030001cb72",
//           "favorite": false
//         },
//         {
//           "cv": "572616363a8689030001cb7c",
//           "job": "5724f11ea2e15164376f5c27",
//           "_id": "572616363a8689030001cb81",
//           "favorite": false
//         },
//         {
//           "cv": "572616613a8689030001cb8b",
//           "job": "57260d4ac376540300983c1f",
//           "_id": "572616613a8689030001cb8e",
//           "favorite": false
//         },
//         {
//           "cv": "5726171f3a8689030001cb98",
//           "job": "57252a2e8aa7540300472e13",
//           "_id": "5726171f3a8689030001cb9b",
//           "favorite": false
//         }
//       ]
//     },
//     "__v": 0,
//     "cvs": [],
//     "favorites": [],
//     "requirements": [
//       {
//         "_id": "5726161c3a8689030001cb64",
//         "__v": 0,
//         "combination": [
//           {
//             "_id": "5726161c3a8689030001cb61",
//             "name": "c",
//             "years": 3,
//             "__v": 0
//           },
//           {
//             "_id": "5726161c3a8689030001cb60",
//             "name": "c#",
//             "years": 1,
//             "__v": 0
//           }
//         ]
//       }
//     ],
//     "scope_of_position": [
//       "part",
//       "full"
//     ],
//     "candidate_type": [
//       "student"
//     ],
//     "locations": [
//       "netania","tel aviv"
//     ]
//   }
// }
