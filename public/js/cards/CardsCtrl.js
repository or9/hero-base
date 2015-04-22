(function (app, undefined) {
	"use strict";

	app.controller("CardsCtrl", CardsController);

	CardsController.prototype.loading = true;

	function CardsController ($scope, cards) {
		/*jshint validthis:true */

		this.cards = cards.getCards()
			.success(success.bind(this))
			.error(failure.bind(this));

		function success (responseData) {
			this.chars = responseData;
			this.loading = false;
		}

		function failure (err) {
			cards.error(err);
			this.loading = false;
		}

	}



} (angular.module("cardgameApp")));
