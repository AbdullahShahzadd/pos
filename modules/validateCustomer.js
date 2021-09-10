const Customer = require("../models/customer");

module.exports.validate = async function(chosenLocation, custEmail){
	var isValid = true;
	var custExists = Customer.findOne({locations: chosenLocation, email: custEmail})
	if(custExists != null){isValid = false;}
	return isValid;
}
