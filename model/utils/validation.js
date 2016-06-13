/* Common */

function fieldValidation(field) {
    return !!(typeof field !== 'undefined' && field != null );
}

function validatePositiveNumber(number) {
    return /^[1-9][0-9]?$|^100$|^0$/.test(number);
}

/* End common */


/* private functions for matching object */

function locationsValidation(locations) {
    return locations
    && fieldValidation(locations)
    && locations.constructor === Array
    && locations.length > 0 ? true : false;
}

function candidateTypeValidation(candidateType) {
    return candidateType
    && fieldValidation(candidateType)
    && candidateType.constructor === Array
    && candidateType.length > 0 ? true : false;
}

function scopeOfPositionValidation(scopeOfPosition) {
    return scopeOfPosition
    && fieldValidation(scopeOfPosition)
    && scopeOfPosition.constructor === Array
    && scopeOfPosition.length > 0 ? true : false;
}

function academyDegreeTypeValidation(academyDegreeType) {
    return academyDegreeType
    && fieldValidation(academyDegreeType)
    && academyDegreeType.constructor === Array
    && academyDegreeType.length > 0 ? true : false;
}

function academyTypeValidation(academyType) {
    return academyType
    && fieldValidation(academyType)
    && academyType.constructor === Array
    && academyType.length > 0 ? true : false;
}


function formulaValidation(formula) {
    var valid = formula
    && fieldValidation(formula.locations)
    && fieldValidation(formula.candidate_type)
    && fieldValidation(formula.scope_of_position)
    && fieldValidation(formula.academy)
    && fieldValidation(formula.requirements) ? true : false;

    var formulaAmount = 0;
    if (valid) {
        for (var property in formula) {

            if ( property != "_id" && property != "__v" && property != "matching_requirements") {
                if ((validatePositiveNumber(formula[property]))) { // check for positive number and lower then 100
                    formulaAmount += formula[property];
                }else {
                    valid = false;
                    break;
                }
            }
        }
        return !!(valid && formulaAmount === 100); // verify formula is not bigger the 100

    } else return false;
}


function requirementsValidation(requirements, type) {

    var mustPercentageSum = 0;
    var mustExist = false;
    var valid = requirements
        && requirements.constructor === Array;

    if (valid) {
        for (var i = 0; i < requirements.length; i++) {
            valid = fieldValidation(requirements[i].combination) && requirements[i].combination.constructor === Array;
            if (valid) {
                for (var j = 0; j < requirements[i].combination.length; j++) {
                    if (type === "cv") {
                        valid = fieldValidation(requirements[i].combination[j].name)
                            && (fieldValidation(requirements[i].combination[j].years) &&
                            validatePositiveNumber(requirements[i].combination[j].years));
                        if (!valid) break;
                    } else if (type === "job") {
                        if (fieldValidation(requirements[i].combination[j].mode)) {
                            switch (requirements[i].combination[j].mode) {
                                case "must" :
                                    mustExist = true;
                                    valid = fieldValidation(requirements[i].combination[j].name)
                                        && (fieldValidation(requirements[i].combination[j].years) &&
                                        validatePositiveNumber(requirements[i].combination[j].years))
                                        && (fieldValidation(requirements[i].combination[j].percentage) &&
                                        validatePositiveNumber(requirements[i].combination[j].percentage));
                                    if (valid) {
                                        mustPercentageSum += requirements[i].combination[j].percentage;
                                    } else return false;
                                    break;
                                case "adv":
                                case "or" :
                                    valid = fieldValidation(requirements[i].combination[j].name)
                                        && (fieldValidation(requirements[i].combination[j].years) &&
                                        validatePositiveNumber(requirements[i].combination[j].years));
                                    break;
                                default :
                                    return false; // wrong mode sent
                                    break;
                            }
                        } else return false;
                    } else return false;
                    if (!valid) return false;
                }
                if ( mustPercentageSum != 100 && type == "job" && mustExist ) return false;
                else {
                        mustPercentageSum = 0;
                        mustExist = false;
                     }

            } else return false;
        }
        return valid;
    } else return false;
}


/* End private functions for matching object */


///////////////////////////////// *** Matching Objects *** ///////////////////////////

function addMatchingObject(req) {

    var matchingObject = req.body;

    if (matchingObject
        && locationsValidation(matchingObject.job.locations)
        && locationsValidation(matchingObject.cv.locations)
        && candidateTypeValidation(matchingObject.job.candidate_type)
        && candidateTypeValidation(matchingObject.cv.candidate_type)
        && scopeOfPositionValidation(matchingObject.job.scope_of_position)
        && scopeOfPositionValidation(matchingObject.cv.scope_of_position)
        && academyDegreeTypeValidation(matchingObject.job.academy.degree_type)
        && academyDegreeTypeValidation(matchingObject.cv.academy.degree_type)
        && academyTypeValidation(matchingObject.job.academy.academy_type)
        && academyTypeValidation(matchingObject.cv.academy.academy_type)
        && requirementsValidation(matchingObject.job.requirements, matchingObject.job.matching_object_type)
        && requirementsValidation(matchingObject.cv.requirements, matchingObject.cv.matching_object_type)
        && formulaValidation(matchingObject.job.formula)
    ) { 
        return true; 
    } else {
        return false;
    }
}

///////////////////////////////////// *** EXPORTS *** /////////////////////////////////

exports.addMatchingObject = addMatchingObject; 





