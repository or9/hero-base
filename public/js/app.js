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
				templateUrl: "CardView",
				controller: "CardCtrl"
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
