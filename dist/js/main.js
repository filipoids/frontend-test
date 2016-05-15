// your code
var Index = (function (window, document){
	var data;
	var URLDATE = 'fazenda.json';

	return {

		getJSON: function (url, callback){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					callback(JSON.parse(xmlhttp.responseText));
				}
			}
			
			xmlhttp.open("GET", url, true);
			xmlhttp.overrideMimeType('text/html charset=utf-8');
			xmlhttp.send();
		
		},

		normalizeData: function(item, property){

			if(item[property])
				return +item[property]

			return 0;

		},

		orderArray: function(array){

			return array.sort(function(a,b){

				return (((+b.negative) + (+b.positive)) - ( (+a.negative) + (+a.positive)));

			})

		},

		percentageVote: function (item){
			var percentage_positive =  Math.round(item.positive / (item.positive + item.negative) * 100);

			var percentage_negative = Math.round(item.negative / (item.positive + item.negative) * 100);

			if(isNaN(percentage_positive)){
				percentage_positive = 0;
			}

			if(isNaN(percentage_negative)){
				percentage_negative = 0;
			}

			return {

				positive : percentage_positive,

				negative : percentage_negative
			}
			
			
		},

		jsonEncode: function (item){
			return encodeURIComponent(item);	
		},

		renderList: function (response){
			console.log(encodeURIComponent(response.data[0].description));
			response.data = response.data.map(function(item){
				item.positive = Index.normalizeData(item, 'positive');
				item.negative = Index.normalizeData(item, 'negative');
				return item;
			});

			response.data = Index.orderArray(response.data);

			response.data = response.data.map(function(item){
				item.percentage = Index.percentageVote(item);
				item.description = item.description.replace('&ordm;', 'º')
				return item;
			})
			

			var template = document.getElementById('template').innerHTML;
			Mustache.parse(template);  
			var rendered = Mustache.render(template, response);
			document.getElementById('target').innerHTML = rendered;
		},

		init: function(){
			Index.getJSON(URLDATE, Index.renderList);
		}

	}

})(window, document);

