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
				templateUrl: "CardView.html",
				controller: "CardCtrl"
			})
			.when("/scoreboard", {
				templateUrl: "ScoreboardView.html",
				controller: "ScoreboardCtrl"
			})
			.otherwise({
				redirectTo: "/"
			});
	}

} ());
