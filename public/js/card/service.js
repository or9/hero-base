(function (app, undefined) {
	"use strict";

	app.factory("cardService", CardService);

	function CardService($http, $q) {

		var cards = [];
		var forms = [];
		var lastIndex = 0;
		var index = 0;
		var retryLimit = 5;
		var loading = true;

		requestLastIndex()
			.success(populateCards)
			.error(errorHandler);

		return {
			get cards() {
				return cards;
			},
			get forms() {
				return forms;
			},
			get loading() {
				return loading;
			},
			get lastIndex() {
				return lastIndex;
			},
			next: next,
			answer: answer,
			getCard: getCard,
			getForm: getForm,
			error: errorHandler
		};

		/**
		 * Get the next answer
		 * @return Promise
		 */
		function next (tries) {
			tries = tries || 0;

			return $http.get("/api/next")
				.then(success, fail);

			function success (response) {
				return response.data;
			}

			function fail (data, status) {
				if (tries >= retryLimit) {
					return;
				} else {
					return next(tries += 1);
				}
			}
		}

		/**
		 * Sends answer request to server. Expects text/plain true or false
		 * @param cardId [string]
		 * @return Promise
		 */
		function answer (cardId, tries) {
			tries = tries || 0;

			return $http.post("/api/answer/".concat( cardId ))
				.then(success, failure);

			function success (response) {
				return $q(function(resolve, reject) {
					if (response.data === "true") {
						resolve(response.data);
					} else {
						reject(response.data);
					}
				});
			}

			function failure (data, status) {
				if (tries >= retryLimit) {
					return;
				} else {
					return answer(cardId, tries += 1);
				}
			}
		}

		/**
		 * Returns a card with specified ID
		 * @param index [int]
		 * @return card [object]
		 */
		function getCard (index) {
			loading = true;
			var card = getbyId(index, cards);
			loading = false;

			return card;
		}

		/**
		 * Returns a card's form with specified ID
		 * @param index [int]
		 * @return form [object]
		 */
		function getForm (index) {
			loading = true;
			var form = getbyId(index, forms);
			loading = false;

			return form;
		}

		/**
		 * Gets relevant object from associated array
		 * @private
		 * @return card|form [object]
		 */
		function getbyId (index, arr) {
			var i = 0;
			index = index.toString();

			while (i < arr.length) {
				if (arr[i].id === index) {
					return arr[i];
				}

				i += 1;
			}

		}

		/**
		 * Load all cards
		 * @return void
		 */
		function populateCards () {
			loading = true;

			while (index < lastIndex) {
				requestCard(index);
				index += 1;
			}

			loading = false;

		}

		/**
		 * Request JSON card object from server and push to array of cards
		 * @param cardId [string]
		 * @return Promise
		 */
		function requestCard (cardId, tries) {
			tries = tries || 0;

			return $http.get("/api/character/".concat( cardId ))
				.success(function (data) {
					cards.push(data);
					return data;
				})
				.error(function (data, status) {
					if (tries >= retryLimit) {
						errorHandler(data);
					} else {
						return requestCard(cardId, tries += 1);
					}
				});
		}

		/**
		 * Gets the length of array from server
		 * @return Promise
		 */
		function requestLastIndex (tries) {
			tries = tries || 0;

			return $http.get("/api/characters/length")
				.success(function (data) {
					lastIndex = data;
				})
				.error(function (data, status) {
					if (tries >= retryLimit) {
						errorHandler(data, status);
						loading = false;
					} else {
						return requestLastIndex(tries += 1);
					}
				});
		}

		/**
		 * Request JSON form object from server and push to array of forms
		 * @param formId [string]
		 * @return Promise
		 */
		function requestForm (formId, tries) {
			tries = tries || 0;

			return $http.get("/api/form/".concat( formId ))
				.success(function (data) {
					forms.push(data);
					return data;
				})
				.error(function (data, status) {
					if (tries >= retryLimit) {
						errorHandler(data);
					} else {
						return requestForm(formId, tries += 1);
					}


				});
		}

		function errorHandler (err) {
			console.log("Card service encountered an error: ", err);
		}
	}

} (angular.module("cardgameApp")));
