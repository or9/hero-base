(function (app, undefined) {
	"use strict";

	app.controller("CardCtrl", CardController);

	CardController.prototype.loading = true;
	CardController.prototype.chars = [];

	function CardController ($scope, Card) {
		/*jshint validthis:true */

		Card.getLastIndex()
			.success(getCardByIndex.bind(this, 0))
			.error(failedToStart.bind(this));

		function getCardByIndex (index, length) {
			if (index >= length) {
				return stop.call(this);
			}

			return Card.getCard(index)
				.success(successGetCard.bind(this, length))
				.error(failGetCard.bind(this));
		}

		function successGetCard (length, responseData, status, headers, config) {
			this.chars.push(responseData);
			getCardByIndex.call(this, responseData.id + 1, length);
		}

		function stop () {
			this.loading = false;
		}

		function failedToStart (data, status) {
			Card.error({data: data, status: status });
		}

		function failGetCard (data, status, headers, config) {
			Card.error({ data: data, status: status, headers: headers, config: config });
			this.loading = false;
		}
	}




} (angular.module("cardgameApp")));
