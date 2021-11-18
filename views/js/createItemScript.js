

var allLocationsArr = [];
var chosenLocation;

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
	document.getElementById('itemLocation').value = el._id;
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
}

window.onload = async () => {
	await fetch('/getLocations')
		.then(response => (response.json()))
		.then(json => {
			document.getElementById('itemLocation').value = json.chosenLocation._id;
			allLocationsArr = json.locations;
			chosenLocation = json.chosenLocation
		})
	displayLocations()
}
