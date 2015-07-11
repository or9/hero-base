(function (app, doc, undefined) {
	"use strict";

	app.controller("CardCtrl", cardController);

	Object.defineProperties(cardController.prototype, {

		loading:	{ value: true, writable: true },
		started:	{ value: false, writable: true },
		chars:		{ writable: true },
		remaining:	{ value: [], writable: true, configurable: true },
		selected:	{ writable: true },
		current:	{ value: {}, writable: true },
		availableChoices: { value: [], writable: true }

	});

	function cardController ($scope, $q, $sce, cardService) {
		/*jshint validthis:true */

		var NUMBER_OF_ANSWERS = 5;
		var formType = "isolated";
		var chars;

		this.select = select.bind(this);
		this.answer = answer.bind(this);
		this.start = start.bind(this);

		cardService.requestCard("")
			.success(initCharacters.bind(this))
			.then(initRemainingForms.bind(this))
			.then(setLoading.bind(this));

		function initCharacters (response) {
			chars = response;
			this.chars = chars;
		}

		function initRemainingForms () {
			console.log("doing init remaining");

			this.loading = true;

			cardService.requestForm("")
				.success(createForms.bind(this))
				.then(this.remaining.sort(sortRemainingById));

			function createForms (data) {
				// forms are data.[initial|isolated|medial|final]

				this.remaining = data.map(function (character) {

					var form = character.form;

					return {
						name: character.name,
						form: form[formType],
						id: form.fk_id_characters
					};
				});

				return this.remaining;

			}

			function sortRemainingById (obj1, obj2) {
				return obj1.id - obj2.id;
			}

		}

		function start () {
			this.started = true;

			var i = -1;
			while (i < this.remaining.length - 1) {
				console.log("deleting name");
				delete this.remaining[i += 1].name;
			}

			console.log("starting");

			nextQuestion.call(this);
		}

		function nextQuestion () {

			this.loading = true;

			return cardService.next()
				.then(updateRemaining.bind(this))
				.then(showCurrentForm.bind(this))
				.then(shuffleAnswers.bind(this))
				.then(select.bind(this))
				.then(setLoading.bind(this));

		}

		function showCurrentForm (idIndex) {
			// forms are data.[initial|isolated|medial|final]
			this.current.id = this.remaining[idIndex].id;
			this.current.form = this.remaining[idIndex].form;
		}


		function updateRemaining (nextIndex) {
			var currentIndex = 0;
			console.log("updating remaining");
			while (currentIndex < this.remaining.length) {
				if (this.remaining[currentIndex] && this.remaining[currentIndex].id === this.current.id) {
					break;
				}
				currentIndex += 1;
			}
			this.remaining.splice(currentIndex, 1);

			return nextIndex;
		}



		function shuffleAnswers () {

			var rando = [];
			var tmp = chars.slice(0);
			tmp = tmp.sort(shuffle);

			tmp = tmp.filter(function (item) {
				return item.id !== this.current.id;
			}.bind(this));

			while (rando.length > 0 && rando.length < NUMBER_OF_ANSWERS - 1) {
				rando.push(tmp.shift().id);
			}

			rando.push(parseInt(this.current.id, 10));

			this.availableChoices = rando.sort(shuffle);

			function shuffle (a, b) {
				return 0.5 - Math.random();
			}
		}


		function select (cardId) {
			var previous = doc.getElementById("choice" + this.selected);
			if (previous) {
				previous.classList.remove("selected");
				doc.getElementById("choice"+cardId).classList.add("selected");
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

				var previousElement = doc.getElementById("choice" + this.selected);
				if (previousElement) {
					previousElement.classList.remove("selected");
				}

				this.selected = null;

				//return response;
				$q.resolve(response);
			}


			function incorrect (response) {
				this.loading = false;
				return $q.reject(response);
			}

		}

		function setLoading (isLoading) {
			this.loading = !!isLoading || false;
			return this.loading;
		}
	}


} (angular.module("cardgameApp"), document));
