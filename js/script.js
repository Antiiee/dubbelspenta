var module = angular.module('dubbelspenta', []);

module.controller('bg-controller', function ($scope, Instagram) {
	var hash = 'dubbelspenta'

	Instagram.get(30, hash).success(function(response){
		$scope.images = response.data
	})
});

module.controller('presentation-controller', function($scope){
	var base = "img/gruppen/"
	$scope.gruppen = {}
	$scope.enkel = {}
	$scope.kvadrupel = {}

	$scope.gruppen.members = [
		{
			name: "Cristoffer Särevall",
			position: "Projektledare",
			image: base+"slickaricksmall.jpg"
		},{
			name: "Sofia Flårback",
			position: "Kassör & Grafiker",
			image: base+"sofiasmall.jpg"
		},{
			name: "Daniel Rönnkvist",
			position: "Web & Idé",
			image: base+"danielsmall.jpg"
		},{
			name: "Anton Arbring",
			position: "Web & Kassör",
			image: base+"antonsmall.jpg"
		},{
			name: "Amanda Meistefalk",
			position: "Pimp och sociala medier",
			image: base+"amanda.jpg"
		},{
			name: "Marcus Nihlén",
			position: "Festerist och filfak",
			image: base+"marcus.jpg"
		}
	]

	$scope.kvadrupel.members = [
		{
			name: "Christoffer Dahl",
			position: "",
			image: base+"nighteaglesmall.jpg"
		},{
			name: "Sofie Lindblom",
			position: "",
			image: base+"sofsmall.jpg"
		}
	]
});

module.controller('budord-controller', function($scope){
	$scope.budord = [
		"Du skall inte ha andra öl vid sidan av Dubbelspentan",
		"Du skall inte missbruka Herrens, Dubbelspentans, namn.",
		"Tänk på att hålla i en Dubbelspenta på sabbatsdagen.",
		"Visa aktning för din far och din mor, de förtjänar var sin Dubbelspenta.",
		"Du skall inte smutta.",
		"Du skall inte begå nykterhetsbrott.",
		"Du skall inte stjäla Dubbelspentor.",
		"Du skall inte vittna falskt mot din nästa, oavsett antal intagna Dubbelspentor.",
		"Du skall inte ha begär till din nästas Dubbelspenta.",
		"Du skall inte ha begär till din nästas hustrus Dubbelspenta, inte heller hans tjänares Dubbelspenta eller hans tjänarinnas Dubbelspenta, inte heller hans oxes Dubbelspenta eller hans åsnas Dubbelspenta, eller något annat som tillhör hans Dubbelspenta (?)."
	]
});

module.controller('history-controller', function($scope){
	$scope.histories = [
		"5000 år f.k. - Öl började produceras",
		"1735 - Spendrups bildades",
		"1950-1971 - Jens Fredrik Spendrup expanderade produktionen från 300 000 liter till över 15 miljoner liter",
		"2006 - Den 9e september invigdes kårhuset Trappan i Norrköping.",
		"2013 - Den 5e december bildades Dubbelspentagruppen",
		"2013 - Den 20e december blev Dubbelspentagruppen fulländad",
		"2013 - Den 24e december lanserades Dubbelspenta.se",
		"2014 - Den 25e januari kom Dubbelspenta på menyn på Trappan för första gången",
		"2014 - Den 22e mars skedde den första upplagan av det oslagbara konceptet Dubbelspentasittningen"
	]
});

module.factory('Instagram', ['$http',
	function($http) {
		var base = "https://api.instagram.com/v1";
		// get your own client id http://instagram.com/developer/
		var clientId = '28d27297003b4b4b928baadc7d204dd3';
		return {
			'get': function(count, hashtag) {
				var request = '/tags/' + hashtag + '/media/recent';
				var url = base + request;
				var config = {
					'params': {
						'client_id': clientId,
						'count': count,
						'callback': 'JSON_CALLBACK'
					}
				};
				return $http.jsonp(url, config);
			}
		};
	}
]);
