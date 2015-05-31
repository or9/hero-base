(function (app, undefined) {
	"use strict";

	app.controller("CardCtrl", CardController);

	CardController.prototype.loading = true;
	CardController.prototype.chars = [];
	CardController.prototype.selected = null;

	function CardController ($scope, cardService) {
		/*jshint validthis:true */

		this.loading = true;
		this.chars = [];
		this.selected = null;

		var tries = 0;
		var currentIndex = 0;
		//var length = cardService.cardsListLength;

		cardService.getLastIndex()
			.success(getCardByIndex.bind(this, 0))
			.error(failedToStart.bind(this));

		function getCardByIndex (index, length) {
			if (index >= length) {
				return stop.call(this);
			}

			this.loading = true;
			tries += 1;

			return cardService.getCard(index)
				.success(successGetCard.bind(this, length))
				.error(failGetCard.bind(this, index, length));
		}

		function successGetCard (length, responseData, status, headers, config) {
			getCardByIndex.call(this, responseData.id + 1, length);

			currentIndex += 1;
			tries = 0;

			this.chars.push(responseData);
		}

		function stop () {
			this.loading = false;
		}

		function failedToStart (data, status) {
			cardService.error({data: data, status: status });
			stop.bind(this);

		}

		function failGetCard (index, length, data, status, headers, config) {
			cardService.error({ index: index, data: data, status: status, headers: headers, config: config });
			if (tries >= 5) {
				return;
			}

			return cardService.getCard.call(this, index, length);
		}
	}




} (angular.module("cardgameApp")));
