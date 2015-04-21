(function (app, undefined) {
	"use strict";

	app.factory("cards", cards);

	function cards($http) {

		function getCards () {
			return $http.get("/api/characters");
		}

		function getForms () {
			return $http.get("/api/forms");
		}

		function errorHandler (err) {
			console.log("cards service encountered an error: ", err);
		}

		return {
			getCards: getCards,
			getForms: getForms,
			errorHandler: errorHandler
		};
	}

} (angular.module("cardgameApp")));
