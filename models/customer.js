var mongoose = require("mongoose");
var Schema = mongoose.Schema;
require("dotenv").config();

mongoose.connect(process.env.db_connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

var customerSchema = new Schema({
	"fname": String,
	"lname": String,
	"email": String,
	"locations": [{type: mongoose.Schema.Types.ObjectId, ref: 'Locations'}],
	"receipts": [{type: mongoose.Schema.Types.ObjectId, ref: 'Receipt'}]
})

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
