(function (app, doc, undefined) {
	"use strict";

	app.controller("CardCtrl", cardController);

	function cardController ($scope, cardService) {
		/*jshint validthis:true */

		var SELECTED_CLASS = "selected";
		var NUMBER_OF_ANSWERS = 5;

		this.loading = true;
		this.chars = cardService.cards;
		this.selected = null;
		this.current = null;
		this.select = select.bind(this);
		this.answer = answer.bind(this);

		checkInitStatus.call(this);
		this.current = next.call(this);

		function select (cardId) {
			var previous = doc.getElementById("card" + this.selected);
			if (previous) {
				previous.classList.remove("selected");
			}

			this.selected = cardId;
			doc.getElementById("card" + cardId)
				.classList.add(SELECTED_CLASS);
		}

		function next () {
			cardService.next()
				.then(showCurrent.bind(this))
				.then(shuffleAnswers.bind(this));
		}

		function showCurrent (responseValue) {
			this.current = responseValue;
		}

		function shuffleAnswers () {
			if (!this.ready) {
			}


		}

		function answer () {
			// could simply use true / false from service…
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
				.classList.remove(SELECTED_CLASS);
			this.selected = null;
		}

		function incorrect () {
			// nothing yet…
		}

		function checkInitStatus () {
			var isReady = cardService.lastIndex !== 0;
			var loaded = this.chars.length === cardService.lastIndex;

			if (!isReady || !loaded) {
				return setTimeout(checkInitStatus.bind(this), 50);
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
