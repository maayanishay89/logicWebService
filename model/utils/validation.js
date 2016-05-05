

/* Common */

function fieldValidation(field) {
    return !!(typeof field !== 'undefined' && field != null );
}

/* Input types validations */

function validateYear(year) {
    return /^\d{4}$/.test(year)
}

function validatePositiveNumber(number) {
    return /^[1-9][0-9]?$|^100$|^0$/.test(number);
}

function validatePersonalId( id ) {
    var multiply, digit, sum, numeric;

    // Numeric only
    if ( !/^\d{1,9}$/g.test( id ) ) {
        return false;
    }

    // Save original value and length (without leading 0s)
    numeric = parseInt( id, 10 );

    if(numeric === 0){
        return false;
    }

    // Perform safety digit check
    for (multiply = false, sum = 0; numeric > 0; multiply = !multiply) {
        digit = numeric % 10;
        numeric = parseInt( ( numeric / 10 ), 10 );
        if ( digit !== 0 ) {
            if ( multiply ) {
                digit *= 2;
                if ( digit > 9 ) {
                    digit = ( 1 /*The first digit will be 1 at most*/ + ( digit % 10 ) );
                }
            }
            sum += digit;
        }
    }

    return ( sum % 10 === 0 );
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/* End common */


/* Private functions for matching object */

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
            if (!(validatePositiveNumber(formula[property]))) { // check for positive number and lower then 100
                valid = false;
                break;
            }
            formulaAmount += formula[property];
        }
        return !!(valid && formulaAmount === 100); // verify formula is not bigger the 100

    } else return false;
}

function requirementsValidation(requirements, type) {

    var mustPercentageSum = 0;
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
                if ( mustPercentageSum != 100 && type == "job" ) return false;
                else mustPercentageSum=0;
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
        && locationsValidation(matchingObject.locations)
        && candidateTypeValidation(matchingObject.candidate_type)
        && scopeOfPositionValidation(matchingObject.scope_of_position)
        && academyDegreeTypeValidation(matchingObject.academy.degree_type)
        && academyTypeValidation(matchingObject.academy.academy_type)
        && requirementsValidation(matchingObject.requirements, matchingObject.matching_object_type)

    ) {
        if (matchingObject.matching_object_type === "cv") {
            return personalPropertiesValidation(matchingObject.personal_properties) ? true : false;
        } else if (matchingObject.matching_object_type === "job") {
            return fieldValidation(matchingObject.compatibility_level)
            && validatePositiveNumber(matchingObject.compatibility_level) // check number between 1-100
            && formulaValidation(matchingObject.formula)
                ? true : false;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function getMatchingObject(req) {
    return req.body
    && fieldValidation(req.body.matching_object_id)
    && fieldValidation(req.body.matching_object_type)
    && (req.body.matching_object_type == "cv" || req.body.matching_object_type == "job" )
        ? true : false
}

function deleteMatchingObject(req) {
    return req.body && fieldValidation(req.body.matching_object_id) ? true : false
}

function reviveMatchingObject(req) {
    return req.body && fieldValidation(req.body.matching_object_id) ? true : false
}

function updateMatchingObject(req) {
    return true;
}

///////////////////////////////////// *** EXPORTS *** /////////////////////////////////

exports.addMatchingObject = addMatchingObject; 
exports.getMatchingObject = getMatchingObject; 
exports.deleteMatchingObject = deleteMatchingObject; 
exports.reviveMatchingObject = reviveMatchingObject; 
exports.updateMatchingObject = updateMatchingObject; 





