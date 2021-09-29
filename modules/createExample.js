const Item = require("../models/item")
const Receipt = require("../models/receipt")
const insertReceiptMod = require("./addReceipt")

module.exports.createItems = async (locationId) => {
	var vowels = ['a', 'e', 'i', 'o', 'u']
	var consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y']
	var randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
	var randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
	for(var i = 0; i < 100; i++){
		Item.create({
			name: consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)] + consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)] + consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)],
			category: consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)] + consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)] + consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)] ,
			brand: consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)] + consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)] + consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)] ,
			size: i,
			price: i + 2,
			cost: i + 1,
			qty: Math.floor(Math.random() * 100) + 1,
			locations: locationId
		})
	}
}


module.exports.createReceipts = async (locationId) => {
	Item.find()
		.then(arr => {
			var arrOfItemArr = [];
			for(var i = 0; i < 90; i++){
				var numItems = Math.floor(Math.random() * 5) + 5;
				var itemArr = [];
				for(var j = 0; j < numItems; j++){
					var itemObj = {id: null, price: null}
					var index = Math.floor(Math.random() * arr.length);
					itemObj.id = arr[index]._id;
					itemObj.price = arr[index].price;
					itemArr.push(itemObj);
				}
			arrOfItemArr.push(itemArr)	
			}
			return arrOfItemArr;
		})
		.then(async (arr) => {
			console.log("in then")
			console.log(arr)
			
			for(var i = 0; i < arr.length; i++){
				var idArr = [];
				var totalCost = 0;
				for(var j = 0; j < arr[i].length; j++){
					idArr.push(arr[i][j].id)
					totalCost += arr[i][j].price;
				}
				var thisDate = new Date(2020, 
							Math.floor((Math.random() * 9)), 
							Math.floor((Math.random() * 27) + 1),
							Math.floor((Math.random() * (12 - 9)) + 9),
							Math.floor((Math.random() * 58) + 1))

				await insertReceiptMod.receipt(idArr, 0, totalCost, locationId, thisDate)
			}

		})
		.catch(err => {console.log(err)})
}

