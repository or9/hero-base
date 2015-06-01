(function (app, undefined) {
	"use strict";

	app.controller("CardCtrl", cardController);

	function cardController ($scope, cardService) {
		/*jshint validthis:true */

		this.loading = true;
		this.chars = cardService.cards;
		this.selected = null;
		this.select = select.bind(this);
		this.answer = answer.bind(this);

		function select (cardId) {
			this.selected = cardId;
		}

		function answer () {
			cardService.answer(this.selected);
		}

		checkInitStatus.call(this);

		function checkInitStatus () {
			var isReady = cardService.lastIndex !== 0;
			var loaded = this.chars.length === cardService.lastIndex;

			if (!isReady || !loaded) {
				return setTimeout(checkInitStatus.bind(this), 200);
			}

			this.loading = false;
			this.ready = true;

			// why does angularjs suck this much?
			// because they have a $timeout method
			// still stupid. I will not import $timeout
			$scope.$digest();
		}

	}


} (angular.module("cardgameApp")));
