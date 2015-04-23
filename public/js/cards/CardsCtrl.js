(function (app, undefined) {
	"use strict";

	app.controller("CardsCtrl", CardsController);

	CardsController.prototype.loading = true;
	CardsController.prototype.chars = [];

	function CardsController ($scope, cards) {
		/*jshint validthis:true */

		var index = 0;
		getCard.call(this, index);
		//cards.getEachCard(success.bind(this), failure.bind(this));

		function getCard () {
			return cards.getCard(index)
				.success(success.bind(this))
				.error(failure.bind(this));
		}

		function success (responseData, status, headers, config) {
			console.log("responsedata? ", responseData);
			this.chars.push(responseData);
			index += 1;
			getCard.call(this, index);
		}

		function failure (data, status, headers, config) {
			if (status !== 404) {
				cards.error({ data: data, status: status, headers: headers, config: config });
			}

			this.loading = false;
		}

	}



} (angular.module("cardgameApp")));
