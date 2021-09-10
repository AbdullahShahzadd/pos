const ReceiptCount = require("../models/receiptNum");
const Location = require("../models/location");

module.exports.startUpScript = async function(){
	await ReceiptCount.create({
		currentNumber: 1000
	})

	await Location.create({
		streetName: "Test",
		streetNumber: 1111,
		postalCode: "T8T8T8",
		city: "testCity",
		province: "testProvince",
		country: "testCountry",
		businessName: "testName"
	})
}
