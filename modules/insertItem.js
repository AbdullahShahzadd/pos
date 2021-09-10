const Item = require("../models/item");

module.exports.insertItem = async function(itemName, itemCategory, itemBrand, itemSize, itemPrice, itemQty, itemLocation){
	await Item.create({
		name: itemName,
		category: itemCategory,
		brand: itemBrand,
		size: itemSize,
		price: itemPrice,
		qty: itemQty,
		locations: itemLocation
	});
}
