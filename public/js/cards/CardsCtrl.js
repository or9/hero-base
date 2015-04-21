(function (app, undefined) {
	"use strict";

	app.controller("CardsCtrl", CardsController);

	CardsController.prototype.loading = true;

	function CardsController ($scope, cards) {

		$scope.loading = true;

		this.cards = cards.getCards().success(function (responseData) {
			$scope.chars = responseData;
			$scope.loading = false;
		});

		/*
		this.cards = cards.getCards().then(function () {
			$scope.loading = false;
			//CardsController.loading = false;
		}, function () {
			console.log("oops. failed to load the cards!");
			//$scope.errorLoadingCards = true;
		});
		*/

	}



} (angular.module("cardgameApp")));
