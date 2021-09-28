var allReceipts = []
window.onload = () => {
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

			
			console.log(data)
			yearSaleLineChart(labels, data, profitData)
		});
};



function yearSaleLineChart(inLabel, inSalesData, inProfitData){
	var ctx = document.getElementById('myChart');

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

