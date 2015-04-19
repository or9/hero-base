(function ($module, undefined) {
	"use strict";

	$module("cardgameApp", [
			//"CharactersCtrl",
			//"charactersService",
			//"FormsCtrl",
			//"formsService",
			"CardsCtrl",
			"cardsService",
			"ScoreboardCtrl",
			"scoreboardService"
		])
		.config(config);

	function config ($interpolateProvider, $routeProvider) {
		$interpolateProvider.startSymbol("[[");
		$interpolateProvider.endSymbol("]]");

		$routeProvider
			.when("/", {
				controller: "CardsCtrl"
			});
	}

} (angular.module));
