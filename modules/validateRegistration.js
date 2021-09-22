const Admin = require("../models/admin");

module.exports.check = async function(inEmail, inPassword){
	var errorObj = {
		badEmail: false,
		badPassword: false
	}
	const exists = await Admin.findOne({email: inEmail.toLowerCase});
	if(exists != null){
		errorObj.badEmail = true;
	}
	errorObj.badPassword = checkPassword(inPassword)
	return errorObj;
}


function checkPassword(password){
	var hasError = false;
	if(password.length < 8 || password.length > 10){ hasError = true};
	var checkForCapital = /.*[A-Z].*/;
	var checkForLowerCase = /.*[a-z].*/;
	var checkForNumber = /.*[0-9].*/;
	// if(isGood){
	//     isGood = checkForNumber.test(password) &&
	//         checkForLowerCase.test(password) &&
	//         checkForCapital.test(password);
	// }
	if(!hasError){
		if(!checkForNumber.test(password) || 
			!checkForLowerCase.test(password) || 
			!checkForCapital.test(password)){
			hasError = true;
		}
	}

	return hasError;
}
