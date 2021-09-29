const Receipt = require("../models/receipt");
const Location = require("../models/location")
const Item = require("../models/item")

module.exports.receipt = async function(itemIdArr, recDiscount, recTotal, recLocation, inDate = null){
	var itemIds = [];
	itemIdArr.forEach(async (el) => {
		itemIds.push(el._id)
		await Item.findOneAndUpdate({_id: el._id}, {$inc: {qty: -1}})
	})

	var locationChosen = await Location.findOne({_id: recLocation._id})
	await Receipt.create({
		_id: locationChosen.receiptNum,
		discount: (recDiscount * 1),
		total: recTotal,
		purchaseDate: inDate || new Date(),
		locations: recLocation._id,
		items: itemIds
	})


	await Location.findOneAndUpdate({_id: recLocation._id}, {$inc: {receiptNum: 1}})
}
