(function (app, undefined) {
	"use strict";

	app.factory("cardService", CardService);

	function CardService($http) {

		var cards = [];
		var forms = [];
		var lastIndex = 0;
		var index = 0;
		var tries = 0;
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
			getCard: getCard,
			getForm: getForm,
			error: errorHandler
		};

		function getCard (index) {
			loading = true;
			var card = getbyId(index, cards);
			loading = false;

			return card;
		}

		function getForm (index) {
			loading = true;
			var form = getbyId(index, forms);
			loading = false;

			return form;
		}

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

		function populateCards () {
			loading = true;

			while (index < lastIndex) {
				requestCard(index);
				index += 1;
			}

			loading = false;

		}

		function requestCard (cardId) {
			tries += 1;

			return $http.get("/api/character/".concat( cardId ))
				.success(function (data) {
					tries = 0;
					cards.push(data);
					return data;
				})
				.error(function (data, status) {
					if (tries >= retryLimit) {
						errorHandler(data);
					} else {
						return requestCard(cardId);
					}
				});
		}

		function requestLastIndex () {
			tries += 1;

			return $http.get("/api/characters/length")
				.success(function (data) {
					tries = 0;
					lastIndex = data;
				})
				.error(function (data, status) {
					if (tries >= retryLimit) {
						errorHandler(data, status);
						loading = false;
					} else {
						return requestLastIndex();
					}
				});
		}

		function requestForm (formId) {
			tries += 1;

			return $http.get("/api/form/".concat( formId ))
				.success(function (data) {
					tries = 0;
					forms.push(data);
					return data;
				})
				.error(function (data, status) {
					if (tries >= retryLimit) {
						errorHandler(data);
					} else {
						tries += 1;
						return requestForm(formId);
					}


				});
		}

		function errorHandler (err) {
			tries = 0;
			console.log("Card service encountered an error: ", err);
		}
	}

} (angular.module("cardgameApp")));
