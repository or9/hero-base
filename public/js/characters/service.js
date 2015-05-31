(function ($module, undefined) {
	"use strict";

	$module("charactersService", [])
		.factory("characters", characters);

	function characters($http) {

		function get () {
			return $http.get("/api/characters");
		}

		function errorHandler (err) {
			console.log("characters service encountered an error: ", err);
		}

		return {
			get: get,
			errorHandler: errorHandler
		};
	}

} (angular.module));
