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
				controller: "CardCtrl",
				controllerAs: "cards"
			})
			// .when("/game", {
			// 	templateUrl: "js/game/view.html",
			// 	controller: "Game",
			// 	controllerAs: "game"
			// })
			.when("/scoreboard", {
				templateUrl: "js/scoreboard/view.html",
				controller: "scoreboardCtrl",
				controllerAs: "scoreboard"
			})
			.otherwise({
				redirectTo: "/"
			});
	}

} ());
