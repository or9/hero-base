(function (app, doc, undefined) {
	"use strict";

	app.controller("CardCtrl", cardController);

	function cardController ($scope, $q, cardService) {
		/*jshint validthis:true */

		var SELECTED_CLASS = "selected";
		var NUMBER_OF_ANSWERS = 5;

		this.loading = true;
		this.chars = null;
		this.selected = null;
		this.current = null;
		this.availableChoices = [];
		this.select = select.bind(this);
		this.answer = answer.bind(this);

		cardService.requestCard("")
			.success(initCharacters.bind(this))
			//.then(initCharacters.bind(this))
			.then(nextQuestion.bind(this));

		function initCharacters (response) {
			this.chars = response;
		}

		function nextQuestion () {

			return cardService.next()
				.then(showCurrent.bind(this))
				.then(shuffleAnswers.bind(this));
		}

		function showCurrent (indexValue) {
			this.current = indexValue;
			// maybe delete?
			//delete this.chars[indexValue];
		}

		function shuffleAnswers () {

			var rando = [];
			var tmp = this.chars.slice(0);
			tmp = shuffle(tmp).slice(-4);

			while (tmp.length > 0) {
				rando.push(tmp.shift().id);
			}

			rando.push(parseInt(this.current, 10));

			this.availableChoices = shuffle(rando);
			this.loading = false;

			function shuffle (array) {
				return array.sort(function () {
					return 0.5 - Math.random();
				});
			}
		}


		function select (cardId) {
			var previous = doc.getElementById("card" + this.selected);
			if (previous) {
				previous.classList.remove("selected");
			}

			this.selected = cardId;
			doc.getElementById("card" + cardId)
				.classList.add(SELECTED_CLASS);
		}

		function answer () {
			this.loading = true;

			cardService.answer(this.selected)
				.then(correct.bind(this), incorrect.bind(this))
				.then(nextQuestion.bind(this));

			function correct (response) {
				this.loading = false;

				doc.getElementById("card" + this.selected)
					.classList.remove(SELECTED_CLASS);

				this.selected = null;

				return response;
				//$q.resolve(response);
			}


			function incorrect (response) {
				this.loading = false;
				$q.reject(response);
			}

		}

	}


} (angular.module("cardgameApp"), document));
