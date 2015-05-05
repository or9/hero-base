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
				templateUrl: "js/card/view.html",
				controller: "CardCtrl"
			})
			.when("/game", {
				templateUrl: "js/game/view.html",
				controller: "GameCtrl"
			})
			.when("/scoreboard", {
				templateUrl: "js/scoreboard/view.html",
				controller: "ScoreboardCtrl"
			})
			.otherwise({
				redirectTo: "/"
			});
	}

} ());
