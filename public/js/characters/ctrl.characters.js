(function ($module, undefined) {
	"use strict";

	$module("CharactersCtrl", [])
		.controller("CharactersController", CharactersController);

	CharactersController.prototype.loading = true;

	function CharactersController ($scope, $http, characters) {

		this.cards = characters.get().then(function () {
			CharactersController.loading = false;
		}, function () {
			console.log("oops. failed to load the cards!");
			//$scope.errorLoadingCards = true;
		});

	}

} (angular.module));
