const Location = require("../models/location");
const Admin = require("../models/admin")
const Customer = require("../models/customer")

module.exports.addLocation = async function(locationData, userId){
	var locationCreated = await Location.create({
		streetName: locationData.streetName,
		streetNumber: locationData.streetNumber,
		postalCode: locationData.postalCode,
		city: locationData.city,
		province: locationData.province,
		country: locationData.country,
		receiptNum: 1000,
		businessName: locationData.name
	})

	await Admin.findOneAndUpdate({_id: userId}, {
		$push: {locations: locationCreated._id}
	})

	await Customer.create({
		fname: "general",
		email: "general@general.com",
		locations: locationCreated._id 
	})
	
	var user = await Admin.findOne({_id: userId}).populate({path: 'locations', model: Location}).lean()
	return user;
}
