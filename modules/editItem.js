const Item = require("../models/item")

module.exports.modify = async function(itemId, inName, inBrand, inCat, inSize, inPrice, inQty){
	await Item.findOneAndUpdate({_id: itemId}, {name: inName, brand: inBrand, category: inCat, size: inSize, price: inPrice, qty: inQty})

}

module.exports.receiveOrder = async function(itemId, inQty){
	await Item.findOneAndUpdate({_id: itemId}, {$inc: {qty: inQty}})
}
