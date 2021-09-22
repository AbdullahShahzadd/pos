const Admin = require("../models/admin");
const Location = require("../models/location");
const Customer = require("../models/customer")
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
		receiptNum: 1000
	})

	await Customer.create({
		fname: "general",
		email: "general@general.com",
		locations: chosenLocation._id
	})

	var admin = await Admin.create({
		fname: oFName,
		lname: oLName,
		email: oEmail,
		password: hash,
		role: "admin",
		locations: chosenLocation._id
	})

	// await Admin.updateOne({email: oEmail}, {
	//     $push: {locations: chosenLocation._id}
	// })

	var populatedAdmin = await Admin.findOne({_id: admin._id}).populate({path: 'locations', model: Location}).lean()
	// console.log('newStuff')
	// console.log(populatedAdmin)
	// admin.populate({path: 'locations', model: Location});
	// console.log('admin')
	// console.log(admin)

	// await admin.populate({path: 'locations', model: Location})
	// if(admin.populated('locations')){console.log('locations not populated')}
	// console.log('in registerOwner')
	// console.log(admin)
	// console.log('in registerOwner findOneMethod')
	// var admin = await Admin.findOne({email: oEmail});
	return populatedAdmin;
}
