(function (app, doc, undefined) {
	"use strict";

	app.controller("CardCtrl", CardController);

	Object.defineProperties(CardController.prototype, {

		loading:	{ value: true, writable: true },
		started:	{ value: false, writable: true },
		chars:		{ writable: true },
		remaining:	{ value: [], writable: true, configurable: true },
		selected:	{ writable: true },
		current:	{ value: {}, writable: true },
		availableChoices: { value: [], writable: true }

	});

	function CardController ($scope, $rootScope, $q, $location, cardService) {
		/*jshint validthis:true */

		var NUMBER_OF_ANSWERS = 5;
		var formType = "isolated";
		var allCharacters = [];
		var previousSelectedElement,
			startTime,
			timeDiff;

		$rootScope.score = 0;

		this.select = select.bind(this);
		this.answer = answer.bind(this);
		this.start = start.bind(this);

		cardService.requestCard("")
			.success(initCharacters.bind(this))
			.then(initRemainingForms.bind(this))
			.then(setLoading.bind(this));

		function initCharacters (response) {
			allCharacters = response.sort(sortAscending);
			this.chars = allCharacters.slice(0);
			// console.log("all chars? ", allCharacters);

			function sortAscending (a, b) {
				return a.id - b.id;
			}
		}

		function initRemainingForms () {

			this.loading = true;

			cardService.requestForm("")
				.success(createForms.bind(this))
				.then(this.remaining.sort(sortRemainingById));

			function createForms (data) {
				// forms are data.[initial|isolated|medial|final]

				this.remaining = data.map(function (character, index, shit) {

					var form = character.form;
					allCharacters[index].form = form[formType];

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

			nextQuestion.call(this);

			startTime = Date.now();
		}

		function nextQuestion () {

			this.loading = true;

			if (!this.remaining.length) {
				return end();
			}

			return cardService.next()
				.then(updateRemaining.bind(this))
				.then(showCurrentForm.bind(this))
				.then(shuffleAnswers.bind(this))
				.then(select.bind(this))
				.then(setLoading.bind(this));

		}

		function end () {
			$location.url("/scoreboard");
		}

		function showCurrentForm (idIndex) {
			// forms are data.[initial|isolated|medial|final]
			this.current.id = allCharacters[idIndex].id;
			this.current.form = allCharacters[idIndex].form;
			// console.log("this.current: ", this.current);
		}


		function updateRemaining (nextIndex) {
			var currentIndex = 0;
			// console.log("rem? ", this.remaining);
			// console.log("updating remaining");
			while (currentIndex < this.remaining.length) {
				if (this.remaining[currentIndex] && this.remaining[currentIndex].id === this.current.id) {
					break;
				}
				currentIndex += 1;
			}
			this.remaining.splice(currentIndex, 1);
			// console.log("this.remaining: ", this.remaining, this.remaining.length);

			return nextIndex;
		}



		function shuffleAnswers () {

			var rando = [];
			var tmp = allCharacters.slice(0);
			tmp = tmp.sort(shuffle);

			tmp = tmp.filter(function (item) {
				return item.id !== this.current.id;
			}.bind(this));

			while (tmp.length > 0 && rando.length < NUMBER_OF_ANSWERS - 1) {
				rando.push(tmp.shift().id);
			}

			rando.push(parseInt(this.current.id, 10));

			this.availableChoices = rando.sort(shuffle);

			function shuffle (a, b) {
				return 0.5 - Math.random();
			}
		}


		function select (cardId) {
			// previousSelectedElement = doc.getElementById("choice" + this.selected);
			previousSelectedElement = doc.querySelector(".selected");

			if (previousSelectedElement) {
				// console.log("yes, previous. It's: ", previous);
				previous.classList.remove("selected");
				doc.getElementById( "choice"+cardId ).classList.add("selected");
			}

			this.selected = cardId;

		}

		function answer (id) {
			this.loading = true;
			// console.log("answering: ", this.selected, id, "and answer is ", this.current);
			timeDiff = Date.now() - startTime;

			if (this.selected === 0) {
				this.selected = "0";
			}

			cardService.answer(this.selected || id)
				.then(correct.bind(this), incorrect.bind(this))
				.then(nextQuestion.bind(this));

			function correct (response) {
				// var previousElement = doc.getElementById("choice" + this.selected);
				var scoreCalc = (timeDiff / NUMBER_OF_ANSWERS) * 100000;

				previousSelectedElement = doc.querySelector(".selected");
				doc.body.classList.remove("incorrect");
				$rootScope.score += Math.max(1, scoreCalc);

				this.loading = false;

				if (previousSelectedElement) {
					previousSelectedElement.classList.remove("selected");
				}

				this.selected = null;

				$q.resolve(response);
			}


			function incorrect (response) {
				this.loading = false;

				$rootScope.score -= 1;

				if (previousSelectedElement) {
					previousSelectedElement.classList.add("incorrect");
				}

				doc.body.classList.add("incorrect");
				return $q.reject(response);
			}

		}

		function setLoading (isLoading) {
			this.loading = !!isLoading || false;
			return this.loading;
		}

	}


} (angular.module("cardgameApp"), document));
