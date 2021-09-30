var allReceipts = []
var allLocationsArr = [];
var chosenLocation;
window.onload = () => {
	document.getElementById('yearlySaleProfit').style.display = "none";
	document.getElementById("monthlySaleProfit").style.display = "none"
	var yearlyExpander = document.getElementById('yearlySaleProfitSelectorExpand')
	var monthlyExpander = document.getElementById('monthlySaleProfitSelectorExpand')
	var plusSign = document.createElement('h2')
	plusSign.appendChild(document.createTextNode("+"))
	yearlyExpander.appendChild(plusSign)
	var plusSign = document.createElement('h2')
	plusSign.appendChild(document.createTextNode("+"))
	monthlyExpander.appendChild(plusSign)
	fetch('/getLocations')
		.then(response => (response.json()))
		.then(json => {
			allLocationsArr = json.locations;
			chosenLocation = json.chosenLocation
		}).then(() => {displayLocations()})

	getAndDisplayReceipts()
};

function getAndDisplayReceipts(){
fetch("/getReceipts")
		.then(res => (res.json()))
		.then(json => {
			allReceipts = json.receipts;
			for(var i = 0; i < allReceipts.length - 1; i++){
				for(var j = 0; j < allReceipts.length - i - 1; j++){
					if(allReceipts[j].purchaseDate > allReceipts[j + 1].purchaseDate){
						var temp = allReceipts[j];
						allReceipts[j] = allReceipts[j + 1];
						allReceipts[j + 1] = temp;
					}
				}
			}
			var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0];
			var labels = [];
			var profitData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0];
			for(var i = 0; i < 12; i++){
				labels.push(new Date(2020, i))
			}

			for(var i = 0, j = 0; i < allReceipts.length; i++){
				var tDate = new Date(allReceipts[i].purchaseDate)
				data[tDate.getMonth()] += allReceipts[i].total;
				for(var j = 0; j < allReceipts[i].items.length; j++){
					profitData[tDate.getMonth()] += (allReceipts[i].items[j].price - allReceipts[i].items[j].cost)
				}
			}
			yearSaleLineChart(labels, data, profitData)
			monthlySaleChart(0)
		});

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

	getAndDisplayReceipts()
}


function yearSaleLineChart(inLabel, inSalesData, inProfitData){
	var par = document.getElementById('yearlySaleProfit');
	while(par.firstChild){par.removeChild(par.firstChild)}
	var newChart = document.createElement('canvas');
	var ctx = newChart;

	const data = {
		labels: inLabel,
		datasets: [
			{
				label: 'Sale',
				data: inSalesData,
				fill: false,
				borderColor: 'rgb(194, 34, 34)',
				tension: 0.1
			},
			{
				label: 'Profit',
				data: inProfitData,
				fill: false,
				borderColor: 'rgb(245, 250, 8)',
				tension: 0.1

			}
		]
	}

	var myChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {
			scales: {
				x: {
					type: 'time',
					time: {
 						unit: 'month'
					}
				}
			}
		}
	})
	par.appendChild(newChart);
}


function monthlySaleChart(inMonth){

	var chartDiv = document.getElementById('monthlySaleChart');
	while(chartDiv.firstChild){chartDiv.removeChild(chartDiv.firstChild)}
	var thisMonthReceipts = allReceipts.filter(el => {
		var elDate = new Date(el.purchaseDate);
		return elDate.getMonth() == inMonth;
	})
	var numDays = new Date(2021, inMonth + 1, 0).getDate();
	var labels = [];
	var sales = [];
	var profit = []
	for(var i = 0; i < numDays; i++){
		labels.push(new Date(2021, inMonth, i + 1));
		sales.push(0)
       		profit.push(0)
		for(var j = 0; j < thisMonthReceipts.length; j++){
			var elDate = new Date(thisMonthReceipts[j].purchaseDate)
			if(elDate.getDate() == (i + 1)){
				sales[i] = thisMonthReceipts[j].total;
				var dayProfit = 0;
				for(var k = 0; k < thisMonthReceipts[j].items.length; k++){
					dayProfit += thisMonthReceipts[j].items[k].price -
						thisMonthReceipts[j].items[k].cost;
				}
				profit[i] = dayProfit;
			}
		}

	}

	var newChart = document.createElement('canvas')
	var ctx = newChart;

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Sale',
				data: sales,
				fill: false,
				borderColor: 'rgb(194, 34, 34)',
				tension: 0.1
			},
			{
				label: 'Profit',
				data: profit,
				fill: false,
				borderColor: 'rgb(245, 250, 8)',
				tension: 0.1

			}
		]
	}

	var myChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {
			scales: {
				x: {
					type: 'time',
					time: {
						unit: 'day'
					}
				}
			}
		}
	})
	chartDiv.appendChild(newChart)

}

document.getElementById('yearlySaleProfitSelector').addEventListener('click', function(){
	var hiddenEl = document.getElementById('yearlySaleProfit');
	var expanderSign = document.getElementById('yearlySaleProfitSelectorExpand')
	while(expanderSign.firstChild){expanderSign.removeChild(expanderSign.firstChild)}
	if(hiddenEl.style.display == "none"){
		hiddenEl.style.display = "flex"; 
		var minusSign = document.createElement('h2')
		minusSign.appendChild(document.createTextNode("-"))
		expanderSign.appendChild(minusSign)
	}else{
		hiddenEl.style.display = "none";
		var plusSign = document.createElement('h2')
		plusSign.appendChild(document.createTextNode("+"))
		expanderSign.appendChild(plusSign)
	}
})

document.getElementById('monthlySaleProfitSelector').addEventListener('click', function(){
	var hiddenEl = document.getElementById("monthlySaleProfit");
	var expanderSign = document.getElementById('monthlySaleProfitSelectorExpand')
	while(expanderSign.firstChild){expanderSign.removeChild(expanderSign.firstChild)}
	if(hiddenEl.style.display == "none"){
		hiddenEl.style.display = "flex"; 
		var minusSign = document.createElement('h2')
		minusSign.appendChild(document.createTextNode("-"))
		expanderSign.appendChild(minusSign)
	}else{
		hiddenEl.style.display = "none";
		var plusSign = document.createElement('h2')
		plusSign.appendChild(document.createTextNode("+"))
		expanderSign.appendChild(plusSign)
	}
})

document.getElementById('janMonth').addEventListener('click', function(){
	monthlySaleChart(0);
})
document.getElementById('febMonth').addEventListener('click', function(){
	monthlySaleChart(1);
})
document.getElementById('marMonth').addEventListener('click', function(){
	monthlySaleChart(2);
})
document.getElementById('aprMonth').addEventListener('click', function(){
	monthlySaleChart(3);
})
document.getElementById('mayMonth').addEventListener('click', function(){
	monthlySaleChart(4);
})
document.getElementById('junMonth').addEventListener('click', function(){
	monthlySaleChart(5);
})
document.getElementById('julMonth').addEventListener('click', function(){
	monthlySaleChart(6);
})
document.getElementById('augMonth').addEventListener('click', function(){
	monthlySaleChart(7);
})
document.getElementById('septMonth').addEventListener('click', function(){
	monthlySaleChart(8);
})
document.getElementById('octMonth').addEventListener('click', function(){
	monthlySaleChart(9);
})
document.getElementById('novMonth').addEventListener('click', function(){
	monthlySaleChart(10);
})
document.getElementById('decMonth').addEventListener('click', function(){
	monthlySaleChart(11);
})
