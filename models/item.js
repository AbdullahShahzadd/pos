var mongoose = require("mongoose");
var Schema = mongoose.Schema;
require("dotenv").config();
mongoose.connect(process.env.db_connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

var itemSchema = new Schema({
	"name": String,
	"category":String,
	"brand": String,
	"size": String,
	"price": Number,
	"qty": Number,
	"locations": {type: mongoose.Types.ObjectId, ref: 'Locations'}
})

const Item = mongoose.model('item', itemSchema);
module.exports = Item;
