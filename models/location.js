var mongoose = require("mongoose");
var Schema = mongoose.Schema;
require("dotenv").config();
mongoose.connect(process.env.db_connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

var locationSchema = new Schema({
	"receiptNum": Number,
	"streetName": String,
	"streetNumber": Number,
	"postalCode": String,
	"city": String,
	"province": String,
	"country": String,
	"businessName": String,
	"items": [{type: mongoose.Types.ObjectId, ref: 'Item'}]
})

const Location = mongoose.model('location', locationSchema);
module.exports = Location;
