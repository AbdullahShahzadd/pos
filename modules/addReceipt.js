const Receipt = require("../models/receipt");
const Location = require("../models/location")
const Item = require("../models/item")

module.exports.receipt = async function(itemIdArr, recDiscount, recTotal, recLocation, inDate = null){
	var itemIds = [];
	itemIdArr.forEach(async (el) => {
		itemIds.push(el._id)
		await Item.findOneAndUpdate({_id: el._id}, {$inc: {qty: -1}})
	})

	var recObj = await Receipt.create({
		discount: (recDiscount * 1),
		total: recTotal,
		purchaseDate: inDate || new Date(),
		locations: recLocation._id,
		items: itemIds
	})
}
