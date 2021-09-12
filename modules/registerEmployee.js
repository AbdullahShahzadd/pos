const Admin = require("../models/admin");
const Location = require("../models/location");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10)

module.exports.addEmployee = async function(locationId, inLname, inFname, inPass, inEmail, inRole){
	var hash = bcrypt.hashSync(inPass, salt);
	await Admin.create({
		fname: inFname,
		lname: inLname,
		email: inEmail,
		password: hash,
		role: inRole,
		locations: locationId
	})
}
