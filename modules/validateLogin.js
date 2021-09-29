var bcrypt = require('bcryptjs');
const Admin = require("../models/admin");
const Location = require("../models/location");
const {body} = require("express-validator")

module.exports.validate = async function(loginFormData){
	var user = {
		validData: false,
		fname: null,
		lname: null,
		locations: [],
		role: null,
		email: null
	}
	
	var userExists = await Admin.findOne({email: loginFormData.loginEmail}).lean().populate({path: 'locations', model: Location}).catch(err => {
		console.log("finding user err: " + err);
	})

	if(userExists != null){
		user.validData = bcrypt.compareSync(loginFormData.loginPassword, userExists.password);
	}

	if(user.validData){
		user.fname = userExists.fname;
		user.email = userExists.email;
		user._id = userExists._id;
		user.locations = userExists.locations;
		user.role = userExists.role;
	}

	return user;
}
