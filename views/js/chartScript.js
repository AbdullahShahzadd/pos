var allReceipts = []
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
};



function yearSaleLineChart(inLabel, inSalesData, inProfitData){
	var ctx = document.getElementById('yearSaleChart');

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
}

function testChart(){

	var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['First', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	})
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
