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
			for (var prop in data) {
				this.current[prop] = getChar(data[prop]);
				console.log("this.prop? ", this.current[prop]);
			}

			this.current.id = data.fk_id_characters;
			this.current.form = "&#x" + data.initial;

			function getChar (code) {
				var isCharCode = code.length === 4;
				if (!isCharCode) {
					return;
				}

				return "&#x" + code;
			}
		}

		function shuffleAnswers () {

			var rando = [];
			var tmp = this.chars.slice(0);
			tmp = shuffle(tmp).slice(-4);

			while (tmp.length > 0) {
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
			//doc.getElementById("card" + cardId)
			//	.classList.add(SELECTED_CLASS);
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
				return $q.reject(response);
			}

		}

	}



} (angular.module("cardgameApp"), document));
