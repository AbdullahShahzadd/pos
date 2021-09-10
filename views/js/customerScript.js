var allLocationsArr = [];
var chosenLocation;
var allCustomerArr = [];

function displayCustomers(){
	var custDiv = document.getElementById('custDiv');
	while(custDiv.firstChild){custDiv.removeChild(custDiv.firstChild);}

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
		custDiv.appendChild(document.createTextNode("No customers to display for this location"))
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
}

window.onload = async () => {
	await fetch('/getLocations')
		.then(response => (response.json()))
		.then(json => {
			allLocationsArr = json.locations;
			chosenLocation = json.chosenLocation
		})
	await fetch('/getCustomers')
		.then(response => (response.json()))
		.then(json => {
			allCustomerArr = json.customers;
		})
	displayLocations();
	displayCustomers();
}




