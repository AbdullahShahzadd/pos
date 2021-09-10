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
		// var itemHeadingDiv = document.createElement('div');
		// itemHeadingDiv.classList.add("rowDiv", "itemLineHeight");

		// var brandDiv = document.createElement('div');
		// brandDiv.classList.add("saleElMargin", "itemBrandColumn", "itemLineHeight")
		// brandDiv.appendChild(document.createTextNode("Brand"));
		// itemHeadingDiv.appendChild(brandDiv);

		// var nameDiv = document.createElement('div');
		// nameDiv.classList.add("saleElMargin", "itemNameColumn", "itemLineHeight")
		// nameDiv.appendChild(document.createTextNode("Name"));
		// itemHeadingDiv.appendChild(nameDiv);

		// var categoryDiv = document.createElement('div');
		// categoryDiv.classList.add("saleElMargin", "itemCategoryColumn", "itemLineHeight")
		// categoryDiv.appendChild(document.createTextNode("Category"));
		// itemHeadingDiv.appendChild(categoryDiv);

		// var stockDiv = document.createElement('div');
		// stockDiv.classList.add("saleElMargin", "itemStockColumn", "itemLineHeight")
		// stockDiv.appendChild(document.createTextNode("Available"));
		// itemHeadingDiv.appendChild(stockDiv);

		// var priceDiv = document.createElement('div');
		// priceDiv.classList.add("saleElMargin", "itemPriceColumn", "itemLineHeight")
		// priceDiv.appendChild(document.createTextNode("Price"));
		// itemHeadingDiv.appendChild(priceDiv);

		// itemDiv.appendChild(itemHeadingDiv)

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
}
