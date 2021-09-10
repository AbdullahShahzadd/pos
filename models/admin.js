
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
require("dotenv").config();
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.db_connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

var adminSchema = new Schema({
	"fname": String,
	"lname": String,
	"email": {
		"type": String,
		"lowercase": true,
		"unique": true,
		"required": true
	},
	"locations": [{type: mongoose.Schema.Types.ObjectId, ref: 'Locations'}],
	"password": String
})

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
