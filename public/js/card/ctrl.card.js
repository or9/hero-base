(function (app, doc, undefined) {
	"use strict";

	app.controller("CardCtrl", cardController);

	function cardController ($scope, cardService) {
		/*jshint validthis:true */

		var selectedClass = "selected";

		this.loading = true;
		this.chars = cardService.cards;
		this.selected = null;
		this.select = select.bind(this);
		this.answer = answer.bind(this);

		checkInitStatus.call(this);

		function select (cardId) {
			var previous = doc.getElementById("card" + this.selected);
			if (previous) {
				previous.classList.remove("selected");
			}

			this.selected = cardId;
			doc.getElementById("card" + cardId)
				.classList.add(selectedClass);
		}

		function answer () {
			this.loading = true;
			cardService.answer(this.selected)
				.then(answerSuccess.bind(this));
		}

		function answerSuccess (responseData) {
			this.loading = false;

			if (responseData === "true") {
				correct.call(this);
			} else {
				incorrect.call(this);
			}

		}

		function correct () {
			doc.getElementById("card" + this.selected)
				.classList.remove(selectedClass);
			this.selected = null;
		}

		function incorrect () {
			// nothing yet…
		}

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


} (angular.module("cardgameApp"), document));
