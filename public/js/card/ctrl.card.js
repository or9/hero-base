(function (app, doc, undefined) {
	"use strict";

	app.controller("CardCtrl", cardController);

	function cardController ($scope, cardService) {
		/*jshint validthis:true */

		var SELECTED_CLASS = "selected";
		var NUMBER_OF_ANSWERS = 5;
		var watchReady;

		this.ready = false;
		this.loading = true;
		this.chars = cardService.cards;
		this.selected = null;
		this.current = null;
		this.availableChoices = [];
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

		function watchForReady () {
			if (this.ready) {
				return true;
			}

			watchReady = $scope.$watch(this.ready, function (newVal) {
				if (newVal === true) {
					watch();
				}
			}, false);
		}

		function shuffleAnswers () {
			if (!watchForReady.call(this)) {
				return setTimeout(shuffleAnswers.bind(this), 10);
			}

			var rando = [];
			var thing;

			for (var i = 0; i < NUMBER_OF_ANSWERS - 1; i += 1) {
				// Because Karma can't run a while loop

				thing = this.chars[Math.floor(Math.random() * this.chars.length)];

				if (!thing || !thing.id) {
					continue;
				}

				rando.push(parseInt(thing.id, 10));
			}

			rando.push(parseInt(this.current, 10));

			this.availableChoices = shuffle(rando);

		}

		function shuffle (array) {
			return array.sort(function () {
				return 0.5 - Math.random();
			});
		}

		function answer () {
			this.loading = true;

			cardService.answer(this.selected)
				.then(correct.bind(this), incorrect.bind(this))
				.then(next.bind(this));
		}

		function correct () {
			this.loading = false;

			doc.getElementById("card" + this.selected)
				.classList.remove(SELECTED_CLASS);

			this.selected = null;
		}

		function incorrect () {
			this.loading = false;
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
			$scope.$digest();
		}

	}


} (angular.module("cardgameApp"), document));
