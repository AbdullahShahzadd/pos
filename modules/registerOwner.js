const Admin = require("../models/admin");
const Location = require("../models/location");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10)

module.exports.addOwner = async function(sName, sNum, postal, city, province, country, businessName, oFName, oLName, oEmail, password){
	var hash = bcrypt.hashSync(password, salt);
	var chosenLocation = await Location.create({
		streetName: sName,
		streetNumber: sNum,
		postalCode: postal,
		city: city,
		province: province,
		country: country,
		businessName: businessName,
	})


	var admin = await Admin.create({
		fname: oFName,
		lname: oLName,
		email: oEmail,
		password: hash,
		role: "admin",
		locations: chosenLocation._id
	})


	var populatedAdmin = await Admin.findOne({_id: admin._id}).populate({path: 'locations', model: Location}).lean()
	return populatedAdmin;
}
