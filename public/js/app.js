(function (undefined) {
	"use strict";

	angular.module("cardgameApp", [
			"ngRoute"
		])
		.config(config);

	function config ($routeProvider, $interpolateProvider) {

		$interpolateProvider.startSymbol("[[");
		$interpolateProvider.endSymbol("]]");

		$routeProvider
			.when("/", {
				templateUrl: "CardsView",
				controller: "CardsCtrl"
			})
			.when("/scoreboard", {
				templateUrl: "ScoreboardView",
				controller: "ScoreboardCtrl"
			})
			.otherwise({
				redirectTo: "/"
			});
	}

} ());
