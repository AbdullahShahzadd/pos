const Location = require("../models/location");
const Admin = require("../models/admin")

module.exports.addLocation = async function(locationData, userId){
	var locationCreated = await Location.create({
		streetName: locationData.streetName,
		streetNumber: locationData.streetNumber,
		postalCode: locationData.postalCode,
		city: locationData.city,
		province: locationData.province,
		country: locationData.country,
		businessName: locationData.name
	})
	console.log(userId)
	console.log("after locationCreation")
	console.log(locationCreated)

	await Admin.findOneAndUpdate({_id: userId}, {
		$push: {locations: locationCreated._id}
	})
	
	var user = await Admin.findOne({_id: userId}).populate().lean()
	console.log("in module")
	console.log(user.locations)
	console.log(user)
	return user;
}
