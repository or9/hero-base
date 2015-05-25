(function (app, undefined) {
	"use strict";

	app.factory("cardService", CardService);

	function CardService($http) {

		return {
			getCard: getCard,
			getLastIndex: getLastIndex,
			getForm: getForm,
			error: errorHandler
		};

		function getCard (cardId) {
			return $http.get("/api/character/".concat( cardId ));
		}

		function getLastIndex () {
			return $http.get("/api/characters/length");
		}

		function getForm (formId) {
			return $http.get("/api/form/".concat( formId ));
		}

		function errorHandler (err) {
			console.log("Card service encountered an error: ", err);
		}
	}

} (angular.module("cardgameApp")));
