(function (app, undefined) {
	"use strict";

	app.factory("cardService", CardService);

	function CardService($http) {

		return {
			getCard: getCard,
			getLastIndex: getLastIndex,
			getForms: getForms,
			error: errorHandler
		};

		function getCard (cardId) {
			return $http.get("/api/character/".concat( cardId ));
		}

		function getLastIndex () {
			return $http.get("/api/characters/length");
		}

		function getForms (formId) {
			return $http.get("/api/forms").concat( formId );
		}

		function errorHandler (err) {
			console.log("Card service encountered an error: ", err);
		}
	}

} (angular.module("cardgameApp")));
