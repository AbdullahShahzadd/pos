const Item = require("../models/item");

module.exports.insertItem = async function(itemName, itemCategory, itemBrand, itemSize, itemPrice, itemCost, itemQty, itemLocation){
	await Item.create({
		name: itemName,
		category: itemCategory,
		brand: itemBrand,
		size: itemSize,
		price: itemPrice,
		cost: itemCost,
		qty: itemQty,
		locations: itemLocation
	});
}
