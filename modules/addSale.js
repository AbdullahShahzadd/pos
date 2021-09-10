const Receipt = require("../models/receipt");

module.exports.addSale = async function(saleData){
	var total = 0;
	saleData.submitReceiptArr.forEach(el => {
		total += el.price;
	})

	await Receipt.create({
	})
}
