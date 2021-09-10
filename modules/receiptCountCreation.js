const ReceiptCount = require("../models/receiptNum");

module.exports.receiptNum = async function(){
	await ReceiptCount.create({
		currentNumber: 1000
	})
}
