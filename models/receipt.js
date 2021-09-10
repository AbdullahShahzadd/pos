var mongoose = require("mongoose");
var Schema = mongoose.Schema;
require("dotenv").config();

mongoose.connect(process.env.db_connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

var receiptSchema = new Schema({
	"_id": Number,
	"items": [{type: mongoose.Types.ObjectId, ref: 'Item'}],
	"total": Number,
	"discount": Number,
	"customer": {type: mongoose.Types.ObjectId, ref: 'Customer'},
	"locations": {type: mongoose.Types.ObjectId, ref: 'Locations'}
})

const Receipt = mongoose.model("receipt", receiptSchema);
module.exports = Receipt;
