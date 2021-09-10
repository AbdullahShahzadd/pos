var receiptItemArr = [];
var allItemsArr = [];
var allCustArr = [];
var allLocationsArr = [];
var chosenLocation;
var chosenCust;

function displayLocations(){
	
	var chosenLocationName;
	chosenLocation.businessName ?  chosenLocationName = chosenLocation.businessName : chosenLocationName = chosenLocation.streetName;
	var chosenLocationDiv = document.getElementById("chosenLocationDisplayDiv")
	chosenLocationDiv.appendChild(document.createTextNode(`Location: ${chosenLocationName}`))

	var chooseLocationDiv = document.getElementById("chooseLocation");
	chooseLocationDiv.classList.add("locationAnchorParent")

	if(allLocationsArr.length > 1){
		var locationAnchorsDiv = document.createElement('div');
		locationAnchorsDiv.classList.add("chooseLocationAnchors")
		
		var chooseLocationButton = document.createElement('button');
		chooseLocationButton.classList.add("head")
		chooseLocationButton.appendChild(document.createTextNode("Change Location"));
		chooseLocationDiv.appendChild(chooseLocationButton)

		allLocationsArr.forEach(el => {
			var locationAnchor = document.createElement('a');
			locationAnchor.href = "#";
			locationAnchor.setAttribute('id', el._id);
			locationAnchor.addEventListener('click', () => {
				changeChosenLocation(el)
			})
			var locationName;
			el.name ?  locationName = el.name : locationName = el.streetName;
			locationAnchor.appendChild(document.createTextNode(locationName))
			locationAnchorsDiv.appendChild(locationAnchor)
		})
		chooseLocationDiv.appendChild(locationAnchorsDiv);
	}
}

async function changeChosenLocation(el){

	document.getElementById('itemLocation').value = el._id;
	var chosenLocationDiv = document.getElementById("chosenLocationDisplayDiv");
	while(chosenLocationDiv.firstChild){chosenLocationDiv.removeChild(chosenLocationDiv.firstChild);}
	var locationName;
	el.name ?  locationName = el.name : locationName = el.streetName;
	chosenLocationDiv.appendChild(document.createTextNode(`Location: ${locationName}`))

	const data = {el}
	await fetch('/changeChosenLocation', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({data})
	})

	allItemsArr = [];

	await fetch('/getItems')
		.then(response => (response.json()))
		.then(json => {

			json.items.forEach(el => {
				allItemsArr.push(el);
		})
		})
	allCustArr = [];

	await fetch('/getCustomers')
		.then(response => (response.json()))
		.then(json => {
			json.customers.forEach(el => {
				allCustArr.push(el);
			})
		})
	displayCust(allCustArr)
	displayItems(allItemsArr);
}

// window.onload = async () => {
//     await fetch('/getLocations')
//         .then(response => (response.json()))
//         .then(json => {
//             document.getElementById('itemLocation').value = json.chosenLocation._id;
//             // console.log("in createItem onload")
//             // console.log(json.chosenLocation._id)
//             // console.log(json.locations)
//             allLocationsArr = json.locations;
//             chosenLocation = json.chosenLocation
//         })
//     displayLocations()
// }

function displayCust(custArr){
	var parentDiv = document.getElementById('saleCustList');
	while(parentDiv.firstChild){parentDiv.removeChild(parentDiv.firstChild);}
	custArr.forEach(el => {
		var rowDiv = document.createElement('div');
		rowDiv.classList.add("rowDiv", "saleElMargin");

		var fnameDiv = document.createElement('div');
		fnameDiv.classList.add("saleElMargin");
		fnameDiv.appendChild(document.createTextNode(el.fname));
		rowDiv.appendChild(fnameDiv);

		var lnameDiv = document.createElement('div');
		lnameDiv.classList.add("saleElMargin");
		lnameDiv.appendChild(document.createTextNode(el.lname));
		rowDiv.appendChild(lnameDiv);

		var emailDiv = document.createElement('div');
		emailDiv.classList.add("saleElMargin");
		emailDiv.appendChild(document.createTextNode(el.email));
		rowDiv.appendChild(emailDiv);

		var chooseCustDiv = document.createElement('div');
		chooseCustDiv.classList.add("saleElMargin");
		var chooseCustButton = document.createElement('button');
		chooseCustButton.appendChild(document.createTextNode("Choose"))
		chooseCustButton.onclick = function() { 
			var displayChosenCust = document.getElementById('displayChosenCustomer');
			while(displayChosenCust.firstChild){displayChosenCust.removeChild(displayChosenCust.firstChild)}
			displayChosenCust.appendChild(document.createTextNode(`Selected Customer: ${el.fname}`))
			document.getElementById('chosenCustId').value = el._id;
		}
		chooseCustDiv.appendChild(chooseCustButton);
		rowDiv.appendChild(chooseCustDiv)

		parentDiv.appendChild(rowDiv);
	})
}

function filterCust(filterStr){
	var parentDiv = document.getElementById('saleCustList');
	while(parentDiv.firstChild){parentDiv.removeChild(parentDiv.firstChild);}
	var filteredCustArr = allCustArr.filter(el => {
		return el.fname.includes(filterStr) || el.lname.includes(filterStr) || el.email.includes(filterStr);
	})
		displayCust(filteredCustArr);
}

function updateBalanceRemaining(subtractThis){
	var balanceRemainingDiv = document.getElementById('balanceRemaining');
		var totalPaymentAllocation = document.getElementById('credit').value? 
			document.getElementById('credit').value * 1 : 0;
		totalPaymentAllocation += document.getElementById('debit').value ? 
			document.getElementById('debit').value * 1 : 0;
		totalPaymentAllocation += document.getElementById('cash').value ? 
			document.getElementById('cash').value * 1 : 0;

		var balanceRemaining = (document.getElementById('totalVal').innerText * 1) - 
			totalPaymentAllocation;
		balanceRemainingDiv.innerText = balanceRemaining.toFixed(2);
		document.getElementById('receiptBalanceRemaining').value = balanceRemainingDiv.innerText * 1;
}

function removeButtonFunc(el){
					

	var numItemRemoved = 0;
	receiptItemArr = receiptItemArr.filter(receiptEl => {
		if(receiptEl._id == el._id ){numItemRemoved++;}
		return receiptEl._id != el._id;
	})
	var formDisplay = document.getElementById('formDiv');
	if(receiptItemArr.length == 0){formDisplay.style.display = "none"}
	document.getElementById('submitReceiptArr').value = JSON.stringify(receiptItemArr);	
	var subtotalEl = document.getElementById('subtotal')
	var sub = (subtotalEl.innerText * 1) - (el.price * numItemRemoved);

	subtotalEl.innerText = sub.toFixed(2);

	var discountPercent = document.getElementById('discount').value * 1;
	var totalDiv = document.getElementById('totalVal');
	var newTotal = subtotalEl.innerText * 1;
	if(discountPercent > 0 ){
		var discountDiv = document.getElementById('discountAmount');
		while(discountDiv.firstChild){discountDiv.removeChild(discountDiv.firstChild);}
		var discountTotal = (discountPercent * .01) * (subtotalEl.innerText * 1)
		var discountNode = document.createTextNode(discountTotal.toFixed(2));
		discountDiv.appendChild(discountNode);
		var newTotal = (subTotalVal.innerText * 1) - discountTotal;

		totalDiv.innerText = newTotal.toFixed(2);
		document.getElementById('balanceRemaining').innerText = newTotal.toFixed(2);
		document.getElementById("receiptSubmitTotal").value = newTotal.toFixed(2);
		document.getElementById('receiptBalanceRemaining').value = newTotal.toFixed(2);
	}else{
		totalDiv.innerText = newTotal.toFixed(2);
		document.getElementById('balanceRemaining').innerText = newTotal.toFixed(2);
		document.getElementById("receiptSubmitTotal").value = newTotal.toFixed(2);
		document.getElementById('receiptBalanceRemaining').value = newTotal.toFixed(2);
	}

	var invItemQty = document.getElementById('inv' + el._id);
	invItemQty.innerText = (invItemQty.innerText * 1) + numItemRemoved;
	var elToRemove = document.getElementById(el._id);
	elToRemove.remove();
}
		
var addToReceipt = function(el){
	console.log("in addToReceipt")
	var formDisplay = document.getElementById('formDiv');
	if(formDisplay.style.display == "none"){formDisplay.style.display = "block"}
	var elNotAdded = new Boolean(true);
	if(receiptItemArr.length > 0){
		for(var i = 0; i < receiptItemArr.length && elNotAdded; i++){
			if(receiptItemArr[i]._id == el._id){
				elNotAdded = false;
			}
		}
	}

		var qtyValue = document.getElementById('qty').value;

	if(elNotAdded){
		var receiptDiv = document.getElementById('receiptDiv');
		var rowDiv = document.createElement('div');
		rowDiv.classList.add("rowDiv", "saleElMargin", "itemLineHeight")
		rowDiv.setAttribute('id', el._id);



		var receiptQtyDiv = document.createElement('div');
		receiptQtyDiv.classList.add("itemQtyColumn", "saleElMargin", "itemLineHeight");
		var receiptQty = document.createTextNode(qtyValue);
		receiptQtyDiv.setAttribute('id', 'q' + el._id);
		receiptQtyDiv.appendChild(receiptQty);
		rowDiv.appendChild(receiptQtyDiv);


		var brandDiv = document.createElement('div');
		brandDiv.classList.add("itemBrandColumn", "saleElMargin", "itemLineHeight");
		var brand = document.createTextNode(el.brand);
		brandDiv.appendChild(brand);
		rowDiv.appendChild(brandDiv);

		var nameDiv = document.createElement('div');
		nameDiv.classList.add("saleElMargin", "itemNameColumn", "itemLineHeight");
		var namePar = document.createTextNode(el.name);
		nameDiv.appendChild(namePar);
		rowDiv.appendChild(nameDiv);
		

		var priceDiv = document.createElement('div');
		priceDiv.classList.add("saleElMargin", "itemPriceColumn", "itemLineHeight");
		var pricePar = document.createTextNode(el.price);
		priceDiv.appendChild(pricePar);
		rowDiv.appendChild(priceDiv);

		var removeButtonDiv = document.createElement('div');
		removeButtonDiv.classList.add("removeItemColumn", "saleElMargin", "itemLineHeight");
		var removeButton = document.createElement('button');
		removeButton.addEventListener('click', function(){removeButtonFunc(el);});
		removeButtonDiv.appendChild(removeButton);
		rowDiv.appendChild(removeButtonDiv)

		receiptDiv.appendChild(rowDiv);


		
	}else{
		var increaseThis = document.getElementById('q' + el._id);
		increaseThis.innerHTML = (increaseThis.innerHTML * 1) + 1;
	}

	var subTotalVal = document.getElementById('subtotal');
	var newTotal = (el.price * qtyValue) + (subTotalVal.innerText * 1);
	subTotalVal.innerText = newTotal.toFixed(2);

	var notFound = new Boolean(true);

	receiptItemArr.push(el);
	document.getElementById('submitReceiptArr').value = JSON.stringify(receiptItemArr);

	for(var i = 0; i < allItemsArr.length && notFound; i++){
		if(allItemsArr[i]._id == el._id){
			notFound = false;
			allItemsArr[i].qty -= qtyValue;
		}
	}

	var itemInvQty = document.getElementById('inv' + el._id);
	itemInvQty.innerText = (itemInvQty.innerText * 1) - qtyValue;

	var discountPercent = document.getElementById('discount').value * 1;
	var totalDiv = document.getElementById('totalVal');
	if(discountPercent > 0 ){
		var discountDiv = document.getElementById('discountAmount');
		while(discountDiv.firstChild){discountDiv.removeChild(discountDiv.firstChild);}
		var discountTotal = (discountPercent * .01) * (document.getElementById('subtotal').innerText * 1)
		var discountNode = document.createTextNode(discountTotal.toFixed(2));
		discountDiv.appendChild(discountNode);
		var newTotal = (subTotalVal.innerText * 1) - discountTotal;

		totalDiv.innerText = newTotal.toFixed(2);
		document.getElementById('balanceRemaining').innerText = newTotal.toFixed(2);
		document.getElementById("receiptSubmitTotal").value = newTotal.toFixed(2);
		document.getElementById('receiptBalanceRemaining').value = newTotal.toFixed(2);
	}else{
		totalDiv.innerText = newTotal.toFixed(2);
		document.getElementById('balanceRemaining').innerText = newTotal.toFixed(2);
		document.getElementById("receiptSubmitTotal").value = newTotal.toFixed(2);
		document.getElementById('receiptBalanceRemaining').value = newTotal.toFixed(2);
	}
}


function displayItems(arrOfSelectItems){
	var itemDiv = document.getElementById('itemListDiv');
	while(itemDiv.firstChild){itemDiv.removeChild(itemDiv.firstChild);}

	arrOfSelectItems.forEach((el) => {
		var rowDiv = document.createElement('div');
		rowDiv.classList.add("rowDiv", "itemLineHeight");
		
		var brandDiv = document.createElement('div');
		brandDiv.classList.add("saleElMargin", "itemBrandColumn", "itemLineHeight");
		var brandPar = document.createTextNode(el.brand);
		brandDiv.appendChild(brandPar);
		rowDiv.appendChild(brandDiv);

		var nameDiv = document.createElement('div');
		nameDiv.classList.add("saleElMargin", "itemNameColumn", "itemLineHeight");
		var namePar = document.createTextNode(el.name);
		nameDiv.appendChild(namePar);
		rowDiv.appendChild(nameDiv);

		var catDiv = document.createElement('div');
		catDiv.classList.add("saleElMargin", "itemCategoryColumn", "itemLineHeight");
		var catPar = document.createTextNode(el.category);
		catDiv.appendChild(catPar);
		rowDiv.appendChild(catDiv);

		var qtyDiv = document.createElement('div');
		qtyDiv.classList.add("saleElMargin", "itemStockColumn", "itemLineHeight");
		qtyDiv.setAttribute('id', 'inv' + el._id);
		var itemQty = document.createTextNode(el.qty);
		qtyDiv.appendChild(itemQty);
		rowDiv.appendChild(qtyDiv);

		var priceDiv = document.createElement('div');
		priceDiv.classList.add("saleElMargin", "itemPriceColumn", "itemLineHeight");
		var pricePar = document.createTextNode(el.price);
		priceDiv.appendChild(pricePar);
		rowDiv.appendChild(priceDiv);

		var addButtonDiv = document.createElement('div');
		addButtonDiv.classList.add("saleElMargin", "itemSelectButton", "itemLineHeight");
		var button = document.createElement('a');
		var link = document.createTextNode("Add");
		button.appendChild(link);
		button.href = "#4";
		addButtonDiv.appendChild(button);
		rowDiv.appendChild(addButtonDiv);

		button.addEventListener("click", function(){
			addToReceipt(el);
		});

		itemDiv.appendChild(rowDiv);
	})

}

window.onload = async () => {

	var form = document.getElementById('formDiv');
	formDiv.style.display = "none"
	
	await fetch('/getItems')
		.then(response => (response.json()))
		.then(json => {

			json.items.forEach(el => {
				allItemsArr.push(el);
		})
		})

	await fetch('/getCustomers')
		.then(response => (response.json()))
		.then(json => {
			json.customers.forEach(el => {
				allCustArr.push(el);
			})
		})
	// await fetch('/getLocations')
	//     .then(response => (response.json()))
	//     .then(json => {
	//         json.locations.forEach(el => {
	//             allLocationsArr.push(el);
	//         })
	//     })


	await fetch('/getLocations')
		.then(response => (response.json()))
		.then(json => {
			document.getElementById('itemLocation').value = json.chosenLocation._id;
			// console.log("in createItem onload")
			// console.log(json.chosenLocation._id)
			// console.log(json.locations)
			allLocationsArr = json.locations;
			chosenLocation = json.chosenLocation
		})
	displayLocations()


	displayCust(allCustArr)
	displayItems(allItemsArr);
	var displayChosenCust = document.getElementById('displayChosenCustomer');
	displayChosenCust.appendChild(document.createTextNode(`Selected Customer: General`))
// get general customer from allCustArr and make id=chosencustObj value = the general cust orrr id maybe, inspect everything and figure it out
	var chosenCust = allCustArr.find(el => {
		return el.fname == "General";
	})
	document.getElementById('chosenCustId').value = chosenCust._id;
}

document.getElementById('searchBar').addEventListener('keyup', (e) => {

	var itemDiv = document.getElementById('itemListDiv');
	while(itemDiv.firstChild){itemDiv.removeChild(itemDiv.firstChild);}
	var findItem = e.target.value;
	var filteredItems = allItemsArr.filter((el) => {
		return el.name.includes(findItem) || el.brand.includes(findItem);
	})
	displayItems(filteredItems);
})

document.getElementById('credit').addEventListener('keyup', (e) => {
	if((document.getElementById('totalVal').innerText * 1) - e.target.value < 0){
		e.preventDefault();
	}else{
	updateBalanceRemaining(e.target.value);
	}
})

document.getElementById('debit').addEventListener('keyup', (e) => {
	if((document.getElementById('totalVal').innerText * 1) - e.target.value < 0){
		e.preventDefault();
	}else{
	updateBalanceRemaining(e.target.value);
	}
})

document.getElementById('cash').addEventListener('keyup', (e) => {
	
	if((document.getElementById('totalVal').innerText * 1) - e.target.value < 0){
		e.preventDefault();
	}else{
	updateBalanceRemaining(e.target.value);
	}
})

// document.getElementById('submitReceiptArr').addEventListener('click', function(){
//     // return false;
// })

document.getElementById('discount').addEventListener('keyup', function(e){
	var subTotalVal = document.getElementById('subtotal');

	var discountPercent = e.target.value;
	var totalDiv = document.getElementById('totalVal');
	if(discountPercent >=0 ){
		var discountDiv = document.getElementById('discountAmount');
		while(discountDiv.firstChild){discountDiv.removeChild(discountDiv.firstChild);}
		var discountTotal = (discountPercent * .01) * (document.getElementById('subtotal').innerText * 1)
		var discountNode = document.createTextNode(discountTotal.toFixed(2));
		discountDiv.appendChild(discountNode);
		var newTotal = (subTotalVal.innerText * 1) - discountTotal;

		totalDiv.innerText = newTotal.toFixed(2);
		document.getElementById('balanceRemaining').innerText = newTotal.toFixed(2);
		document.getElementById("receiptSubmitTotal").value = newTotal.toFixed(2);
		document.getElementById('receiptBalanceRemaining').value = newTotal.toFixed(2);
	}
})


document.getElementById('submitReceiptArr').addEventListener('click', (e) => {
	if(receiptItemArr.length == 0){
		e.preventDefault()
	}else if((document.getElementById('balanceRemaining').innerText * 1) > 0){
		e.preventDefault()
	}
})

document.getElementById('saleCustSearchBar').addEventListener('keyup', function(){
	filterCust(e.target.value);
})

