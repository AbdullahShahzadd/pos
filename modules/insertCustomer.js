const Customer = require("../models/customer");

module.exports.createCustomer = async function(custData, locationId){
	await Customer.create({
		fname: custData.fname,
		lname: custData.lname,
		email: custData.email,
		locations: locationId
	})
}
