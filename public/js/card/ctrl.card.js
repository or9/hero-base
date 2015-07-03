(function (app, doc, undefined) {
	"use strict";

	app.controller("CardCtrl", cardController);

	function cardController ($scope, $q, $sce, cardService) {
		/*jshint validthis:true */

		var SELECTED_CLASS = "selected";
		var NUMBER_OF_ANSWERS = 5;

		this.loading = true;
		this.chars = null;
		this.selected = null;
		this.current = {};
		this.availableChoices = [];
		this.select = select.bind(this);
		this.answer = answer.bind(this);
		this.renderHtml = $sce.trustAsHtml;

		cardService.requestCard("")
			.success(initCharacters.bind(this))
			.then(nextQuestion.bind(this));

		function initCharacters (response) {
			this.chars = response;
		}

		function nextQuestion () {

			this.loading = true;

			return cardService.next()
				.then(cardService.requestForm)
				.then(showCurrentForm.bind(this))
				.then(shuffleAnswers.bind(this));

		}

		function showCurrentForm (data) {
			// forms are data.[initial|isolated|medial|final]
			this.current.id = data.fk_id_characters;
			this.current.form = data.isolated;
		}

		function shuffleAnswers () {

			var rando = [];
			var tmp = shuffle(this.chars.slice(0));

			tmp = tmp.filter(function (item) {
				return item.id !== this.current.id;
			}.bind(this));

			while (rando.length < NUMBER_OF_ANSWERS - 1) {
				rando.push(tmp.shift().id);
			}

			rando.push(parseInt(this.current.id, 10));

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
		}

		function answer (id) {
			this.loading = true;

			cardService.answer(this.selected || id)
				.then(correct.bind(this), incorrect.bind(this))
				.then(nextQuestion.bind(this));

			function correct (response) {
				this.loading = false;

				this.selected = null;

				//return response;
				$q.resolve(response);
			}


			function incorrect (response) {
				this.loading = false;
				return $q.reject(response);
			}

		}

	}



} (angular.module("cardgameApp"), document));
