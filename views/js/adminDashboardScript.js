var allLocationsArr = [];
var chosenLocation;
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

function displayEditItem(){
	var editItemParentDiv = document.getElementById('editItemDiv');
	editItemParentDiv.classList.add("rowDiv", "saleElMargin")
	while(editItemParentDiv.firstChild){editItemParentDiv.removeChild(editItemParentDiv.firstChild)}
	
	allItemsArr.forEach(el => {
		var formDiv = document.createElement('div')
		formDiv.classList.add("roundBorder", "saleElMargin", "editItemBox")

		var formEl = document.createElement('form');
		formEl.action = "/editItem";
		formEl.method = "POST"
		formEl.enctype = "application/x-www-form-urlencoded"

		var nameDiv = document.createElement('div')
		nameDiv.classList.add("saleElMargin", "rowDiv")
		var labelDiv = document.createElement('div')
		labelDiv.classList.add("formLabel")
		labelDiv.appendChild(document.createTextNode("Name"))
		nameDiv.appendChild(labelDiv)
		var nameInput = document.createElement('input');
		nameInput.type = "text";
		nameInput.name = "name";
		nameInput.value = el.name;
		nameDiv.appendChild(nameInput)
		formEl.appendChild(nameDiv)


		var brandDiv = document.createElement('div');
		brandDiv.classList.add("saleElMargin", "rowDiv")
		var brandLabel = document.createElement('div');
		brandLabel.classList.add("formLabel")
		brandLabel.appendChild(document.createTextNode("Brand"));
		brandDiv.appendChild(brandLabel)
		var brandInput = document.createElement('input');
		brandInput.type = "text";
		brandInput.name = "brand";
		brandInput.value = el.brand;
		brandDiv.appendChild(brandInput)
		formEl.appendChild(brandDiv)

		var categoryDiv = document.createElement('div');
		categoryDiv.classList.add("saleElMargin", "rowDiv")
		var categoryLabel = document.createElement('div')
		categoryLabel.classList.add("formLabel")
		categoryLabel.appendChild(document.createTextNode("Category"))
		categoryDiv.appendChild(categoryLabel)
		var categoryInput = document.createElement('input')
		categoryInput.name = "category"
		categoryInput.type = "text"
		categoryInput.value = el.category;
		categoryDiv.appendChild(categoryInput)
		formEl.appendChild(categoryDiv)

		var sizeDiv = document.createElement('div');
		sizeDiv.classList.add("saleElMargin", "rowDiv")
		var sizeLabel = document.createElement('div')
		sizeLabel.classList.add("formLabel")
		sizeLabel.appendChild(document.createTextNode("Size"))
		sizeDiv.appendChild(sizeLabel)
		var sizeInput = document.createElement('input')
		sizeInput.name = "size"
		sizeInput.type = "text"
		sizeInput.value = el.size
		sizeDiv.appendChild(sizeInput)
		formEl.appendChild(sizeDiv)

		var priceDiv = document.createElement('div');
		priceDiv.classList.add("saleElMargin", "rowDiv")
		var priceLabel = document.createElement('div')
		priceLabel.classList.add("formLabel")
		priceLabel.appendChild(document.createTextNode('Price'))
		priceDiv.appendChild(priceLabel)
		var priceInput = document.createElement('input')
		priceInput.type = "number"
		priceInput.name = "price"
		priceInput.value = el.price
		priceDiv.appendChild(priceInput)
		formEl.appendChild(priceDiv)

		var availableDiv = document.createElement('div')
		availableDiv.classList.add("saleElMargin", "rowDiv")
		var availableLabel = document.createElement('div')
		availableLabel.classList.add("formLabel")
		availableLabel.appendChild(document.createTextNode("Available"))
		availableDiv.appendChild(availableLabel)
		var availableInput = document.createElement('input')
		availableInput.type = "number"
		availableInput.name = "qty"
		availableInput.value = el.qty
		availableDiv.appendChild(availableInput)
		formEl.appendChild(availableDiv)

		var itemIdInput = document.createElement('input')
		itemIdInput.type = "hidden"
		itemIdInput.value = el._id
		itemIdInput.name = "itemId"
		formEl.appendChild(itemIdInput)

		var submitButtonDiv = document.createElement('div')
		submitButtonDiv.classList.add("center")
		var submitButton = document.createElement('input')
		submitButton.classList.add("center")
		submitButton.type = "submit"
		submitButton.value = "Submit Change"
		submitButtonDiv.appendChild(submitButton)
		formEl.appendChild(submitButtonDiv)

		formDiv.appendChild(formEl)
		editItemParentDiv.appendChild(formDiv)
	})
}

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


async function changeChosenLocation(el){
	var chosenLocationDiv = document.getElementById("chosenLocationDisplayDiv");
	while(chosenLocationDiv.firstChild){chosenLocationDiv.removeChild(chosenLocationDiv.firstChild);}
	chosenLocation = el;
	var locationName;
	el.name ?  locationName = el.name : locationName = el.streetName;
	chosenLocationDiv.appendChild(document.createTextNode(`Location: ${locationName}`))
	var data = {el}

	await fetch('/changeChosenLocation', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({data})
	})



	await fetch('getItems')
		.then(response => (response.json()))
		.then(json => {
			allItemsArr = json.items;
		})

	displayItems();
	displayEditItem()

}

window.onload = async () => {
	var editItemExpander = document.getElementById('editItemExpand');
	var plusSign = document.createElement('h2')
	plusSign.appendChild(document.createTextNode("+"))
	editItemExpander.appendChild(plusSign)

	var receiveOrderExpander = document.getElementById('receiveOrderExpand')
	var plusSign = document.createElement('h2')
	plusSign.appendChild(document.createTextNode("+"))
	receiveOrderExpander.appendChild(plusSign)

	var addItemExpander = document.getElementById('addItemExpand')
	var plusSign = document.createElement('h2')
	plusSign.appendChild(document.createTextNode("+"))
	addItemExpander.appendChild(plusSign)
	
	var addLocationExpander = document.getElementById('addLocationExpand')
	var plusSign = document.createElement('h2')
	plusSign.appendChild(document.createTextNode("+"))
	addLocationExpander.appendChild(plusSign)

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

	await fetch('getItems')
		.then(response => (response.json()))
		.then(json => {
			allItemsArr = json.items;
		})


	displayItems();
	displayLocations();
	displayEditItem()
	document.getElementById("editItemDiv").style.display = "none"
	document.getElementById("addItemDiv").style.display = "none"
	document.getElementById("receiveOrder").style.display = "none"
	document.getElementById("addLocation").style.display = "none"
	displayReceiveOrderItems(allItemsArr);
}

document.getElementById("editItemButton").addEventListener("click", () => {
	var hiddenEl = document.getElementById("editItemDiv")
	var expanderSign = document.getElementById('editItemExpand')
	while(expanderSign.firstChild){expanderSign.removeChild(expanderSign.firstChild)}
	if(hiddenEl.style.display == "none"){
		hiddenEl.style.display = "flex"
		var minusSign = document.createElement('h2')
		minusSign.appendChild(document.createTextNode("-"))
		expanderSign.appendChild(minusSign)
	}else{
		hiddenEl.style.display = "none"
		var plusSign = document.createElement('h2')
		plusSign.appendChild(document.createTextNode("+"))
		expanderSign.appendChild(plusSign)
	}
})

document.getElementById("addItemSelector").addEventListener("click", () => {
	var hiddenEl = document.getElementById("addItemDiv");
	var expanderSign = document.getElementById('addItemExpand')
	while(expanderSign.firstChild){expanderSign.removeChild(expanderSign.firstChild)}
	if(hiddenEl.style.display == "none"){
		hiddenEl.style.display = "flex"
		var minusSign = document.createElement('h2')
		minusSign.appendChild(document.createTextNode("-"))
		expanderSign.appendChild(minusSign)
	}else{
		hiddenEl.style.display = "none"
		var plusSign = document.createElement('h2')
		plusSign.appendChild(document.createTextNode("+"))
		expanderSign.appendChild(plusSign)
	}
})

document.getElementById("receiveOrderSelector").addEventListener("click", () => {
	var hiddenEl = document.getElementById("receiveOrder");
	var expanderSign = document.getElementById('receiveOrderExpand')
	while(expanderSign.firstChild){expanderSign.removeChild(expanderSign.firstChild)}
	if(hiddenEl.style.display == "none"){
		hiddenEl.style.display = "block"
		var minusSign = document.createElement('h2')
		minusSign.appendChild(document.createTextNode("-"))
		expanderSign.appendChild(minusSign)
	}else{
		hiddenEl.style.display = "none"
		var plusSign = document.createElement('h2')
		plusSign.appendChild(document.createTextNode("+"))
		expanderSign.appendChild(plusSign)
	}

})

document.getElementById("findItem").addEventListener("keyup", (e) => {
	var filterString = e.target.value;
	var filteredArr = allItemsArr.filter( el => {
		return el.name.includes(filterString) || el.brand.includes(filterString);
	})
	displayReceiveOrderItems(filteredArr)	
})


document.getElementById("addLocationSelector").addEventListener("click", () => {
	var hiddenEl = document.getElementById("addLocation")
	var expanderSign = document.getElementById('addLocationExpand');
	while(expanderSign.firstChild){expanderSign.removeChild(expanderSign.firstChild)}

	if(hiddenEl.style.display == "none"){
		hiddenEl.style.display = "flex"
		var minusSign = document.createElement('h2')
		minusSign.appendChild(document.createTextNode("-"))
		expanderSign.appendChild(minusSign)
	}else{
		hiddenEl.style.display = "none"
		var plusSign = document.createElement('h2')
		plusSign.appendChild(document.createTextNode("+"))
		expanderSign.appendChild(plusSign)
	}
})

