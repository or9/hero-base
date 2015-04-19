(function ($module, undefined) {
	"use strict";

	$module("scoreboardService", [])
		.factory("scoreboard", scoreboard);

	function scoreboard ($http) {

		function get () {
			$http.get("/api/scoreboard");
		}

		function errorHandler (err) {
			console.log("scoreboardService got err: ", err);
		}

		return {
			get: get,
			errorHandler: errorHandler
		};
	}

} (angular.module));
