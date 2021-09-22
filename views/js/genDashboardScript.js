var allLocationsArr = [];
var chosenLocation;
var allCustomerArr = [];
var allItemsArr = [];

function displayItems(){

	var itemDiv = document.getElementById('itemListDiv');
	while(itemDiv.firstChild){itemDiv.removeChild(itemDiv.firstChild);}
	var chosenLocationName;
	chosenLocation.businessName ?  chosenLocationName = chosenLocation.businessName : chosenLocationName = chosenLocation.streetName;
	var itemLocationMessageDiv = document.getElementById("itemLocationMessage");
	while(itemLocationMessageDiv.firstChild){itemLocationMessageDiv.removeChild(itemLocationMessageDiv.firstChild);}
	itemLocationMessageDiv.appendChild(document.createTextNode(`Items at ${chosenLocationName}: `))

	if(allItemsArr.length > 0){
		allItemsArr.forEach((el) => {
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

			itemDiv.appendChild(rowDiv);
		})
	}else{
		var noItemDiv = document.createElement('div');
		noItemDiv.appendChild(document.createTextNode("No items to display for this location"))
		itemDiv.appendChild(noItemDiv)
	}

}

function displayCustomers(){
	var custDiv = document.getElementById('custDiv');
	while(custDiv.firstChild){custDiv.removeChild(custDiv.firstChild);}
	var chosenLocationName;
	chosenLocation.name ?  chosenLocationName = chosenLocation.name : chosenLocationName = chosenLocation.streetName;
	custDiv.appendChild(document.createTextNode(`Customers at ${chosenLocationName}: `))

	if(allCustomerArr.length > 0){
		var rowDiv = document.createElement('div');
		rowDiv.classList.add("rowDiv", "saleElMargin");
		var firstNameDiv = document.createElement('div');
		firstNameDiv.appendChild(document.createTextNode("First Name"))
		rowDiv.appendChild(firstNameDiv);
		
		var lastNameDiv = document.createElement('div');
		lastNameDiv.appendChild(document.createTextNode("Last Name"));
		rowDiv.appendChild(lastNameDiv);

		var emailDiv = document.createElement('div');
		emailDiv.appendChild(document.createTextNode("Email"));
		rowDiv.appendChild(emailDiv);
		custDiv.appendChild(rowDiv);

		allCustomerArr.forEach(el => {
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
				document.getElementById("chosenCustEmail").value = el.email;
			}
			chooseCustDiv.appendChild(chooseCustButton);
			rowDiv.appendChild(chooseCustDiv)

			custDiv.appendChild(rowDiv);
		})
	}else{
		var noCustDiv = document.createElement('div');
		noCustDiv.appendChild(document.createTextNode("No customers to display for this location"))
		custDiv.appendChild(noCustDiv)
	}
}

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

		hiddenId.name = "id"
		chooseLocationDiv.appendChild(locationAnchorsDiv);

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
	}
}

// function displayEditItem(someItemsArr){
//     var editItemParentDiv = document.getElementById('editItemDiv');
//     editItemParentDiv.classList.add("rowDiv", "saleElMargin")
	
//     someItemsArr.forEach(el => {
//         var formDiv = document.createElement('div')
//         formDiv.classList.add("roundBorder", "saleElMargin")

//         var formEl = document.createElement('form');
//         formEl.action = "/editItem";
//         formEl.method = "POST"
//         formEl.enctype = "application/x-www-form-urlencoded"

//         var nameDiv = document.createElement('div');
//         nameDiv.classList.add("saleElMargin")
//         var nameLabel = document.createElement('label');
//         nameLabel.classList.add("saleElMargin")
//         var nameSpan = document.createElement('span')
//         nameSpan.classList.add("itemAddSpan")
//         nameSpan.appendChild(document.createTextNode("Name"))
//         nameLabel.appendChild(nameSpan)
//         // nameLabel.appendChild(document.createTextNode("Name"))
//         var nameInput = document.createElement('input');
//         // nameInput.classList.add("itemAddInput")
//         nameInput.type = "text";
//         nameInput.name = "name";
//         nameInput.value = el.name;
//         nameLabel.appendChild(nameInput)
//         nameDiv.appendChild(nameLabel);
//         formEl.appendChild(nameDiv);

//         var brandDiv = document.createElement('div');
//         brandDiv.classList.add("saleElMargin")
//         var brandLabel = document.createElement('label');
//         brandLabel.appendChild(document.createTextNode("Brand"));
//         var brandInput = document.createElement('input');
//         brandInput.type = "text";
//         brandInput.name = "brand";
//         brandInput.value = el.brand;
//         brandLabel.appendChild(brandInput)
//         brandDiv.appendChild(brandLabel)
//         formEl.appendChild(brandDiv)

//         var categoryDiv = document.createElement('div');
//         categoryDiv.classList.add("saleElMargin")
//         var categoryLabel = document.createElement('label')
//         categoryLabel.appendChild(document.createTextNode("Category"))
//         var categoryInput = document.createElement('input')
//         categoryInput.name = "category"
//         categoryInput.type = "text"
//         categoryInput.value = el.category;
//         categoryLabel.appendChild(categoryInput)
//         categoryDiv.appendChild(categoryLabel)
//         formEl.appendChild(categoryDiv)

//         var sizeDiv = document.createElement('div');
//         sizeDiv.classList.add("saleElMargin")
//         var sizeLabel = document.createElement('label')
//         sizeLabel.appendChild(document.createTextNode("Size"))
//         var sizeInput = document.createElement('input')
//         sizeInput.name = "size"
//         sizeInput.type = "text"
//         sizeInput.value = el.size
//         sizeLabel.appendChild(sizeInput)
//         sizeDiv.appendChild(sizeLabel)
//         formEl.appendChild(sizeDiv)

//         var priceDiv = document.createElement('div');
//         priceDiv.classList.add("saleElMargin")
//         var priceLabel = document.createElement('label')
//         priceLabel.appendChild(document.createTextNode('Price'))
//         var priceInput = document.createElement('input')
//         priceInput.type = "number"
//         priceInput.name = "price"
//         priceInput.value = el.price
//         priceLabel.appendChild(priceInput)
//         priceDiv.appendChild(priceLabel)
//         formEl.appendChild(priceDiv)

//         var availableDiv = document.createElement('div')
//         availableDiv.classList.add("saleElMargin")
//         var availableLabel = document.createElement('label')
//         availableLabel.appendChild(document.createTextNode("Available"))
//         var availableInput = document.createElement('input')
//         availableInput.type = "number"
//         availableInput.name = "qty"
//         availableInput.value = el.qty
//         availableLabel.appendChild(availableInput)
//         availableDiv.appendChild(availableLabel)
//         formEl.appendChild(availableDiv)

//         var itemIdInput = document.createElement('input')
//         itemIdInput.type = "hidden"
//         itemIdInput.value = el._id
//         itemIdInput.name = "itemId"
//         formEl.appendChild(itemIdInput)

//         var submitButtonDiv = document.createElement('div')
//         submitButtonDiv.classList.add("center")
//         var submitButton = document.createElement('input')
//         submitButton.classList.add("center")
//         submitButton.type = "submit"
//         submitButton.value = "Submit Change"
//         submitButtonDiv.appendChild(submitButton)
//         formEl.appendChild(submitButtonDiv)

//         formDiv.appendChild(formEl)
//         editItemParentDiv.appendChild(formDiv)
//     })
// }

function displayReceiveOrderItems(itemArr){
	var itemDiv = document.getElementById("receiveOrderItems");
	while(itemDiv.firstChild){itemDiv.removeChild(itemDiv.firstChild)}

	itemArr.forEach((el) => {
		var formEl = document.createElement('form')
		formEl.action = "/receiveOrder";
		formEl.method = "POST"
		formEl.enctype = "application/x-www-form-urlencoded"


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


		var qtyReceivedDiv = document.createElement('div')
		qtyReceivedDiv.classList.add("saleElMargin", "itemReceivedColumn", "itemLineHeight")
		var qtyReceivedInput = document.createElement('input');
		qtyReceivedInput.type = "number"
		qtyReceivedInput.name = "qtyReceived"
		qtyReceivedDiv.appendChild(qtyReceivedInput)
		rowDiv.appendChild(qtyReceivedDiv)

		var hiddenId = document.createElement('input')
		hiddenId.name = "id"
		hiddenId.type = "hidden"
		hiddenId.value = el._id;
		rowDiv.appendChild(hiddenId)
		
		var submitDiv = document.createElement('div')
		submitDiv.classList.add("saleElMargin", "submitReceivedColumn", "itemLineHeight")
		var submitButton = document.createElement('input')
		submitButton.type = "submit"
		submitButton.value = "Enter"
		submitDiv.appendChild(submitButton)
		rowDiv.appendChild(submitDiv)
		// formEl.appendChild(submitDiv)

		formEl.appendChild(rowDiv)
		itemDiv.appendChild(formEl);
	})
}

// function receiveOrder(){
//     // I got this item and this is the amount of it i goG
//     var receiveOrderDiv = document.getElementById("receiveOrder")

// }
async function changeChosenLocation(el){
	var chosenLocationDiv = document.getElementById("chosenLocationDisplayDiv");
	while(chosenLocationDiv.firstChild){chosenLocationDiv.removeChild(chosenLocationDiv.firstChild);}
	chosenLocation = el;
	var locationName;
	el.name ?  locationName = el.name : locationName = el.streetName;
	chosenLocationDiv.appendChild(document.createTextNode(`Location: ${locationName}`))
	var data = {el}
	document.getElementById("locationToRegisterEmp").value = el._id

	await fetch('/changeChosenLocation', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({data})
	})

	allCustomerArr = [];

	await fetch('/getCustomers')
		.then(response => (response.json()))
		.then(json => {
			allCustomerArr = json.customers;
		})
	displayCustomers();

	await fetch('getItems')
		.then(response => (response.json()))
		.then(json => {
			allItemsArr = json.items;
		})
	displayItems();
}

window.onload = async () => {
	await fetch('/getLocations')
		.then(response => (response.json()))
		.then(json => {
			// document.getElementById('itemLocation').value = json.chosenLocation._id;
			// console.log("in createItem onload")
			// console.log(json.chosenLocation._id)
			// console.log(json.locations)
			allLocationsArr = json.locations;
			chosenLocation = json.chosenLocation
		})
	await fetch('/getCustomers')
		.then(response => (response.json()))
		.then(json => {
			allCustomerArr = json.customers;
		})

	await fetch('getItems')
		.then(response => (response.json()))
		.then(json => {
			allItemsArr = json.items;
		})

	displayItems();
	displayLocations();
	displayCustomers();
	document.getElementById("receiveOrder").style.display = "none"
	displayReceiveOrderItems(allItemsArr);
}



document.getElementById("receiveOrderSelector").addEventListener("click", () => {
	var hiddenEl = document.getElementById("receiveOrder");
	if(hiddenEl.style.display == "none"){
		hiddenEl.style.display = "block"
	}else{
		hiddenEl.style.display = "none"
	}

})

document.getElementById("findItem").addEventListener("keyup", (e) => {
	var filterString = e.target.value;
	var filteredArr = allItemsArr.filter( el => {
		return el.name.includes(filterString) || el.brand.includes(filterString);
	})
	displayReceiveOrderItems(filteredArr)	
})

