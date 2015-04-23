(function (app, undefined) {
	"use strict";

	app.factory("cards", cards);

	function cards($http) {

		function getCard (cardId) {
			return $http.get("/api/character/".concat(cardId));
		}

		function getEachCard (successCallback, failureCallback) {
			var index = 0;
			return getCard(index)
				.success(successCallback)
				.error(failureCallback);
		}

		function getCards (startId, limit) {
			if (!startId) {
				return $http.get("/api/characters");
			}

			return $http.get("/api/characters"
					.concat("/")
					.concat(startId)
					.concat("?")
					.concat(limit));
		}

		function getLastIndex () {
			return $http.get("/api/characters/last");
		}

		function getForms () {
			return $http.get("/api/forms");
		}

		function errorHandler (err) {
			console.log("cards service encountered an error: ", err);
		}

		return {
			getCard: getCard,
			getCards: getCards,
			getEachCard: getEachCard,
			getLastIndex: getLastIndex,
			getForms: getForms,
			error: errorHandler
		};
	}

} (angular.module("cardgameApp")));
